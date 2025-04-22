const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,  // ✅ מתקן אוטומטית ל־lowercase
    trim: true        // ✅ מסיר רווחים לפני/אחרי
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
