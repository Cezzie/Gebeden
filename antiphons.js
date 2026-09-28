import { SEED } from "./seed.js";

/* De vier seizoensgebonden Maria-antifonen, met hun tekst uit seed.js. */
const byKey = Object.fromEntries(SEED.prayers.map((p) => [p.key, p]));

function fromSeed(seedKey) {
  const p = byKey[seedKey];
  const out = { source_url: p.source_url };
  for (const l of ["nl", "en", "pt", "la"]) {
    out[`title_${l}`] = p[`title_${l}`];
    out[`text_${l}`] = p[`text_${l}`];
  }
  return out;
}

const META = {
  alma: {
    key: "alma",
    seedKey: "alma_redemptoris_mater",
    label: "Alma Redemptoris",
    period_nl: "Advent en Kersttijd — van de eerste zondag van de Advent tot Maria Lichtmis (2 februari)",
    period_en: "Advent and Christmastide — from the First Sunday of Advent to the Presentation of the Lord (2 February)",
    period_pt: "Advento e Natal — do I Domingo do Advento à Apresentação do Senhor (2 de fevereiro)",
  },
  ave_regina: {
    key: "ave_regina",
    seedKey: "ave_regina_caelorum",
    label: "Ave Regina cælorum",
    period_nl: "Van Maria Lichtmis (2 februari) tot Woensdag in de Goede Week",
    period_en: "From the Presentation of the Lord (2 February) to Wednesday of Holy Week",
    period_pt: "Da Apresentação do Senhor (2 de fevereiro) até Quarta-feira da Semana Santa",
  },
  regina_caeli: {
    key: "regina_caeli",
    seedKey: "regina_caeli",
    label: "Regina caeli",
    period_nl: "Paastijd — van Pasen tot Pinksteren",
    period_en: "Eastertide — from Easter to Pentecost",
    period_pt: "Tempo Pascal — da Páscoa ao Pentecostes",
  },
  salve: {
    key: "salve",
    seedKey: "salve_regina",
    label: "Salve Regina",
    period_nl: "Door het jaar — van na Pinksteren tot de Advent",
    period_en: "Ordinary Time — from after Pentecost until Advent",
    period_pt: "Tempo Comum — de depois do Pentecostes até ao Advento",
  },
};

export const ANTIPHON_ORDER = ["alma", "ave_regina", "regina_caeli", "salve"];

export function getAntiphon(key) {
  const meta = META[key] || META.salve;
  return { ...meta, ...fromSeed(meta.seedKey) };
}

/* ---------- Datums in het liturgisch jaar ---------- */
function addDays(date, days) {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

function dateOnly(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/* Paaszondag (Anonieme Gregoriaanse / Meeus-Jones-Butcher algoritme). */
function easterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = maart, 4 = april
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

/* Eerste zondag van de Advent: vier zondagen vóór Kerstmis. */
function firstAdventSunday(year) {
  const xmas = new Date(year, 11, 25);
  const dow = xmas.getDay(); // 0 = zondag
  const back = (dow === 0 ? 7 : dow) + 21;
  return addDays(xmas, -back);
}

/*
 * Welke antifoon is op een gegeven datum van toepassing?
 * Grenzen sluiten naadloos op elkaar aan; de dagen van het Paastriduüm
 * (do–za van de Goede Week) vallen onder Regina caeli (vereenvoudiging).
 */
export function currentAntiphonKey(now = new Date()) {
  const d = dateOnly(now);
  const year = d.getFullYear();
  const candlemas = new Date(year, 1, 2); // 2 februari
  const easter = easterSunday(year);
  const holyWednesday = addDays(easter, -4);
  const pentecost = addDays(easter, 49);
  const advent = firstAdventSunday(year);

  if (d < candlemas) return "alma"; // 1 jan – 1 feb (voortzetting van de Advent)
  if (d <= holyWednesday) return "ave_regina"; // 2 feb – Woensdag Goede Week
  if (d <= pentecost) return "regina_caeli"; // – Pinksteren
  if (d < advent) return "salve"; // – tot vlak voor de Advent
  return "alma"; // Advent – 31 dec
}
