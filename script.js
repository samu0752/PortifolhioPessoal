"use strict";

// Filtro de cursos e certificações por área
const filterButtons = document.querySelectorAll(".filter-btn");
const certItems = document.querySelectorAll("#certs-list li");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle("is-active", btn === button));
    certItems.forEach((item) => {
      item.hidden = selected !== "all" && item.dataset.area !== selected;
    });
  });
});

// Botão para copiar e-mail com feedback discreto
const copyButton = document.getElementById("copy-email");
if (copyButton && navigator.clipboard) {
  copyButton.addEventListener("click", async () => {
    const email = copyButton.dataset.email;
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      const original = copyButton.textContent;
      copyButton.textContent = "E-mail copiado";
      window.setTimeout(() => {
        copyButton.textContent = original;
      }, 2200);
    } catch {
      copyButton.textContent = email;
    }
  });
}

// Destaque suave da seção ativa na navegação
const navLinks = Array.from(document.querySelectorAll(".header-inner nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.classList.toggle("is-current", link.getAttribute("href") === id);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );
  sections.forEach((section) => observer.observe(section));
}
