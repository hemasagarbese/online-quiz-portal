const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use user routes
app.use("/api", userRoutes);

// Example route to test server
app.get("/", (req, res) => res.send("🚀 API Running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
