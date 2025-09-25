const btn = document.getElementById("buyBtn");

btn.addEventListener("click", () => {
  btn.classList.add("scale-110", "bg-green-600");

  setTimeout(() => {
    btn.classList.remove("scale-110");
    btn.classList.add("scale-100");
  }, 150);

  setTimeout(() => {
    btn.classList.remove("scale-100", "bg-green-600");
  }, 300);

  console.log("Кнопка нажата!");
});