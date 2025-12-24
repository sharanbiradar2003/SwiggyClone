import {restaurants} from './restaurantsMenu.js'

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const rest = restaurants[id];
const cartCountEl = document.getElementById("cartCount");

if (!rest) {
  document.body.innerHTML =
    "<h2 style='text-align:center;margin-top:40px'>Restaurant not found</h2>";
} else {
  document.getElementById("restaurantName").textContent = rest.name;
  document.getElementById("restName").textContent = rest.name;
  document.getElementById("restMeta").textContent = rest.meta;
  document.getElementById("restRating").textContent = rest.rating;
  document.getElementById("restaurantImage").src = rest.img;

  const menuList = document.getElementById("menuList");
  rest.menu.forEach((item) => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="details">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button data-restaurantName="${rest.name}" data-name="${item.name}" data-price="${item.price}" data-img="${item.img}">Add to Cart</button>
      </div>
    `;
    menuList.appendChild(div);
  });
}

const toast = document.getElementById("toast");
document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.name) {
    const restaurantName = rest.name;
    const name = e.target.dataset.name;
    console.log(restaurantName)
    const price = e.target.dataset.price;
    const img = e.target.dataset.img;
    const cart = JSON.parse(localStorage.getItem("swiggyCart") || "[]");
    cart.push({ restaurantName, name, price, img, qty: 1 });
    localStorage.setItem("swiggyCart", JSON.stringify(cart));
    updateCartCount();
    showToast(`${name} added to cart`);
  }
});

function getCartItems() {
  return JSON.parse(localStorage.getItem("swiggyCart")) || [];
}

function updateCartCount() {
  const cartItems = getCartItems();
  const totalItems = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  cartCountEl.textContent = totalItems;
}

function showToast(msg) {
  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), 2000);
}

updateCartCount();
