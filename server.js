const express = require("express");
const path = require("path");

const app = express();

// Render / Docker provides PORT
const PORT = process.env.PORT || 3000;

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/balance", (req, res) => {
  res.json({
    appName: "BMW's Property",
    balance: 250000,
    lastWithdrawal: "2025-12-10",
    interestRate: "4.5%"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
