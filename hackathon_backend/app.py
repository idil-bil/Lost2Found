import psycopg2
from psycopg2.extras import Json
from sentence_transformers import SentenceTransformer
from scipy.spatial.distance import cosine
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

# Database connection settings
DB_SETTINGS = {
    "dbname": "hackathon_db",
    "user": "postgres",
    "password": "54321",
    "host": "localhost",
    "port": 5432
}

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the NLP model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Database setup
CREATE_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    email TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category TEXT NOT NULL,
    text_embedding JSONB
);
"""

# Connect to the database
def connect_db():
    try:
        conn = psycopg2.connect(**DB_SETTINGS)
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        raise HTTPException(status_code=500, detail="Database connection failed")

# Create the posts table
def initialize_db():
    conn = connect_db()
    with conn.cursor() as cursor:
        cursor.execute(CREATE_TABLE_QUERY)
        conn.commit()
    conn.close()

initialize_db()  # Create the table if it doesn't exist

# Data models for FastAPI
class PostInput(BaseModel):
    description: str
    email: str
    category: str  # Either "lost" or "found"
    image_url: Optional[str] = None

class MatchOutput(BaseModel):
    post_id: int
    description: str
    similarity: float

class MatchInput(BaseModel):
    description: str

# Add a post with embedding
@app.post("/add_post/")
def add_post(data: PostInput):
    conn = connect_db()
    text_embedding = model.encode(data.description).tolist()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO posts (description, email, category, image_url, text_embedding)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id;
                """,
                (data.description, data.email, data.category, data.image_url, Json(text_embedding))
            )
            post_id = cursor.fetchone()[0]
            conn.commit()
            return {"message": "Post added successfully", "post_id": post_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding post: {e}")
    finally:
        conn.close()

# Match a lost item
@app.post("/match_item/")
def match_item(data: MatchInput) -> List[MatchOutput]:
    conn = connect_db()
    lost_embedding = model.encode(data.description)
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, description, text_embedding FROM posts WHERE category = 'found'")
            found_posts = cursor.fetchall()

            matches = []
            for post_id, found_desc, found_embedding in found_posts:
                found_embedding = [float(x) for x in found_embedding]  # Convert JSON to list
                similarity = 1 - cosine(lost_embedding, found_embedding)
                matches.append({"post_id": post_id, "description": found_desc, "similarity": similarity})

            # Sort matches by similarity in descending order
            matches.sort(key=lambda x: x["similarity"], reverse=True)
            return matches
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error matching item: {e}")
    finally:
        conn.close()
