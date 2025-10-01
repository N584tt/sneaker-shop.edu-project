
const products = [
  { id: 1, title: "Мужские Кроссовки Nike Blazer Mid Suede", price: "79 990 тг.", img: "assets/products/nike-blazer-mid-suede.jpg", liked: "assets/icons/liked.svg", cart: "assets/icons/addcart.svg" },
  { id: 2, title: "Мужские Кроссовки Nike Air Max 270", price: "79 990 тг.", img: "assets/products/nike-air-max-270.jpg", liked: "assets/icons/umliked.svg", cart: "assets/icons/addedcart.svg" },
  { id: 3, title: "Мужские Кроссовки Nike Blazer Mid Suede", price: "55 490 тг.", img: "assets/products/nike-blazer-mid-suede-white.jpg", liked: "assets/icons/umliked.svg", cart: "assets/icons/addcart.svg" },
  { id: 4, title: "Кроссовки Puma X Aka Boku Future Rider", price: "59 990 тг.", img: "assets/products/aka-boku-future-rider.jpg", liked: "assets/icons/umliked.svg", cart: "assets/icons/addcart.svg" },
  { id: 5, title: "Мужские Кроссовки Under Armour Curry 8", price: "90 990 тг.", img: "assets/products/under-armor-curry-8.jpg", liked: "assets/icons/umliked.svg", cart: "assets/icons/addcart.svg" },
  { id: 6, title: "Мужские Кроссовки Nike Kyrie 7", price: "67 990 тг.", img: "assets/products/nike-kyrie-7.jpg", liked: "assets/icons/umliked.svg", cart: "assets/icons/addcart.svg" },
  { id: 7, title: "Мужские Кроссовки Jordan Air Jordan 11", price: "64 699 тг.", img: "assets/products/jordan-air-jordan-11.jpg", liked: "assets/icons/umliked.svg", cart: "assets/icons/addcart.svg" },
  { id: 8, title: "Мужские Кроссовки Nike LeBron XVIII", price: "99 990 тг.", img: "assets/products/nike-lebrom-xviii.jpg", liked: "assets/icons/umliked.svg", cart: "assets/icons/addcart.svg" },
  { id: 9, title: "Мужские Кроссовки Nike Lebron XVIII Low", price: "83 399 тг.", img: "assets/products/nike-lebrom-xvii-low.jpg", liked: "assets/icons/umliked.svg", cart: "assets/icons/addcart.svg" },
  { id: 10, title: "Мужские Кроссовки Nike Blazer Mid Suede", price: "51 990 тг.", img: "assets/products/nike-blazer-mid-suede-green.jpg", liked: "assets/icons/umliked.svg", cart: "assets/icons/addcart.svg" },
  { id: 11, title: "Кроссовки Puma X Aka Boku Future Rider", price: "53 990 тг.", img: "assets/products/aka-boku-future-rider.jpg", liked: "assets/icons/umliked.svg", cart: "assets/icons/addcart.svg" },
  { id: 12, title: "Мужские Кроссовки Nike Kyrie Flytrap IV", price: "67 990 тг.", img: "assets/products/nike-kyrie-flytrap-iv.jpg", liked: "assets/icons/umliked.svg", cart: "assets/icons/addcart.svg" }
];

// контейнер для карточек
const cardsContainer = document.querySelector(".cards");
if (!cardsContainer) {
  console.error("Контейнер .cards не найден. Убедись, что в HTML есть <div class='cards'> ...</div>");
}

// отрисовка карточек
function renderProducts(list) {
  if (!cardsContainer) return;
  let html = "";
  list.forEach(product => {
    html += `
      <div class="card w-72 rounded-3xl border border-gray-200 shadow-md p-4 flex flex-col relative">
        <img class="absolute top-3 left-3 w-6 h-6 cursor-pointer" src="${product.liked}" alt="like">
        <img class="w-70" src="${product.img}" alt="${product.title}">
        <p class="mt-3 text-sm font-medium text-center">${product.title}</p>
        <div class="flex items-center justify-between mt-3">
          <div class="flex flex-col">
            <span class="text-gray-400 text-sm">ЦЕНА:</span>
            <p class="text-lg font-bold">${product.price}</p>
          </div>
          <img src="${product.cart}" alt="add to cart" class="w-6 h-6 cursor-pointer">
        </div>
      </div>
    `;
  });
  cardsContainer.innerHTML = html;
}

// поиск
const searchInput = document.getElementById("search") || document.querySelector(".search input");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    const filtered = products.filter(p => p.title.toLowerCase().includes(q));
    renderProducts(filtered);
  });
} else {
  console.warn("Поле поиска не найдено (ожидалось #search или .search input). Поиск отключён.");
}

// кнопка "Купить"
const btn = document.getElementById("buyBtn");
if (btn) {
  btn.addEventListener("click", () => {
    btn.classList.add("scale-110", "bg-green-600");
    setTimeout(() => btn.classList.remove("scale-110"), 150);
    setTimeout(() => btn.classList.remove("bg-green-600"), 300);
    console.log("Кнопка нажата!");
  });
}

// ====== ПЕРВЫЙ РЕНДЕР ======
renderProducts(products);
