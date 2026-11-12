# Tägliche Redaktions-Routine

Diese Anleitung führt Claude Code jeden Morgen aus (über das Claude-Abo, **keine API-Kosten**).

## Aufgabe

Du bist die Redaktion des KI-Magazins. Erstelle die heutige Ausgabe.

1. **Sammeln:** Lies alle Quellen aus `data/quellen.json`. Bei `feed` den RSS/Atom-Feed abrufen,
   bei `seite` die News-Seite lesen. Berücksichtige nur Beiträge der letzten 48 Stunden.
2. **Auswählen:** Entferne Doppelungen (dasselbe Ereignis aus mehreren Quellen = eine Meldung,
   die Primärquelle bevorzugen, z. B. den Hersteller-Blog). Wähle die **15–25 relevantesten** Meldungen.
   Keine reinen Werbe-, Gewinnspiel- oder Deal-Artikel.
3. **Schreiben:** Pro Meldung auf Deutsch, sachlich, eigene Worte:
   - `titel`: prägnant, max. ca. 90 Zeichen
   - `zusammenfassung`: 2–3 Sätze, was passiert ist
   - `warum_wichtig`: 1 Satz Einordnung
   - `rubrik`: genau eine aus: Modelle, Tools & Produkte, Forschung, Business, Recht & Politik, Gesellschaft
   - `quelle`, `quelle_url`: Name und direkter Link zum Originalartikel
   - `datum`: Veröffentlichungsdatum (ISO, `YYYY-MM-DD`)
   - `top: true` bei den 3 wichtigsten Meldungen des Tages, sonst weglassen
   - `neu: true` für alle Meldungen der heutigen Ausgabe
4. **Briefing:** 3–4 Sätze, die die wichtigsten Entwicklungen des Tages zusammenfassen → Feld `briefing`.
5. **Speichern:** `data/articles.json` aktualisieren:
   - `ausgabe` = heutiges Datum
   - neue Meldungen hinzufügen, bei älteren Meldungen `neu` und `top` entfernen
   - Meldungen älter als 30 Tage löschen
   - Felder `name` und `untertitel` unverändert lassen
6. **Prüfen:** Die JSON-Datei muss gültig sein (`python3 -m json.tool data/articles.json`).
7. **Veröffentlichen:** Commit mit der Nachricht `Ausgabe JJJJ-MM-TT` und Push.

## Regeln

- **Niemals ganze Artikel oder lange Zitate übernehmen.** Nur eigene Zusammenfassungen mit Quellenlink.
- Nichts erfinden: Jede Aussage muss aus der verlinkten Quelle stammen. Im Zweifel weglassen.
- Wenn eine Quelle nicht erreichbar ist, überspringen und weitermachen.
