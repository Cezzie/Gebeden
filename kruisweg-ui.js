import { KRUISWEG, STATIONS, buildKruiswegSteps } from "./kruisweg.js";
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
 * Kruisweg als overlay, naar het voorbeeld van de rozenkrans:
 *   - "overzicht": de veertien staties op een rij
 *   - "interactief": statie voor statie bidden, met veertien stipjes
 * Volgt de gedeelde taalinstelling uit i18n.js. Het Latijn staat alleen
 * waar een authentieke Latijnse tekst bestaat; anders valt de stap terug
 * op de volkstaal.
 */
export function initKruisweg() {
  const root = document.getElementById("kruisweg-root");
  const openBtn = document.getElementById("kruisweg-open");
  if (!root || !openBtn) return;

  const state = {
    open: false,
    mode: "overzicht",
    steps: buildKruiswegSteps(getLang()),
    index: 0,
    barOpen: false,
  };

  /* ---------- Statische opbouw ---------- */
  root.innerHTML = `
    <div class="rosary-overlay" role="dialog" aria-modal="true">
      <div class="rosary-bar">
        <div class="rosary-brand"><span aria-hidden="true">✝️</span> <span class="ov-brand-name"></span></div>
        <div class="ov-bar-controls">
          <div class="rosary-mode" role="group">
            <button class="r-mode-btn" data-mode="overzicht"></button>
            <button class="r-mode-btn" data-mode="interactief"></button>
          </div>
          ${langControlHTML({ groupClass: "lang-pair-overlay" })}
        </div>
        <button class="ov-bar-toggle" type="button" aria-expanded="false">
          <span class="ov-bar-chevron" aria-hidden="true">›</span>
        </button>
        <button class="rosary-close" type="button">✕</button>
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
  const stage = root.querySelector(".rosary-stage");
  const progress = root.querySelector(".rosary-progress");
  const progressBar = root.querySelector(".rosary-progress-bar");
  const controls = root.querySelector(".rosary-controls");
  const counter = root.querySelector(".rosary-counter");
  const prevBtn = root.querySelector(".rosary-nav.prev");
  const nextBtn = root.querySelector(".rosary-nav.next");
  const closeBtn = root.querySelector(".rosary-close");
  const modeBtns = Array.from(root.querySelectorAll(".r-mode-btn"));

  /* ---------- Rendering ---------- */
  function render() {
    const interactive = state.mode === "interactief";
    progress.hidden = !interactive;
    controls.hidden = !interactive;

    if (interactive) renderInteractive();
    else renderOverview();

    const t = common();
    const name = pick(KRUISWEG, "title");
    overlay.setAttribute("aria-label", name);
    brandName.textContent = name;
    modeGroup.setAttribute("aria-label", t.weergave);
    closeBtn.setAttribute("aria-label", t.sluiten);
    barToggle.setAttribute("aria-label", t.instellingen);
    prevBtn.setAttribute("aria-label", t.vorige);
    prevBtn.querySelector(".ov-nav-word").textContent = t.vorige;
    nextBtn.setAttribute("aria-label", t.volgende);
    nextBtn.querySelector(".ov-nav-word").textContent = t.volgende;

    barControls.classList.toggle("is-open", state.barOpen);
    barToggle.classList.toggle("is-open", state.barOpen);
    barToggle.setAttribute("aria-expanded", String(state.barOpen));
    syncLangControl(root);
    modeBtns.forEach((b) => {
      b.classList.toggle("is-active", b.dataset.mode === state.mode);
      b.textContent = t[b.dataset.mode];
    });
  }

  function renderOverview() {
    const { cols, both } = columns();
    const sub = subtitleLang(cols, true);

    /* Eerste kolom als hoofdtekst, tweede kolom in de stijl van de ondertitel. */
    const items = STATIONS.map((s) => {
      const cells = cols.map(
        (l, ci) =>
          `<p class="${ci ? "rosary-ov-la" : "rosary-ov-nl"}" lang="${l}">${escape(pick(s, "title", l))}</p>`
      );
      return `
        <li class="rosary-ov-item">
          <span class="rosary-ov-num kw-num">${roman(s.n)}</span>
          <div class="rosary-ov-grid${both ? " both" : ""}">${cells.join("")}</div>
        </li>`;
    }).join("");

    stage.innerHTML = `
      <div class="rosary-overview">
        <header class="rosary-ov-head">
          <p class="rosary-kicker">${escape(pick(KRUISWEG, "subtitle"))}</p>
          <h2 class="rosary-h2" lang="${cols[0]}">${escape(pick(KRUISWEG, "title", cols[0]))}</h2>
          ${sub ? `<p class="rosary-sub" lang="${sub}">${escape(pick(KRUISWEG, "title", sub))}</p>` : ""}
        </header>
        <p class="novena-intro">${escape(pick(KRUISWEG, "intro"))}</p>
        <ol class="rosary-ov-list">${items}</ol>
        <button class="rosary-start" type="button">${escape(common().start)}</button>
      </div>`;

    stage.querySelector(".rosary-start").addEventListener("click", () =>
      setMode("interactief")
    );
  }

  function renderInteractive() {
    const step = state.steps[state.index];
    const { cols } = columns((l) => Boolean(step[`text_${l}`]));

    const parts = [];
    parts.push(`<p class="rosary-kicker">${escape(step.kicker)}</p>`);

    /* Stappen zonder Latijnse titel (het voorbereidingsgebed) houden de kop in de volkstaal. */
    const headLang = pick(step, "title", cols[0]) ? cols[0] : getLang();
    const title = pick(step, "title", headLang);
    parts.push(`<h2 class="rosary-h2" lang="${headLang}">${escape(title)}</h2>`);
    const subLang = subtitleLang(cols, Boolean(step.title_la));
    const sub = subLang ? pick(step, "title", subLang) : "";
    if (sub && sub !== title) {
      parts.push(`<p class="rosary-sub" lang="${subLang}">${escape(sub)}</p>`);
    }

    if (step.station) {
      parts.push(renderStations(step.station, STATIONS.length));
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

  /* Veertien stipjes: gebeden staties, de huidige, de nog komende. */
  function renderStations(current, total) {
    let dots = "";
    for (let i = 1; i <= total; i++) {
      const cls = i < current ? "done" : i === current ? "active" : "todo";
      dots += `<span class="r-bead ${cls}"></span>`;
    }
    return `<div class="rosary-beads" aria-hidden="true">${dots}</div>`;
  }

  function roman(n) {
    const map = [
      [10, "X"],
      [9, "IX"],
      [5, "V"],
      [4, "IV"],
      [1, "I"],
    ];
    let out = "";
    for (const [v, r] of map) {
      while (n >= v) {
        out += r;
        n -= v;
      }
    }
    return out;
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

  /* Bij een taalwissel blijft de statie staan; alleen de teksten wisselen. */
  function langChanged() {
    state.steps = buildKruiswegSteps(getLang());
    if (state.open) render();
  }

  function open() {
    state.open = true;
    state.steps = buildKruiswegSteps(getLang());
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
