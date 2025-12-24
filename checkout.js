// Fetch cart items from localStorage
function getCartItems() {
  return JSON.parse(localStorage.getItem("swiggyCurrentOrder")) || [];
}


// Render cart items in checkout
function renderCheckoutCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const items = getCartItems();
  let subtotal = 0;
  cartItemsDiv.innerHTML = "";

  if (items.length === 0) {
    cartItemsDiv.innerHTML = "<div style='color:#888;text-align:center;margin:30px 0;'>Your cart is empty.</div>";
    document.getElementById("subtotal").textContent = "₹0";
    document.getElementById("total").textContent = "₹0";
    document.getElementById("tax").textContent = "₹0";
    return;
  }

  items.forEach(item => {
    const price = parseFloat(item.price) * (item.qty || 1);
    subtotal += price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.marginBottom = "18px";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" style="width:55px;height:55px;object-fit:cover;border-radius:8px;margin-right:15px;border:1px solid #eee;">
      <div style="flex:1;">
        <div style="font-weight:500;font-size:16px;">${item.name}</div>
        <div style="color:#888;font-size:13px;">${item.restaurantName || ""}</div>
        <div style="font-size:13px;">Qty: ${item.qty || 1}</div>
      </div>
      <div style="font-weight:500;font-size:15px;">₹${price}</div>
    `;
    cartItemsDiv.appendChild(div);
  });

  document.getElementById("subtotal").textContent = "₹" + subtotal;
  const deliveryFee = 40;
  document.getElementById("deliveryFee").textContent = "₹" + deliveryFee;
  document.getElementById("total").textContent = "₹" + (subtotal + deliveryFee);
  document.getElementById("tax").textContent = "₹" + (subtotal*0.08).toFixed(2);
}

// Place Order button
document.querySelector(".place-order-btn").addEventListener("click", function () {

  const order = JSON.parse(localStorage.getItem("swiggyCurrentOrder")) || [];

  let subtotal = 0;
  order.forEach(item => {
    subtotal += (item.price * (item.qty || 1));
  });

  const deliveryFee = 40;
  const tax = +(subtotal * 0.08).toFixed(2);
  const grandTotal = subtotal + deliveryFee + tax;

  let orderHistory = JSON.parse(localStorage.getItem("swiggyOrderHistory")) || [];

  orderHistory.push({
    id: Date.now(),
    items: order,
    subtotal,
    deliveryFee,
    tax,
    total: grandTotal,
    date: new Date().toLocaleString(),
    status: "Order Placed"
  });

  localStorage.setItem("swiggyOrderHistory", JSON.stringify(orderHistory));

  alert("Order placed successfully!");

  localStorage.removeItem("swiggyCart");
  localStorage.removeItem("swiggyCurrentOrder");

  window.location.href = "index.html";
});



renderCheckoutCart();