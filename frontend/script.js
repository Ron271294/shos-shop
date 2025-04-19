function updateTotal(input, price) {
    const quantity = parseInt(input.value);
    const total = quantity * price;
    const totalElement = input.parentElement.querySelector('.total span');
    totalElement.innerText = total;
  }
  
  function addToCart(productName, price, button) {
    const quantity = parseInt(button.parentElement.querySelector('.qty-input').value);
    const total = quantity * price;
  
    alert(`✅ הוספת לעגלה: ${productName}\nכמות: ${quantity}\nסה״כ לתשלום: ₪${total}`);
    
    // בעתיד: תוכל לשמור ל-localStorage או לשלוח לשרת
  }
  


  // רישום משתמש
function registerUser(e) {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
  
    const users = JSON.parse(localStorage.getItem("users") || "[]");
  
    const exists = users.find(u => u.email === email);
    if (exists) {
      alert("משתמש כבר קיים");
      return;
    }
  
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("נרשמת בהצלחה! עכשיו תוכל להתחבר");
    window.location.href = "login.html";
  }
  
  // התחברות
  function loginUser(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
  
    if (!user) {
      alert("אימייל או סיסמה שגויים");
      return;
    }
  
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("התחברת בהצלחה!");
    window.location.href = "index.html";
  }
  

  