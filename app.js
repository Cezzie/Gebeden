import { SEED } from "./seed.js";
import { initRosary } from "./rosary-ui.js";
import { initAntiphons } from "./antiphons-ui.js";
import { initNovena } from "./novena-ui.js";
import { initKruisweg } from "./kruisweg-ui.js";
import {
  getLang,
  columns,
  subtitleLang,
  pick,
  langLabel,
  common,
  langControlHTML,
  bindLangControl,
  syncLangControl,
  onLangChange,
} from "./i18n.js";

const prayers = SEED.prayers;

/* Vertaling van de vaste teksten van de hoofdpagina. */
const UI = {
  nl: {
    docTitel: "Katholieke Gebeden — Nederlands, Engels, Portugees & Latijn",
    titel: "Katholieke Gebeden",
    ondertitel: "Nederlands · Engels · Portugees · Latijn",
    rozenkrans: "Rozenkrans bidden",
    antifoon: "Maria-antifoon",
    novena: "Novena",
    kruisweg: "Kruisweg",
    devoties: "Gebedsvormen",
    lettergrootte: "Lettergrootte",
    kleiner: "Tekst kleiner",
    groter: "Tekst groter",
    donkerAan: "Donkere modus inschakelen",
    lichtAan: "Lichte modus inschakelen",
    donker: "Donkere modus",
    licht: "Lichte modus",
    menuOpen: "Menu tonen",
    menuDicht: "Menu verbergen",
    gebeden: "Gebeden",
    zoek: "Zoek een gebed…",
    zoekLabel: "Zoek een gebed",
    lijst: "Lijst van gebeden",
    geenGevonden: "Geen gebeden gevonden.",
    kopieer: "Kopieer",
    gekopieerd: "Gekopieerd",
    mislukt: "Mislukt",
    voet: "Gemaakt met eerbied · Nederlandse teksten o.a. van",
    categorie: {
      standaardgebed: "Standaardgebeden",
      geloofsbelijdenis: "Geloofsbelijdenis",
      "maria-antifoon": "Maria-antifoon",
      antifoon: "Antifonen",
      litanie: "Litanieën",
      evangelielofzang: "Evangelielofzangen",
      hymne: "Hymnen",
      overig: "Overig",
    },
  },
  en: {
    docTitel: "Catholic Prayers — Dutch, English, Portuguese & Latin",
    titel: "Catholic Prayers",
    ondertitel: "Dutch · English · Portuguese · Latin",
    rozenkrans: "Pray the Rosary",
    antifoon: "Marian antiphon",
    novena: "Novena",
    kruisweg: "Way of the Cross",
    devoties: "Devotions",
    lettergrootte: "Text size",
    kleiner: "Smaller text",
    groter: "Larger text",
    donkerAan: "Switch to dark mode",
    lichtAan: "Switch to light mode",
    donker: "Dark mode",
    licht: "Light mode",
    menuOpen: "Show menu",
    menuDicht: "Hide menu",
    gebeden: "Prayers",
    zoek: "Search for a prayer…",
    zoekLabel: "Search for a prayer",
    lijst: "List of prayers",
    geenGevonden: "No prayers found.",
    kopieer: "Copy",
    gekopieerd: "Copied",
    mislukt: "Failed",
    voet: "Made with reverence · Dutch texts partly from",
    categorie: {
      standaardgebed: "Common prayers",
      geloofsbelijdenis: "Creeds",
      "maria-antifoon": "Marian antiphons",
      antifoon: "Antiphons",
      litanie: "Litanies",
      evangelielofzang: "Gospel canticles",
      hymne: "Hymns",
      overig: "Other",
    },
  },
  pt: {
    docTitel: "Orações Católicas — neerlandês, inglês, português e latim",
    titel: "Orações Católicas",
    ondertitel: "Neerlandês · Inglês · Português · Latim",
    rozenkrans: "Rezar o Terço",
    antifoon: "Antífona mariana",
    novena: "Novena",
    kruisweg: "Via-Sacra",
    devoties: "Devoções",
    lettergrootte: "Tamanho do texto",
    kleiner: "Texto mais pequeno",
    groter: "Texto maior",
    donkerAan: "Ativar o modo escuro",
    lichtAan: "Ativar o modo claro",
    donker: "Modo escuro",
    licht: "Modo claro",
    menuOpen: "Mostrar o menu",
    menuDicht: "Ocultar o menu",
    gebeden: "Orações",
    zoek: "Procurar uma oração…",
    zoekLabel: "Procurar uma oração",
    lijst: "Lista de orações",
    geenGevonden: "Nenhuma oração encontrada.",
    kopieer: "Copiar",
    gekopieerd: "Copiado",
    mislukt: "Falhou",
    voet: "Feito com reverência · Textos em neerlandês, em parte, de",
    categorie: {
      standaardgebed: "Orações comuns",
      geloofsbelijdenis: "Profissão de fé",
      "maria-antifoon": "Antífonas marianas",
      antifoon: "Antífonas",
      litanie: "Ladainhas",
      evangelielofzang: "Cânticos evangélicos",
      hymne: "Hinos",
      overig: "Outras",
    },
  },
};
const ui = () => UI[getLang()];

