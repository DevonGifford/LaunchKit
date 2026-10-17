---
title: LaunchKit-Schnellstart
description: Was LaunchKit ist, was Sie brauchen und wie Sie in wenigen Minuten von einem frischen Klon zu einer laufenden Website kommen.
updated: 2026-10-17
order: 1
summary: Was LaunchKit ist und bewusst weglässt, die zwei Werkzeuge, die Sie brauchen, die Befehle für eine lokal laufende Website, eine Übersicht, wo was liegt, und wie eine Seite aus typisierten Sektionen entsteht.
next: launching-a-project, making-it-yours, component-library
---

LaunchKit ist ein wiederverwendbares Fundament, um bessere Websites schneller zu bauen und zu starten. Es gibt jedem neuen Projekt vom ersten Tag an, was eine moderne Website braucht: ein responsives Designsystem mit hellem und dunklem Theme, vier Sprachen, Inhalte aus Sektionen, validierte Formulare, automatisierte Tests und CI. Jedes Projekt kann seine Zeit dann dem widmen, was es besonders macht.

Die Idee passt in eine Zeile: **einmal bauen, oft wiederverwenden, zentral verbessern.** LaunchKit hat klare Vorstellungen von seinem Fundament und ist flexibel bei allem, was darauf gebaut wird. Gemeinsame Komponenten und Werkzeuge leben upstream in LaunchKit; Marke, Texte, eigene Sektionen und Geschäftslogik gehören zum jeweiligen Projekt.

## Was enthalten ist

- **Ein modernes Anwendungsfundament:** Next.js mit dem App Router, React, striktes TypeScript und Tailwind CSS.
- **Ein Designsystem mit Themes:** semantische Farb-Tokens, barrierefreie Komponenten von shadcn/ui sowie helle und dunkle Darstellung, die der Systemeinstellung der Besucher folgen.
- **Vier Sprachen:** Englisch, Spanisch, Französisch und Deutsch, mit lokalisierten Routen und Metadaten und einer Prüfung auf fehlende Übersetzungen.
- **Inhalte aus Sektionen:** Seiten sind typisierte Listen von Sektionen in `src/content/`, getrennt von den React-Komponenten, die sie darstellen.
- **Validierte Formulare:** React Hook Form und Zod, geprüft im Browser und noch einmal auf dem Server.
- **Tests und Prüfungen:** Unit-, Browser- und End-to-End-Tests, Storybook-Stories, die zugleich als Tests dienen, und Barrierefreiheitsprüfungen mit axe.

Was bewusst fehlt, ist genauso wichtig. Es gibt keine Datenbank, keine Authentifizierung, keinen Checkout und keinen kostenpflichtigen Monitoring-Dienst. Projekte ergänzen das, wenn sie es wirklich brauchen.

## Was Sie brauchen

- Node.js 24 oder neuer
- pnpm 12, in der exakten Version aus `package.json`

Das ist alles. Ein frischer Klon installiert sich, baut und besteht seine Tests ohne Konten, API-Schlüssel oder Umgebungsvariablen. Die optionalen Einstellungen sind in `.env.example` beschrieben.

## Lokal starten

Klonen Sie LaunchKit in einen neuen Ordner und behalten Sie es als Remote `upstream`, damit Sie Verbesserungen später mergen können:

```sh
git clone --origin upstream \
  git@github.com:DevonGifford/LaunchKit.git my-site
cd my-site
pnpm install

# Einmalig: der Browser für die Tests
pnpm exec playwright install chromium

pnpm dev
```

Die Website läuft jetzt unter `http://localhost:3000`.

> Sie starten ein echtes Projekt, statt nur auszuprobieren? Lesen Sie als Nächstes [Mit LaunchKit starten](launching-a-project). Dort geht es Schritt für Schritt um Remotes, die Einrichtung des Repositorys und das Deployment.

## Befehle für den Alltag

| Befehl           | Was er tut                                                                     |
| ---------------- | ------------------------------------------------------------------------------ |
| `pnpm dev`       | Startet den Entwicklungsserver                                                 |
| `pnpm check`     | Prüft Typen, Lint, Formatierung und Übersetzungen und führt die Tests aus      |
| `pnpm test:e2e`  | Baut die Website und führt die End-to-End-Tests auf Desktop und Mobilgerät aus |
| `pnpm storybook` | Öffnet die Komponentenwerkstatt unter `http://localhost:6006`                  |
| `pnpm build`     | Erstellt einen Produktions-Build                                               |

Git-Hooks führen ESLint und Prettier für die Dateien jedes Commits aus, prüfen die Commit-Nachricht und führen vor dem Push die Typprüfung aus. `pnpm check` deckt all das und mehr ab: Führen Sie es zuerst aus, dann bestehen auch die Hooks.

## Wo was liegt

| Pfad                | Inhalt                                                    |
| ------------------- | --------------------------------------------------------- |
| `src/content/`      | Seiteninhalte und lange Dokumente, ein Ordner pro Sprache |
| `messages/`         | Kurze Oberflächentexte, eine JSON-Datei pro Sprache       |
| `src/app/theme.css` | Markenfarben, Schriften und Eckenradius                   |
| `src/components/`   | Primitives, Layout- und Sektionskomponenten               |
| `src/config/`       | Website-Angaben, Navigation und Funktionsschalter         |
| `docs/`             | Die Spezifikation und die Anleitungen für Maintainer      |

Die Texte und die Marke Ihres Projekts liegen in `src/content/`, `messages/` und `src/app/theme.css`. Dass sie dort bleiben, abseits des gemeinsamen Codes, hält künftige Merges aus LaunchKit klein.

## Wie eine Seite entsteht

Eine Seite ist eine geordnete Liste von Sektionen, jede ein typisiertes Objekt:

```ts
// src/content/de/pages/contact.ts
export const contact = {
  meta: { title: 'Kontakt', description: '…' },
  sections: [
    {
      id: 'intro',
      type: 'hero',
      title: 'Sprechen wir über Ihren nächsten Launch.',
      description: '…',
    },
    {
      id: 'message',
      type: 'contact',
      title: 'Nachricht senden',
    },
  ],
} satisfies PageDefinition;
```

Ordnen Sie Sektionen neu, entfernen oder ergänzen Sie welche, und die Seite folgt, ohne dass sich eine Komponente ändert. TypeScript prüft jedes Feld schon beim Schreiben, und ein unbekannter Sektionstyp bricht den Build ab.
