// --- OFFERS RESTAURANTS DATA (same style as Swiggy) ---
const offerRestaurantsData = [
  {
    name: "Pizza Hut",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PHlogo",
    cuisine: "Pizza, Italian",
    offer: "50% OFF up to ₹100"
  },
  {
    name: "KFC",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/kfc_logo",
    cuisine: "Fried Chicken, Fast Food",
    offer: "Flat 40% OFF"
  },
  {
    name: "Burger King",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/bklogo",
    cuisine: "Burgers, Fast Food",
    offer: "60% OFF | No minimum"
  },
  {
    name: "Domino's Pizza",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/dominoslogo",
    cuisine: "Pizza, Italian",
    offer: "Buy 1 Get 1 Free"
  },
  {
    name: "Subway",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/subwaylogo",
    cuisine: "Healthy, Sandwich",
    offer: "₹120 OFF on combos"
  }
];


// ---- Render Offer Restaurants ----
const offerContainer = document.getElementById("offerRestaurants");

if (offerContainer) {
  offerRestaurantsData.forEach(res => {
    const card = document.createElement("div");
    card.classList.add("offer-card");

    card.innerHTML = `
      <img src="${res.img}" alt="">
      <div class="offer-content">
        <h3 class="offer-title">${res.name}</h3>
        <p class="offer-desc">${res.cuisine}</p>
        <span class="offer-tag">${res.offer}</span>
      </div>
    `;

    offerContainer.appendChild(card);
  });
}
