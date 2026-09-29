/*
 * Gebedstekst in één of twee kolommen. Bij twee kolommen staan de regels
 * naast elkaar: regel i links naast regel i rechts. Daarvoor worden beide
 * teksten gesplitst in blokken (gescheiden door een lege regel) en regels.
 *   - Evenveel regels in een blok: regel naast regel.
 *   - Anders: het hele blok naast het hele blok.
 *   - Heeft een taal meer blokken, dan staan die naast een lege cel.
 * Regels die met "## " beginnen zijn tussenkoppen; regels tussen haakjes
 * zijn aanduidingen (bv. "(Eerste lezing)").
 * Op smalle schermen zet de CSS de cellen weer per kolom onder elkaar.
 */

function escape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const blocks = (text) => String(text || "").split(/\n[ \t]*\n/).map((b) => b.split("\n"));

/* Soort regel: tussenkop, aanduiding of gewone tekst; geeft klasse en zichtbare tekst. */
function kind(line) {
  if (line.startsWith("## ")) return { cls: " tg-head", text: line.slice(3) };
  if (/^\(.+\)$/.test(line.trim())) return { cls: " tg-note", text: line };
  return { cls: "", text: line };
}

/* Rijen van [links, rechts]; `blk` markeert het begin van een nieuw blok. */
function rows(a, b) {
  const A = blocks(a);
  const B = blocks(b);
  const out = [];
  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    const la = A[i] || [""];
    const lb = B[i] || [""];
    if (la.length === lb.length) {
      la.forEach((line, j) => out.push({ a: line, b: lb[j], blk: i > 0 && j === 0 }));
    } else {
      out.push({ a: la.join("\n"), b: lb.join("\n"), blk: i > 0 });
    }
  }
  return out;
}

function cell(line, textClass, side, lang, blk) {
  const k = kind(line);
  return `<p class="${textClass} al-cell ${side} ${lang}${blk ? " al-blk" : ""}${k.cls}" lang="${lang}">${escape(k.text)}</p>`;
}

/*
 * cols: [{ lang, label, text }] (één of twee)
 * gridClass / textClass / labelClass: de stijl van de omgeving
 * labels: kolomkoppen tonen
 */
export function textGridHTML(cols, { gridClass, textClass, labelClass, labels = false }) {
  if (cols.length < 2) {
    const c = cols[0];
    const label = labels && c.label ? `<p class="${labelClass}">${escape(c.label)}</p>` : "";
    /* Lege blokken (alleen bedoeld voor de uitlijning naast een andere taal) vallen weg. */
    const text = String(c.text || "").replace(/\n{3,}/g, "\n\n").trim();
    const body = text
      ? blocks(text)
          .map((lines) => {
            const k = kind(lines[0]);
            const rest = lines.slice(1).join("\n");
            const first = `<p class="${textClass} ${c.lang} tg-block${k.cls}">${escape(k.text)}</p>`;
            return k.cls && rest ? first + `<p class="${textClass} ${c.lang}">${escape(rest)}</p>` : k.cls ? first : `<p class="${textClass} ${c.lang} tg-block">${escape(lines.join("\n"))}</p>`;
          })
          .join("")
      : `<p class="${textClass} ${c.lang} tg-block">—</p>`;
    return `<div class="${gridClass}"><div class="text-col ${c.lang}" lang="${c.lang}">${label}${body}</div></div>`;
  }

  const [l, r] = cols;
  const parts = [];
  if (labels) {
    parts.push(`<p class="${labelClass} al-label a">${escape(l.label)}</p>`);
    parts.push(`<p class="${labelClass} al-label b">${escape(r.label)}</p>`);
  }
  for (const row of rows(l.text, r.text)) {
    parts.push(cell(row.a, textClass, "a", l.lang, row.blk));
    parts.push(cell(row.b, textClass, "b", r.lang, row.blk));
  }
  return `<div class="${gridClass} both aligned">${parts.join("")}</div>`;
}
