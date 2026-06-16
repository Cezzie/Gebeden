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

/* Gebeden die niet in de hoofdverzameling staan, maar de rozenkrans nodig heeft. */
const APOSTLES_CREED = {
  title_nl: "Geloofsbelijdenis",
  title_la: "Symbolum Apostolorum",
  text_nl:
    "Ik geloof in God, de almachtige Vader,\nSchepper van hemel en aarde.\nEn in Jezus Christus, zijn enige Zoon, onze Heer,\ndie ontvangen is van de Heilige Geest,\ngeboren uit de Maagd Maria;\ndie geleden heeft onder Pontius Pilatus,\nis gekruisigd, gestorven en begraven;\ndie nedergedaald is ter helle,\nde derde dag verrezen uit de doden;\ndie opgevaren is ten hemel,\nzit aan de rechterhand van God, de almachtige Vader;\nvandaar zal Hij komen oordelen\nde levenden en de doden.\nIk geloof in de Heilige Geest;\nde heilige katholieke Kerk,\nde gemeenschap van de heiligen;\nde vergeving van de zonden;\nde verrijzenis van het lichaam;\nen het eeuwig leven.\nAmen.",
  text_la:
    "Credo in Deum Patrem omnipoténtem,\nCreatórem caeli et terrae.\nEt in Iesum Christum, Fílium eius únicum, Dóminum nostrum,\nqui concéptus est de Spíritu Sancto,\nnatus ex María Vírgine,\npassus sub Póntio Piláto,\ncrucifíxus, mórtuus, et sepúltus;\ndescéndit ad ínferos;\ntértia die resurréxit a mórtuis;\nascéndit ad caelos;\nsedet ad déxteram Dei Patris omnipoténtis;\ninde ventúrus est iudicáre vivos et mórtuos.\nCredo in Spíritum Sanctum,\nsanctam Ecclésiam cathólicam,\nSanctórum communiónem,\nremissiónem peccatórum,\ncarnis resurrectiónem,\nvitam aetérnam.\nAmen.",
};

const FATIMA = {
  title_nl: "Zuchtgebedje van Fatima",
  title_la: "Oratio Fatimae",
  text_nl:
    "O mijn Jezus, vergeef ons onze zonden,\nbehoed ons voor het vuur van de hel,\nbreng alle zielen naar de hemel,\nvooral die uw barmhartigheid het meest nodig hebben.",
  text_la:
    "Dómine Iesu, dimítte nobis débita nostra,\nsalva nos ab igne inferióri,\nperduc in caelum omnes ánimas,\npraesértim eas, quae misericórdiae tuae máxime índigent.",
};

/* De vier reeksen van geheimen. */
export const MYSTERY_SETS = {
  blijde: {
    key: "blijde",
    title_nl: "Blijde Geheimen",
    title_la: "Mysteria gaudiosa",
    mysteries: [
      { title_nl: "De aankondiging van de Engel aan Maria", title_la: "Annuntiatio" },
      { title_nl: "Het bezoek van Maria aan Elisabeth", title_la: "Visitatio" },
      { title_nl: "De geboorte van Jezus", title_la: "Nativitas Domini" },
      { title_nl: "De opdracht van Jezus in de tempel", title_la: "Praesentatio in templo" },
      { title_nl: "De terugvinding van Jezus in de tempel", title_la: "Inventio in templo" },
    ],
  },
  lichtende: {
    key: "lichtende",
    title_nl: "Lichtende Geheimen",
    title_la: "Mysteria luminosa",
    mysteries: [
      { title_nl: "De doop van Jezus in de Jordaan", title_la: "Baptismus apud Iordanem" },
      { title_nl: "De openbaring op de bruiloft van Kana", title_la: "Autorevelatio apud Cana" },
      { title_nl: "De verkondiging van het Rijk Gods", title_la: "Regni Dei proclamatio" },
      { title_nl: "De gedaanteverandering van Jezus", title_la: "Transfiguratio" },
      { title_nl: "De instelling van de Eucharistie", title_la: "Eucharistiae institutio" },
    ],
  },
  droevige: {
    key: "droevige",
    title_nl: "Droevige Geheimen",
    title_la: "Mysteria dolorosa",
    mysteries: [
      { title_nl: "De doodsangst van Jezus in de hof", title_la: "Agonia in horto" },
      { title_nl: "De geseling van Jezus", title_la: "Flagellatio" },
      { title_nl: "De doornenkroning van Jezus", title_la: "Coronatio spinis" },
      { title_nl: "De kruisdraging van Jezus", title_la: "Baiulatio crucis" },
      { title_nl: "De kruisiging en dood van Jezus", title_la: "Crucifixio et mors" },
    ],
  },
  glorievolle: {
    key: "glorievolle",
    title_nl: "Glorievolle Geheimen",
    title_la: "Mysteria gloriosa",
    mysteries: [
      { title_nl: "De verrijzenis van Jezus", title_la: "Resurrectio" },
      { title_nl: "De hemelvaart van Jezus", title_la: "Ascensio" },
      { title_nl: "De nederdaling van de Heilige Geest", title_la: "Descensus Spiritus Sancti" },
      { title_nl: "De tenhemelopneming van Maria", title_la: "Assumptio Mariae" },
      { title_nl: "De kroning van Maria in de hemel", title_la: "Coronatio Mariae" },
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
  steps.push({ kind: "credo", kicker: "Op het kruisbeeld", ...APOSTLES_CREED });
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
      title_nl: `${m.title_nl}`,
      title_la: `${m.title_la}`,
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
    steps.push({ kind: "fatima", kicker: `${decade}ᵉ tientje · slot`, decade, ...FATIMA });
  });

  steps.push({ kind: "salve", kicker: "Slotgebed", ...fromSeed("salve_regina") });
  steps.push({ kind: "kruisteken", kicker: "Besluit", ...fromSeed("signum_crucis") });

  return steps;
}
