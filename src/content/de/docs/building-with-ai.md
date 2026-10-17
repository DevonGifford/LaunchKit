---
title: KI in LaunchKit
description: Wie KI-Coding-Agenten in diesem Repository arbeiten, welche Regeln sie absichern und wie eine echte Arbeitssitzung aussieht.
updated: 2026-10-17
order: 5
summary: Wie KI-Agenten in LaunchKit arbeiten: das gemeinsame Regelwerk in AGENTS.md, die Regel, dass nur Menschen committen, 18 fest eingebundene Skills, die mitgelieferte Framework-Dokumentation, die Prüfungen, die Fehler abfangen, und der Ablauf in fünf Schritten, mit dem diese Website entstanden ist.
next: component-library, roadmap
---

Ein großer Teil von LaunchKit, diese Website eingeschlossen, ist mit einem KI-Coding-Agenten entstanden, der Seite an Seite mit einem Menschen gearbeitet hat. Das funktioniert nur, weil das Repository dafür eingerichtet ist. Ein Agent braucht dasselbe wie jemand, der neu ins Team kommt: klare Konventionen, schnelles Feedback und feste Grenzen. LaunchKit bietet alle drei und lässt das letzte Wort beim Menschen.

## Ein Regelwerk für Menschen und Agenten

Jede Agenten-Sitzung beginnt mit `AGENTS.md` im Wurzelverzeichnis des Repositorys. (`CLAUDE.md` verweist nur darauf, damit jedes Werkzeug dieselbe Datei liest.) Sie deckt ab, was alle Neuen wissen müssen:

- **Wie der Code organisiert ist:** welche Ordner von welchen abhängen, wo Sektionen liegen und warum Routen keine wiederverwendbare Logik enthalten.
- **Die Konventionen:** striktes TypeScript, Farben nur über Tokens, keine fest eingebauten Texte in Komponenten und jeder Oberflächentext in allen vier Sprachen.
- **Die Prüfungen, die laufen müssen:** `pnpm check` und `pnpm test:e2e`, und was zu tun ist, wenn eine aus einem anderen Grund fehlschlägt.
- **Wie berichtet wird:** was sich geändert hat und warum, welche Prüfungen gelaufen und bestanden sind und was der Mensch noch entscheiden muss.

Die Regeln einmal aufzuschreiben, erfüllt zwei Zwecke. Agenten halten sich daran, und Menschen, die neu ins Projekt kommen, bekommen dieselbe Anleitung.

## Agenten schreiben Code, Menschen gehört die Historie

Der wichtigste Abschnitt in `AGENTS.md` ist Wort für Wort aus der Projektspezifikation übernommen. Agenten dürfen das Repository lesen, Dateien ändern, Tests ausführen und Arbeit vorbereiten. Sie dürfen ohne ausdrückliche Erlaubnis nichts stagen, nicht committen, nicht pushen, keine Pull-Requests öffnen und die Historie nicht umschreiben, und selbst dann müssen sie unmittelbar vorher noch einmal nachfragen.

> Der Agent schreibt und validiert den Code. Der Mensch behält die letzte Kontrolle über die Git-Historie, Änderungen am Repository und die Veröffentlichung.

In der Praxis schließt ein Agent eine Aufgabe ab, führt die Prüfungen aus und lässt jede Änderung ungestaged zurück, mit einer Zusammenfassung. Der Mensch sieht sich den Diff an, committet ihn und entscheidet, was als Nächstes kommt. Nichts landet in der Historie des Repositorys, ohne dass ein Mensch es so wollte.

## Skills: Know-how auf Abruf

Agenten können **Skills** laden: gebündelte Anleitungen für eine bestimmte Art von Aufgabe. LaunchKit bindet 18 davon auf Projektebene in `skills-lock.json` fest ein, sodass jeder Klon genau dieselben Versionen bekommt:

- vierzehn Engineering-Skills aus der Sammlung von Matt Pocock, für Code-Reviews, testgetriebene Entwicklung, Fehlerdiagnose und Moduldesign;
- zwei von Vercel, zu React-Performance und Richtlinien für Weboberflächen;
- einer von Anthropic, zu Frontend-Design;
- einer von shadcn/ui, für die Arbeit mit seinen Komponenten.

