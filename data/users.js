module.exports = [
  {
    username: "alice",
    password: "alice123",   // later we hash
    balance: 2500,
    lastWithdrawal: {
      amount: 200,
      date: "2025-12-01"
    },
    interestRate: 0.05
  },
  {
    username: "bob",
    password: "bob123",
    balance: 1200,
    lastWithdrawal: {
      amount: 100,
      date: "2025-11-20"
    },
    interestRate: 0.03
  }
];
