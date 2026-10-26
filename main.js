const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const P = window.PROFILE;

const tr = (value) => (typeof window.t === "function" ? window.t(value) : value);

const esc = (str = "") =>
  String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const telHref = (phone) => `tel:${phone.replace(/\s/g, "")}`;

const list = (items) =>
  `<ul class="case-list">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

function liveCover(id) {
  const covers = {
    "simplify-vms": simplifyCover,
    "crif-connect": crifCover,
    "crif-connect-copy": crifCover,
    "shift-management": shiftCover,
    "contingent-workforce-management": contingentCover,
    "designing-trust-ai-hiring": trustCover,
    "transactions-approvals": txnCover,
  };
  return covers[id] ? covers[id]() : "";
}

function simplifyCover() {
  return `
    <div class="ui-cover ui-simplify" aria-hidden="true">
      <aside class="sv-rail">
        <b class="sv-logo">workspace</b>
        <div class="sv-org"><i>W</i><span><b>Organisation</b><small>Business unit</small></span></div>
        <div class="sv-nav">
          <span class="on">Dashboard</span>
          <span>Jobs</span>
          <span>Assignments</span>
          <span>Time &amp; Expense</span>
        </div>
      </aside>
      <div class="sv-main">
        <header class="sv-top"><b>workspace</b><span>Dashboard</span></header>
        <div class="sv-board">
          <section class="sv-card">
            <div class="sv-tabs"><b>Assignment</b><span>Timesheet</span></div>
            <div class="sv-gauge-row">
              <div class="sv-gauge">
                <svg viewBox="0 0 100 58" width="108" height="62" aria-hidden="true">
                  <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#e8e6ff" stroke-width="9" pathLength="100"></path>
                  <path class="sv-arc" d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#6366f1" stroke-width="9" pathLength="100" stroke-dasharray="15 100"></path>
                  <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#16a34a" stroke-width="9" pathLength="100" stroke-dasharray="34 100" stroke-dashoffset="-15"></path>
                  <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#ef4444" stroke-width="9" pathLength="100" stroke-dasharray="23 100" stroke-dashoffset="-49"></path>
                  <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#2563eb" stroke-width="9" pathLength="100" stroke-dasharray="28 100" stroke-dashoffset="-72"></path>
                </svg>
                <p><b>197</b><small>Total Assignments</small></p>
              </div>
              <ul class="sv-legend">
                <li><i style="background:#6366f1"></i>Pending <b>30</b></li>
                <li><i style="background:#16a34a"></i>Approved <b>67</b></li>
                <li><i style="background:#ef4444"></i>Rejected <b>46</b></li>
                <li><i style="background:#2563eb"></i>Withdrawn <b>54</b></li>
              </ul>
            </div>
          </section>
          <section class="sv-card">
            <div class="sv-ar"><div><b>27</b><span>Action Required</span><small>Task(s) pending action</small></div></div>
            <p class="sv-h">Pending Actions</p>
            <ul class="sv-list">
              <li><i style="background:#2563eb"></i><span>Jobs Pending Approval</span><b>25</b></li>
              <li><i style="background:#9333ea"></i><span>Offers Pending Approval</span><b>11</b></li>
              <li class="is-move"><i style="background:#16a34a"></i><span>Timesheets Pending</span><b>14</b></li>
              <li><i style="background:#ea580c"></i><span>Expenses Pending Approval</span><b>23</b></li>
            </ul>
          </section>
          <section class="sv-cal">
            <header><b>January 2026</b><span>Month</span></header>
            <div class="sv-event">
              <i></i>
              <span><b>Adam Charles</b><small>Interview Time · 6:00 AM – 7:00 AM</small></span>
              <em>Interview</em>
            </div>
          </section>
        </div>
      </div>
    </div>`;
}

function crifCover() {
  return `
    <div class="ui-cover ui-crif" aria-hidden="true">
      <div class="cr-app">
        <p class="cr-k">VUA ID · 95XXXXXX@crifconnect</p>
        <div class="cr-card">
          <span>Net worth</span>
          <b>₹ 13,423.00</b>
          <div class="cr-card-row"><em>Link Account</em><small>Last refreshed date<br>03/01/22, 23:11</small></div>
        </div>
        <div class="cr-counts">
          <span>Pending Consents <b>12</b></span>
          <span>Linked Accounts <b>04</b></span>
        </div>
        <div class="cr-window">
          <div class="cr-track">
            <div class="cr-pane">
              <p class="cr-h">New Requests <span>View More</span></p>
              <div class="cr-req"><div><b>ICICI Lombard General</b><small>Wealth Management Service</small></div><em>Accept</em></div>
            </div>
            <div class="cr-pane">
              <p class="cr-h">Consents</p>
              <div class="cr-req cr-ok"><div><b>Consent approved</b><small>PIN verified</small></div><em>Active</em></div>
            </div>
          </div>
        </div>
        <div class="cr-nav"><span class="on mine">Home</span><span>Accounts</span><span class="consents">Consents</span><span>Profile</span></div>
      </div>
    </div>`;
}

function shiftCover() {
  return `
    <div class="ui-cover ui-shift" aria-hidden="true">
      <div class="sh-tabs">
        <span class="sh-tab mine">My Shifts</span>
        <span class="sh-tab open">Open Shifts</span>
        <span class="sh-tab">Availability</span>
      </div>
      <div class="sh-date"><b>Mon 25, November</b><i aria-hidden="true"></i></div>
      <div class="sh-window">
        <div class="sh-track">
          <article class="sh-row assigned">
            <i></i>
            <div><b>General Hospital</b><small>Staff Nurse, Intensive Care Unit (ICU)</small></div>
          </article>
          <article class="sh-row open">
            <i></i>
            <div><b>Open</b><small>Staff Nurse, Intensive Care Unit (ICU)</small><em>Pending</em></div>
          </article>
        </div>
      </div>
      <div class="sh-legend"><span>Available</span><span class="mine">My Shift</span><span class="open">Open</span><span>Less preferred</span><span>N/A</span></div>
    </div>`;
}

function contingentCover() {
  return `
    <div class="ui-cover ui-cw" aria-hidden="true">
      <div class="cw-bar"><i></i><i></i><i></i><em>MSP dashboard</em></div>
      <div class="cw-kpis">
        <div class="g"><b>Add new</b><small>Create job</small></div>
        <div class="b"><b>743</b><small>Active jobs</small></div>
        <div class="p"><b>25</b><small>Openings</small></div>
        <div class="r"><b>18</b><small>Ending</small></div>
      </div>
      <div class="cw-body">
        <div class="cw-need"><b>27</b><span>Action required</span></div>
        <p class="cw-h">Pending actions</p>
        <ul class="cw-list">
          <li class="is-move"><i style="background:#4f46e5"></i><b>25</b><span>Jobs pending approval</span></li>
          <li><i style="background:#7c6bb5"></i><b>11</b><span>Offers pending approval</span></li>
          <li><i style="background:#3d8b8a"></i><b>2</b><span>Contract amendments</span></li>
          <li><i style="background:#3d8b72"></i><b>14</b><span>Timesheets pending</span></li>
          <li><i style="background:#c4a15a"></i><b>23</b><span>Expenses pending</span></li>
        </ul>
      </div>
    </div>`;
}

function trustCover() {
  return `
    <div class="ui-cover ui-ai" aria-hidden="true">
      <div class="ai-chrome"><i></i><i></i><i></i><em>Schedule Interview</em></div>
      <div class="ai-who"><i>SW</i><div><b>Sarah Williams</b><small>Candidate CAN-119403 · Job HOTEL-JB-1443</small></div></div>
      <p class="ai-k">Interview Format <span>STEP 2/3</span></p>
      <div class="ai-opts">
        <div class="ai-opt is-on manual"><b>Manual Interview</b><small>In-person or manual</small></div>
        <div class="ai-opt video"><b>AI Interview — Video</b><small>AI-powered video interview</small></div>
        <div class="ai-opt"><b>AI Interview — Audio</b><small>AI-powered audio interview</small></div>
      </div>
      <p class="ai-note"><span class="rest">Set up a manual or in-person interview.</span><span class="next">Schedule a virtual interview run by AI.</span></p>
    </div>`;
}

function txnCover() {
  return `
    <div class="ui-cover ui-txn" aria-hidden="true">
      <header class="tx-top">
        <b>Assignment</b>
        <div class="tx-tabs"><span>Details</span><span>Budget</span><span class="on">Workflow</span><span>History</span></div>
        <em>Pending</em>
      </header>
      <p class="tx-h">Current Workflow</p>
      <ul class="tx-chain">
        <li><span>Level 1</span><b class="ok">Completed</b></li>
        <li class="is-move"><span>Level 2 · Sequential</span><b class="pd">Pending</b><small>Replace · Bypass</small></li>
        <li class="ns"><span>Level 3</span><b>Not Started</b></li>
      </ul>
      <p class="tx-h">Timesheets</p>
      <ul class="tx-grid">
        <li><span>PRG-AM-10461</span><em>Pending</em><b>8h</b></li>
        <li><span>PRG-AM-10462</span><em>Pending</em><b>40h</b></li>
      </ul>
    </div>`;
}

function projectCard(p, i) {
  const live = liveCover(p.id);
  return `
    <a class="project-card ${i === 0 ? "featured" : ""}" data-tags="${esc(p.tags.join(","))}" href="${p.id === "simplify-vms" || p.id === "transactions-approvals" ? "./transactions-approvals.html?v=paper" : p.id === "crif-connect" ? "./crif-connect.html" : p.id === "crif-connect-copy" ? "./crif-connect-copy.html" : p.id === "shift-management" ? "./shift-management.html" : p.id === "contingent-workforce-management" ? "./contingent-workforce.html" : p.id === "designing-trust-ai-hiring" ? "./designing-trust-ai-hiring.html" : `./case.html?id=${esc(p.id)}`}" data-cursor="${esc(tr("View case"))}">
      <figure class="screen" data-preview>
        <span class="screen-label">${String(i + 1).padStart(2, "0")}</span>
        <span class="card-hover">${esc(tr("View case study →"))}</span>
        ${
          live ||
          `<video class="preview-video" muted loop playsinline ${p.video ? `src="${esc(p.video)}"` : ""}></video>
        ${/\.(jpe?g|webp)$/i.test(p.cover || "") ? `<img class="shot" src="${esc(p.cover)}" alt="" loading="lazy" decoding="async">` : ""}
        <div class="mock product">
          <div class="appbar">
            <span>${esc(p.company)}</span>
            <span class="live">${esc(tr(p.role))}</span>
          </div>
          <p class="title-sm">${esc(tr(p.title))}</p>
        </div>
        ${p.cover ? `<figcaption class="plug">${esc(p.cover)}</figcaption>` : ""}`
        }
      </figure>
      <div class="project-copy">
        <p class="meta">${[tr(p.role), tr(p.timeline)].filter(Boolean).map(esc).join(" · ")}</p>
        <h3>${esc(tr(p.title))}</h3>
        <p class="metrics">${esc(tr(p.line || p.summary))}</p>
        <div class="pills">${p.tags.map((tag) => `<span class="pill">${esc(tr(tag))}</span>`).join("")}</div>
      </div>
    </a>`;
}

/* ---------- Work cards (uniform glass tiles, one hue each) ---------- */
const CARD_DEFS = [
  {
    id: "contingent-workforce-management", href: "./contingent-workforce.html",
    kicker: "Award-winning · AI-native platform", title: "From Dense to Industry-Leading", ai: true,
    hook: "A legacy workforce platform rebuilt as AI-native with Claude and Cursor: role dashboards, hiring, one shared approval workflow and a record that follows every hire.",
    chips: ["AI-native rebuild", "Workflows", "Design system"], cats: ["AI", "Workforce"],
    c: "#00ff87", c2: "#22d3ee", floats: ["★ PEAK Matrix Leader 2026", "5 role dashboards"],
  },

  {
    id: "designing-trust-ai-hiring", href: "./designing-trust-ai-hiring.html",
    kicker: "AI · Hiring", title: "Making AI Show Its Work", ai: true,
    hook: "AI screening and interviews that speed up hiring, with every automated judgment visible, editable and overridable by the recruiter.",
    chips: ["AI interviews", "Explainable UX", "Human-in-the-loop"], cats: ["AI", "Workforce"],
    c: "#a78bfa", c2: "#00ff87", floats: ["✦ AI summary", "You decide"],
  },


  {
    hide: true, id: "shift-management", href: "./shift-management.html",
    kicker: "Mobile · Healthcare", title: "Clock In Without Thinking",
    hook: "A worker app built for the shift in front of you: one clear path to clock in, track hours and keep credentials in reach.",
    chips: ["Mobile", "Healthcare", "Workforce"], cats: ["Mobile", "Workforce"],
    c: "#fb7185", c2: "#fbbf24", floats: ["Open shift", "Credentials ✓"],
  },
  {
    id: "crif-connect", href: "./crif-connect.html",
    kicker: "Fintech · 0→1", title: "Consent Without the Anxiety",
    hook: "A four-state, PIN-gated consent lifecycle that makes sharing financial data feel safe on an RBI-licensed Account Aggregator.",
    chips: ["Fintech", "Consent UX", "Design system"], cats: ["Fintech", "Mobile"],
    c: "#60a5fa", c2: "#00ff87", floats: ["PIN verified", "Consent active"],
  },
];


/* ---------- New-age thumbnails: bespoke generative art per case study ---------- */
const THUMBS = {
  "contingent-workforce-management": `
    <div class="ta">
      <div class="ta-glass ta-panel" style="transform:rotate(-2deg)">
        <div class="ta-top"><i></i><span>Who acts · stage by stage</span></div>
        <div style="display:grid;grid-template-columns:repeat(11,1fr);gap:9px 0;justify-items:center;padding:4px 0 2px">${["#7AA7FF","#B79CFF","#FBBF24","#2DD4BF"].map((c, r) => Array.from({length: 11}, (_, k) => `<i style="width:${k === 2 ? 11 : 7}px;height:${k === 2 ? 11 : 7}px;border-radius:50%;${r === 3 && k === 0 ? "border:1px dashed rgba(255,255,255,.45)" : `background:${c};opacity:${k === 2 ? 1 : .45}`};${k === 2 ? `box-shadow:0 0 14px ${c}` : ""}"></i>`).join("")).join("")}</div>
      </div>
      <span class="ta-spark s1">✦</span><span class="ta-spark s2">✦</span>
    </div>`,
  "designing-trust-ai-hiring": `
    <div class="ta ta-ai">
      <div class="ta-glass ta-panel">
        <div class="ta-top"><i></i><span>AI interview</span><b>Explained</b></div>
        <div class="ta-row">
          <div class="ta-ring"><svg viewBox="0 0 100 100"><defs><linearGradient id="tg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--c)"/><stop offset="1" stop-color="var(--c2)"/></linearGradient></defs><circle cx="50" cy="50" r="42" class="ta-rg"/><circle cx="50" cy="50" r="42" class="ta-rv" stroke="url(#tg1)"/></svg><strong>74</strong></div>
          <div class="ta-bars"><i style="--w:86%"></i><i style="--w:62%"></i><i style="--w:78%"></i><i style="--w:44%"></i></div>
        </div>
        <div class="ta-wave">${Array.from({length: 28}, (_, k) => `<i style="--d:${(k * 53) % 900}ms;--h:${30 + ((k * 37) % 70)}%"></i>`).join("")}</div>
      </div>
      <span class="ta-spark s1">✦</span><span class="ta-spark s2">✦</span>
    </div>`,
  "transactions-approvals": `
    <div class="ta ta-queue">
      <i class="ta-line"></i>
      <div class="ta-glass ta-step done"><em>✓</em><span>Level 1</span><b>Approved</b></div>
      <div class="ta-glass ta-step now"><em></em><span>Level 2</span><b>Pending</b></div>
      <div class="ta-glass ta-step"><em></em><span>Level 3</span><b>Queued</b></div>
    </div>`,
  "shift-management": `
    <div class="ta ta-phone">
      <div class="ta-device">
        <i class="ta-notch"></i>
        <div class="ta-clock"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" class="ta-rg"/><circle cx="50" cy="50" r="40" class="ta-rv" style="--v:.62;stroke:var(--c)"/></svg><strong>8:42</strong><small>On shift</small></div>
        <div class="ta-slide"><i></i><span>Clock out</span></div>
      </div>
      <div class="ta-glass ta-chip-cred">✓ <span>RN licence</span></div>
    </div>`,
  "crif-connect": `
    <div class="ta ta-shield">
      <svg class="ta-sh" viewBox="0 0 120 140"><defs><linearGradient id="tg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--c)"/><stop offset="1" stop-color="var(--c2)"/></linearGradient></defs><path d="M60 8l46 16v38c0 34-20 60-46 70C34 122 14 96 14 62V24z" fill="rgba(255,255,255,.06)" stroke="url(#tg2)" stroke-width="2.4"/><path d="M40 70l14 14 28-30" fill="none" stroke="url(#tg2)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" class="ta-tick"/></svg>
      <div class="ta-pin"><i></i><i></i><i></i><i></i></div>
      <span class="ta-state a">Requested</span><span class="ta-state b">Active</span><span class="ta-state c">Paused</span>
    </div>`
};
const thumb = (id) => THUMBS[id] || "";

function workCard(d, i) {
  const p = P.projects.find((x) => x.id === d.id);
  const mock = liveCover(d.id);
  return `
    <a class="cc" href="${d.href}" data-tags="${esc(d.cats.join(","))}" data-cursor="${esc(tr("View case"))}"
       style="--c:${d.c};--c2:${d.c2}">
      <div class="cc-stage" aria-hidden="true">
        <i class="cc-blob b1"></i><i class="cc-blob b2"></i>
        ${thumb(d.id)}
        <div class="cc-win"><div class="cc-mock" data-mock>${mock}</div></div>
        <span class="cc-float f1">${esc(d.floats[0])}</span>
        <span class="cc-float f2">${esc(d.floats[1])}</span>
        <span class="cc-no">${String(i + 1).padStart(2, "0")}</span>
      </div>
      <div class="cc-body">
        <p class="cc-kicker"><i></i>${esc(tr(d.kicker))}${d.ai ? '<b class="cc-ai">✦ AI</b>' : ""}</p>
        <h3>${esc(tr(d.title))}</h3>
        <p class="cc-hook">${esc(tr(d.hook))}</p>
        <div class="cc-foot">
          <div class="cc-chips">${d.chips.map((c) => `<span>${esc(tr(c))}</span>`).join("")}</div>
          <span class="cc-go" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M5.5 4H12v6.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </div>
      </div>
      <span class="sr-only">${esc(p ? p.role : "")}</span>
    </a>`;
}

function renderWorkCards() {
  const grid = $("[data-projects]");
  grid.classList.add("cc-grid");
  grid.innerHTML = CARD_DEFS.filter((c) => !c.hide).map(workCard).join("");
  fitMocks();
  animateCards(grid);
  if (!window.__ccFit) {
    window.__ccFit = true;
    window.addEventListener("resize", fitMocks);
  }
}

function fitMocks() {
  document.querySelectorAll(".cc-win").forEach((win) => {
    const m = win.firstElementChild;
    const s = win.clientWidth / 440;
    if (s > 0) m.style.setProperty("--s", s.toFixed(4));
  });
}

function animateCards(grid) {
  const cards = [...grid.querySelectorAll(".cc")];
  cards.forEach((c, i) => c.style.setProperty("--i", i));
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cards.forEach((c) => c.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  cards.forEach((c) => io.observe(c));
}

function initCarousel(grid) {
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  grid.classList.add("cc3d");
  grid.setAttribute("role", "group");
  grid.setAttribute("aria-roledescription", "carousel");
  grid.setAttribute("aria-label", tr("Selected work"));
  grid.tabIndex = 0;
  const arrow = (dir) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${dir < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}"/></svg>`;
  let ui = grid.parentElement.querySelector(".cc3d-ui");
  if (ui) ui.remove();
  ui = document.createElement("div");
  ui.className = "cc3d-ui";
  ui.innerHTML = `<button type="button" class="cc3d-btn" data-dir="-1" aria-label="${esc(tr("Previous project"))}">${arrow(-1)}</button>
    <div class="cc3d-mid"><span class="cc3d-count" aria-live="polite"></span><div class="cc3d-dots" role="tablist"></div></div>
    <button type="button" class="cc3d-btn" data-dir="1" aria-label="${esc(tr("Next project"))}">${arrow(1)}</button>`;
  grid.after(ui);
  const dotsEl = ui.querySelector(".cc3d-dots");
  const countEl = ui.querySelector(".cc3d-count");
  const cards = [...grid.querySelectorAll(".cc")];
  let active = 0, timer = null, stopped = calm, inView = true, hover = false;
  const vis = () => cards.filter((c) => !c.hidden);

  /* Continuous model: `pos` is a float position in card units, driven by a critically damped spring (or by the pointer while dragging). */
  let pos = 0, vel = 0, target = 0, raf = 0, lastT = 0, shownIdx = -1, geo = { step: 250, ang: 38 };
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  function readGeo() {
    const narrow = grid.clientWidth < 720;
    const cw = grid.style.getPropertyValue("--cw") ? parseFloat(grid.style.getPropertyValue("--cw")) : 420;
    geo = { step: cw * (narrow ? 0.64 : 0.6), ang: narrow ? 28 : 38 };
  }
  function paint() {
    const list = vis();
    const n = list.length;
    if (!n) return;
    const { step, ang } = geo;
    list.forEach((card, i) => {
      let d = (((i - pos) % n) + n) % n;
      if (d > n / 2) d -= n;
      if (n === 2 && Math.abs(d) > 0.999) d = d > 0 ? 0.999 : -0.999;
      const ad = Math.abs(d), sg = d < 0 ? -1 : 1;
      let x, z, ry, sc, op;
      if (ad <= 1) {                       /* the two visible neighbours */
        x = d * step; z = -ad * 150; ry = d * ang; sc = 1 - ad * 0.06; op = 1 - ad * 0.28;
      } else if (ad < 2) {                 /* sliding behind the stack */
        const t = ad - 1;
        x = sg * step * (1 - t); z = -150 - t * 270; ry = sg * ang * (1 - t); sc = 0.94 - t * 0.24; op = 0.72 * (1 - t);
      } else { x = 0; z = -420; ry = 0; sc = 0.7; op = 0; }
      card.style.transform = `translate3d(${x.toFixed(2)}px,0,${z.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
      card.style.opacity = op.toFixed(3);
      card.style.setProperty("--dim", (Math.min(ad, 1) * 0.3).toFixed(3));
      card.style.zIndex = String(50 - Math.round(ad * 10));
      card.style.pointerEvents = ad < 1.5 ? "auto" : "none";
    });
    const idx = ((Math.round(pos) % n) + n) % n;
    if (idx !== shownIdx) { shownIdx = idx; active = idx; layout(); }
  }
  function layout() {
    const list = vis();
    const n = list.length;
    if (!n) return;
    list.forEach((card, i) => {
      const ad = Math.abs(i - active);
      const isA = i === active;
      card.classList.toggle("is-active", isA);
      card.tabIndex = isA ? 0 : -1;
      card.setAttribute("aria-hidden", ad <= 1 || ad === n - 1 ? "false" : "true");
      card.setAttribute("aria-label", `${i + 1} / ${n}: ${card.querySelector("h3")?.textContent || ""}`);
    });
    const cur = list[active];
    if (cur) grid.style.setProperty("--spot", getComputedStyle(cur).getPropertyValue("--c") || "#00ff87");
    dotsEl.innerHTML = list.map((c, i) => `<button type="button" role="tab" aria-selected="${i === active}" aria-label="${esc(c.querySelector("h3")?.textContent || String(i + 1))}" data-i="${i}" class="${i === active ? "is-on" : ""}"></button>`).join("");
    countEl.textContent = `${String(active + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
    ui.hidden = n < 2;
  }
  function frame(t) {
    const dt = Math.min(0.034, Math.max(0.001, (t - lastT) / 1000 || 0.016));
    lastT = t;
    if (!dragging) {
      const w = 12.5;                      /* spring stiffness: critically damped, no overshoot */
      vel += (-2 * w * vel - w * w * (pos - target)) * dt;
      pos += vel * dt;
      if (Math.abs(pos - target) < 0.0006 && Math.abs(vel) < 0.002) { pos = target; vel = 0; paint(); raf = 0; return; }
    }
    paint();
    raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(frame); } }

  function measure() {
    const w = grid.clientWidth;
    const cw = Math.min(420, Math.round(w * (w < 720 ? 0.8 : 0.4)));
    grid.style.setProperty("--cw", cw + "px");
    grid.classList.add("measuring");
    let h = 0;
    vis().forEach((c) => { h = Math.max(h, c.offsetHeight); });
    grid.classList.remove("measuring");
    if (h) grid.style.setProperty("--ch", h + "px");
    fitMocks();
    readGeo();
    shownIdx = -1;
    paint();
  }

  function settle(user) {
    if (user) { stopped = true; clearTimeout(timer); }
    if (calm) { pos = target; vel = 0; paint(); return; }
    kick();
  }
  function goBy(delta, user) {
    if (!vis().length) return;
    target = Math.round(target) + delta;
    settle(user);
  }
  function go(to, user) {            /* jump to card index `to` by the shortest way round */
    const n = vis().length;
    if (!n) return;
    const cur = Math.round(pos), curIdx = ((cur % n) + n) % n;
    let delta = (((to % n) + n) % n) - curIdx;
    if (delta > n / 2) delta -= n; else if (delta < -n / 2) delta += n;
    target = cur + delta;
    settle(user);
  }

  function tick() {
    clearTimeout(timer);
    if (stopped) return;
    timer = setTimeout(() => {
      if (!hover && inView && !document.hidden && !dragging) goBy(1, false);
      tick();
    }, 5200);
  }

  ui.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.dir) goBy(Number(b.dataset.dir), true);
    else if (b.dataset.i) go(Number(b.dataset.i), true);
  });
  grid.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { goBy(1, true); e.preventDefault(); }
    if (e.key === "ArrowLeft") { goBy(-1, true); e.preventDefault(); }
  });

  // drag / swipe: the cards follow the pointer, release carries the momentum
  let sx = 0, sy = 0, dragging = false, moved = false, basePos = 0, samples = [], pid = null;
  grid.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    sx = e.clientX; sy = e.clientY; dragging = true; moved = false; basePos = pos; samples = [[performance.now(), e.clientX]];
    pid = e.pointerId; vel = 0; target = pos;
  });
  grid.addEventListener("pointermove", (e) => {
    if (!dragging || e.pointerId !== pid) return;
    const dx = e.clientX - sx;
    if (!moved) {
      if (Math.abs(dx) < 6) return;
      if (Math.abs(e.clientY - sy) > Math.abs(dx) * 1.3) { dragging = false; return; }   /* vertical scroll wins */
      moved = true; stopped = true; clearTimeout(timer);
      grid.classList.add("dragging");
      try { grid.setPointerCapture(pid); } catch (err) {}
    }
    const n = vis().length;
    let d = -dx / (geo.step * 1.05);
    if (n < 3) d = clamp(d, -0.85, 0.85);
    pos = basePos + d;
    const now = performance.now();
    samples.push([now, e.clientX]);
    while (samples.length > 2 && now - samples[0][0] > 120) samples.shift();
    paint();
  });
  const end = (e) => {
    if (!dragging) return;
    dragging = false;
    grid.classList.remove("dragging");
    try { grid.releasePointerCapture(pid); } catch (err) {}
    if (!moved) return;
    const a = samples[0], b = samples[samples.length - 1];
    const v = b[0] > a[0] ? (-(b[1] - a[1]) / (b[0] - a[0])) / geo.step * 1000 : 0;   /* card units per second */
    const n = vis().length;
    vel = clamp(v, -6, 6);
    target = Math.round(pos + clamp(vel * 0.16, -1, 1));
    if (n < 3) target = clamp(target, Math.round(basePos) - 1, Math.round(basePos) + 1);
    kick();
  };
  grid.addEventListener("pointerup", end);
  grid.addEventListener("pointercancel", end);
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".cc");
    if (!card) return;
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; return; }
    if (!card.classList.contains("is-active")) {
      e.preventDefault();
      go(vis().indexOf(card), true);
    }
  }, true);
  // trackpad / horizontal wheel
  let wheelT = 0;
  grid.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) * 1.2 || Math.abs(e.deltaX) < 2) return;
    e.preventDefault();
    stopped = true; clearTimeout(timer);
    pos += e.deltaX / (geo.step * 2.2); vel = 0; target = pos;
    paint(); clearTimeout(wheelT);
    wheelT = setTimeout(() => { target = Math.round(pos); kick(); }, 110);
  }, { passive: false });
  grid.addEventListener("dragstart", (e) => e.preventDefault());

  grid.addEventListener("pointerenter", () => { hover = true; });
  grid.addEventListener("pointerleave", () => { hover = false; });
  grid.addEventListener("focusin", () => { hover = true; });
  grid.addEventListener("focusout", () => { hover = false; });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((en) => { inView = en[0].isIntersecting; }, { threshold: 0.35 }).observe(grid);
  }

  window.__ccRefresh = (reset) => { if (reset) { active = 0; pos = target = 0; vel = 0; shownIdx = -1; } measure(); };
  if (!window.__ccCarouselResize) {
    window.__ccCarouselResize = true;
    window.addEventListener("resize", () => window.__ccRefresh && window.__ccRefresh(false));
  }
  measure();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  tick();
}

