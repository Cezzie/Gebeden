import {
  ANTIPHON_ORDER,
  getAntiphon,
  currentAntiphonKey,
} from "./antiphons.js";

/*
 * Maria-antifoon als overlay. Opent standaard op de antifoon die nu van
 * toepassing is (op basis van het liturgisch seizoen), maar je kunt vrij
 * tussen de vier wisselen. Hergebruikt de rozenkrans-overlaystijlen en de
 * taalkeuze (localStorage "gebeden-lang").
 */
export function initAntiphons() {
  const root = document.getElementById("antiphon-root");
  const openBtn = document.getElementById("antiphon-open");
  if (!root || !openBtn) return;

  /* Op smalle schermen nemen balk en chips te veel ruimte in; daar starten ze ingeklapt. */
  const isNarrow = () =>
    window.matchMedia && window.matchMedia("(max-width: 880px)").matches;

  const state = {
    open: false,
    nowKey: currentAntiphonKey(),
    selectedKey: null,
    lang: localStorage.getItem("gebeden-lang") || "both",
    barOpen: false,
    chipsOpen: !isNarrow(),
  };
  state.selectedKey = state.nowKey;

  root.innerHTML = `
    <div class="rosary-overlay" role="dialog" aria-modal="true" aria-label="Maria-antifoon">
      <div class="rosary-bar">
        <div class="rosary-brand"><span aria-hidden="true">🌸</span> Maria-antifoon</div>
        <div class="ov-bar-controls">
          <div class="rosary-lang" role="group" aria-label="Taalkeuze">
            <button class="r-lang-btn" data-lang="nl">NL</button>
            <button class="r-lang-btn" data-lang="la">LA</button>
            <button class="r-lang-btn" data-lang="both">Beide</button>
          </div>
        </div>
        <button class="ov-bar-toggle" type="button" aria-expanded="false" aria-label="Taalkeuze">
          <span class="ov-bar-chevron" aria-hidden="true">›</span>
        </button>
        <button class="rosary-close" type="button" aria-label="Sluiten">✕</button>
      </div>
      <button class="ov-fold" type="button" aria-expanded="true">
        <span class="ov-fold-chevron" aria-hidden="true">›</span>
        <span class="ov-fold-label"></span>
      </button>
      <div class="ov-chips">
        <div class="rosary-sets" role="group" aria-label="Keuze van antifoon"></div>
      </div>
      <div class="rosary-stage">
        <article class="rosary-card antiphon-card" aria-live="polite"></article>
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
  const card = root.querySelector(".antiphon-card");
  const closeBtn = root.querySelector(".rosary-close");
  const langBtns = Array.from(root.querySelectorAll(".r-lang-btn"));

  for (const key of ANTIPHON_ORDER) {
    const a = getAntiphon(key);
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "rosary-set-chip";
    chip.dataset.antiphon = key;
    chip.innerHTML = `<span>${escape(a.label)}</span><span class="r-today">nu</span>`;
    chip.addEventListener("click", () => select(key));
    setsWrap.appendChild(chip);
  }

  /* ---------- Rendering ---------- */
  function render() {
    const a = getAntiphon(state.selectedKey);
    const showNl = state.lang === "nl" || state.lang === "both";
    const showLa = state.lang === "la" || state.lang === "both";
    const both = state.lang === "both";

    const parts = [];
    parts.push(`<p class="rosary-kicker">${escape(a.period_nl)}</p>`);

    const titleNl = showNl ? a.title_nl : a.title_la;
    parts.push(`<h2 class="rosary-h2">${escape(titleNl)}</h2>`);
    const sub = showNl ? a.title_la : a.title_nl;
    if (sub && sub !== titleNl) {
      parts.push(`<p class="rosary-sub">${escape(sub)}</p>`);
    }

    parts.push(`<div class="rosary-text-grid${both ? " both" : ""}">`);
    if (showNl) parts.push(`<p class="rosary-text nl">${escape(a.text_nl)}</p>`);
    if (showLa) parts.push(`<p class="rosary-text la">${escape(a.text_la)}</p>`);
    parts.push(`</div>`);

    card.innerHTML = parts.join("");

    foldLabel.textContent = a.label;
    foldBtn.classList.toggle("is-open", state.chipsOpen);
    foldBtn.setAttribute("aria-expanded", String(state.chipsOpen));
    chipsWrap.classList.toggle("is-collapsed", !state.chipsOpen);
    barControls.classList.toggle("is-open", state.barOpen);
    barToggle.classList.toggle("is-open", state.barOpen);
    barToggle.setAttribute("aria-expanded", String(state.barOpen));
    langBtns.forEach((b) =>
      b.classList.toggle("is-active", b.dataset.lang === state.lang)
    );
    Array.from(setsWrap.children).forEach((c) => {
      c.classList.toggle("is-active", c.dataset.antiphon === state.selectedKey);
      c.classList.toggle("is-today", c.dataset.antiphon === state.nowKey);
    });
  }

  function escape(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ---------- Acties ---------- */
  function select(key) {
    state.selectedKey = key;
    /* Na een keuze op een smal scherm klappen de chips weer in. */
    if (isNarrow()) state.chipsOpen = false;
    render();
  }

  function toggleChips() {
    state.chipsOpen = !state.chipsOpen;
    render();
  }

  function toggleBar() {
    state.barOpen = !state.barOpen;
    render();
  }

  function setLang(lang) {
    state.lang = lang;
    localStorage.setItem("gebeden-lang", lang);
    render();
  }

  function open() {
    state.open = true;
    state.lang = localStorage.getItem("gebeden-lang") || state.lang;
    state.nowKey = currentAntiphonKey();
    state.selectedKey = state.nowKey;
    root.hidden = false;
    document.body.classList.add("rosary-open-body");
    render();
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
  langBtns.forEach((b) =>
    b.addEventListener("click", () => setLang(b.dataset.lang))
  );
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (state.open && e.key === "Escape") close();
  });
}
