// backend/middlewares/auth.middleware.js

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// אין להגדיר שוב את authMiddleware אם זה כבר הוגדר למעלה!

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
