const express = require("express");
const path = require("path");

const app = express();

// Render provides the PORT automatically
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Example banking API endpoint
app.get("/api/balance", (req, res) => {
  res.json({
    account: "BMW's Property - Demo Account",
    balance: 2500000,
    currency: "XAF",
  });
});

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// IMPORTANT: Listen on process.env.PORT
app.listen(PORT, () => {
  console.log(`BMW's Property app running on port ${PORT}`);
});
