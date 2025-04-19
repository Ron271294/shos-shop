const User = require('../models/user');

// ✅ שליפת כל המשתמשים
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: 'שגיאה בקבלת המשתמשים',
      error: error.message
    });
  }
};

// ✅ מחיקת משתמש לפי ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'משתמש לא נמצא' });
    }

    res.json({ message: 'המשתמש נמחק בהצלחה' });
  } catch (error) {
    res.status(500).json({
      message: 'שגיאה במחיקת המשתמש',
      error: error.message
    });
  }
};

// ✅ עדכון פרטי משתמש לפי ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // אופציונלי: אפשר לבדוק אם נשלחו שדות בכלל
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'אין נתונים לעדכן' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'משתמש לא נמצא' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: 'שגיאה בעדכון המשתמש',
      error: error.message
    });
  }
};