function bindCardFx() {
  const grid = $("[data-projects]");
  if (!grid || grid.dataset.fx) return;
  grid.dataset.fx = "1";
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  grid.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".cc");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--mx", x * 100 + "%");
    card.style.setProperty("--my", y * 100 + "%");
    if (calm) return;
    card.style.setProperty("--px", ((x - 0.5) * 2).toFixed(3));
    card.style.setProperty("--py", ((y - 0.5) * 2).toFixed(3));
  });
  grid.addEventListener("pointerout", (e) => {
    const card = e.target.closest(".cc");
    if (card && !card.contains(e.relatedTarget)) {
      card.style.setProperty("--px", 0);
      card.style.setProperty("--py", 0);
    }
  });
}

function renderHome() {
  if (!P) return;
  $("[data-availability]").textContent = tr(P.availability);
  $("[data-kicker]").innerHTML = `${esc(tr(P.role))} <i>/</i> ${esc(tr(P.location))}`;
  $("[data-greeting]").textContent = tr(P.greeting);
  $("[data-headline]").innerHTML = `
    <span class="line-mask"><span>${esc(tr(P.oneLiner)).replace(/(AI features people can actually trust)/i, '<em class="ital">$1</em>')}</span></span>`;
  $("[data-currently]").textContent = tr(P.currently);
  $("[data-hook]").textContent = tr(P.value);
  $("[data-badges]").innerHTML = P.badges
    .map((b) => `<span class="badge">${esc(tr(b))}</span>`)
    .join("");
  $("[data-proof]").innerHTML = P.primarySkills
    .map((skill) => `<span class="proof-chip">${esc(tr(skill))}</span>`)
    .join("");
  const logos = [...P.deliverables, ...P.deliverables];
  $("[data-marquee]").innerHTML = logos
    .map(
      (item) => `
      <div class="logo-item">
        <span class="logo-name">${esc(item.name)}</span>
      </div>`
    )
    .join("");
  $("[data-about]").textContent = tr(P.summary);
  $("[data-value]").textContent = tr(P.value);
  renderWorkCards();
  const SKILL_ICONS = {
    "Design & architecture": '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M9 9v11"/>',
    "Research & strategy": '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M8.5 11h5M11 8.5v5"/>',
    "Systems & compliance": '<path d="M12 3l8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4"/>',
    "Leadership & workflow": '<circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9.5" r="2.5"/><path d="M3 20c0-3.5 2.7-5.5 6-5.5s6 2 6 5.5M15.5 14.7c3 0 5.5 1.7 5.5 5"/>',
    "AI & workflow": '<path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4zM18.5 16l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
    "Tools": '<path d="M14.5 6.5a4 4 0 0 0 4.9 4.9L21 13l-8 8-3-3 8-8zM4 20l5-5"/>',
  };
  const SKILL_HUES = ["#00ff87", "#60a5fa", "#a78bfa", "#fbbf24", "#22d3ee", "#fb7185"];
  $("[data-skills]").innerHTML = P.skills
    .map(
      (g, i) => `
      <article class="skill" data-magnetic tabindex="0" style="--sk:${SKILL_HUES[i % SKILL_HUES.length]}">
        <header class="sk-h">
          <span class="sk-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${SKILL_ICONS[g.group] || SKILL_ICONS.Tools}</svg></span>
          <strong>${esc(tr(g.group))}</strong>
          <span class="sk-n" aria-label="${g.items.length}"><b>${String(g.items.length).padStart(2, "0")}</b></span>
        </header>
        <div class="sk-bar" aria-hidden="true">${g.items.map(() => "<i></i>").join("")}</div>
        <ul class="sk-chips">${g.items.map((item) => `<li>${esc(tr(item))}</li>`).join("")}</ul>
      </article>`
    )
    .join("");
  $("[data-experience]").innerHTML = P.experience
    .map(
      (job, i) => `
      <article class="job ${i === 0 ? "is-now" : ""}">
        <time datetime="${esc(job.datetime)}">${esc(tr(job.dates))}</time>
        <div>
          <h3>${esc(tr(job.title))}</h3>
          <p class="job-co">${esc(job.company)} · ${esc(tr(job.place))}</p>
          <details>
            <summary>${esc(tr("Responsibilities"))}</summary>
            <ul class="case-list">${job.bullets.map((b) => `<li>${esc(tr(b))}</li>`).join("")}</ul>
          </details>
          ${
            job.clients
              ? `<div class="clients">${job.clients
                  .map((c) => `<span class="badge">${esc(c)}</span>`)
                  .join("")}</div>`
              : ""
          }
        </div>
      </article>`
    )
    .join("");
  $("[data-creds]").innerHTML = `
    <article class="cred">
      <p class="micro em">${esc(tr("Education"))}</p>
      <h3>${esc(tr(P.education.degree))}</h3>
      <p>${esc(P.education.school)}</p>
      <p>${esc(P.education.org)} · ${esc(P.education.years)}</p>
    </article>
    <article class="cred">
      <p class="micro em">${esc(tr("Certifications"))}</p>
      <h3>${esc(tr("UX craft"))}</h3>
      ${P.certifications.map((c) => `<p>${esc(c)}</p>`).join("")}
    </article>
    <article class="cred">
      <p class="micro em">${esc(tr("Tools"))}</p>
      <h3>${esc(tr("Figma, advanced"))}</h3>
      <p>${esc(P.skills.find((s) => s.group === "Tools").items.map((item) => tr(item)).join(" · "))}</p>
    </article>`;
  renderContactChrome();
}

