function getSiteBaseUrl() {
  // When hosted in a subfolder (ex: GitHub Pages), links must keep that folder.
  // Derive a stable "site root" from the current URL and strip known year-subfolders.
  const { origin, pathname } = window.location;
  const knownSubfolders = ["/2025-2026/", "/2024-2025/"];

  for (const sub of knownSubfolders) {
    const idx = pathname.indexOf(sub);
    if (idx !== -1) {
      const basePath = `${pathname.slice(0, idx)}/`;
      return new URL(basePath, origin);
    }
  }

  // Fallback: use the directory where meny.js is loaded from.
  const currentScript =
    document.currentScript || document.querySelector('script[src$="meny.js"]');
  if (currentScript?.src) return new URL("./", currentScript.src);

  // Final fallback: current document directory.
  return new URL("./", window.location.href);
}

const siteBaseUrl = getSiteBaseUrl();
const href = (path) => new URL(path, siteBaseUrl).href;


//head
document.querySelector("head").insertAdjacentHTML("beforeend",`<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Space+Grotesk:wght@400;600&display=swap" rel="stylesheet"/>
    <link rel="icon" type="image/x-icon" href="../SFHS_logo.png" />`)


// Header
document.querySelector("header").classList.add("navbar");
document.querySelector("header").innerHTML = (`
  <a href="${href("index.html")}">
        <img src="${href("bilder/SFHS_logo.png")}" alt="" id="logo" />
      </a>
      <div class="title">
        <div id="title-over">SVALBARD FOLKEHØGSKOLE</div>
        <div id="title-under">Teknologi & Forskning</div>
      </div>
      <div class="menu-collapsed"><p>Meny</p></div>
      <nav class="menu">
        <a href="${href("index.html")}">Hjem</a>
        <a href="${href("spill.html")}">Spill</a>
        <a href="${href("index.html#prosjekter")}">Prosjekter</a>
        <a href="${href("faq.html")}">FAQ</a>
        <a href="https://www.folkehogskole.no/skole/svalbard/soknad" target="_blank" rel="noopener noreferrer">Søk nå</a>
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