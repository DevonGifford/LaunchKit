---
title: LLM-Hinweis
description: Wie LaunchKit mit großen Sprachmodellen, KI-Agenten und maschinenlesbaren Inhalten umgeht und was seine llms.txt genau preisgibt.
updated: 2026-10-17
order: 3
---

LaunchKit ist ein Open-Source-Fundament, um Websites mit Next.js zu bauen. Immer öfter lernen Menschen Projekte wie dieses über KI-Assistenten und Coding-Agenten kennen, die Websites und Dokumentation im Auftrag anderer lesen. Diese Seite erklärt, was LaunchKit solchen Werkzeugen bietet, was nicht, und wo die verlässlichen Informationen zu finden sind.

## Warum ein Einstiegspunkt für LLMs

Ein Agent, der nach LaunchKit gefragt wird oder in einem LaunchKit-Projekt arbeiten soll, hat wenig Platz für Kontext und keine verlässliche Möglichkeit, eine technische Anleitung von einer Marketingseite zu unterscheiden. Auf sich gestellt, liest er, was er zuerst findet. Eine kurze, ausgewählte Übersicht lässt ihn an der richtigen Stelle beginnen: bei der Dokumentation, den wenigen Fakten, die das Projekt prägen, und den Seiten, auf die es ankommt.

## Was /llms.txt ist

[`/llms.txt`](/llms.txt) ist eine Markdown-Datei im Wurzelverzeichnis dieser Website. Sie folgt dem llms.txt-Vorschlag, den Jeremy Howard 2024 erstmals veröffentlicht hat und der auf [llmstxt.org](https://llmstxt.org) inzwischen in zweiter Fassung vorliegt. Die Datei hat einen Titel, eine Zusammenfassung in einem Absatz, ein paar Hinweise zu Dingen, die leicht missverstanden werden, und Listen von Links mit je einem Satz dazu, am Ende eine optionale Liste, die ein Agent überspringen kann, wenn ihm der Platz ausgeht.

Sie ist für den Moment gedacht, in dem ein Assistent jemandem hilft, nicht für das Training von Modellen. Es ist ein Vorschlag aus der Community, kein formaler Standard, und ob Werkzeuge ihn überhaupt lesen, ist unterschiedlich.

Die Datei von LaunchKit entsteht beim Build der Website, aus denselben Inhalten wie die Seiten, auf die sie verweist. Eine neue Anleitung erscheint darin automatisch, mit ihrer eigenen Beschreibung.

## Was sie nicht ist

`llms.txt` liefert Kontext, keine Erlaubnis. Sie steuert nicht:

- **Das Crawling.** Welche automatisierten Werkzeuge welche Seiten abrufen dürfen, steht in [`/robots.txt`](/robots.txt), und seriöse Crawler halten sich freiwillig daran.
- **Die Indexierung in Suchmaschinen.** Suchmaschinen entscheiden anhand von Robots-Regeln, Seitenmetadaten wie `noindex` und ihren eigenen Richtlinien, was sie indexieren. `llms.txt` spielt dabei keine Rolle.
- **Das Training von Modellen.** Ob Inhalte einer Website für das Training von Modellen genutzt werden dürfen, legt eine Website, wenn überhaupt, über Robots-Regeln für bestimmte KI-Crawler fest oder über neuere Konventionen, die noch standardisiert werden. `llms.txt` erteilt diese Erlaubnis weder noch verweigert sie sie.

Derzeit wendet die `robots.txt` von LaunchKit eine einzige Regel auf alle Crawler an, die den Zugriff auf jede Seite erlaubt, und legt keine eigenen Regeln für KI-Crawler fest.

## Wo die maßgeblichen Informationen liegen

Wenn sich Quellen widersprechen, vertrauen Sie ihnen in dieser Reihenfolge:

1. **Dem Quellcode**, einschließlich seiner Konfiguration und Tests. Er ist das, was tatsächlich läuft.
2. **Der Dokumentation im Repository**, etwa `AGENTS.md`, `CHANGELOG.md` und der Spezifikation in `docs/`.
3. **Den Anleitungen auf dieser Website**, in der [Dokumentation](/docs).
4. **Allem anderen auf der Website**, einschließlich der Produkt- und Preisseiten, die LaunchKit für Menschen beschreiben, statt es festzulegen.

Alles, was ein Agent aus seinem Training oder aus älteren Versionen der Werkzeuge ableitet, steht unter all dem. LaunchKit nutzt Next.js 16, das sich in wichtigen Punkten von früheren Versionen unterscheidet; maßgeblich ist die Dokumentation, die mit der installierten Version ausgeliefert wird.

## Wie LaunchKit KI nutzt

LaunchKit wird mit KI-Coding-Agenten gebaut, die Seite an Seite mit einem Menschen arbeiten. Die Regeln, denen sie folgen, stehen in `AGENTS.md`: den Code lesen, bevor sie ihn ändern, den Konventionen des Projekts folgen, jede Prüfung ausführen und ohne ausdrückliche Erlaubnis des Menschen nie etwas stagen, committen, pushen oder einen Pull-Request öffnen. Dieselben automatischen Prüfungen gelten, egal wer den Code geschrieben hat. [KI in LaunchKit](/docs/building-with-ai) erzählt das ausführlicher.

Ein Teil der Inhalte dieser Website ist mit KI geschrieben und als solcher gekennzeichnet, etwa die Zusammenfassung am Anfang jeder Anleitung. Nichts auf der Website nutzt KI, um Besuchern zu antworten.

## Unsere llms.txt

Im Sinne der Transparenz sehen Sie hier genau, was der LLM-Einstiegspunkt von LaunchKit enthält: die vollständige, aktuelle Datei auf Englisch, erzeugt aus derselben Quelle wie [`/llms.txt`](/llms.txt) selbst.