const CATEGORY_ORDER = [
  "standaardgebed",
  "geloofsbelijdenis",
  "evangelielofzang",
  "hymne",
  "maria-antifoon",
  "antifoon",
  "litanie",
];

const els = {
  header: document.querySelector(".site-header"),
  headerToggle: document.getElementById("header-toggle"),
  devotionBtns: Array.from(document.querySelectorAll(".header-devotions .rosary-open-btn")),
  langSlot: document.getElementById("lang-control"),
  list: document.getElementById("prayer-list"),
  view: document.getElementById("prayer-view"),
  search: document.getElementById("search"),
  themeToggle: document.getElementById("theme-toggle"),
  fontSmaller: document.getElementById("font-smaller"),
  fontLarger: document.getElementById("font-larger"),
  sidebar: document.querySelector(".sidebar"),
  sidebarToggle: document.getElementById("sidebar-toggle"),
  sidebarToggleLabel: document.getElementById("sidebar-toggle-label"),
};

/* Op smalle schermen staan de kopbalk en de gebedenlijst achter een knop. */
const isNarrow = () =>
  window.matchMedia && window.matchMedia("(max-width: 880px)").matches;

const FONT_MIN = 0.8;
const FONT_MAX = 1.6;
const FONT_STEP = 0.1;

const prefersDark =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const state = {
  theme: localStorage.getItem("gebeden-theme") || (prefersDark ? "dark" : "light"),
  fontScale: parseFloat(localStorage.getItem("gebeden-fontscale")) || 1,
  query: "",
  activeKey: null,
  expanded: new Set(),
  sidebarOpen: false,
  headerOpen: false,
};

/* ---------- Helpers ---------- */
function categoryLabel(cat) {
  const labels = ui().categorie;
  return labels[cat] || (cat ? cat[0].toUpperCase() + cat.slice(1) : labels.overig);
}

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/* Zoeken gaat door alle talen heen. */
function matchesQuery(prayer, q) {
  if (!q) return true;
  const haystack = normalize(
    ["nl", "en", "pt", "la"]
      .flatMap((l) => [prayer[`title_${l}`], prayer[`text_${l}`]])
      .join(" ")
  );
  return haystack.includes(normalize(q));
}

const hasLatin = (prayer) => Boolean(prayer.text_la);

/* Kolommen voor dit gebed: alleen talen waarin het gebed bestaat. */
const prayerColumns = (prayer) => columns((l) => Boolean(prayer[`text_${l}`]));

