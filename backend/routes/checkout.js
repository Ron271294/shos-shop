const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { Types } = require("mongoose"); // ✅ ייבוא תקין של ObjectId

router.post("/", async (req, res) => {
  const { fullName, cardNumber, expiry, cvv, cart } = req.body;

  console.log("🚨 התקבל תשלום מפוברק:");
  console.log("שם:", fullName);
  console.log("כרטיס:", cardNumber);
  console.log("תוקף:", expiry);
  console.log("CVV:", cvv);
  console.log("עגלה:", cart);

  try {
    for (let item of cart) {
      // ✅ המרת productId למזהה חוקי
      const productId = Types.ObjectId.createFromHexString(item.productId);
      const product = await Product.findById(productId);

      if (!product) {
        console.log(`❌ מוצר לא נמצא: ${item.productId}`);
        continue;
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ error: `אין מספיק מלאי למוצר: ${product.name}` });
      }

      product.quantity -= item.quantity;
      await product.save();
    }

    res.json({ success: true, message: "✅ ההזמנה בוצעה והמלאי עודכן" });
  } catch (err) {
    console.error("❌ שגיאה בעת ביצוע ההזמנה:", err);
    res.status(500).json({ error: "❌ שגיאה בעת ביצוע ההזמנה" });
  }
});

module.exports = router;
