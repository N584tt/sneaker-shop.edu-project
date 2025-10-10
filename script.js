// ====== ДАННЫЕ ТОВАРОВ ======
const products = [
  { id: 1, title: "Мужские Кроссовки Nike Blazer Mid Suede", price: 79990, img: "assets/products/nike-blazer-mid-suede.jpg", liked: false, inCart: false },
  { id: 2, title: "Мужские Кроссовки Nike Air Max 270", price: 79990, img: "assets/products/nike-air-max-270.jpg", liked: false, inCart: false },
  { id: 3, title: "Мужские Кроссовки Nike Blazer Mid Suede", price: 55490, img: "assets/products/nike-blazer-mid-suede-white.jpg", liked: false, inCart: false },
  { id: 4, title: "Кроссовки Puma X Aka Boku Future Rider", price: 59990, img: "assets/products/aka-boku-future-rider.jpg", liked: false, inCart: false },
  { id: 5, title: "Мужские Кроссовки Under Armour Curry 8", price: 90990, img: "assets/products/under-armor-curry-8.jpg", liked: false, inCart: false },
  { id: 6, title: "Мужские Кроссовки Nike Kyrie 7", price: 67990, img: "assets/products/nike-kyrie-7.jpg", liked: false, inCart: false },
  { id: 7, title: "Мужские Кроссовки Jordan Air Jordan 11", price: 64699, img: "assets/products/jordan-air-jordan-11.jpg", liked: false, inCart: false },
  { id: 8, title: "Мужские Кроссовки Nike LeBron XVIII", price: 99990, img: "assets/products/nike-lebron-xviii.jpg", liked: false, inCart: false },
  { id: 9, title: "Мужские Кроссовки Nike Lebron XVIII Low", price: 83399, img: "assets/products/nike-lebrom-xvii-low.jpg", liked: false, inCart: false },
  { id: 10, title: "Мужские Кроссовки Nike Blazer Mid Suede", price: 51990, img: "assets/products/nike-blazer-mid-suede-green.jpg", liked: false, inCart: false },
  { id: 11, title: "Кроссовки Puma X Aka Boku Future Rider", price: 53990, img: "assets/products/aka-boku-future-rider.jpg", liked: false, inCart: false },
  { id: 12, title: "Мужские Кроссовки Nike Kyrie Flytrap IV", price: 67990, img: "assets/products/nike-kyrie-flytrap-iv.jpg", liked: false, inCart: false }
];

// ====== КОНТЕЙНЕР ДЛЯ КАРТОЧЕК ======
const cardsContainer = document.querySelector(".cards");

// ====== ФУНКЦИЯ ОТРИСОВКИ ТОВАРОВ ======
function renderProducts(list) {
  if (!cardsContainer) {
    console.error("Контейнер .cards не найден. Убедись, что в HTML есть <div class='cards'> ...</div>");
    return;
  }
  let html = "";
  list.forEach(product => {
    html += `
      <div class="card w-72 rounded-3xl border border-gray-200 shadow-md p-4 flex flex-col relative">
        <img class="absolute top-3 left-3 w-6 h-6 cursor-pointer like-btn"
             src="assets/icons/${product.liked ? 'liked' : 'umliked'}.svg"
             data-id="${product.id}" alt="like">
        <img class="w-70" src="${product.img}" alt="${product.title}">
        <p class="mt-3 text-sm font-medium text-center">${product.title}</p>
        <div class="flex items-center justify-between mt-3">
          <div class="flex flex-col">
            <span class="text-gray-400 text-sm">ЦЕНА:</span>
            <p class="text-lg font-bold">${product.price} тг.</p>
          </div>
          <img src="assets/icons/${product.inCart ? 'addedcart' : 'addcart'}.svg"
               alt="add to cart" class="w-6 h-6 cursor-pointer cart-btn" data-id="${product.id}">
        </div>
      </div>
    `;
  });
  cardsContainer.innerHTML = html;
  updateHeaderCartTotal(); // Обновляем сумму в шапке после рендера
}

// ====== ПОИСК ======
const searchInput = document.querySelector(".search input");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    const filtered = products.filter(p => p.title.toLowerCase().includes(q));
    renderProducts(filtered);
  });
} else {
  console.warn("Поле поиска не найдено. Поиск отключён.");
}

// ====== ФУНКЦИЯ ОБНОВЛЕНИЯ СУММЫ В ШАПКЕ ======
function updateHeaderCartTotal() {
  const cartTotalElement = document.querySelector(".cart-container p");
  if (cartTotalElement) {
    const total = products.filter(p => p.inCart).reduce((sum, p) => sum + p.price, 0);
    cartTotalElement.textContent = `${total || 0} тг.`;
  }
}

// ====== ОТКРЫТИЕ ПАНЕЛЕЙ ======
const cartContainer = document.querySelector(".cart-container");
const favoritesContainer = document.querySelector(".favorites-container");
const profileContainer = document.querySelector(".profile-container");
const cartPanel = document.getElementById("cartPanel");
const favoritesPanel = document.getElementById("favoritesPanel");
const profilePanel = document.getElementById("profilePanel");
const closeCartBtn = document.getElementById("closeCartBtn");
const closeFavoritesBtn = document.getElementById("closeFavoritesBtn");
const closeProfileBtn = document.getElementById("closeProfileBtn");

if (cartContainer && cartPanel && closeCartBtn) {
  cartContainer.addEventListener("click", () => {
    cartPanel.classList.remove("translate-x-full");
    renderCart();
  });
  closeCartBtn.addEventListener("click", () => {
    cartPanel.classList.add("translate-x-full");
  });
}

