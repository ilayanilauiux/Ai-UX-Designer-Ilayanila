/* Runs in <head>, before first paint: theme + language + fonts, so nothing flashes. */
(function () {
  var d = document.documentElement, theme = "dark", lang = "en";
  try {
    var s = null;
    theme = s === "light" ? "light" : "dark";
    var l = localStorage.getItem("lang");
    lang = l === "de" || l === "ar" ? l : "en";
  } catch (e) {}
  d.setAttribute("data-theme", theme);
  d.style.colorScheme = theme;
  d.lang = lang;
  var hasI18n = !!document.querySelector('script[src*="i18n.js"]') || /index\.html$|\/$|case\.html|crif-connect\.html|simplify-vms|contingent-workforce|designing-trust|shift-management/.test(location.pathname);
  d.dir = lang === "ar" && hasI18n ? "rtl" : "ltr";
  d.classList.add("sh-on");
  var f = document.createElement("link");
  f.rel = "stylesheet";
  f.href = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Instrument+Sans:wght@400;500;600&display=swap";
  document.head.appendChild(f);
})();
