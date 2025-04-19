document.getElementById("checkout-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  // שליפת נתוני הטופס
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  // שליפת עגלה מה-localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // בדיקה אם אין מוצרים בעגלה
  if (cart.length === 0) {
    alert("😕 לא ניתן לבצע הזמנה — אין מוצרים בעגלה.");
    return;
  }

  // שמירת העגלה לנתונים
  data.cart = cart;

  try {
    const res = await fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "שגיאה בשרת");
    }

    const result = await res.json();

    // ניקוי עגלה והפניה לעמוד תודה
    localStorage.removeItem("cart");
    window.location.href = "thankyou.html";

  } catch (err) {
    alert("❌ אירעה שגיאה בעת שליחת התשלום:\n" + err.message);
    console.error("שגיאה:", err);
  }
});
