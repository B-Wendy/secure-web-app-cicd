const jwt = require("jsonwebtoken");

module.exports = function authenticate(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ message: "Missing Authorization header" });

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid Authorization format" });
  }

  const token = parts[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = payload; // { username }
    next();
  });
};
