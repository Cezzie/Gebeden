import { SEED } from "./seed.js";

/* Korte gebeden uit de bestaande verzameling hergebruiken, op sleutel. */
const byKey = Object.fromEntries(SEED.prayers.map((p) => [p.key, p]));

function fromSeed(key) {
  const p = byKey[key];
  const out = {};
  for (const l of ["nl", "en", "pt", "la"]) {
    out[`title_${l}`] = p[`title_${l}`];
    out[`text_${l}`] = p[`text_${l}`];
  }
  return out;
}

/*
 * De vier reeksen van geheimen. Engels naar het Compendium van de Catechismus
 * (vatican.va), Portugees naar het Heiligdom van Fátima (fatima.pt).
 */
export const MYSTERY_SETS = {
  blijde: {
    key: "blijde",
    title_nl: "Blijde Geheimen",
    title_en: "The Joyful Mysteries",
    title_pt: "Mistérios da Alegria",
    title_la: "Mystéria Gaudiósa",
    days_nl: "maandag en zaterdag",
    days_en: "Monday and Saturday",
    days_pt: "segunda-feira e sábado",
    mysteries: [
      {
        title_nl: "De engel Gabriël brengt de blijde boodschap aan Maria",
        title_en: "The Annunciation",
        title_pt: "A anunciação do Anjo a Nossa Senhora",
        title_la: "Annuntiatiónem Beátæ Maríæ Vírginis",
      },
      {
        title_nl: "Maria bezoekt haar nicht Elisabeth",
        title_en: "The Visitation",
        title_pt: "A visitação de Nossa Senhora a Santa Isabel",
        title_la: "Visitatiónem Beátæ Maríæ Vírginis",
      },
      {
        title_nl: "Jezus wordt geboren in een stal van Bethlehem",
        title_en: "The Nativity",
        title_pt: "O nascimento de Jesus em Belém",
        title_la: "Nativitátem Dómini nostri Iesu Christi",
      },
      {
        title_nl: "Jezus wordt in de tempel opgedragen",
        title_en: "The Presentation",
        title_pt: "A apresentação do Menino Jesus no Templo",
        title_la: "Oblatiónem Dómini nostri Iesu Christi",
      },
      {
        title_nl: "Jezus wordt in de tempel teruggevonden",
        title_en: "The Finding in the Temple",
        title_pt: "O encontro do Menino Jesus no Templo entre os Doutores",
        title_la: "Inventiónem Dómini nostri Iesu Christi in templo",
      },
    ],
  },
  lichtende: {
    key: "lichtende",
    title_nl: "Geheimen van het Licht",
    title_en: "The Mysteries of Light",
    title_pt: "Mistérios da Luz",
    title_la: "Mystéria Luminósa",
    days_nl: "donderdag",
    days_en: "Thursday",
    days_pt: "quinta-feira",
    mysteries: [
      {
        title_nl: "Jezus wordt gedoopt in de Jordaan",
        title_en: "The Baptism of Jesus",
        title_pt: "O batismo de Jesus no Rio Jordão",
        title_la: "Baptisma Iesu Christe apud Iordanem",
      },
      {
        title_nl: "Jezus openbaart zich op de bruiloft van Kana",
        title_en: "The Wedding Feast of Cana",
        title_pt: "A revelação de Jesus nas Bodas de Caná",
        title_la: "Suirevelatio Iesu Christe inter Cananense matrimonium",
      },
      {
        title_nl: "Jezus verkondigt het Rijk van God en roept op tot bekering",
        title_en: "The Proclamation of the Kingdom, with the call to Conversion",
        title_pt: "O anúncio do Reino de Deus com o convite à conversão",
        title_la: "Regni Dei proclamatio ab Iesu Christe atque invitatio ad conversionem",
      },
      {
        title_nl: "Jezus verandert van gedaante",
        title_en: "The Transfiguration",
        title_pt: "A transfiguração do Senhor",
        title_la: "Transfiguratio Iesu Christi super Montem Thabor",
      },
      {
        title_nl: "Jezus stelt de Eucharistie in bij het Laatste Avondmaal",
        title_en: "The Institution of the Eucharist",
        title_pt: "A instituição da Eucaristia",
        title_la: "Eucharistae institutio ab Iesu Christe",
      },
    ],
  },
  droevige: {
    key: "droevige",
    title_nl: "Droevige Geheimen",
    title_en: "The Sorrowful Mysteries",
    title_pt: "Mistérios da Dor",
    title_la: "Mystéria Dolorósa",
    days_nl: "dinsdag en vrijdag",
    days_en: "Tuesday and Friday",
    days_pt: "terça-feira e sexta-feira",
    mysteries: [
      {
        title_nl: "Jezus bidt in doodsangst tot zijn hemelse Vader",
        title_en: "The Agony in the Garden",
        title_pt: "A agonia de Jesus no Jardim das Oliveiras",
        title_la: "Agóniam Dómini nostri Iesu Christi in horto",
      },
      {
        title_nl: "Jezus wordt gegeseld",
        title_en: "The Scourging at the Pillar",
        title_pt: "A flagelação de Jesus",
        title_la: "Flagellatiónem Dómini nostri Iesu Christi",
      },
      {
        title_nl: "Jezus wordt met doornen gekroond",
        title_en: "The Crowning with Thorns",
        title_pt: "A coroação de espinhos",
        title_la: "Coronatiónem spinis Dómini nostri Iesu Christi",
      },
      {
        title_nl: "Jezus draagt Zijn kruis naar de berg van Calvarië",
        title_en: "The Carrying of the Cross",
        title_pt: "Jesus a caminho do Calvário e o encontro com sua Mãe",
        title_la: "Bajulatiónem Crucis",
      },
      {
        title_nl: "Jezus sterft aan het kruis",
        title_en: "The Crucifixion",
        title_pt: "A crucificação e morte de Jesus",
        title_la: "Crucifixiónem Dómini nostri Iesu Christi",
      },
    ],
  },
  glorievolle: {
    key: "glorievolle",
    title_nl: "Glorievolle Geheimen",
    title_en: "The Glorious Mysteries",
    title_pt: "Mistérios da Glória",
    title_la: "Mystéria Gloriósa",
    days_nl: "zondag en woensdag",
    days_en: "Sunday and Wednesday",
    days_pt: "domingo e quarta-feira",
    mysteries: [
      {
        title_nl: "Jezus verrijst uit de doden",
        title_en: "The Resurrection",
        title_pt: "A ressurreição de Jesus",
        title_la: "Resurrectiónem Dómini nostri Iesu Christi a mórtuis",
      },
      {
        title_nl: "Jezus stijgt op ten hemel",
        title_en: "The Ascension",
        title_pt: "A ascensão de Jesus ao Céu",
        title_la: "Ascensiónem Dómini nostri Iesu Christi in cáelum",
      },
      {
        title_nl: "De Heilige Geest daalt neer over de apostelen",
        title_en: "The Descent of the Holy Spirit",
        title_pt: "A descida do Espírito Santo sobre Nossa Senhora e os Apóstolos",
        title_la: "Missiónem Spíritus Sancti in discípulos",
      },
      {
        title_nl: "Maria wordt in de hemel opgenomen",
        title_en: "The Assumption",
        title_pt: "A assunção de Nossa Senhora",
        title_la: "Assumptiónem Beátæ Maríæ Vírginis in cáelum",
      },
      {
        title_nl: "Maria wordt in de hemel gekroond",
        title_en: "The Coronation of Mary Queen of Heaven and Earth",
        title_pt: "A coroação de Nossa Senhora como Rainha dos Anjos e dos Santos",
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

export const MYSTERY_ORDER = ["blijde", "droevige", "glorievolle", "lichtende"];

/* Vaste stapkoppen per taal. */
const KICKERS = {
  nl: {
    begin: "Begin",
    kruisbeeld: "Op het kruisbeeld",
    groteKraal: "Eerste grote kraal",
    drie: (deugd) => "Drie weesgegroeten · " + deugd,
    deugden: ["om geloof", "om hoop", "om liefde"],
    inleiding: "Inleiding",
    geheim: (n, set) => `${n}ᵉ geheim · ${set}`,
    tientje: (n) => `${n}ᵉ tientje`,
    slot: "slot",
    slotgebed: "Slotgebed",
    besluit: "Besluit",
  },
  en: {
    begin: "Beginning",
    kruisbeeld: "On the crucifix",
    groteKraal: "First large bead",
    drie: (deugd) => "Three Hail Marys · " + deugd,
    deugden: ["for faith", "for hope", "for charity"],
    inleiding: "Introduction",
    geheim: (n, set) => `${ordinalEn(n)} mystery · ${set}`,
    tientje: (n) => `${ordinalEn(n)} decade`,
    slot: "closing",
    slotgebed: "Closing prayer",
    besluit: "Conclusion",
  },
  pt: {
    begin: "Início",
    kruisbeeld: "No crucifixo",
    groteKraal: "Primeira conta grande",
    drie: (deugd) => "Três Avé-Marias · " + deugd,
    deugden: ["pela fé", "pela esperança", "pela caridade"],
    inleiding: "Introdução",
    geheim: (n, set) => `${n}.º mistério · ${set}`,
    tientje: (n) => `${n}.ª dezena`,
    slot: "conclusão",
    slotgebed: "Oração final",
    besluit: "Conclusão",
  },
};

function ordinalEn(n) {
  return n + (n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th");
}

/*
 * Bouwt de volledige reeks stappen voor één rozenhoedje, met stapkoppen
 * in de gekozen taal. Elke stap heeft: kind, titels/teksten in alle talen,
 * en context voor de voortgang.
 */
export function buildRosarySteps(setKey, lang = "nl") {
  const set = MYSTERY_SETS[setKey] || MYSTERY_SETS.blijde;
  const k = KICKERS[lang] || KICKERS.nl;
  const setTitle = set[`title_${lang}`] || set.title_nl;
  const steps = [];

  steps.push({ kind: "kruisteken", kicker: k.begin, ...fromSeed("signum_crucis") });
  steps.push({ kind: "credo", kicker: k.kruisbeeld, ...fromSeed("symbolum_apostolorum") });
  steps.push({ kind: "pater", kicker: k.groteKraal, ...fromSeed("our_father") });

  k.deugden.forEach((v, i) => {
    steps.push({
      kind: "ave",
      kicker: k.drie(v),
      bead: i + 1,
      beadTotal: 3,
      ...fromSeed("hail_mary"),
    });
  });

  steps.push({ kind: "gloria", kicker: k.inleiding, ...fromSeed("gloria_patri") });

  set.mysteries.forEach((m, di) => {
    const decade = di + 1;
    steps.push({
      kind: "geheim",
      kicker: k.geheim(decade, setTitle),
      decade,
      title_nl: m.title_nl,
      title_en: m.title_en,
      title_pt: m.title_pt,
      title_la: m.title_la,
      mysteryHeading: true,
    });
    steps.push({ kind: "pater", kicker: k.tientje(decade), decade, ...fromSeed("our_father") });
    for (let b = 1; b <= 10; b++) {
      steps.push({
        kind: "ave",
        kicker: k.tientje(decade),
        decade,
        bead: b,
        beadTotal: 10,
        ...fromSeed("hail_mary"),
      });
    }
    steps.push({ kind: "gloria", kicker: k.tientje(decade), decade, ...fromSeed("gloria_patri") });
    steps.push({
      kind: "fatima",
      kicker: `${k.tientje(decade)} · ${k.slot}`,
      decade,
      ...fromSeed("oratio_fatima"),
    });
  });

  steps.push({ kind: "salve", kicker: k.slotgebed, ...fromSeed("salve_regina") });
  steps.push({ kind: "kruisteken", kicker: k.besluit, ...fromSeed("signum_crucis") });

  return steps;
}
