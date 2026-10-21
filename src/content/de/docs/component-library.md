---
title: Das LaunchKit-Designsystem
description: Die Primitives und Sektionen, aus denen jede LaunchKit-Website besteht, wie eine Sektion von typisierten Inhalten zur Seite wird und wie Sie eigene ergänzen.
updated: 2026-10-21
order: 4
summary: Wie die zwei Ebenen von LaunchKit zusammenspielen: rund fünfzig eigene Primitives und 28 Sektionstypen, der Weg einer Sektion vom Zod-Schema zur Seite, wie Storybook jede Story testet, und die Schritte und Hausregeln für eine eigene Sektion.
next: making-it-yours, building-with-ai
---

Jede Seite einer LaunchKit-Website, auch diese hier, entsteht aus derselben Bibliothek. Sie hat zwei Ebenen. **Primitives** sind die kleinen, barrierefreien Bausteine: Buttons, Eingabefelder, Dialoge, Menüs. **Sektionen** sind die Blöcke über die volle Breite, aus denen eine Seite besteht: ein Hero, eine Reihe von Funktionen, Preispläne, ein abschließender Call-to-Action. Primitives ergeben Sektionen; Sektionen ergeben Seiten.

Dieser Artikel erklärt, wie beide Ebenen funktionieren und warum sie so gebaut sind.

## Primitives: eigener Code, kein installiertes Paket

Die Primitives in `src/components/ui/` stammen von shadcn/ui. Das ist kein Paket, das man installiert, sondern Code, den man ins Projekt kopiert und der dann ihm gehört. Für ein Fundament ist das wichtig: Jede Primitive lässt sich an die Tokens von LaunchKit, seine 40-px-Bedienelemente und seine übersetzbaren Beschriftungen anpassen, und nichts ändert sich bei einem Update hinter Ihrem Rücken.

Heute sind es rund fünfzig: der shadcn/ui-Satz von Accordion bis Tooltip, dazu ein paar eigene kleine Bedienelemente von LaunchKit wie das Logo, die Sprachauswahl und der Theme-Schalter. Jede färbt sich ausschließlich über semantische Tokens wie `bg-surface` und `text-muted-foreground`, sodass eine neue Marke in `theme.css` alle auf einmal erreicht.

Eine weitere aus der shadcn/ui-Registry hinzuzufügen, braucht einen Befehl und eine kurze Checkliste: ihre Hover-Farben auf die von LaunchKit umstellen, ihre Beschriftungen übersetzbar machen und die Höhe ihrer Bedienelemente prüfen. Die Checkliste steht in `docs/theming.md`.

## Sektionen: Inhalt rein, Seite raus

Bei den Sektionen unterscheidet sich LaunchKit von den meisten Startern. Eine Sektion enthält nie ihre eigenen Texte. Sie nimmt typisierte Inhalte entgegen und stellt sie dar. So bleiben die Worte in `src/content/`, wo man sie übersetzen und umschreiben kann, ohne eine Komponente anzufassen.

Jeder Sektionstyp geht denselben Weg:

1. **Ein Schema.** Ein Zod-Schema in `src/lib/content/types.ts` beschreibt die Inhalte, die die Sektion entgegennimmt. Der TypeScript-Typ wird aus dem Schema abgeleitet, die beiden können sich also nicht widersprechen.
2. **Eine Komponente.** Die Komponente der Sektion in `src/components/sections/` nimmt genau diesen Typ entgegen.
3. **Die Registry.** `src/lib/content/registry.ts` ordnet jedem Sektionstyp seine Komponente zu. Der Typ dieser Zuordnung verlangt, dass jeder Sektionstyp darin steht. Ein Schema ohne Komponente ist darum ein Kompilierfehler und keine leere Stelle auf einer Seite.
4. **Die Seite.** Eine Seite in `src/content/` listet Sektionen in Reihenfolge auf, und der Renderer stellt jede mit ihrer Komponente dar.

Hier das kleinste Beispiel, eine Reihe von Kennzahlen:

```ts
// Das Schema: zwei bis vier Zahlen unter einer Überschrift.
export const statsSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('stats'),
  eyebrow: text.optional(),
  title: text,
  stats: z
    .array(z.object({ value: text, label: text }))
    .min(2)
    .max(4),
});
```

