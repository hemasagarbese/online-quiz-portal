const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "Sagar@1206",
  database: process.env.DB_NAME || "quiz_portal_db",
});

db.connect((err) => {
  if (err) console.error("❌ DB connection failed:", err.message);
  else console.log("✅ Connected to DB: quiz_portal_db");
});

module.exports = db;
