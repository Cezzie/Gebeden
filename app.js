import { SEED } from "./seed.js";
import { initRosary } from "./rosary-ui.js";
import { initAntiphons } from "./antiphons-ui.js";

const prayers = SEED.prayers;

const CATEGORY_LABELS = {
  standaardgebed: "Standaardgebeden",
  geloofsbelijdenis: "Geloofsbelijdenis",
  "maria-antifoon": "Maria-antifoon",
  antifoon: "Antifonen",
  litanie: "Litanieën",
  evangelielofzang: "Evangelielofzangen",
  hymne: "Hymnen",
};

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
  list: document.getElementById("prayer-list"),
  view: document.getElementById("prayer-view"),
  search: document.getElementById("search"),
  langButtons: Array.from(document.querySelectorAll(".lang-btn")),
  themeToggle: document.getElementById("theme-toggle"),
  fontSmaller: document.getElementById("font-smaller"),
  fontLarger: document.getElementById("font-larger"),
};

const FONT_MIN = 0.8;
const FONT_MAX = 1.6;
const FONT_STEP = 0.1;

const prefersDark =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const state = {
  lang: localStorage.getItem("gebeden-lang") || "both",
  theme: localStorage.getItem("gebeden-theme") || (prefersDark ? "dark" : "light"),
  fontScale: parseFloat(localStorage.getItem("gebeden-fontscale")) || 1,
  query: "",
  activeKey: null,
  expanded: new Set(),
};

/* ---------- Helpers ---------- */
function categoryLabel(cat) {
  return CATEGORY_LABELS[cat] || (cat ? cat[0].toUpperCase() + cat.slice(1) : "Overig");
}

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function matchesQuery(prayer, q) {
  if (!q) return true;
  const haystack = normalize(
    [prayer.title_nl, prayer.title_la, prayer.text_nl, prayer.text_la].join(" ")
  );
  return haystack.includes(normalize(q));
}

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

/* ---------- Sidebar ---------- */
function renderList() {
  const visible = prayers.filter((p) => matchesQuery(p, state.query));
  els.list.innerHTML = "";

  if (visible.length === 0) {
    const empty = document.createElement("p");
    empty.className = "list-empty";
    empty.textContent = "Geen gebeden gevonden.";
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

      const nl = document.createElement("span");
      nl.textContent = p.title_nl;
      btn.appendChild(nl);

      if (p.title_la && p.title_la !== p.title_nl) {
        const la = document.createElement("span");
        la.className = "li-la";
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

  const showNl = state.lang === "nl" || state.lang === "both";
  const showLa = state.lang === "la" || state.lang === "both";
  const both = state.lang === "both";

  const view = document.createElement("div");

  // Head
  const head = document.createElement("header");
  head.className = "prayer-head";

  const h2 = document.createElement("h2");
  h2.textContent = showNl ? prayer.title_nl : prayer.title_la;
  head.appendChild(h2);

  const subtitleText = showNl ? prayer.title_la : prayer.title_nl;
  if (subtitleText && subtitleText !== h2.textContent) {
    const sub = document.createElement("p");
    sub.className = "subtitle";
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

  const rule = document.createElement("div");
  rule.className = "rule";
  view.appendChild(rule);

  // Text grid
  const grid = document.createElement("div");
  grid.className = "text-grid" + (both ? " both" : "");

  if (showNl) grid.appendChild(makeColumn("nl", "Nederlands", prayer.text_nl, both));
  if (showLa) grid.appendChild(makeColumn("la", "Latijn", prayer.text_la, both));
  view.appendChild(grid);

  // Notes
  if (prayer.notes) {
    const notes = document.createElement("div");
    notes.className = "prayer-notes";
    const p = document.createElement("p");
    p.style.margin = "0";
    p.textContent = prayer.notes;
    notes.appendChild(p);
    view.appendChild(notes);
  }

  els.view.innerHTML = "";
  els.view.appendChild(view);
}

function prayerToText(prayer) {
  const showNl = state.lang === "nl" || state.lang === "both";
  const showLa = state.lang === "la" || state.lang === "both";
  const blocks = [];
  if (showNl && prayer.text_nl) {
    blocks.push(prayer.title_nl + "\n\n" + prayer.text_nl);
  }
  if (showLa && prayer.text_la) {
    blocks.push(prayer.title_la + "\n\n" + prayer.text_la);
  }
  return blocks.join("\n\n— — —\n\n");
}

function makeCopyButton(prayer) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "copy-btn";
  btn.innerHTML =
    '<span class="copy-icon" aria-hidden="true">⧉</span><span class="copy-label">Kopieer</span>';

  const label = btn.querySelector(".copy-label");
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
      label.textContent = "Gekopieerd";
    } catch {
      label.textContent = "Mislukt";
    }
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      btn.classList.remove("is-copied");
      label.textContent = "Kopieer";
    }, 1800);
  });

  return btn;
}

function makeColumn(langCode, label, text, showLabel) {
  const col = document.createElement("div");
  col.className = "text-col " + langCode;

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
function selectPrayer(key) {
  state.activeKey = key;
  const cat = categoryOf(key);
  if (cat) state.expanded.add(cat);
  if (history.replaceState) {
    history.replaceState(null, "", "#" + key);
  } else {
    location.hash = key;
  }
  renderList();
  renderView();
}

function setLang(lang) {
  state.lang = lang;
  localStorage.setItem("gebeden-lang", lang);
  els.langButtons.forEach((b) =>
    b.classList.toggle("is-active", b.dataset.lang === lang)
  );
  renderView();
}

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("gebeden-theme", theme);
  if (els.themeToggle) {
    const dark = theme === "dark";
    els.themeToggle.setAttribute("aria-pressed", String(dark));
    els.themeToggle.setAttribute(
      "aria-label",
      dark ? "Lichte modus inschakelen" : "Donkere modus inschakelen"
    );
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

  els.langButtons.forEach((b) =>
    b.addEventListener("click", () => setLang(b.dataset.lang))
  );
  setLang(state.lang);

  els.search.addEventListener("input", (e) => {
    state.query = e.target.value;
    renderList();
  });

  const fromHash = decodeURIComponent(location.hash.replace(/^#/, ""));
  const initial = prayers.find((p) => p.key === fromHash) || prayers[0];
  state.activeKey = initial ? initial.key : null;
  if (state.activeKey) {
    const cat = categoryOf(state.activeKey);
    if (cat) state.expanded.add(cat);
  }

  renderList();
  renderView();

  initRosary();
  initAntiphons();
}

init();
