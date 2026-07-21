import {
  NOVENA_ORDER,
  getNovena,
  novenaDayDate,
  novenaDayInfo,
  buildNovenaSteps,
} from "./novena.js";

/*
 * Novena als overlay met twee weergaven, naar het voorbeeld van de rozenkrans:
 *   - "overzicht": de negen dagen met hun thema en datum
 *   - "interactief": stap voor stap bidden, met negen stipjes voor de dagen
 * Taalkeuze: Nederlands óf Portugees (Portugal) als hoofdtaal, met daarnaast
 * een Latijn-schakelaar die — waar een authentieke Latijnse tekst bestaat —
 * het Latijn naast de gekozen taal toont. Nederlands en Portugees staan
 * nooit naast elkaar. Voorkeuren onder localStorage "gebeden-novena-lang"
 * en "gebeden-novena-latin".
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

  const storedLang = localStorage.getItem("gebeden-novena-lang");
  const state = {
    open: false,
    mode: "overzicht",
    novenaKey: NOVENA_ORDER[0],
    day: 1,
    steps: [],
    index: 0,
    lang: storedLang === "pt" ? "pt" : "nl",
    latin: localStorage.getItem("gebeden-novena-latin") === "1",
    chipsOpen: !isNarrow(),
  };

  /* Vertaling van de vaste UI-teksten. */
  const UI = {
    nl: {
      overzicht: "Overzicht",
      interactief: "Stap voor stap",
      latijn: "+ Latijn",
      dag: (n) => `Dag ${n}`,
      vandaag: "vandaag",
      vorige: "← Vorige",
      volgende: "Volgende →",
      stap: (i, n) => `Stap ${i} van ${n}`,
      start: "Stap voor stap bidden →",
      col: "Nederlands",
      colLa: "Latijn",
      voor: (datum) => `De noveen begint op ${datum}.`,
      tijdens: (n) => `Vandaag is het dag ${n} van 9.`,
      na: "De noveen is voltooid — zalig hoogfeest van de heilige Ignatius!",
    },
    pt: {
      overzicht: "Vista geral",
      interactief: "Passo a passo",
      latijn: "+ Latim",
      dag: (n) => `Dia ${n}`,
      vandaag: "hoje",
      vorige: "← Anterior",
      volgende: "Seguinte →",
      stap: (i, n) => `Passo ${i} de ${n}`,
      start: "Rezar passo a passo →",
      col: "Português",
      colLa: "Latim",
      voor: (datum) => `A novena começa em ${datum}.`,
      tijdens: (n) => `Hoje é o dia ${n} de 9.`,
      na: "A novena está concluída — feliz solenidade de Santo Inácio!",
    },
  };
  const ui = () => UI[state.lang];

  state.day = dayInfo().dayNumber;
  state.steps = buildNovenaSteps(state.novenaKey, state.day);

  /* ---------- Statische opbouw ---------- */
  root.innerHTML = `
    <div class="rosary-overlay" role="dialog" aria-modal="true" aria-label="Novena">
      <div class="rosary-bar">
        <div class="rosary-brand"><span aria-hidden="true">🕯️</span> Novena</div>
        <div class="rosary-mode" role="group" aria-label="Weergave">
          <button class="n-mode-btn" data-mode="overzicht">Overzicht</button>
          <button class="n-mode-btn" data-mode="interactief">Stap voor stap</button>
        </div>
        <div class="rosary-lang" role="group" aria-label="Taalkeuze">
          <button class="n-lang-btn" data-lang="nl">NL</button>
          <button class="n-lang-btn" data-lang="pt">PT</button>
          <button class="n-latin-btn" type="button" aria-pressed="false">+ Latijn</button>
        </div>
        <button class="rosary-close" type="button" aria-label="Sluiten">✕</button>
      </div>
      <button class="novena-fold" type="button" aria-expanded="true">
        <span class="novena-fold-chevron" aria-hidden="true">›</span>
        <span class="novena-fold-label"></span>
      </button>
      <div class="novena-chips">
        <div class="rosary-sets novena-choice" role="group" aria-label="Keuze van noveen"></div>
        <div class="rosary-sets novena-days" role="group" aria-label="Keuze van dag"></div>
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
  const foldBtn = root.querySelector(".novena-fold");
  const foldLabel = root.querySelector(".novena-fold-label");
  const chipsWrap = root.querySelector(".novena-chips");
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
  const langBtns = Array.from(root.querySelectorAll(".n-lang-btn"));
  const latinBtn = root.querySelector(".n-latin-btn");
  const modeBtns = Array.from(root.querySelectorAll(".n-mode-btn"));

  /* Noveen-keuze (nu één: St.-Ignatius van Loyola) */
  for (const key of NOVENA_ORDER) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "rosary-set-chip";
    chip.dataset.novena = key;
    chip.innerHTML = `<span class="n-chip-label"></span>`;
    chip.addEventListener("click", () => selectNovena(key));
    choiceWrap.appendChild(chip);
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
    const locale = state.lang === "pt" ? "pt-PT" : "nl-NL";
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
    foldLabel.textContent = `${
      state.lang === "pt" ? activeNovena.label_pt : activeNovena.label_nl
    } · ${t.dag(state.day)}`;
    foldBtn.classList.toggle("is-open", state.chipsOpen);
    foldBtn.setAttribute("aria-expanded", String(state.chipsOpen));
    chipsWrap.classList.toggle("is-collapsed", !state.chipsOpen);
    langBtns.forEach((b) =>
      b.classList.toggle("is-active", b.dataset.lang === state.lang)
    );
    latinBtn.textContent = t.latijn;
    latinBtn.classList.toggle("is-active", state.latin);
    latinBtn.setAttribute("aria-pressed", String(state.latin));
    modeBtns.forEach((b) => {
      b.classList.toggle("is-active", b.dataset.mode === state.mode);
      b.textContent = t[b.dataset.mode];
    });
    Array.from(choiceWrap.children).forEach((c) => {
      const n = getNovena(c.dataset.novena);
      c.querySelector(".n-chip-label").textContent =
        state.lang === "pt" ? n.label_pt : n.label_nl;
      c.classList.toggle("is-active", c.dataset.novena === state.novenaKey);
    });
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
    prevBtn.textContent = t.vorige;
    nextBtn.textContent = t.volgende;
  }

  function statusLine() {
    const info = dayInfo();
    const t = ui();
    if (info.status === "voor") {
      return t.voor(formatDate(novenaDayDate(getNovena(state.novenaKey), 1)));
    }
    if (info.status === "na") return t.na;
    return t.tijdens(info.dayNumber);
  }

  function renderOverview() {
    const novena = getNovena(state.novenaKey);
    const t = ui();
    const info = dayInfo();
    const pt = state.lang === "pt";

    const items = novena.days
      .map((d, i) => {
        const date = formatDate(novenaDayDate(novena, i + 1), {
          weekday: "short",
          day: "numeric",
          month: "long",
        });
        const theme = pt ? d.theme_pt : d.theme_nl;
        const today =
          info.status === "tijdens" && info.dayNumber === i + 1 ? " is-today" : "";
        return `
          <li class="rosary-ov-item${today}">
            <span class="rosary-ov-num">${i + 1}</span>
            <div class="novena-ov-body">
              <p class="novena-ov-date">${escape(date)}</p>
              <div class="rosary-ov-grid"><p class="rosary-ov-nl">${escape(theme)}</p></div>
            </div>
          </li>`;
      })
      .join("");

    stage.innerHTML = `
      <div class="rosary-overview">
        <header class="rosary-ov-head">
          <p class="rosary-kicker">${escape(pt ? novena.subtitle_pt : novena.subtitle_nl)}</p>
          <h2 class="rosary-h2">${escape(pt ? novena.title_pt : novena.title_nl)}</h2>
          <p class="novena-status">${escape(statusLine())}</p>
        </header>
        <p class="novena-intro">${escape(pt ? novena.intro_pt : novena.intro_nl)}</p>
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
    const pt = state.lang === "pt";
    /* Latijn ernaast, alleen waar een authentieke Latijnse tekst bestaat. */
    const withLatin = state.latin && Boolean(step.text_la);

    const parts = [];
    parts.push(
      `<p class="rosary-kicker">${escape(pt ? step.kicker_pt : step.kicker_nl)}</p>`
    );

    const title = pt ? step.title_pt : step.title_nl;
    parts.push(`<h2 class="rosary-h2">${escape(title)}</h2>`);
    if (state.latin && step.title_la && step.title_la !== title) {
      parts.push(`<p class="rosary-sub">${escape(step.title_la)}</p>`);
    }

    /* De negen stipjes: één per dag van de noveen. */
    parts.push(renderBeads(step.bead, step.beadTotal));

    parts.push(`<div class="rosary-text-grid${withLatin ? " both" : ""}">`);
    parts.push(textCol(pt ? "pt" : "nl", t.col, pt ? step.text_pt : step.text_nl, withLatin));
    if (withLatin) parts.push(textCol("la", t.colLa, step.text_la, true));
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

  function renderBeads(current, total) {
    let dots = "";
    for (let i = 1; i <= total; i++) {
      const cls = i < current ? "done" : i === current ? "active" : "todo";
      dots += `<span class="r-bead ${cls}"></span>`;
    }
    return `<div class="rosary-beads" aria-hidden="true">${dots}</div>`;
  }

  function textCol(lang, label, text, showLabel) {
    const lbl = showLabel
      ? `<p class="novena-col-label">${escape(label)}</p>`
      : "";
    return `<div class="novena-text-col">${lbl}<p class="rosary-text ${lang}">${escape(
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
    if (state.mode === "interactief") focusCard();
  }

  function toggleChips() {
    state.chipsOpen = !state.chipsOpen;
    render();
  }

  function setMode(mode) {
    state.mode = mode;
    if (mode === "interactief") state.index = 0;
    render();
    if (mode === "interactief") focusCard();
  }

  function go(delta) {
    const next = state.index + delta;
    if (next < 0 || next >= state.steps.length) return;
    state.index = next;
    renderInteractive();
    focusCard();
  }

  function setLang(lang) {
    state.lang = lang;
    localStorage.setItem("gebeden-novena-lang", lang);
    render();
  }

  function toggleLatin() {
    state.latin = !state.latin;
    localStorage.setItem("gebeden-novena-latin", state.latin ? "1" : "0");
    render();
  }

  function open() {
    state.open = true;
    state.day = dayInfo().dayNumber;
    state.steps = buildNovenaSteps(state.novenaKey, state.day);
    state.index = 0;
    root.hidden = false;
    document.body.classList.add("rosary-open-body");
    render();
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
  langBtns.forEach((b) =>
    b.addEventListener("click", () => setLang(b.dataset.lang))
  );
  latinBtn.addEventListener("click", toggleLatin);
  foldBtn.addEventListener("click", toggleChips);
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
