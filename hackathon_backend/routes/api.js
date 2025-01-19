const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// POST /post route
router.post("/post", async (req, res) => {
    const { email, image_url, description } = req.body;

    console.log("Request Body:", req.body); // Debug log

    if (!email || !description) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const query = `
            INSERT INTO posts (email, image_url, description)
            VALUES ($1, $2, $3) RETURNING *;
        `;
        const values = [email, image_url, description];
        const result = await pool.query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Database error:", err); // Debug log
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
