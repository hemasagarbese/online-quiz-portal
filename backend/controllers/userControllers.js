const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../config/db");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, branch, year, rollNumber, contact } = req.body;
  if (!name || !email || !password || !branch || !year || !rollNumber || !contact)
    return res.status(400).json({ message: "All fields are required." });

  db.query("SELECT * FROM students WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) return res.status(400).json({ message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO students (name, email, password, branch, year, rollNumber, contact) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, branch, year, rollNumber, contact],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "User registered successfully!" });
      }
    );
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email & password required." });

  db.query("SELECT * FROM students WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ message: "Invalid email or password." });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password." });

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

module.exports = router;
