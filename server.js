require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// 👇 MUST be before routes
app.use(express.json());

// 🔐 LOGIN ROUTE (PASTE THIS HERE)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== "customer" || password !== "bank123") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// 🏦 BANK ROUTES
app.use("/api/account", require("./routes/account"));

// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.json({ message: "Bank API running securely" });
});

// 🚀 START SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
