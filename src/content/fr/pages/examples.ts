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
    {
      // The previous homepage's use cases: the projects LaunchKit was made for.
      id: 'projects',
      type: 'lineup',
      eyebrow: 'En cours',
      title: 'Six sites en préparation.',
      description:
        'Chacun garde sa marque, son contenu et ses fonctionnalités, tout en partageant l’ingénierie sous-jacente. Ils seront mis en lien ici au fil de leur lancement.',
      items: [
        {
          name: 'Site d’agence',
          kind: 'Institutionnel · Portfolio',
          description: 'Services, études de cas et un parcours de contact soigné.',
        },
        {
          name: 'Matériel pour homelab',
          kind: 'Vitrine produits',
          description:
            'Du matériel reconditionné, avec fiches techniques et demandes de devis ; la vente en ligne pourra suivre.',
        },
        {
          name: 'UnPocketed',
          kind: 'Page d’application',
          description:
            'Fonctionnalités, captures d’écran et liens de téléchargement pour une application mobile.',
        },
        {
          name: 'selfOS',
          kind: 'Produit · SaaS',
          description: 'Un récit produit clair, une documentation et une liste d’attente.',
        },
        {
          name: 'Marque de vêtements',
          kind: 'Vitrine commerciale',
          description: 'Collections, images et récit de marque, le paiement étant géré ailleurs.',
        },
        {
          name: 'Démonstrations de refonte',
          kind: 'Vente · Portfolio',
          description:
            'Des refontes de page d’accueil en avant-après qui montrent ce qu’une meilleure base rend possible.',
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