if (favoritesContainer && favoritesPanel && closeFavoritesBtn) {
  favoritesContainer.addEventListener("click", () => {
    favoritesPanel.classList.remove("translate-x-full");
    renderFavorites();
  });
  closeFavoritesBtn.addEventListener("click", () => {
    favoritesPanel.classList.add("translate-x-full");
  });
}

if (profileContainer && profilePanel && closeProfileBtn) {
  profileContainer.addEventListener("click", () => {
    profilePanel.classList.remove("translate-x-full");
  });
  closeProfileBtn.addEventListener("click", () => {
    profilePanel.classList.add("translate-x-full");
  });
  document.getElementById("backProfileBtn")?.addEventListener("click", () => {
    profilePanel.classList.add("translate-x-full");
  });
}

// ====== ФУНКЦИЯ ОТРИСОВКИ КОРЗИНЫ ======
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartTax = document.getElementById("cartTax");
  const cartGrandTotal = document.getElementById("cartGrandTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (!cartItems || !cartTotal || !cartTax || !cartGrandTotal || !checkoutBtn) return;

  const cartProducts = products.filter(p => p.inCart);
  if (cartProducts.length === 0) {
    cartItems.innerHTML = `
      <div class="text-center">
        <span class="text-4xl">😢</span>
        <h2>У вас нет заказов</h2>
        <p>Оформите хотя бы один заказ.</p>
        <button id="backCartBtn" class="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded-xl">Вернуться назад</button>
      </div>
    `;
    document.getElementById("backCartBtn")?.addEventListener("click", () => {
      cartPanel.classList.add("translate-x-full");
    });
    cartTotal.textContent = "0 тг.";
    cartTax.textContent = "0 тг.";
    cartGrandTotal.textContent = "0 тг.";
    checkoutBtn.style.display = "none";
  } else {
    let html = "";
    let total = 0;
    cartProducts.forEach(product => {
      total += product.price;
      html += `
        <div class="flex justify-between items-center border-b pb-2">
          <img src="${product.img}" alt="${product.title}" class="w-16 h-16 object-cover">
          <div>
            <p class="text-sm">${product.title}</p>
            <p class="text-sm">${product.price} тг.</p>
          </div>
          <button class="remove-cart-btn text-red-500" data-id="${product.id}">×</button>
        </div>
      `;
    });
    cartItems.innerHTML = html;
    const tax = total * 0.05;
    const grandTotal = total + tax;
    cartTotal.textContent = `${total} тг.`;
    cartTax.textContent = `${tax.toFixed(2)} тг.`;
    cartGrandTotal.textContent = `${grandTotal.toFixed(2)} тг.`;
    checkoutBtn.style.display = "block";

    document.querySelectorAll(".remove-cart-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = +e.target.dataset.id;
        const item = products.find(p => p.id === id);
        item.inCart = false;
        renderProducts(products);
        renderCart();
        updateHeaderCartTotal();
      });
    });
  }
}

// ====== ФУНКЦИЯ ОТРИСОВКИ ЗАКЛАДОК ======
function renderFavorites() {
  const favoritesItems = document.getElementById("favoritesItems");
  if (!favoritesItems) return;

  const favoriteProducts = products.filter(p => p.liked);
  if (favoriteProducts.length === 0) {
    favoritesItems.innerHTML = `
      <div class="text-center">
        <span class="text-4xl">😔</span>
        <h2>Закладок нет :(</h2>
        <p>Вы ничего не добавляли в закладки</p>
        <button id="backFavoritesBtn" class="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded-xl">Вернуться назад</button>
      </div>
    `;
    document.getElementById("backFavoritesBtn")?.addEventListener("click", () => {
      favoritesPanel.classList.add("translate-x-full");
    });
  } else {
    let html = "";
    favoriteProducts.forEach(product => {
      html += `
        <div class="flex justify-between items-center border-b pb-2">
          <img src="${product.img}" alt="${product.title}" class="w-16 h-16 object-cover">
          <p class="text-sm">${product.title}</p>
          <button class="remove-fav-btn text-red-500" data-id="${product.id}">×</button>
        </div>
      `;
    });
    favoritesItems.innerHTML = html;

    document.querySelectorAll(".remove-fav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = +e.target.dataset.id;
        const item = products.find(p => p.id === id);
        item.liked = false;
        renderProducts(products);
        renderFavorites();
      });
    });
  }
}

// ====== СЛУШАТЕЛЬ СОБЫТИЙ ДЛЯ ЛАЙКОВ И КОРЗИНЫ ======
document.addEventListener("click", e => {
  if (e.target.classList.contains("like-btn")) {
    const id = +e.target.dataset.id;
    const item = products.find(p => p.id === id);
    item.liked = !item.liked;
    renderProducts(products);
  }

  if (e.target.classList.contains("cart-btn")) {
    const id = +e.target.dataset.id;
    const item = products.find(p => p.id === id);
    item.inCart = !item.inCart;
    renderProducts(products);
    renderCart();
    updateHeaderCartTotal();
  }
});

// ====== КНОПКА "КУПИТЬ" ======
const btn = document.getElementById("buyBtn");
if (btn) {
  btn.addEventListener("click", () => {
    btn.classList.add("scale-110", "bg-green-600");
    setTimeout(() => btn.classList.remove("scale-110"), 150);
    setTimeout(() => btn.classList.remove("bg-green-600"), 300);
    console.log("Кнопка 'Купить' нажата!");
  });
}

// ====== ПЕРВЫЙ РЕНДЕР ======
renderProducts(products);
updateHeaderCartTotal();