function groupByCategory(items) {
  const groups = new Map();
  for (const p of items) {
    const cat = p.category || "overig";
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat).push(p);
  }
  const ordered = [];
  for (const cat of CATEGORY_ORDER) {
    if (groups.has(cat)) ordered.push([cat, groups.get(cat)]);
  }
  for (const [cat, list] of groups) {
    if (!CATEGORY_ORDER.includes(cat)) ordered.push([cat, list]);
  }
  return ordered;
}

/* ---------- Vaste teksten ---------- */
function applyStaticTexts() {
  const t = ui();
  document.title = t.docTitel;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = t[el.dataset.i18n];
    if (text) el.textContent = text;
  });
  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    const text = t[el.dataset.i18nLabel];
    if (text) el.setAttribute("aria-label", text);
  });
  els.search.placeholder = t.zoek;
  els.search.setAttribute("aria-label", t.zoekLabel);
  els.list.setAttribute("aria-label", t.lijst);
  syncLangControl(els.header);
  setHeaderOpen(state.headerOpen);
  setTheme(state.theme);
}

/* ---------- Sidebar ---------- */
function renderList() {
  const visible = prayers.filter((p) => matchesQuery(p, state.query));
  els.list.innerHTML = "";

  if (visible.length === 0) {
    const empty = document.createElement("p");
    empty.className = "list-empty";
    empty.textContent = ui().geenGevonden;
    els.list.appendChild(empty);
    return;
  }

  // Tijdens het zoeken staan alle categorieën met treffers open.
  const searching = state.query.trim() !== "";

  for (const [cat, items] of groupByCategory(visible)) {
    const isOpen = searching || state.expanded.has(cat);

    const heading = document.createElement("button");
    heading.type = "button";
    heading.className = "cat-toggle" + (isOpen ? " is-open" : "");
    heading.setAttribute("aria-expanded", String(isOpen));

    const label = document.createElement("span");
    label.className = "cat-label";
    label.textContent = categoryLabel(cat);

    const count = document.createElement("span");
    count.className = "cat-count";
    count.textContent = String(items.length);

    const chevron = document.createElement("span");
    chevron.className = "cat-chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "›";

    heading.append(chevron, label, count);
    if (!searching) {
      heading.addEventListener("click", () => toggleCategory(cat));
    }
    els.list.appendChild(heading);

    const group = document.createElement("div");
    group.className = "cat-group" + (isOpen ? "" : " is-collapsed");

    for (const p of items) {
      const btn = document.createElement("button");
      btn.className = "list-item" + (p.key === state.activeKey ? " is-active" : "");
      btn.dataset.key = p.key;

      const title = pick(p, "title");
      const main = document.createElement("span");
      main.textContent = title;
      btn.appendChild(main);

      if (hasLatin(p) && p.title_la && p.title_la !== title) {
        const la = document.createElement("span");
        la.className = "li-la";
        la.lang = "la";
        la.textContent = p.title_la;
        btn.appendChild(la);
      }

      btn.addEventListener("click", () => selectPrayer(p.key));
      group.appendChild(btn);
    }

    els.list.appendChild(group);
  }
}

function toggleCategory(cat) {
  if (state.expanded.has(cat)) state.expanded.delete(cat);
  else state.expanded.add(cat);
  renderList();
}

function categoryOf(key) {
  const prayer = prayers.find((p) => p.key === key);
  return prayer ? prayer.category || "overig" : null;
}