Auf einem neuen Klon stellt `pnpm dlx skills experimental_install` die Skills wieder her. Ein Skill läuft mit allen Rechten des Agenten, deshalb wird die `SKILL.md` jedes Skills gelesen, bevor er hinzukommt, und `AGENTS.md` hat immer Vorrang vor seinen Ratschlägen. Die Git-Regeln gewinnen jedes Mal.

## Aktuelles Wissen statt veralteter Erinnerung

Das Training eines Modells endet irgendwann; die Werkzeuge entwickeln sich weiter. LaunchKit nutzt Next.js 16, das sich so weit verändert hat, dass die Erinnerung eines Agenten an ältere Versionen ihn in die Irre führen kann. Next.js liefert seine Dokumentation im installierten Paket mit, und `AGENTS.md` weist Agenten an, die passende Anleitung in `node_modules/next/dist/docs/` zu lesen, bevor sie Code schreiben. Als ein Agent die Seitenübergänge dieser Website ergänzt hat, hat er mit dieser Dokumentation gearbeitet, nicht aus dem Gedächtnis.

Storybook macht es genauso: `pnpm exec storybook skills stories` und `write-story` geben einem Agenten aktuelle Anleitungen zum Schreiben von Stories.

## Prüfungen, die finden, was im Review durchrutscht

Regeln helfen nur, wenn ein Verstoß auffällt. Den Prüfungen von LaunchKit ist egal, wer den Code geschrieben hat:

- **TypeScript und Zod** weisen Inhalte zurück, die nicht zum Schema einer Sektion passen.
- **Die Sektions-Registry** kompiliert nicht, solange ein Sektionstyp keine Komponente hat.
- **ESLint** lässt keine Warnungen zu und weist fest eingebaute Farben zurück.
- **`pnpm i18n:check`** schlägt fehl, sobald einer Sprache eine Nachricht fehlt.
- **Story-Tests** führen axe auf jeder Komponente aus, und **End-to-End-Tests** prüfen jede Seite auf Desktop und Mobilgerät, in beiden Themes.

Ein Agent führt sie alle aus, bevor er berichtet, und dieselben Prüfungen laufen bei jedem Pull-Request in der CI.

## So sieht eine Sitzung aus

Diese Website ist in einer Reihe von Agenten-Sitzungen entstanden, jede eine einzelne, überprüfbare Aufgabe: Kopfzeile und Navigation, die Startseite, die Seiten Beispiele und Preise, ein Feinschliff und diese Anleitungen. Alle folgten demselben Ablauf.

1. **Ein Auftrag.** Der Mensch beschreibt Ziel und Grenzen: was dazugehört, was nicht und was nicht angefasst werden darf.
2. **Zuerst lesen.** Der Agent sieht sich den betroffenen Code, die Tests und die Dokumentation an, bevor er etwas vorschlägt, und fragt nach Entscheidungen, die wirklich beim Menschen liegen, etwa welche Sektionen eine Seite haben soll.
3. **Bauen und überprüfen.** Er macht die kleinste saubere Änderung, führt jede Prüfung aus und sieht sich das Ergebnis in einem echten Browser an, in beiden Themes und in mehreren Breiten.
4. **Berichten.** Er listet auf, was sich geändert hat, welche Prüfungen bestanden sind und was der Mensch entscheiden oder wissen sollte.
5. **Prüfen und committen.** Der Mensch liest den Diff und committet ihn oder bittet um Änderungen.

Der Überprüfungsschritt zahlt sich aus. In diesen Sitzungen hat er eine Kopfzeile gefunden, die auf Tablets in drei Sprachen seitlich scrollte, einen Test, der nur unter Last fehlschlug, ein Dropdown, das die Seite nach dem Sprung zu einer Sektion wieder nach oben zog, und ein Kontaktformular, das jede Nachricht stillschweigend verwarf. Nichts davon war bei einem kurzen Blick in den Code zu sehen. Alles fiel auf, als der Agent die echte Website gemessen, ausgeführt und durchgeklickt hat.

## So arbeiten Sie selbst

Jedes Projekt auf Basis von LaunchKit erbt diese Einrichtung: dieselbe `AGENTS.md`, dieselben Skills und dieselben Prüfungen. Passen Sie `AGENTS.md` an Ihr Projekt an, behalten Sie die Git-Regeln und lassen Sie die Prüfungen aufpassen. Das Ziel ist nicht, das Projekt einem Agenten zu überlassen. Es geht darum, einem fähigen Mitarbeiter klare Regeln, schnelles Feedback und einen Menschen an die Seite zu geben, der entscheidet.
