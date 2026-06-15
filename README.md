# Katholieke Gebeden

Een eenvoudige, mooie web-app met katholieke gebeden in het **Nederlands** en **Latijn**.
Je kunt per gebed kiezen om alleen het Nederlands, alleen het Latijn, of **beide naast elkaar**
te tonen om de vertaling te vergelijken.

## Functies

- **Taalwisselaar** — Nederlands · Latijn · Beide (naast elkaar). De keuze wordt onthouden.
- **Zoeken** — doorzoek titels en tekst, ook zonder accenten (bv. "magnificat" of "barmhartigheid").
- **Categorieën** — gebeden zijn gegroepeerd (standaardgebeden, lofzangen, hymnen, litanieën).
- **Bronvermelding** — link naar de bron per gebed.
- **Responsief** — werkt op telefoon, tablet en desktop.
- **Geen build-stap** — pure HTML/CSS/JS, klaar voor GitHub Pages.

## Bestanden

| Bestand | Doel |
|---|---|
| `index.html` | De pagina-structuur |
| `styles.css` | Vormgeving |
| `app.js` | Logica (rendert gebeden, taalwisselaar, zoeken) |
| `seed.js` | De gebeden-data (`export const SEED`) |

## Een gebed toevoegen

Voeg een nieuw object toe aan de `prayers`-lijst in `seed.js`:

```js
{
  key: "uniek_id",
  title_nl: "Nederlandse titel",
  title_la: "Latijnse titel",
  text_nl: "Nederlandse tekst…\nNieuwe regel met \\n.",
  text_la: "Latijnse tekst…",
  category: "standaardgebed", // of: evangelielofzang, hymne, litanie
  notes: "Optionele toelichting.",
  source_url: "https://…"
}
```

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
