const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/register", authController.register);

// ✅ GET מידע על המשתמש שמחובר
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;






















