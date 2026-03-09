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

app.get("/venues", async (req, res) => {
  try {
    venues = await client.query("SELECT * FROM stores;");
    // console.log("Stores:", dbres.rows);
    res.json(venues.rows);
  } catch (err) {
    console.error("Error selecting records", err.stack);
  }
});

//POST
app.post("/venues", async (req, res) => {
  try {
    const { name, url, district } = req.body;
    const result = await client.query(
      "INSERT INTO stores (name, url, district) VALUES ($1, $2, $3) RETURNING *",
      [name, url, district],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting venue", err.stack);
  }
});

//PUT
app.put("/venues/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url, district } = req.body;

    const result = await client.query(
      "UPDATE stores SET name=$1, url=$2, district=$3 WHERE id=$4 RETURNING *",
      [name, url, district, id],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating venue", err.stack);
  }
});

//DELETE
app.delete("/venues/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await client.query("DELETE FROM stores WHERE id=$1", [id]);
    res.json({ message: "Venue deleted" });
  } catch (err) {
    console.error("Error deleting venue", err.stack);
  }
});

//-----LISTENING ON PORT----------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