```ts
// Der Inhalt, auf einer beliebigen Seite.
{
  id: 'numbers',
  type: 'stats',
  title: 'Ein Fundament, das mit Ihnen Schritt hält.',
  stats: [
    { value: '4', label: 'Sprachen ab Werk' },
    { value: '40+', label: 'Getestete Komponenten' },
  ],
}
```

Ist ein Feld falsch oder sind es fünf Zahlen, meldet TypeScript das, bevor die Seite überhaupt gerendert wird.

## Was die Bibliothek enthält

Es gibt 28 Sektionstypen, gruppiert nach ihrer Aufgabe auf einer Seite:

| Gruppe                        | Sektionen                                                                        |
| ----------------------------- | -------------------------------------------------------------------------------- |
| Die Seite eröffnen            | Basis-, zentrierter, geteilter, Cinematic und Video-Hero                         |
| Die Geschichte erzählen       | Statement, Funktionen, Leistungen, Bento, Übersicht, Showcase                    |
| Überzeugen                    | Kennzahlen, Logo-Laufband, Stimmen, Preise, FAQ, Kontaktformular                 |
| Zum nächsten Schritt einladen | Call-to-Actions als Band, Panel, redaktionell, mit Bild und geteilt              |
| Die LaunchKit-Website         | Sechs Marketing-Sektionen, vom Hero der Startseite bis zu den Qualitätsprüfungen |

Die letzte Gruppe ist für die eigene Website von LaunchKit geschrieben und liegt in einem eigenen Ordner. Allgemeine Sektionen importieren nie etwas daraus, ein Downstream-Projekt kann sie also komplett ignorieren.

Eine Regel entscheidet, ob ein neues Layout eine **Variante** oder ein **neuer Typ** ist. Nehmen zwei Layouts dieselben Inhalte entgegen, sind sie eine Sektion mit einem Feld `variant`; die Leistungen-Sektion etwa hat die Varianten Karten, nummeriert und detailliert. Brauchen sie andere Inhalte, sind es getrennte Typen, gesammelt in einem Ordner, der nach ihrer Art benannt ist, wie `hero/` und `cta/`.

## Storybook, die Werkbank

Neben jeder Komponente liegen ihre Stories: heute 92 Dateien, jede zeigt die Komponente mit realistischen Inhalten. In Storybook (`pnpm storybook`) wird eine Sektion entworfen und geprüft, bevor sie auf einer Seite landet.

Die Stories laufen auch als Tests. Jede Story wird in einem echten Browser gerendert und von axe auf Barrierefreiheitsprobleme geprüft. Eigene Stories legen das dunkle Theme und die Breiten für Smartphone, Tablet und Desktop fest, sodass Kontrast und Layout in jedem Fall geprüft werden, und Interaktionstests bestätigen, dass Menüs sich öffnen, Karussells weiterlaufen und Formulare höflich protestieren. Einige Stories lesen ihre Inhalte direkt von einer echten Seite, sodass genau das geprüft wird, was live geht.

## Eine eigene Sektion ergänzen

Braucht ein Projekt eine Sektion, die LaunchKit nicht hat, geht es denselben Weg:

1. Fügen Sie ein Schema in `src/lib/content/types.ts` hinzu und ergänzen Sie es in `sectionSchema`, der Liste aller Sektionstypen.
2. Bauen Sie die Komponente in `src/components/sections/`. Sie nimmt `SectionOf<'ihr-typ'>` entgegen und sonst nichts.
3. Registrieren Sie sie in `src/lib/content/registry.ts`. Bis dahin schlägt TypeScript fehl.
4. Geben Sie ihr eine Story, damit sie wie alle anderen geprüft und getestet wird.

Ein paar Hausregeln halten die Bibliothek gesund, während sie wächst:

- **Kein Text in Komponenten.** Text kommt als Inhalt oder aus `messages/`, damit jedes Wort übersetzt werden kann.
- **Nur Tokens.** Farben kommen aus dem Theme, nie aus der Komponente.
- **Zuerst der Server.** Sektionen werden auf dem Server gerendert; nur der kleinste interaktive Teil, etwa ein Karussell oder ein Menü, läuft im Browser.
- **Sektionen stehen für sich.** Sie importieren einander nicht. Gemeinsame Teile kommen in `section-parts.tsx`.

Eine Sektion, die sich über ein Projekt hinaus als nützlich erweist, ist eine gute Kandidatin, um sie zu LaunchKit beizutragen. So wächst die Bibliothek: ein echter Bedarf nach dem anderen statt einer Galerie für ausgedachte Anforderungen.
