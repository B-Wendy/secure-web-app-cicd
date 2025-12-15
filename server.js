const express = require("express");
const app = express();

const APP_NAME = "BMW's property"; // ✅ fixed name
const PORT = 3000;

app.use(express.json());

// ❗ INTENTIONAL INSECURE PRACTICE (for Snyk to catch)
const users = [
  { username: "admin", password: "admin123", balance: 10000 }, // weak password
];

// Home
app.get("/", (req, res) => {
  res.json({
    app: APP_NAME,
    message: "Welcome to BMW's Property Banking API",
    status: "running",
  });
});

// Login (INTENTIONALLY INSECURE – no hashing)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    balance: user.balance,
  });
});

// Transfer money (NO auth – insecure)
app.post("/transfer", (req, res) => {
  const { amount } = req.body;

  if (amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  users[0].balance -= amount;

  res.json({
    message: "Transfer successful",
    newBalance: users[0].balance,
  });
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} running on port ${PORT}`);
});