/* ---------- Prayer view ---------- */
function renderView() {
  const prayer = prayers.find((p) => p.key === state.activeKey);
  if (!prayer) {
    els.view.innerHTML = "";
    return;
  }

  const { cols, both, noLatin } = prayerColumns(prayer);
  const [first] = cols;

  const view = document.createElement("div");

  // Head: titel in de linkertaal; eronder die van de rechterkolom, of anders het Latijn.
  const head = document.createElement("header");
  head.className = "prayer-head";

  const h2 = document.createElement("h2");
  h2.lang = first;
  h2.textContent = pick(prayer, "title", first);
  head.appendChild(h2);

  const subLang = subtitleLang(cols, hasLatin(prayer));
  const subtitleText = subLang ? pick(prayer, "title", subLang) : "";
  if (subtitleText && subtitleText !== h2.textContent) {
    const sub = document.createElement("p");
    sub.className = "subtitle";
    sub.lang = subLang;
    sub.textContent = subtitleText;
    head.appendChild(sub);
  }

  if (prayer.category) {
    const tag = document.createElement("span");
    tag.className = "category-tag";
    tag.textContent = categoryLabel(prayer.category);
    head.appendChild(tag);
  }

  head.appendChild(makeCopyButton(prayer));
  view.appendChild(head);

  if (noLatin) {
    const note = document.createElement("p");
    note.className = "no-latin-note";
    note.textContent = common().geenLatijn;
    view.appendChild(note);
  }

  const rule = document.createElement("div");
  rule.className = "rule";
  view.appendChild(rule);

  // Text grid
  const grid = document.createElement("div");
  grid.className = "text-grid" + (both ? " both" : "");
  for (const l of cols) {
    grid.appendChild(makeColumn(l, langLabel(l), pick(prayer, "text", l), both));
  }
  view.appendChild(grid);

  // Notes
  const notesText = pick(prayer, "notes");
  if (notesText) {
    const notes = document.createElement("div");
    notes.className = "prayer-notes";
    const p = document.createElement("p");
    p.style.margin = "0";
    p.textContent = notesText;
    notes.appendChild(p);
    view.appendChild(notes);
  }

  els.view.innerHTML = "";
  els.view.appendChild(view);
}

function prayerToText(prayer) {
  return prayerColumns(prayer)
    .cols.map((l) => pick(prayer, "title", l) + "\n\n" + pick(prayer, "text", l))
    .join("\n\n— — —\n\n");
}

function makeCopyButton(prayer) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "copy-btn";
  btn.innerHTML =
    '<span class="copy-icon" aria-hidden="true">⧉</span><span class="copy-label"></span>';

  const label = btn.querySelector(".copy-label");
  label.textContent = ui().kopieer;
  let resetTimer = null;

  btn.addEventListener("click", async () => {
    const text = prayerToText(prayer);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      btn.classList.add("is-copied");
      label.textContent = ui().gekopieerd;
    } catch {
      label.textContent = ui().mislukt;
    }
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      btn.classList.remove("is-copied");
      label.textContent = ui().kopieer;
    }, 1800);
  });

  return btn;
}

function makeColumn(langCode, label, text, showLabel) {
  const col = document.createElement("div");
  col.className = "text-col " + langCode;
  col.lang = langCode;

  if (showLabel) {
    const lbl = document.createElement("p");
    lbl.className = "col-label";
    lbl.textContent = label;
    col.appendChild(lbl);
  }

  const body = document.createElement("p");
  body.className = "prayer-text";
  body.textContent = text || "—";
  col.appendChild(body);

  return col;
}

/* ---------- Actions ---------- */
function setHeaderOpen(open) {
  state.headerOpen = open;
  els.header.classList.toggle("is-open", open);
  if (els.headerToggle) {
    els.headerToggle.setAttribute("aria-expanded", String(open));
    els.headerToggle.setAttribute("aria-label", open ? ui().menuDicht : ui().menuOpen);
  }
}

function setSidebarOpen(open) {
  state.sidebarOpen = open;
  if (els.sidebar) els.sidebar.classList.toggle("is-open", open);
  if (els.sidebarToggle) {
    els.sidebarToggle.setAttribute("aria-expanded", String(open));
  }
}

function updateSidebarLabel() {
  if (!els.sidebarToggleLabel) return;
  const prayer = prayers.find((p) => p.key === state.activeKey);
  els.sidebarToggleLabel.textContent = prayer ? pick(prayer, "title") : ui().gebeden;
}

