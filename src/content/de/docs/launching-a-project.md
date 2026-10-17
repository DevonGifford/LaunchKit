---
title: Mit LaunchKit starten
description: Ein durchgespieltes Beispiel, vom leeren Repository bis zur Website, die live ist, getestet wird und weiter Verbesserungen aus LaunchKit übernimmt.
updated: 2026-10-17
order: 3
summary: Ein Durchgang in acht Schritten, wie eine Website mit LaunchKit an den Start geht: das Repository einrichten, eine Marke vergeben, Seiten aus vorhandenen Sektionen bauen, das Kontaktformular anbinden, die Prüfungen ausführen, live gehen und künftige Releases übernehmen.
next: making-it-yours, component-library
---

LaunchKit ist dafür da, darauf aufzubauen. Dieser Durchgang begleitet ein Projekt vom ersten Befehl bis zum Launch: **UnPocketed**, eine mobile App, die eine Landingpage mit ihren Funktionen, ein paar Screenshots und Download-Links braucht. Sie gehört zu den Websites, die auf LaunchKit entstehen sollen, und ist darum ein gutes Beispiel: klein genug, um ihr zu folgen, und anders genug als die LaunchKit-Website, um den Punkt zu beweisen.

Die Schritte sind für jedes Projekt dieselben. Wo UnPocketed eine Entscheidung trifft, trifft Ihres vielleicht eine andere.

## 1. Von upstream ausgehen

Ein Downstream-Projekt ist ein eigenes Repository, das die Git-Historie von LaunchKit teilt. Diese gemeinsame Historie lässt Verbesserungen später nach unten fließen. Beginnen Sie deshalb mit einem Klon, nicht mit einer Kopie:

```sh
git clone --origin upstream \
  git@github.com:DevonGifford/LaunchKit.git unpocketed-site
cd unpocketed-site
git remote add origin \
  git@github.com:unpocketed/unpocketed-site.git
git push -u origin main
pnpm install
```

LaunchKit ist jetzt das Remote `upstream`, Ihr Repository ist `origin`. GitHub erlaubt nur einen Fork pro Konto, deshalb ist das hier ein Klon mit zwei Remotes statt eines Forks: Es zählt die Historie, nicht das Abzeichen.

Richten Sie dann das Repository ein:

1. Führen Sie `scripts/setup-github.sh` aus. Es legt den Branch `staging` an und die Regeln, die ihn und `main` schützen: Änderungen nur per Pull-Request, und die CI muss bestehen.
2. Schalten Sie die Dependabot-Warnungen und Sicherheitsupdates ein, wenn das Skript es anbietet. Die Konfiguration kommt mit dem Code, aber GitHub aktiviert sie bei einem neuen Repository nicht von selbst.
3. Ersetzen Sie die Kontaktdaten in `CODE_OF_CONDUCT.md` und `SECURITY.md`.

## 2. Eine Marke vergeben

Der Auftritt von UnPocketed beginnt in einer einzigen Datei. Seine Palette ersetzt die beiden Token-Blöcke in `src/app/theme.css`, einen für hell und einen für dunkel, und jede Komponente folgt. Sein Logo kommt nach `public/brand/`, als neue Dateien, statt die von LaunchKit zu überschreiben, damit künftige Merges sauber bleiben.

Öffnen Sie Storybook und wechseln Sie zwischen den Themes. Jede Sektion ist dort in jeder Bildschirmgröße zu sehen, sodass ein Problem in der Palette in Minuten auffällt, und das Barrierefreiheits-Panel zeigt jeden Text, der den nötigen Kontrast nicht erreicht.

## 3. Die Seiten gestalten

Eine App-Landingpage braucht einen starken Einstieg, Belege, dass sich die Installation lohnt, und einen klaren Weg zum Download. Die Startseite von UnPocketed in `src/content/en/pages/home.ts` entsteht aus Sektionen, die LaunchKit schon mitbringt:

| Sektion         | Ihre Aufgabe auf der Startseite von UnPocketed                       |
| --------------- | -------------------------------------------------------------------- |
| `hero-centered` | Das Versprechen der App, mit dem Download-Button zuerst              |
| `showcase`      | Ein Karussell echter Screenshots, hell und dunkel                    |
| `features`      | Was die App kann, in drei einfachen Gruppen                          |
| `reviews`       | Was frühe Nutzer sagen, sobald es echte Stimmen gibt                 |
| `faq`           | Datenschutz, Preise und Plattformen, beantwortet, bevor jemand fragt |
| `cta-band`      | Noch einmal die Download-Links, für alle, die bis zum Ende lesen     |

