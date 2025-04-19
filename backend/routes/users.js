const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// שליפת כל המשתמשים
router.get('/', userController.getAllUsers);

// מחיקת משתמש לפי ID
router.delete('/:id', userController.deleteUser);

// עדכון פרטי משתמש לפי ID
router.put('/:id', userController.updateUser);

module.exports = router;