function selectPrayer(key) {
  state.activeKey = key;
  const cat = categoryOf(key);
  if (cat) state.expanded.add(cat);
  if (history.replaceState) {
    history.replaceState(null, "", "#" + key);
  } else {
    location.hash = key;
  }
  /* Na een keuze op een smal scherm klapt de lijst weer in. */
  if (isNarrow()) setSidebarOpen(false);
  updateSidebarLabel();
  renderList();
  renderView();
}

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("gebeden-theme", theme);
  if (els.themeToggle) {
    const dark = theme === "dark";
    els.themeToggle.setAttribute("aria-pressed", String(dark));
    els.themeToggle.setAttribute("aria-label", dark ? ui().lichtAan : ui().donkerAan);
    els.themeToggle.title = dark ? ui().licht : ui().donker;
    const icon = els.themeToggle.querySelector(".theme-icon");
    if (icon) icon.textContent = dark ? "☀" : "☾";
  }
}

function setFontScale(scale) {
  const clamped = Math.min(FONT_MAX, Math.max(FONT_MIN, Math.round(scale * 100) / 100));
  state.fontScale = clamped;
  document.documentElement.style.setProperty("--reading-scale", String(clamped));
  localStorage.setItem("gebeden-fontscale", String(clamped));
  if (els.fontSmaller) els.fontSmaller.disabled = clamped <= FONT_MIN + 1e-9;
  if (els.fontLarger) els.fontLarger.disabled = clamped >= FONT_MAX - 1e-9;
}

/* ---------- Init ---------- */
function init() {
  els.langSlot.outerHTML = langControlHTML({ groupClass: "lang-pair-header" });
  bindLangControl(els.header);

  setTheme(state.theme);
  setFontScale(state.fontScale);
  if (els.fontSmaller)
    els.fontSmaller.addEventListener("click", () => setFontScale(state.fontScale - FONT_STEP));
  if (els.fontLarger)
    els.fontLarger.addEventListener("click", () => setFontScale(state.fontScale + FONT_STEP));
  if (els.themeToggle) {
    els.themeToggle.addEventListener("click", () =>
      setTheme(state.theme === "dark" ? "light" : "dark")
    );
  }

  if (els.headerToggle) {
    els.headerToggle.addEventListener("click", () => setHeaderOpen(!state.headerOpen));
  }
  /* Een gebedsvorm openen klapt op een smal scherm de balk weer in. */
  els.devotionBtns.forEach((b) =>
    b.addEventListener("click", () => {
      if (isNarrow()) setHeaderOpen(false);
    })
  );

  els.search.addEventListener("input", (e) => {
    state.query = e.target.value;
    renderList();
  });

  if (els.sidebarToggle) {
    els.sidebarToggle.addEventListener("click", () =>
      setSidebarOpen(!state.sidebarOpen)
    );
  }

  const fromHash = decodeURIComponent(location.hash.replace(/^#/, ""));
  const initial = prayers.find((p) => p.key === fromHash) || prayers[0];
  state.activeKey = initial ? initial.key : null;
  if (state.activeKey) {
    const cat = categoryOf(state.activeKey);
    if (cat) state.expanded.add(cat);
  }

  const renderAll = () => {
    applyStaticTexts();
    updateSidebarLabel();
    renderList();
    renderView();
  };
  onLangChange(renderAll);
  renderAll();

  /* Eén falende module mag de andere niet meetrekken. */
  const safeInit = (naam, fn) => {
    try {
      fn();
    } catch (err) {
      console.error(`Kon ${naam} niet initialiseren:`, err);
    }
  };
  safeInit("rozenkrans", initRosary);
  safeInit("maria-antifoon", initAntiphons);
  safeInit("novena", initNovena);
  safeInit("kruisweg", initKruisweg);
}

init();
