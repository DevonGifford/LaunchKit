import type { PageDefinition } from '@/lib/content/types';

/** Screenshots of LaunchKit's own sections, in public/marketing/showcase/, each linking to where it lives. */
const screen = (name: string, file: string, href: string) => ({
  name,
  href,
  light: `/marketing/showcase/${file}-light.webp`,
  dark: `/marketing/showcase/${file}-dark.webp`,
});

/** The Examples page in German, translated from src/content/en/pages/examples.ts. */
export const examples = {
  meta: {
    title: 'Beispiele',
    description:
      'Die Websites, die gerade mit LaunchKit entstehen, die Sektionen, aus denen sie bestehen, und was Sie selbst bauen könnten.',
  },
  sections: [
    {
      // The fixture's social proof is left out: there are no real ratings to show yet.
      id: 'hero',
      type: 'hero-centered',
      title: 'Was mit LaunchKit entsteht',
      titleHighlight: 'LaunchKit',
      description:
        'Die ersten Projekte sind in Arbeit. Bis sie starten, sehen Sie hier, was jedes werden soll, aus welchen Sektionen es besteht und was Sie selbst bauen könnten.',
      primaryAction: { label: 'Projekt starten', href: '/contact' },
      menu: {
        label: 'Entdecken',
        items: [
          { label: 'Projekte in Arbeit', href: '/examples#projects' },
          { label: 'Die Sektionsbibliothek', href: '/examples#library' },
          { label: 'Alle Sektionen', href: '/examples#sections' },
          { label: 'Dokumentation', href: '/docs' },
        ],
      },
    },
    {
      // The previous homepage's use cases: the projects LaunchKit was made for.
      id: 'projects',
      type: 'lineup',
      eyebrow: 'In Arbeit',
      title: 'Sechs Websites in Arbeit.',
      description:
        'Jede behält ihre Marke, Inhalte und Funktionen und teilt sich die Technik darunter. Wir verlinken sie hier, sobald sie starten.',
      items: [
        {
          name: 'Agentur-Website',
          kind: 'Unternehmen · Portfolio',
          description: 'Leistungen, Fallstudien und ein durchdachter Weg zur Kontaktaufnahme.',
        },
        {
          name: 'Homelab-Hardware',
          kind: 'Produktschaufenster',
          description:
            'Generalüberholte Geräte mit technischen Daten und Anfragen; ein Shop kann später folgen.',
        },
        {
          name: 'UnPocketed',
          kind: 'App-Landingpage',
          description: 'Funktionen, Screenshots und Download-Links für eine mobile App.',
        },
        {
          name: 'selfOS',
          kind: 'Produkt · SaaS',
          description: 'Eine klare Produktgeschichte, Dokumentation und eine Warteliste.',
        },
        {
          name: 'Modemarke',
          kind: 'Markenschaufenster',
          description: 'Kollektionen, Bildwelten und Markengeschichte; der Checkout läuft separat.',
        },
        {
          name: 'Redesign-Demos',
          kind: 'Vertrieb · Portfolio',
          description:
            'Startseiten im Vorher-nachher-Vergleich, die zeigen, was ein besseres Fundament möglich macht.',
        },
      ],
    },
    {
      id: 'library',
      type: 'capabilities',
      variant: 'detailed',
      eyebrow: 'Die Sektionsbibliothek',
      title: 'Verschiedene Websites aus denselben Sektionen.',
      description:
        'Jedes Projekt greift auf eine Bibliothek typisierter Sektionen zurück, jede bereit für beide Themes, vier Sprachen und jede Bildschirmgröße.',
      action: { label: 'Dokumentation lesen', href: '/docs' },
      items: [
        {
          title: 'Die Seite eröffnen',
          description:
            'Vier Hero-Layouts, vom ruhigen typografischen Einstieg bis zum scrollgesteuerten Film, jedes mit Platz für einen klaren ersten Schritt.',
          tags: ['Basis-Hero', 'Zentrierter Hero', 'Geteilter Hero', 'Cinematic Hero'],
        },
        {
          title: 'Die Geschichte erzählen',
          description:
            'Sektionen, die erklären, was Sie tun und warum es wichtig ist, von einer einzelnen Aussage bis zum Funktionsraster.',
          tags: ['Statement', 'Funktionen', 'Leistungen', 'Bento', 'Übersicht', 'Showcase'],
        },
        {
          title: 'Überzeugen',
          description:
            'Belege und nächste Schritte: Zahlen, Logos, Stimmen, Pläne, Antworten und ein Formular, damit Besucher wissen, was als Nächstes zu tun ist.',
          tags: [
            'Kennzahlen',
            'Logo-Laufband',
            'Stimmen',
            'Preise',
            'FAQ',
            'Call-to-Actions',
            'Kontaktformular',
          ],
        },
      ],
    },
    {
      // The showcase fixture, linking each screenshot to where the section lives now.
      id: 'sections',
      type: 'showcase',
      eyebrow: 'Showcase',
      title: 'Jede Sektion, bereit zum Kombinieren.',
      description:
        'Entdecken Sie die Sektionen, die LaunchKit mitbringt. Jede nimmt typisierte Inhalte entgegen, funktioniert in vier Sprachen und folgt dem aktiven Theme.',
      primaryAction: { label: 'Loslegen', href: '/docs/getting-started' },
      secondaryAction: { label: 'Dokumentation lesen', href: '/docs' },
      items: [
        screen('Hero', 'hero', '/#hero'),
        screen('Preise', 'pricing', '/pricing'),
        screen('Zeitleiste', 'timeline', '/#timeline'),
        screen('Infrastruktur', 'infrastructure', '/#infrastructure'),
        screen('Tech-Stack', 'tech-stack', '/#stack'),
        screen('Entwicklererfahrung', 'developer-experience', '/#developer-experience'),
        screen('Qualität und Automatisierung', 'quality', '/#quality'),
        screen('Anwendungsfälle', 'use-cases', '/examples#projects'),
      ],
    },
    {
      id: 'begin',
      type: 'cta-split',
      eyebrow: 'Als Nächstes: Ihr Projekt',
      title: 'Haben Sie ein Projekt im Kopf?',
      description:
        'Starten Sie selbst mit LaunchKit oder lassen Sie es uns gemeinsam mit Ihnen bauen. So oder so beginnt es auf demselben getesteten Fundament.',
      primaryAction: { label: 'Kontakt aufnehmen', href: '/contact' },
      secondaryAction: { label: 'Loslegen', href: '/docs/getting-started' },
      image: '/marketing/cta-images/cta-image-4.webp',
      items: ['Ihre Marke', 'Vier Sprachen', 'Barrierefrei', 'Getestet', 'Gepflegt'],
    },
  ],
} satisfies PageDefinition;
