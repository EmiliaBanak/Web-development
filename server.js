const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
//const client = require("db");
//const { client } = require("db.js");

app.use(express.static("public"));

//Venues
/*
app.get("/venues", async (req, res) => {
 /* try {
    const dbres = await client.query("SELECT * FROM stores;");
    console.log("Stores:", dbres.rows);
    res.json(dbres.rows);
  } catch (err) {
    console.error("Error selecting records", err.stack);
  }
  console.log("hello");
});
*/
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
