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

//-----LISTENING ON PORT----------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
