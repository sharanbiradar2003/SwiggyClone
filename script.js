import { restaurants } from "./Restaurant.js";

const container = document.getElementById("restaurantContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoriesEl = document.getElementById("categories");
const toastEl = document.getElementById("toast");
const cartCountEl = document.getElementById("cartCount");

// ---------------- Render Restaurants ----------------
function renderList(list) {
  container.innerHTML = "";
  list.forEach((r) => {
    const card = document.createElement("div");
    card.className = "restaurant-card";
    card.innerHTML = `
      <img src="${r.img}" alt="${r.name}">
      <div class="restaurant-info">
        <h3>${r.name}</h3>
        <p>${r.cuisine} • ⭐ ${r.rating}</p>
        <div class="btns">
          <button class="btn-view btn view" data-id="${r.id}">View Menu</button>
          
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

renderList(restaurants);

// ---------------- Category Filter ----------------
categoriesEl.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  document.querySelectorAll("#categories button").forEach((b) => b.classList.remove("active"));
  e.target.classList.add("active");
  const cat = e.target.textContent.trim();
  renderList(cat === "All" ? restaurants : restaurants.filter((r) => r.cuisine.toLowerCase() === cat.toLowerCase()));
});

// ---------------- Search Functionality ----------------
function runSearch() {
  const q = searchInput.value.trim().toLowerCase();
  renderList(!q ? restaurants : restaurants.filter((r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)));
}
searchBtn.addEventListener("click", runSearch);
searchInput.addEventListener("keydown", (ev) => ev.key === "Enter" && runSearch());

// ---------------- CART FUNCTIONS ----------------
function getCartItems() {
  return JSON.parse(localStorage.getItem("swiggyCart")) || [];
}

function updateCartCount() {
  const cartItems = getCartItems();
  const totalItems = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  cartCountEl.textContent = totalItems;
}

function addToCart(name, img, meta) {
  const cart = getCartItems();
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.qty += 1;
 
  } else {
    cart.push({ name, img, meta, qty: 1 });
  }
  localStorage.setItem("swiggyCart", JSON.stringify(cart));
  updateCartCount();
  showToast(`${name} added to cart`);
}

// ---------------- TOAST ----------------
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.style.display = "block";
  setTimeout(() => (toastEl.style.display = "none"), 2000);
}

// ---------------- Event Listeners ----------------
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const name = e.target.dataset.name;
    const img = e.target.dataset.img;
    const meta = e.target.dataset.meta;
    addToCart(name, img, meta);
  }

  if (e.target.classList.contains("view")) {
    const id = e.target.dataset.id;
    window.location.href = `menu.html?id=${id}`;
  }
});

// Initialize Cart Count on Load
document.addEventListener("DOMContentLoaded", updateCartCount);


// ...existing code...
const searchInput1 = document.getElementById('searchInput1');
const suggestions = document.getElementById('searchSuggestions');
const restaurantNames = Object.values(restaurants).map(r => r.name);

searchInput.addEventListener('input', function() {
  const val = this.value.toLowerCase();
  if (!val) {
    suggestions.style.display = 'none';
    return;
  }
  const filtered = restaurantNames.filter(n => n.toLowerCase().includes(val));
  suggestions.innerHTML = filtered.map(n => `<li style="padding:8px;cursor:pointer;">${n}</li>`).join('');
  suggestions.style.display = filtered.length ? 'block' : 'none';
});
suggestions.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    searchInput.value = e.target.textContent;
    suggestions.style.display = 'none';
  }
});
// ...existing code...
document.getElementById('darkModeBtn').onclick = function() {
  document.body.classList.toggle('dark-mode');
};
// ...existing code...// ...existing code...
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.onclick = () => window.scrollTo({top:0,behavior:'smooth'});
// ...existing code...

// Add this in your script.js
document.getElementById("sortRating").addEventListener("click", function() {
  const list = document.getElementById("restaurantContainer");
  console.log(list)
  const cards = Array.from(list.children);
  cards.sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating));
  cards.forEach(card => list.appendChild(card));
});
