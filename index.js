const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const shortid = require("shortid");

const app = express();
const port = 4000;

const pool = new Pool({
  connectionString: "postgresql://username:password@localhost:5432/urlshortener"
});

app.use(cors());
app.use(express.json());

// Create short URL
app.post("/api/shorten", async (req, res) => {
  const { originalUrl, customSlug } = req.body;
  const slug = customSlug || shortid.generate();

  try {
    const existing = await pool.query("SELECT * FROM urls WHERE slug = $1", [slug]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    await pool.query("INSERT INTO urls (slug, original_url, clicks) VALUES ($1, $2, 0)", [slug, originalUrl]);
    res.json({ shortUrl: `http://localhost:3000/${slug}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
