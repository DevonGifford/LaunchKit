import type { PageDefinition } from '@/lib/content/types';

export const home = {
  meta: {
    title: 'Une base Next.js réutilisable',
    description:
      'LaunchKit est une base entretenue — système de design, localisation, contenu et outillage — pour que chaque nouveau site parte d’un terrain éprouvé.',
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      eyebrow: 'Une base pour les idées ambitieuses',
      title: 'Conçu pour la suite.',
      description:
        'LaunchKit est une base Next.js soignée : système de design, localisation, contenu et outillage, prêts dès le premier jour. Chaque nouveau site part d’un terrain éprouvé, et non d’un dossier vide.',
      primaryAction: { label: 'Commencer', href: '/docs/getting-started' },
      secondaryAction: { label: 'Lancer un projet', href: '/contact' },
      preview: {
        filename: 'src/content/fr/pages/home.ts',
        code: `export const home = {
  sections: [
    { type: 'hero', title: 'Conçu pour la suite.' },
    { type: 'statement', title: 'Construire une fois…' },
    { type: 'features', title: 'Trois couches…' },
    { type: 'use-cases', title: 'Six sites…' },
    { type: 'marketing-developer-experience', title: 'Du clone…' },
    { type: 'cta', title: 'Partez d’une…' },
  ],
} satisfies PageDefinition;`,
      },
    },
    {
      id: 'philosophy',
      type: 'statement',
      eyebrow: 'La philosophie',
      title: 'Construire une fois. Réutiliser souvent. Améliorer de façon centralisée.',
      paragraphs: [
        'La plupart des sites commencent de la même façon : un framework, des composants, un thème, des traductions, des formulaires, des tests et une intégration continue, réassemblés à partir de zéro, chaque fois un peu différemment.',
        'LaunchKit fait ce travail une seule fois, avec soin, et l’entretient. Les nouveaux projets naissent accessibles, localisés et testés, et consacrent leur temps à ce qui les distingue.',
        'Quand la base s’améliore, chaque projet qui en dérive peut intégrer l’amélioration délibérément, par une simple fusion Git.',
      ],
    },
    {
      id: 'included',
      type: 'features',
      eyebrow: 'Ce qui est inclus',
      title: 'Trois couches, prêtes dès le premier jour.',
      description:
        'Un socle restreint et bien fait, plutôt qu’une immense galerie pensée pour des besoins imaginaires.',
      items: [
        {
          title: 'Système de design',
          description:
            'Des tokens sémantiques, des apparences claire et sombre, et des primitives accessibles qui adoptent une nouvelle marque sans être réécrites.',
          points: [
            'La palette de la marque tient dans un seul fichier',
            'Clair et sombre, selon le système',
            'Primitives shadcn/ui intégrées au dépôt',
          ],
        },
        {
          title: 'Socle applicatif',
          description:
            'Routage, localisation, contenu typé et formulaires validés : ce dont chaque site a besoin, déjà relié.',
          points: [
            'Quatre langues avec des métadonnées localisées',
            'Des pages composées de sections typées',
            'React Hook Form avec validation Zod',
          ],
        },
        {
          title: 'Expérience développeur',
          description:
            'Des types stricts, des retours rapides et des vérifications identiques sur chaque poste et en intégration continue.',
          points: [
            'TypeScript strict, ESLint et Prettier',
            'Tests unitaires, navigateur et de bout en bout',
            'Storybook avec contrôles d’accessibilité',
          ],
        },
      ],
    },
    {
      id: 'adapt',
      type: 'use-cases',
      eyebrow: 'Fait pour s’adapter',
      title: 'Six sites différents. Une seule base.',
      description:
        'Chaque projet garde sa marque, son contenu et ses fonctionnalités, tout en partageant l’ingénierie sous-jacente.',
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
      id: 'developer-experience',
      type: 'marketing-developer-experience',
      eyebrow: 'Expérience développeur',
      title: 'Du clone au site en ligne en quelques minutes.',
      description:
        'pnpm, TypeScript strict et des scripts familiers. Aucun compte, aucune clé ni aucun service payant n’est nécessaire pour démarrer.',
      steps: [
        {
          comment: 'Créer un projet en gardant LaunchKit comme upstream',
          command: 'git clone --origin upstream git@github.com:DevonGifford/LaunchKit.git my-site',
        },
        { comment: 'Installer, sans identifiants', command: 'pnpm install' },
        { comment: 'Lancer le serveur de développement', command: 'pnpm dev' },
        { comment: 'Lancer les mêmes vérifications que la CI', command: 'pnpm check' },
        {
          comment: 'Plus tard : fusionner explicitement les améliorations upstream',
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
      type: 'cta',
      title: 'Partez d’une meilleure base.',
      description:
        'Créez votre prochain site à partir de LaunchKit, rendez-le résolument vôtre, et laissez l’ingénierie continuer de s’améliorer en dessous.',
      primaryAction: { label: 'Lire le guide', href: '/docs/getting-started' },
      secondaryAction: { label: 'Nous contacter', href: '/contact' },
    },
  ],
} satisfies PageDefinition;
