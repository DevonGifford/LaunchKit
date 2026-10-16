import type { PageDefinition } from '@/lib/content/types';

export const home = {
  meta: {
    title: 'Ein wiederverwendbares Next.js-Fundament',
    description:
      'LaunchKit ist ein gepflegtes Fundament aus Designsystem, Lokalisierung, Inhalten und Werkzeugen, damit jede neue Website auf bewährtem Grund beginnt.',
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      eyebrow: 'Ein Fundament für ambitionierte Ideen',
      title: 'Gebaut für das, was kommt.',
      description:
        'LaunchKit ist ein durchdachtes Next.js-Fundament: Designsystem, Lokalisierung, Inhalte und Werkzeuge, bereit ab dem ersten Tag. Jede neue Website beginnt auf bewährtem Grund statt in einem leeren Ordner.',
      primaryAction: { label: 'Loslegen', href: '/docs/getting-started' },
      secondaryAction: { label: 'Projekt starten', href: '/contact' },
      preview: {
        filename: 'src/content/de/pages/home.ts',
        code: `export const home = {
  sections: [
    { type: 'hero', title: 'Gebaut für das, was kommt.' },
    { type: 'statement', title: 'Einmal bauen…' },
    { type: 'features', title: 'Drei Ebenen…' },
    { type: 'lineup', title: 'Sechs Websites…' },
    { type: 'marketing-developer-experience', title: 'Vom Klon…' },
    { type: 'cta-band', title: 'Beginnen Sie…' },
  ],
} satisfies PageDefinition;`,
      },
    },
    {
      id: 'philosophy',
      type: 'statement',
      eyebrow: 'Die Philosophie',
      title: 'Einmal bauen. Oft wiederverwenden. Zentral verbessern.',
      paragraphs: [
        'Die meisten Websites beginnen gleich: ein Framework, Komponenten, ein Theme, Übersetzungen, Formulare, Tests und CI, jedes Mal neu zusammengesetzt und jedes Mal ein wenig anders.',
        'LaunchKit erledigt diese Arbeit einmal, sorgfältig, und pflegt sie weiter. Neue Projekte starten barrierearm, lokalisiert und getestet und widmen ihre Zeit dem, was sie besonders macht.',
        'Wird das Fundament besser, kann jedes darauf aufbauende Projekt die Verbesserung bewusst übernehmen, mit einem gewöhnlichen Git-Merge.',
      ],
    },
    {
      id: 'included',
      type: 'features',
      eyebrow: 'Was enthalten ist',
      title: 'Drei Ebenen, bereit ab dem ersten Tag.',
      description:
        'Eine kleine, sorgfältig gebaute Basis statt einer riesigen Galerie für erdachte Anforderungen.',
      items: [
        {
          title: 'Designsystem',
          description:
            'Semantische Tokens, helle und dunkle Darstellung und barrierearme Grundbausteine, die eine neue Marke übernehmen, ohne neu geschrieben zu werden.',
          points: [
            'Die Markenpalette steht in einer einzigen Datei',
            'Hell und dunkel, passend zum System',
            'shadcn/ui-Bausteine direkt im Repository',
          ],
        },
        {
          title: 'Anwendungsfundament',
          description:
            'Routing, Lokalisierung, typisierte Inhalte und validierte Formulare: was jede Website braucht, bereits verbunden.',
          points: [
            'Vier Sprachen mit lokalisierten Metadaten',
            'Seiten aus typisierten Abschnitten',
            'React Hook Form mit Zod-Validierung',
          ],
        },
        {
          title: 'Entwicklererfahrung',
          description:
            'Strikte Typen, schnelles Feedback und Prüfungen, die auf jedem Rechner und in der CI gleich laufen.',
          points: [
            'Striktes TypeScript, ESLint und Prettier',
            'Unit-, Browser- und End-to-End-Tests',
            'Storybook mit Barrierefreiheitsprüfungen',
          ],
        },
      ],
    },
    {
      id: 'adapt',
      type: 'lineup',
      eyebrow: 'Gebaut, um sich anzupassen',
      title: 'Sechs verschiedene Websites. Ein Fundament.',
      description:
        'Jedes Projekt behält seine Marke, seine Inhalte und Funktionen und teilt sich die Technik darunter.',
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
      id: 'developer-experience',
      type: 'marketing-developer-experience',
      eyebrow: 'Entwicklererfahrung',
      title: 'Vom Klon zur laufenden Website in Minuten.',
      description:
        'pnpm, striktes TypeScript und vertraute Skripte. Für den Start braucht es keine Konten, Schlüssel oder kostenpflichtigen Dienste.',
      steps: [
        {
          comment: 'Projekt anlegen, LaunchKit bleibt upstream',
          command: 'git clone --origin upstream git@github.com:DevonGifford/LaunchKit.git my-site',
        },
        { comment: 'Installieren, ohne Zugangsdaten', command: 'pnpm install' },
        { comment: 'Entwicklungsserver starten', command: 'pnpm dev' },
        { comment: 'Dieselben Prüfungen wie die CI ausführen', command: 'pnpm check' },
        {
          comment: 'Später: Verbesserungen von upstream ausdrücklich mergen',
          command: 'git fetch upstream && git merge upstream/main',
        },
      ],
      stack: [
        'Next.js 16',
        'React 19',
        'TypeScript 6',
        'Tailwind CSS 4',
        'next-intl',
        'Zod',
        'Vitest',
        'Playwright',
        'Storybook',
      ],
    },
    {
      id: 'begin',
      type: 'cta-band',
      title: 'Beginnen Sie mit einem besseren Fundament.',
      description:
        'Starten Sie Ihre nächste Website mit LaunchKit, machen Sie sie unverwechselbar zu Ihrer eigenen und lassen Sie die Technik darunter weiter besser werden.',
      primaryAction: { label: 'Anleitung lesen', href: '/docs/getting-started' },
      secondaryAction: { label: 'Kontakt aufnehmen', href: '/contact' },
    },
  ],
} satisfies PageDefinition;