function renderCase() {
  if (!P) return;
  const id = new URLSearchParams(location.search).get("id");
  const project = P.projects.find((p) => p.id === id) || P.projects[0];
  document.title = `${project.title} — Ilayanila M`;
  $("[data-case-root]").innerHTML = `
    <section class="hero case-hero">
      <p class="kicker">${esc(project.company)} <i>/</i> ${esc(tr(project.role))}</p>
      <h1 class="kinetic">
        <span class="line-mask"><span>${esc(tr(project.title))}</span></span>
      </h1>
      <p class="hook">${esc(tr(project.summary))}</p>
      <div class="pills">${project.tags.map((tag) => `<span class="pill">${esc(tr(tag))}</span>`).join("")}</div>
    </section>
    <section class="section" id="overview">
      <div class="section-head">
        <span class="index">${esc(tr("01 — Overview & role"))}</span>
        <h2>${esc(tr("Scope"))}</h2>
      </div>
      <dl class="hero-stats case-meta">
        <div><dt>${esc(tr("Role"))}</dt><dd>${esc(tr(project.role))}</dd></div>
        <div><dt>${esc(tr("Team"))}</dt><dd>${esc(tr(project.team))}</dd></div>
        <div><dt>${esc(tr("Timeline"))}</dt><dd>${esc(tr(project.timeline))}</dd></div>
        <div><dt>${esc(tr("Company"))}</dt><dd>${esc(project.company)}</dd></div>
      </dl>
      <div class="case-block">
        <h3>${esc(tr("Problem statement"))}</h3>
        <p>${esc(tr(project.problem))}</p>
      </div>
      <figure class="screen lg" data-preview data-cursor="${esc(tr("Preview"))}">
        <span class="screen-label">${esc(tr("Cover · replace with Figma export"))}</span>
        <video class="preview-video" muted loop playsinline ${project.video ? `src="${esc(project.video)}"` : ""}></video>
        <div class="mock product">
          <div class="appbar"><span>${esc(tr(project.title))}</span><span class="live">${esc(tr(project.role))}</span></div>
          <p class="dim">${esc(tr(project.summary))}</p>
        </div>
        <figcaption class="plug">PLUG-IN: ${esc(project.cover)} · or set projects[].video in content.js</figcaption>
      </figure>
    </section>
    <section class="section">
      <div class="section-head">
        <span class="index">${esc(tr("02 — The challenge"))}</span>
        <h2>${esc(tr("Users and business"))}</h2>
      </div>
      <div class="case-split">
        <article class="case-block">
          <h3>${esc(tr("User pain / context"))}</h3>
          <p>${esc(tr(project.challenge.users))}</p>
        </article>
        <article class="case-block">
          <h3>${esc(tr("Business goals"))}</h3>
          <p>${esc(tr(project.challenge.business))}</p>
        </article>
      </div>
    </section>
    <section class="section">
      <div class="section-head">
        <span class="index">${esc(tr("03 — Research & discovery"))}</span>
        <h2>${esc(tr("What we learned"))}</h2>
      </div>
      ${list(project.research)}
    </section>
    <section class="section">
      <div class="section-head">
        <span class="index">${esc(tr("04 — Solution & process"))}</span>
        <h2>${esc(tr("How it was designed"))}</h2>
      </div>
      <p class="metrics">${esc(tr("IA, wireframes, iteration, and high-fidelity UI live in Figma. Link screens below when you export them."))}</p>
      ${list(project.process)}
    </section>
    <section class="section">
      <div class="section-head">
        <span class="index">${esc(tr("05 — Results & impact"))}</span>
        <h2>${esc(tr("What the résumé supports"))}</h2>
      </div>
      ${list(project.results)}
      <a class="btn btn-primary" data-magnetic href="./index.html#work">${esc(tr("Back to selected work"))}</a>
    </section>`;
  renderContactChrome();
}

