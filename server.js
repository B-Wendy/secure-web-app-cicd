const express = require("express");
const path = require("path");

const app = express();

// Always use Render's PORT (10000)
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* In-memory database (simulates real bank data) */
let account = {
  owner: "BMW's Property",
  balance: 250000,
  interestRate: 4.5,
  transactions: [
    { type: "deposit", amount: 50000, date: "2025-12-01" },
    { type: "withdrawal", amount: 20000, date: "2025-12-10" }
  ]
};

/* API: Get account details */
app.get("/api/account", (req, res) => {
  res.json(account);
});

/* API: Deposit */
app.post("/api/deposit", (req, res) => {
  const { amount } = req.body;
  account.balance += amount;
  account.transactions.push({
    type: "deposit",
    amount,
    date: new Date().toISOString().split("T")[0]
  });
  res.json({ success: true, account });
});

/* API: Withdraw */
app.post("/api/withdraw", (req, res) => {
  const { amount } = req.body;
  if (amount > account.balance) {
    return res.status(400).json({ error: "Insufficient funds" });
  }
  account.balance -= amount;
  account.transactions.push({
    type: "withdrawal",
    amount,
    date: new Date().toISOString().split("T")[0]
  });
  res.json({ success: true, account });
});

/* API: Interest calculation */
app.get("/api/interest", (req, res) => {
  const interest = (account.balance * account.interestRate) / 100;
  res.json({ interest });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});