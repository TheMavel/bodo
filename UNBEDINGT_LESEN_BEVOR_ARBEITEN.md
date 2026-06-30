# ⚠️ UNBEDINGT LESEN — BEVOR DU ARBEITEST

**Diese Datei ist verbindlich für JEDE Person und JEDE KI, die an diesem Ordner arbeitet.**
Erst vollständig lesen, dann ändern. Ziel: eine konsistente, saubere Website — **kein zusammengewürfelter Code-Müll aus verschiedenen Ideen ohne Verifikation.**

---

## 0) DIE GOLDENEN REGELN (nicht verhandelbar)

1. **Nichts ändern, ohne es im Browser zu verifizieren.** Jede Änderung wird gerendert und visuell geprüft (Screenshot), bevor sie committet wird. Kein „sieht im Code ok aus" → committen.
2. **Keine neuen Frameworks, keine Build-Tools, keine Libraries.** Das Projekt ist bewusst **reines HTML + CSS + Vanilla-JavaScript**, ohne npm, ohne React, ohne jQuery, ohne Tailwind-Build, ohne Bundler. Nicht „mal eben" etwas einführen.
3. **Design-Tokens sind heilig.** Farben, Schriften, Abstände NUR über die definierten CSS-Variablen (siehe §3). Keine neuen Hex-Farben, keine Zufalls-Pixelwerte.
4. **Eine Quelle der Wahrheit pro Sache.** Keine doppelten/konkurrierenden Styles. Wenn etwas existiert, wiederverwenden statt neu erfinden.
5. **Bilder bleiben markenkonform.** KI-Bilder sind erlaubt (inkl. Porträts von Bodo via Referenzfoto). Wichtig ist nur: hohe Qualität, einheitlicher Look und — bei Porträts — Bodos Identität konsistent. Orientierung bietet `image-prompts.md`.
6. **Bei Unsicherheit fragen, nicht raten.** Lieber kurz nachfragen als „kreativ" werden.
7. **Keine Streudateien.** Keine Test-/Temp-Dateien committen (siehe `.gitignore`).

> Wenn eine Änderung gegen diese Regeln verstößt: **nicht machen.**

---

## 1) WAS IST DAS & WOFÜR

- **Projekt:** Persönliche Website-Visitenkarte von **Bodo Schiefer — „BS | Marke & Kommunikation"**, Düsseldorf.
- **Zweck:** Vertrauen aufbauen und Erstgespräche generieren (Lead-Gen). Primäres Ziel = **„Jetzt Termin buchen"** (Calendly).
- **Zielgruppe:** Geschäftsführungen und Marketingverantwortliche aus **Mittelstand** und **Start-ups** im DACH-Raum.
- **Tonalität & Look:** Premium-Beratung, **editorial, ruhig, klar, souverän, nahbar.** Viel Weißraum. Kernbotschaft der Marke: **„Aus Komplexität wird Klarheit."**
- **Hosting:** Statische Seite, aktuell GitHub (Repo `TheMavel/bodo`), Zieldomain `schiefer-online.eu`. Muss als pure statische Site lauffähig bleiben (GitHub Pages / jeder Webspace).

---

## 2) TECH & DATEISTRUKTUR

Reines Static-Site-Setup, kein Build:

```
index.html        → Startseite (CSS + JS INLINE, eigenständig)
presse.html       → Presse-Archiv (nutzt styles.css)
impressum.html    → Impressum, echte Daten (nutzt styles.css)
datenschutz.html  → DSGVO-Erklärung (nutzt styles.css)
styles.css        → gemeinsame Styles NUR für die Unterseiten
sitemap.xml       → SEO
robots.txt        → SEO
image-prompts.md  → Prompts für neue Bilder (OpenAI Image 2)
.gitignore
UNBEDINGT_LESEN_BEVOR_ARBEITEN.md  → diese Datei
```

**Wichtig:**
- `index.html` trägt sein CSS/JS **inline** (eine Datei, bewusst). Die Unterseiten nutzen `styles.css`.
- **Wenn ein Token/Look in `index.html` geändert wird, muss `styles.css` synchron gehalten werden** (und umgekehrt). Beide verwenden dieselben Variablen und Werte.