function renderContactChrome() {
  if (!P) return;
  $$("[data-contact-row]").forEach((el) => {
    const ic = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
    const I = {
      mail: ic('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3.5 7l8.5 6 8.5-6"/>'),
      phone: ic('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
      in: ic('<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 11v6M8 7.5v.01M12 17v-6M12 13a3 3 0 0 1 6 0v4"/>'),
      be: ic('<path d="M3 6h6a3 3 0 0 1 0 6H3zM3 12h7a3 3 0 0 1 0 6H3zM14 8h6M14.5 15a3 3 0 0 0 5.5 1M14.5 15a3 3 0 0 1 5.5-1H14.5"/>'),
      pin: ic('<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
      arrow: ic('<path d="M7 17L17 7M9 7h8v8"/>'),
    };
    const card = (cls, href, icon, label, value, ext) =>
      `<a class="kc ${cls}" href="${href}"${ext ? ' target="_blank" rel="noreferrer"' : ""}><span class="kc-i">${icon}</span><span class="kc-t"><small>${label}</small><b>${value}</b></span><span class="kc-a">${I.arrow}</span></a>`;
    el.innerHTML =
      card("kc-main", `mailto:${esc(P.email)}`, I.mail, esc(tr("Email Ilayanila")), esc(P.email)) +
      card("", telHref(P.phones[0]), I.phone, "Phone", esc(P.phones[0])) +
      card("", esc(P.linkedin), I.in, "LinkedIn", "Connect", true) +
      `<div class="kc kc-loc"><span class="kc-i">${I.pin}</span><span class="kc-t"><small>Based in</small><b>${esc(tr(P.location))}</b></span></div>`;
  });
  const legal = $("[data-legal]");
  if (legal) {
    legal.innerHTML = `
      <span>© 2026 ${esc(P.name)} · ${esc(tr(P.role))}</span>
      <span>
        ${P.phones.map((ph) => `<a href="${telHref(ph)}">${esc(ph)}</a>`).join(" · ")}
        · <a href="mailto:${esc(P.email)}">${esc(P.email)}</a>
        · ${esc(tr(P.location))}
      </span>`;
  }
  const blurb = $("[data-contact-blurb]");
  if (blurb) {
    blurb.textContent = `${tr(P.role)}, ${tr(P.location)}. ${tr("Currently at Simplify VMS")}.`;
  }
  const modalCopy = $("[data-modal-copy]");
  if (modalCopy) {
    modalCopy.textContent = tr("This opens your mail client to {email}.").replace("{email}", P.email);
  }
}

function bindTheme() {
  const button = document.querySelector("[data-theme-toggle]");
  const apply = (theme) => {
    const light = theme === "light";
    if (light) document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    try {
      /* theme is per page view; every page opens dark */
    } catch (e) {}
    if (!button) return;
    button.setAttribute("aria-pressed", String(light));
    button.setAttribute("aria-label", window.labelTheme ? window.labelTheme(light) : light ? "Switch to dark theme" : "Switch to light theme");
  };
  apply(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
  button?.addEventListener("click", () => {
    apply(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light");
  });
}

function bindUI() {
  bindTheme();
  const loader = $(".loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader?.classList.add("hide"), 640);
  });
  if (document.readyState === "complete") {
    setTimeout(() => loader?.classList.add("hide"), 640);
  }

  const nav = $(".nav");
  $(".nav-toggle")?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    const toggle = $(".nav-toggle");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", window.labelMenu ? window.labelMenu(open) : open ? "Close menu" : "Open menu");
  });
  $$(".nav-links a").forEach((link) =>
    link.addEventListener("click", () => nav.classList.remove("open"))
  );

  const modal = $("#connect-modal");
  const openModal = () => {
    if (!modal) return;
    modal.hidden = false;
    modal.classList.add("open");
    document.body.classList.add("modal-open");
    $("#connect-name")?.focus();
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  };
  $$("[data-open-modal]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    })
  );
  $$("[data-close-modal]").forEach((el) => el.addEventListener("click", closeModal));
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
  $("#connect-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateConnect()) return;
    const name = $("#connect-name").value.trim();
    const email = $("#connect-email").value.trim();
    const note = $("#connect-note").value.trim();
    const body = encodeURIComponent(`${tr("Hi Ilayanila,")}\n\n${note}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${P.email}?subject=${encodeURIComponent(
      tr("Intro — Senior UX opportunity")
    )}&body=${body}`;
  });

  const cursor = $(".cursor");
  const cursorLabel = $(".cursor-label");
  let mx = 0;
  let my = 0;
  let cx = 0;
  let cy = 0;
  const magnets = $$("[data-magnetic]").map((el) => ({ el, x: 0, y: 0, tx: 0, ty: 0 }));
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  $$("[data-magnetic]").forEach((el, i) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      magnets[i].tx = (e.clientX - (r.left + r.width / 2)) * 0.28;
      magnets[i].ty = (e.clientY - (r.top + r.height / 2)) * 0.28;
    });
    el.addEventListener("mouseleave", () => {
      magnets[i].tx = 0;
      magnets[i].ty = 0;
    });
  });
  $$("[data-cursor]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor?.classList.add("grow");
      const label = el.getAttribute("data-cursor");
      if (label && cursorLabel) {
        cursorLabel.textContent = label;
        cursorLabel.style.opacity = "1";
      }
    });
    el.addEventListener("mouseleave", () => {
      cursor?.classList.remove("grow");
      if (cursorLabel) cursorLabel.style.opacity = "0";
    });
  });
  $("[data-filters]")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    $$(".filter-chip").forEach((c) => c.classList.toggle("is-on", c === btn));
    const f = btn.dataset.filter;
    $$(".cc").forEach((card) => {
      const show = f === "All" || (card.dataset.tags || "").split(",").includes(f);
      card.hidden = !show;
    });
    if (window.__ccRefresh) window.__ccRefresh(true);
  });

  $$("[data-preview]").forEach((screen) => {
    const video = screen.querySelector("video");
    if (!video) return;
    screen.addEventListener("mouseenter", () => {
      if (video.getAttribute("src")) video.play().catch(() => {});
    });
    screen.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  const progress = $(".scroll-progress");
  let lastY = 0;
  const onScrollChrome = (y) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress && max > 0) progress.style.width = `${(y / max) * 100}%`;
    if (!nav) return;
    if (y > lastY && y > 80) nav.classList.add("hide");
    else nav.classList.remove("hide");
    lastY = y;
  };
  const tick = () => {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    if (cursor) {
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
    }
    if (cursorLabel) {
      cursorLabel.style.left = `${mx}px`;
      cursorLabel.style.top = `${my}px`;
    }
    magnets.forEach((m) => {
      m.x += (m.tx - m.x) * 0.16;
      m.y += (m.ty - m.y) * 0.16;
      m.el.style.transform = `translate(${m.x}px, ${m.y}px)`;
    });
    requestAnimationFrame(tick);
  };
  tick();

  let lenis;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.1,
    });
    lenis.on("scroll", ({ scroll }) => onScrollChrome(scroll));
  } else {
    window.addEventListener("scroll", () => onScrollChrome(window.scrollY), {
      passive: true,
    });
  }

  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -12 });
      else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  });

  if (lenis && !(window.gsap && !reduce)) {
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  if (window.gsap && window.ScrollTrigger && !reduce) {
    gsap.registerPlugin(ScrollTrigger);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    gsap.utils.toArray(".skill, .job, .cred, .project-card, .case-block").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }
}


