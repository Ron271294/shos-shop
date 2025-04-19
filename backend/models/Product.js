const mongoose = require("mongoose");

// הגדרת הסכמה של מוצר
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    default: 100,
    min: 0
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// hook קטן שמתעדכן אוטומטית אם quantity = 0
productSchema.pre("save", function (next) {
  this.inStock = this.quantity > 0;
  next();
});

// ייצוא המודל
module.exports = mongoose.model("Product", productSchema);

