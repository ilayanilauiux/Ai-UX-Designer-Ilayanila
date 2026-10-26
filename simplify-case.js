(function () {

  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", window.labelMenu ? window.labelMenu(open) : open ? "Close menu" : "Open menu");
  });
  document.querySelectorAll(".nav-links a, .sc-index a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ai = document.querySelector("[data-ai-mock]");
  if (ai) {
    const chips = [...ai.querySelectorAll("[data-format]")];
    const drop = ai.querySelector("[data-drop]");
    const ring = ai.querySelector("[data-ring]");
    const bars = [...ai.querySelectorAll("[data-bar]")];
    const gap = ai.querySelector("[data-gap]");
    const play = () => {
      chips.forEach((chip, i) => chip.classList.toggle("is-on", i === 1));
      drop?.classList.add("is-out");
      if (ring) ring.style.setProperty("--p", "64%");
      bars.forEach((bar) => {
        bar.style.width = bar.getAttribute("data-bar");
      });
      gap?.classList.add("is-open");
    };
    if (reduce) play();
    else {
      chips.forEach((chip) => chip.classList.remove("is-on"));
      window.setTimeout(() => chips[1]?.classList.add("is-on"), 400);
      window.setTimeout(() => drop?.classList.add("is-out"), 900);
      window.setTimeout(() => {
        if (ring) ring.style.setProperty("--p", "64%");
        bars.forEach((bar) => {
          bar.style.transition = "width 700ms cubic-bezier(0.22, 1, 0.36, 1)";
          bar.style.width = bar.getAttribute("data-bar");
        });
      }, 1400);
      window.setTimeout(() => gap?.classList.add("is-open"), 2300);
    }
    ai.querySelector("[data-open-gap]")?.addEventListener("click", () => {
      gap?.classList.toggle("is-open");
    });
  }

  const persona = document.querySelector("[data-persona]");
  if (persona) {
    const views = {
      client: {
        counts: ["Pending actions", "Counts", "Distribution", "Calendar"],
        question: "Is this program healthy?",
      },
      vendor: {
        counts: ["Counts", "Pending actions", "Calendar", "Distribution"],
        question: "Which jobs can I fill, and how do I stand?",
      },
      msp: {
        counts: ["Pending actions", "Calendar", "Counts", "Distribution"],
        question: "What needs a decision today, across this client’s suppliers?",
      },
    };
    const counts = persona.querySelector("[data-counts]");
    const question = persona.querySelector("[data-question]");
    const paint = (key) => {
      const view = views[key];
      counts.innerHTML = view.counts.map((item) => `<span>${item}</span>`).join("");
      question.textContent = view.question;
      persona.querySelectorAll("[data-role]").forEach((button) => {
        button.setAttribute("aria-pressed", String(button.getAttribute("data-role") === key));
      });
    };
    persona.querySelectorAll("[data-role]").forEach((button) => {
      button.addEventListener("click", () => paint(button.getAttribute("data-role")));
    });
    paint("client");
  }
})();