---

## 3) DESIGN-TOKENS (CSS-Variablen — IMMER diese nutzen)

```css
--ink:#0d1b2a;      /* Dunkles Navy: dunkle Sektionen, Haupttext-Headlines */
--ink-soft:#33414f; /* Fließtext */
--muted:#6b7785;    /* Sekundärtext, Captions */
--blue:#306FBA;     /* MARKENFARBE (Bodos Blau) — Akzente, Buttons, Labels, Links */
--blue-deep:#255a99;/* Hover/Verlauf von Blau */
--accent:#c8a45c;   /* Goldton — SPARSAM, einzelner Akzent (Linien, Zahlen, Zitatzeichen) */
--paper:#fbfaf7;    /* Standard-Hintergrund (Off-White) */
--paper-2:#f3f0ea;  /* Abwechselnder heller Hintergrund */
--line:#e4ddd1;     /* Rahmen/Trennlinien */
--white:#ffffff;    /* Karten auf hellen Sektionen */
--serif:'Fraunces', Georgia, serif;             /* Headlines, Zitate, Akzente */
--sans:'Inter', system-ui, -apple-system, sans; /* Fließtext + UI */
--maxw:1180px;      /* Container-Maximalbreite */
```

**Farb-Regeln:**
- **Blau führt, Gold ist nur ein seltener Akzent.** Niemals großflächig Gold.
- Dunkle Sektionen = `--ink` (Navy) **oder** `--blue`. Helle Sektionen = `--paper` / `--paper-2` / `#fff`.
- Keine neuen Farben einführen.

---

## 4) TYPOGRAFIE

- **Schriften:** Fraunces (Serif) für Headlines/Zitate/Akzente; Inter (Sans) für Text & UI. Geladen via Google Fonts (siehe TODO: ggf. self-hosten).
- **Body:** 17px, `line-height:1.6`, Farbe `--ink`.
- **Skala (responsiv via `clamp`):**
  - `h1` (Hero): `clamp(2.5rem, 4.6vw, 4.2rem)`, Fraunces 500, `line-height:1.04`, `letter-spacing:-.015em`. Akzentwort in `<em>` → kursiv + `--blue`.
  - `h2` (Sektionen): `clamp(2rem, 3.4vw, 2.9rem)`, Fraunces 500.
  - **Kicker** (Sektions-Label über H2): 13px, 700, `text-transform:uppercase`, `letter-spacing:.14em`, Farbe `--blue`. (Auf dunklen Sektionen ggf. Gold/hell.)
  - `.sec-head p` (Intro): 1.12rem, `--ink-soft`.
- **Hervorgehobene Aussagen** (`.hl`, `.how-pull`): Fraunces, linker Rand `3px solid --accent`, `padding-left`.

---

## 5) ABSTÄNDE & LAYOUT (Spacing-System)

- **Container:** `.wrap` = `max-width:1180px; margin:0 auto; padding:0 32px`.
- **Sektions-Abstand:** `.sec` = `padding:104px 0`. (Nicht beliebig variieren — das ist der Rhythmus.)
- **Sektionskopf:** `.sec-head` = `max-width:760px; margin-bottom:56px`.
- **Grid-Gaps:** Karten-Grids 24–32px; zweispaltige Splits 64–72px; „Hairline"-Grids (Stats/Outcomes) `gap:1px` mit eingefärbtem Grid-Hintergrund.
- **Karten-Padding:** ca. 34–44px (Standardkarten), Testimonial 56×60px.
- **Radius:** Karten 16–18px, große Container/Bilder 20px, Buttons/Pills 40–42px, Clippings 4px.
- **Schatten (nur diese Stärken):**
  - Karte/Hover: `0 24px 50px -28px rgba(13,27,42,.25)`
  - Bild/Media: `0 30px 60px -34px rgba(13,27,42,.4)`
- **Transitions:** 0.2–0.25s; Hover-Lift `translateY(-2px bis -4px)`.
- **Breakpoints:** `880px` (Splits/Grids → 1 Spalte), `860px` (Mobile-Menü), `760px` / `640px` (Feinheiten). Mobile-First-Verhalten beibehalten.

---

## 6) KOMPONENTEN (wiederverwenden, nicht neu bauen)

