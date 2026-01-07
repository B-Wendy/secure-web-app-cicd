const express = require("express");
const path = require("path");

const app = express();

// IMPORTANT: Render injects PORT
const PORT = process.env.PORT || 3000;

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Simulated banking data
const account = {
  accountName: "BMW Property Account",
  balance: 250000,
  interestRate: 0.045,
  transactions: [
    { date: "2025-12-01", type: "Deposit", amount: 100000 },
    { date: "2025-12-10", type: "Withdrawal", amount: 50000 },
    { date: "2025-12-20", type: "Deposit", amount: 200000 }
  ]
};

// API endpoints
app.get("/api/account", (req, res) => {
  const yearlyInterest = account.balance * account.interestRate;

  res.json({
    ...account,
    yearlyInterest
  });
});

// Health check (important for CI/CD & Render)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
