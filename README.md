# Unser KI-Magazin

Tägliches Online-Magazin mit KI-Nachrichten aus aller Welt, auf Deutsch zusammengefasst.

- **Webseite:** reines HTML/CSS/JavaScript (`index.html`, `styles.css`, `app.js`), keine Installation nötig
- **Inhalte:** `data/articles.json`, wird jeden Morgen von einer Claude-Code-Routine aktualisiert (siehe `ROUTINE.md`)
- **Quellen:** `data/quellen.json`
- **Kosten:** läuft über das Claude-Abo, keine API-Kosten

## Lokal ansehen

```bash
cd ~/Projekte/ki-magazin
python3 -m http.server 8000
```
Dann im Browser öffnen: http://localhost:8000
