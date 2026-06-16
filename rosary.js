import { SEED } from "./seed.js";

/* Korte gebeden uit de bestaande verzameling hergebruiken, op sleutel. */
const byKey = Object.fromEntries(SEED.prayers.map((p) => [p.key, p]));

function fromSeed(key) {
  const p = byKey[key];
  return {
    title_nl: p.title_nl,
    title_la: p.title_la,
    text_nl: p.text_nl,
    text_la: p.text_la,
  };
}

/* De vier reeksen van geheimen. */
export const MYSTERY_SETS = {
  blijde: {
    key: "blijde",
    title_nl: "Blijde Geheimen",
    title_la: "Mystéria Gaudiósa",
    days_nl: "maandag en zaterdag",
    mysteries: [
      {
        title_nl: "De engel Gabriël brengt de blijde boodschap aan Maria",
        title_la: "Annuntiatiónem Beátæ Maríæ Vírginis",
      },
      {
        title_nl: "Maria bezoekt haar nicht Elisabeth",
        title_la: "Visitatiónem Beátæ Maríæ Vírginis",
      },
      {
        title_nl: "Jezus wordt geboren in een stal van Bethlehem",
        title_la: "Nativitátem Dómini nostri Iesu Christi",
      },
      {
        title_nl: "Jezus wordt in de tempel opgedragen",
        title_la: "Oblatiónem Dómini nostri Iesu Christi",
      },
      {
        title_nl: "Jezus wordt in de tempel teruggevonden",
        title_la: "Inventiónem Dómini nostri Iesu Christi in templo",
      },
    ],
  },
  lichtende: {
    key: "lichtende",
    title_nl: "Geheimen van het Licht",
    title_la: "Mystéria Luminósa",
    days_nl: "donderdag",
    mysteries: [
      {
        title_nl: "Jezus wordt gedoopt in de Jordaan",
        title_la: "Baptisma Iesu Christe apud Iordanem",
      },
      {
        title_nl: "Jezus openbaart zich op de bruiloft van Kana",
        title_la: "Suirevelatio Iesu Christe inter Cananense matrimonium",
      },
      {
        title_nl: "Jezus verkondigt het Rijk van God en roept op tot bekering",
        title_la: "Regni Dei proclamatio ab Iesu Christe atque invitatio ad conversionem",
      },
      {
        title_nl: "Jezus verandert van gedaante",
        title_la: "Transfiguratio Iesu Christi super Montem Thabor",
      },
      {
        title_nl: "Jezus stelt de Eucharistie in bij het Laatste Avondmaal",
        title_la: "Eucharistae institutio ab Iesu Christe",
      },
    ],
  },
  droevige: {
    key: "droevige",
    title_nl: "Droevige Geheimen",
    title_la: "Mystéria Dolorósa",
    days_nl: "dinsdag en vrijdag",
    mysteries: [
      {
        title_nl: "Jezus bidt in doodsangst tot zijn hemelse Vader",
        title_la: "Agóniam Dómini nostri Iesu Christi in horto",
      },
      {
        title_nl: "Jezus wordt gegeseld",
        title_la: "Flagellatiónem Dómini nostri Iesu Christi",
      },
      {
        title_nl: "Jezus wordt met doornen gekroond",
        title_la: "Coronatiónem spinis Dómini nostri Iesu Christi",
      },
      {
        title_nl: "Jezus draagt Zijn kruis naar de berg van Calvarië",
        title_la: "Bajulatiónem Crucis",
      },
      {
        title_nl: "Jezus sterft aan het kruis",
        title_la: "Crucifixiónem Dómini nostri Iesu Christi",
      },
    ],
  },
  glorievolle: {
    key: "glorievolle",
    title_nl: "Glorievolle Geheimen",
    title_la: "Mystéria Gloriósa",
    days_nl: "zondag en woensdag",
    mysteries: [
      {
        title_nl: "Jezus verrijst uit de doden",
        title_la: "Resurrectiónem Dómini nostri Iesu Christi a mórtuis",
      },
      {
        title_nl: "Jezus stijgt op ten hemel",
        title_la: "Ascensiónem Dómini nostri Iesu Christi in cáelum",
      },
      {
        title_nl: "De Heilige Geest daalt neer over de apostelen",
        title_la: "Missiónem Spíritus Sancti in discípulos",
      },
      {
        title_nl: "Maria wordt in de hemel opgenomen",
        title_la: "Assumptiónem Beátæ Maríæ Vírginis in cáelum",
      },
      {
        title_nl: "Maria wordt in de hemel gekroond",
        title_la: "Coronatiónem Beátæ Maríæ Vírginis in cáelum",
      },
    ],
  },
};

/* Traditionele indeling per weekdag (getDay: 0 = zondag ... 6 = zaterdag). */
const WEEKDAY_SET = [
  "glorievolle", // zondag
  "blijde", // maandag
  "droevige", // dinsdag
  "glorievolle", // woensdag
  "lichtende", // donderdag
  "droevige", // vrijdag
  "blijde", // zaterdag
];

export function defaultMysteryKey(weekday) {
  return WEEKDAY_SET[weekday] ?? "blijde";
}

export const MYSTERY_ORDER = ["blijde", "lichtende", "droevige", "glorievolle"];

/*
 * Bouwt de volledige reeks stappen voor één rozenhoedje.
 * Elke stap heeft: kind, een titel/tekst-paar, en context voor de voortgang.
 */
export function buildRosarySteps(setKey) {
  const set = MYSTERY_SETS[setKey] || MYSTERY_SETS.blijde;
  const steps = [];

  steps.push({ kind: "kruisteken", kicker: "Begin", ...fromSeed("signum_crucis") });
  steps.push({ kind: "credo", kicker: "Op het kruisbeeld", ...fromSeed("symbolum_apostolorum") });
  steps.push({ kind: "pater", kicker: "Eerste grote kraal", ...fromSeed("our_father") });

  const virtues = ["om geloof", "om hoop", "om liefde"];
  virtues.forEach((v, i) => {
    steps.push({
      kind: "ave",
      kicker: "Drie weesgegroeten · " + v,
      bead: i + 1,
      beadTotal: 3,
      ...fromSeed("hail_mary"),
    });
  });

  steps.push({ kind: "gloria", kicker: "Inleiding", ...fromSeed("gloria_patri") });

  set.mysteries.forEach((m, di) => {
    const decade = di + 1;
    steps.push({
      kind: "geheim",
      kicker: `${decade}ᵉ geheim · ${set.title_nl}`,
      decade,
      title_nl: m.title_nl,
      title_la: m.title_la,
      text_nl: "Wij overwegen dit geheim en bidden om de vruchten ervan.",
      text_la: "Hoc mysterium contemplámur.",
      mysteryHeading: true,
    });
    steps.push({ kind: "pater", kicker: `${decade}ᵉ tientje`, decade, ...fromSeed("our_father") });
    for (let b = 1; b <= 10; b++) {
      steps.push({
        kind: "ave",
        kicker: `${decade}ᵉ tientje`,
        decade,
        bead: b,
        beadTotal: 10,
        ...fromSeed("hail_mary"),
      });
    }
    steps.push({ kind: "gloria", kicker: `${decade}ᵉ tientje`, decade, ...fromSeed("gloria_patri") });
    steps.push({ kind: "fatima", kicker: `${decade}ᵉ tientje · slot`, decade, ...fromSeed("oratio_fatima") });
  });

  steps.push({ kind: "salve", kicker: "Slotgebed", ...fromSeed("salve_regina") });
  steps.push({ kind: "kruisteken", kicker: "Besluit", ...fromSeed("signum_crucis") });

  return steps;
}
