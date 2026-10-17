---
title: LaunchKit anpassen
description: Ändern Sie die Marke, schreiben Sie die Seiten neu, legen Sie Sprachen und Website-Angaben fest und übernehmen Sie weiter die Verbesserungen aus LaunchKit.
updated: 2026-10-17
order: 2
summary: Eine Kurzübersicht, was Sie wo ändern, und dann, wie Sie eigene Farben, Schriften und ein eigenes Logo einsetzen, die Seiten umschreiben, Sprachen, Website-Angaben und Menüs festlegen und Verbesserungen aus LaunchKit weiter mergen.
next: launching-a-project, component-library
---

Eine Website auf Basis von LaunchKit sollte nicht wie LaunchKit aussehen. Das Fundament bündelt alles, was Ihr Projekt ausmacht, in wenigen Dateien. So können Sie Marke und Texte austauschen, ohne gemeinsamen Code anzufassen, und Verbesserungen aus LaunchKit trotzdem später mergen.

| Um das zu ändern…                           | Bearbeiten Sie                                  |
| ------------------------------------------- | ----------------------------------------------- |
| Farben, Schriften, Radius                   | `src/app/theme.css`                             |
| Seiteninhalte und Reihenfolge der Sektionen | `src/content/<sprache>/pages/*.ts`              |
| Lange Dokumente                             | `src/content/<sprache>/docs/*.md`               |
| Oberflächentexte                            | `messages/<sprache>.json`                       |
| Name, Kontaktdaten, soziale Profile         | `src/config/site.ts`                            |
| Navigation und Funktionsschalter            | `src/config/navigation.ts`, `features.ts`       |
| Sprachen                                    | `src/i18n/routing.ts`, danach `pnpm i18n:check` |
| Logo und Vorschaubild für soziale Netzwerke | `public/brand/`                                 |

## Die Marke

Jede Farbe in LaunchKit ist ein semantisches Token, etwa `background`, `foreground`, `surface`, `primary`, `muted`, `accent` und `emphasis`, definiert für die helle und die dunkle Darstellung in `src/app/theme.css`. Komponenten verwenden ausschließlich die Token-Namen, eine neue Palette ist also eine Änderung an dieser einen Datei. Damit das so bleibt, weist ESLint Hex-Farben in TypeScript zurück.

Für eine eigene Palette kopieren Sie die beiden Blöcke in `theme.css` und ändern die Werte:

```css
:root {
  --background: #f0e9db;
  --foreground: #10241e;
  --primary: #10241e;
  --accent: #c2a879;
  /* …alle Tokens */
}

.dark {
  --background: #10241e;
  --foreground: #f0e9db;
  /* …alle Tokens, noch einmal */
}
```

Prüfen Sie danach den Kontrast. Text-Tokens brauchen mindestens 4,5:1 gegenüber den Hintergründen, auf denen sie stehen; die Kommentare in `theme.css` sagen, welche Tokens Text tragen und welche dekorativ sind. Die Tests führen axe auf jeder Seite in beiden Darstellungen aus, und das Barrierefreiheits-Panel in Storybook zeigt Probleme Story für Story, während Sie noch Farben auswählen.

> Die Seitenleiste und die Werkzeugleiste von Storybook können keine CSS-Variablen lesen. Sie halten deshalb eine Kopie der Palette in `.storybook/theme.ts` und ein umgefärbtes Logo in `.storybook/brand/`. Aktualisieren Sie beides und starten Sie Storybook neu.

## Schriften

LaunchKit verwendet System-Schriften, bis ein Projekt eigene wählt: nichts herunterzuladen, nichts rückgängig zu machen. Für eine Webschrift laden Sie sie mit `next/font` in `src/app/[locale]/layout.tsx` und setzen ihre Variable an den Anfang des passenden Stacks in `theme.css`:

```css
--typeface-serif: var(--font-brand-serif), serif;
```

## Die Seiten

Strukturierte Seiten sind geordnete Listen von Sektionen in `src/content/<sprache>/pages/`. Um eine Seite zu ändern, bearbeiten Sie ihre Sektionen: Ordnen Sie sie neu, entfernen Sie eine oder fügen Sie eine weitere eines Typs hinzu, den LaunchKit bereits mitbringt. TypeScript prüft jedes Feld schon beim Schreiben.

Sehen Sie sich die Sektionen in Storybook an (`pnpm storybook`), um zu sehen, wie jede aussieht, in beiden Themes und in jeder Bildschirmgröße. Braucht eine Seite eine Sektion, die LaunchKit nicht hat, bauen Sie sie zuerst in Ihrem Projekt. Wie das geht, erklärt [Das LaunchKit-Designsystem](component-library). Erweist sie sich später auch für andere Websites als nützlich, schlagen Sie sie upstream vor.

## Die Texte rund um die Seiten

Kurze Oberflächentexte wie Button-Beschriftungen, Menünamen und Formularfehler liegen in `messages/<sprache>.json`, mit Englisch als Quelle. Längere Texte wie diese Anleitungen sind Markdown in `src/content/<sprache>/docs/`. Fehlt eine Anleitung in einer Sprache, wird sie auf Englisch angezeigt, mit einem Hinweis darauf.

## Website-Angaben und Navigation

`src/config/site.ts` enthält den Namen der Website, die Kontaktdaten und die sozialen Profile. Die vollständige Fußzeile zeigt die Angaben, die gesetzt sind; lassen Sie also weg, was Sie nicht veröffentlichen möchten. Die Menüs für Kopf- und Fußzeile liegen in `src/config/navigation.ts`; jede Beschriftung ist eine Nachricht und wird mit allem anderen übersetzt. `src/config/features.ts` schaltet die Theme- und Sprachauswahl ein oder aus.

## Sprachen

Die unterstützten Sprachen stehen in `src/i18n/routing.ts`. Um eine hinzuzufügen, tragen Sie sie dort ein, legen `messages/<sprache>.json` und `src/content/<sprache>/` an und führen dann aus:

```sh
pnpm i18n:check
```

Die Prüfung listet jede fehlende Nachricht und jedes fehlende Dokument auf, damit nichts versehentlich halb übersetzt live geht. Aus demselben Grund ist eine Seite, die es auf Englisch gibt, aber nicht in einer anderen Sprache, ein Typfehler.

## Auf dem neuesten Stand bleiben

Verbesserungen aus LaunchKit kommen wie jede Git-Änderung: bewusst.

```sh
git fetch upstream --tags
git merge v0.2.0   # ein LaunchKit-Release
```

Merges passieren nicht automatisch und können Konflikte erzeugen. Die bleiben klein, wenn die Arbeit Ihres Projekts in Inhalten, Nachrichten, der Theme-Datei und eigenen Komponenten liegt, und genau dafür ist alles oben gedacht.
