# Katholieke Gebeden

Een eenvoudige, mooie web-app met katholieke gebeden in het **Nederlands**, **Engels**,
**Portugees** (Portugal) en **Latijn**. Je kiest een taal voor de linker- en de rechterkolom
en zet zo twee willekeurige talen naast elkaar, of je toont er één.

## Functies

- **Taalkeuze links ⇄ rechts** — twee keuzelijsten (Nederlands, English, Português, Latijn; rechts ook "geen")
  met een wisselknop. De bediening volgt de volkstaal; de keuze geldt voor de hele app en wordt onthouden.
- **Naast elkaar, ook liggend** — alleen op smalle staande schermen komen de kolommen onder elkaar.
- **Rozenkrans, Maria-antifoon, Novena en Kruisweg** — elk in een eigen scherm, stap voor stap te bidden.
- **Inklapbare kopbalk** — op mobiel klapt de balk met alle knoppen in achter de ☰-knop.
- **Zoeken** — doorzoek titels en tekst, ook zonder accenten (bv. "magnificat" of "barmhartigheid").
- **Categorieën** — gebeden zijn gegroepeerd (standaardgebeden, gebeden van de mis, geloofsbelijdenis, lofzangen, hymnen, Maria-antifonen, litanieën).
- **Bronvermelding** — per gebed en per taal in `seed.js` (`source_url`, `source_url_en`, `source_url_pt`).
- **Responsief** — werkt op telefoon, tablet en desktop.
- **Geen build-stap** — pure HTML/CSS/JS, klaar voor GitHub Pages.

## Bestanden

| Bestand | Doel |
|---|---|
| `index.html` | De pagina-structuur |
| `styles.css` | Vormgeving |
| `app.js` | Logica (rendert gebeden, zoeken, kopbalk) |
| `i18n.js` | Gedeelde taalinstelling en taalknoppen |
| `seed.js` | De gebeden-data (`export const SEED`) |
| `rosary.js`, `antiphons.js`, `novena.js`, `kruisweg.js` | Data van de gebedsvormen |
| `*-ui.js` | De schermen (overlays) van de gebedsvormen |
| `sw.js`, `manifest.webmanifest`, `icons/` | Installeerbare app en offline gebruik |

## Een gebed toevoegen

Voeg een nieuw object toe aan de `prayers`-lijst in `seed.js`:

```js
{
  key: "uniek_id",
  title_nl: "Nederlandse titel",
  title_la: "Latijnse titel",
  title_en: "English title",
  title_pt: "Título português",
  text_nl: "Nederlandse tekst…\nNieuwe regel met \\n.",
  text_la: "Latijnse tekst…",   // leeg laten als er geen Latijn bestaat
  text_en: "English text…",
  text_pt: "Texto português…",
  category: "standaardgebed", // of: evangelielofzang, hymne, litanie
  notes: "Optionele toelichting.",
  notes_en: "Optional note.",
  notes_pt: "Nota opcional.",
  source_url: "https://…",      // bron van het Nederlands
  source_url_en: "https://…",
  source_url_pt: "https://…"
}
```

## Als app installeren (offline)

De site is een installeerbare webapp (PWA). Na installatie opent hij schermvullend met een eigen
icoon, zonder adresbalk, en werkt hij ook zonder internet.

- **iPhone/iPad:** open de site in Safari → Deel → *Zet op beginscherm*.
- **Android:** Chrome biedt zelf *App installeren* aan, of via menu ⋮.
- Onderaan de pagina staat ook een knop *Als app installeren*.

`sw.js` bewaart alle bestanden bij de installatie. Bij het publiceren zet de workflow het
commitnummer in `sw.js`; geïnstalleerde apps halen zo een nieuwe versie op de achtergrond op en
tonen die de volgende keer dat je ze opent. Voeg je een nieuw bestand toe, zet het dan ook in de
lijst `FILES` in `sw.js` (anders wordt het pas na het eerste gebruik bewaard).

## Lokaal bekijken

Omdat de app ES-modules gebruikt, moet je hem via een lokale server openen
(niet door het bestand direct te dubbelklikken):

```bash
python3 -m http.server 8000
# open daarna http://localhost:8000
```

## Publiceren op GitHub Pages

Er zijn twee manieren. De repo bevat al een workflow voor de eerste.

### Optie A — automatisch via GitHub Actions (aanbevolen)

1. Push deze repo naar GitHub.
2. Ga naar **Settings → Pages → Build and deployment** en zet **Source** op **GitHub Actions**.
3. Elke push naar `main` publiceert de site automatisch (zie `.github/workflows/deploy.yml`).

### Optie B — direct vanaf een branch

1. Push naar GitHub.
2. Ga naar **Settings → Pages**, kies **Deploy from a branch**, branch `main`, map `/ (root)`.
3. Na enkele minuten staat de site op `https://<gebruiker>.github.io/<repo>/`.

> Het bestand `.nojekyll` zorgt dat GitHub Pages de bestanden ongewijzigd serveert.
