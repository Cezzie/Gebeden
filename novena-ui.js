import {
  NOVENA_ORDER,
  getNovena,
  novenaDayDate,
  novenaDayInfo,
  buildNovenaSteps,
} from "./novena.js";
import {
  getLang,
  columns,
  subtitleLang,
  pick,
  langLabel,
  langControlHTML,
  bindLangControl,
  syncLangControl,
  onLangChange,
} from "./i18n.js";

/*
 * Novena als overlay met twee weergaven, naar het voorbeeld van de rozenkrans:
 *   - "overzicht": de negen dagen met hun thema en datum
 *   - "interactief": stap voor stap bidden, met negen stipjes voor de dagen
 * Taalkeuze: de gedeelde talen links en rechts uit i18n.js. Latijn staat er
 * alleen waar een authentieke Latijnse tekst bestaat; een noveen zonder de
 * gekozen taal valt terug op het Nederlands.
 */
export function initNovena() {
  const root = document.getElementById("novena-root");
  const openBtn = document.getElementById("novena-open");
  if (!root || !openBtn) return;

  /* "Vandaag" wordt live bepaald, zodat een lang openstaande tab klopt. */
  const dayInfo = () => novenaDayInfo(getNovena(state.novenaKey));

  /* Op smalle schermen nemen de chips te veel ruimte in; daar starten ze ingeklapt. */
  const isNarrow = () =>
    window.matchMedia && window.matchMedia("(max-width: 880px)").matches;

  const state = {
    open: false,
    mode: "overzicht",
    novenaKey: NOVENA_ORDER[0],
    day: 1,
    steps: [],
    index: 0,
    chipsOpen: !isNarrow(),
    barOpen: false,
    archiveOpen: false,
  };

  /* Bediening en overzicht in de taal van de app, of het Nederlands als de noveen die taal niet kent. */
  const effLang = () => (getNovena(state.novenaKey).langs.includes(getLang()) ? getLang() : "nl");
  /* Kolommen voor een stap: talen van deze noveen, en Latijn waar het bestaat. */
  const stepColumns = (step) =>
    columns((l) => (l === "la" ? Boolean(step.text_la) : getNovena(state.novenaKey).langs.includes(l)));

  /* Vertaling van de vaste UI-teksten. */
  const UI = {
    nl: {
      overzicht: "Overzicht",
      interactief: "Stap voor stap",
      latijn: "+ Latijn",
      instellingen: "Weergave en taal",
      dag: (n) => `Dag ${n}`,
      vandaag: "vandaag",
      vorige: "Vorige",
      volgende: "Volgende",
      stap: (i, n) => `Stap ${i} van ${n}`,
      start: "Stap voor stap bidden →",
      voor: (datum) => `De noveen begint op ${datum}.`,
      tijdens: (n) => `Vandaag is het dag ${n} van 9.`,
      archief: "Archief",
      sluiten: "Sluiten",
      taalkeuze: "Taalkeuze",
      weergave: "Weergave",
      keuze: "Keuze van noveen",
      dagkeuze: "Keuze van dag",
    },
    en: {
      overzicht: "Overview",
      interactief: "Step by step",
      latijn: "+ Latin",
      instellingen: "View and language",
      dag: (n) => `Day ${n}`,
      vandaag: "today",
      vorige: "Previous",
      volgende: "Next",
      stap: (i, n) => `Step ${i} of ${n}`,
      start: "Pray step by step →",
      voor: (datum) => `The novena begins on ${datum}.`,
      tijdens: (n) => `Today is day ${n} of 9.`,
      archief: "Archive",
      sluiten: "Close",
      taalkeuze: "Language",
      weergave: "View",
      keuze: "Choice of novena",
      dagkeuze: "Choice of day",
    },
    pt: {
      overzicht: "Vista geral",
      interactief: "Passo a passo",
      latijn: "+ Latim",
      instellingen: "Vista e língua",
      dag: (n) => `Dia ${n}`,
      vandaag: "hoje",
      vorige: "Anterior",
      volgende: "Seguinte",
      stap: (i, n) => `Passo ${i} de ${n}`,
      start: "Rezar passo a passo →",
      voor: (datum) => `A novena começa em ${datum}.`,
      tijdens: (n) => `Hoje é o dia ${n} de 9.`,
      archief: "Arquivo",
      sluiten: "Fechar",
      taalkeuze: "Língua",
      weergave: "Vista",
      keuze: "Escolha da novena",
      dagkeuze: "Escolha do dia",
    },
  };
  const ui = () => UI[effLang()];

  state.day = dayInfo().dayNumber;
  state.steps = buildNovenaSteps(state.novenaKey, state.day);

  /* ---------- Statische opbouw ---------- */
  root.innerHTML = `
    <div class="rosary-overlay" role="dialog" aria-modal="true" aria-label="Novena">
      <div class="rosary-bar">
        <div class="rosary-brand"><span aria-hidden="true">🕯️</span> Novena</div>
        <div class="ov-bar-controls">
          <div class="rosary-mode" role="group">
            <button class="n-mode-btn" data-mode="overzicht">Overzicht</button>
            <button class="n-mode-btn" data-mode="interactief">Stap voor stap</button>
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
        <div class="rosary-sets novena-choice" role="group"></div>
        <div class="rosary-sets novena-days" role="group"></div>
      </div>
      <div class="rosary-progress"><span class="rosary-progress-bar"></span></div>
      <div class="rosary-stage"></div>
      <div class="rosary-controls">
        <button class="rosary-nav prev" type="button">← Vorige</button>
        <span class="rosary-counter"></span>
        <button class="rosary-nav next" type="button">Volgende →</button>
      </div>
    </div>
  `;

  const overlay = root.querySelector(".rosary-overlay");
  const barControls = root.querySelector(".ov-bar-controls");
  const barToggle = root.querySelector(".ov-bar-toggle");
  const foldBtn = root.querySelector(".ov-fold");
  const foldLabel = root.querySelector(".ov-fold-label");
  const chipsWrap = root.querySelector(".ov-chips");
  const choiceWrap = root.querySelector(".novena-choice");
  const daysWrap = root.querySelector(".novena-days");
  const stage = root.querySelector(".rosary-stage");
  const progress = root.querySelector(".rosary-progress");
  const progressBar = root.querySelector(".rosary-progress-bar");
  const controls = root.querySelector(".rosary-controls");
  const counter = root.querySelector(".rosary-counter");
  const prevBtn = root.querySelector(".rosary-nav.prev");
  const nextBtn = root.querySelector(".rosary-nav.next");
  const closeBtn = root.querySelector(".rosary-close");
  const modeGroup = root.querySelector(".rosary-mode");
  const modeBtns = Array.from(root.querySelectorAll(".n-mode-btn"));

  /* Noveen-keuze: actieve novenen eerst, afgesloten novenen achter "Archief". */
  let archiveToggle = null;
  const maakNoveenChip = (key) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "rosary-set-chip";
    chip.dataset.novena = key;
    chip.innerHTML = `<span class="n-chip-label"></span>`;
    chip.addEventListener("click", () => selectNovena(key));
    choiceWrap.appendChild(chip);
  };
  NOVENA_ORDER.filter((k) => !getNovena(k).archived).forEach(maakNoveenChip);
  const archiefKeys = NOVENA_ORDER.filter((k) => getNovena(k).archived);
  if (archiefKeys.length) {
    archiveToggle = document.createElement("button");
    archiveToggle.type = "button";
    archiveToggle.className = "rosary-set-chip novena-archive-toggle";
    archiveToggle.innerHTML = `<span class="n-chip-label"></span>`;
    archiveToggle.addEventListener("click", () => {
      state.archiveOpen = !state.archiveOpen;
      render();
    });
    choiceWrap.appendChild(archiveToggle);
    archiefKeys.forEach(maakNoveenChip);
  }

  /* Dag-chips 1 t/m 9 */
  const novena = getNovena(state.novenaKey);
  for (let n = 1; n <= novena.days.length; n++) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "rosary-set-chip";
    chip.dataset.day = String(n);
    chip.innerHTML = `<span class="n-chip-label"></span><span class="r-today"></span>`;
    chip.addEventListener("click", () => selectDay(n));
    daysWrap.appendChild(chip);
  }

  /* ---------- Datums ---------- */
  function formatDate(date, opts) {
    const locale = { nl: "nl-NL", en: "en-GB", pt: "pt-PT" }[effLang()];
    return new Intl.DateTimeFormat(
      locale,
      opts || { weekday: "long", day: "numeric", month: "long" }
    ).format(date);
  }

  /* ---------- Rendering ---------- */
  function render() {
    const interactive = state.mode === "interactief";
    progress.hidden = !interactive;
    controls.hidden = !interactive;

    if (interactive) renderInteractive();
    else renderOverview();

    const t = ui();
    const info = dayInfo();
    const activeNovena = getNovena(state.novenaKey);
    foldLabel.textContent = `${pick(activeNovena, "label", effLang())} · ${t.dag(state.day)}`;
    foldBtn.classList.toggle("is-open", state.chipsOpen);
    foldBtn.setAttribute("aria-expanded", String(state.chipsOpen));
    chipsWrap.classList.toggle("is-collapsed", !state.chipsOpen);
    barControls.classList.toggle("is-open", state.barOpen);
    barToggle.classList.toggle("is-open", state.barOpen);
    barToggle.setAttribute("aria-expanded", String(state.barOpen));
    barToggle.setAttribute("aria-label", t.instellingen);
    closeBtn.setAttribute("aria-label", t.sluiten);
    modeGroup.setAttribute("aria-label", t.weergave);
    choiceWrap.setAttribute("aria-label", t.keuze);
    daysWrap.setAttribute("aria-label", t.dagkeuze);
    syncLangControl(root);
    modeBtns.forEach((b) => {
      b.classList.toggle("is-active", b.dataset.mode === state.mode);
      b.textContent = t[b.dataset.mode];
    });
    Array.from(choiceWrap.children).forEach((c) => {
      if (!c.dataset.novena) return;
      const n = getNovena(c.dataset.novena);
      c.querySelector(".n-chip-label").textContent = pick(n, "label", effLang());
      c.classList.toggle("is-active", c.dataset.novena === state.novenaKey);
      if (n.archived) c.hidden = !state.archiveOpen;
    });
    if (archiveToggle) {
      archiveToggle.querySelector(".n-chip-label").textContent =
        (state.archiveOpen ? "▾ " : "▸ ") + t.archief;
      archiveToggle.classList.toggle("is-active", state.archiveOpen);
    }
    Array.from(daysWrap.children).forEach((c) => {
      const n = Number(c.dataset.day);
      c.querySelector(".n-chip-label").textContent = t.dag(n);
      c.querySelector(".r-today").textContent = t.vandaag;
      c.classList.toggle("is-active", n === state.day);
      c.classList.toggle(
        "is-today",
        info.status === "tijdens" && n === info.dayNumber
      );
    });
    prevBtn.innerHTML = `<span aria-hidden="true">←</span><span class="ov-nav-word">${escape(t.vorige)}</span>`;
    prevBtn.setAttribute("aria-label", t.vorige);
    nextBtn.innerHTML = `<span class="ov-nav-word">${escape(t.volgende)}</span><span aria-hidden="true">→</span>`;
    nextBtn.setAttribute("aria-label", t.volgende);
  }

  function statusLine() {
    const info = dayInfo();
    const t = ui();
    if (info.status === "voor") {
      return t.voor(formatDate(novenaDayDate(getNovena(state.novenaKey), 1)));
    }
    if (info.status === "na") {
      return pick(getNovena(state.novenaKey), "voltooid", effLang());
    }
    return t.tijdens(info.dayNumber);
  }

  function renderOverview() {
    const novena = getNovena(state.novenaKey);
    const t = ui();
    const info = dayInfo();
    const lang = effLang();

    const items = novena.days
      .map((d, i) => {
        const date = formatDate(novenaDayDate(novena, i + 1), {
          weekday: "short",
          day: "numeric",
          month: "long",
        });
        const theme = pick(d, "theme", lang);
        const today =
          info.status === "tijdens" && info.dayNumber === i + 1 ? " is-today" : "";
        return `
          <li class="rosary-ov-item${today}">
            <span class="rosary-ov-num">${i + 1}</span>
            <div class="novena-ov-body">
              <p class="novena-ov-date">${escape(date)}</p>
              <div class="rosary-ov-grid"><p class="rosary-ov-nl" lang="${lang}">${escape(theme)}</p></div>
            </div>
          </li>`;
      })
      .join("");

    stage.innerHTML = `
      <div class="rosary-overview">
        <header class="rosary-ov-head">
          <p class="rosary-kicker">${escape(pick(novena, "subtitle", lang))}</p>
          <h2 class="rosary-h2">${escape(pick(novena, "title", lang))}</h2>
          <p class="novena-status">${escape(statusLine())}</p>
        </header>
        <p class="novena-intro">${escape(pick(novena, "intro", lang))}</p>
        <ol class="rosary-ov-list">${items}</ol>
        <button class="rosary-start" type="button">${escape(t.start)}</button>
      </div>`;

    stage.querySelector(".rosary-start").addEventListener("click", () =>
      setMode("interactief")
    );
  }

  function renderInteractive() {
    const step = state.steps[state.index];
    const t = ui();
    const { cols, both } = stepColumns(step);

    const parts = [];
    parts.push(`<p class="rosary-kicker">${escape(pick(step, "kicker", effLang()))}</p>`);

    const title = pick(step, "title", cols[0]);
    parts.push(`<h2 class="rosary-h2" lang="${cols[0]}">${escape(title)}</h2>`);
    /* Bij één kolom geen Latijnse ondertitel: die hoort bij de keuze voor Latijn. */
    const subLang = subtitleLang(cols, false);
    const sub = subLang ? pick(step, "title", subLang) : "";
    if (sub && sub !== title) {
      parts.push(`<p class="rosary-sub" lang="${subLang}">${escape(sub)}</p>`);
    }

    parts.push(`<div class="rosary-text-grid${both ? " both" : ""}">`);
    for (const l of cols) parts.push(textCol(l, langLabel(l), pick(step, "text", l), both));
    parts.push(`</div>`);

    stage.innerHTML = `<article class="rosary-card" tabindex="0" aria-live="polite">${parts.join(
      ""
    )}</article>`;

    const pct = ((state.index + 1) / state.steps.length) * 100;
    progressBar.style.width = pct.toFixed(1) + "%";
    counter.textContent = t.stap(state.index + 1, state.steps.length);
    prevBtn.disabled = state.index === 0;
    nextBtn.disabled = state.index === state.steps.length - 1;
  }

  function textCol(lang, label, text, showLabel) {
    const lbl = showLabel
      ? `<p class="novena-col-label">${escape(label)}</p>`
      : "";
    return `<div class="novena-text-col" lang="${lang}">${lbl}<p class="rosary-text ${lang}">${escape(
      text || "—"
    )}</p></div>`;
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
  function selectNovena(key) {
    state.novenaKey = key;
    selectDay(dayInfo().dayNumber);
  }

  function selectDay(day) {
    state.day = day;
    state.steps = buildNovenaSteps(state.novenaKey, day);
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

  function langChanged() {
    if (state.open) render();
  }

  function open() {
    state.open = true;
    state.day = dayInfo().dayNumber;
    state.steps = buildNovenaSteps(state.novenaKey, state.day);
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
  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));
  bindLangControl(root);
  onLangChange(langChanged);
  foldBtn.addEventListener("click", toggleChips);
  barToggle.addEventListener("click", toggleBar);
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