/* ---- Enhancements: counters, hero depth, local time, form validation ---- */
function renderCounters() {
  const el = $("[data-counters]");
  if (!el || !P) return;
  const items = [
    { n: 9, suffix: "+", label: "Years designing" },
    { n: 5, suffix: "", label: "Companies" },
    { n: P.clients.length, suffix: "", label: "Products & clients" },
    { n: 3, suffix: "", label: "Industries: SaaS, fintech, logistics" },
  ];
  el.innerHTML = `<div class="impact-grid">${items
    .map(
      (i) =>
        `<div class="impact-card"><b data-count="${i.n}" data-suffix="${i.suffix}">${reduce ? i.n + i.suffix : "0"}</b><span>${esc(tr(i.label))}</span></div>`
    )
    .join("")}</div>`;
  if (reduce || !("IntersectionObserver" in window)) {
    $$("[data-count]", el).forEach((b) => (b.textContent = b.dataset.count + b.dataset.suffix));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        $$("[data-count]", el).forEach((b) => {
          const end = Number(b.dataset.count);
          const t0 = performance.now();
          const step = (t) => {
            const p = Math.min((t - t0) / 1100, 1);
            b.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + b.dataset.suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      });
    },
    { threshold: 0.4 }
  );
  io.observe(el);
}

