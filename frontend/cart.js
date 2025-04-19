// הצגת עגלת קניות
window.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const emptyMsg = document.getElementById("empty-msg");
  const totalPriceElem = document.getElementById("total-price");

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    totalPriceElem.textContent = "";
    return;
  }

  emptyMsg.style.display = "none";

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="100">
      <h3>${item.name}</h3>
      <p>מחיר ליחידה: ₪${item.price}</p>
      <p>כמות: ${item.quantity}</p>
      <p>סה״כ: ₪${itemTotal}</p>
      <button onclick="removeItem(${index})">❌ הסר</button>
      <hr>
    `;
    cartItems.appendChild(div);
  });

  totalPriceElem.textContent = `סה״כ לתשלום: ₪${total}`;
}

// הסרת פריט לפי אינדקס
function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(); // רנדר מחדש את העגלה
}

// שמירת מוצר לעגלה (בדף הראשי)
function addToCart(buttonElement) {
  const quantityInput = buttonElement.parentElement.querySelector(".qty-input");
  const quantity = parseInt(quantityInput.value);

  if (isNaN(quantity) || quantity <= 0) {
    alert("❌ כמות לא תקינה");
    return;
  }

  const name = buttonElement.getAttribute("data-name");
  const price = Number(buttonElement.getAttribute("data-price"));
  const productId = buttonElement.getAttribute("data-id");
  const image = buttonElement.parentElement.querySelector("img").getAttribute("src");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find(item => item.productId === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ productId, name, price, quantity, image });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ המוצר נוסף לעגלה!");
}

// שליחת המשתמש לעמוד התשלום
function placeOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("😕 אין מוצרים בעגלה.");
    return;
  }

  // שליחה לדף התשלום
  window.location.href = "checkout.html";
}
