const path = require("path");
const express = require("express");
const client = require("./WebDev/backend/db");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
app.use(express.static(path.join(__dirname, "public")));


//-----VENUES-------------------
const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "12345",
  database: "venues",
});

// The code, lines:12-32, is copied and modified according to project from Patric Riehmann university slides 'lc_database_primer.pdf'
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database with async/await");
  } catch (err) {
    console.error("Connection error", err.stack);
  }
}
connectDB();

app.get("/venues", async (req, res) => {
  try {
    const dbres = await client.query("SELECT * FROM stores;");
    console.log("Stores:", dbres.rows);
    res.json(dbres.rows);
    venues = await client.query("SELECT * FROM stores;");
    // console.log("Stores:", dbres.rows);
    res.json(venues.rows);
  } catch (err) {
    console.error("Error selecting records", err.stack);
  }
  console.log("hello");
});

//-----LISTENING ON PORT----------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
