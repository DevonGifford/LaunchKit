import type { PageDefinition, SectionOf } from '@/lib/content/types';
import { planAmounts, pricingCurrencies } from '@/content/en/pages/pricing';

// Prices and currencies are shared by every language: see src/content/en/pages/pricing.ts.
export { pricingCurrencies };

/** The plans, shared with the homepage's pricing section. */
export const pricingPlans = [
  {
    name: 'Selbst gebaut',
    description: 'Für Gründer, Entwickler und Teams, die LaunchKit direkt nutzen.',
    price: { amounts: planAmounts.buildItYourself },
    priceNote: 'Open Source',
    features: [
      'Wiederverwendbares Website-Fundament',
      'Themes und vier Sprachen',
      'Inhalte aus Sektionen',
      'Formulare, Tests und CI',
    ],
    action: { label: 'Loslegen', href: '/docs/getting-started' },
  },
  {
    name: 'Für Sie gebaut',
    description: 'Wir gestalten und bauen Ihre Website mit LaunchKit.',
    price: { amounts: planAmounts.builtForYou },
    priceNote: 'Startpreis',
    features: [
      'Design für Ihre Marke',
      'Responsive Umsetzung und Launch',
      'Inhaltsstruktur und Beratung',
      'Ein getestetes Fundament darunter',
    ],
    action: { label: 'Gespräch buchen', href: '/contact' },
    recommended: true,
  },
  {
    name: 'Gebaut zum Wachsen',
    description: 'Für Teams, die individuelle Funktionen und laufende Unterstützung brauchen.',
    price: { label: 'Individuell' },
    priceNote: 'laufend',
    features: [
      'Individuelle Funktionen und Integrationen',
      'Laufende Verbesserungen',
      'Wartung und Support',
      'Ein langfristiger Technikpartner',
    ],
    action: { label: 'Sprechen Sie uns an', href: '/contact' },
  },
] satisfies SectionOf<'pricing'>['plans'];

/** Placeholder client wordmarks in public/marketing/clients/, from the marquee story's fixtures. */
const client = (name: string, file: string, width: number) => ({
  name,
  src: `/marketing/clients/${file}.svg`,
  width,
  height: 40,
});

/** The Pricing page in German, translated from src/content/en/pages/pricing.ts. */
export const pricing = {
  meta: {
    title: 'Preise',
    description:
      'Starten Sie kostenlos mit dem LaunchKit-Fundament oder lassen Sie Ihre Website mit uns gestalten, bauen und weiterentwickeln.',
  },
  sections: [
    {
      // The pricing fixture in full. Its own compact heading opens the page, so
      // the plans start close to the top.
      id: 'plans',
      type: 'pricing',
      eyebrow: 'Preise',
      title: 'Einfache Preise für jede Phase.',
      description:
        'Starten Sie kostenlos mit dem Fundament oder lassen Sie uns Ihre Website gemeinsam mit Ihnen gestalten, bauen und weiterentwickeln.',
      currencies: pricingCurrencies,
      currencyNote: 'Wählen Sie Ihre Währung. Die Preise sind je Region festgelegt.',
      plans: pricingPlans,
      callout: {
        title: 'Brauchen Sie mehr?',
        description:
          'Für größere Projekte, umfassendere Softwarearbeit oder dedizierte technische Unterstützung schreiben Sie uns.',
        action: { label: 'Kontakt', href: '/contact' },
      },
      // Facts about LaunchKit itself, not customer metrics: it has none to show yet.
      proof: {
        title: 'LaunchKit auf einen Blick',
        items: [
          { value: 'MIT', label: 'Open-Source-Lizenz' },
          { value: '4', label: 'Integrierte Sprachen' },
          { value: '0', label: 'Konten zum Start nötig' },
          { value: '5', label: 'Pflicht-CI-Prüfungen bei jedem Pull-Request' },
        ],
      },
    },
    {
      // Placeholders: invented companies from the marquee fixture. Replace them
      // with real clients, or remove the section, before launch.
      id: 'clients',
      type: 'marquee',
      title: 'Teams, die uns vertrauen',
      items: [
        client('Brightfold', 'brightfold', 168),
        client('Quillmark', 'quillmark', 172),
        client('Fernvale', 'fernvale', 156),
        client('Kitewell', 'kitewell', 150),
        client('Lumora', 'lumora', 132),
        client('Northpine', 'northpine', 170),
      ],
    },
    {
      id: 'faq',
      type: 'faq',
      eyebrow: 'FAQ',
      title: 'Fragen zu den Preisen',
      description: 'Einen Plan wählen und was passiert, wenn Ihre Website live ist.',
      groups: [
        {
          title: 'Einen Plan wählen',
          items: [
            {
              question: 'Welcher Plan passt zu mir?',
              answer:
                'Selbst gebaut, wenn Sie oder Ihr Team die Website entwickeln; Für Sie gebaut, wenn wir sie gestalten und bauen sollen; und Gebaut zum Wachsen, wenn Sie individuelle Funktionen und laufende Unterstützung brauchen.',
            },
            {
              question: 'Was bedeutet „Startpreis“?',
              answer:
                'Hier beginnt eine typische Website im Plan Für Sie gebaut. Der endgültige Preis hängt von den Seiten und Funktionen ab, die Sie brauchen, und Sie kennen ihn, bevor die Arbeit beginnt.',
            },
            {
              question: 'Warum hat Gebaut zum Wachsen einen individuellen Preis?',
              answer:
                'Individuelle Funktionen und laufende Unterstützung unterscheiden sich von Team zu Team, daher richtet sich der Preis nach Ihrem Bedarf. Sprechen Sie uns an.',
            },
            {
              question: 'Warum kann ich eine Währung wählen?',
              answer:
                'Die Preise werden je Region von Hand festgelegt statt live umgerechnet, bleiben also rund und ändern sich nicht mit dem Wechselkurs.',
            },
          ],
        },
        {
          title: 'Nach dem Launch',
          items: [
            {
              question: 'Kann ich selbst anfangen und später Hilfe holen?',
              answer:
                'Ja. Alle Pläne nutzen dasselbe Fundament, eine selbst begonnene Website kann also zu Für Sie gebaut oder Gebaut zum Wachsen wechseln, ohne neu anzufangen.',
            },
            {
              question: 'Wo wird meine Website gehostet?',
              answer:
                'Wo es für Sie passt. Eine LaunchKit-Website ist eine Standard-Next.js-Anwendung und läuft auf Vercel oder bei jedem Host, der Next.js unterstützt.',
            },
            {
              question: 'Wird meine Website weiter verbessert?',
              answer:
                'Verbesserungen an LaunchKit kommen in Ihre Website, wenn Sie sie per Git mergen. Gebaut zum Wachsen ergänzt laufende Verbesserungen speziell für Ihre Website.',
            },
          ],
        },
      ],
    },
    {
      // A quiet close for anyone who read this far: the plans' buttons are well above.
      id: 'talk',
      type: 'cta-panel',
      title: 'Noch unentschlossen?',
      description:
        'Erzählen Sie uns von Ihrem Projekt, und wir helfen Ihnen, den passenden Plan zu wählen, oder starten Sie noch heute selbst.',
      primaryAction: { label: 'Kontakt aufnehmen', href: '/contact' },
      secondaryAction: { label: 'Kostenlos starten', href: '/docs/getting-started' },
    },
  ],
} satisfies PageDefinition;
