import { MIS, EG, EG_ORDER, buildMisSteps, buildMisText } from "./mis.js";
import {
  getLang,
  columns,
  subtitleLang,
  pick,
  common,
  langControlHTML,
  bindLangControl,
  syncLangControl,
  onLangChange,
} from "./i18n.js";
import { textGridHTML } from "./textgrid.js";

/*
 * De zondagsmis als overlay, naar het voorbeeld van de rozenkrans:
 *   - "doorlopend": de hele mis als één scrollbare tekst, om mee te lezen
 *   - "interactief": stap voor stap door de onderdelen
 * Met chips om het eucharistisch gebed te kiezen (onthouden in
 * localStorage "gebeden-mis-eg"). Volgt de gedeelde taalinstelling.
 */
export function initMis() {
  const root = document.getElementById("mis-root");
  const openBtn = document.getElementById("mis-open");
  if (!root || !openBtn) return;

  /* Op smalle schermen nemen balk en chips te veel ruimte in; daar starten ze ingeklapt. */
  const isNarrow = () =>
    window.matchMedia && window.matchMedia("(max-width: 880px)").matches;

  const UI = {
    nl: { doorlopend: "Doorlopend", keuze: "Eucharistisch gebed" },
    en: { doorlopend: "Continuous", keuze: "Eucharistic Prayer" },
    pt: { doorlopend: "Seguido", keuze: "Oração Eucarística" },
  };
  const ui = () => UI[getLang()];

  let storedEg = null;
  try {
    storedEg = localStorage.getItem("gebeden-mis-eg");
  } catch {
    /* zonder opslag gewoon de eerste keuze */
  }

  const state = {
    open: false,
    mode: "doorlopend",
    egKey: EG[storedEg] ? storedEg : EG_ORDER[0],
    steps: [],
    index: 0,
    barOpen: false,
    chipsOpen: !isNarrow(),
  };
  state.steps = buildMisSteps(state.egKey);

  /* ---------- Statische opbouw ---------- */
  root.innerHTML = `
    <div class="rosary-overlay" role="dialog" aria-modal="true">
      <div class="rosary-bar">
        <div class="rosary-brand"><span aria-hidden="true">⛪</span> <span class="ov-brand-name"></span></div>
        <div class="ov-bar-controls">
          <div class="rosary-mode" role="group">
            <button class="r-mode-btn" data-mode="doorlopend"></button>
            <button class="r-mode-btn" data-mode="interactief"></button>
          </div>
          ${langControlHTML({ groupClass: "lang-pair-overlay" })}
        </div>
        <button class="ov-bar-toggle" type="button" aria-expanded="false">
          <span class="ov-bar-chevron" aria-hidden="true">›</span>
        </button>
        <button class="rosary-close" type="button">✕</button>
      </div>
      <button class="ov-fold" type="button" aria-expanded="true">
        <span class="ov-fold-chevron" aria-hidden="true">›</span>
        <span class="ov-fold-label"></span>
      </button>
      <div class="ov-chips">
        <div class="rosary-sets" role="group"></div>
      </div>
      <div class="rosary-progress"><span class="rosary-progress-bar"></span></div>
      <div class="rosary-stage"></div>
      <div class="rosary-controls">
        <button class="rosary-nav prev" type="button"><span aria-hidden="true">←</span><span class="ov-nav-word"></span></button>
        <span class="rosary-counter"></span>
        <button class="rosary-nav next" type="button"><span class="ov-nav-word"></span><span aria-hidden="true">→</span></button>
      </div>
    </div>
  `;

  const overlay = root.querySelector(".rosary-overlay");
  const brandName = root.querySelector(".ov-brand-name");
  const barControls = root.querySelector(".ov-bar-controls");
  const barToggle = root.querySelector(".ov-bar-toggle");
  const modeGroup = root.querySelector(".rosary-mode");
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
  const modeBtns = Array.from(root.querySelectorAll(".r-mode-btn"));

  /* Chips voor het eucharistisch gebed */
  for (const key of EG_ORDER) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "rosary-set-chip";
    chip.dataset.eg = key;
    chip.innerHTML = `<span class="r-chip-label"></span>`;
    chip.addEventListener("click", () => selectEg(key));
    setsWrap.appendChild(chip);
  }

  /* ---------- Rendering ---------- */
  function render() {
    const interactive = state.mode === "interactief";
    progress.hidden = !interactive;
    controls.hidden = !interactive;

    if (interactive) renderInteractive();
    else renderContinuous();

    const t = common();
    const lang = getLang();
    const name = pick(MIS, "title");
    overlay.setAttribute("aria-label", name);
    brandName.textContent = name;
    modeGroup.setAttribute("aria-label", t.weergave);
    setsWrap.setAttribute("aria-label", ui().keuze);
    closeBtn.setAttribute("aria-label", t.sluiten);
    barToggle.setAttribute("aria-label", t.instellingen);
    prevBtn.setAttribute("aria-label", t.vorige);
    prevBtn.querySelector(".ov-nav-word").textContent = t.vorige;
    nextBtn.setAttribute("aria-label", t.volgende);
    nextBtn.querySelector(".ov-nav-word").textContent = t.volgende;

    foldLabel.textContent = EG[state.egKey].label[lang];
    foldBtn.classList.toggle("is-open", state.chipsOpen);
    foldBtn.setAttribute("aria-expanded", String(state.chipsOpen));
    chipsWrap.classList.toggle("is-collapsed", !state.chipsOpen);
    barControls.classList.toggle("is-open", state.barOpen);
    barToggle.classList.toggle("is-open", state.barOpen);
    barToggle.setAttribute("aria-expanded", String(state.barOpen));
    syncLangControl(root);
    modeBtns.forEach((b) => {
      b.classList.toggle("is-active", b.dataset.mode === state.mode);
      b.textContent = b.dataset.mode === "doorlopend" ? ui().doorlopend : t.interactief;
    });
    Array.from(setsWrap.children).forEach((c) => {
      c.querySelector(".r-chip-label").textContent = EG[c.dataset.eg].label[lang];
      c.classList.toggle("is-active", c.dataset.eg === state.egKey);
    });
  }

  function renderContinuous() {
    const text = buildMisText(state.egKey);
    const { cols, both } = columns((l) => Boolean(text[l]));
    const sub = subtitleLang(cols, true);

    stage.innerHTML = `
      <article class="rosary-card mis-card" aria-live="polite">
        <header class="rosary-ov-head">
          <p class="rosary-kicker">${escape(pick(MIS, "subtitle"))}</p>
          <h2 class="rosary-h2" lang="${cols[0]}">${escape(pick(MIS, "title", cols[0]))}</h2>
          ${sub ? `<p class="rosary-sub" lang="${sub}">${escape(pick(MIS, "title", sub))}</p>` : ""}
        </header>
        <p class="novena-intro">${escape(pick(MIS, "intro"))}</p>
        ${textGridHTML(
          cols.map((l) => ({ lang: l, text: text[l] })),
          { gridClass: "rosary-text-grid", textClass: "rosary-text" }
        )}
      </article>`;
  }

  function renderInteractive() {
    const step = state.steps[state.index];
    const { cols } = columns((l) => Boolean(step[`text_${l}`]));

    const parts = [];
    parts.push(`<p class="rosary-kicker">${escape(pick(step, "kicker"))}</p>`);
    const title = pick(step, "title", cols[0]);
    parts.push(`<h2 class="rosary-h2" lang="${cols[0]}">${escape(title)}</h2>`);
    const subLang = subtitleLang(cols, true);
    const sub = subLang ? pick(step, "title", subLang) : "";
    if (sub && sub !== title) {
      parts.push(`<p class="rosary-sub" lang="${subLang}">${escape(sub)}</p>`);
    }
    parts.push(
      textGridHTML(
        cols.map((l) => ({ lang: l, text: pick(step, "text", l) })),
        { gridClass: "rosary-text-grid", textClass: "rosary-text" }
      )
    );

    stage.innerHTML = `<article class="rosary-card" tabindex="0" aria-live="polite">${parts.join(
      ""
    )}</article>`;

    const pct = ((state.index + 1) / state.steps.length) * 100;
    progressBar.style.width = pct.toFixed(1) + "%";
    counter.textContent = common().stap(state.index + 1, state.steps.length);
    prevBtn.disabled = state.index === 0;
    nextBtn.disabled = state.index === state.steps.length - 1;
  }

  function escape(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function focusCard() {
    const card = stage.querySelector(".rosary-card");
    if (card && card.tabIndex >= 0) card.focus({ preventScroll: true });
  }

  /* ---------- Acties ---------- */
  function selectEg(key) {
    state.egKey = key;
    try {
      localStorage.setItem("gebeden-mis-eg", key);
    } catch {
      /* geen opslag: de keuze geldt tot het sluiten */
    }
    state.steps = buildMisSteps(key);
    /* Na een keuze op een smal scherm klappen de chips weer in. */
    if (isNarrow()) state.chipsOpen = false;
    const top = stage.scrollTop;
    render();
    /* In de doorlopende tekst blijft de leespositie ongeveer staan. */
    stage.scrollTop = state.mode === "doorlopend" ? top : 0;
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

  /* Bij een taalwissel blijft de stap staan; alleen de teksten wisselen. */
  function langChanged() {
    if (state.open) {
      const top = stage.scrollTop;
      render();
      if (state.mode === "doorlopend") stage.scrollTop = top;
    }
  }

  function open() {
    state.open = true;
    state.steps = buildMisSteps(state.egKey);
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
  bindLangControl(root);
  onLangChange(langChanged);
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
