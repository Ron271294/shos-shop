// backend/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  deleteProduct
} = require("../controllers/productController");

// שליפת כל המוצרים
router.get("/", getAllProducts);

// יצירת מוצר חדש
router.post("/", createProduct);

// מחיקת מוצר לפי ID
router.delete("/:id", deleteProduct);





module.exports = router;
