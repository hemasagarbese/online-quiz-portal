// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../config/db");

// 🔹 Register User
router.post("/register", async (req, res) => {
  const { name, email, password, branch, year, rollNumber, contact } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  // Check if user exists
  db.query("SELECT * FROM students WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO students (name, email, password, branch, year, rollNumber, contact)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [name, email, hashedPassword, branch, year, rollNumber, contact], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "User registered successfully!" });
    });
  });
});

// 🔹 Login User
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM students WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.json({
      message: "Login successful!",
      student: {
        id: user.id,
        name: user.name,
        email: user.email,
        branch: user.branch,
        year: user.year,
      },
    });
  });
});

// 🔹 Get All Students
router.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 🔹 Get Student Results
router.get("/results/:student_id", (req, res) => {
  const { student_id } = req.params;
  db.query("SELECT * FROM results WHERE student_id = ?", [student_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
