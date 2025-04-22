// חישוב סה"כ מחיר לפי כמות
function updateTotal(input, price) {
  const quantity = parseInt(input.value);
  const total = quantity * price;
  const totalElement = input.parentElement.querySelector('.total span');
  totalElement.innerText = total;
}

// הוספה לעגלה
function addToCart(productName, price, button) {
  const quantity = parseInt(button.parentElement.querySelector('.qty-input').value);
  const total = quantity * price;

  alert(`✅ הוספת לעגלה: ${productName}\nכמות: ${quantity}\nסה״כ לתשלום: ₪${total}`);

  // בעתיד: שליחה לשרת או שמירה ב־localStorage
}

// ✅ רישום משתמש דרך backend
async function registerUser(e) {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", // כדי לשמור את ה-cookie
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "שגיאה ברישום");
      return;
    }

    alert("נרשמת בהצלחה!");
    window.location.href = "index.html";
  } catch (err) {
    console.error(err);
    alert("שגיאה ברישום");
  }
}

// ✅ התחברות דרך backend
async function loginUser(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", // שומר את הטוקן מהשרת
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "אימייל או סיסמה שגויים");
      return;
    }

    alert("התחברת בהצלחה!");
    window.location.href = "index.html";
  } catch (err) {
    console.error(err);
    alert("שגיאה בהתחברות");
  }
}
