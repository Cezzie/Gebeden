import {
  MYSTERY_SETS,
  MYSTERY_ORDER,
  defaultMysteryKey,
  buildRosarySteps,
} from "./rosary.js";

/*
 * Rozenkrans als overlay met twee weergaven:
 *   - "overzicht": de geheimen op een rij (NL/Latijn naast elkaar of één taal)
 *   - "interactief": stap voor stap, kraal voor kraal bidden
 * Hergebruikt de taalkeuze (localStorage "gebeden-lang") van de hoofd-app.
 */
export function initRosary() {
  const root = document.getElementById("rosary-root");
  const openBtn = document.getElementById("rosary-open");
  if (!root || !openBtn) return;

  /* "Vandaag" wordt live bepaald, zodat een lang openstaande tab klopt. */
  const currentWeekday = () => new Date().getDay();

  /* Op smalle schermen nemen balk en chips te veel ruimte in; daar starten ze ingeklapt. */
  const isNarrow = () =>
    window.matchMedia && window.matchMedia("(max-width: 880px)").matches;

  const state = {
    open: false,
    mode: "overzicht",
    todayKey: defaultMysteryKey(currentWeekday()),
    setKey: null,
    steps: [],
    index: 0,
    lang: localStorage.getItem("gebeden-lang") || "both",
    barOpen: false,
    chipsOpen: !isNarrow(),
  };
  state.setKey = state.todayKey;
  state.steps = buildRosarySteps(state.setKey);

  /* ---------- Statische opbouw ---------- */
  root.innerHTML = `
    <div class="rosary-overlay" role="dialog" aria-modal="true" aria-label="Rozenkrans bidden">
      <div class="rosary-bar">
        <div class="rosary-brand"><span aria-hidden="true">📿</span> Rozenkrans</div>
        <div class="ov-bar-controls">
          <div class="rosary-mode" role="group" aria-label="Weergave">
            <button class="r-mode-btn" data-mode="overzicht">Overzicht</button>
            <button class="r-mode-btn" data-mode="interactief">Stap voor stap</button>
          </div>
          <div class="rosary-lang" role="group" aria-label="Taalkeuze">
            <button class="r-lang-btn" data-lang="nl">NL</button>
            <button class="r-lang-btn" data-lang="la">LA</button>
            <button class="r-lang-btn" data-lang="both">Beide</button>
          </div>
        </div>
        <button class="ov-bar-toggle" type="button" aria-expanded="false" aria-label="Weergave en taal">
          <span class="ov-bar-chevron" aria-hidden="true">›</span>
        </button>
        <button class="rosary-close" type="button" aria-label="Sluiten">✕</button>
      </div>
      <button class="ov-fold" type="button" aria-expanded="true">
        <span class="ov-fold-chevron" aria-hidden="true">›</span>
        <span class="ov-fold-label"></span>
      </button>
      <div class="ov-chips">
        <div class="rosary-sets" role="group" aria-label="Keuze van geheimen"></div>
      </div>
      <div class="rosary-progress"><span class="rosary-progress-bar"></span></div>
      <div class="rosary-stage"></div>
      <div class="rosary-controls">
        <button class="rosary-nav prev" type="button" aria-label="Vorige"><span aria-hidden="true">←</span><span class="ov-nav-word">Vorige</span></button>
        <span class="rosary-counter"></span>
        <button class="rosary-nav next" type="button" aria-label="Volgende"><span class="ov-nav-word">Volgende</span><span aria-hidden="true">→</span></button>
      </div>
    </div>
  `;

  const overlay = root.querySelector(".rosary-overlay");
  const barControls = root.querySelector(".ov-bar-controls");
  const barToggle = root.querySelector(".ov-bar-toggle");
  const foldBtn = root.querySelector(".ov-fold");
  const foldLabel = root.querySelector(".ov-fold-label");
  const chipsWrap = root.querySelector(".ov-chips");
  const setsWrap = root.querySelector(".rosary-sets");
  const stage = root.querySelector(".rosary-stage");
  const progress = root.querySelector(".rosary-progress");
  const progressBar = root.querySelector(".rosary-progress-bar");
  const controls = root.querySelector(".rosary-controls");
  const counter = root.querySelector(".rosary-counter");
  const prevBtn = root.querySelector(".rosary-nav.prev");
  const nextBtn = root.querySelector(".rosary-nav.next");
  const closeBtn = root.querySelector(".rosary-close");
  const langBtns = Array.from(root.querySelectorAll(".r-lang-btn"));
  const modeBtns = Array.from(root.querySelectorAll(".r-mode-btn"));

  /* Geheimen-keuze chips */
  for (const key of MYSTERY_ORDER) {
    const set = MYSTERY_SETS[key];
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "rosary-set-chip";
    chip.dataset.set = key;
    chip.innerHTML =
      `<span>${set.title_nl}</span><span class="r-today">vandaag</span>`;
    chip.addEventListener("click", () => selectSet(key));
    setsWrap.appendChild(chip);
  }

  /* ---------- Rendering ---------- */
  function render() {
    const interactive = state.mode === "interactief";
    progress.hidden = !interactive;
    controls.hidden = !interactive;

    if (interactive) renderInteractive();
    else renderOverview();

    foldLabel.textContent = MYSTERY_SETS[state.setKey].title_nl;
    foldBtn.classList.toggle("is-open", state.chipsOpen);
    foldBtn.setAttribute("aria-expanded", String(state.chipsOpen));
    chipsWrap.classList.toggle("is-collapsed", !state.chipsOpen);
    barControls.classList.toggle("is-open", state.barOpen);
    barToggle.classList.toggle("is-open", state.barOpen);
    barToggle.setAttribute("aria-expanded", String(state.barOpen));
    langBtns.forEach((b) =>
      b.classList.toggle("is-active", b.dataset.lang === state.lang)
    );
    modeBtns.forEach((b) =>
      b.classList.toggle("is-active", b.dataset.mode === state.mode)
    );
    Array.from(setsWrap.children).forEach((c) => {
      c.classList.toggle("is-active", c.dataset.set === state.setKey);
      c.classList.toggle("is-today", c.dataset.set === state.todayKey);
    });
  }

  function langFlags() {
    return {
      showNl: state.lang === "nl" || state.lang === "both",
      showLa: state.lang === "la" || state.lang === "both",
      both: state.lang === "both",
    };
  }

  function renderOverview() {
    const set = MYSTERY_SETS[state.setKey];
    const { showNl, showLa, both } = langFlags();

    const items = set.mysteries
      .map((m, i) => {
        const cols = [];
        if (showNl) cols.push(`<p class="rosary-ov-nl">${escape(m.title_nl)}</p>`);
        if (showLa) cols.push(`<p class="rosary-ov-la">${escape(m.title_la)}</p>`);
        return `
          <li class="rosary-ov-item">
            <span class="rosary-ov-num">${i + 1}</span>
            <div class="rosary-ov-grid${both ? " both" : ""}">${cols.join("")}</div>
          </li>`;
      })
      .join("");

    stage.innerHTML = `
      <div class="rosary-overview">
        <header class="rosary-ov-head">
          <p class="rosary-kicker">${escape(set.days_nl)}</p>
          <h2 class="rosary-h2">${escape(set.title_nl)}</h2>
          <p class="rosary-sub">${escape(set.title_la)}</p>
        </header>
        <ol class="rosary-ov-list">${items}</ol>
        <button class="rosary-start" type="button">Stap voor stap bidden →</button>
      </div>`;

    stage.querySelector(".rosary-start").addEventListener("click", () =>
      setMode("interactief")
    );
  }

  function renderInteractive() {
    const step = state.steps[state.index];
    const { showNl, showLa, both } = langFlags();

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

    stage.innerHTML = `<article class="rosary-card" tabindex="0" aria-live="polite">${parts.join(
      ""
    )}</article>`;

    const pct = ((state.index + 1) / state.steps.length) * 100;
    progressBar.style.width = pct.toFixed(1) + "%";
    counter.textContent = `Stap ${state.index + 1} van ${state.steps.length}`;
    prevBtn.disabled = state.index === 0;
    nextBtn.disabled = state.index === state.steps.length - 1;
  }

  function renderBeads(current, total) {
    let dots = "";
    for (let i = 1; i <= total; i++) {
      const cls = i < current ? "done" : i === current ? "active" : "todo";
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

  function focusCard() {
    const card = stage.querySelector(".rosary-card");
    if (card) card.focus({ preventScroll: true });
  }

  /* ---------- Acties ---------- */
  function selectSet(key) {
    state.setKey = key;
    state.steps = buildRosarySteps(key);
    state.index = 0;
    /* Na een keuze op een smal scherm klappen de chips weer in. */
    if (isNarrow()) state.chipsOpen = false;
    render();
    stage.scrollTop = 0;
    if (state.mode === "interactief") focusCard();
  }

  function toggleChips() {
    state.chipsOpen = !state.chipsOpen;
    render();
  }

  function toggleBar() {
    state.barOpen = !state.barOpen;
    render();
  }

  function setMode(mode) {
    state.mode = mode;
    if (mode === "interactief") state.index = 0;
    render();
    stage.scrollTop = 0;
    if (mode === "interactief") focusCard();
  }

  function go(delta) {
    const next = state.index + delta;
    if (next < 0 || next >= state.steps.length) return;
    state.index = next;
    renderInteractive();
    stage.scrollTop = 0;
    focusCard();
  }

  function setLang(lang) {
    state.lang = lang;
    localStorage.setItem("gebeden-lang", lang);
    render();
  }

  function open() {
    state.open = true;
    state.lang = localStorage.getItem("gebeden-lang") || state.lang;
    state.todayKey = defaultMysteryKey(currentWeekday());
    state.setKey = state.todayKey;
    state.steps = buildRosarySteps(state.setKey);
    state.index = 0;
    root.hidden = false;
    document.body.classList.add("rosary-open-body");
    render();
    stage.scrollTop = 0;
    if (state.mode === "interactief") focusCard();
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
  foldBtn.addEventListener("click", toggleChips);
  barToggle.addEventListener("click", toggleBar);
  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));
  langBtns.forEach((b) =>
    b.addEventListener("click", () => setLang(b.dataset.lang))
  );
  modeBtns.forEach((b) =>
    b.addEventListener("click", () => setMode(b.dataset.mode))
  );

  stage.addEventListener("click", (e) => {
    if (state.mode !== "interactief") return;
    if (e.target.closest("button, a")) return;
    go(1);
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!state.open) return;
    if (e.key === "Escape") return close();
    if (state.mode !== "interactief") return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === " " && (e.target === document.body || e.target.closest(".rosary-card"))) {
      e.preventDefault();
      go(1);
    }
  });
}
