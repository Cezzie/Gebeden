import { SEED } from "./seed.js";
import { composeText } from "./compose.js";

/*
 * De zondagsmis: de orde van de mis, samengesteld uit de losse misgebeden
 * in seed.js (elke tekst bestaat maar één keer). Ingedeeld in delen
 * (openingsriten, woorddienst, …) met stappen; het eucharistisch gebed is
 * te kiezen. De wisselende delen (lezingen, gebeden van de dag, prefatie)
 * staan als aanduiding tussen haakjes.
 */

const by = Object.fromEntries(SEED.prayers.map((p) => [p.key, p]));

export const MIS = {
  title_nl: "De zondagsmis",
  title_en: "Sunday Mass",
  title_pt: "A Missa de domingo",
  title_la: "Ordo Missæ",
  subtitle_nl: "Orde van de mis om mee te lezen",
  subtitle_en: "The Order of Mass to follow along",
  subtitle_pt: "A ordem da Missa para acompanhar",
  intro_nl:
    "De hele mis in één doorlopende tekst. Kies hierboven het eucharistisch gebed dat de priester bidt. " +
    "De wisselende delen — lezingen, gebeden van de dag en prefatie — staan als aanduiding tussen haakjes.",
  intro_en:
    "The whole Mass as one continuous text. Choose above the Eucharistic Prayer the priest is using. " +
    "The variable parts — readings, prayers of the day and preface — are indicated in brackets.",
  intro_pt:
    "Toda a Missa num único texto seguido. Escolha acima a Oração Eucarística que o sacerdote reza. " +
    "As partes variáveis — leituras, orações do dia e prefácio — estão indicadas entre parênteses.",
};

/* Keuze van het eucharistisch gebed. Gebed II heeft een eigen prefatie (blok 0), die hier wegvalt. */
export const EG_ORDER = ["mis_eucharistisch_gebed_2", "mis_eucharistisch_gebed_3"];
export const EG = {
  mis_eucharistisch_gebed_2: {
    label: { nl: "Eucharistisch gebed II", en: "Eucharistic Prayer II", pt: "Oração Eucarística II", la: "Prex eucharística II" },
    short: { nl: "Gebed II", en: "Prayer II", pt: "Oração II", la: "Prex II" },
    from: 1,
  },
  mis_eucharistisch_gebed_3: {
    label: { nl: "Eucharistisch gebed III", en: "Eucharistic Prayer III", pt: "Oração Eucarística III", la: "Prex eucharística III" },
    short: { nl: "Gebed III", en: "Prayer III", pt: "Oração III", la: "Prex III" },
    from: 0,
  },
};

const T = (nl, en, pt, la) => ({ nl, en, pt, la });
const N = (nl, en, pt, la) => ({ note: T(`(${nl})`, `(${en})`, `(${pt})`, `(${la})`) });
const R = (ref, block, strip) => {
  const part = { ref };
  if (block !== undefined) part.block = block;
  if (strip) part.strip = strip;
  return part;
};
/* Eén blok uit de antwoorden van het volk, zonder de kopregel. */
const antwoord = (block) => R("mis_antwoorden", block, 1);
const priester = (block) => R("mis_priestergebeden", block, 1);

