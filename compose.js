/*
 * Samengestelde gebeden. Een gebed met `parts` krijgt zijn tekst uit andere
 * gebeden en uit vaste kopjes en aanduidingen, in alle talen:
 *   { heading: { nl, en, pt, la } }   tussenkop (in de tekst als regel "## …")
 *   { note: { nl, en, pt, la } }      aanduiding, bv. "(Eerste lezing)"
 *   { ref: "sleutel" }                een heel gebed
 *   { ref: "sleutel", block: 3 }      één blok (alinea) van dat gebed
 *   { ref: …, strip: 1 }              zoveel eerste regels van het blok weglaten (kopregel)
 * Elk deel wordt één of meer blokken; omdat de brongebeden per taal dezelfde
 * blokken hebben, blijven de talen regel voor regel naast elkaar staan.
 */

const LANGS = ["nl", "en", "pt", "la"];
const blocksOf = (text) => String(text || "").split(/\n[ \t]*\n/);

function partText(part, lang, by) {
  if (part.heading) {
    const h = part.heading[lang] || part.heading.nl;
    return h ? "## " + h : "";
  }
  if (part.note) return part.note[lang] || part.note.nl || "";
  const src = by[part.ref];
  if (!src) return null;
  const text = src[`text_${lang}`];
  if (!text) return "";
  let block = text;
  if (part.block !== undefined) block = blocksOf(text)[part.block] || "";
  else if (part.from) block = blocksOf(text).slice(part.from).join("\n\n");
  if (part.strip) block = block.split("\n").slice(part.strip).join("\n");
  return block;
}

/* Vult text_nl/en/pt/la van elk gebed met `parts`; onbekende verwijzingen worden overgeslagen. */
export function composePrayers(prayers) {
  const by = Object.fromEntries(prayers.map((p) => [p.key, p]));
  for (const p of prayers) {
    if (!Array.isArray(p.parts)) continue;
    for (const lang of LANGS) {
      const out = [];
      for (const part of p.parts) {
        const t = partText(part, lang, by);
        if (t !== null) out.push(t);
      }
      p[`text_${lang}`] = out.join("\n\n");
    }
  }
  return prayers;
}

/* Tekst zonder de kopmarkering, bv. om te kopiëren. */
export const plainText = (text) => String(text || "").replace(/^## /gm, "");
