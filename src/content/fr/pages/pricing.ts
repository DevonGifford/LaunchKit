import type { PageDefinition, SectionOf } from '@/lib/content/types';
import { planAmounts, pricingCurrencies } from '@/content/en/pages/pricing';

// Prices and currencies are shared by every language: see src/content/en/pages/pricing.ts.
export { pricingCurrencies };

/** The plans, shared with the homepage's pricing section. */
export const pricingPlans = [
  {
    name: 'Faites-le vous-même',
    description:
      'Pour les fondateurs, développeurs et équipes qui utilisent LaunchKit directement.',
    price: { amounts: planAmounts.buildItYourself },
    priceNote: 'open source',
    features: [
      'Base de site réutilisable',
      'Thèmes et quatre langues',
      'Contenu par sections',
      'Formulaires, tests et CI',
    ],
    action: { label: 'Commencer', href: '/docs/getting-started' },
  },
  {
    name: 'Conçu pour vous',
    description: 'Nous concevons et construisons votre site avec LaunchKit.',
    price: { amounts: planAmounts.builtForYou },
    priceNote: 'prix de départ',
    features: [
      'Un design pour votre marque',
      'Développement responsive et mise en ligne',
      'Structure de contenu et accompagnement',
      'Une base testée en dessous',
    ],
    action: { label: 'Réserver un appel', href: '/contact' },
    recommended: true,
  },
  {
    name: 'Conçu pour grandir',
    description:
      'Pour les équipes qui ont besoin de fonctionnalités sur mesure et d’un accompagnement continu.',
    price: { label: 'Sur mesure' },
    priceNote: 'en continu',
    features: [
      'Fonctionnalités et intégrations sur mesure',
      'Améliorations continues',
      'Maintenance et assistance',
      'Un partenaire technique sur la durée',
    ],
    action: { label: 'Parlons-en', href: '/contact' },
  },
] satisfies SectionOf<'pricing'>['plans'];

/** Placeholder client wordmarks in public/marketing/clients/, from the marquee story's fixtures. */
const client = (name: string, file: string, width: number) => ({
  name,
  src: `/marketing/clients/${file}.svg`,
  width,
  height: 40,
});

/** The Pricing page in French, translated from src/content/en/pages/pricing.ts. */
export const pricing = {
  meta: {
    title: 'Tarifs',
    description:
      'Démarrez gratuitement avec la base LaunchKit, ou faites concevoir, construire et grandir votre site avec nous.',
  },
  sections: [
    {
      // The pricing fixture in full. Its own compact heading opens the page, so
      // the plans start close to the top.
      id: 'plans',
      type: 'pricing',
      eyebrow: 'Tarifs',
      title: 'Des tarifs simples à chaque étape.',
      description:
        'Démarrez gratuitement avec la base, ou laissez-nous concevoir, construire et faire grandir votre site avec vous.',
      currencies: pricingCurrencies,
      currencyNote: 'Choisissez votre devise. Les prix sont fixés pour chaque région.',
      plans: pricingPlans,
      callout: {
        title: 'Besoin de plus ?',
        description:
          'Pour des projets plus importants, des travaux logiciels plus larges ou un accompagnement technique dédié, contactez-nous.',
        action: { label: 'Nous contacter', href: '/contact' },
      },
      // Facts about LaunchKit itself, not customer metrics: it has none to show yet.
      proof: {
        title: 'LaunchKit en un coup d’œil',
        items: [
          { value: 'MIT', label: 'Licence open source' },
          { value: '4', label: 'Langues intégrées' },
          { value: '0', label: 'Comptes nécessaires pour démarrer' },
          { value: '5', label: 'Vérifications CI obligatoires sur chaque pull request' },
        ],
      },
    },
    {
      // Placeholders: invented companies from the marquee fixture. Replace them
      // with real clients, or remove the section, before launch.
      id: 'clients',
      type: 'marquee',
      title: 'Ils nous font confiance',
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
      title: 'Questions sur les tarifs',
      description: 'Choisir une offre, et ce qui se passe une fois votre site en ligne.',
      groups: [
        {
          title: 'Choisir une offre',
          items: [
            {
              question: 'Quelle offre me convient ?',
              answer:
                'Faites-le vous-même si vous ou votre équipe développez le site, Conçu pour vous si vous souhaitez que nous le concevions et le construisions, et Conçu pour grandir si vous avez besoin de fonctionnalités sur mesure et d’un accompagnement continu.',
            },
            {
              question: 'Que signifie « prix de départ » ?',
              answer:
                'C’est le point de départ d’un site Conçu pour vous typique. Le prix final dépend des pages et des fonctionnalités dont vous avez besoin, et vous le connaîtrez avant le début des travaux.',
            },
            {
              question: 'Pourquoi Conçu pour grandir est-il sur mesure ?',
              answer:
                'Les fonctionnalités sur mesure et l’accompagnement continu varient d’une équipe à l’autre, donc le prix s’adapte à vos besoins. Contactez-nous pour en parler.',
            },
            {
              question: 'Pourquoi puis-je choisir une devise ?',
              answer:
                'Les prix sont fixés à la main pour chaque région plutôt que convertis en direct ; ils restent donc ronds et ne bougent pas avec les taux de change.',
            },
          ],
        },
        {
          title: 'Après le lancement',
          items: [
            {
              question: 'Puis-je commencer seul et me faire aider plus tard ?',
              answer:
                'Oui. Toutes les offres reposent sur la même base, donc un site que vous avez commencé seul peut passer à Conçu pour vous ou Conçu pour grandir sans repartir de zéro.',
            },
            {
              question: 'Où mon site sera-t-il hébergé ?',
              answer:
                'Là où cela vous convient. Un site LaunchKit est une application Next.js standard : il fonctionne sur Vercel ou chez tout hébergeur compatible avec Next.js.',
            },
            {
              question: 'Mon site va-t-il continuer à s’améliorer ?',
              answer:
                'Les améliorations de LaunchKit arrivent sur votre site quand vous choisissez de les fusionner, via Git. Conçu pour grandir ajoute des améliorations continues faites spécialement pour votre site.',
            },
          ],
        },
      ],
    },
    {
      // A quiet close for anyone who read this far: the plans' buttons are well above.
      id: 'talk',
      type: 'cta-panel',
      title: 'Vous hésitez encore ?',
      description:
        'Parlez-nous de votre projet et nous vous aiderons à choisir l’offre qui convient, ou lancez-vous seul dès aujourd’hui.',
      primaryAction: { label: 'Nous contacter', href: '/contact' },
      secondaryAction: { label: 'Commencer gratuitement', href: '/docs/getting-started' },
    },
  ],
} satisfies PageDefinition;
