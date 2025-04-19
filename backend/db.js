// backend/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ התחברות למונגו הצליחה");
  } catch (err) {
    console.error("❌ שגיאה בהתחברות למונגו:", err.message);
  }
};

module.exports = connectDB;
