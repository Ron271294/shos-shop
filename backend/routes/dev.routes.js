const express = require("express");
const router = express.Router();

console.log("✅ dev.routes.js נטען");

router.get("/ping", (req, res) => {
  res.send("pong 🏓");
});

module.exports = router;
