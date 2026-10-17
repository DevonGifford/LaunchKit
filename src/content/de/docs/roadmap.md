---
title: Die Zukunft von LaunchKit
description: Wohin LaunchKit sich entwickelt, was jede Phase bringt und was es bewusst nie werden wird.
updated: 2026-10-17
order: 6
summary: Wohin LaunchKit sich entwickelt: diese Website fertigstellen und übersetzen, das Fundament an echten Websites beweisen, optionale Analytics und Fehlerüberwachung, Anwendungsdienste nur bei Bedarf, die noch offenen Entscheidungen und was es nie werden wird.
next: launching-a-project, building-with-ai
---

LaunchKit soll klein bleiben. Es wächst nicht, indem es alles ergänzt, was eine Website eines Tages brauchen könnte; es wächst, wenn echte Projekte zeigen, was sie wirklich brauchen. Diese Roadmap ist darum keine Funktionsliste mit Terminen. Sie beschreibt die Reihenfolge, in der LaunchKit sich beweisen will, und die Regeln dafür, was hineinkommt.

## Jetzt: die Website fertigstellen

Das Fundament selbst steht: das Designsystem, vier Sprachen, Inhalte aus Sektionen, Formulare, Tests, CI und ein kontrollierter Release-Prozess. Die aktuelle Arbeit gilt der eigenen Website von LaunchKit, der, die Sie gerade lesen.

- **Endgültige Inhalte.** Echte Stimmen statt der Platzhalter und feste Preise, in allen Sprachen.
- **Jede Seite in jeder Sprache.** Die Website und diese Anleitungen entstehen zuerst auf Englisch und werden dann ins Spanische, Französische und Deutsche übersetzt, sobald das Englische steht, damit nichts zweimal übersetzt wird.
- **Die fehlenden Seiten.** Die Platzhalter-Links in der Fußzeile, etwa „Über uns“ und das Changelog, bekommen echte Ziele.

## Als Nächstes: sich an echten Websites beweisen

Die Spezifikation nennt das **Validierung unter realen Bedingungen**, und es ist die wichtigste Phase. Ein Fundament ist nur so gut wie die Websites, die darauf stehen.

- **Eine erste echte Website**, gebaut auf LaunchKit, indem Marke, Inhalte und Navigation ersetzt werden, während die gemeinsame Technik unangetastet bleibt.
- **Eine zweite, bewusst andere**, um zu zeigen, dass zwei sehr unterschiedliche Websites sich ein Fundament teilen können, ohne dagegen anzukämpfen.
- **Verbesserungen in beide Richtungen.** Eine Änderung für ein Projekt wird upstream beigetragen, veröffentlicht und in das andere gemergt. So wird das Modell aus Upstream und Downstream-Projekten von Anfang bis Ende erprobt.

Sechs Websites sind dafür geplant, von der Website einer Agentur und einem Shop für Homelab-Hardware bis zu UnPocketed, der Landingpage einer App. Sobald sie live gehen, erscheinen sie auf der Seite [Beispiele](/examples), vorgestellt mit eigens dafür gebauten Storybook-Komponenten.

## Später: optionale Einblicke

Wenn echte Deployments es rechtfertigen, bietet LaunchKit schlanke, **optionale** Möglichkeiten, um zu sehen, wie es den Websites geht:

- **Fehlerüberwachung** mit Sentry, mit zurückhaltendem Sampling.
- **Traffic-Analytics** mit Vercel Web Analytics oder PostHog, wenn ein Projekt Produkt-Analytics braucht. Nie beides standardmäßig.

Beides bleibt ausgeschaltet, bis ein Projekt es aktiviert, wird je Umgebung konfiguriert, achtet auf Datenschutz und kann gefahrlos unkonfiguriert bleiben. Ein frischer Klon läuft weiterhin ganz ohne Konten.

## Noch weiter: Anwendungsdienste

Manche Projekte werden mehr als eine Website. Für sie, und nur wenn ein echtes Projekt es braucht, könnte LaunchKit ergänzen:

- **Authentifizierung**, mit Clerk oder einem anderen Anbieter, der zu gegebener Zeit gewählt wird.
- **Eine Datenbank**, voraussichtlich Neon PostgreSQL mit Drizzle.
- **Strukturierte Logs**, mit vernünftigem Sampling und Schutz der Privatsphäre.

Zahlungen, Verfügbarkeitsüberwachung und visuelle Regressionstests liegen noch weiter in der Zukunft. Sie sind Möglichkeiten, keine Versprechen, und keine davon ist eine Bedingung für den Erfolg von LaunchKit.

## Noch zu entscheiden

Zwei Entscheidungen sind bewusst offen, um sie anhand von Belegen zu treffen statt nach Standard:

- **Die endgültigen Schriften.** LaunchKit nutzt System-Schriften, bis eine Serif und eine Sans-Serif nach Darstellung, Barrierefreiheit und Lizenz ausgewählt sind.
- **Der Analytics-Anbieter**, falls überhaupt: ob Vercel Web Analytics genügt oder ein Projekt PostHog braucht.

## Was LaunchKit nicht wird

Nein zu sagen gehört zum Plan. LaunchKit wird nicht:

- ein Pflicht-CMS oder einen Seitenbaukasten per Drag-and-drop mitbringen;
- ein ausuferndes System von Sektionsvarianten für ausgedachte Anforderungen bekommen;
- einen verpflichtenden Stack für Authentifizierung, Datenbank oder Abrechnung voraussetzen;
- einen verpflichtenden Monitoring- oder Logging-Dienst verlangen, weder kostenpflichtig noch selbst gehostet.

Jedes davon würde alle Projekte das Gewicht einiger weniger tragen lassen. Braucht ein Projekt so etwas, ergänzt es das bei sich, und wenn es sich für alle als nützlich erweist, kann es wieder upstream wandern.

## Auf dem Laufenden bleiben

Jede nennenswerte Änderung steht im `CHANGELOG.md`, und jedes Release kommt mit Hinweisen dazu, was Downstream-Projekte tun müssen. Wenn Sie eine Idee haben oder ein Projekt, das Sie auf LaunchKit bauen möchten, [schreiben Sie uns](/contact).
