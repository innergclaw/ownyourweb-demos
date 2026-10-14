const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".main-nav a, .header-cta");

menuButton?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open menu");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
