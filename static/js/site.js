document.documentElement.classList.add("js-enabled");

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.matchMedia("(min-width: 901px)").addEventListener("change", closeMenu);
}

const themeToggle = document.querySelector(".theme-toggle");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)");

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle?.setAttribute("aria-pressed", String(theme === "dark"));
};

const syncThemeLinks = (theme) => {
  document.querySelectorAll('a[href]').forEach((link) => {
    const url = new URL(link.getAttribute("href"), window.location.href);
    if (url.origin === window.location.origin && url.protocol === window.location.protocol) {
      url.searchParams.set("scoutTheme", theme);
      link.setAttribute("href", url.href);
    }
  });
};

const explicitTheme = new URLSearchParams(window.location.search).get("scoutTheme");
applyTheme(explicitTheme === "light" || explicitTheme === "dark"
  ? explicitTheme
  : preferredTheme.matches ? "dark" : "light");

if (explicitTheme === "light" || explicitTheme === "dark") {
  syncThemeLinks(explicitTheme);
}

themeToggle?.addEventListener("click", () => {
  const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(theme);
  const url = new URL(window.location.href);
  url.searchParams.set("scoutTheme", theme);
  window.history.replaceState(null, "", url);
  syncThemeLinks(theme);
});

preferredTheme.addEventListener("change", (event) => {
  if (!new URLSearchParams(window.location.search).has("scoutTheme")) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

const year = document.querySelector("#current-year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}
