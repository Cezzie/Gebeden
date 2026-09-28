/*
 * Taalinstellingen, gedeeld door de hoofdpagina en alle overlays.
 *   - left / right: de taal in de linker- en rechterkolom — "nl" | "en" | "pt" | "la",
 *                   rechts ook "none" (één kolom)
 *   - ui:           de taal van de bediening; volgt de volkstaal links (anders rechts)
 * Voorkeuren onder localStorage "gebeden-links", "gebeden-rechts" en "gebeden-taal".
 * De oude sleutel "gebeden-lang" (nl / la / both) wordt bij het eerste bezoek overgenomen.
 */

const LANGS = ["nl", "en", "pt"];
const ALL = [...LANGS, "la"];

/* Taalnamen in de taal van de bediening (kolomkoppen). */
const LABELS = {
  nl: { nl: "Nederlands", en: "Engels", pt: "Portugees", la: "Latijn" },
  en: { nl: "Dutch", en: "English", pt: "Portuguese", la: "Latin" },
  pt: { nl: "Neerlandês", en: "Inglês", pt: "Português", la: "Latim" },
};

/* In de keuzelijst staat elke volkstaal in haar eigen naam, zodat je haar altijd terugvindt. */
const OWN_NAMES = { nl: "Nederlands", en: "English", pt: "Português" };

/* Vaste teksten die in meerdere schermen terugkomen. */
const COMMON = {
  nl: {
    talen: "Talen",
    links: "Taal links",
    rechts: "Taal rechts",
    wissel: "Talen omwisselen",
    geen: "— geen —",
    weergave: "Weergave",
    instellingen: "Weergave en taal",
    overzicht: "Overzicht",
    interactief: "Stap voor stap",
    start: "Stap voor stap bidden →",
    vorige: "Vorige",
    volgende: "Volgende",
    sluiten: "Sluiten",
    stap: (i, n) => `Stap ${i} van ${n}`,
    vandaag: "vandaag",
    nu: "nu",
    geenLatijn: "Van dit gebed is geen Latijnse tekst overgeleverd.",
  },
  en: {
    talen: "Languages",
    links: "Left language",
    rechts: "Right language",
    wissel: "Swap languages",
    geen: "— none —",
    weergave: "View",
    instellingen: "View and language",
    overzicht: "Overview",
    interactief: "Step by step",
    start: "Pray step by step →",
    vorige: "Previous",
    volgende: "Next",
    sluiten: "Close",
    stap: (i, n) => `Step ${i} of ${n}`,
    vandaag: "today",
    nu: "now",
    geenLatijn: "There is no Latin text of this prayer.",
  },
  pt: {
    talen: "Línguas",
    links: "Língua à esquerda",
    rechts: "Língua à direita",
    wissel: "Trocar as línguas",
    geen: "— nenhuma —",
    weergave: "Vista",
    instellingen: "Vista e língua",
    overzicht: "Vista geral",
    interactief: "Passo a passo",
    start: "Rezar passo a passo →",
    vorige: "Anterior",
    volgende: "Seguinte",
    sluiten: "Fechar",
    stap: (i, n) => `Passo ${i} de ${n}`,
    vandaag: "hoje",
    nu: "agora",
    geenLatijn: "Não existe texto latino desta oração.",
  },
};

/* ---------- Opslag ---------- */
function load(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Zonder opslag werkt de app gewoon, alleen zonder geheugen. */
  }
}

/* Eerste bezoek: taal van de browser, anders Nederlands. */
function browserLang() {
  const prefs = (navigator.languages || [navigator.language || ""]).map((l) =>
    String(l).toLowerCase().slice(0, 2)
  );
  return prefs.find((l) => LANGS.includes(l)) || "nl";
}

function initialState() {
  const legacy = load("gebeden-lang");
  let left = load("gebeden-links");
  let right = load("gebeden-rechts");
  let ui = load("gebeden-taal");

  if (!ALL.includes(left)) {
    if (legacy === "la") [left, right] = ["la", "none"];
    else if (legacy === "nl") [left, right] = ["nl", "none"];
    else if (legacy) [left, right] = ["nl", "la"];
    else [left, right] = [browserLang(), "la"];
  }
  if (!(ALL.includes(right) || right === "none") || right === left) right = "none";
  if (!LANGS.includes(ui)) ui = LANGS.includes(left) ? left : legacy ? "nl" : browserLang();

  return { left, right, ui };
}

const state = initialState();
const listeners = new Set();

/* De bediening volgt de volkstaal links, anders die rechts. */
function followUi() {
  if (LANGS.includes(state.left)) state.ui = state.left;
  else if (LANGS.includes(state.right)) state.ui = state.right;
}

