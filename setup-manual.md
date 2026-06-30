# Setup-Manual — Veröffentlichung, SEO & KI-Auffindbarkeit

**Für den KI-Agenten / die Person, die diese Website aufsetzt.**
Diese Seite ist eine **statische Website** (reines HTML/CSS/Vanilla-JS, kein Build-Schritt). Sie kann auf **GitHub Pages** (kostenlos) live gehen.

> Lies vorher `UNBEDINGT_LESEN_BEVOR_ARBEITEN.md` (Design-/Code-Regeln). Hier geht es nur um Deployment, SEO und KI-Auffindbarkeit.

---

## 0) Platzhalter (vor dem Start ersetzen)

| Platzhalter | Aktueller Wert (anpassen falls abweichend) |
|---|---|
| `<OWNER>` | GitHub-Benutzer/Org, z. B. `TheMavel` |
| `<REPO>` | Repository-Name, z. B. `bodo` |
| `<DOMAIN>` | `schiefer-online.eu` |
| `<WWW>` | `www.schiefer-online.eu` |

**Dateien im Repo (Root):** `index.html`, `presse.html`, `impressum.html`, `datenschutz.html`, `styles.css`, `sitemap.xml`, `robots.txt`, plus Doku-MDs. Alles muss im **Repo-Root** liegen.

---

## 1) Code ins GitHub-Repository

Falls noch nicht geschehen:

```bash
cd <projektordner>
git init
git add -A
git commit -m "Website Bodo Schiefer"
git branch -M main
git remote add origin https://github.com/<OWNER>/<REPO>.git
git push -u origin main
```

---

## 2) GitHub Pages aktivieren

1. Im Repo: **Settings → Pages**.
2. **Source:** „Deploy from a branch".
3. **Branch:** `main`, Ordner `/ (root)` → **Save**.
4. Nach 1–2 Minuten ist die Seite erreichbar unter `https://<OWNER>.github.io/<REPO>/`.

> Test: Diese URL öffnen und prüfen, dass Startseite, Presse-/Impressum-/Datenschutz-Links funktionieren.

---

## 3) Saubere URLs — ✅ BEREITS ERLEDIGT

Dieser Ordner ist bereits auf Clean URLs umgestellt — **nichts zu tun, nur verifizieren:**
- Unterseiten liegen als `presse/index.html`, `impressum/index.html`, `datenschutz/index.html` → erreichbar unter `/presse/`, `/impressum/`, `/datenschutz/` (passt zu `canonical` und `sitemap.xml`).
- Interne Links sind **relativ** (von Unterseiten `../…`, von der Startseite `presse/`, `#leistungen`), CSS via `../styles.css`. Funktioniert auf Custom-Domain **und** GitHub-Projektseite.

> Prüfen: `/`, `/presse/`, `/impressum/`, `/datenschutz/` laden, Styles greifen, interne Links funktionieren. **Keine `.html`-Links neu einführen.**

---

## 4) Custom Domain — GitHub-Seite

1. **Settings → Pages → Custom domain:** `<DOMAIN>` eintragen → **Save**. (Das legt automatisch eine `CNAME`-Datei im Repo an mit Inhalt `<DOMAIN>`.)
2. (Empfohlen) **Domain verifizieren:** **Settings → Pages → „Verify"** bzw. Account/Org **Settings → Pages → Add a domain**. GitHub zeigt einen **TXT-Record** `_github-pages-challenge-<OWNER>.<DOMAIN>` mit einem Wert → diesen als TXT im DNS anlegen (siehe §5).

---

## 5) DNS-Einstellungen (beim Domain-Anbieter)

> Aktuell liegt die Domain vermutlich bei **Squarespace** → dort unter Domain-Einstellungen die DNS-Records bearbeiten. (Oder beim jeweiligen Registrar.)

**A) Apex-Domain `<DOMAIN>` → GitHub Pages (A-Records):**

```
Typ  Name/Host   Wert
A    @           185.199.108.153
A    @           185.199.109.153
A    @           185.199.110.153
A    @           185.199.111.153
```

