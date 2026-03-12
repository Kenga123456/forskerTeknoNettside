// Header
document.querySelector("header").classList.add("navbar");
document.querySelector("header").innerHTML = (`
  <a href="/index.html">
        <img src="/bilder/SFHS_logo.png" alt="" id="logo" />
      </a>
      <div class="title">
        <div id="title-over">SVALBARD FOLKEHØGSKOLE</div>
        <div id="title-under">Teknologi & Forskning</div>
      </div>
      <div class="menu-collapsed"><p>Meny</p></div>
      <nav class="menu">
        <a href="/index.html">Hjem</a>
        <a href="/spill.html">Spill</a>
        <a href="/index.html#prosjekter">Prosjekter</a>
        <a href="/faq.html">FAQ</a>
        <a href="https://www.folkehogskole.no/skole/svalbard/soknad" target="_blank">Søk nå</a>
      </nav>
`);

// Footer
document.querySelector("footer").innerHTML = (`
  <div class="social-links">
    <a href="https://www.instagram.com/sfhs_forskerspire/" target="_blank" rel="noopener noreferrer">Forsker Instagram</a>
    <a href="https://www.instagram.com/sfhs_teknologi/" target="_blank" rel="noopener noreferrer">Tekno Instagram</a>
    <a href="https://www.instagram.com/svalbardfhs/" target="_blank" rel="noopener noreferrer">Svalbard Folkehøgskole Instagram</a>
  </div>
  <div class="footer-text">
    <p>2025 Svalbard Folkehøgskole · Teknologi & Innovasjon, Forskerspire</p>
  </div>
`);

// Organic menu
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

