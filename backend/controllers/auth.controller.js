const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { sendRegistrationEmail } = require("../utils/mailer");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// ✅ התחברות
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  res.json({ message: "Logged in successfully" });
};

// ✅ הרשמה + שליחת מייל
exports.register = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email: normalizedEmail, password: hashedPassword });
  await newUser.save();

  try {
    await sendRegistrationEmail(normalizedEmail, normalizedEmail);
  } catch (err) {
    console.error("שגיאה בשליחת מייל:", err);
  }

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  res.status(201).json({ message: "User registered successfully and email sent" });
};

// ✅ יציאה
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

// ✅ getMe
exports.getMe = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    res.clearCookie("token");
    return res.status(404).json({ error: "User not found - token cleared" });
  }
  res.json(user);
};
