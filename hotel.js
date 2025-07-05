// Dishes List
const dishes = [
  { name: "Paneer Butter Masala", price: 200, img: "https://cdn.zeptonow.com/production///tr:w-600,ar-…,f-auto,q-80/web/recipes/paneer-butter-masala.png"},
  { name: "Chicken Biryani ", price: 250, img: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/01/Chicken-Biryani.jpg"},
  { name: "Tandoori Roti ", price: 20, img: "https://www.cookwithmanali.com/wp-content/uploads/2021/07/Tandoori-Roti-1014x1536.jpg"},
  { name: "Gulab Jamun ", price: 60, img: "https://rakskitchen.net/wp-content/uploads/2021/09/instant-gulab-jamun.jpg"},
  { name: "Masala Dosa ", price: 150, img: "https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa-1014x1536.jpg"},
  { name: "Ice Cream ", price: 35, img: "https://www.milkmaid.in/sites/default/files/2023-04/Chocolate-Ice-Cream_356x256.webp"},
  { name: "Veg Manchurian ", price: 180, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDR4rs_aFCbtEiiuBjgjgHQ4E2X-ry1F61JQ&s"},
  { name: "Butter Naan 🫓", price: 25, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQsZVChPTdUkVx7IjuHUhCQpZdS5iHIrl7w&s"},
  { name: "Chole Bhature ", price: 120, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlqgPw02lMNQcFDkZhtzBTTLVdnnWkozTxUA&s"},
  { name: "Fried Rice ", price: 140, img: "https://images.getrecipekit.com/20220904015448-veg-20fried-20rice.png?aspect_ratio=16:9&quality=90&"},
  { name: "Mutton Curry ", price: 300, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXaERhpaoIpFvvKJQQ6CH2_6pM_Z-W-kluZA&s"},
  { name: "Hakka Noodles ", price: 160, img: "https://cookoverheels.com/wp-content/uploads/2020/01/Street-Style-Zucchini-Hakka-Noodles-225x225.jpg"},
  { name: "Rasgulla ", price: 25, img: "https://www.palatesdesire.com/wp-content/uploads/2015/08/Rasgulla_recipe@Palates_desire-scaled.jpg"},
  { name: "Dal Makhani ", price: 180, img: "https://c.ndtvimg.com/2024-02/ohpng4i_dal-makhani_625x300_14_February_24.jpg"},
  { name: "Spring Roll ", price: 100, img: "https://www.giallozafferano.com/images/276-27601/Chinese-Spring-Rolls_1200x800.jpg"}
];

let selectedDishes = [];

const menu = document.getElementById("menu");
dishes.forEach((dish, index) => {
  const dishDiv = document.createElement("div");
  dishDiv.className = "dish";
  dishDiv.innerHTML = `
    <img src="${dish.img}" alt="${dish.name}">
    <h3>${dish.name}</h3>
    <p>₹${dish.price} per plate</p>
    <label for="qty-${index}">Quantity:</label><br>
    <input type="number" id="qty-${index}" min="1" placeholder="Qty">
    <div class="btn-row">
      <button onclick="addDish(${index})">Add</button>
      <button class="cancel-btn" onclick="cancelDish(${index})">Cancel</button>
    </div>
  `;
  menu.appendChild(dishDiv);
});

function addDish(index) {
  const qtyInput = document.getElementById(`qty-${index}`);
  const quantity = parseInt(qtyInput.value);
  if (!quantity || quantity <= 0) return;
  const dish = dishes[index];
  const totalPrice = dish.price * quantity;

  const existing = selectedDishes.find(d => d.name === dish.name);
  if (existing) {
    existing.quantity = quantity;
    existing.totalPrice = totalPrice;
  } else {
    selectedDishes.push({ name: dish.name, price: dish.price, quantity, totalPrice });
  }

  if (selectedDishes.length === 2) {
    alert("Aur kuch chahiye kya? 😊");
  }
}

function cancelDish(index) {
  const qtyInput = document.getElementById(`qty-${index}`);
  qtyInput.value = "";
  const dishName = dishes[index].name;
  selectedDishes = selectedDishes.filter(d => d.name !== dishName);
}

function showFinalBill() {
  const billDiv = document.getElementById("final-bill");
  billDiv.style.display = "block";

  billDiv.innerHTML = `
    <div class="bill-box">
      <h2>📜 Final Bill</h2>
      <div id="bill-items"></div>
      <hr>
      <h3 id="bill-total"></h3>
      <div class="payment-option">
        <label for="payment">Choose Payment Method:</label><br>
        <select id="payment">
          <option value="cash"> Cash</option>
          <option value="upi"> UPI</option>
          <option value="card"> Card</option>
        </select><br><br>
        <button class="final-bill-btn" onclick="processPayment()">✅ Proceed to Pay</button>
      </div>
      <div id="payment-process" style="margin-top: 20px;"></div>
      <p class="thanks-msg">🙏 Thank you for visiting Aryan's Hotel!</p>
    </div>
  `;

  const billItems = document.getElementById("bill-items");
  let total = 0;

  selectedDishes.forEach(dish => {
    const p = document.createElement("p");
    p.textContent = `${dish.name} — ₹${dish.price} x ${dish.quantity} = ₹${dish.totalPrice}`;
    billItems.appendChild(p);
    total += dish.totalPrice;
  });

  document.getElementById("bill-total").innerText = `Total Amount: ₹${total}`;
  billDiv.scrollIntoView({ behavior: 'smooth' });
}

function processPayment() {
  const method = document.getElementById("payment").value;
  const div = document.getElementById("payment-process");
  div.innerHTML = "";

  if (method === "cash") {
    div.innerHTML = "<p>💵 Please pay in cash at the counter.</p>";
    launchConfetti();
  } else if (method === "upi") {
    div.innerHTML = `
      <p>📱 Scan the UPI QR below to pay:</p>
      <img src="https://via.placeholder.com/150x150.png?text=UPI+QR" alt="UPI QR Code" style="margin:auto;display:block;">
    `;
    launchConfetti();
  } else if (method === "card") {
    div.innerHTML = `
      <p>💳 Enter your card details:</p>
      <input type="text" placeholder="Card Number" style="width:90%;padding:6px;margin:5px 0;"><br>
      <input type="text" placeholder="Expiry MM/YY" style="width:90%;padding:6px;margin:5px 0;"><br>
      <input type="password" placeholder="CVV" style="width:90%;padding:6px;margin:5px 0;"><br>
      <button class="final-bill-btn" onclick="alert('✅ Payment Successful!'); launchConfetti();">Pay Now</button>
    `;
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// 🎊 Confetti JS
function launchConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
