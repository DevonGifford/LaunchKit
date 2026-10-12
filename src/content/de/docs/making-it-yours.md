---
title: Zu Ihrem eigenen machen
description: Marke ändern, Seiten neu schreiben, Sprachen wählen und weiterhin Verbesserungen aus LaunchKit übernehmen.
updated: 2026-10-12
order: 2
---

## Marke

Jede Farbe in LaunchKit ist ein semantisches Token — `background`, `foreground`, `surface`, `primary`, `muted`, `accent` und einige weitere —, definiert für helle und dunkle Darstellung in `src/app/theme.css`. Komponenten verwenden ausschließlich die Token-Namen, eine neue Palette ist also eine Änderung an genau dieser Datei.

Halten Sie für jede Textfarbe einen Kontrast von mindestens 4,5:1 zu den Hintergründen ein, auf denen sie steht. Die Kommentare in `theme.css` vermerken, welche Tokens für Text gedacht sind und welche dekorativ sind.

## Seiten

Strukturierte Seiten sind geordnete Listen von Abschnitten in `src/content/<sprache>/pages/`. Um eine Seite zu ändern, bearbeiten Sie ihre Abschnitte: umsortieren, einen entfernen oder einen weiteren eines Typs hinzufügen, den LaunchKit bereits bietet. TypeScript prüft jedes Feld schon beim Tippen.

Braucht Ihr Projekt einen Abschnitt, den LaunchKit nicht hat, entsteht er zuerst in Ihrem Projekt. Erweist er sich später für andere Websites als nützlich, schlagen Sie ihn upstream vor.

## Sprachen

Die unterstützten Sprachen stehen in `src/i18n/routing.ts`. Um eine hinzuzufügen, tragen Sie sie dort ein, legen `messages/<sprache>.json` und `src/content/<sprache>/` an und führen dann aus:

```sh
pnpm i18n:check
```

Die Prüfung listet jede fehlende Meldung und jedes fehlende Dokument auf, damit nichts versehentlich halb übersetzt veröffentlicht wird.

## Auf dem Laufenden bleiben

Verbesserungen an LaunchKit kommen wie jede andere Git-Änderung: bewusst.

```sh
git fetch upstream
git merge upstream/main
```

Merges geschehen nicht automatisch und können Konflikte erzeugen. Die bleiben klein, wenn projektspezifische Arbeit in Inhalten, Meldungen, der Theme-Datei und Ihren eigenen Komponenten liegt.
