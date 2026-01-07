const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Simulated bank data
const account = {
  bankName: "BMW's Property Bank",
  accountHolder: "Demo Customer",
  balance: 250000,
  interestRate: 0.045,
  transactions: [
    { date: "2025-12-01", type: "Deposit", amount: 100000 },
    { date: "2025-12-05", type: "Withdrawal", amount: 50000 },
    { date: "2025-12-10", type: "Withdrawal", amount: 25000 }
  ]
};

// API endpoint
app.get("/api/account", (req, res) => {
  const interest = account.balance * account.interestRate;

  res.json({
    bankName: account.bankName,
    accountHolder: account.accountHolder,
    balance: account.balance,
    interestEarned: interest,
    transactions: account.transactions
  });
});

// Start server (Docker & cloud safe)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
