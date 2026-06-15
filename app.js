import { SEED } from "./seed.js";

const prayers = SEED.prayers;

const CATEGORY_LABELS = {
  standaardgebed: "Standaardgebeden",
  "maria-antifoon": "Maria-antifoon",
  antifoon: "Antifonen",
  litanie: "Litanieën",
  evangelielofzang: "Evangelielofzangen",
  hymne: "Hymnen",
};

const CATEGORY_ORDER = [
  "standaardgebed",
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
};

const state = {
  lang: localStorage.getItem("gebeden-lang") || "both",
  query: "",
  activeKey: null,
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

  for (const [cat, items] of groupByCategory(visible)) {
    const heading = document.createElement("h3");
    heading.className = "cat-heading";
    heading.textContent = categoryLabel(cat);
    els.list.appendChild(heading);

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
      els.list.appendChild(btn);
    }
  }
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

/* ---------- Init ---------- */
function init() {
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

  renderList();
  renderView();
}

init();
