/* R2 home — renders from content.js (PROFILE), then wires motion.
   No third-party animation library: IntersectionObserver + one rAF scroll loop. */
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

  /* ---------- copy that is new to this page (existing strings come from i18n.js) ---------- */
  var HX = {
    de: {
      "Currently": "Aktuell", "Scroll": "Scrollen", "Impact": "Wirkung", "Back to top": "Nach oben", "Now": "Aktuell",
      "Measured on the AI interview module": "Gemessen am KI-Interview-Modul",
      "faster candidate discovery": "schnellere Kandidatensuche", "reduction in time-to-fill": "weniger Zeit bis zur Besetzung",
      "less scheduling effort": "weniger Planungsaufwand", "audit-ready documentation": "prüfungsreife Dokumentation",
      "View case study": "Fallstudie ansehen", "Based in": "Standort", "Phone": "Telefon", "Connect": "Vernetzen",
      "Tap to skip": "Zum Überspringen tippen"
    },
    ar: {
      "Currently": "حاليًا", "Scroll": "مرّر", "Impact": "الأثر", "Back to top": "إلى الأعلى", "Now": "الآن",
      "Measured on the AI interview module": "قياسات من وحدة المقابلات بالذكاء الاصطناعي",
      "faster candidate discovery": "اكتشاف أسرع للمرشحين", "reduction in time-to-fill": "انخفاض في زمن شغل الوظيفة",
      "less scheduling effort": "جهد أقل في الجدولة", "audit-ready documentation": "توثيق جاهز للتدقيق",
      "View case study": "عرض دراسة الحالة", "Based in": "الموقع", "Phone": "الهاتف", "Connect": "تواصل",
      "Tap to skip": "المس للتخطي"
    }
  };
  function tr(v) {
    if (v == null) return v;
    var d = HX[lang];
    if (d && Object.prototype.hasOwnProperty.call(d, v)) return d[v];
    return typeof window.t === "function" ? window.t(v) : v;
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* split a sentence into masked words; the last `em` words get the serif-italic accent */
  function words(text, em) {
    var parts = String(text).trim().split(/\s+/), n = parts.length;
    return parts.map(function (w, i) {
      return '<span class="w' + (i >= n - em ? " em" : "") + '"><span class="wi" style="--i:' + i + '">' + esc(w) + "</span></span>";
    }).join(" ");
  }
  function plainWords(text) {
    return String(text).trim().split(/\s+/).map(function (w) { return '<span class="sw">' + esc(w) + "</span>"; }).join(" ");
  }

  /* ---------- static strings ---------- */
  function translateStatic() {
    $$("[data-h]").forEach(function (el) { el.textContent = tr(el.getAttribute("data-h")); });
    $$("[data-ha]").forEach(function (el) { el.setAttribute("aria-label", tr(el.getAttribute("data-ha"))); });
    $$("[data-hp]").forEach(function (el) { el.setAttribute("placeholder", tr(el.getAttribute("data-hp"))); });
  }

  /* ---------- render ---------- */
  var CARDS = [
    { id: "contingent-workforce-management", href: "./contingent-workforce.html", img: "./assets/dashboards/msp.jpg", alt: "MSP dashboard from the contingent workforce platform",
      kicker: "Award-winning · AI-native platform", title: "From Dense to Industry-Leading", ai: true,
      hook: "A legacy workforce platform rebuilt as AI-native with Claude and Cursor: role dashboards, hiring, one shared approval workflow and a record that follows every hire.",
      chips: ["AI-native rebuild", "Workflows", "Design system"], c: "#00ff87", floats: ["★ PEAK Matrix Leader 2026", "5 role dashboards"] },
    { id: "designing-trust-ai-hiring", href: "./designing-trust-ai-hiring.html", img: "./assets/trust-cover.jpg", op: "center", alt: "AI interview with a human review checkpoint before sending",
      kicker: "AI · Hiring", title: "Making AI Show Its Work", ai: true,
      hook: "AI screening and interviews that speed up hiring, with every automated judgment visible, editable and overridable by the recruiter.",
      chips: ["AI interviews", "Explainable UX", "Human-in-the-loop"], c: "#a78bfa", floats: ["✦ AI summary", "You decide"] },
    { id: "crif-connect", href: "./crif-connect.html", img: "./assets/crif/hero.jpg", op: "center", alt: "CRIF Connect fintech app on a phone",
      kicker: "Fintech · 0→1", title: "Consent Without the Anxiety", ai: false,
      hook: "A four-state, PIN-gated consent lifecycle that makes sharing financial data feel safe on an RBI-licensed Account Aggregator.",
      chips: ["Fintech", "Consent UX", "Design system"], c: "#60a5fa", floats: ["PIN verified", "Consent active"] }
  ];
  var ARROW = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>';

  function renderHero() {
    $("[data-availability]").textContent = tr(P.availability);
    $("[data-greeting]").textContent = tr(P.greeting);
    $("[data-headline]").innerHTML = words(tr(P.oneLiner), 2);
    $("[data-currently]").textContent = tr(P.currently);
    $("[data-chips]").innerHTML = P.badges.map(function (b, i) { return '<span class="hc" style="--n:' + i + '">' + esc(tr(b)) + "</span>"; }).join("");
    var track = $$(".spin textPath")[0];
    if (track) track.textContent = "Senior Product Designer · AI UX Engineer · ";
  }

  function renderMarquee() {
    var big = ["Product Design", "AI UX Engineering", "Design Systems", "Accessibility", "Enterprise SaaS", "Fintech", "Explainable AI", "Logistics"];
    var sm = P.deliverables.map(function (d) { return d.name; }).concat(["TransUnion CIBIL", "Axis Bank"]);
    var rows = $$("[data-marq]");
    rows[0].dataset.unit = big.map(function (t) { return '<span class="it">' + esc(t) + "<i>✦</i></span>"; }).join("");
    rows[1].dataset.unit = sm.map(function (t) { return '<span class="it">' + esc(t) + "<i></i></span>"; }).join("");
  }

  function renderAbout() {
    $("[data-about]").innerHTML = plainWords(tr(P.summary));
    $("[data-value]").textContent = tr(P.value);
    var items = [
      { n: 9, s: "+", l: "Years designing" },
      { n: 5, s: "", l: "Companies" },
      { n: P.clients.length, s: "", l: "Products & clients" },
      { n: 3, s: "", l: "Industries: SaaS, fintech, logistics" }
    ];
    $("[data-counters]").innerHTML = items.map(function (i) {
      return '<div class="stat"><b data-count="' + i.n + '" data-suffix="' + i.s + '">' + (reduce ? i.n + i.s : "0") + "</b><span>" + esc(tr(i.l)) + "</span></div>";
    }).join("");
  }

  function renderWork() {
    $("[data-projects]").innerHTML = CARDS.map(function (d, i) {
      return '<a class="pc" href="' + d.href + '" data-cur style="--c:' + d.c + ";--k:" + i + (d.op ? ";--op:" + d.op : "") + '">' +
        '<figure class="pc-media"><img src="' + d.img + '" alt="' + esc(d.alt) + '" loading="' + (i === 0 ? "eager" : "lazy") + '" decoding="async" width="1024" height="640">' +
        '<span class="pc-f f1">' + esc(d.floats[0]) + '</span><span class="pc-f f2">' + esc(d.floats[1]) + "</span></figure>" +
        '<div class="pc-body"><div class="pc-top"><span class="pc-no">' + String(i + 1).padStart(2, "0") + '</span><span class="pc-k">' + esc(tr(d.kicker)) + "</span>" + (d.ai ? '<b class="pc-ai">✦ AI</b>' : "") + "</div>" +
        "<h3>" + esc(tr(d.title)) + '</h3><p class="pc-hook">' + esc(tr(d.hook)) + "</p>" +
        '<div class="pc-chips">' + d.chips.map(function (c) { return "<span>" + esc(tr(c)) + "</span>"; }).join("") + "</div>" +
        '<span class="pc-go"><i>' + ARROW + "</i><span>" + esc(tr("View case study")) + "</span></span></div></a>";
    }).join("");
  }

  function renderBand() {
    var m = [
      { n: 45, s: "%", l: "faster candidate discovery" },
      { n: 25, s: "%", l: "reduction in time-to-fill" },
      { n: 70, s: "%", l: "less scheduling effort" },
      { n: 100, s: "%", l: "audit-ready documentation" }
    ];
    $("[data-band]").innerHTML = m.map(function (x) {
      return '<div class="bnum"><b data-count="' + x.n + '" data-suffix="' + x.s + '">' + (reduce ? x.n + x.s : "0") + "</b><span>" + esc(tr(x.l)) + "</span></div>";
    }).join("");
  }

  var HUES = ["#00ff87", "#60a5fa", "#a78bfa", "#fbbf24", "#22d3ee", "#fb7185"];
  var uid = 0;
  function accItem(o) {
    var id = "ac" + (++uid);
    return '<div class="ai' + (o.open ? " open" : "") + '" style="--sk:' + (o.hue || "var(--acc)") + '">' +
      '<h3 style="margin:0"><button class="ai-h" type="button" aria-expanded="' + !!o.open + '" aria-controls="' + id + '">' +
      '<span class="ai-n">' + o.n + '</span><span class="ai-t">' + o.title + '</span><span class="ai-c">' + (o.count ? "<b>" + o.count + "</b>" : "") + "<i></i></span></button></h3>" +
      '<div class="ai-p" id="' + id + '" role="region"><div>' + o.body + "</div></div></div>";
  }

  function renderSkills() {
    $("[data-skills]").innerHTML = P.skills.map(function (g, i) {
      return accItem({
        open: i === 0, hue: HUES[i % HUES.length], n: String(i + 1).padStart(2, "0"), title: esc(tr(g.group)), count: String(g.items.length).padStart(2, "0"),
        body: '<ul class="chips">' + g.items.map(function (it, j) { return '<li style="--j:' + j + '">' + esc(tr(it)) + "</li>"; }).join("") + "</ul>"
      });
    }).join("");
  }

  function renderExperience() {
    $("[data-experience]").innerHTML = P.experience.map(function (job, i) {
      var body = '<ul class="bul">' + job.bullets.map(function (b) { return "<li>" + esc(tr(b)) + "</li>"; }).join("") + "</ul>" +
        (job.clients ? '<div class="clientrow">' + job.clients.map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div>" : "");
      return accItem({
        open: i === 0, hue: HUES[i % HUES.length], n: esc(tr(job.dates)),
        title: esc(tr(job.title)) + (i === 0 ? '<span class="now">' + esc(tr("Now")) + "</span>" : "") + "<small>" + esc(job.company) + " · " + esc(tr(job.place)) + "</small>",
        count: "", body: body
      });
    }).join("");
    $("[data-creds]").innerHTML =
      '<article class="cred"><p class="mono">' + esc(tr("Education")) + "</p><h3>" + esc(tr(P.education.degree)) + "</h3><p>" + esc(P.education.school) + "</p><p>" + esc(P.education.org) + " · " + esc(P.education.years) + "</p></article>" +
      '<article class="cred"><p class="mono">' + esc(tr("Certifications")) + "</p><h3>" + esc(tr("UX craft")) + "</h3>" + P.certifications.map(function (c) { return "<p>" + esc(c) + "</p>"; }).join("") + "</article>" +
      '<article class="cred"><p class="mono">' + esc(tr("Tools")) + "</p><h3>" + esc(tr("Figma, advanced")) + "</h3><p>" + esc(P.skills.filter(function (s) { return s.group === "Tools"; })[0].items.map(function (x) { return tr(x); }).join(" · ")) + "</p></article>";
  }

  function renderContact() {
    $("[data-foot-h]").innerHTML = words(tr("Let’s talk about the next product."), 2);
    var mail = $("[data-mail]"); mail.href = "mailto:" + P.email; mail.textContent = P.email;
    var ic = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + "</svg>"; };
    var I = {
      phone: ic('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
      "in": ic('<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 11v6M8 7.5v.01M12 17v-6M12 13a3 3 0 0 1 6 0v4"/>'),
      pin: ic('<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
      arrow: ic('<path d="M7 17L17 7M9 7h8v8"/>')
    };
    var card = function (href, icon, label, value, ext) {
      return '<a class="kc" href="' + href + '"' + (ext ? ' target="_blank" rel="noreferrer"' : "") + '><span class="kc-i">' + icon + '</span><span class="kc-t"><small>' + esc(label) + "</small><b>" + esc(value) + '</b></span><span class="kc-a">' + I.arrow + "</span></a>";
    };
    $("[data-contact-row]").innerHTML =
      card("tel:" + P.phones[0].replace(/\s/g, ""), I.phone, tr("Phone"), P.phones[0]) +
      card(P.linkedin, I["in"], "LinkedIn", tr("Connect"), true) +
      '<div class="kc"><span class="kc-i">' + I.pin + '</span><span class="kc-t"><small>' + esc(tr("Based in")) + "</small><b>" + esc(tr(P.location)) + "</b></span></div>";
    $("[data-legal]").innerHTML = "<span>© 2026 " + esc(P.name) + " · " + esc(tr(P.role)) + "</span><span>" + P.phones.map(function (p) { return '<a href="tel:' + p.replace(/\s/g, "") + '">' + esc(p) + "</a>"; }).join(" · ") + ' · <a href="mailto:' + esc(P.email) + '">' + esc(P.email) + "</a> · " + esc(tr(P.location)) + "</span>";
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

  function reveal() {
    var rv = $$("[data-rv]:not(.hero [data-rv])").concat($$(".foot-h"), $$(".pc"));
    if (!("IntersectionObserver" in window)) { rv.concat($$(".hero [data-rv]")).forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    rv.forEach(function (e, i) { if (!e.style.getPropertyValue("--d")) e.style.setProperty("--d", "0ms"); io.observe(e); });
    $$(".stats .stat, .band-grid .bnum, .kcards > *").forEach(function (e, i) {
      /* tiny stagger inside groups */
      var sibs = e.parentElement.children; var idx = Array.prototype.indexOf.call(sibs, e);
      e.style.setProperty("--d", Math.min(idx, 5) * 70 + "ms");
    });
  }
  function heroIn() { $$(".hero [data-rv]").forEach(function (e, i) { e.style.setProperty("--d", i * 90 + "ms"); e.classList.add("in"); }); }

  function counters() {
    var els = $$("[data-count]");
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(function (b) { b.textContent = b.dataset.count + b.dataset.suffix; }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return; io.unobserve(en.target);
        var b = en.target, end = Number(b.dataset.count), t0 = performance.now(), sfx = b.dataset.suffix;
        (function step(t) {
          var p = Math.min((t - t0) / 1400, 1);
          b.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))) + sfx;
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.5 });
    els.forEach(function (b) { io.observe(b); });
  }

  function accordions() {
    doc.addEventListener("click", function (e) {
      var h = e.target.closest(".ai-h"); if (!h) return;
      var item = h.closest(".ai"), open = !item.classList.contains("open");
      /* one open at a time inside each list */
      if (open) $$(".ai.open", item.parentElement).forEach(function (o) { if (o !== item) { o.classList.remove("open"); var oh = $(".ai-h", o); if (oh) oh.setAttribute("aria-expanded", "false"); } });
      item.classList.toggle("open", open); h.setAttribute("aria-expanded", String(open));
    });
  }

  function marquee() {
    var tracks = $$("[data-marq]").map(function (t) {
      return { el: t, unit: t.dataset.unit, dir: Number(t.dataset.marq), speed: Number(t.dataset.marqSpeed), half: 1, x: 0 };
    });
    function build() {
      tracks.forEach(function (t) {
        t.el.innerHTML = t.unit;
        var uw = t.el.getBoundingClientRect().width || 1, reps = Math.max(1, Math.ceil(innerWidth / uw));
        t.el.innerHTML = new Array(reps * 2 + 1).join(t.unit);
        t.half = uw * reps; t.x = t.dir > 0 ? -t.half : 0;
      });
    }
    build();
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(build);
    var rz, lw = innerWidth; addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { if (innerWidth !== lw) { lw = innerWidth; build(); } }, 200); });
    var vel = 0, lastY = scrollY, last = performance.now();
    function loop(now) {
      var dt = Math.min(48, now - last) / 16.67; last = now;
      var dy = scrollY - lastY; lastY = scrollY;
      vel += (dy - vel) * 0.12;
      var skew = reduce ? 0 : clamp(vel * -0.16, -9, 9);
      tracks.forEach(function (t) {
        t.x += (reduce ? 0 : (t.speed + Math.min(Math.abs(vel) * 0.35, 14)) * dt * t.dir);
        if (t.dir < 0 && t.x <= -t.half) t.x += t.half;
        if (t.dir > 0 && t.x >= 0) t.x -= t.half;
        t.el.style.transform = "translate3d(" + t.x.toFixed(2) + "px,0,0) skewX(" + skew.toFixed(2) + "deg)";
      });
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  function scrollFx() {
    var prog = $(".progress"), heroInner = $(".hero-in"), hero = $(".hero");
    var lead = $$(".about-lead .sw"), leadEl = $(".about-lead");
    var cards = $$(".pc"), ticking = false;
    function frame() {
      ticking = false;
      var y = scrollY, vh = innerHeight, max = root.scrollHeight - vh;
      if (prog) prog.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);
      if (!reduce && hero && y < vh * 1.2) {
        heroInner.style.transform = "translate3d(0," + (y * 0.1).toFixed(1) + "px,0)";
        heroInner.style.opacity = String(clamp(1 - y / (vh * 0.95), 0, 1));
      }
      /* about: words light up as the paragraph crosses the viewport */
      if (leadEl && !reduce) {
        var r = leadEl.getBoundingClientRect();
        var p = clamp((vh * 0.88 - r.top) / (r.height + vh * 0.3), 0, 1), n = Math.round(p * lead.length);
        for (var i = 0; i < lead.length; i++) { var on = i < n; if (lead[i]._on !== on) { lead[i]._on = on; lead[i].classList.toggle("on", on); } }
      }
      /* work: stacking scale-back + image parallax */
      var wide = innerWidth >= 900;
      cards.forEach(function (c, i) {
        var rc = c.getBoundingClientRect();
        if (rc.bottom > -200 && rc.top < vh + 200) {
          var off = clamp((rc.top + rc.height / 2 - vh / 2) / vh, -1, 1);
          c.querySelector(".pc-media").style.setProperty("--py", (reduce ? -3.5 : -3.5 - off * 3.5).toFixed(2) + "%");
        }
        if (wide && !reduce && cards[i + 1]) {
          var rn = cards[i + 1].getBoundingClientRect();
          var pp = clamp((rc.bottom - rn.top) / rc.height, 0, 1);
          c.style.transform = pp > 0 ? "scale(" + (1 - pp * 0.06).toFixed(4) + ")" : "";
          c.style.setProperty("--dim-o", (pp * 0.6).toFixed(3));
        } else { c.style.transform = ""; c.style.setProperty("--dim-o", 0); }
      });
    }
    function queue() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
    addEventListener("scroll", queue, { passive: true }); addEventListener("resize", queue); frame();
  }

  function pointerFx() {
    if (!fine || reduce) return;
    root.classList.add("has-cur");
    var cur = $(".cur"), lab = $(".cur span"), mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener("mousemove", function (e) { mx = e.clientX; my = e.clientY; }, { passive: true });
    doc.addEventListener("mouseover", function (e) {
      var t = e.target.closest("[data-cur]");
      if (t) { lab.textContent = tr("View case"); cur.classList.add("on"); } else cur.classList.remove("on");
    });
    (function loop() { cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2; cur.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)"; requestAnimationFrame(loop); })();
    $$("[data-magnetic]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.transition = "background-color .35s, color .35s, border-color .35s, box-shadow .35s";
        el.style.transform = "translate(" + ((e.clientX - (r.left + r.width / 2)) * 0.28).toFixed(1) + "px," + ((e.clientY - (r.top + r.height / 2)) * 0.34).toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transition = "transform .7s cubic-bezier(.16,1,.3,1), background-color .35s, color .35s"; el.style.transform = ""; });
    });
    /* hero orbs follow the pointer a little */
    var hero = $(".hero"), o1 = $(".o1"), o2 = $(".o2");
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      hero.style.setProperty("--px", px.toFixed(3)); hero.style.setProperty("--py", py.toFixed(3));
      o1.style.translate = (px * 70).toFixed(1) + "px " + (py * 50).toFixed(1) + "px";
      o2.style.translate = (px * -90).toFixed(1) + "px " + (py * -60).toFixed(1) + "px";
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

  function misc() {
    var el = $("[data-local-time]");
    if (el) {
      var f = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true });
      var tick = function () { el.textContent = tr("Chennai local time") + ": " + f.format(new Date()) + " IST"; };
      tick(); setInterval(tick, 30000);
    }
    var top = $("[data-top]"); if (top) top.addEventListener("click", function () { scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  }

  /* ---------- boot ---------- */
  function boot() {
    try {
      translateStatic();
      if (P) {
        renderHero(); renderMarquee(); renderAbout(); renderWork(); renderBand(); renderSkills(); renderExperience(); renderContact();
      }
      reveal(); counters(); accordions(); marquee(); scrollFx(); pointerFx(); modal(); misc();
    } finally { root.classList.remove("i18n-pending"); }
    if (root.classList.contains("intro-lock")) intro();
    else { root.classList.add("ready"); heroIn(); }
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot); else boot();
})();
