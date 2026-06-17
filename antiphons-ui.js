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

  const state = {
    open: false,
    nowKey: currentAntiphonKey(),
    selectedKey: null,
    lang: localStorage.getItem("gebeden-lang") || "both",
  };
  state.selectedKey = state.nowKey;

  root.innerHTML = `
    <div class="rosary-overlay" role="dialog" aria-modal="true" aria-label="Maria-antifoon">
      <div class="rosary-bar">
        <div class="rosary-brand"><span aria-hidden="true">🌸</span> Maria-antifoon</div>
        <div class="rosary-lang" role="group" aria-label="Taalkeuze">
          <button class="r-lang-btn" data-lang="nl">NL</button>
          <button class="r-lang-btn" data-lang="la">LA</button>
          <button class="r-lang-btn" data-lang="both">Beide</button>
        </div>
        <button class="rosary-close" type="button" aria-label="Sluiten">✕</button>
      </div>
      <div class="rosary-sets" role="group" aria-label="Keuze van antifoon"></div>
      <div class="rosary-stage">
        <article class="rosary-card antiphon-card" aria-live="polite"></article>
      </div>
    </div>
  `;

  const overlay = root.querySelector(".rosary-overlay");
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
