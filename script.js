const apiUrl = 'https://fakestoreapi.com/products';

const productsContainer = document.getElementById('products-container');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = [];

const displayProducts = (products) => {
  productsContainer.innerHTML = '';
  products.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3 class="title">${product.title}</h3>
      <p class="price">$${product.price}</p>
      <button onclick="addToCart(${product.id}, '${product.title}', '${product.image}', ${product.price})">Add to Cart</button>
    `;
    productsContainer.appendChild(productElement);
  });
};

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

const addToCart = (id, title, image, price) => {
  const existingProductIndex = cart.findIndex((item) => item.id === id);
  if (existingProductIndex === -1) {
    cart.push({ id, title, image, price, quantity: 1 });
  } else {
    cart[existingProductIndex].quantity += 1;
  }
  alert(`${title} added to cart!`);
};

const displayCart = () => {
  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      <span>${item.title} (x${item.quantity})</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    cartItemsList.appendChild(cartItem);
    total += item.price * item.quantity;
  });
  const totalItem = document.createElement('li');
  totalItem.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  cartItemsList.appendChild(totalItem);
};

const removeFromCart = (index) => {
  cart.splice(index, 1);
  displayCart();
};

cartBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty.');
  } else {
    displayCart();
    cartModal.style.display = 'flex';
  }
});

closeCartBtn.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`✅ Thank you for your purchase!\nYour total was $${total.toFixed(2)}`);
    cart = [];
    displayCart();
    cartModal.style.display = 'none';
  }
});

fetchProducts();