function bindHeroDepth() {
  const hero = $("[data-hero]");
  if (!hero || reduce) return;
  hero.insertAdjacentHTML(
    "afterbegin",
    '<div class="hero-orbs" aria-hidden="true"><i data-depth="26"></i><i data-depth="-18"></i></div>'
  );
  const badges = $$(".badge", hero).map((el, i) => ({ el, d: [8, 14, 20][i % 3] }));
  const orbs = $$(".hero-orbs i", hero).map((el) => ({ el, d: Number(el.dataset.depth) }));
  const fine = window.matchMedia("(pointer: fine)").matches;
  let px = 0;
  let py = 0;
  let sy = 0;
  let raf = 0;
  const paint = () => {
    raf = 0;
    badges.forEach(({ el, d }) => {
      el.style.transform = `translate3d(${px * d}px, ${py * d}px, 0)`;
    });
    orbs.forEach(({ el, d }) => {
      el.style.transform = `translate3d(${px * d * 2}px, ${py * d * 2 + sy * d * 0.02}px, 0)`;
    });
  };
  const queue = () => {
    if (!raf) raf = requestAnimationFrame(paint);
  };
  if (fine) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
      queue();
    });
    hero.addEventListener("mouseleave", () => {
      px = 0;
      py = 0;
      queue();
    });
  }
  window.addEventListener(
    "scroll",
    () => {
      sy = window.scrollY;
      queue();
    },
    { passive: true }
  );
}

