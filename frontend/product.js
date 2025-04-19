function renderProduct(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
  
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">₪${product.price}</p>
      <p class="stock ${product.quantity === 0 ? 'out-of-stock' : ''}">
        ${product.quantity === 0 ? 'אזל מהמלאי' : 'במלאי'}
      </p>
      <button ${product.quantity === 0 ? 'disabled' : ''} onclick="addToCart('${product._id}')">הוסף לעגלה</button>
    `;
  
    document.querySelector("#products-container").appendChild(card);
  }
  