- **Buttons:** `.btn` Basis; `.btn-primary` (blau, gefüllt) für Hauptaktion; `.btn-ghost` (Outline) für Sekundär. Pill-Form.
- **Termin-CTA:** Jeder Buchungs-Button trägt `data-book` (KEIN fester href). Ein Script setzt zentral den Calendly-Link (siehe §9).
- **Kicker + H2 + Intro:** Standard-Sektionskopf (`.sec-head`).
- **Karten:** `.when-card`, `.succ-card`, `.out-cell`, `.tcar-card` — gleiche Logik (weiß/`--line`-Rahmen, Radius, Hover-Lift). Neue Karten an diesen Stil anlehnen.
- **Logo-Chip:** `.mq-chip` (Marquee) — transparent, KEINE weißen Boxen (siehe §7).
- **Akzent-Linie:** Gold `3px` border-left für Pull-Quotes.

---

## 7) INTERAKTIVE ELEMENTE (verstehen, NICHT kaputt machen)

Alle in Vanilla-JS, ohne Abhängigkeiten. Bei Änderungen unbedingt im Browser testen.

1. **Logo-Marquee (oben):** Lädt Bodos **Logoteppich** von seinem Squarespace-CDN, schneidet ihn **zur Laufzeit per Canvas** in einzelne Logos, macht **Weiß transparent** und scrollt sie. → **Logos sitzen transparent direkt auf dem hellen Hintergrund, KEINE Boxen.**
   - **Verboten:** externe Logo-Dienste (z. B. Clearbit — tot). Fallback sind die 4 Einzel-Logos (Haufe, Boehringer, Volvo, snoopstar) von Bodos CDN.
   - Funktioniert nur, weil das CDN CORS erlaubt (`crossOrigin='anonymous'`).
2. **Chaos → Klarheit (Regler):** Vorher/Nachher-Slider (`.compare`). Kernmetapher der Marke. Pointer-Drag, mit sanfter Auto-Demo bis zur ersten Interaktion.
3. **Leistungen-Accordion:** Ein Eintrag offen zur Zeit.
4. **Stats-Counter:** Zählt hoch, sobald sichtbar (IntersectionObserver), einmalig.
5. **Testimonial-Carousel:** Autoplay (6s), Pause bei Hover, Pfeile + Dots.
6. **Presse-Wühltisch:** Zieh-/Stapelbare Zeitungs-Clippings mit echten Artikelbildern; Buttons „Mischen"/„Aufräumen".
7. **Reveal-on-Scroll:** `.reveal` → `.in` per IntersectionObserver.
8. **Mobile-Menü:** Burger toggelt `.nav-links.open`.

---

## 8) BILDER & ASSETS

