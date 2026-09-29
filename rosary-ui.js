import {
  MYSTERY_SETS,
  MYSTERY_ORDER,
  defaultMysteryKey,
  buildRosarySteps,
} from "./rosary.js";
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
 * Rozenkrans als overlay met twee weergaven:
 *   - "overzicht": de geheimen op een rij (volkstaal en Latijn naast elkaar of één taal)
 *   - "interactief": stap voor stap, kraal voor kraal bidden
 * Volgt de gedeelde taalinstelling uit i18n.js.
 */
export function initRosary() {
  const root = document.getElementById("rosary-root");
  const openBtn = document.getElementById("rosary-open");
  if (!root || !openBtn) return;

  /* "Vandaag" wordt live bepaald, zodat een lang openstaande tab klopt. */
  const currentWeekday = () => new Date().getDay();

  const NAAM = { nl: "Rozenkrans", en: "Rosary", pt: "Terço" };

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
    barOpen: false,
    chipsOpen: !isNarrow(),
  };
  state.setKey = state.todayKey;
  state.steps = buildRosarySteps(state.setKey, getLang());

  /* ---------- Statische opbouw ---------- */
  root.innerHTML = `
    <div class="rosary-overlay" role="dialog" aria-modal="true" aria-label="Rozenkrans bidden">
      <div class="rosary-bar">
        <div class="rosary-brand"><span aria-hidden="true">📿</span> <span class="ov-brand-name"></span></div>
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
  const brandName = root.querySelector(".ov-brand-name");
  const modeGroup = root.querySelector(".rosary-mode");
  const modeBtns = Array.from(root.querySelectorAll(".r-mode-btn"));

  /* Geheimen-keuze chips */
  for (const key of MYSTERY_ORDER) {
    const set = MYSTERY_SETS[key];
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "rosary-set-chip";
    chip.dataset.set = key;
    chip.innerHTML = `<span class="r-chip-label"></span><span class="r-today"></span>`;
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

    const t = common();
    const lang = getLang();
    overlay.setAttribute("aria-label", NAAM[lang]);
    brandName.textContent = NAAM[lang];
    modeGroup.setAttribute("aria-label", t.weergave);
    setsWrap.setAttribute("aria-label", NAAM[lang]);
    closeBtn.setAttribute("aria-label", t.sluiten);
    barToggle.setAttribute("aria-label", t.instellingen);
    prevBtn.setAttribute("aria-label", t.vorige);
    prevBtn.querySelector(".ov-nav-word").textContent = t.vorige;
    nextBtn.setAttribute("aria-label", t.volgende);
    nextBtn.querySelector(".ov-nav-word").textContent = t.volgende;

    foldLabel.textContent = pick(MYSTERY_SETS[state.setKey], "title");
    foldBtn.classList.toggle("is-open", state.chipsOpen);
    foldBtn.setAttribute("aria-expanded", String(state.chipsOpen));
    chipsWrap.classList.toggle("is-collapsed", !state.chipsOpen);
    barControls.classList.toggle("is-open", state.barOpen);
    barToggle.classList.toggle("is-open", state.barOpen);
    barToggle.setAttribute("aria-expanded", String(state.barOpen));
    syncLangControl(root);
    modeBtns.forEach((b) => {
      b.classList.toggle("is-active", b.dataset.mode === state.mode);
      b.textContent = t[b.dataset.mode];
    });
    Array.from(setsWrap.children).forEach((c) => {
      c.querySelector(".r-chip-label").textContent = pick(MYSTERY_SETS[c.dataset.set], "title");
      c.querySelector(".r-today").textContent = t.vandaag;
      c.classList.toggle("is-active", c.dataset.set === state.setKey);
      c.classList.toggle("is-today", c.dataset.set === state.todayKey);
    });
  }

  function renderOverview() {
    const set = MYSTERY_SETS[state.setKey];
    const { cols, both } = columns();
    const sub = subtitleLang(cols, true);

    /* Eerste kolom als hoofdtekst, tweede kolom in de stijl van de ondertitel. */
    const items = set.mysteries
      .map((m, i) => {
        const cells = cols.map(
          (l, ci) =>
            `<p class="${ci ? "rosary-ov-la" : "rosary-ov-nl"}" lang="${l}">${escape(pick(m, "title", l))}</p>`
        );
        return `
          <li class="rosary-ov-item">
            <span class="rosary-ov-num">${i + 1}</span>
            <div class="rosary-ov-grid${both ? " both" : ""}">${cells.join("")}</div>
          </li>`;
      })
      .join("");

    stage.innerHTML = `
      <div class="rosary-overview">
        <header class="rosary-ov-head">
          <p class="rosary-kicker">${escape(pick(set, "days"))}</p>
          <h2 class="rosary-h2" lang="${cols[0]}">${escape(pick(set, "title", cols[0]))}</h2>
          ${sub ? `<p class="rosary-sub" lang="${sub}">${escape(pick(set, "title", sub))}</p>` : ""}
        </header>
        <ol class="rosary-ov-list">${items}</ol>
        <button class="rosary-start" type="button">${escape(common().start)}</button>
      </div>`;

    stage.querySelector(".rosary-start").addEventListener("click", () =>
      setMode("interactief")
    );
  }

  function renderInteractive() {
    const step = state.steps[state.index];
    const { cols } = columns((l) => Boolean(step[`title_${l}`]));

    const parts = [];
    parts.push(`<p class="rosary-kicker">${escape(step.kicker)}</p>`);

    const title = pick(step, "title", cols[0]);
    parts.push(`<h2 class="rosary-h2" lang="${cols[0]}">${escape(title)}</h2>`);
    const subLang = subtitleLang(cols, Boolean(step.title_la));
    const sub = subLang ? pick(step, "title", subLang) : "";
    if (sub && sub !== title) {
      parts.push(`<p class="rosary-sub" lang="${subLang}">${escape(sub)}</p>`);
    }

    if (step.beadTotal) {
      parts.push(renderBeads(step.bead, step.beadTotal));
    }

    if (!step.mysteryHeading) {
      parts.push(
        textGridHTML(
          cols.map((l) => ({ lang: l, text: pick(step, "text", l) })),
          { gridClass: "rosary-text-grid", textClass: "rosary-text" }
        )
      );
    }

    stage.innerHTML = `<article class="rosary-card" tabindex="0" aria-live="polite">${parts.join(
      ""
    )}</article>`;

    const pct = ((state.index + 1) / state.steps.length) * 100;
    progressBar.style.width = pct.toFixed(1) + "%";
    counter.textContent = common().stap(state.index + 1, state.steps.length);
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
    state.steps = buildRosarySteps(key, getLang());
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

  /* Bij een taalwissel blijven reeks en stap staan; alleen de teksten wisselen. */
  function langChanged() {
    state.steps = buildRosarySteps(state.setKey, getLang());
    if (state.open) render();
  }

  function open() {
    state.open = true;
    state.todayKey = defaultMysteryKey(currentWeekday());
    state.setKey = state.todayKey;
    state.steps = buildRosarySteps(state.setKey, getLang());
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