function bindLocalTime() {
  const el = $("[data-local-time]");
  if (!el) return;
  const fmt = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const tick = () => {
    el.textContent = `${tr("Chennai local time")}: ${fmt.format(new Date())} IST`;
  };
  tick();
  setInterval(tick, 30000);
}

function validateConnect() {
  const name = $("#connect-name");
  const email = $("#connect-email");
  const msg = $("[data-form-msg]");
  const bad = (field, text) => {
    $$("#connect-form [aria-invalid]").forEach((f) => f.removeAttribute("aria-invalid"));
    field.setAttribute("aria-invalid", "true");
    if (msg) msg.textContent = tr(text);
    field.focus();
    return false;
  };
  if (!name.value.trim()) return bad(name, "Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) return bad(email, "Please enter a valid email address.");
  if (msg) msg.textContent = "";
  $$("#connect-form [aria-invalid]").forEach((f) => f.removeAttribute("aria-invalid"));
  return true;
}

const page = document.body.dataset.page;
if (page === "case") renderCase();
else {
  renderHome();
  renderCounters();
  bindHeroDepth();
}
bindLocalTime();
bindUI();

/* ---- CV download: works as a plain link on the live site; inside the artifact viewer it goes through the downloads capability ---- */
document.addEventListener("click", async (e) => {
  const a = e.target.closest && e.target.closest("a[download]");
  if (!a || !window.claude || typeof window.claude.use !== "function") return;
  e.preventDefault();
  try {
    const dl = await window.claude.use("downloads");
    if (!dl) { window.open(a.href, "_blank"); return; }
    const res = await fetch(a.getAttribute("href"));
    const blob = await res.blob();
    await dl.save({ filename: a.getAttribute("download") || "Ilayanila-M-CV.pdf", data: blob });
  } catch (err) { /* declined or unavailable: nothing to do */ }
});