Optional zusätzlich **IPv6 (AAAA):**

```
AAAA @          2606:50c0:8000::153
AAAA @          2606:50c0:8001::153
AAAA @          2606:50c0:8002::153
AAAA @          2606:50c0:8003::153
```

**B) `www`-Subdomain → CNAME:**

```
Typ    Name/Host   Wert
CNAME  www         <OWNER>.github.io
```

**C) Domain-Verifizierung (aus §4.2), falls genutzt:**

```
Typ  Name/Host                               Wert
TXT  _github-pages-challenge-<OWNER>         <von GitHub angezeigter Wert>
```

**D) ⚠️ E-Mail schützen:** Vorhandene **MX-Records NICHT löschen** (sonst geht E-Mail an `@<DOMAIN>` kaputt). Nur A/AAAA/CNAME/TXT wie oben ändern/ergänzen. Alte Squarespace-A-Records/Weiterleitungen für die Webseite entfernen.

**Verifizieren (nach DNS-Propagation, kann bis 24 h dauern):**

```bash
dig <DOMAIN> +short        # erwartet: die vier 185.199.x.153 IPs
dig www.<DOMAIN> +short    # erwartet: <OWNER>.github.io ...
```

---

## 6) HTTPS aktivieren

1. Wenn DNS korrekt zeigt: **Settings → Pages** → Häkchen **„Enforce HTTPS"** setzen (kann erst nach Zertifikatsausstellung, ggf. 15–60 Min., verfügbar sein).
2. Testen: `https://<DOMAIN>` und `https://<WWW>` laden, grünes Schloss, automatische Weiterleitung auf HTTPS.

---

## 7) SEO-ready machen

Die Seite bringt bereits mit: pro Seite `title`, `meta description`, `canonical`, Open-Graph-Tags, `theme-color`, Favicon, JSON-LD (ProfessionalService + CollectionPage), `sitemap.xml`, `robots.txt`, semantische Headings. **Zu tun:**

1. **Domain konsistent:** Falls die finale Domain von `schiefer-online.eu` abweicht, in **allen** Dateien ersetzen: `canonical`, `og:url`, JSON-LD `url`, `sitemap.xml`, `robots.txt`-Sitemap-Zeile.
   ```bash
   grep -rl "schiefer-online.eu" . --include=*.html --include=*.xml --include=*.txt
   ```
