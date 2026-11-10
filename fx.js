/* fx — R1 enhancement layer (home page). Vanilla, no dependencies. Pairs with fx.css. */
(() => {
  "use strict";
  const d = document, root = d.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const BUILD = "R1.2 · 2026.11.10";
  const L = {
    en: { drag: "Drag", close: "Close", open: "Open full page", sound: "Sound", on: "On", off: "Off", loading: "Loading case study", focus: "Case study", view: "View case", type: "Type" },
    de: { drag: "Ziehen", close: "Schließen", open: "Ganze Seite öffnen", sound: "Ton", on: "An", off: "Aus", loading: "Fallstudie lädt", focus: "Fallstudie", view: "Ansehen", type: "Tippen" },
    ar: { drag: "اسحب", close: "إغلاق", open: "افتح الصفحة كاملة", sound: "الصوت", on: "تشغيل", off: "إيقاف", loading: "جارٍ تحميل دراسة الحالة", focus: "دراسة حالة", view: "عرض", type: "اكتب" },
  };
  const tx = (k) => (L[root.lang] || L.en)[k];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  let px = -9999, py = -9999, moved = false;
  d.addEventListener("pointermove", (e) => { if (e.pointerType === "touch") return; px = e.clientX; py = e.clientY; moved = true; }, { passive: true });

  /* ============ 1. Kinetic typography ============ */
  const kin = { h1: null, chars: [], heads: [], vel: 0, lastY: scrollY, dir: 1 };

  /* Freeze the current line breaks so axis changes never re-wrap a heading. */
  function lockLines(el) {
    $$("br.fx-br", el).forEach((b) => b.remove());
    el.classList.remove("fx-lock");
    const words = $$(".kwd", el);
    let top = null;
    const firsts = [];
    words.forEach((w) => {
      const t = w.getBoundingClientRect().top;
      if (top !== null && t - top > 4) firsts.push(w);
      top = t;
    });
    firsts.forEach((w) => { const br = d.createElement("br"); br.className = "fx-br"; w.before(br); });
    el.classList.add("fx-lock");
  }
  function wrapWords(el, chars) {
    const walker = d.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((n) => {
      if (!n.nodeValue.trim() || n.parentElement.closest(".kwd")) return;
      const inEm = !!n.parentElement.closest("em");
      const frag = d.createDocumentFragment();
      n.nodeValue.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(part); return; }
        const w = d.createElement("span");
        w.className = "kwd";
        if (chars && !inEm) w.innerHTML = [...part].map((c) => `<span class="kch">${esc(c)}</span>`).join("");
        else w.textContent = part;
        frag.append(w);
      });
      n.replaceWith(frag);
    });
  }
  function setupKinetic() {
    if (root.lang === "ar") return; // Arabic shaping must not be split
    const h1 = $("[data-headline]");
    const inner = h1 && ($(".line-mask > span", h1) || h1);
    if (inner && !$(".kwd", inner)) {
      wrapWords(inner, fine && !reduce);
      h1.classList.add("fx-kt");
      lockLines(inner);
      kin.h1 = h1;
      kin.chars = $$(".kch", inner).map((el) => ({ el, w: 699, x: 0, y: 0 }));
      measureChars();
    }
    kin.heads = $$(".section-head h2, .footer h2").map((el) => {
      if (!$(".kwd", el)) { wrapWords(el, false); el.classList.add("fx-kt"); lockLines(el); }
      return { el, v: 0 };
    });
  }
  function measureChars() {
    if (!kin.h1) return;
    const base = kin.h1.getBoundingClientRect();
    kin.chars.forEach((c) => {
      const r = c.el.getBoundingClientRect();
      c.x = r.left + r.width / 2 - base.left; c.y = r.top + r.height / 2 - base.top;
    });
  }
  function relock() {
    const h1 = $("[data-headline]");
    const inner = h1 && ($(".line-mask > span", h1) || h1);
    if (inner && $(".kwd", inner)) lockLines(inner);
    kin.heads.forEach((h) => lockLines(h.el));
    measureChars();
  }
  function kineticFrame() {
    // scroll velocity → section headings compress, gain weight and lean into the motion
    const y = scrollY, dy = y - kin.lastY; kin.lastY = y;
    if (dy) kin.dir = dy > 0 ? 1 : -1;
    const target = reduce ? 0 : clamp(Math.abs(dy) / 60, 0, 1);
    kin.vel += (target - kin.vel) * (target > kin.vel ? 0.25 : 0.08);
    const v = kin.vel < 0.004 ? 0 : kin.vel;
    kin.heads.forEach((h) => {
      if (h.v === v) return;
      h.v = v;
      if (v === 0) { h.el.style.removeProperty("--kv"); return; }
      const r = h.el.getBoundingClientRect();
      if (r.bottom < -80 || r.top > innerHeight + 80) { h.el.style.removeProperty("--kv"); h.v = -1; return; }
      h.el.style.setProperty("--kv", v.toFixed(3));
      h.el.style.setProperty("--kd", kin.dir);
    });
    // pointer proximity → hero letters gain weight under the cursor
    if (!kin.chars.length || !kin.h1) return;
    const base = kin.h1.getBoundingClientRect();
    const near = px > base.left - 200 && px < base.right + 200 && py > base.top - 200 && py < base.bottom + 200;
    if (!near && !kin.live) return;
    if (near && !kin.wasNear) measureChars();
    kin.wasNear = near;
    let live = false;
    const R = 190;
    kin.chars.forEach((c) => {
      let t = 699;
      if (near) {
        const dist = Math.hypot(px - (base.left + c.x), py - (base.top + c.y));
        const g = Math.exp(-(dist * dist) / (2 * R * R * 0.32));
        t = 540 + 260 * g;
      }
      c.w += (t - c.w) * 0.14;
      if (Math.abs(t - c.w) > 0.6) live = true; else c.w = t;
      const w = Math.round(c.w);
      if (w !== c.s) { c.s = w; c.el.style.setProperty("--w", w); }
    });
    kin.live = live || near;
  }

  /* ============ 2. Technical micro-metadata ============ */
  function setupTelemetry() {
    const meta = $(".hero-meta");
    if (!meta || $(".tm", meta)) return;
    const el = d.createElement("div");
    el.className = "tm";
    el.innerHTML =
      `<span class="tm-wide" aria-hidden="true">13.0827°N&nbsp; 80.2707°E</span>` +
      `<span class="tm-mid" aria-hidden="true">IST <b data-tm-time>--:--:--</b></span>` +
      `<span class="tm-wide" aria-hidden="true">Scroll <b data-tm-scroll>000%</b></span>` +
      `<span aria-hidden="true">Build <b>${BUILD}</b></span>` +
      `<button type="button" class="tm-snd" aria-pressed="false"><span class="tm-eq" aria-hidden="true"><i></i><i></i><i></i></span><span data-tm-snd></span></button>`;
    meta.append(el);
    const time = $("[data-tm-time]", el), sc = $("[data-tm-scroll]", el), btn = $(".tm-snd", el);
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const tick = () => { time.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 1000);
    let last = -1;
    addEventListener("scroll", () => {
      const max = root.scrollHeight - innerHeight;
      const p = max > 0 ? Math.round((scrollY / max) * 100) : 0;
      if (p !== last) { last = p; sc.textContent = String(p).padStart(3, "0") + "%"; }
    }, { passive: true });
    const paint = () => {
      btn.setAttribute("aria-pressed", String(snd.on));
      btn.setAttribute("aria-label", `${tx("sound")}: ${tx(snd.on ? "on" : "off")}`);
      $("[data-tm-snd]", btn).textContent = `${tx("sound")} ${tx(snd.on ? "on" : "off")}`;
    };
    btn.addEventListener("click", () => {
      snd.on = !snd.on;
      try { localStorage.setItem("fx-snd", snd.on ? "1" : "0"); } catch (e) {}
      paint();
      if (snd.on) snd.play("ok");
    });
    paint();
  }
  function setupCallouts() {
    $$(".section-head").forEach((head) => {
      const idx = $(".index", head);
      const no = idx && (idx.textContent.match(/\d+/) || [])[0];
      if (!no) return;
      head.dataset.no = no;
      const sec = head.closest("section");
      let bits = null;
      if (sec && sec.id === "work") { const n = $$(".cc", sec).length; if (n) bits = [`${String(n).padStart(2, "0")} cases`, $(".cc3d", sec) ? (fine ? "drag ↔" : "swipe ↔") : "open ↗"]; }
      else if (sec && sec.id === "expertise") { const g = $$(".skill", sec).length, n = $$(".skill li", sec).length; if (g) bits = [`${String(g).padStart(2, "0")} groups`, n ? `${n} skills` : ""]; }
      else if (sec && sec.id === "impact") { const n = $$(".job", sec).length; if (n) bits = [`${String(n).padStart(2, "0")} roles`, "expand ↓"]; }
      if (!bits) return;
      $(".co", head)?.remove();
      const co = d.createElement("p");
      co.className = "co"; co.setAttribute("aria-hidden", "true");
      co.innerHTML = `<i></i><span>Fig.${no}</span>` + bits.filter(Boolean).map((b) => `<b>${esc(b)}</b>`).join("");
      head.append(co);
    });
    $(".skill-cats")?.classList.add("fx-asym");
  }

  /* ============ 3. Tactile glass ============ */
  let glass = [];
  function setupGlass() {
    $$(".cc, .skill, .modal-card").forEach((el) => {
      if (el.classList.contains("tg")) return;
      el.classList.add("tg");
      el.insertAdjacentHTML("beforeend", '<i class="tg-rim" aria-hidden="true"></i><i class="tg-sheen" aria-hidden="true"></i>');
      const cs = getComputedStyle(el);
      const c = cs.getPropertyValue("--c").trim() || cs.getPropertyValue("--sk").trim();
      if (c) el.style.setProperty("--tgc", c);
    });
    glass = $$(".tg").map((el) => ({ el, lit: false }));
  }
  function glassFrame() {
    if (!fine || !moved) return;
    const REACH = 220;
    glass.forEach((g) => {
      const r = g.el.getBoundingClientRect();
      if (!r.width || r.bottom < 0 || r.top > innerHeight) { if (g.lit) { g.lit = false; g.el.style.setProperty("--lo", 0); } return; }
      const ox = Math.max(r.left - px, 0, px - r.right), oy = Math.max(r.top - py, 0, py - r.bottom);
      const dist = Math.hypot(ox, oy);
      if (dist > REACH) { if (g.lit) { g.lit = false; g.el.style.setProperty("--lo", 0); } return; }
      g.lit = true;
      g.el.style.setProperty("--lx", `${(px - r.left).toFixed(1)}px`);
      g.el.style.setProperty("--ly", `${(py - r.top).toFixed(1)}px`);
      g.el.style.setProperty("--lo", (1 - dist / REACH).toFixed(2));
    });
  }

  /* ============ 4. Sound + haptic feedback ============ */
  const snd = {
    on: false, ac: null,
    ctx() {
      if (!this.ac) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; this.ac = new AC(); }
      if (this.ac.state === "suspended") this.ac.resume();
      return this.ac;
    },
    blip(f0, f1, dur, vol, type = "sine", at = 0) {
      const ac = this.ctx(); if (!ac) return;
      const t = ac.currentTime + at, o = ac.createOscillator(), g = ac.createGain();
      o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(ac.destination); o.start(t); o.stop(t + dur + 0.02);
    },
    noise(dur, vol, hp, at = 0) {
      const ac = this.ctx(); if (!ac) return;
      const n = Math.ceil(ac.sampleRate * dur), buf = ac.createBuffer(1, n, ac.sampleRate), ch = buf.getChannelData(0);
      for (let i = 0; i < n; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / n) ** 2;
      const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
      s.buffer = buf; f.type = "highpass"; f.frequency.value = hp; g.gain.value = vol;
      s.connect(f).connect(g).connect(ac.destination); s.start(ac.currentTime + at);
    },
    play(name) {
      if (!this.on) return;
      try {
        if (name === "tick") { this.noise(0.012, 0.05, 4200); this.blip(2600, 2000, 0.018, 0.018); }                         // escapement tick
        else if (name === "click") { this.noise(0.016, 0.09, 3000); this.blip(210, 120, 0.05, 0.11, "triangle"); }            // key bottoming out
        else if (name === "open") { this.noise(0.02, 0.06, 2600); this.blip(392, 392, 0.14, 0.05); this.blip(587.3, 587.3, 0.22, 0.045, "sine", 0.07); }
        else if (name === "close") { this.blip(587.3, 587.3, 0.1, 0.045); this.blip(392, 392, 0.2, 0.045, "sine", 0.06); }
        else if (name === "ok") { [523.25, 659.25, 783.99].forEach((f, i) => this.blip(f, f, 0.22, 0.04, "sine", i * 0.06)); }
        if (!fine && navigator.vibrate) navigator.vibrate(name === "tick" ? 4 : 9);
      } catch (e) {}
    },
  };
  try { snd.on = localStorage.getItem("fx-snd") === "1"; } catch (e) {}
  const PRESS = "button, .btn, .filter-chip, summary, .proof-chip, .badge, .cc-go, [data-open-modal]";
  function setupHaptics() {
    d.addEventListener("pointerdown", (e) => {
      const el = e.target.closest?.(PRESS + ", a.cc, a[href]");
      if (!el) return;
      snd.play("click");
      if (reduce) return;
      if (el.matches(PRESS)) {
        el.classList.remove("hx-release"); el.classList.add("hx-press");
        const up = () => {
          el.classList.remove("hx-press"); el.classList.add("hx-release");
          setTimeout(() => el.classList.remove("hx-release"), 450);
          removeEventListener("pointerup", up); removeEventListener("pointercancel", up);
        };
        addEventListener("pointerup", up); addEventListener("pointercancel", up);
      }
      for (let i = 0; i < 2; i++) {
        const ring = d.createElement("i");
        ring.className = "hx-ring"; ring.style.left = e.clientX + "px"; ring.style.top = e.clientY + "px";
        d.body.append(ring); setTimeout(() => ring.remove(), 700);
      }
    }, { passive: true });
    d.addEventListener("toggle", (e) => { if (e.target.tagName === "DETAILS") snd.play(e.target.open ? "open" : "close"); }, true);
    d.addEventListener("submit", (e) => { if (e.target.checkValidity?.()) snd.play("ok"); }, true);
    // one tick each time the carousel settles on a new card
    const grid = $("[data-projects]");
    if (grid && "MutationObserver" in window) {
      let cur = null, t = 0;
      new MutationObserver(() => {
        const a = $(".cc.is-active", grid);
        if (a && a !== cur) { const first = cur === null; cur = a; const now = performance.now(); if (!first && now - t > 90) { t = now; snd.play("tick"); } }
      }).observe(grid, { subtree: true, attributes: true, attributeFilter: ["class"] });
    }
  }

  /* ============ 5. Focus mode ============ */
  const fm = { el: null, card: null, frame: null, open: false };
  function buildFocus() {
    const el = d.createElement("div");
    el.className = "fm"; el.hidden = true;
    el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true");
    el.innerHTML = `
      <div class="fm-bar">
        <button type="button" class="fm-x"><kbd>Esc</kbd><span data-fm-close></span></button>
        <div class="fm-mid"><div class="fm-ttl"><span></span><b></b></div><div class="fm-pills"></div></div>
        <div class="fm-end"><span class="fm-pct" aria-hidden="true">000%</span><a class="fm-open" target="_top"><span data-fm-open></span> ↗</a></div>
        <nav class="fm-tabs"></nav>
        <i class="fm-prog" aria-hidden="true"></i>
      </div>
      <div class="fm-body"><div class="fm-load" aria-hidden="true"><i></i><span data-fm-load></span></div><iframe class="fm-frame" loading="eager"></iframe></div>`;
    d.body.append(el);
    fm.el = el; fm.frame = $(".fm-frame", el);
    $(".fm-x", el).addEventListener("click", () => closeFocus());
    fm.frame.addEventListener("load", onFrameLoad);
    d.addEventListener("keydown", (e) => { if (fm.open && e.key === "Escape") { e.preventDefault(); closeFocus(); } });
    addEventListener("popstate", () => { if (fm.open) closeFocus(true); });
  }
  function openFocus(card) {
    if (!fm.el) buildFocus();
    const el = fm.el, r = card.getBoundingClientRect();
    fm.card = card; fm.open = true;
    const title = $("h3", card)?.textContent.trim() || "";
    const kicker = $(".cc-kicker", card)?.childNodes;
    const ktext = kicker ? [...kicker].filter((n) => n.nodeType === 3).map((n) => n.nodeValue).join("").trim() : "";
    $(".fm-ttl span", el).textContent = ktext || tx("focus");
    $(".fm-ttl b", el).textContent = title;
    el.setAttribute("aria-label", title);
    fm.frame.title = title;
    $(".fm-pills", el).innerHTML = $$(".cc-float", card).map((f) => `<span>${esc(f.textContent.trim())}</span>`).join("");
    $("[data-fm-close]", el).textContent = tx("close");
    $("[data-fm-open]", el).textContent = tx("open");
    $("[data-fm-load]", el).textContent = tx("loading");
    $(".fm-open", el).href = card.href;
    $(".fm-tabs", el).innerHTML = "";
    el.style.setProperty("--fmc", getComputedStyle(card).getPropertyValue("--c").trim() || "var(--em)");
    el.style.setProperty("--fp", 0); $(".fm-pct", el).textContent = "000%";
    el.style.setProperty("--ft", `${Math.max(0, r.top)}px`); el.style.setProperty("--fl", `${Math.max(0, r.left)}px`);
    el.style.setProperty("--fr", `${Math.max(0, innerWidth - r.right)}px`); el.style.setProperty("--fb", `${Math.max(0, innerHeight - r.bottom)}px`);
    el.classList.remove("is-ready", "is-open");
    el.hidden = false;
    root.classList.add("fm-on");
    window.__lenis?.stop();
    void el.offsetWidth;
    el.classList.add("is-open");
    fm.frame.src = card.href;
    history.pushState({ fm: 1 }, "");
    snd.play("open");
    $(".fm-x", el).focus({ preventScroll: true });
  }
  function closeFocus(fromPop) {
    if (!fm.open) return;
    fm.open = false;
    const el = fm.el;
    el.classList.remove("is-open", "is-ready");
    snd.play("close");
    const done = () => {
      el.hidden = true; fm.frame.removeAttribute("src");
      try { fm.frame.contentWindow.location.replace("about:blank"); } catch (e) {}
    };
    if (reduce) done(); else setTimeout(done, 760);
    root.classList.remove("fm-on");
    window.__lenis?.start();
    if (!fromPop && history.state && history.state.fm) history.back();
    fm.card?.focus({ preventScroll: true });
  }
  function onFrameLoad() {
    if (!fm.open) return;
    let win, doc;
    try { win = fm.frame.contentWindow; doc = win.document; if (!doc || win.location.href === "about:blank") return; } catch (e) { fm.el.classList.add("is-ready"); return; }
    // if the frame wandered back to the home page, hand over to the real page
    if (/(^|\/)(index\.html)?$/.test(win.location.pathname)) { const h = win.location.hash; closeFocus(); if (h) location.hash = h; return; }
    const st = doc.createElement("style");
    st.textContent = ".sh{display:none!important}html{scroll-padding-top:16px}";
    doc.head.append(st);
    const th = root.getAttribute("data-theme");
    if (th) { doc.documentElement.setAttribute("data-theme", th); doc.documentElement.style.colorScheme = th; }
    $(".fm-open", fm.el).href = win.location.href;
    doc.addEventListener("keydown", (e) => { if (e.key === "Escape") closeFocus(); });
    doc.addEventListener("click", (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a || a.target === "_blank") return;
      let u; try { u = new URL(a.href, win.location.href); } catch (err) { return; }
      if (u.origin === win.location.origin && /(^|\/)(index\.html)?$/.test(u.pathname)) {
        e.preventDefault(); closeFocus();
        if (u.hash) setTimeout(() => { const t = d.querySelector(u.hash); t && t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }, 80);
      }
    }, true);
    // section tabs, built from the page's own headings
    const heads = [...doc.querySelectorAll("main h2, article h2, body h2")].filter((h, i, a) => a.indexOf(h) === i && h.offsetParent !== null && h.textContent.trim().length > 2).slice(0, 9);
    const tabs = $(".fm-tabs", fm.el);
    tabs.innerHTML = heads.map((h, i) => {
      const t = h.textContent.trim().replace(/\s+/g, " ");
      return `<button type="button" data-i="${i}"><i>${String(i + 1).padStart(2, "0")}</i>${esc(t.length > 30 ? t.slice(0, 29).trimEnd() + "…" : t)}</button>`;
    }).join("");
    tabs.onclick = (e) => {
      const b = e.target.closest("button"); if (!b) return;
      heads[+b.dataset.i].scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      snd.play("tick");
    };
    const pct = $(".fm-pct", fm.el);
    let raf = 0, cur = -1;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const se = doc.scrollingElement || doc.documentElement;
        const max = se.scrollHeight - win.innerHeight, p = max > 0 ? clamp(se.scrollTop / max, 0, 1) : 0;
        fm.el.style.setProperty("--fp", p.toFixed(4));
        pct.textContent = String(Math.round(p * 100)).padStart(3, "0") + "%";
        let idx = -1;
        heads.forEach((h, i) => { if (h.getBoundingClientRect().top < win.innerHeight * 0.4) idx = i; });
        if (idx !== cur) {
          cur = idx;
          [...tabs.children].forEach((b, i) => { if (i === idx) { b.setAttribute("aria-current", "true"); b.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" }); } else b.removeAttribute("aria-current"); });
        }
      });
    };
    win.addEventListener("scroll", onScroll, { passive: true });
    doc.addEventListener("scroll", onScroll, { passive: true, capture: true });
    onScroll();
    fm.el.classList.add("is-ready");
  }
  function setupFocus() {
    d.addEventListener("click", (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const card = e.target.closest?.("a.cc[href]");
      if (!card) return;
      if (innerWidth < 900 || !fine) return; // phones and tablets keep the normal page navigation
      let same = false;
      try { same = new URL(card.href).origin === location.origin; } catch (err) {}
      if (!same) return;
      e.preventDefault();
      openFocus(card);
    });
  }

  /* ============ 6. Contextual cursor ============ */
  function setupCursor() {
    const cur = $(".cursor");
    if (!cur || !fine) return;
    cur.classList.add("fxc");
    const label = d.createElement("span");
    cur.append(label);
    let state = "";
    const set = (kind, text) => {
      const key = kind + "|" + (text || "");
      if (key === state) return;
      state = key;
      cur.classList.remove("c-pill", "c-ring", "c-bar");
      if (kind === "pill") {
        label.textContent = text;
        cur.classList.add("c-pill");
        cur.style.width = Math.ceil(label.scrollWidth + 30) + "px"; cur.style.height = "34px";
      } else if (kind === "ring") { cur.classList.add("c-ring"); cur.style.width = cur.style.height = "44px"; }
      else if (kind === "bar") { cur.classList.add("c-bar"); cur.style.width = "2px"; cur.style.height = "26px"; }
      else { cur.style.width = cur.style.height = ""; }
    };
    const read = (t) => {
      if (!t || !t.closest) return set("");
      const grid = t.closest(".cc3d");
      if (grid) {
        if (grid.classList.contains("dragging")) return set("pill", `‹ ${tx("drag")} ›`);
        const card = t.closest(".cc");
        if (card && card.classList.contains("is-active")) return set("pill", card.getAttribute("data-cursor") || tx("view"));
        if (!t.closest("button")) return set("pill", `‹ ${tx("drag")} ›`);
      }
      const dc = t.closest("[data-cursor]");
      if (dc) return set("pill", dc.getAttribute("data-cursor"));
      if (t.closest("input:not([type=checkbox]):not([type=radio]), textarea")) return set("bar");
      if (t.closest("a, button, summary, [role=button], .skill")) return set("ring");
      set("");
    };
    d.addEventListener("mouseover", (e) => read(e.target), { passive: true });
    d.addEventListener("pointerdown", (e) => { cur.classList.add("c-down"); read(e.target); }, { passive: true });
    addEventListener("pointerup", (e) => { cur.classList.remove("c-down"); setTimeout(() => read(d.elementFromPoint(e.clientX, e.clientY)), 60); }, { passive: true });
    d.addEventListener("mouseleave", () => cur.classList.add("c-hide"));
    d.addEventListener("mouseenter", () => cur.classList.remove("c-hide"));
  }

  /* ============ boot ============ */
  function setupAll() { setupKinetic(); setupCallouts(); setupGlass(); }
  function boot() {
    setupTelemetry(); setupAll(); setupHaptics(); setupFocus(); setupCursor();
    // main.js re-renders on language change — re-apply to the fresh DOM
    let t = 0;
    const again = () => { clearTimeout(t); t = setTimeout(setupAll, 120); };
    ["[data-headline]", "[data-projects]", "[data-skills]"].forEach((s) => {
      const n = $(s); if (!n) return;
      new MutationObserver((m) => { if (m.some((x) => [...x.addedNodes].some((a) => a.nodeType === 1 && !/^(fx-br|tg-rim|tg-sheen|kwd|kch)$/.test(a.className) && a.tagName !== "BR"))) again(); }).observe(n, { childList: true, subtree: s !== "[data-projects]" });
    });
    let rt = 0;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(relock, 180); });
    d.fonts?.ready.then(() => setTimeout(relock, 60));
    const loop = () => { kineticFrame(); glassFrame(); moved = false; requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", () => setTimeout(boot, 0)); else setTimeout(boot, 0);
})();
