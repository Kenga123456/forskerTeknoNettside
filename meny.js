const menuCollapsed = document.querySelector(".menu-collapsed");
const menu = document.querySelector(".menu");

menuCollapsed.addEventListener("click", () => {
  menu.classList.toggle("show-menu");
});

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    nav.classList.add("shrink");
    menu.classList.add("shrink");
  } else {
    nav.classList.remove("shrink");
    menu.classList.remove("shrink");
  }
});


