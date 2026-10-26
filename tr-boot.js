/* Case pages: hide body until the DE/AR dictionary has been applied (3s safety net). */
(function () {
  var d = document.documentElement, l = d.lang;
  if (l !== "de" && l !== "ar") return;
  var s = document.createElement("style");
  s.textContent = "html.tr-wait body{opacity:0}html.tr-wait .loader{display:none}body{transition:opacity .18s}";
  document.head.appendChild(s);
  d.classList.add("tr-wait");
  setTimeout(function () { d.classList.remove("tr-wait"); }, 3000);
})();
