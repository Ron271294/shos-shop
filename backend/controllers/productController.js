// backend/controllers/productController.js

const Product = require("../models/Product");

// שליפת כל המוצרים
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "שגיאה בשרת", error: err.message });
  }
};

// יצירת מוצר חדש
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: "בעיה ביצירת מוצר", error: err.message });
  }
};

// מחיקת מוצר לפי מזהה
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "שגיאה במחיקה", error: err.message });
  }
};
