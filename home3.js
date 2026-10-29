/* R2 home v2 — an illustrated world you scroll through.
   Renders from content.js (PROFILE). No third-party animation library:
   IntersectionObserver + one rAF scroll loop, CSS variables for theming. */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var P = window.PROFILE;
  var lang = root.lang || "en";
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var isMobile = function () { return innerWidth < 900; };

  /* ---------- copy that is new to this page (existing strings come from i18n.js) ---------- */
  var HX = {
    de: {
      "Currently": "Aktuell", "Impact": "Wirkung", "Back to top": "Nach oben", "Now": "Aktuell",
      "Measured on the AI interview module": "Gemessen am KI-Interview-Modul",
      "faster candidate discovery": "schnellere Kandidatensuche", "reduction in time-to-fill": "weniger Zeit bis zur Besetzung",
      "less scheduling effort": "weniger Planungsaufwand", "audit-ready documentation": "prüfungsreife Dokumentation",
      "View case study": "Fallstudie ansehen", "Based in": "Standort", "Phone": "Telefon", "Connect": "Vernetzen",
      "Tap to skip": "Zum Überspringen tippen", "View case": "Ansehen",
      "click a place": "Ort anklicken", "scroll to fly in": "Scrollen zum Eintauchen",
      "01 — About": "01 — Über mich", "02 — Selected work": "02 — Ausgewählte Arbeiten", "03 — Experience": "03 — Erfahrung",
      "04 — Skills": "04 — Fähigkeiten", "05 — Contact": "05 — Kontakt",
      "From mechanical engineering to enterprise AI.": "Vom Maschinenbau zur Enterprise-KI.",
      "Six stops between 2013 and now. Scroll to walk the path.": "Sechs Stationen zwischen 2013 und heute. Scrollen, um den Weg zu gehen.",
      "Things I designed, and what they changed.": "Was ich gestaltet habe und was sich dadurch verändert hat.",
      "Real products. Pick a card from the box.": "Echte Produkte. Zieh eine Karte aus der Box.",
      "case studies": "Fallstudien", "AI, enterprise, fintech": "KI, Enterprise, Fintech",
      "The craft, the method and the tools behind it.": "Das Handwerk, die Methode und die Werkzeuge dahinter.",
      "Tools I ship with": "Womit ich liefere",
      "Open to product design and AI UX roles: USA, Europe, UAE and remote.": "Offen für Product-Design- und KI-UX-Rollen: USA, Europa, VAE und remote.",
      "psst, these work on your keyboard too": "psst, das geht auch mit der Tastatur",
      "Email": "E-Mail", "CV": "Lebenslauf", "Download": "Herunterladen", "Write": "Schreiben", "Call": "Anrufen", "Open": "Öffnen",
      "Copy": "Kopieren", "Copied": "Kopiert", "See in journey": "Auf der Reise ansehen", "Close": "Schließen",
      "Chennai local time": "Ortszeit Chennai", "Stop": "Station",
      "AI": "KI", "Design": "Design", "Prototype": "Prototyp", "Motion": "Motion", "Workflow": "Workflow",
      "Let’s talk about the next product.": "Lass uns über das nächste Produkt sprechen."
    },
    ar: {
      "Currently": "حاليًا", "Impact": "الأثر", "Back to top": "إلى الأعلى", "Now": "الآن",
      "Measured on the AI interview module": "قياسات من وحدة المقابلات بالذكاء الاصطناعي",
      "faster candidate discovery": "اكتشاف أسرع للمرشحين", "reduction in time-to-fill": "انخفاض في زمن شغل الوظيفة",
      "less scheduling effort": "جهد أقل في الجدولة", "audit-ready documentation": "توثيق جاهز للتدقيق",
      "View case study": "عرض دراسة الحالة", "Based in": "الموقع", "Phone": "الهاتف", "Connect": "تواصل",
      "Tap to skip": "المس للتخطي", "View case": "عرض",
      "click a place": "اضغط على مكان", "scroll to fly in": "مرّر للاقتراب",
      "01 — About": "01 — نبذة", "02 — Selected work": "02 — أعمال مختارة", "03 — Experience": "03 — الخبرة",
      "04 — Skills": "04 — المهارات", "05 — Contact": "05 — التواصل",
      "From mechanical engineering to enterprise AI.": "من الهندسة الميكانيكية إلى الذكاء الاصطناعي للمؤسسات.",
      "Six stops between 2013 and now. Scroll to walk the path.": "ست محطات بين 2013 واليوم. مرّر لتسلك الطريق.",
      "Things I designed, and what they changed.": "ما صممته، وما الذي تغيّر بفضله.",
      "Real products. Pick a card from the box.": "منتجات حقيقية. اختر بطاقة من الصندوق.",
      "case studies": "دراسات حالة", "AI, enterprise, fintech": "ذكاء اصطناعي ومؤسسات وتقنية مالية",
      "The craft, the method and the tools behind it.": "الحرفة والمنهج والأدوات خلفها.",
      "Tools I ship with": "الأدوات التي أعمل بها",
      "Open to product design and AI UX roles: USA, Europe, UAE and remote.": "منفتحة على أدوار تصميم المنتجات وتجربة المستخدم للذكاء الاصطناعي: أمريكا وأوروبا والإمارات وعن بُعد.",
      "psst, these work on your keyboard too": "هذه الأزرار تعمل بلوحة المفاتيح أيضًا",
      "Email": "البريد", "CV": "السيرة", "Download": "تنزيل", "Write": "اكتب", "Call": "اتصل", "Open": "افتح",
      "Copy": "نسخ", "Copied": "تم النسخ", "See in journey": "عرض في المسار", "Close": "إغلاق",
      "Chennai local time": "التوقيت المحلي في تشناي", "Stop": "محطة",
      "AI": "ذكاء اصطناعي", "Design": "تصميم", "Prototype": "نموذج", "Motion": "حركة", "Workflow": "سير العمل",
      "Let’s talk about the next product.": "لنتحدث عن المنتج التالي."
    }
  };
  function tr(v) {
    if (v == null) return v;
    var d = HX[lang];
    if (d && Object.prototype.hasOwnProperty.call(d, v)) return d[v];
    return typeof window.t === "function" ? window.t(v) : v;
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function words(text, em) {
    var parts = String(text).trim().split(/\s+/), n = parts.length;
    return parts.map(function (w, i) {
      return '<span class="w' + (i >= n - em ? " em" : "") + '"><span class="wi" style="--i:' + i + '">' + esc(w) + "</span></span>";
    }).join(" ");
  }
  function plainWords(text) {
    return String(text).trim().split(/\s+/).map(function (w) { return '<span class="sw">' + esc(w) + "</span>"; }).join(" ");
  }
  function rng(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function scrollToY(y, ms) {
    var y0 = scrollY, d = y - y0, t0 = performance.now();
    if (reduce || Math.abs(d) < 4) { scrollTo(0, y); return; }
    root.style.scrollBehavior = "auto";
    (function step(now) {
      var p = clamp((now - t0) / ms, 0, 1), e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      scrollTo(0, y0 + d * e);
      if (p < 1) requestAnimationFrame(step); else root.style.scrollBehavior = "";
    })(t0);
  }

  function translateStatic() {
    $$("[data-h]").forEach(function (el) { el.textContent = tr(el.getAttribute("data-h")); });
    $$("[data-ha]").forEach(function (el) { el.setAttribute("aria-label", tr(el.getAttribute("data-ha"))); });
    $$("[data-hp]").forEach(function (el) { el.setAttribute("placeholder", tr(el.getAttribute("data-hp"))); });
  }

  /* ---------- the career as places ---------- */
  var ST = [];
  function buildStops() {
    var ex = P.experience.slice().reverse(), ed = P.education;
    var short = ["Anoushka", "Realtekh", "4i Apps", "DreamOrbit", "Simplify VMS"];
    var yrs = ["2017", "2019", "2021", "2021", "2024"];
    ST = [{
      co: ed.school, short: "RRASE", label: "RRASE · 2013", year: "2013", role: tr(ed.degree), dates: ed.years, where: ed.org, edu: true,
      bullets: [tr(ed.degree), ed.org + " · " + ed.years], clients: null
    }];
    ex.forEach(function (j, i) {
      ST.push({
        co: j.company, short: short[i], label: short[i] + " · " + (i === 4 ? tr("Now") : yrs[i]), year: yrs[i], role: tr(j.title), dates: tr(j.dates), where: tr(j.place),
        bullets: j.bullets.map(function (b) { return tr(b); }), clients: j.clients || null, now: i === 4
      });
    });
  }
  /* landmark anchors (scene units, 1600x900) */
  var PLACES = [{ x: 240, y: 452 }, { x: 470, y: 420 }, { x: 690, y: 468 }, { x: 886, y: 556 }, { x: 1196, y: 398 }, { x: 1392, y: 440 }];

  /* ---------- the illustrated scene ---------- */
  function sceneSVG() {
    var r = rng(11), o = [];
    var F = function (v) { return 'style="fill:var(--' + v + ')"'; };
    var i, j, k;
    o.push('<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" focusable="false">');
    o.push('<defs>' +
      '<linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--sky1)"/><stop offset=".42" style="stop-color:var(--sky2)"/><stop offset=".78" style="stop-color:var(--sky3)"/><stop offset="1" style="stop-color:var(--sky4)"/></linearGradient>' +
      '<linearGradient id="gSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--sea1)"/><stop offset="1" style="stop-color:var(--sea2)"/></linearGradient>' +
      '<radialGradient id="gHalo"><stop offset="0" style="stop-color:var(--sun-halo);stop-opacity:.55"/><stop offset="1" style="stop-color:var(--sun-halo);stop-opacity:0"/></radialGradient>' +
      '<linearGradient id="gBeam" x1="1" y1="0" x2="0" y2="0"><stop offset="0" style="stop-color:var(--beam);stop-opacity:.9"/><stop offset="1" style="stop-color:var(--beam);stop-opacity:0"/></linearGradient>' +
      '<symbol id="palm" viewBox="-100 -260 200 270" overflow="visible">' +
        '<path d="M0 0 C6 -80 -6 -160 4 -226" fill="none" style="stroke:var(--palm);stroke-width:9;stroke-linecap:round"/>' +
        '<g ' + F("palm") + '><path d="M4 -226 C-30 -262 -80 -246 -112 -206 C-78 -226 -38 -230 4 -226Z"/><path d="M4 -226 C40 -266 92 -250 120 -204 C86 -228 44 -232 4 -226Z"/>' +
        '<path d="M4 -226 C-18 -270 -4 -312 22 -332 C14 -296 14 -262 4 -226Z"/><path d="M4 -226 C-44 -226 -92 -196 -104 -150 C-72 -184 -36 -206 4 -226Z"/>' +
        '<path d="M4 -226 C50 -224 94 -190 106 -144 C72 -180 38 -204 4 -226Z"/></g></symbol>' +
      '</defs>');
    o.push('<rect width="1600" height="900" fill="url(#gSky)"/>');

    /* stars */
    o.push('<g style="opacity:var(--star);transition:opacity 1s">');
    for (i = 0; i < 54; i++) {
      var sx = r() * 1600, sy = r() * 400, sr = .8 + r() * 1.6;
      o.push('<circle cx="' + sx.toFixed(0) + '" cy="' + sy.toFixed(0) + '" r="' + sr.toFixed(1) + '" fill="#fff6e0"' + (i % 3 === 0 ? ' class="tw" style="animation-delay:-' + (r() * 3).toFixed(1) + 's"' : "") + "/>");
    }
    o.push("</g>");

    /* sun / low sun with halo */
    o.push('<g class="ly" style="--d:3"><g class="sunG"><circle r="190" fill="url(#gHalo)"/><circle r="62" ' + F("sun") + "/></g></g>");

    /* clouds */
    var cloudAt = [[0, 150, 70, 54], [0, 250, 40, 66], [0, 110, 130, 40], [0, 330, 20, 50]];
    o.push('<g class="ly" style="--d:7">');
    cloudAt.forEach(function (c, n) {
      o.push('<g class="cl" style="animation-duration:' + (95 + n * 28) + "s;animation-delay:-" + (n * 31 + 9) + 's"><g transform="translate(' + (n * 380) + " " + c[1] + ')" style="opacity:var(--cloud-o)"><ellipse cx="0" cy="0" rx="' + (c[3] * 1.5) + '" ry="' + (c[3] * .42) + '" ' + F("cloud") + '/><ellipse cx="' + (c[3] * .5) + '" cy="-' + (c[3] * .22) + '" rx="' + (c[3] * .8) + '" ry="' + (c[3] * .38) + '" ' + F("cloud") + '/><ellipse cx="-' + (c[3] * .55) + '" cy="-' + (c[3] * .12) + '" rx="' + (c[3] * .7) + '" ry="' + (c[3] * .32) + '" ' + F("cloud") + "/></g></g>");
    });
    o.push("</g>");

    /* far hills */
    o.push('<g class="ly" style="--d:4"><path d="M0 520 C120 490 240 500 380 510 C520 520 640 490 780 505 C920 520 1020 500 1160 508 C1300 516 1460 486 1600 506 L1600 560 L0 560Z" ' + F("hill1") + '/><path d="M0 540 C200 520 360 536 560 530 C760 524 900 540 1100 530 C1300 520 1460 536 1600 528 L1600 560 L0 560Z" ' + F("hill2") + "/></g>");

    /* sea */
    o.push('<rect y="546" width="1600" height="354" fill="url(#gSea)"/><rect y="544" width="1600" height="4" ' + F("sun-halo") + ' style="fill:var(--sun-halo);opacity:.45"/>');
    /* sun reflection */
    o.push('<g class="ly" style="--d:5"><g style="transform:translateX(calc(1130px + var(--sun-dx)));transition:transform 1.2s var(--ease)">');
    for (i = 0; i < 9; i++) o.push('<rect class="shm" x="' + (-70 + i * 5) + '" y="' + (562 + i * 20) + '" width="' + (140 - i * 10) + '" height="5" rx="2.5" ' + F("sun") + ' style="fill:var(--sun);animation-delay:-' + (i * .45).toFixed(2) + 's"/>');
    o.push("</g></g>");
    /* shimmer lines */
    o.push('<g class="ly" style="--d:6">');
    for (i = 0; i < 40; i++) {
      var hx = r() * 1560, hy = 566 + r() * 230, hw = 18 + r() * 54;
      o.push('<path class="shm" d="M' + hx.toFixed(0) + " " + hy.toFixed(0) + "h" + hw.toFixed(0) + '" style="stroke:var(--shim);stroke-width:3;stroke-linecap:round;animation-delay:-' + (r() * 4).toFixed(1) + "s;animation-duration:" + (3 + r() * 3).toFixed(1) + 's"/>');
    }
    o.push("</g>");

    /* land, skyline, landmarks */
    o.push('<g class="ly" style="--d:9">');
    /* left headland */
    o.push('<path d="M0 556 L520 554 C660 558 760 584 826 640 L826 820 L0 820Z" ' + F("land") + '/>');
    /* right headland */
    o.push('<path d="M1600 570 L1250 568 C1170 574 1120 604 1082 646 L1082 820 L1600 820Z" ' + F("land") + "/>");
    /* city block left of the tower */
    var bx = 30;
    while (bx < 360) {
      var bw = 26 + r() * 22, bh = 36 + r() * 78;
      o.push('<rect x="' + bx.toFixed(0) + '" y="' + (556 - bh).toFixed(0) + '" width="' + bw.toFixed(0) + '" height="' + bh.toFixed(0) + '" ' + F(r() > .5 ? "bld" : "bld2") + "/>");
      for (k = 0; k < Math.floor(bh / 18) - 1; k++) if (r() > .35) o.push('<rect class="win" x="' + (bx + 5).toFixed(0) + '" y="' + (556 - bh + 8 + k * 17).toFixed(0) + '" width="5" height="7" ' + F("win") + ' style="fill:var(--win);animation-delay:-' + (r() * 5).toFixed(1) + 's"/><rect class="win" x="' + (bx + bw - 12).toFixed(0) + '" y="' + (556 - bh + 8 + k * 17).toFixed(0) + '" width="5" height="7" style="fill:var(--win);animation-delay:-' + (r() * 5).toFixed(1) + 's"/>');
      bx += bw + 3 + r() * 6;
    }
    /* college with dome (RRASE) */
    o.push('<g><rect x="186" y="506" width="108" height="50" ' + F("bld") + '/><rect x="178" y="548" width="124" height="8" ' + F("bld2") + '/>');
    for (k = 0; k < 5; k++) o.push('<rect x="' + (196 + k * 20) + '" y="518" width="8" height="30" ' + F("bld2") + "/>");
    o.push('<path d="M206 506 A34 34 0 0 1 274 506Z" ' + F("tower") + '/><rect x="238" y="456" width="4" height="22" ' + F("tower2") + '/><path d="M242 456 l22 6 -22 6Z" ' + F("sail") + "/></g>");
    /* gopuram: 7 tiers */
    var tx = 470, ty = 560, tiers = [[190, 44], [166, 40], [144, 36], [122, 32], [100, 28], [78, 24], [56, 22]], cy = ty;
    o.push('<g transform="translate(470 560) scale(.76) translate(-470 -560)"><rect x="' + (tx - 98) + '" y="' + (ty - 30) + '" width="196" height="30" ' + F("tower2") + '/><path d="M' + (tx - 22) + " " + ty + "v-22a22 22 0 0 1 44 0v22Z\" style=\"fill:var(--land2)\"/>");
    cy = ty - 30;
    tiers.forEach(function (t, n) {
      var w = t[0], h = t[1], top = cy - h, w2 = (tiers[n + 1] ? tiers[n + 1][0] : 40);
      o.push('<path d="M' + (tx - w / 2) + " " + cy + "L" + (tx - w2 / 2 - 2) + " " + top + "h" + (w2 + 4) + "L" + (tx + w / 2) + " " + cy + 'Z" ' + F("tower") + "/>");
      o.push('<rect x="' + (tx - w / 2 - 3) + '" y="' + (cy - 4) + '" width="' + (w + 6) + '" height="5" rx="2" ' + F("tower2") + "/>");
      var nw = Math.max(2, Math.floor(w / 34));
      for (k = 0; k < nw; k++) {
        var wx = tx - (nw - 1) * 15 + k * 30;
        o.push('<path class="win" d="M' + (wx - 5) + " " + (cy - 8) + "v-14a5 5 0 0 1 10 0v14Z\" style=\"fill:var(--win);animation-delay:-" + (r() * 5).toFixed(1) + 's"/>');
      }
      cy = top;
    });
    o.push('<rect x="' + (tx - 24) + '" y="' + (cy - 12) + '" width="48" height="12" ' + F("tower2") + '/>');
    for (k = -1; k <= 1; k++) o.push('<path d="M' + (tx + k * 14 - 4) + " " + (cy - 12) + "l4 -22 4 22Z\" " + F("sail") + "/>");
    o.push("</g>");
    /* skyline between tower and bay (Realtekh) */
    bx = 590;
    while (bx < 800) {
      var bw2 = 22 + r() * 26, bh2 = 30 + r() * 82;
      o.push('<rect x="' + bx.toFixed(0) + '" y="' + (560 - bh2).toFixed(0) + '" width="' + bw2.toFixed(0) + '" height="' + bh2.toFixed(0) + '" ' + F(r() > .5 ? "bld" : "bld2") + "/>");
      for (k = 0; k < Math.floor(bh2 / 18) - 1; k++) if (r() > .4) o.push('<rect class="win" x="' + (bx + 5).toFixed(0) + '" y="' + (560 - bh2 + 8 + k * 17).toFixed(0) + '" width="5" height="7" style="fill:var(--win);animation-delay:-' + (r() * 5).toFixed(1) + 's"/>');
      bx += bw2 + 3 + r() * 5;
    }
    /* tech park right (DreamOrbit) */
    [[1120, 70, 150], [1196, 56, 168], [1258, 66, 120]].forEach(function (b, n) {
      o.push('<rect x="' + b[0] + '" y="' + (572 - b[2]) + '" width="' + b[1] + '" height="' + b[2] + '" ' + F(n % 2 ? "bld2" : "bld") + "/>");
      for (j = 0; j < Math.floor(b[2] / 20); j++) for (k = 0; k < Math.floor(b[1] / 17); k++) if (r() > .3) o.push('<rect class="win" x="' + (b[0] + 7 + k * 16) + '" y="' + (572 - b[2] + 10 + j * 20) + '" width="9" height="9" rx="1.5" style="fill:var(--win);animation-delay:-' + (r() * 6).toFixed(1) + 's"/>');
    });
    /* lighthouse (Simplify) */
    var lx = 1392;
    o.push('<polygon class="beam" points="' + lx + ",338 640,230 640,452\" fill=\"url(#gBeam)\"/>");
    o.push('<path d="M' + (lx - 30) + " 580 L" + (lx - 17) + " 360 h34 L" + (lx + 30) + ' 580Z" style="fill:#f4f1ea"/>');
    o.push('<clipPath id="lhC"><path d="M' + (lx - 30) + " 580 L" + (lx - 17) + " 360 h34 L" + (lx + 30) + ' 580Z"/></clipPath><g clip-path="url(#lhC)"><rect x="' + (lx - 40) + '" y="396" width="80" height="26" style="fill:var(--sail)"/><rect x="' + (lx - 40) + '" y="456" width="80" height="26" style="fill:var(--sail)"/><rect x="' + (lx - 40) + '" y="516" width="80" height="26" style="fill:var(--sail)"/></g>');
    o.push('<rect x="' + (lx - 24) + '" y="352" width="48" height="9" rx="3" ' + F("tower2") + '/><rect x="' + (lx - 15) + '" y="326" width="30" height="27" rx="3" style="fill:var(--lamp)"/><path d="M' + (lx - 22) + " 328 L" + lx + " 306 L" + (lx + 22) + ' 328Z" ' + F("tower2") + '/><circle cx="' + lx + '" cy="340" r="26" class="lant" style="fill:var(--lamp);opacity:.22"/>');
    o.push("</g>");

    /* boats */
    o.push('<g class="ly" style="--d:11">');
    [[886, 612, 1], [560, 650, .66], [1010, 668, .8], [1290, 624, .58]].forEach(function (b, n) {
      o.push('<g class="bob" style="animation-delay:-' + (n * 1.7) + 's"><g transform="translate(' + b[0] + " " + b[1] + ") scale(" + b[2] + ')"><path d="M-46 0 H46 L34 14 H-34Z" style="fill:var(--boat)"/><path d="M-4 -6 V-62 L34 -6Z" style="fill:var(--sail)"/><path d="M-10 -6 V-50 L-34 -6Z" style="fill:var(--boat);opacity:.9"/><rect x="-6" y="-66" width="2.5" height="62" style="fill:var(--tower2)"/></g></g>');
    });
    o.push("</g>");

    /* foreground: beach, palms, rock, character */
    o.push('<g class="ly" style="--d:-13">');
    o.push('<path d="M0 724 C260 700 480 744 800 770 S1340 746 1600 706 L1600 900 L0 900Z" ' + F("sand") + '/><path d="M0 836 C420 802 1040 862 1600 812 L1600 900 L0 900Z" ' + F("sand2") + "/>");
    [[90, 770, 1.2, 0], [300, 790, .85, 1], [1530, 764, 1.15, 1]].forEach(function (p, n) {
      o.push('<g class="sway" style="animation-delay:-' + (n * 1.6) + 's"><use href="#palm" x="-100" y="-260" width="200" height="270" transform="translate(' + p[0] + " " + p[1] + ") scale(" + (p[3] ? -p[2] : p[2]) + " " + p[2] + ')"/></g>');
    });
    /* rock + character */
    o.push('<path d="M640 782 C640 730 690 690 760 684 C830 678 900 704 932 752 L944 784Z" ' + F("rock") + '/><path d="M700 784 C720 748 780 732 840 740 C890 746 920 764 934 784Z" ' + F("rock2") + "/>");
    o.push('<g id="rin">' +
      /* legs dangle toward the sea */
      '<path d="M800 700 Q866 696 898 724 L902 752" style="stroke:var(--pants);stroke-width:21;stroke-linecap:round;fill:none"/>' +
      '<path d="M786 706 Q846 712 868 740 L870 764" style="stroke:var(--pants);stroke-width:19;stroke-linecap:round;fill:none;opacity:.9"/>' +
      '<ellipse cx="908" cy="758" rx="15" ry="7" fill="#f2f2ef"/><ellipse cx="876" cy="770" rx="14" ry="6.5" fill="#e8e8e4"/>' +
      /* back and arms */
      '<path d="M778 702 C772 660 788 634 812 632 C838 632 854 660 846 702Z" ' + F("shirt") + '/>' +
      '<path d="M782 646 C768 668 772 690 790 702" style="stroke:var(--shirt);stroke-width:12;stroke-linecap:round;fill:none"/>' +
      '<path d="M844 648 C862 666 862 692 846 704" style="stroke:var(--shirt);stroke-width:12;stroke-linecap:round;fill:none"/>' +
      /* neck, head, hair, bun */
      '<rect x="804" y="612" width="16" height="22" rx="6" ' + F("skin") + '/>' +
      '<circle cx="812" cy="596" r="25" ' + F("hair") + '/><circle cx="812" cy="566" r="14" ' + F("hair") + '/>' +
      '<path d="M792 598 C796 616 828 616 832 598" style="stroke:var(--hair);stroke-width:5;fill:none;stroke-linecap:round"/>' +
      "</g>");
    /* lantern + cup */
    o.push('<g class="lant"><circle cx="712" cy="742" r="26" style="fill:var(--lantern);opacity:.22"/></g><rect x="704" y="732" width="16" height="22" rx="4" style="fill:var(--lantern)"/><path d="M706 732 q6 -10 12 0" style="stroke:var(--palm);stroke-width:2;fill:none"/><rect x="702" y="753" width="20" height="4" rx="2" ' + F("tower2") + "/>");
    o.push("</g>");

    /* birds */
    o.push('<g class="ly" style="--d:5">');
    [[0, 260, 62, .9], [120, 300, 78, .6], [260, 236, 70, .75]].forEach(function (b, n) {
      o.push('<g class="fly-b" style="animation-duration:' + b[2] + "s;animation-delay:-" + (n * 21 + 6) + 's"><g transform="translate(' + b[0] + " " + b[1] + ") scale(" + b[3] + ')"><path class="flap" d="M-14 0 Q-7 -9 0 0 Q7 -9 14 0" style="stroke:var(--bird);stroke-width:2.6;fill:none;stroke-linecap:round"/></g></g>');
    });
    o.push("</g>");

    o.push("</svg>");
    return o.join("");
  }

  /* ---------- pins, popover, rail ---------- */
  function pins() {
    var layer = $("[data-pins]"), pop = $("[data-pop]"), rail = $("[data-rail]"), pin = $(".hero-pin"), cur = -1;
    layer.innerHTML = ST.map(function (s, i) {
      var p = PLACES[i];
      return '<button class="pin' + (i >= 4 ? " flip" : "") + '" type="button" data-i="' + i + '" style="left:' + (p.x / 16).toFixed(3) + "%;top:" + (p.y / 9).toFixed(3) + "%;--n:" + i + '" aria-haspopup="dialog"><i class="pin-d"><b>' + (i + 1) + '</b></i><span class="pin-l">' + esc(s.label) + "</span></button>";
    }).join("");
    rail.innerHTML = ST.map(function (s, i) {
      return '<button class="rail-b" type="button" data-i="' + i + '"><b>' + (i + 1) + "</b>" + esc(s.short) + "</button>";
    }).join("");
    function close() { if (cur < 0) return; pop.classList.remove("on"); setTimeout(function () { if (cur < 0) pop.hidden = true; }, 260); cur = -1; $$(".pin.on").forEach(function (p) { p.classList.remove("on"); }); }
    function open(i, src) {
      var s = ST[i];
      pop.innerHTML = '<button class="pop-x" type="button" aria-label="' + esc(tr("Close")) + '">×</button><p class="mono">' + esc(tr("Stop")) + " " + (i + 1) + " / " + ST.length + "</p><h3>" + esc(s.co) + '</h3><p class="pop-r">' + esc(s.role) + " · " + esc(s.dates) + '</p><p class="pop-b">' + esc(s.bullets[0]) + '</p><button class="pop-go" type="button" data-go="' + i + '">' + esc(tr("See in journey")) + " →</button>";
      pop.hidden = false; pop.classList.remove("on"); cur = i;
      $$(".pin.on").forEach(function (p) { p.classList.remove("on"); });
      var pinEl = $('.pin[data-i="' + i + '"]'); if (pinEl) pinEl.classList.add("on");
      if (!isMobile()) {
        var r = (src || pinEl).getBoundingClientRect(), hr = pin.getBoundingClientRect(), ph = pop.offsetHeight, pw = pop.offsetWidth;
        var left = clamp(r.left + r.width / 2 - hr.left - pw / 2, 14, hr.width - pw - 14);
        var top = r.bottom - hr.top + 12;
        if (top + ph > hr.height - 110) top = r.top - hr.top - ph - 12;
        pop.style.left = left.toFixed(0) + "px"; pop.style.top = clamp(top, 70, hr.height - ph - 14).toFixed(0) + "px";
      } else { pop.style.left = ""; pop.style.top = ""; }
      requestAnimationFrame(function () { pop.classList.add("on"); });
      var x = $(".pop-x", pop); if (x && !fine) x.focus({ preventScroll: true });
    }
    doc.addEventListener("click", function (e) {
      var b = e.target.closest(".pin, .rail-b");
      if (b) { e.preventDefault(); var i = Number(b.getAttribute("data-i")); if (cur === i) close(); else open(i, b); return; }
      if (e.target.closest(".pop-x")) { close(); return; }
      var g = e.target.closest(".pop-go");
      if (g) { var gi = Number(g.getAttribute("data-go")); close(); jumpTo(gi); return; }
      if (cur >= 0 && !e.target.closest(".pop")) close();
    });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    addEventListener("scroll", function () { if (cur >= 0 && scrollY > 40) close(); }, { passive: true });
    addEventListener("resize", close);
  }

  /* ---------- journey (scroll-walked map) ---------- */
  var J = null;
  function jumpTo(i) {
    if (!J) return;
    var sec = J.sec, top = sec.getBoundingClientRect().top + scrollY, span = sec.offsetHeight - innerHeight;
    scrollToY(top + span * (i / (ST.length - 1)), 1100);
  }
  function journey() {
    var sec = $("[data-journey]"), mapEl = $("[data-jmap]"), card = $("[data-jcard]"), dotsEl = $("[data-jdots]"), yearEl = $("[data-jyear]");
    if (!sec) return;
    var OX = 800, OY = 420, W = 3900, H = 2500, n = ST.length, r = rng(5), NS = "http://www.w3.org/2000/svg";
    var pts = [[330, 1130], [790, 800], [1200, 1030], [1590, 650], [1990, 900], [2290, 430]];
    var segs = [];
    for (var s = 0; s < n - 1; s++) {
      var a = pts[s], b = pts[s + 1], dx = (b[0] - a[0]) * .55;
      segs.push("M" + a[0] + " " + a[1] + " C" + (a[0] + dx) + " " + a[1] + " " + (b[0] - dx) + " " + b[1] + " " + b[0] + " " + b[1]);
    }
    var full = "M" + pts[0][0] + " " + pts[0][1] + segs.map(function (d) { return " C" + d.split(" C")[1]; }).join("");
    var m = [];
    m.push('<svg xmlns="' + NS + '" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + " " + H + '">');
    m.push('<rect width="' + W + '" height="' + H + '" style="fill:var(--map-land)"/><g transform="translate(' + OX + " " + OY + ')">');
    for (var gx = -9; gx < 36; gx++) for (var gy = -5; gy < 24; gy++) {
      if (r() < .1) continue;
      var w = 60 + r() * 28, h = 60 + r() * 28;
      m.push('<rect x="' + (gx * 96 + 8 + r() * 6).toFixed(0) + '" y="' + (gy * 96 + 8 + r() * 6).toFixed(0) + '" width="' + w.toFixed(0) + '" height="' + h.toFixed(0) + '" rx="10" style="fill:var(--' + (r() > .5 ? "map-b1" : "map-b2") + ')"/>');
    }
    /* main roads */
    ["M-900 330 C-300 290 1200 420 3900 330", "M-900 760 C600 700 1500 820 3900 720", "M-900 1230 C700 1180 1600 1290 3900 1190", "M-300 -500 C-260 300 -330 1000 -240 2400", "M520 -500 C560 500 470 1000 540 2400", "M1380 -500 C1330 500 1450 1000 1390 2400", "M2150 -500 C2190 500 2090 1000 2160 2400", "M2900 -500 C2940 500 2840 1000 2910 2400"].forEach(function (d) {
      m.push('<path d="' + d + '" style="stroke:var(--map-halo);stroke-width:34;fill:none"/><path d="' + d + '" style="stroke:var(--map-road);stroke-width:20;fill:none;stroke-linecap:round"/>');
    });
    /* river, lake, parks (carve with a land-coloured halo first) */
    var river = "M-300 -420 C260 280 420 500 560 700 S920 1020 1030 1220 S1440 1500 1700 2400";
    m.push('<path d="' + river + '" style="stroke:var(--map-halo);stroke-width:140;fill:none"/><path d="' + river + '" style="stroke:var(--map-water);stroke-width:84;fill:none;stroke-linecap:round"/>');
    m.push('<ellipse cx="2040" cy="1200" rx="260" ry="160" style="fill:var(--map-halo)"/><ellipse cx="2040" cy="1200" rx="220" ry="126" style="fill:var(--map-water)"/>');
    [[1700, 330, 170, 110], [640, 420, 130, 90], [1010, 520, 120, 86], [2420, 760, 120, 150]].forEach(function (p) {
      m.push('<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="' + (p[2] + 22) + '" ry="' + (p[3] + 22) + '" style="fill:var(--map-halo)"/><ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="' + p[2] + '" ry="' + p[3] + '" style="fill:var(--map-park)"/>');
    });
    /* route: casing, unwalked dashes, walked line */
    m.push('<path d="' + full + '" style="stroke:var(--map-halo);stroke-width:30;fill:none;stroke-linecap:round;stroke-linejoin:round"/>');
    m.push('<path d="' + full + '" style="stroke:var(--map-road);stroke-width:22;fill:none;stroke-linecap:round"/>');
    m.push('<path d="' + full + '" style="stroke:var(--faint);stroke-width:5;stroke-dasharray:2 16;stroke-linecap:round;fill:none"/>');
    m.push('<path id="walked" d="' + full + '" style="stroke:var(--acc);stroke-width:10;fill:none;stroke-linecap:round;stroke-linejoin:round" stroke-dasharray="0 99999"/>');
    m.push('<defs>' + segs.map(function (d, i) { return '<path id="sg' + i + '" d="' + d + '"/>'; }).join("") + "</defs>");
    /* stops */
    ST.forEach(function (st, i) {
      var p = pts[i];
      m.push('<g class="mstop" data-s="' + i + '" transform="translate(' + p[0] + " " + p[1] + ')"><circle class="ring" r="30" style="fill:none;stroke:var(--acc);stroke-width:3;opacity:0"/><circle r="27" style="fill:var(--bg);stroke:var(--acc);stroke-width:5"/><text y="9" text-anchor="middle" style="font:700 26px var(--f-mono);fill:var(--ink)">' + (i + 1) + '</text>' +
        '<text x="44" y="-6" style="font:700 30px var(--f-display);fill:var(--map-label);paint-order:stroke;stroke:var(--map-halo);stroke-width:9;stroke-linejoin:round">' + esc(st.short) + '</text><text x="44" y="26" style="font:500 20px var(--f-mono);fill:var(--map-label);opacity:.7;paint-order:stroke;stroke:var(--map-halo);stroke-width:8;stroke-linejoin:round">' + esc(st.year) + (st.now ? " →" : "") + "</text></g>");
    });
    m.push('<g id="you"><circle class="you-pulse" r="30" style="fill:var(--acc);opacity:.35"/><circle r="21" style="fill:var(--acc);stroke:var(--bg);stroke-width:4"/><path d="M0 -12 L10 10 L0 4 L-10 10Z" style="fill:var(--acc-ink)"/></g>');
    m.push("</g></svg>");
    mapEl.innerHTML = m.join("");
    var svg = $("svg", mapEl), walked = $("#walked", svg), you = $("#you", svg), segEls = segs.map(function (_, i) { return $("#sg" + i, svg); });
    var segLen = segEls.map(function (e) { return e.getTotalLength(); });
    var total = segLen.reduce(function (a, b) { return a + b; }, 0);
    var stopEls = $$(".mstop", svg);

    dotsEl.innerHTML = ST.map(function (s, i) { return '<button class="jdot" type="button" data-i="' + i + '" role="tab" aria-label="' + esc(s.co) + '"><span>' + esc(s.short) + " · " + esc(s.year) + "</span></button>"; }).join("");
    dotsEl.addEventListener("click", function (e) { var b = e.target.closest(".jdot"); if (b) jumpTo(Number(b.getAttribute("data-i"))); });

    function pointAt(t) {
      var k = clamp(Math.floor(t), 0, n - 2), u = clamp(t - k, 0, 1), L = segLen[k] * u;
      var p = segEls[k].getPointAtLength(L), p2 = segEls[k].getPointAtLength(Math.min(segLen[k], L + 2)), p1 = segEls[k].getPointAtLength(Math.max(0, L - 2));
      var done = 0; for (var q = 0; q < k; q++) done += segLen[q];
      return { x: p.x, y: p.y, ang: Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI + 90, len: done + L };
    }
    var active = -1, tRaw = 0, tSm = 0, cam = { x: pts[0][0], y: pts[0][1] }, visible = false, first = true;
    function renderCard(i) {
      var s = ST[i];
      card.innerHTML = '<div class="jc-top"><span dir="ltr">' + String(i + 1).padStart(2, "0") + " / " + String(n).padStart(2, "0") + "</span>" + (s.now ? '<span class="now">' + esc(tr("Now")) + "</span>" : "<span>" + esc(s.dates) + "</span>") + "</div>" +
        "<h3>" + esc(s.co) + '</h3><p class="jc-r">' + esc(s.role) + (s.now ? " · " + esc(s.dates) : "") + " · " + esc(s.where) + '</p><ul class="jc-l">' + s.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>" +
        (s.clients ? '<div class="jc-c">' + s.clients.map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div>" : "");
      card.classList.remove("swap"); void card.offsetWidth; if (!reduce) card.classList.add("swap");
      yearEl.textContent = s.year;
      $$(".jdot", dotsEl).forEach(function (d, k) { d.classList.toggle("on", k === i); d.classList.toggle("seen", k < i); d.setAttribute("aria-selected", String(k === i)); });
      stopEls.forEach(function (e, k) { e.classList.toggle("on", k === i); var ring = $(".ring", e); if (ring) ring.style.opacity = k === i ? "" : "0"; var c = $("circle:nth-of-type(2)", e); if (c) c.style.fill = k <= i ? "var(--acc)" : "var(--bg)"; var tx = $("text", e); if (tx) tx.style.fill = k <= i ? "var(--acc-ink)" : "var(--ink)"; });
    }
    function layout() {
      var sc = isMobile() ? .68 : .9, vw = innerWidth, vh = innerHeight;
      var fx = isMobile() ? .5 : .64, fy = isMobile() ? .27 : .46;
      svg.style.transform = "translate3d(" + (vw * fx - (cam.x + OX) * sc).toFixed(1) + "px," + (vh * fy - (cam.y + OY) * sc).toFixed(1) + "px,0) scale(" + sc + ")";
    }
    function update() {
      var rc = sec.getBoundingClientRect(), span = sec.offsetHeight - innerHeight;
      var prog = clamp(-rc.top / span, 0, 1), raw = prog * (n - 1);
      var k = Math.min(Math.floor(raw), n - 2), f = raw - k;
      var e = clamp((f - .16) / .68, 0, 1); e = e * e * (3 - 2 * e);
      tRaw = prog >= 1 ? n - 1 : k + e;
      var idx = Math.round(tRaw); if (idx !== active) { active = idx; renderCard(idx); }
    }
    function tick() {
      if (visible || first) {
        update();
        tSm += (tRaw - tSm) * (reduce ? 1 : .16);
        if (Math.abs(tRaw - tSm) < .0008) tSm = tRaw;
        var p = pointAt(clamp(tSm, 0, n - 1));
        you.setAttribute("transform", "translate(" + p.x.toFixed(1) + " " + p.y.toFixed(1) + ") rotate(" + p.ang.toFixed(1) + ")");
        walked.setAttribute("stroke-dasharray", p.len.toFixed(1) + " " + (total + 200).toFixed(0));
        cam.x += (p.x - cam.x) * (reduce ? 1 : .12); cam.y += (p.y - cam.y) * (reduce ? 1 : .12);
        layout(); first = false;
      }
      requestAnimationFrame(tick);
    }
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { rootMargin: "20% 0px" }).observe(sec); else visible = true;
    J = { sec: sec };
    addEventListener("resize", layout);
    update(); tSm = tRaw; tick();
  }

  /* ---------- other sections ---------- */
  var CARDS = [
    { id: "contingent-workforce-management", href: "./contingent-workforce.html", img: "./assets/dashboards/msp.jpg", alt: "MSP dashboard from the contingent workforce platform",
      kicker: "Award-winning · AI-native platform", title: "From Dense to Industry-Leading", proof: "★ PEAK Matrix Leader 2026",
      hook: "A legacy workforce platform rebuilt as AI-native with Claude and Cursor: role dashboards, hiring, one shared approval workflow and a record that follows every hire.", c: "#00ff87" },
    { id: "designing-trust-ai-hiring", href: "./designing-trust-ai-hiring.html", img: "./assets/trust-cover.jpg", op: "center", alt: "AI interview with a human review checkpoint before sending",
      kicker: "AI · Hiring", title: "Making AI Show Its Work", proof: "45% faster candidate discovery",
      hook: "AI screening and interviews that speed up hiring, with every automated judgment visible, editable and overridable by the recruiter.", c: "#a78bfa" },
    { id: "crif-connect", href: "./crif-connect.html", img: "./assets/crif/hero.jpg", op: "center", alt: "CRIF Connect fintech app on a phone",
      kicker: "Fintech · 0→1", title: "Consent Without the Anxiety", proof: "0→1 · 4 consent states",
      hook: "A four-state, PIN-gated consent lifecycle that makes sharing financial data feel safe on an RBI-licensed Account Aggregator.", c: "#60a5fa" }
  ];
  var ARROW = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>';

  function renderHero() {
    $("[data-availability]").textContent = tr(P.availability);
    $("[data-greeting]").textContent = tr(P.greeting);
    $("[data-headline]").innerHTML = words(tr(P.oneLiner), 2);
    $("[data-sub]").textContent = tr(P.currently);
    var art = $("[data-art]"); art.innerHTML = sceneSVG();
    var rin = $("#rin", art); if (rin) rin.setAttribute("aria-hidden", "true");
  }
  function renderAbout() {
    $("[data-about]").innerHTML = plainWords(tr(P.summary));
    $("[data-value]").textContent = tr(P.value);
    var items = [{ n: 9, s: "+", l: "Years designing" }, { n: 5, s: "", l: "Companies" }, { n: P.clients.length, s: "", l: "Products & clients" }, { n: 3, s: "", l: "Industries: SaaS, fintech, logistics" }];
    $("[data-counters]").innerHTML = items.map(function (i) {
      return '<div class="stat"><b data-count="' + i.n + '" data-suffix="' + i.s + '">' + (reduce ? i.n + i.s : "0") + "</b><span>" + esc(tr(i.l)) + "</span></div>";
    }).join("");
  }
  function renderWork() {
    $("[data-projects]").innerHTML = CARDS.map(function (d, i) {
      return '<a class="bc" href="' + d.href + '" data-cur style="--c:' + d.c + ";--k:" + i + (d.op ? ";--op:" + d.op : "") + '">' +
        '<figure class="bc-m"><img src="' + d.img + '" alt="' + esc(d.alt) + '" loading="' + (i === 0 ? "eager" : "lazy") + '" decoding="async" width="1024" height="640"><span class="bc-b">' + esc(d.proof) + "</span></figure>" +
        '<div class="bc-t"><div class="bc-top"><span class="bc-no">' + String(i + 1).padStart(2, "0") + '</span><span class="bc-k">' + esc(tr(d.kicker)) + "</span></div>" +
        "<h3>" + esc(tr(d.title)) + '</h3><p class="bc-h">' + esc(tr(d.hook)) + '</p><span class="bc-go"><i>' + ARROW + "</i><span>" + esc(tr("View case study")) + "</span></span></div></a>";
    }).join("") + '<div class="box-front" aria-hidden="true"><b>' + esc(tr("Selected work")) + "</b><span>3 " + esc(tr("case studies")) + " · " + esc(tr("AI, enterprise, fintech")) + "</span></div>";
  }
  function renderBand() {
    var m = [{ n: 45, s: "%", l: "faster candidate discovery" }, { n: 25, s: "%", l: "reduction in time-to-fill" }, { n: 70, s: "%", l: "less scheduling effort" }, { n: 100, s: "%", l: "audit-ready documentation" }];
    $("[data-band]").innerHTML = m.map(function (x) {
      return '<div class="bnum"><b data-count="' + x.n + '" data-suffix="' + x.s + '">' + (reduce ? x.n + x.s : "0") + "</b><span>" + esc(tr(x.l)) + "</span></div>";
    }).join("");
  }
  var HUES = ["#00ff87", "#60a5fa", "#a78bfa", "#fbbf24", "#22d3ee", "#fb7185"];
  var uid = 0;
  function accItem(o) {
    var id = "ac" + (++uid);
    return '<div class="ai' + (o.open ? " open" : "") + '" style="--sk:' + (o.hue || "var(--acc)") + '"><h3 style="margin:0"><button class="ai-h" type="button" aria-expanded="' + !!o.open + '" aria-controls="' + id + '"><span class="ai-n">' + o.n + '</span><span class="ai-t">' + o.title + '</span><span class="ai-c">' + (o.count ? "<b>" + o.count + "</b>" : "") + "<i></i></span></button></h3><div class=\"ai-p\" id=\"" + id + '" role="region"><div>' + o.body + "</div></div></div>";
  }
  var G = {
    spark: '<path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4 4M14.4 14.4l4 4M18.4 5.6l-4 4M9.6 14.4l-4 4"/>',
    cursor: '<path d="M5 3l14 7-6 2-2 6z"/>',
    frame: '<path d="M4 8h16M4 16h16M8 4v16M16 4v16"/>',
    board: '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 10h16M9 14h6"/>',
    gem: '<path d="M6 4h12l3 5-9 11L3 9z"/><path d="M3 9h18M9 4l3 16M15 4l-3 16"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l5.5 3.5-5.5 3.5z"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    keys: '<path d="M12 3l4 4-4 4-4-4zM6 14l3 3-3 3-3-3zM18 14l3 3-3 3-3-3z"/>',
    cols: '<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="9.5" y="4" width="5" height="10" rx="1.5"/><rect x="16" y="4" width="5" height="13" rx="1.5"/>'
  };
  var TOOLS = [
    ["Claude", "AI", "spark", "#ff9a62"], ["Cursor", "AI", "cursor", "#a78bfa"], ["Figma", "Design", "frame", "#00ff87"], ["Adobe XD", "Prototype", "board", "#fb7ce6"],
    ["Sketch", "Design", "gem", "#fbbf24"], ["InVision", "Prototype", "play", "#fb7185"], ["Photoshop", "Design", "layers", "#60a5fa"], ["After Effects", "Motion", "keys", "#a78bfa"], ["Jira", "Workflow", "cols", "#22d3ee"]
  ];
  function renderSkills() {
    $("[data-tools]").innerHTML = TOOLS.map(function (t, i) {
      return '<div class="tool" style="--h:' + t[3] + '" data-rv><svg viewBox="0 0 24 24" aria-hidden="true">' + G[t[2]] + "</svg><b>" + esc(t[0]) + "</b><small>" + esc(tr(t[1])) + "</small></div>";
    }).join("");
    $("[data-skills]").innerHTML = P.skills.filter(function (g) { return g.group !== "Tools"; }).map(function (g, i) {
      return accItem({ open: i === 0, hue: HUES[i % HUES.length], n: String(i + 1).padStart(2, "0"), title: esc(tr(g.group)), count: String(g.items.length).padStart(2, "0"),
        body: '<ul class="chips">' + g.items.map(function (it, j) { return '<li style="--j:' + j + '">' + esc(tr(it)) + "</li>"; }).join("") + "</ul>" });
    }).join("");
    $("[data-creds]").innerHTML =
      '<article class="cred"><p class="mono">' + esc(tr("Education")) + "</p><h3>" + esc(tr(P.education.degree)) + "</h3><p>" + esc(P.education.school) + "</p><p>" + esc(P.education.org) + " · " + esc(P.education.years) + "</p></article>" +
      '<article class="cred"><p class="mono">' + esc(tr("Certifications")) + "</p><h3>" + esc(tr("UX craft")) + "</h3>" + P.certifications.map(function (c) { return "<p>" + esc(c) + "</p>"; }).join("") + "</article>";
  }
  function renderContact() {
    $("[data-foot-h]").innerHTML = words(tr("Let’s talk about the next product."), 2);
    var tel = P.phones[0].replace(/\s/g, "");
    $("[data-keys]").innerHTML =
      '<button class="key" type="button" data-open-modal data-k="e"><span class="key-l">E</span><span class="key-n">' + esc(tr("Email")) + '</span><span class="key-s">' + esc(tr("Write")) + "</span></button>" +
      '<a class="key" href="' + esc(P.linkedin) + '" target="_blank" rel="noreferrer" data-k="l"><span class="key-l">L</span><span class="key-n">LinkedIn</span><span class="key-s">' + esc(tr("Open")) + "</span></a>" +
      '<a class="key" href="tel:' + tel + '" data-k="p"><span class="key-l">P</span><span class="key-n">' + esc(tr("Phone")) + '</span><span class="key-s">' + esc(tr("Call")) + "</span></a>" +
      '<a class="key" href="./assets/Ilayanila-M-CV.pdf" download="Ilayanila-M-CV.pdf" data-k="c"><span class="key-l">C</span><span class="key-n">' + esc(tr("CV")) + '</span><span class="key-s">' + esc(tr("Download")) + "</span></a>";
    var cp = function (v) { return '<button class="cpy" type="button" data-copy="' + esc(v) + '">' + esc(tr("Copy")) + "</button>"; };
    $("[data-reach]").innerHTML =
      '<div class="reach-r"><span>' + esc(tr("Email")) + '</span><b>' + esc(P.email) + "</b>" + cp(P.email) + "</div>" +
      '<div class="reach-r"><span>' + esc(tr("Phone")) + "</span><b>" + P.phones.map(esc).join(" · ") + "</b>" + cp(P.phones[0]) + "</div>" +
      '<div class="reach-r"><span>LinkedIn</span><b><a href="' + esc(P.linkedin) + '" target="_blank" rel="noreferrer">' + esc(P.linkedin.replace(/^https?:\/\/(www\.)?/, "")) + "</a></b><span></span></div>" +
      '<div class="reach-r"><span>' + esc(tr("Based in")) + "</span><b>" + esc(tr(P.location)) + "</b><span></span></div>";
    $("[data-legal]").innerHTML = "<span>© 2026 " + esc(P.name) + " · " + esc(tr(P.role)) + "</span>";
    var mc = $("[data-modal-copy]"); if (mc) mc.textContent = tr("This opens your mail client to {email}.").replace("{email}", P.email);
  }

  /* ---------- behaviours ---------- */
  function intro() {
    var el = $("#intro");
    if (!el || !root.classList.contains("intro-lock")) return Promise.resolve();
    var W = [["Hello", "English", "en", "ltr"], ["Hallo", "Deutsch", "de", "ltr"], ["Bonjour", "Français", "fr", "ltr"], ["مرحبا", "العربية", "ar", "rtl"], ["नमस्ते", "हिन्दी", "hi", "ltr"], ["வணக்கம்", "தமிழ்", "ta", "ltr"]];
    var wEl = $("#introWord"), nEl = $("#introN"), lEl = $("#introLang"), bar = $("#introBar");
    var i = -1, timer = 0, done = false;
    return new Promise(function (resolve) {
      function finish() {
        if (done) return; done = true; clearTimeout(timer);
        el.classList.add("out");
        setTimeout(function () { root.classList.add("ready"); heroIn(); }, reduce ? 150 : 420);
        var end = function () { el.remove(); root.classList.remove("intro-lock"); resolve(); };
        el.addEventListener("transitionend", function (e) { if (e.target === el && e.propertyName === "clip-path") end(); });
        setTimeout(end, reduce ? 600 : 1300);
      }
      function step() {
        i++;
        if (i >= W.length) { finish(); return; }
        var w = W[i];
        wEl.textContent = w[0]; wEl.lang = w[2]; wEl.dir = w[3];
        nEl.textContent = String(i + 1).padStart(2, "0"); lEl.textContent = w[1];
        bar.style.transition = "transform " + (i ? 250 : 420) + "ms linear";
        bar.style.transform = "scaleX(" + (i + 1) / W.length + ")";
        wEl.classList.remove("swap"); void wEl.offsetWidth; wEl.classList.add("swap");
        timer = setTimeout(step, i === 0 ? 460 : 260);
      }
      el.addEventListener("click", finish);
      doc.addEventListener("keydown", function k(e) { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") { doc.removeEventListener("keydown", k); finish(); } });
      if (reduce) { wEl.classList.remove("swap"); timer = setTimeout(finish, 700); } else step();
    });
  }
  function heroIn() { $$(".hero3 [data-rv]").forEach(function (e, i) { e.style.setProperty("--d", i * 90 + "ms"); e.classList.add("in"); }); }

  function reveal() {
    var rv = $$("[data-rv]").filter(function (e) { return !e.closest(".hero3"); }).concat($$(".foot-h"), $$(".box"));
    if (!("IntersectionObserver" in window)) { rv.forEach(function (e) { e.classList.add("in"); }); heroIn(); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    rv.forEach(function (e) { io.observe(e); });
    $$(".stats .stat, .band-grid .bnum, .tgrid .tool, .keys .key").forEach(function (e) {
      var idx = Array.prototype.indexOf.call(e.parentElement.children, e);
      e.style.setProperty("--d", Math.min(idx, 8) * 60 + "ms");
    });
  }
  function counters() {
    var els = $$("[data-count]");
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(function (b) { b.textContent = b.dataset.count + b.dataset.suffix; }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return; io.unobserve(en.target);
        var b = en.target, end = Number(b.dataset.count), t0 = performance.now(), sfx = b.dataset.suffix;
        (function step(t) { var p = Math.min((t - t0) / 1400, 1); b.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))) + sfx; if (p < 1) requestAnimationFrame(step); })(t0);
      });
    }, { threshold: 0.5 });
    els.forEach(function (b) { io.observe(b); });
  }
  function accordions() {
    doc.addEventListener("click", function (e) {
      var h = e.target.closest(".ai-h"); if (!h) return;
      var item = h.closest(".ai"), open = !item.classList.contains("open");
      if (open) $$(".ai.open", item.parentElement).forEach(function (o) { if (o !== item) { o.classList.remove("open"); var oh = $(".ai-h", o); if (oh) oh.setAttribute("aria-expanded", "false"); } });
      item.classList.toggle("open", open); h.setAttribute("aria-expanded", String(open));
    });
  }

  function scrollFx() {
    var prog = $(".progress"), hero = $(".hero3"), box = $("[data-box]"), copy = $("[data-copy]"), bar = $("[data-bar]"), fade = $("[data-fade]"), fly = $("[data-fly]"), hint = $("[data-hint]"), pinsEl = $("[data-pins]");
    var lead = $$(".about-lead .sw"), leadEl = $(".about-lead"), ticking = false;
    function frame() {
      ticking = false;
      var y = scrollY, vh = innerHeight, max = root.scrollHeight - vh;
      if (prog) prog.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);
      var hr = hero.getBoundingClientRect();
      if (hr.bottom > -40 && hr.top < vh) {
        var hp = reduce ? 0 : clamp(-hr.top / (hr.height - vh), 0, 1), e = hp * hp * (3 - 2 * hp);
        box.style.setProperty("--z", (1 + e * (isMobile() ? .75 : 1.05)).toFixed(4));
        copy.style.opacity = String(clamp(1 - hp / .26, 0, 1));
        copy.style.transform = "translate3d(0," + (-hp * 160).toFixed(1) + "px,0)";
        bar.style.opacity = String(clamp(1 - hp / .18, 0, 1)); bar.style.visibility = hp > .2 ? "hidden" : "";
        fly.style.opacity = String(clamp(1 - hp / .12, 0, 1)); hint.style.opacity = String(clamp(1 - hp / .12, 0, 1)); hint.style.visibility = hp > .14 ? "hidden" : "";
        fade.style.setProperty("--fo", clamp((hp - .6) / .36, 0, 1).toFixed(3));
        pinsEl.style.opacity = String(clamp(1 - hp / .2, 0, 1)); pinsEl.style.visibility = hp > .22 ? "hidden" : "";
      }
      if (leadEl && !reduce) {
        var r = leadEl.getBoundingClientRect(), p = clamp((vh * 0.88 - r.top) / (r.height + vh * 0.3), 0, 1), n = Math.round(p * lead.length);
        for (var i = 0; i < lead.length; i++) { var on = i < n; if (lead[i]._on !== on) { lead[i]._on = on; lead[i].classList.toggle("on", on); } }
      }
    }
    function queue() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
    addEventListener("scroll", queue, { passive: true }); addEventListener("resize", queue); frame();
  }
  function pointerFx() {
    var scene = $("[data-scene]"), hero = $(".hero3");
    if (fine && !reduce) {
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect(), px = ((e.clientX - r.left) / r.width - 0.5) * 2, py = ((e.clientY - r.top) / r.height - 0.5) * 2;
        scene.style.setProperty("--px", px.toFixed(3)); scene.style.setProperty("--py", py.toFixed(3));
      });
    }
    if (!fine || reduce) return;
    root.classList.add("has-cur");
    var cur = $(".cur"), lab = $(".cur span"), mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener("mousemove", function (e) { mx = e.clientX; my = e.clientY; }, { passive: true });
    doc.addEventListener("mouseover", function (e) { var t = e.target.closest("[data-cur]"); if (t) { lab.textContent = tr("View case"); cur.classList.add("on"); } else cur.classList.remove("on"); });
    (function loop() { cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2; cur.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)"; requestAnimationFrame(loop); })();
    $$("[data-magnetic]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.transition = "background-color .35s, color .35s, border-color .35s, box-shadow .35s";
        el.style.transform = "translate(" + ((e.clientX - (r.left + r.width / 2)) * 0.28).toFixed(1) + "px," + ((e.clientY - (r.top + r.height / 2)) * 0.34).toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transition = "transform .7s cubic-bezier(.16,1,.3,1), background-color .35s, color .35s"; el.style.transform = ""; });
    });
  }
  function modal() {
    var m = $("#connect-modal"); if (!m) return;
    var open = function () { m.hidden = false; requestAnimationFrame(function () { m.classList.add("open"); }); doc.body.classList.add("modal-open"); var n = $("#connect-name"); if (n) n.focus(); };
    var close = function () { m.classList.remove("open"); setTimeout(function () { m.hidden = true; }, 300); doc.body.classList.remove("modal-open"); };
    doc.addEventListener("click", function (e) { if (e.target.closest("[data-open-modal]")) { e.preventDefault(); open(); } if (e.target.closest("[data-close-modal]") || e.target === m) close(); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape" && !m.hidden) close(); });
    $("#connect-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#connect-name"), mail = $("#connect-email"), note = $("#connect-note"), msg = $("[data-form-msg]");
      $$("#connect-form [aria-invalid]").forEach(function (f) { f.removeAttribute("aria-invalid"); });
      var bad = function (f, t) { f.setAttribute("aria-invalid", "true"); msg.textContent = tr(t); f.focus(); };
      if (!name.value.trim()) return bad(name, "Please enter your name.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value.trim())) return bad(mail, "Please enter a valid email address.");
      msg.textContent = "";
      var body = encodeURIComponent(tr("Hi Ilayanila,") + "\n\n" + note.value.trim() + "\n\n— " + name.value.trim() + " (" + mail.value.trim() + ")");
      location.href = "mailto:" + P.email + "?subject=" + encodeURIComponent(tr("Intro — Senior UX opportunity")) + "&body=" + body;
    });
  }
  function keys() {
    doc.addEventListener("keydown", function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      var t = e.target; if (t && (/^(input|textarea|select)$/i.test(t.tagName) || t.isContentEditable)) return;
      var m = $("#connect-modal"); if (m && !m.hidden) return;
      if (doc.documentElement.classList.contains("intro-lock")) return;
      var k = $('.key[data-k="' + e.key.toLowerCase() + '"]'); if (!k) return;
      k.classList.add("press"); setTimeout(function () { k.classList.remove("press"); }, 160);
      setTimeout(function () { k.click(); }, 120);
    });
    doc.addEventListener("click", function (e) {
      var b = e.target.closest(".cpy"); if (!b) return;
      var v = b.getAttribute("data-copy"), ok = function () { b.classList.add("ok"); b.textContent = tr("Copied"); setTimeout(function () { b.classList.remove("ok"); b.textContent = tr("Copy"); }, 1600); };
      try { navigator.clipboard.writeText(v).then(ok, function () { sel(b); }); } catch (err) { sel(b); }
      function sel(btn) { var t = btn.parentElement.querySelector("b"); if (!t) return; var r = doc.createRange(); r.selectNodeContents(t); var s = getSelection(); s.removeAllRanges(); s.addRange(r); }
    });
  }
  function misc() {
    var el = $("[data-local-time]");
    if (el) {
      var f = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true });
      var tick = function () { el.textContent = tr("Chennai local time") + ": " + f.format(new Date()) + " IST"; };
      tick(); setInterval(tick, 30000);
    }
    var top = $("[data-top]"); if (top) top.addEventListener("click", function () { scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  }
  /* CV download: a plain link on the live site; inside the artifact viewer it goes through the downloads capability */
  doc.addEventListener("click", async function (e) {
    var a = e.target.closest && e.target.closest("a[download]");
    if (!a || !window.claude || typeof window.claude.use !== "function") return;
    e.preventDefault();
    try {
      var dl = await window.claude.use("downloads");
      if (!dl) { window.open(a.href, "_blank"); return; }
      var res = await fetch(a.getAttribute("href")), blob = await res.blob();
      await dl.save({ filename: a.getAttribute("download") || "Ilayanila-M-CV.pdf", data: blob });
    } catch (err) { /* declined or unavailable */ }
  });

  /* ---------- boot ---------- */
  function boot() {
    try {
      translateStatic();
      if (P) {
        buildStops();
        renderHero(); renderAbout(); renderWork(); renderBand(); renderSkills(); renderContact();
        pins(); journey();
      }
      reveal(); counters(); accordions(); scrollFx(); pointerFx(); modal(); keys(); misc();
    } finally { root.classList.remove("i18n-pending"); }
    if (root.classList.contains("intro-lock")) intro();
    else { root.classList.add("ready"); heroIn(); }
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot); else boot();
})();
