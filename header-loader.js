document.addEventListener("DOMContentLoaded", async () => {
  // 1. buscamos el contenedor donde irá el header
  const headerSlot = document.getElementById("site-header");
  if (!headerSlot) return;

  // 2. cargamos el header.html
  try {
    const res = await fetch("header.html");
    const headerHTML = await res.text();
    headerSlot.innerHTML = headerHTML;
  } catch (err) {
    console.error("No pude cargar header.html", err);
    return;
  }

  // 3. ahora que el header ya está en el DOM, ajustamos idioma / activo
  const path = window.location.pathname;
  const isSpanish = path.includes("-es");

  // idioma activo
  const esBtn = headerSlot.querySelector(".lang-btn.es");
  const enBtn = headerSlot.querySelector(".lang-btn.en");

  if (isSpanish) {
    esBtn.classList.add("active");
    enBtn.classList.remove("active");
  } else {
    enBtn.classList.add("active");
    esBtn.classList.remove("active");
  }
  
  // 🔹 🔹 NUEVO BLOQUE: hacer que el logo apunte a la versión correcta según idioma
  const logoLink = headerSlot.querySelector(".logo");
  if (logoLink) {
    if (isSpanish) {
      logoLink.setAttribute("href", "index-es.html");
    } else {
      logoLink.setAttribute("href", "index.html");
    }
  }
  
  // 4. actualizar textos y hrefs del menú si estamos en español
  const navLinks = headerSlot.querySelectorAll("nav a");
  navLinks.forEach(link => {
    const hrefEn = link.getAttribute("href");      // ej: "AboutMe.html"
    const hrefEs = link.getAttribute("data-es");   // ej: "SobreMi-es.html"

    if (isSpanish) {
      // cambiar los textos visibles
      if (link.textContent.trim() === "ABOUT ME") link.textContent = "SOBRE MÍ";
      if (link.textContent.trim() === "PORTFOLIO") link.textContent = "PORTAFOLIO";
      if (link.textContent.trim() === "CONTACT") link.textContent = "CONTACTO";

      // cambiar la ruta al .html en español si existe
      if (hrefEs) {
        link.setAttribute("href", hrefEs);
      }
    } else {
      // en inglés dejamos los textos como están y href normal
      link.setAttribute("href", hrefEn);
    }

    // 5. marcar la página activa con la clase .active
    // (para que salga el pill coral en CONTACT cuando estás en Contact.html, etc.)
    const currentPage = path.split("/").pop(); // última parte de la URL
    if (
      currentPage === link.getAttribute("href") ||
      currentPage === link.getAttribute("href").replace("./", "")
    ) {
      link.classList.add("active");
    }
  });
});
