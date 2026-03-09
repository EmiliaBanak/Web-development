//importing libraries
const path = require("path");
const express = require("express");
const cors = require("cors");
// express server
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
// this is for frontend static files like images
app.use(express.static(path.join(__dirname, "public")));

//-----VENUES-------------------
const { Client } = require("pg");
//----environmental variables added, docker connected----
const client = new Client({
  host: process.env.DB_HOST || "db",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "12345",
  database: process.env.DB_NAME || "venues",
});
//connecting with database
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
//api endpoint
app.get("/venues", async (req, res) => {
  try {
    const dbres = await client.query("SELECT * FROM stores;");
    console.log("Stores:", dbres.rows);
    res.json(dbres.rows);
  } catch (err) {
    console.error("Error selecting records", err.stack);
  }
  console.log("hello");
});

//-----LISTENING ON PORT----------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
