/*
 * Service worker: maakt de app offline bruikbaar (PWA).
 *   - Bij de installatie gaan alle bestanden van de app in een cache met het
 *     versienummer. De deploy-workflow vult __VERSION__ in met de commit, zodat
 *     elke nieuwe versie van de site ook een nieuwe service worker is.
 *   - Daarna komt alles uit die cache: snel en zonder internet. Een nieuwe
 *     versie wordt op de achtergrond binnengehaald en is er bij de volgende
 *     keer openen — nooit midden in een gebed.
 *   - Lokaal (versie niet ingevuld) gaat het netwerk voor, zodat wijzigingen
 *     meteen zichtbaar zijn; de cache is dan alleen reserve.
 *   - De lettertypes van Google Fonts worden bewaard in een eigen cache.
 */

const VERSION = "__VERSION__";
const DEV = VERSION.startsWith("__");
const CACHE = `gebeden-${VERSION}`;
const FONT_CACHE = "gebeden-lettertypes";
const FONT_CSS =
  "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Cinzel:wght@400;600&display=swap";

/* Alle bestanden van de app. Wat hier ontbreekt, wordt bij het eerste gebruik alsnog bewaard. */
const FILES = [
  "./",
  "index.html",
  "styles.css",
  "manifest.webmanifest",
  "app.js",
  "i18n.js",
  "seed.js",
  "rosary.js",
  "rosary-ui.js",
  "antiphons.js",
  "antiphons-ui.js",
  "novena.js",
  "novena-ui.js",
  "kruisweg.js",
  "kruisweg-ui.js",
  "mis.js",
  "mis-ui.js",
  "compose.js",
  "textgrid.js",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      /* "reload": langs de HTTP-cache heen, zodat alle bestanden van dezelfde versie zijn. */
      await cache.addAll(FILES.map((f) => new Request(f, { cache: "reload" })));
      await cacheFonts();
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k.startsWith("gebeden-") && k !== CACHE && k !== FONT_CACHE)
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    event.respondWith(DEV ? networkFirst(req) : cacheFirst(req));
  } else if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(fromFontCache(req));
  }
});

/* De pagina zelf staat onder "./"; zoekparameters doen er voor de app niet toe. */
async function matchApp(req) {
  const options = req.mode === "navigate" ? { ignoreSearch: true } : {};
  return (await caches.match(req, options)) || (req.mode === "navigate" ? caches.match("./") : undefined);
}

async function cacheFirst(req) {
  const cached = await matchApp(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
  return res;
}

async function networkFirst(req) {
  try {
    const res = await fetch(req);
    if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
    return res;
  } catch (err) {
    const cached = await matchApp(req);
    if (cached) return cached;
    throw err;
  }
}

async function fromFontCache(req) {
  const cache = await caches.open(FONT_CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res.ok || res.type === "opaque") cache.put(req, res.clone());
  return res;
}

/* De lettertypes meteen bij de installatie ophalen, zodat ook de eerste keer offline mooi is. */
async function cacheFonts() {
  try {
    const cache = await caches.open(FONT_CACHE);
    const res = await fetch(FONT_CSS);
    if (!res.ok) return;
    const css = await res.clone().text();
    await cache.put(FONT_CSS, res);
    const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((m) => m[1]);
    await Promise.all(
      urls.map(async (u) => {
        const font = await fetch(u);
        if (font.ok) await cache.put(u, font);
      })
    );
  } catch {
    /* Zonder lettertypes werkt de app ook; dan met de reservelettertypes. */
  }
}