function changed() {
  followUi();
  save("gebeden-links", state.left);
  save("gebeden-rechts", state.right);
  save("gebeden-taal", state.ui);
  document.documentElement.lang = state.ui;
  listeners.forEach((fn) => fn());
}

/* ---------- Lezen ---------- */
export const getLang = () => state.ui;
export const langLabel = (code) => LABELS[state.ui][code] || code;
export const common = () => COMMON[state.ui];

/*
 * De kolommen die getoond worden: de talen links en rechts, zonder de talen
 * waarin deze tekst niet bestaat (`has`). Blijft er niets over, dan de taal
 * van de bediening. `noLatin` meldt dat het gevraagde Latijn ontbreekt.
 */
export function columns(has = () => true) {
  const wanted = [state.left, state.right].filter((l) => l !== "none");
  const cols = wanted.filter((l) => has(l));
  if (!cols.length) cols.push(has(state.ui) ? state.ui : "nl");
  return {
    cols,
    both: cols.length === 2,
    noLatin: wanted.includes("la") && !cols.includes("la"),
  };
}

/*
 * Taal van de ondertitel onder de kop: die van de rechterkolom; bij één kolom
 * het Latijn (als dat bestaat), en onder een Latijnse kop de taal van de bediening.
 */
export function subtitleLang(cols, hasLatin) {
  if (cols[1]) return cols[1];
  if (cols[0] === "la") return state.ui;
  return hasLatin ? "la" : null;
}

/* Veld in de gegeven taal (title_en, text_la, …); voor volkstalen met het Nederlands als terugval. */
export function pick(obj, base, lang = state.ui) {
  if (!obj) return "";
  const value = obj[`${base}_${lang}`];
  if (value || lang === "la") return value || "";
  return obj[`${base}_nl`] || "";
}

/* ---------- Wijzigen ---------- */
function setLeft(lang) {
  if (!ALL.includes(lang) || lang === state.left) return;
  if (lang === state.right) state.right = state.left;
  state.left = lang;
  changed();
}

function setRight(lang) {
  if (!(ALL.includes(lang) || lang === "none") || lang === state.right) return;
  if (lang === state.left) return;
  state.right = lang;
  changed();
}

function swapSides() {
  if (state.right === "none") return;
  [state.left, state.right] = [state.right, state.left];
  changed();
}

export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* ---------- Taalkeuze ---------- */
/*
 * Twee keuzelijsten (links en rechts) met daartussen een wisselknop.
 * `groupClass` geeft de stijl van de omgeving (kopbalk of overlay).
 */
export function langControlHTML({ groupClass }) {
  return `<div class="lang-pair ${groupClass}" role="group" data-lang-control>
    <select class="lang-select" data-side="left"></select>
    <button type="button" class="lang-swap" data-swap><span aria-hidden="true">⇄</span></button>
    <select class="lang-select" data-side="right"></select>
  </div>`;
}

/* Koppelt de keuzelijsten in `root` aan de gedeelde taalinstelling. */
export function bindLangControl(root) {
  root.querySelectorAll("[data-lang-control]").forEach((group) => {
    group.querySelector('[data-side="left"]').addEventListener("change", (e) => setLeft(e.target.value));
    group.querySelector('[data-side="right"]').addEventListener("change", (e) => setRight(e.target.value));
    group.querySelector("[data-swap]").addEventListener("click", swapSides);
  });
}

/* Vult de keuzelijsten volgens de huidige instelling en de taal van de bediening. */
export function syncLangControl(root) {
  const t = common();
  const option = (code, label, disabled = false) =>
    `<option value="${code}"${disabled ? " disabled" : ""}${code !== "none" ? ` lang="${code}"` : ""}>${label}</option>`;
  const name = (code) => OWN_NAMES[code] || LABELS[state.ui][code];

  root.querySelectorAll("[data-lang-control]").forEach((group) => {
    group.setAttribute("aria-label", t.talen);
    const left = group.querySelector('[data-side="left"]');
    const right = group.querySelector('[data-side="right"]');
    const swap = group.querySelector("[data-swap]");

    left.innerHTML = ALL.map((c) => option(c, name(c))).join("");
    right.innerHTML =
      option("none", t.geen) + ALL.map((c) => option(c, name(c), c === state.left)).join("");
    left.value = state.left;
    right.value = state.right;
    left.setAttribute("aria-label", t.links);
    right.setAttribute("aria-label", t.rechts);
    swap.setAttribute("aria-label", t.wissel);
    swap.title = t.wissel;
    swap.disabled = state.right === "none";
  });
}

document.documentElement.lang = state.ui;
