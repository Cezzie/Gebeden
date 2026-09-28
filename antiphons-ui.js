import {
  ANTIPHON_ORDER,
  getAntiphon,
  currentAntiphonKey,
} from "./antiphons.js";
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

/*
 * Maria-antifoon als overlay. Opent standaard op de antifoon die nu van
 * toepassing is (op basis van het liturgisch seizoen), maar je kunt vrij
 * tussen de vier wisselen. Hergebruikt de rozenkrans-overlaystijlen en volgt
 * de gedeelde taalinstelling uit i18n.js.
 */
export function initAntiphons() {
  const root = document.getElementById("antiphon-root");
  const openBtn = document.getElementById("antiphon-open");
  if (!root || !openBtn) return;

  const NAAM = { nl: "Maria-antifoon", en: "Marian antiphon", pt: "Antífona mariana" };

  /* Op smalle schermen nemen balk en chips te veel ruimte in; daar starten ze ingeklapt. */
  const isNarrow = () =>
    window.matchMedia && window.matchMedia("(max-width: 880px)").matches;

  const state = {
    open: false,
    nowKey: currentAntiphonKey(),
    selectedKey: null,
    barOpen: false,
    chipsOpen: !isNarrow(),
  };
  state.selectedKey = state.nowKey;

  root.innerHTML = `
    <div class="rosary-overlay" role="dialog" aria-modal="true" aria-label="Maria-antifoon">
      <div class="rosary-bar">
        <div class="rosary-brand"><span aria-hidden="true">🌸</span> <span class="ov-brand-name"></span></div>
        <div class="ov-bar-controls">
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
  const stage = root.querySelector(".rosary-stage");
  const card = root.querySelector(".antiphon-card");
  const closeBtn = root.querySelector(".rosary-close");
  const brandName = root.querySelector(".ov-brand-name");

  for (const key of ANTIPHON_ORDER) {
    const a = getAntiphon(key);
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "rosary-set-chip";
    chip.dataset.antiphon = key;
    chip.innerHTML = `<span lang="la">${escape(a.label)}</span><span class="r-today"></span>`;
    chip.addEventListener("click", () => select(key));
    setsWrap.appendChild(chip);
  }

  /* ---------- Rendering ---------- */
  function render() {
    const a = getAntiphon(state.selectedKey);
    const { cols, both } = columns();
    const lang = getLang();
    const t = common();

    const parts = [];
    parts.push(`<p class="rosary-kicker">${escape(pick(a, "period"))}</p>`);

    const title = pick(a, "title", cols[0]);
    parts.push(`<h2 class="rosary-h2" lang="${cols[0]}">${escape(title)}</h2>`);
    const subLang = subtitleLang(cols, true);
    const sub = subLang ? pick(a, "title", subLang) : "";
    if (sub && sub !== title) {
      parts.push(`<p class="rosary-sub" lang="${subLang}">${escape(sub)}</p>`);
    }

    parts.push(`<div class="rosary-text-grid${both ? " both" : ""}">`);
    for (const l of cols) {
      parts.push(`<p class="rosary-text ${l}" lang="${l}">${escape(pick(a, "text", l))}</p>`);
    }
    parts.push(`</div>`);

    card.innerHTML = parts.join("");

    overlay.setAttribute("aria-label", NAAM[lang]);
    brandName.textContent = NAAM[lang];
    setsWrap.setAttribute("aria-label", NAAM[lang]);
    closeBtn.setAttribute("aria-label", t.sluiten);
    barToggle.setAttribute("aria-label", t.taalkeuze);

    foldLabel.textContent = a.label;
    foldBtn.classList.toggle("is-open", state.chipsOpen);
    foldBtn.setAttribute("aria-expanded", String(state.chipsOpen));
    chipsWrap.classList.toggle("is-collapsed", !state.chipsOpen);
    barControls.classList.toggle("is-open", state.barOpen);
    barToggle.classList.toggle("is-open", state.barOpen);
    barToggle.setAttribute("aria-expanded", String(state.barOpen));
    syncLangControl(root);
    Array.from(setsWrap.children).forEach((c) => {
      c.querySelector(".r-today").textContent = t.nu;
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
    stage.scrollTop = 0;
  }

  function toggleChips() {
    state.chipsOpen = !state.chipsOpen;
    render();
  }

  function toggleBar() {
    state.barOpen = !state.barOpen;
    render();
  }

  function langChanged() {
    if (state.open) render();
  }

  function open() {
    state.open = true;
    state.nowKey = currentAntiphonKey();
    state.selectedKey = state.nowKey;
    root.hidden = false;
    document.body.classList.add("rosary-open-body");
    render();
    stage.scrollTop = 0;
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
  bindLangControl(root);
  onLangChange(langChanged);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (state.open && e.key === "Escape") close();
  });
}