/* De delen van de mis, elk met zijn stappen. `{ eg: true }` is de plaats van het eucharistisch gebed. */
const SECTIONS = [
  {
    name: T("Openingsriten", "Introductory Rites", "Ritos iniciais", "Ritus initiales"),
    steps: [
      {
        title: T("Kruisteken en begroeting", "Sign of the Cross and greeting", "Sinal da cruz e saudação", "Signum crucis et salutatio"),
        parts: [R("signum_crucis"), antwoord(0)],
      },
      {
        title: T("Schuldbelijdenis", "Penitential Act", "Ato penitencial", "Actus pænitentialis"),
        parts: [priester(0), R("mis_schuldbelijdenis")],
      },
      { title: T("Kyrie", "Kyrie", "Kyrie", "Kýrie"), parts: [R("mis_kyrie")] },
      { title: T("Gloria", "Gloria", "Glória", "Glória in excélsis"), parts: [R("mis_gloria")] },
      {
        title: T("Openingsgebed", "Collect", "Oração coleta", "Collecta"),
        parts: [N("Openingsgebed van de dag", "Collect of the day", "Oração coleta do dia", "Collecta diei")],
      },
    ],
  },
  {
    name: T("Woorddienst", "Liturgy of the Word", "Liturgia da Palavra", "Liturgia verbi"),
    steps: [
      {
        title: T("Eerste lezing", "First Reading", "Primeira leitura", "Lectio prima"),
        parts: [N("Eerste lezing", "First Reading", "Primeira leitura", "Lectio prima"), antwoord(1)],
      },
      {
        title: T("Antwoordpsalm", "Responsorial Psalm", "Salmo responsorial", "Psalmus responsorius"),
        parts: [N("Antwoordpsalm", "Responsorial Psalm", "Salmo responsorial", "Psalmus responsorius")],
      },
      {
        title: T("Tweede lezing", "Second Reading", "Segunda leitura", "Lectio secunda"),
        parts: [N("Tweede lezing", "Second Reading", "Segunda leitura", "Lectio secunda"), antwoord(1)],
      },
      {
        title: T("Evangelie", "Gospel", "Evangelho", "Evangelium"),
        parts: [
          N("Vers voor het evangelie — Alleluia", "Gospel Acclamation — Alleluia", "Aclamação ao Evangelho — Aleluia", "Acclamatio ante Evangelium — Alleluia"),
          antwoord(0),
          antwoord(2),
          N("Evangelie", "Gospel", "Evangelho", "Evangelium"),
          antwoord(3),
        ],
      },
      { title: T("Homilie", "Homily", "Homilia", "Homilia"), parts: [N("Homilie", "Homily", "Homilia", "Homilia")] },
      { title: T("Geloofsbelijdenis", "Creed", "Profissão de fé", "Symbolum"), parts: [R("credo")] },
      {
        title: T("Voorbede", "Prayer of the Faithful", "Oração universal", "Oratio universalis"),
        parts: [N("Voorbede", "Prayer of the Faithful", "Oração universal", "Oratio universalis")],
      },
    ],
  },
  {
    name: T("Eucharistische liturgie", "Liturgy of the Eucharist", "Liturgia eucarística", "Liturgia eucharistica"),
    steps: [
      {
        title: T("Bereiding van de gaven", "Preparation of the Gifts", "Preparação dos dons", "Præparatio donorum"),
        parts: [R("mis_offertorium"), antwoord(4)],
      },
      {
        title: T("Gebed over de gaven", "Prayer over the Offerings", "Oração sobre as oferendas", "Oratio super oblata"),
        parts: [N("Gebed over de gaven", "Prayer over the Offerings", "Oração sobre as oferendas", "Oratio super oblata")],
      },
      {
        title: T("Prefatie en Sanctus", "Preface and Sanctus", "Prefácio e Santo", "Præfatio et Sanctus"),
        parts: [antwoord(5), N("Prefatie van de dag", "Preface of the day", "Prefácio do dia", "Præfatio diei"), R("mis_sanctus")],
      },
      { eg: true, parts: [] },
    ],
  },
  {
    name: T("Communieritus", "Communion Rite", "Ritos da comunhão", "Ritus communionis"),
    steps: [
      {
        title: T("Onze Vader", "The Lord's Prayer", "Pai-nosso", "Oratio dominica"),
        parts: [priester(1), R("our_father"), antwoord(6)],
      },
      { title: T("Vredewens", "Sign of peace", "Rito da paz", "Ritus pacis"), parts: [priester(2), antwoord(7)] },
      { title: T("Lam Gods", "Lamb of God", "Cordeiro de Deus", "Agnus Dei"), parts: [R("mis_agnus_dei")] },
      {
        title: T("Communie", "Communion", "Comunhão", "Communio"),
        parts: [R("mis_domine_non_sum_dignus"), N("Communie", "Communion", "Comunhão", "Communio")],
      },
      {
        title: T("Gebed na de communie", "Prayer after Communion", "Oração depois da comunhão", "Oratio post communionem"),
        parts: [N("Gebed na de communie", "Prayer after Communion", "Oração depois da comunhão", "Oratio post communionem")],
      },
    ],
  },
  {
    name: T("Slotritus", "Concluding Rites", "Ritos de conclusão", "Ritus conclusionis"),
    steps: [
      {
        title: T("Zegen en wegzending", "Blessing and dismissal", "Bênção e despedida", "Benedictio et dimissio"),
        parts: [R("mis_zegen"), antwoord(8)],
      },
    ],
  },
];

const LANGS = ["nl", "en", "pt", "la"];

/* De stap van het eucharistisch gebed, voor de gekozen keuze. */
function egStep(egKey) {
  const eg = EG[egKey] || EG[EG_ORDER[0]];
  const key = EG[egKey] ? egKey : EG_ORDER[0];
  const part = { ref: key };
  if (eg.from) part.from = eg.from;
  return { title: eg.label, parts: [part] };
}

/*
 * Alle stappen op een rij, met de teksten in alle talen.
 * Elke stap: kicker_* (het deel van de mis), title_*, text_*.
 */
export function buildMisSteps(egKey) {
  const steps = [];
  for (const section of SECTIONS) {
    for (const s of section.steps) {
      const step = s.eg ? egStep(egKey) : s;
      const out = {};
      for (const l of LANGS) {
        out[`kicker_${l}`] = section.name[l];
        out[`title_${l}`] = step.title[l];
        out[`text_${l}`] = composeText(step.parts, by, l);
      }
      steps.push(out);
    }
  }
  return steps;
}

/* De hele mis als één tekst per taal, met een tussenkop per deel. */
export function buildMisText(egKey) {
  const out = {};
  for (const l of LANGS) {
    const parts = [];
    for (const section of SECTIONS) {
      parts.push({ heading: section.name });
      for (const s of section.steps) parts.push(...(s.eg ? egStep(egKey).parts : s.parts));
    }
    out[l] = composeText(parts, by, l);
  }
  return out;
}
