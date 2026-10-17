import type { PageDefinition } from '@/lib/content/types';
import { pricingCurrencies, pricingPlans } from './pricing';

/** Screenshots of LaunchKit's own sections, in public/marketing/showcase/. */
const screenshot = (file: string) => ({
  light: `/marketing/showcase/${file}-light.webp`,
  dark: `/marketing/showcase/${file}-dark.webp`,
});

/**
 * Technology marks in public/marketing/logos/: the marquee stories'
 * tests/fixtures/logos/ files, plus more drawn the same way from the path data
 * in src/components/sections/tech-icons.tsx. Both come from Simple Icons
 * 16.35.0 (CC0-1.0, https://simpleicons.org). The marks are trademarks of their
 * owners, used here only to name the tools.
 */
const logo = (name: string, file: string) => ({
  name,
  src: `/marketing/logos/${file}.svg`,
  width: 24,
  height: 24,
});

/** The homepage in German, translated from src/content/en/pages/home.ts. */
export const home = {
  meta: {
    title: 'Das Fundament für Ihre nächste Website',
    description:
      'LaunchKit ist ein durchdachtes Next.js-Fundament mit Designsystem, vier Sprachen, typisierten Inhalten und automatischen Prüfungen, damit jede neue Website auf bewährtem Grund beginnt.',
  },
  sections: [
    {
      id: 'hero',
      type: 'marketing-hero-launchkit',
      eyebrow: 'Das moderne Fundament für Ihre nächste große Idee',
      title: ['Schneller starten.', 'Bauen, was zählt.'],
      titleHighlight: 'zählt.',
      audiences: ['Für Gründer', 'Für Startups', 'Für Relaunches'],
      description:
        'Ein durchdachtes Fundament für Gründer, Startups und Unternehmen, die neu durchstarten wollen.',
      primaryAction: { label: 'Loslegen', href: '/docs/getting-started' },
      secondaryAction: { label: 'Beispiele ansehen', href: '/examples' },
      showcase: {
        light: '/marketing/hero-showcase-light.webp',
        dark: '/marketing/hero-showcase-dark.webp',
        alt: 'Drei mit LaunchKit gebaute Websites in Browserfenstern',
        width: 1448,
        height: 1086,
      },
    },
    {
      id: 'technologies',
      type: 'marquee',
      title: 'Gebaut mit Werkzeugen, die Sie schon kennen',
      items: [
        logo('Next.js', 'nextjs'),
        logo('React', 'react'),
        logo('TypeScript', 'typescript'),
        logo('Tailwind CSS', 'tailwindcss'),
        logo('shadcn/ui', 'shadcn-ui'),
        logo('Radix UI', 'radix-ui'),
        logo('Zod', 'zod'),
        logo('React Hook Form', 'react-hook-form'),
        logo('Vitest', 'vitest'),
        logo('Storybook', 'storybook'),
        logo('ESLint', 'eslint'),
        logo('pnpm', 'pnpm'),
        logo('GitHub Actions', 'github-actions'),
      ],
      direction: 'right',
      speed: 'slow',
    },
    {
      id: 'timeline',
      type: 'marketing-setup-timeline',
      title: 'Jedes Mal dasselbe Setup.',
      titleMuted: 'Das muss nicht sein.',
      paragraphs: [
        {
          text: 'Ein Framework, ein Theme, Übersetzungen, Formulare, Tests und CI, für jedes Projekt neu zusammengesetzt und jedes Mal ein wenig anders.',
        },
        {
          text: 'Neun Wochen Arbeit, die Ihre Website nicht unverwechselbar machen.',
          emphasis: true,
        },
        {
          text: 'LaunchKit erledigt diese Arbeit einmal und hält sie aktuell, damit jedes Projekt mit dem beginnt, was es ausmacht.',
        },
      ],
      callout: {
        eyebrow: 'Mit LaunchKit',
        title: 'Tag 1: bauen, was zählt',
        description:
          'Das Fundament steht. Beginnen Sie mit Marke, Inhalten und Funktionen, die nur Sie beitragen können.',
      },
      // Illustrative estimates, as in the fixture; the fixture's note to "replace
      // these figures" is meant for downstream projects, so it is left off here.
      timeline: {
        title: 'Entwicklungszeitplan',
        badge: 'Schätzung',
        columns: { item: 'Bereich', before: 'Von Grund auf', after: 'Mit LaunchKit' },
        rows: [
          { item: 'Projekt-Setup und Werkzeuge', before: '1 Woche', after: 'Tag 1' },
          { item: 'Design-Tokens und Themes', before: '1 Woche', after: 'Tag 1' },
          { item: 'Barrierefreie UI-Komponenten', before: '2 Wochen', after: 'Tag 1' },
          { item: 'Lokalisierung in vier Sprachen', before: '1 Woche', after: 'Tag 1' },
          { item: 'Typisierte Inhalte und Sektionen', before: '1 Woche', after: 'Tag 1' },
          { item: 'Formulare und Server Actions', before: '1 Woche', after: 'Tag 1' },
          { item: 'Unit-, Browser- und End-to-End-Tests', before: '1 Woche', after: 'Tag 1' },
          { item: 'CI, Git-Hooks und Releases', before: '1 Woche', after: 'Tag 1' },
        ],
        total: { item: 'Gesamt', before: '9 Wochen', after: 'Tag 1' },
        note: 'Geschätzt für einen erfahrenen Entwickler.',
      },
    },
    {
      id: 'included',
      type: 'bento',
      eyebrow: 'Ein Blick in LaunchKit',
      title: 'Alles, was eine neue Website braucht, schon gebaut.',
      description:
        'Themes, vier Sprachen, responsive Layouts, Tests und Barrierefreiheitsprüfungen gehören zu jedem Projekt.',
      showcase: {
        stat: '20+ Sektionen',
        title: 'Sektionen für jede Seite',
        description:
          'Heros, Preise, Zeitleisten, FAQs und mehr, jeweils mit typisierten Inhalten und bereit für beide Themes.',
        images: [
          screenshot('hero'),
          screenshot('pricing'),
          screenshot('timeline'),
          screenshot('infrastructure'),
        ],
        alt: 'LaunchKit-Sektionen im Wechsel: der Hero, Preispläne, eine Zeitleiste und eine Infrastrukturübersicht.',
      },
      marquee: {
        stat: '40+ Komponenten',
        title: 'Primitives von shadcn/ui',
        description:
          'Barrierefreie Bausteine auf Basis von Radix UI, mit den Tokens von LaunchKit gestaltet und in Storybook geprüft.',
        action: { label: 'Dokumentation lesen', href: '/docs' },
        rows: [
          [
            'Accordion',
            'Alert dialog',
            'Avatar',
            'Badge',
            'Button',
            'Calendar',
            'Card',
            'Carousel',
          ],
          [
            'Checkbox',
            'Combobox',
            'Dialog',
            'Drawer',
            'Dropdown menu',
            'Popover',
            'Select',
            'Tabs',
          ],
          [
            'Input OTP',
            'Pagination',
            'Radio group',
            'Sheet',
            'Slider',
            'Switch',
            'Table',
            'Tooltip',
          ],
        ],
      },
      integrations: {
        title: 'Auf Werkzeugen, die Sie kennen',
        description:
          'Darunter Next.js, React und TypeScript, darüber Tailwind CSS, shadcn/ui und Zod. Nichts Proprietäres zu lernen.',
        tools: [
          { name: 'Next.js', icon: 'nextjs' },
          { name: 'React', icon: 'react' },
          { name: 'TypeScript', icon: 'typescript' },
          { name: 'Tailwind CSS', icon: 'tailwindcss' },
          { name: 'shadcn/ui', icon: 'shadcn-ui' },
          { name: 'Zod', icon: 'zod' },
        ],
      },
      gallery: {
        title: 'Seiten, die fertig aussehen',
        description:
          'Sunlight- und Midnight-Theme mit geprüftem Kontrast, damit jede Seite ab dem ersten Deployment vorzeigbar ist.',
        action: { label: 'Anpassen', href: '/docs/making-it-yours' },
        images: [
          { ...screenshot('tech-stack'), alt: 'Die Tech-Stack-Sektion' },
          { ...screenshot('developer-experience'), alt: 'Die Sektion zur Entwicklererfahrung' },
          { ...screenshot('quality'), alt: 'Die Sektion zu Qualität und Automatisierung' },
        ],
      },
    },
    {
      id: 'stack',
      type: 'marketing-technical-stack',
      eyebrow: 'Tech-Stack',
      title: 'Auf bewährten Werkzeugen gebaut.',
      description:
        'Aktuelle, gut gepflegte Werkzeuge, bereits konfiguriert und gemeinsam getestet.',
      featured: [
        { name: 'Next.js', description: 'React-Framework', icon: 'nextjs' },
        { name: 'React', description: 'UI-Bibliothek', icon: 'react' },
        { name: 'TypeScript', description: 'Strikte Typsicherheit', icon: 'typescript' },
        { name: 'Tailwind CSS', description: 'Styling über Tokens', icon: 'tailwindcss' },
        { name: 'shadcn/ui', description: 'UI-Komponenten', icon: 'shadcn-ui' },
        { name: 'next-intl', description: 'Vier Sprachen integriert', icon: 'next-intl' },
        { name: 'Zod', description: 'Schema-Validierung', icon: 'zod' },
        { name: 'React Hook Form', description: 'Validierte Formulare', icon: 'react-hook-form' },
      ],
      tools: [
        { name: 'Radix UI', description: 'UI-Primitives', icon: 'radix-ui' },
        { name: 'Lucide', description: 'Icons', icon: 'lucide' },
        { name: 'next-themes', description: 'Hell und dunkel', icon: 'next-themes' },
        { name: 'Sonner', description: 'Toasts', icon: 'sonner' },
        { name: 'date-fns', description: 'Datumswerte', icon: 'date-fns' },
        { name: 'Marked', description: 'Markdown-Dokumente', icon: 'marked' },
        { name: 'T3 Env', description: 'Typisierte Umgebungsvariablen', icon: 't3-env' },
        { name: 'Vitest', description: 'Unit-Tests', icon: 'vitest' },
        { name: 'Playwright', description: 'End-to-End-Tests', icon: 'playwright' },
        { name: 'Storybook', description: 'Komponentendoku', icon: 'storybook' },
        { name: 'axe-core', description: 'Barrierefreiheitsprüfungen', icon: 'axe-core' },
        { name: 'ESLint', description: 'Linting', icon: 'eslint' },
        { name: 'Prettier', description: 'Formatierung', icon: 'prettier' },
        { name: 'Lefthook', description: 'Git-Hooks', icon: 'lefthook' },
        { name: 'Commitlint', description: 'Commit-Nachrichten', icon: 'commitlint' },
        { name: 'pnpm', description: 'Paketmanager', icon: 'pnpm' },
        { name: 'GitHub Actions', description: 'CI', icon: 'github-actions' },
        { name: 'Dependabot', description: 'Wöchentliche Updates', icon: 'dependabot' },
      ],
    },
    {
      // The pipeline fixture, with two of its promises reworded to what
      // LaunchKit itself provides rather than what a host does.
      id: 'infrastructure',
      type: 'marketing-deployment-pipeline',
      eyebrow: 'Deployment-Pipeline',
      title: 'Infrastruktur, die mit Ihnen wächst.',
      description:
        'Ein Push bringt eine Änderung von Ihrem Branch in die Produktion, jedes Mal durch dieselben Prüfungen.',
      items: [
        {
          icon: 'globe',
          title: 'Überall deployen',
          description:
            'Eine Standard-Next.js-App für Vercel oder jeden Host, der Next.js ausführt.',
        },
        {
          icon: 'trending-up',
          title: 'Skaliert mit dem Traffic',
          description:
            'Seiten werden beim Build vorgerendert und als statische Dateien ausgeliefert.',
        },
        {
          icon: 'coins',
          title: 'Schlank im Betrieb',
          description:
            'Keine kostenpflichtigen Dienste zum Start, und statische Seiten halten die Hostingkosten niedrig.',
        },
        {
          icon: 'file-code',
          title: 'Infrastructure as Code',
          description: 'Konfiguration, Umgebungen und Deployment bleiben versioniert.',
        },
      ],
      pipeline: {
        caption: 'Vom Push zur Produktion',
        command: 'git push origin feat/pricing-page',
        steps: [
          { label: 'Qualität', detail: 'Typen, Lint, Tests und axe' },
          { label: 'Build', detail: 'jede Sprache vorgerendert' },
          { label: 'Vorschau', detail: 'eine URL pro Pull-Request' },
          { label: 'Produktion', detail: 'live beim Merge in main' },
        ],
      },
      badges: ['GitHub Actions', 'Vercel', 'Node.js 24+', 'pnpm 12'],
    },
    {
      id: 'quality',
      type: 'marketing-quality-gates',
      eyebrow: 'Qualitätsprüfungen',
      title: 'Bei jedem Schritt geprüft.',
      description:
        'Dieselben automatischen Prüfungen laufen auf Ihrem Rechner und in der CI, ob nun ein Mensch oder ein Agent den Code geschrieben hat.',
      stages: [
        {
          label: 'Stufe 1',
          title: 'Vor dem Commit',
          icon: 'shield-check',
          items: [
            { name: 'Lefthook', description: 'Schnelle Git-Hooks, die nur prüfen' },
            { name: 'ESLint', description: 'Keine Warnungen erlaubt' },
            { name: 'Prettier', description: 'Einheitliche Formatierung' },
            { name: 'Commitlint', description: 'Conventional Commits' },
          ],
        },
        {
          label: 'Stufe 2',
          title: 'CI-Pipeline',
          icon: 'flask-conical',
          items: [
            { name: 'TypeScript', description: 'Strikte Typprüfung' },
            { name: 'Vitest', description: 'Unit- und Browser-Tests' },
            { name: 'Storybook', description: 'Jede Story mit axe getestet' },
            { name: 'Playwright', description: 'End-to-End-Tests' },
          ],
        },
        {
          label: 'Stufe 3',
          title: 'Release',
          icon: 'package-check',
          items: [
            { name: 'Geschützte Branches', description: 'CI muss bestehen' },
            { name: 'Dependabot', description: 'Wöchentliche Updates' },
            { name: 'Changelog', description: 'Notizen zu jeder Version' },
            { name: 'Release-Workflow', description: 'Nur erfolgreiche Builds' },
          ],
        },
      ],
      highlights: [
        'Jeder Commit wird geprüft',
        'Dieselben Prüfungen lokal und in der CI',
        'Releases nur aus erfolgreichen Builds',
      ],
    },
    {
      id: 'talk',
      type: 'cta-editorial',
      eyebrow: 'Bereit für etwas Neues?',
      title: 'Lassen Sie uns über Ihr Projekt sprechen.',
      primaryAction: { label: 'Gespräch beginnen', href: '/contact' },
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
      id: 'numbers',
      type: 'stats',
      eyebrow: 'In Zahlen',
      title: 'Ein Fundament, das mit Ihnen Schritt hält.',
      description:
        'Jedes Release durchläuft dieselbe Testsuite, in allen Sprachen und beiden Themes, bevor es Ihr Projekt erreicht.',
      stats: [
        { value: '4', label: 'Sprachen ab Werk' },
        { value: '40+', label: 'Getestete Komponenten' },
        { value: '400+', label: 'Automatisierte Tests' },
      ],
    },
    {
      id: 'pricing',
      type: 'pricing',
      eyebrow: 'Preise',
      title: 'Einfache Preise für jede Phase.',
      description:
        'Beginnen Sie mit dem LaunchKit-Fundament und wählen Sie, wie viel persönliche Unterstützung Sie brauchen.',
      // The plans, shared with /pricing, and a link to everything else there.
      currencies: pricingCurrencies,
      plans: pricingPlans,
      callout: {
        title: 'Pläne im Detail vergleichen',
        description:
          'Was jeder Plan enthält, Preise in Ihrer Währung und Antworten auf häufige Fragen.',
        action: { label: 'Preise ansehen', href: '/pricing' },
      },
    },
    {
      // Demo reviews from the fixture: invented people. Replace them with real,
      // attributable reviews before launch.
      id: 'reviews',
      type: 'reviews',
      eyebrow: 'Stimmen',
      title: 'Was Teams über LaunchKit sagen',
      reviews: [
        {
          name: 'Amara Osei',
          role: 'Gründerin, Designstudio',
          quote:
            'Wir haben unsere neue Website in einer Woche gelauncht. Sektionen, Übersetzungen und Tests waren schon da, also haben wir die Zeit in unsere Geschichte gesteckt.',
        },
        {
          name: 'Jonas Weber',
          role: 'Lead Developer, Softwareagentur',
          quote:
            'Das Inhaltsmodell ist das, von dem ich nicht wusste, dass ich es brauche. Mit typisierten Sektionen schlägt der Build fehl, bevor eine kaputte Seite je in Produktion geht.',
        },
        {
          name: 'Lucía Romero',
          role: 'Freiberufliche Designerin',
          quote:
            'Für die neue Marke reichte eine Datei. Beide Themes zogen mit, und die Kontrastprüfungen zeigten mir, wo meine Palette nachgebessert werden musste.',
        },
        {
          name: 'Théo Martin',
          role: 'CTO, Onlinehändler',
          quote:
            'Vier Sprachen vom ersten Tag an. Unsere französischen und deutschen Kunden bekommen endlich dieselbe Website wie alle anderen.',
        },
        {
          name: 'Priya Nair',
          role: 'Produktmanagerin, SaaS-Start-up',
          quote:
            'Storybook hat Reviews einfach gemacht: jede Sektion für sich, in jeder Breite und in beiden Themes, bevor irgendetwas live ging.',
        },
        {
          name: 'Sam Okafor',
          role: 'Leitung, Webagentur',
          quote:
            'Wir starten jetzt jedes Kundenprojekt mit LaunchKit, und Verbesserungen für einen Kunden kommen auch allen anderen zugute.',
        },
      ],
    },
    {
      id: 'faq',
      type: 'faq',
      eyebrow: 'FAQ',
      title: 'Häufige Fragen',
      description: 'Alles, was Sie vor dem Start vielleicht noch wissen möchten.',
      groups: [
        {
          title: 'Allgemein',
          items: [
            {
              question: 'Was ist LaunchKit?',
              answer:
                'Ein wiederverwendbares Next.js-Fundament zum Bauen und Starten von Websites: inhaltsgetriebene Seiten, fertige Sektionen, zwei Themes, vier Sprachen und ein vollständiges Test-Setup.',
            },
            {
              question: 'Für wen ist es gedacht?',
              answer:
                'Für Gründer, Startups und Agenturen, die oft neue Websites starten und jede auf derselben gut getesteten Basis beginnen wollen.',
            },
            {
              question: 'Kann ich die Marke ändern?',
              answer:
                'Ja. Farben und Schriften liegen in einer Theme-Datei, und jede Komponente folgt ihr in Hell und Dunkel.',
            },
            {
              question: 'Ist die Nutzung kostenlos?',
              answer:
                'Ja. LaunchKit steht unter der MIT-Lizenz, für private wie kommerzielle Projekte.',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              question: 'Wie füge ich eine Seite hinzu?',
              answer:
                'Legen Sie für jede Sprache eine Inhaltsdatei an und registrieren Sie sie. Die Seite wird aus typisierten Sektionen gerendert, Fehler fallen also vor der Veröffentlichung auf.',
            },
            {
              question: 'Wie kommen Updates in mein Projekt?',
              answer:
                'Projekte auf Basis von LaunchKit holen sich Änderungen von upstream per Git, wie es die Anleitung zur Synchronisierung beschreibt.',
            },
            {
              question: 'Welche Sprachen sind enthalten?',
              answer:
                'Englisch, Spanisch, Französisch und Deutsch. Für eine weitere braucht es einen Nachrichtenkatalog und einige Inhaltsdateien.',
            },
            {
              question: 'Können Sie meine Website für mich bauen?',
              answer:
                'Ja. Schreiben Sie uns über die Kontaktseite, und wir besprechen, was Sie brauchen.',
            },
          ],
        },
      ],
    },
    {
      // The previous homepage's closing band, with the header's contact label.
      id: 'begin',
      type: 'cta-band',
      title: 'Beginnen Sie mit einem besseren Fundament.',
      description:
        'Starten Sie Ihre nächste Website mit LaunchKit, machen Sie sie unverwechselbar zu Ihrer eigenen und lassen Sie die Technik darunter weiter besser werden.',
      primaryAction: { label: 'Loslegen', href: '/docs/getting-started' },
      secondaryAction: { label: 'Kontakt aufnehmen', href: '/contact' },
    },
  ],
} satisfies PageDefinition;