Keine Komponente muss sich ändern: Die Seite besteht aus Daten, und TypeScript prüft jedes Feld. Alles, was es nur bei UnPocketed gibt, etwa eine Reihe von App-Store-Badges, wäre eine neue Sektion im Projekt, gebaut wie in [Das LaunchKit-Designsystem](component-library) beschrieben.

## 4. Die Angaben ergänzen

`src/config/site.ts` nimmt den Namen des Projekts, die Kontaktdaten und die sozialen Profile auf. `src/config/navigation.ts` legt die Menüs fest. Für die Website einer App mit nur einer Seite reichen vielleicht Funktionen, Stimmen und FAQ, die auf Sektionen der Startseite verweisen. Jede Beschriftung ist eine Nachricht in `messages/`, die Menüs werden also mit allem anderen übersetzt.

## 5. Das Kontaktformular anbinden

Dieser Schritt geht leicht unter. Das Kontaktformular von LaunchKit validiert jede Nachricht, im Browser und noch einmal auf dem Server, und hört dann auf: Der Versand bleibt jedem Projekt überlassen, damit ein frischer Klon kein E-Mail-Konto braucht. Solange Sie es nicht anbinden, kommen Nachrichten nirgends an.

Der Versand ist eine einzige Funktion, `deliver()` in `src/lib/forms/contact-action.ts`. Schicken Sie die Nachricht von dort an einen E-Mail-Dienst, ein CRM oder einen Webhook. Deklarieren Sie Schlüssel in `src/env.ts`, damit ein fehlender Wert sicher scheitert, und schreiben Sie die Nachrichten selbst nicht in Logs: Es sind personenbezogene Daten.

## 6. Alles prüfen

Bevor etwas live geht, führen Sie dieselben Prüfungen aus wie die CI:

```sh
# Typen, Lint, Formatierung und Übersetzungen,
# dann Unit-, Browser- und Story-Tests
pnpm check

# Ein Produktions-Build, getestet auf Desktop und Mobil
pnpm test:e2e
```

Zusammen prüfen sie jede Seite in beiden Themes auf Barrierefreiheitsprobleme, stellen sicher, dass keine Seite auf einem 320 px breiten Smartphone seitlich scrollt, und finden jede Sprache, der eine Nachricht fehlt.

## 7. Live gehen

Deployen Sie bei jedem Host, der Next.js ausführt. Bei Vercel verbinden Sie das Repository, und Produktions-Deployments folgen `main`. Setzen Sie `NEXT_PUBLIC_SITE_URL` auf die echte Adresse der Website, damit kanonische Links, Sitemap und Sprachalternativen auf die richtige Domain zeigen.

Von hier an folgt die Arbeit dem Branch-Modell von LaunchKit: kurzlebige Branches per Pull-Request nach `staging` und `staging` nach `main`, sobald es bereit für die Veröffentlichung ist.

## 8. Weiter Verbesserungen übernehmen

Mit dem Launch endet die Beziehung nicht. Wenn LaunchKit eine neue Version veröffentlicht, mergt UnPocketed sie bewusst:

```sh
git fetch upstream --tags
git switch staging
git switch -c chore/launchkit-v0.2.0
git merge v0.2.0
pnpm install
pnpm check && pnpm test:e2e
```

Lesen Sie vorher die Notizen zu dieser Version im `CHANGELOG.md` von LaunchKit; inkompatible Änderungen kommen mit den nötigen Schritten. Konflikte in `src/content/`, `messages/` und `theme.css` sind zu erwarten. Behalten Sie Ihre Seite, denn die Fassungen von LaunchKit sind in diesen Dateien nur Beispiele.

Und wenn UnPocketed etwas baut, das auch anderen Websites nützt, etwa ein besseres Screenshot-Karussell, kann es den umgekehrten Weg nehmen: als Pull-Request an LaunchKit und mit dem nächsten Release wieder zurück. Das ist die ganze Idee. Einmal bauen, oft wiederverwenden und zentral verbessern.
