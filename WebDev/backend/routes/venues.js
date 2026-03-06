const express = require("express");
const router = express.Router();
// DB
const venues = require("stores.json");

// REST API endpoint
router.get("/venues", (req, res) => {
  res.json(venues);
});

module.exports = router;
