import type { PageDefinition } from '@/lib/content/types';

/** Screenshots of LaunchKit's own sections, in public/marketing/showcase/, each linking to where it lives. */
const screen = (name: string, file: string, href: string) => ({
  name,
  href,
  light: `/marketing/showcase/${file}-light.webp`,
  dark: `/marketing/showcase/${file}-dark.webp`,
});

/** The Examples page in French, translated from src/content/en/pages/examples.ts. */
export const examples = {
  meta: {
    title: 'Exemples',
    description:
      'Les sites en cours de construction avec LaunchKit, les sections qui les composent et ce que vous pourriez créer vous aussi.',
  },
  sections: [
    {
      // The fixture's social proof is left out: there are no real ratings to show yet.
      id: 'hero',
      type: 'hero-centered',
      title: 'Ce qui se construit avec LaunchKit',
      titleHighlight: 'LaunchKit',
      description:
        'Les premiers projets sont en cours. En attendant leur lancement, découvrez ce que sera chacun, les sections qui les composent et ce que vous pourriez créer vous aussi.',
      primaryAction: { label: 'Lancez votre projet', href: '/contact' },
      menu: {
        label: 'Explorer',
        items: [
          { label: 'Projets en cours', href: '/examples#projects' },
          { label: 'La bibliothèque de sections', href: '/examples#library' },
          { label: 'Toutes les sections', href: '/examples#sections' },
          { label: 'Documentation', href: '/docs' },
        ],
      },
    },
    // The projects as downstream examples. No links until each launches.
    {
      // `projects`, so the hero's menu and the showcase's "Use cases" still land here.
      id: 'projects',
      type: 'marketing-downstream-examples',
      title: 'Sites d’entreprise',
      description: 'Sites vitrines et institutionnels pour des entreprises établies.',
      projects: [
        {
          name: 'Atelier',
          description:
            'Studio de marque et de design numérique pour les organisations attachées à un design soigné.',
          image: '/marketing/downstream/atelier.webp',
        },
        {
          name: 'Blake & Co.',
          description:
            'Ingénierie logicielle pour les cabinets d’avocats et les institutions financières.',
          image: '/marketing/downstream/blake-and-co.webp',
        },
        {
          name: 'Principio',
          description: 'Ingénierie logicielle et conseil en IA pour les entreprises ambitieuses.',
          image: '/marketing/downstream/principio.webp',
        },
      ],
    },
    {
      id: 'applications',
      type: 'marketing-downstream-examples',
      title: 'Applications web et mobiles',
      description: 'Sites produit pour des applications web et mobiles.',
      projects: [
        {
          name: 'TableKit',
          description:
            'Réservations de restaurant, ajoutées à n’importe quel site en quelques minutes.',
          image: '/marketing/downstream/tablekit.webp',
        },
        {
          name: 'Unpocketed',
          description:
            'Enregistrez et transcrivez de l’audio sur Android avec les modèles d’IA de votre choix.',
          image: '/marketing/downstream/unpocketed.webp',
        },
        {
          name: 'SelfOS',
          description:
            'Données personnelles auto-hébergées pour l’entraînement, la nutrition et les habitudes.',
          image: '/marketing/downstream/selfos.webp',
        },
      ],
    },
    {
      id: 'library',
      type: 'capabilities',
      variant: 'detailed',
      eyebrow: 'La bibliothèque de sections',
      title: 'Des sites différents, composés des mêmes sections.',
      description:
        'Chaque projet puise dans une même bibliothèque de sections typées, toutes prêtes pour les deux thèmes, quatre langues et toutes les tailles d’écran.',
      action: { label: 'Lire la documentation', href: '/docs' },
      items: [
        {
          title: 'Ouvrir la page',
          description:
            'Quatre mises en page de hero, d’une ouverture typographique sobre à un film piloté par le défilement, chacune avec la place pour une première étape claire.',
          tags: ['Hero simple', 'Hero centré', 'Hero scindé', 'Hero cinématique'],
        },
        {
          title: 'Raconter l’histoire',
          description:
            'Des sections qui expliquent ce que vous faites et pourquoi c’est important, d’une simple déclaration à une grille de fonctionnalités.',
          tags: ['Déclaration', 'Fonctionnalités', 'Compétences', 'Bento', 'Catalogue', 'Vitrine'],
        },
        {
          title: 'Convaincre',
          description:
            'Des preuves et des étapes suivantes : chiffres, logos, avis, offres, réponses et un formulaire, pour que les visiteurs sachent quoi faire ensuite.',
          tags: [
            'Chiffres',
            'Défilé de logos',
            'Avis',
            'Tarifs',
            'FAQ',
            'Appels à l’action',
            'Formulaire de contact',
          ],
        },
      ],
    },
    {
      // The showcase fixture, linking each screenshot to where the section lives now.
      id: 'sections',
      type: 'showcase',
      eyebrow: 'Vitrine',
      title: 'Chaque section, prête à composer.',
      description:
        'Parcourez les sections fournies avec LaunchKit. Chacune reçoit du contenu typé, fonctionne en quatre langues et suit le thème actif.',
      primaryAction: { label: 'Commencer', href: '/docs/getting-started' },
      secondaryAction: { label: 'Lire la documentation', href: '/docs' },
      items: [
        screen('Hero', 'hero', '/#hero'),
        screen('Tarifs', 'pricing', '/pricing'),
        screen('Chronologie', 'timeline', '/#timeline'),
        screen('Infrastructure', 'infrastructure', '/#infrastructure'),
        screen('Stack technique', 'tech-stack', '/#stack'),
        screen('Expérience développeur', 'developer-experience', '/#developer-experience'),
        screen('Qualité et automatisation', 'quality', '/#quality'),
        screen('Cas d’usage', 'use-cases', '/examples#projects'),
      ],
    },
    {
      id: 'begin',
      type: 'cta-split',
      eyebrow: 'Votre projet, le prochain',
      title: 'Vous avez un projet en tête ?',
      description:
        'Partez de LaunchKit par vous-même ou laissez-nous le construire avec vous. Dans les deux cas, tout commence sur la même base testée.',
      primaryAction: { label: 'Nous contacter', href: '/contact' },
      secondaryAction: { label: 'Commencer', href: '/docs/getting-started' },
      image: '/marketing/cta-images/cta-image-4.webp',
      items: ['Votre marque', 'Quatre langues', 'Accessible', 'Testé', 'Maintenu'],
    },
  ],
} satisfies PageDefinition;
