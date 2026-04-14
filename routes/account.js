const express = require("express");
const authenticate = require("../middleware/auth");
const { users } = require("../data/store");

const router = express.Router();

/**
 * GET /api/account
 * Returns current account details: balance, interestRate, lastWithdrawal, currency
 */
router.get("/", authenticate, (req, res) => {
  const account = users[req.user.username].account;
  res.json({
    balance: account.balance,
    interestRate: account.interestRate,
    lastWithdrawal: account.lastWithdrawal,
    currency: account.currency
  });
});

/**
 * POST /api/account/withdraw
 * Body: { amount }
 * Deducts amount and sets lastWithdrawal
 */
router.post("/withdraw", authenticate, (req, res) => {
  const { amount } = req.body;
  if (amount === undefined || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ message: "Provide a positive numeric amount" });
  }

  const account = users[req.user.username].account;
  if (amount > account.balance) {
    return res.status(400).json({ message: "Insufficient funds" });
  }

  account.balance = Number((account.balance - amount).toFixed(2));
  account.lastWithdrawal = Number(amount.toFixed(2));

  res.json({
    message: "Withdrawal successful",
    balance: account.balance,
    lastWithdrawal: account.lastWithdrawal
  });
});

/**
 * GET /api/account/interest
 * Returns yearly and monthly interest projections based on current balance
 */
router.get("/interest", authenticate, (req, res) => {
  const account = users[req.user.username].account;
  const r = account.interestRate; // annual rate
  const B = account.balance;

  // Simple interest estimates (not compounding):
  // Yearly interest: I = B * r
  // Monthly interest: I_m = (B * r) / 12
  const yearlyInterest = Number((B * r).toFixed(2));
  const monthlyInterest = Number(((B * r) / 12).toFixed(2));

  res.json({
    balance: B,
    annualRate: r,
    yearlyInterest,
    monthlyInterest,
    currency: account.currency
  });
});

module.exports = router;