2. **Google Search Console** (https://search.google.com/search-console):
   - Property für `<DOMAIN>` anlegen → per **DNS-TXT** verifizieren.
   - **Sitemap einreichen:** `https://<DOMAIN>/sitemap.xml`.
   - „URL-Prüfung" → Indexierung der Startseite + Unterseiten anfordern.
3. **Bing Webmaster Tools** (https://www.bing.com/webmasters): Domain hinzufügen, verifizieren, **Sitemap einreichen**. *(Wichtig auch für KI-Suche — siehe §8.)*
4. **Rich-Results-Test** (https://search.google.com/test/rich-results): Startseite prüfen → JSON-LD valide?
5. **Bilder:** beschreibende `alt`-Texte vorhanden lassen. (Optional Performance: Bilder/Fonts lokal hosten.)
6. **Lighthouse** (Chrome DevTools): Performance/SEO/Best-Practices prüfen, Ziel 90+.

---

## 8) Für GPT / KI-Suche auffindbar machen (GEO)

Damit die Seite in **ChatGPT-Suche, Claude, Perplexity & Co.** als Quelle auftauchen kann:

### 8.1 `robots.txt` — KI-Crawler ausdrücklich erlauben — ✅ BEREITS ANGELEGT
OpenAI nutzt drei Bots: **GPTBot** (Training), **OAI-SearchBot** (ChatGPT-Suche/Zitate), **ChatGPT-User** (Nutzer öffnet Link). **OAI-SearchBot erlauben = Voraussetzung, um in der ChatGPT-Suche zu erscheinen.** Die `robots.txt` im Root ist bereits entsprechend gesetzt (nur bei Domain-Wechsel die `Sitemap:`-Zeile anpassen). Inhalt:

```
# robots.txt
User-agent: *
Allow: /

# KI-Such-/Antwort-Crawler ausdrücklich willkommen
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: GPTBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: https://<DOMAIN>/sitemap.xml
```

> Hinweis: Änderungen an `robots.txt` brauchen bei OpenAI ca. 24 h Wirkung. Wer KI-Bots NICHT will, nutzt `Disallow: /` je Bot — Standard hier ist **erlauben**.

### 8.2 `llms.txt` (KI-Kurzprofil) — ✅ BEREITS ANGELEGT
Konvention für KI-Modelle: eine Markdown-Datei `llms.txt` im Root, die Zweck und wichtigste Seiten beschreibt. Liegt bereits im Root (bei Domain-Wechsel URLs darin anpassen). Inhalt:

```
# Bodo Schiefer — Marke & Kommunikation

> Unabhängige Beratung für Marke, Marketing und Kommunikation. Bringt Geschäftsführungen und Marketingverantwortlichen (Mittelstand und Start-ups, DACH) Klarheit, Orientierung und Wirkung. Über 30 Jahre Erfahrung. Sitz: Düsseldorf.

## Leistungen
- Positionierung schärfen, Prioritäten klären, Neuausrichtung strukturieren, Perspektiven zusammenführen, Wirkung erhöhen

## Wichtige Seiten
- [Start](https://<DOMAIN>/): Überblick, Leistungen, Vorgehen, Erfolge
- [Presse & Publikationen](https://<DOMAIN>/presse): Handelsblatt, HORIZONT, BDZV, Springer-Vieweg
- [Impressum](https://<DOMAIN>/impressum)
- [Datenschutz](https://<DOMAIN>/datenschutz)

## Kontakt
- E-Mail: bs@schiefer-online.eu
- LinkedIn: https://www.linkedin.com/in/bodoschiefer/
- Termin: (Calendly-Link)
```

### 8.3 Strukturierte Daten & sauberes HTML
- JSON-LD (`ProfessionalService`/`Person` mit `address`, `sameAs`, `email`) ist bereits vorhanden → bei finaler Domain die `url`-Felder aktualisieren. KI-Systeme lesen das gerne aus.
- Klare H1/H2-Struktur, beschreibende Texte, schnelle statische Auslieferung → ideal für KI-Parsing.

### 8.4 Bing nicht vergessen
ChatGPT-Suche stützt sich u. a. auf den **Bing-Index** → Schritt §7.3 (Bing Webmaster Tools + Sitemap) ist für KI-Auffindbarkeit wichtig.

---

## 9) Calendly-Link einsetzen

In **jeder** HTML-Datei diese eine Zeile auf den echten Link ändern:

```js
var CALENDLY = "https://calendly.com/PLATZHALTER/erstgespraech";
```

```bash
grep -rl "calendly.com/PLATZHALTER" . --include=*.html
```

---

## 10) Finale Checkliste

- [ ] `https://<DOMAIN>` und `https://<WWW>` laden, HTTPS erzwungen
- [ ] `/`, `/presse/`, `/impressum/`, `/datenschutz/` erreichbar, Styles greifen
- [ ] `CNAME`-Datei im Repo = `<DOMAIN>`
- [ ] DNS: vier A-Records (+ optional AAAA), `www`-CNAME, MX unangetastet
- [ ] `canonical`/`og:url`/JSON-LD/`sitemap.xml`/`robots.txt` auf finale Domain
- [ ] Google Search Console + Bing: verifiziert, Sitemap eingereicht
- [ ] `robots.txt` erlaubt OAI-SearchBot & Co.; `llms.txt` vorhanden
- [ ] Calendly-Platzhalter ersetzt
- [ ] Rich-Results-Test bestanden, Lighthouse geprüft, Mobile getestet

---

## Quellen
- GitHub Pages Custom Domain & A-Records: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- OpenAI-Crawler (GPTBot / OAI-SearchBot / ChatGPT-User): https://developers.openai.com/api/docs/bots
