const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

/**
 * Simple Bank API (INTENTIONALLY SIMPLE)
 * Name: BMW's Property
 */

// Dummy in-memory data (intentional for demo)
let accounts = [
  { id: 1, name: "Alice", balance: 1000 },
  { id: 2, name: "Bob", balance: 500 }
];

// Get all accounts
app.get("/api/accounts", (req, res) => {
  res.json(accounts);
});

// Deposit (INTENTIONALLY NO AUTH → for security scan demo)
app.post("/api/deposit", (req, res) => {
  const { id, amount } = req.body;
  const account = accounts.find(a => a.id == id);

  if (!account) {
    return res.status(404).json({ error: "Account not found" });
  }

  account.balance += Number(amount);
  res.json(account);
});

// Withdraw (INTENTIONALLY VULNERABLE: no validation)
app.post("/api/withdraw", (req, res) => {
  const { id, amount } = req.body;
  const account = accounts.find(a => a.id == id);

  if (!account) {
    return res.status(404).json({ error: "Account not found" });
  }

  account.balance -= Number(amount);
  res.json(account);
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", app: "BMW's Property" });
});

// 🚨 VERY IMPORTANT FOR RENDER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BMW's Property running on port ${PORT}`);
});