- **Quelle:** Alle echten Bilder/Logos liegen auf Bodos Squarespace-CDN (`images.squarespace-cdn.com/.../6a32c6145ae9fb6c0acd608d/...`). Laden im Browser zuverlässig.
- **Bodo-Fotos:** Hero = Porträt auf Blau; Leistungen = Porträt (grau); Trust = Porträt; „Über mich" = textfokussiert (Bootsfoto folgt ggf.). **Reihenfolge/Slots nicht ohne Grund umwerfen.**
- **Presse-Bilder:** echte Artikelbilder von Bodos CDN (Handelsblatt, Horizont 2022/2018, „Nachhaltige Gebäude", BDZV).
- **Neue Bilder:** KI-Bilder sind willkommen — am besten mit den Prompts aus `image-prompts.md` als Startpunkt (Modell: OpenAI Image 2; für Porträts Bodos Referenzfoto als Input, damit die Identität konsistent bleibt). Auf Qualität und einheitlichen Marken-Look achten.
- **Alt-Texte** sind Pflicht und müssen beschreibend sein.
- **Empfehlung/TODO:** Bilder, Logos und Fonts vor dem Go-Live **lokal hosten** (`/assets/`), um externe Abhängigkeiten & DSGVO-Aufrufe zu reduzieren.

---

## 9) CALENDLY / TERMIN-BUTTON

- Alle Buchungs-Links haben `data-book` und werden per JS zentral gesetzt:
  ```js
  var CALENDLY = "https://calendly.com/PLATZHALTER/erstgespraech";
  ```
- **TODO:** Diesen Platzhalter durch den echten Calendly-Link ersetzen — **einmal pro Datei** (`index.html` + jede Unterseite). Sonst nichts anpassen.

---

## 10) SEO-REGELN (bei jeder Seite einhalten)

- Jede Seite hat: eindeutigen `<title>`, `meta description`, `canonical`, Open-Graph-Tags, `theme-color`, Favicon.
- Strukturierte Daten (JSON-LD) beibehalten/ergänzen (ProfessionalService auf der Startseite, CollectionPage auf Presse).
- `sitemap.xml` und `robots.txt` aktuell halten, wenn Seiten dazukommen.
- Saubere Heading-Hierarchie (genau ein `h1` pro Seite), beschreibende Alt-Texte, interne Verlinkung.
- **Domain-Umzug:** Domain `schiefer-online.eu` behalten, gleiche Pfade nutzen (301 wo nötig), danach Sitemap in der Google Search Console einreichen.
- Canonicals nutzen „schöne" URLs (`/presse`) → für GitHub Pages ggf. Seiten als `presse/index.html` ablegen (offener Punkt).

---

## 11) SEKTIONS-REIHENFOLGE & HINTERGRUND-RHYTHMUS (Startseite)

Reihenfolge nicht ohne Grund ändern; der Wechsel hell/dunkel ist gewollt:

1. Header (sticky, paper)
2. Logo-Marquee (paper)
3. **Hero** `#top` (paper)
4. Zitat-Strip (**blau**)
5. **Klarheit-Regler** `#klarheit` (paper-2)
6. **Einsatz/Wann** `#einsatz` (weiß)
7. **Leistungen** `#leistungen` (paper)
8. **Stats** (**blau**)
9. **Ergebnisse** `#ergebnisse` (**navy**)
10. **Vorgehen** `#vorgehen` (**blau**)
11. **Über mich** `#ueber-mich` (paper, textfokussiert)
12. **Erfolge** `#erfolge` (paper-2)
13. **Mandate** `#mandate` (weiß)
14. **CTA-Banner** (**navy**)
15. **Stimmen** `#stimmen` (paper)
16. **Presse** `#presse` (paper-2)
17. **Auszeichnungen** `#awards` (weiß)
18. **Trust/Erfahrung** (weiß)
19. **Footer** `#kontakt` (**navy**)

---

## 12) DO / DON'T

**DO**
- Vorhandene Tokens, Klassen und Muster wiederverwenden.
- Änderungen klein halten, im Browser prüfen, dann committen.
- Texte 1:1 wie von Bodo freigegeben (Rechtschreibung/Interpunktion beachten).
- Mobile-Ansicht testen.

**DON'T**
- ❌ Frameworks/Libraries/Build-Schritte einführen.
- ❌ Neue Farben, Zufalls-Abstände, neue Fonts.
- ❌ Externe Logo-/Bilddienste statt Bodos CDN.
- ❌ Weiße Logo-Boxen im Marquee.
- ❌ Ungeprüften Code committen.
- ❌ Temp-/Testdateien committen.

---

## 13) ÄNDERUNGS-WORKFLOW (Pflicht)

1. Diese Datei lesen.
2. Kleinste sinnvolle Änderung umsetzen.
3. Im Browser rendern + Screenshot prüfen (Desktop **und** Mobile).
4. Tokens/Stil konsistent? `index.html` ↔ `styles.css` synchron?
5. Erst dann committen — mit klarer Commit-Message.

---

## 14) OFFENE PUNKTE / TODO

- [ ] Calendly-Platzhalter durch echten Link ersetzen (alle Seiten).
- [ ] Bilder, Logos, Fonts lokal hosten (`/assets/`).
- [ ] Für GitHub Pages: saubere URLs (`presse/index.html` …) für korrekte Canonicals.
- [ ] Optional: Bootsfoto für „Über mich" (echtes Foto von Bodo) einbauen.
- [ ] Nach Go-Live: Sitemap in Google Search Console einreichen.

---

*Wenn du KI bist und das hier liest: Halte dich an §0. Im Zweifel nichts tun und nachfragen.*
