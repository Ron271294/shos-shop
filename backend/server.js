const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");

require('dotenv').config();



// טעינת משתני סביבה
dotenv.config({ path: '../.env' });
console.log("🔍 MONGO_URL:", process.env.MONGO_URL);

// התחברות למסד נתונים
connectDB();

// יצירת אפליקציה
const app = express();

// שימוש ב־middlewares
app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ייבוא ראוטים
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/auth.routes");
const checkoutRoutes = require("./routes/checkout");
const userRoutes = require("./routes/users"); // ✅ ייבוא ראוטר משתמשים

// שימוש בנתיבים
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/users", userRoutes); // ✅ שימוש בנתיב משתמשים




const devRoutes = require("./routes/dev.routes");
app.use("/api/dev", devRoutes); // 🔧 נתיב לבדיקה בלבד









// הפעלת השרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 השרת פעיל על פורט ${PORT}`);
});











