/* Shared site shell. Injects the common header, a contextual case-study bar, theme + language controls. */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  var path = location.pathname.split("/").pop() || "index.html";
  var isHome = path === "index.html" || path === "";
  if (!isHome) document.documentElement.classList.add("sh-detail");
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lang = root.lang || "en";
  var HOME = "./index.html";

  var D = {
    de: { "Contact now": "Kontakt aufnehmen", About: "Über mich", Work: "Arbeiten", Skills: "Fähigkeiten", Experience: "Erfahrung", "All work": "Alle Arbeiten", "Open menu": "Menü öffnen", "Close menu": "Menü schließen", Language: "Sprache", "Switch to light theme": "Zum hellen Design wechseln", "Switch to dark theme": "Zum dunklen Design wechseln", "Case study sections": "Abschnitte der Fallstudie", Home: "Startseite", "English only": "Dieser Inhalt ist vorerst nur auf Englisch verfügbar." },
    ar: { "Contact now": "تواصل الآن", About: "نبذة عني", Work: "الأعمال", Skills: "المهارات", Experience: "الخبرة", "All work": "كل الأعمال", "Open menu": "فتح القائمة", "Close menu": "إغلاق القائمة", Language: "اللغة", "Switch to light theme": "التبديل إلى السمة الفاتحة", "Switch to dark theme": "التبديل إلى السمة الداكنة", "Case study sections": "أقسام دراسة الحالة", Home: "الرئيسية", "English only": "هذا المحتوى متاح بالإنجليزية فقط حاليًا." }
  };
  function t(k) { var p = D[lang]; return p && p[k] ? p[k] : k; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var hasI18n = !!doc.querySelector('script[src*="i18n.js"]') || /^(index|case|crif-connect|contingent-workforce|designing-trust-ai-hiring|shift-management|simplify-vms.*)\.html$|^$/.test(path);
  var padMap = { "contingent-workforce.html": 24, "designing-trust-ai-hiring.html": 15, "crif-connect-copy.html": 15 };

  /* ---------- 1. harvest the page's own navigation before we hide it ---------- */
  function harvest() {
    var links = [], seen = {};
    var olds = doc.querySelectorAll("header.nav:not(.sh) a, header.site-nav a, body > nav:not(.sh-sub) a, nav[aria-label='Case study'] a, nav[aria-label='Case study sections'] a");
    olds.forEach(function (a) {
      var h = a.getAttribute("href") || "", txt = a.textContent.replace(/\s+/g, " ").trim();
      if (!h || !txt || /^\.?\/?index\.html(#.*)?$/.test(h) || /^#top$/.test(h) || /all work/i.test(txt) || /ilayanila/i.test(txt)) return;
      if (seen[h]) return; seen[h] = 1;
      links.push({ href: h, label: txt, key: a.getAttribute("data-i18n") || txt });
    });
    if (links.length < 2 && !isHome) {
      links = [];
      doc.querySelectorAll("main section[id], body > section[id], section[id]").forEach(function (s) {
        var h = s.querySelector("h2, h1, .eyebrow, [class*=title]");
        var label = (s.getAttribute("data-nav") || (h && h.textContent) || "").replace(/\s+/g, " ").trim();
        if (!label || s.closest("[hidden]")) return;
        label = label.length > 22 ? label.slice(0, 20).replace(/\s+\S*$/, "") + "…" : label;
        if (!seen[s.id]) { seen[s.id] = 1; links.push({ href: "#" + s.id, label: label, key: label }); }
      });
      links = links.slice(0, 8);
    }
    return links;
  }

  /* ---------- 2. build header ---------- */
  var NAV = [["#about", "About"], ["#work", "Work"], ["#expertise", "Skills"], ["#impact", "Experience"]];
  function homeHref(h) { return isHome ? h : HOME + h; }
  var sun = '<svg class="sh-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var moon = '<svg class="sh-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z"/></svg>';
  var mono = '<svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false"><rect x="1" y="1" width="30" height="30" rx="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 22V10M14 22V10l4.5 7L23 10v12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function langHTML(cls) {
    return '<div class="sh-lang ' + (cls || "") + '" role="radiogroup" dir="ltr" aria-label="' + esc(t("Language")) + '">' +
      [["en", "EN", "English"], ["de", "DE", "Deutsch"], ["ar", "AR", "العربية"]].map(function (l) {
        return '<button type="button" role="radio" data-sh-lang="' + l[0] + '" lang="' + l[0] + '" aria-label="' + l[2] + '" aria-checked="' + (lang === l[0]) + '" tabindex="' + (lang === l[0] ? 0 : -1) + '">' + l[1] + "</button>";
      }).join("") + "</div>";
  }
  function build(sub) {
    var nav = NAV.map(function (n) { return '<a href="' + homeHref(n[0]) + '" data-sh-key="' + n[1] + '"' + (!isHome && n[1] === "Work" ? ' aria-current="true"' : "") + ">" + esc(t(n[1])) + "</a>"; }).join("");
    var cta = isHome
      ? '<button type="button" class="sh-cta" data-open-modal data-sh-cta>' + esc(t("Contact now")) + "</button>"
      : '<a class="sh-cta" href="' + HOME + '#contact" data-sh-cta>' + esc(t("Contact now")) + "</a>";
    var h = doc.createElement("div");
    h.innerHTML =
      '<header class="sh" role="banner">' +
      '<a class="sh-logo" href="' + (isHome ? "#top" : HOME) + '" aria-label="Ilayanila M, home">' + mono + "<span>ILAYANILA M</span></a>" +
      '<nav class="sh-nav" aria-label="Primary">' + nav + "</nav>" +
      '<div class="sh-tools">' + langHTML("tools") +
      '<button type="button" class="sh-icon" data-sh-theme aria-pressed="false">' + sun + moon + "</button>" + cta +
      '<button type="button" class="sh-menu" aria-expanded="false" aria-label="' + esc(t("Open menu")) + '"><span></span></button></div></header>' +
      '<div class="sh-drawer" role="navigation" aria-label="Menu">' + NAV.map(function (n) { return '<a href="' + homeHref(n[0]) + '">' + esc(t(n[1])) + "</a>"; }).join("") +
      (sub && sub.length ? sub.map(function (s) { return '<a href="' + esc(s.href) + '">' + esc(s.label) + "</a>"; }).join("") : "") + langHTML() + "</div>";
    return h;
  }

  var links = [];
  function mount() {
    try { var st = null === "light" ? "light" : "dark"; root.setAttribute("data-theme", st); root.style.colorScheme = st; } catch (e) {}
    var frag = build([]);
    var anchor = doc.body.firstChild;
    while (frag.firstChild) doc.body.insertBefore(frag.firstChild, anchor);
    var pad = padMap[path];
    if (pad) { var sp = doc.createElement("div"); sp.className = "sh-pad"; sp.style.height = pad + "px"; doc.body.insertBefore(sp, doc.body.firstChild); }
    wire();
    if (isHome) homeSpy();
    var late = function () {
      links = harvest();
      if (!isHome) {
        var dr = doc.querySelector(".sh-drawer"), grp = dr && dr.querySelector(".sh-lang");
        links.forEach(function (l) { var a = doc.createElement("a"); a.href = l.href; a.textContent = l.label; a.addEventListener("click", function () { doc.querySelector(".sh").classList.remove("open"); }); dr.insertBefore(a, grp); });
        subnav();
      }
    };
    if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", late); else late();
  }

  /* ---------- 3. theme: View-Transition circle reveal, with graceful fallback ---------- */
  function setTheme(next) {
    root.setAttribute("data-theme", next);
    root.style.colorScheme = next;
    try { /* theme is per page view; every page opens dark */ } catch (e) {}
    syncTheme();
  }
  function syncTheme() {
    var light = root.getAttribute("data-theme") === "light";
    doc.querySelectorAll("[data-sh-theme]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(light));
      b.setAttribute("aria-label", t(light ? "Switch to dark theme" : "Switch to light theme"));
    });
  }
  function toggleTheme(ev) {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    var rect = ev && ev.currentTarget ? ev.currentTarget.getBoundingClientRect() : { left: innerWidth - 80, top: 40, width: 0, height: 0 };
    var x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
    if (!reduce && doc.startViewTransition) {
      root.classList.add("sh-theming");
      var vt = doc.startViewTransition(function () { setTheme(next); });
      vt.ready.then(function () {
        var r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        root.animate({ clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + r + "px at " + x + "px " + y + "px)"] },
          { duration: 700, easing: "cubic-bezier(.22,1,.36,1)", pseudoElement: "::view-transition-new(root)" });
      }).catch(function () {});
      vt.finished.finally(function () { root.classList.remove("sh-theming"); });
    } else {
      root.classList.add("sh-fade");
      setTheme(next);
      setTimeout(function () { root.classList.remove("sh-fade"); }, 650);
    }
  }

  function toast(msg) {
    var el = doc.querySelector(".sh-toast") || doc.body.appendChild(Object.assign(doc.createElement("div"), { className: "sh-toast", role: "status" }));
    el.textContent = msg; requestAnimationFrame(function () { el.classList.add("show"); });
    clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove("show"); }, 3600);
  }

  function wire() {
    syncTheme();
    doc.querySelectorAll("[data-sh-theme]").forEach(function (b) { b.addEventListener("click", toggleTheme); });
    doc.querySelectorAll(".sh-lang").forEach(function (g) {
      g.addEventListener("click", function (e) {
        var b = e.target.closest("[data-sh-lang]"); if (!b) return;
        var n = b.getAttribute("data-sh-lang"); if (n === lang) return;
        try { localStorage.setItem("lang", n); } catch (err) {}
        location.reload();
      });
      g.addEventListener("keydown", function (e) {
        if (["ArrowRight", "ArrowLeft", "Home", "End"].indexOf(e.key) < 0) return;
        var bs = [].slice.call(g.querySelectorAll("button")), i = bs.indexOf(doc.activeElement); if (i < 0) i = 0;
        i = e.key === "Home" ? 0 : e.key === "End" ? bs.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + bs.length) % bs.length;
        e.preventDefault(); bs[i].focus(); bs[i].click();
      });
    });
    var head = doc.querySelector(".sh"), menu = doc.querySelector(".sh-menu");
    menu.addEventListener("click", function () {
      var o = head.classList.toggle("open"); menu.setAttribute("aria-expanded", String(o)); menu.setAttribute("aria-label", t(o ? "Close menu" : "Open menu"));
    });
    doc.querySelectorAll(".sh-drawer a").forEach(function (a) { a.addEventListener("click", function () { head.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); }); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") head.classList.remove("open"); });
    if (lang !== "en" && !hasI18n) {
      try { if (!sessionStorage.getItem("sh-en-note")) { sessionStorage.setItem("sh-en-note", "1"); setTimeout(function () { toast(t("English only")); }, 900); } } catch (e) {}
    }
  }

  /* ---------- 4. home: highlight the section in view ---------- */
  function homeSpy() {
    var map = {}; doc.querySelectorAll(".sh-nav a").forEach(function (a) { map[a.getAttribute("href")] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { Object.keys(map).forEach(function (k) { map[k].removeAttribute("aria-current"); }); var a = map["#" + e.target.id]; if (a) a.setAttribute("aria-current", "true"); } });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (k) { var s = doc.querySelector(k); if (s) io.observe(s); });
  }

  /* ---------- 5. detail pages: contextual bar with scroll-spy + reading progress ---------- */
  function subnav() {
    if (!links.length) return;
    var bar = doc.createElement("nav"); bar.className = "sh-sub"; bar.setAttribute("aria-label", t("Case study sections"));
    bar.innerHTML = '<a class="sh-back" title="' + esc(t("All work")) + '" href="' + HOME + '#work"><span aria-hidden="true">←</span>' + esc(t("All work")) + '</a><div class="sh-pills">' +
      links.map(function (l, i) { return '<a href="' + esc(l.href) + '" title="' + esc(l.label) + '" aria-label="' + esc(l.label) + '"><b>' + (i < 9 ? "0" : "") + (i + 1) + "</b><span>" + esc(l.label) + "</span></a>"; }).join("") + '</div><i class="sh-bar"></i>';
    doc.body.appendChild(bar);
    var anchors = [].slice.call(bar.querySelectorAll(".sh-pills a"));
    var here = path;
    anchors.forEach(function (a) { var h = a.getAttribute("href"); if (h.charAt(0) !== "#" && h.replace("./", "") === here) a.setAttribute("aria-current", "true"); });
    var secs = anchors.map(function (a) { var h = a.getAttribute("href"); return h.charAt(0) === "#" ? doc.querySelector(h) : null; });
    var ticking = false;
    function update() {
      ticking = false;
      var y = scrollY, max = doc.documentElement.scrollHeight - innerHeight;
      bar.classList.toggle("show", y > Math.min(260, innerHeight * 0.35));
      bar.style.setProperty("--sh-p", max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
      var cur = -1;
      secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
      if (secs.some(Boolean)) anchors.forEach(function (a, i) { if (secs[i]) { if (i === cur) { a.setAttribute("aria-current", "true"); if (!a._on) { a._on = 1; a.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" }); } } else { a.removeAttribute("aria-current"); a._on = 0; } } });
    }
    addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener("resize", update); update();
  }

  if (doc.body) mount(); else doc.addEventListener("DOMContentLoaded", mount);
})();
