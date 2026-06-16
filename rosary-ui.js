import {
  MYSTERY_SETS,
  MYSTERY_ORDER,
  defaultMysteryKey,
  buildRosarySteps,
} from "./rosary.js";

/*
 * Geleide rozenkrans als overlay. Hergebruikt de taalkeuze (localStorage
 * "gebeden-lang") van de hoofd-app, en wordt geopend via #rosary-open.
 */
export function initRosary({ weekday }) {
  const root = document.getElementById("rosary-root");
  const openBtn = document.getElementById("rosary-open");
  if (!root || !openBtn) return;

  const state = {
    open: false,
    setKey: defaultMysteryKey(weekday),
    steps: [],
    index: 0,
    lang: localStorage.getItem("gebeden-lang") || "both",
  };
  const todayKey = defaultMysteryKey(weekday);

  state.steps = buildRosarySteps(state.setKey);

  /* ---------- Statische opbouw ---------- */
  root.innerHTML = `
    <div class="rosary-overlay" role="dialog" aria-modal="true" aria-label="Rozenkrans bidden">
      <div class="rosary-bar">
        <div class="rosary-brand"><span aria-hidden="true">📿</span> Rozenkrans</div>
        <div class="rosary-lang" role="group" aria-label="Taalkeuze">
          <button class="r-lang-btn" data-lang="nl">NL</button>
          <button class="r-lang-btn" data-lang="la">LA</button>
          <button class="r-lang-btn" data-lang="both">Beide</button>
        </div>
        <button class="rosary-close" type="button" aria-label="Sluiten">✕</button>
      </div>
      <div class="rosary-sets" role="group" aria-label="Keuze van geheimen"></div>
      <div class="rosary-progress"><span class="rosary-progress-bar"></span></div>
      <div class="rosary-stage">
        <article class="rosary-card" tabindex="0" aria-live="polite"></article>
      </div>
      <div class="rosary-controls">
        <button class="rosary-nav prev" type="button">← Vorige</button>
        <span class="rosary-counter"></span>
        <button class="rosary-nav next" type="button">Volgende →</button>
      </div>
    </div>
  `;

  const overlay = root.querySelector(".rosary-overlay");
  const setsWrap = root.querySelector(".rosary-sets");
  const card = root.querySelector(".rosary-card");
  const progressBar = root.querySelector(".rosary-progress-bar");
  const counter = root.querySelector(".rosary-counter");
  const prevBtn = root.querySelector(".rosary-nav.prev");
  const nextBtn = root.querySelector(".rosary-nav.next");
  const closeBtn = root.querySelector(".rosary-close");
  const langBtns = Array.from(root.querySelectorAll(".r-lang-btn"));

  /* Geheimen-keuze chips */
  for (const key of MYSTERY_ORDER) {
    const set = MYSTERY_SETS[key];
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "rosary-set-chip";
    chip.dataset.set = key;
    chip.innerHTML =
      `<span>${set.title_nl}</span>` +
      (key === todayKey ? `<span class="r-today">vandaag</span>` : "");
    chip.addEventListener("click", () => selectSet(key));
    setsWrap.appendChild(chip);
  }

  /* ---------- Rendering ---------- */
  function render() {
    const step = state.steps[state.index];
    const showNl = state.lang === "nl" || state.lang === "both";
    const showLa = state.lang === "la" || state.lang === "both";
    const both = state.lang === "both";

    const parts = [];
    parts.push(`<p class="rosary-kicker">${escape(step.kicker)}</p>`);

    const titleNl = showNl ? step.title_nl : step.title_la;
    parts.push(`<h2 class="rosary-h2">${escape(titleNl)}</h2>`);
    const sub = showNl ? step.title_la : step.title_nl;
    if (sub && sub !== titleNl) {
      parts.push(`<p class="rosary-sub">${escape(sub)}</p>`);
    }

    if (step.beadTotal) {
      parts.push(renderBeads(step.bead, step.beadTotal));
    }

    if (!step.mysteryHeading) {
      parts.push(`<div class="rosary-text-grid${both ? " both" : ""}">`);
      if (showNl) parts.push(textCol("nl", step.text_nl));
      if (showLa) parts.push(textCol("la", step.text_la));
      parts.push(`</div>`);
    }

    card.innerHTML = parts.join("");

    const pct = ((state.index + 1) / state.steps.length) * 100;
    progressBar.style.width = pct.toFixed(1) + "%";
    counter.textContent = `Stap ${state.index + 1} van ${state.steps.length}`;
    prevBtn.disabled = state.index === 0;
    nextBtn.disabled = state.index === state.steps.length - 1;

    langBtns.forEach((b) =>
      b.classList.toggle("is-active", b.dataset.lang === state.lang)
    );
    Array.from(setsWrap.children).forEach((c) =>
      c.classList.toggle("is-active", c.dataset.set === state.setKey)
    );
  }

  function renderBeads(current, total) {
    let dots = "";
    for (let i = 1; i <= total; i++) {
      const cls =
        i < current ? "done" : i === current ? "active" : "todo";
      dots += `<span class="r-bead ${cls}"></span>`;
    }
    return `<div class="rosary-beads" aria-hidden="true">${dots}</div>`;
  }

  function textCol(lang, text) {
    return `<p class="rosary-text ${lang}">${escape(text || "—")}</p>`;
  }

  function escape(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ---------- Acties ---------- */
  function selectSet(key) {
    state.setKey = key;
    state.steps = buildRosarySteps(key);
    state.index = 0;
    render();
  }

  function go(delta) {
    const next = state.index + delta;
    if (next < 0 || next >= state.steps.length) return;
    state.index = next;
    render();
    card.focus({ preventScroll: true });
  }

  function setLang(lang) {
    state.lang = lang;
    localStorage.setItem("gebeden-lang", lang);
    render();
  }

  function open() {
    state.open = true;
    state.lang = localStorage.getItem("gebeden-lang") || state.lang;
    root.hidden = false;
    document.body.classList.add("rosary-open-body");
    render();
    card.focus({ preventScroll: true });
  }

  function close() {
    state.open = false;
    root.hidden = true;
    document.body.classList.remove("rosary-open-body");
    openBtn.focus();
  }

  /* ---------- Koppelingen ---------- */
  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));
  card.addEventListener("click", () => go(1));
  langBtns.forEach((b) =>
    b.addEventListener("click", () => setLang(b.dataset.lang))
  );

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!state.open) return;
    if (e.key === "Escape") return close();
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === " " && (e.target === card || e.target === document.body)) {
      e.preventDefault();
      go(1);
    }
  });
}
