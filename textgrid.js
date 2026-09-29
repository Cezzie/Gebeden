/*
 * Gebedstekst in één of twee kolommen. Bij twee kolommen staan de regels
 * naast elkaar: regel i links naast regel i rechts. Daarvoor worden beide
 * teksten gesplitst in blokken (gescheiden door een lege regel) en regels.
 *   - Evenveel regels in een blok: regel naast regel.
 *   - Anders: het hele blok naast het hele blok.
 *   - Verschillend aantal blokken: de volledige teksten naast elkaar.
 * Op smalle schermen zet de CSS de cellen weer per kolom onder elkaar.
 */

function escape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const blocks = (text) => String(text || "").split(/\n[ \t]*\n/).map((b) => b.split("\n"));

/*
 * Rijen van [links, rechts]; `blk` markeert het begin van een nieuw blok.
 * Heeft een taal meer blokken (bv. een rubriek die alleen in het Engels
 * bestaat), dan staan die blokken naast een lege cel.
 */
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
    return `<div class="${gridClass}"><div class="text-col ${c.lang}" lang="${c.lang}">${label}<p class="${textClass} ${c.lang}">${escape(
      text || "—"
    )}</p></div></div>`;
  }

  const [l, r] = cols;
  const parts = [];
  if (labels) {
    parts.push(`<p class="${labelClass} al-label a">${escape(l.label)}</p>`);
    parts.push(`<p class="${labelClass} al-label b">${escape(r.label)}</p>`);
  }
  for (const row of rows(l.text, r.text)) {
    const blk = row.blk ? " al-blk" : "";
    parts.push(`<p class="${textClass} al-cell a ${l.lang}${blk}" lang="${l.lang}">${escape(row.a)}</p>`);
    parts.push(`<p class="${textClass} al-cell b ${r.lang}${blk}" lang="${r.lang}">${escape(row.b)}</p>`);
  }
  return `<div class="${gridClass} both aligned">${parts.join("")}</div>`;
}
