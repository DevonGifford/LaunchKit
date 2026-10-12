---
title: Erste Schritte
description: Legen Sie ein Projekt mit LaunchKit an, starten Sie es lokal und erfahren Sie, wo was liegt.
updated: 2026-10-12
order: 1
---

## Voraussetzungen

- Node.js 24 oder neuer
- pnpm 12 — die genaue Version ist in `package.json` festgelegt

Es braucht weder Datenbank noch Konten oder API-Schlüssel. Ein frischer Klon installiert, baut und besteht seine Tests ganz ohne Umgebungsvariablen.

## Projekt anlegen

Klonen Sie LaunchKit in ein neues Verzeichnis und behalten Sie es als Remote `upstream`, damit Sie Verbesserungen später in Ihr Projekt mergen können:

```sh
git clone --origin upstream git@github.com:DevonGifford/LaunchKit.git my-site
cd my-site
git remote add origin git@github.com:your-org/my-site.git
pnpm install
pnpm exec playwright install chromium
pnpm dev
```

Die Website läuft jetzt unter `http://localhost:3000`.

## Wo was liegt

| Pfad                | Inhalt                                                      |
| ------------------- | ----------------------------------------------------------- |
| `src/content/`      | Seiteninhalte und längere Dokumente, ein Ordner pro Sprache |
| `messages/`         | Kurze Oberflächentexte, eine JSON-Datei pro Sprache         |
| `src/app/theme.css` | Markenfarben, Schriften und Eckenradius                     |
| `src/components/`   | Grundbausteine, Layout- und Abschnittskomponenten           |
| `src/config/`       | Navigation, Funktionsschalter und Website-Einstellungen     |

Texte und Marke Ihres Projekts liegen in `src/content/`, `messages/` und `src/app/theme.css`. Dass sie dort bleiben, getrennt vom gemeinsamen Code, hält spätere Merges aus LaunchKit einfach.

## Alltägliche Befehle

| Befehl           | Wirkung                                                                   |
| ---------------- | ------------------------------------------------------------------------- |
| `pnpm dev`       | Startet den Entwicklungsserver                                            |
| `pnpm check`     | Prüft Typen, Lint, Formatierung und Übersetzungen und führt die Tests aus |
| `pnpm test:e2e`  | Führt End-to-End-Tests in echten Browsern aus                             |
| `pnpm storybook` | Öffnet die Komponentenwerkstatt                                           |
| `pnpm build`     | Erstellt einen Produktions-Build                                          |
