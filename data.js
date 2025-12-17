const bcrypt = require("bcryptjs");

// Demo users in memory (replace with DB later if needed)
const users = {
  customer1: {
    // password: bank123
    passwordHash: bcrypt.hashSync("bank123", 10),
    account: {
      balance: 2500.0,
      interestRate: 0.03, // 3% annual
      lastWithdrawal: null,
      currency: "USD"
    }
  },
  customer2: {
    // password: safe456
    passwordHash: bcrypt.hashSync("safe456", 10),
    account: {
      balance: 510.75,
      interestRate: 0.05,
      lastWithdrawal: 50.0,
      currency: "USD"
    }
  }
};

module.exports = { users };
