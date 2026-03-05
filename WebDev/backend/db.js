const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "12345",
  database: "venues",
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database with async/await");
  } catch (err) {
    console.error("Connection error", err.stack);
  }
}
connectDB();
