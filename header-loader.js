// header-loader.js
document.addEventListener("DOMContentLoaded", async () => {
  const headerSlot = document.getElementById("site-header");
  if (!headerSlot) return;

  try {
    const res = await fetch("header.html");
    const html = await res.text();
    headerSlot.innerHTML = html;

    const path = window.location.pathname;
    const isSpanish = path.includes("-es");

    // Detecta botones idioma
    const esBtn = headerSlot.querySelector(".lang-btn.es");
    const enBtn = headerSlot.querySelector(".lang-btn.en");

    if (isSpanish) {
      esBtn.classList.add("active");
      enBtn.classList.remove("active");
    } else {
      enBtn.classList.add("active");
      esBtn.classList.remove("active");
    }

    // Si estás en español, cambia los textos del menú y los hrefs
    const navLinks = headerSlot.querySelectorAll("nav a");
    navLinks.forEach(link => {
      const enHref = link.getAttribute("href");
      const esHref = link.getAttribute("data-es");

      if (isSpanish) {
        // cambia los textos del menú
        if (link.textContent === "ABOUT ME") link.textContent = "SOBRE MÍ";
        if (link.textContent === "PORTFOLIO") link.textContent = "PORTAFOLIO";
        if (link.textContent === "CONTACT") link.textContent = "CONTACTO";

        // cambia el destino del href
        if (esHref) link.setAttribute("href", esHref);
      } else {
        // vuelve al inglés
        link.setAttribute("href", enHref);
      }

      // marca la página activa automáticamente
      const linkPath = link.getAttribute("href");
      if (path.endsWith(linkPath)) link.classList.add("active");
    });
  } catch (err) {
    console.error("No pude cargar el header:", err);
  }
});
