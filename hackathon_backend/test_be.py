import psycopg2
from psycopg2.extras import Json
from sentence_transformers import SentenceTransformer
from scipy.spatial.distance import cosine

# Database connection settings
DB_SETTINGS = {
    "dbname": "hackathon_db",
    "user": "postgres",
    "password": "54321",
    "host": "localhost",
    "port": 5432
}

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
        exit()

# Create the posts table
def create_table(conn):
    with conn.cursor() as cursor:
        cursor.execute(CREATE_TABLE_QUERY)
        conn.commit()

# Add a post with its embedding
def add_post(conn, description, email, category, image_url=None):
    text_embedding = model.encode(description).tolist()
    with conn.cursor() as cursor:
        cursor.execute(
            """
            INSERT INTO posts (description, email, category, image_url, text_embedding)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (description, email, category, image_url, Json(text_embedding))
        )
        post_id = cursor.fetchone()[0]
        conn.commit()
        print(f"Post added with ID: {post_id}")

# Fetch posts for matching
def fetch_posts(conn, category):
    with conn.cursor() as cursor:
        cursor.execute("SELECT id, description, text_embedding FROM posts WHERE category = %s", (category,))
        return cursor.fetchall()

# Match a lost item against found items
def match_lost_item(conn, lost_description):
    lost_embedding = model.encode(lost_description)
    found_posts = fetch_posts(conn, "found")

    matches = []
    for post_id, found_desc, found_embedding in found_posts:
        found_embedding = [float(x) for x in found_embedding]  # Convert JSON to list
        similarity = 1 - cosine(lost_embedding, found_embedding)
        matches.append((post_id, found_desc, similarity))

    # Sort matches by similarity in descending order
    matches.sort(key=lambda x: x[2], reverse=True)
    return matches

# Main function
def main():
    conn = connect_db()
    create_table(conn)

    # Example: Add sample posts
    add_post(conn, "Black leather wallet with ID cards and cash inside.", "user1@example.com", "lost")
    add_post(conn, "Found a black leather wallet near Central Park.", "user2@example.com", "found")
    add_post(conn, "Brown leather purse with keys and some coins.", "user3@example.com", "found")

    # Example: Match a lost item
    lost_description = "Lost a black wallet with my ID card."
    matches = match_lost_item(conn, lost_description)

    print("\nTop Matches:")
    for match_id, match_desc, similarity in matches:
        print(f"Post ID: {match_id}, Description: {match_desc}, Similarity: {similarity:.2f}")

    conn.close()

if __name__ == "__main__":
    main()
