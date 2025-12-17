const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const users = require("./data/users");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.send("❌ Invalid credentials");
  }

  // Simple interest calculation
  const interest = user.balance * user.interestRate;

  res.send(`
    <h1>🏦 Account Dashboard</h1>
    <p><strong>User:</strong> ${user.username}</p>
    <p><strong>Balance:</strong> $${user.balance}</p>
    <p><strong>Last Withdrawal:</strong> $${user.lastWithdrawal.amount} on ${user.lastWithdrawal.date}</p>
    <p><strong>Interest Earned:</strong> $${interest.toFixed(2)}</p>
    <a href="/dashboard.html">View Dashboard</a>
  `);
});

// Health endpoint (CI/CD + Render)
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.listen(PORT, () => {
  console.log(`🏦 Bank app running on port ${PORT}`);
});
