const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
// importing venues route
const venueRoutes = require("WebDev/backend/routes/venues");

// REST API route
app.use("/api", venueRoutes);
//Venues
