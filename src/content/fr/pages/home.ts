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

/** The homepage in French, translated from src/content/en/pages/home.ts. */
export const home = {
  meta: {
    title: 'La base de votre prochain site web',
    description:
      'LaunchKit est une base Next.js soignée, avec un système de design, quatre langues, du contenu typé et des vérifications automatiques, pour que chaque nouveau site parte d’un socle éprouvé.',
  },
  sections: [
    {
      id: 'hero',
      type: 'marketing-hero-launchkit',
      eyebrow: 'La base moderne de votre prochaine grande idée',
      title: ['Lancez plus vite.', 'Construisez ce qui compte.'],
      titleHighlight: 'compte.',
      audiences: ['Pour les fondateurs', 'Pour les startups', 'Pour les refontes'],
      description:
        'Une base soignée pour les fondateurs, les startups et les entreprises prêtes à repartir de zéro.',
      primaryAction: { label: 'Commencer', href: '/docs/getting-started' },
      secondaryAction: { label: 'Voir les exemples', href: '/examples' },
      showcase: {
        light: '/marketing/hero-showcase-light.webp',
        dark: '/marketing/hero-showcase-dark.webp',
        alt: 'Trois sites web créés avec LaunchKit, dans des fenêtres de navigateur',
        width: 1448,
        height: 1086,
      },
    },
    {
      id: 'technologies',
      type: 'marquee',
      title: 'Conçu avec des outils que vous connaissez déjà',
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
      title: 'La même mise en place, à chaque fois.',
      titleMuted: 'Ce n’est pas une fatalité.',
      paragraphs: [
        {
          text: 'Un framework, un thème, des traductions, des formulaires, des tests et une CI, réassemblés pour chaque projet, et chaque fois un peu différemment.',
        },
        {
          text: 'Neuf semaines de travail qui ne rendent pas votre site différent.',
          emphasis: true,
        },
        {
          text: 'LaunchKit fait ce travail une fois et le maintient, pour que chaque projet commence par ce qui le rend unique.',
        },
      ],
      callout: {
        eyebrow: 'Avec LaunchKit',
        title: 'Jour 1 : construisez ce qui compte',
        description:
          'La base est prête. Commencez par la marque, le contenu et les fonctionnalités que vous seul pouvez apporter.',
      },
      // Illustrative estimates, as in the fixture; the fixture's note to "replace
      // these figures" is meant for downstream projects, so it is left off here.
      timeline: {
        title: 'Calendrier de développement',
        badge: 'Estimation',
        columns: { item: 'Fonctionnalité', before: 'De zéro', after: 'Avec LaunchKit' },
        rows: [
          { item: 'Mise en place et outillage', before: '1 semaine', after: 'Jour 1' },
          { item: 'Design tokens et thèmes', before: '1 semaine', after: 'Jour 1' },
          { item: 'Composants d’interface accessibles', before: '2 semaines', after: 'Jour 1' },
          { item: 'Localisation en quatre langues', before: '1 semaine', after: 'Jour 1' },
          { item: 'Contenu et sections typés', before: '1 semaine', after: 'Jour 1' },
          { item: 'Formulaires et actions serveur', before: '1 semaine', after: 'Jour 1' },
          {
            item: 'Tests unitaires, navigateur et de bout en bout',
            before: '1 semaine',
            after: 'Jour 1',
          },
          { item: 'CI, hooks Git et versions', before: '1 semaine', after: 'Jour 1' },
        ],
        total: { item: 'Total', before: '9 semaines', after: 'Jour 1' },
        note: 'Estimé pour un développeur expérimenté.',
      },
    },
    {
      id: 'included',
      type: 'bento',
      eyebrow: 'Au cœur de LaunchKit',
      title: 'Tout ce dont un nouveau site a besoin, déjà construit.',
      description:
        'Thèmes, quatre langues, mises en page adaptatives, tests et vérifications d’accessibilité sont fournis avec chaque projet.',
      showcase: {
        stat: '20+ sections',
        title: 'Des sections pour chaque page',
        description:
          'Heros, tarifs, chronologies, FAQ et plus encore, chacune alimentée par du contenu typé et prête pour les deux thèmes.',
        images: [
          screenshot('hero'),
          screenshot('pricing'),
          screenshot('timeline'),
          screenshot('infrastructure'),
        ],
        alt: 'Des sections de LaunchKit tour à tour : le hero, les offres tarifaires, une chronologie et une vue d’ensemble de l’infrastructure.',
      },
      marquee: {
        stat: '40+ composants',
        title: 'Primitives de shadcn/ui',
        description:
          'Des briques accessibles basées sur Radix UI, restylées avec les tokens de LaunchKit et vérifiées dans Storybook.',
        action: { label: 'Lire la documentation', href: '/docs' },
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
        title: 'Sur des outils que vous connaissez',
        description:
          'Next.js, React et TypeScript en dessous ; Tailwind CSS, shadcn/ui et Zod au-dessus. Rien de propriétaire à apprendre.',
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
        title: 'Des pages qui ont l’air finies',
        description:
          'Thèmes Sunlight et Midnight, au contraste vérifié, pour que chaque page soit présentable dès le premier déploiement.',
        action: { label: 'Personnaliser', href: '/docs/making-it-yours' },
        images: [
          { ...screenshot('tech-stack'), alt: 'La section de la stack technique' },
          { ...screenshot('developer-experience'), alt: 'La section expérience développeur' },
          { ...screenshot('quality'), alt: 'La section qualité et automatisation' },
        ],
      },
    },
    {
      id: 'stack',
      type: 'marketing-technical-stack',
      eyebrow: 'Stack technique',
      title: 'Sur des outils éprouvés.',
      description: 'Des outils actuels et bien maintenus, déjà configurés et testés ensemble.',
      featured: [
        { name: 'Next.js', description: 'Framework React', icon: 'nextjs' },
        { name: 'React', description: 'Bibliothèque d’interface', icon: 'react' },
        { name: 'TypeScript', description: 'Typage strict', icon: 'typescript' },
        { name: 'Tailwind CSS', description: 'Styles pilotés par des tokens', icon: 'tailwindcss' },
        { name: 'shadcn/ui', description: 'Composants d’interface', icon: 'shadcn-ui' },
        { name: 'next-intl', description: 'Quatre langues intégrées', icon: 'next-intl' },
        { name: 'Zod', description: 'Validation de schémas', icon: 'zod' },
        { name: 'React Hook Form', description: 'Formulaires validés', icon: 'react-hook-form' },
      ],
      tools: [
        { name: 'Radix UI', description: 'Primitives d’interface', icon: 'radix-ui' },
        { name: 'Lucide', description: 'Icônes', icon: 'lucide' },
        { name: 'next-themes', description: 'Clair et sombre', icon: 'next-themes' },
        { name: 'Sonner', description: 'Notifications', icon: 'sonner' },
        { name: 'date-fns', description: 'Dates', icon: 'date-fns' },
        { name: 'Marked', description: 'Documents Markdown', icon: 'marked' },
        { name: 'T3 Env', description: 'Variables d’environnement typées', icon: 't3-env' },
        { name: 'Vitest', description: 'Tests unitaires', icon: 'vitest' },
        { name: 'Playwright', description: 'Tests de bout en bout', icon: 'playwright' },
        { name: 'Storybook', description: 'Documentation des composants', icon: 'storybook' },
        { name: 'axe-core', description: 'Vérifications d’accessibilité', icon: 'axe-core' },
        { name: 'ESLint', description: 'Analyse statique', icon: 'eslint' },
        { name: 'Prettier', description: 'Formatage', icon: 'prettier' },
        { name: 'Lefthook', description: 'Hooks Git', icon: 'lefthook' },
        { name: 'Commitlint', description: 'Messages de commit', icon: 'commitlint' },
        { name: 'pnpm', description: 'Gestionnaire de paquets', icon: 'pnpm' },
        { name: 'GitHub Actions', description: 'CI', icon: 'github-actions' },
        { name: 'Dependabot', description: 'Mises à jour hebdomadaires', icon: 'dependabot' },
      ],
    },
    {
      // The pipeline fixture, with two of its promises reworded to what
      // LaunchKit itself provides rather than what a host does.
      id: 'infrastructure',
      type: 'marketing-deployment-pipeline',
      eyebrow: 'Pipeline de déploiement',
      title: 'Une infrastructure qui grandit avec vous.',
      description:
        'Un push mène une modification de votre branche à la production, en passant toujours par les mêmes vérifications.',
      items: [
        {
          icon: 'globe',
          title: 'Déployez partout',
          description:
            'Une application Next.js standard, pour Vercel ou tout hébergeur compatible avec Next.js.',
        },
        {
          icon: 'trending-up',
          title: 'Tient la charge',
          description: 'Les pages sont prérendues au build et servies comme fichiers statiques.',
        },
        {
          icon: 'coins',
          title: 'Sobre à exploiter',
          description:
            'Aucun service payant pour démarrer, et les pages statiques limitent les coûts d’hébergement.',
        },
        {
          icon: 'file-code',
          title: 'Infrastructure en tant que code',
          description: 'La configuration, les environnements et le déploiement restent versionnés.',
        },
      ],
      pipeline: {
        caption: 'Du push à la production',
        command: 'git push origin feat/pricing-page',
        steps: [
          { label: 'Qualité', detail: 'types, lint, tests et axe' },
          { label: 'Build', detail: 'chaque langue prérendue' },
          { label: 'Aperçu', detail: 'une URL pour chaque pull request' },
          { label: 'Production', detail: 'en ligne au merge sur main' },
        ],
      },
      badges: ['GitHub Actions', 'Vercel', 'Node.js 24+', 'pnpm 12'],
    },
    {
      id: 'quality',
      type: 'marketing-quality-gates',
      eyebrow: 'Contrôles qualité',
      title: 'Vérifié à chaque étape.',
      description:
        'Les mêmes vérifications automatiques tournent sur votre machine et dans la CI, que le code ait été écrit par une personne ou par un agent.',
      stages: [
        {
          label: 'Étape 1',
          title: 'Avant le commit',
          icon: 'shield-check',
          items: [
            { name: 'Lefthook', description: 'Des hooks Git rapides, en vérification seule' },
            { name: 'ESLint', description: 'Aucun avertissement toléré' },
            { name: 'Prettier', description: 'Formatage cohérent' },
            { name: 'Commitlint', description: 'Conventional Commits' },
          ],
        },
        {
          label: 'Étape 2',
          title: 'Pipeline de CI',
          icon: 'flask-conical',
          items: [
            { name: 'TypeScript', description: 'Vérification stricte des types' },
            { name: 'Vitest', description: 'Tests unitaires et en navigateur' },
            { name: 'Storybook', description: 'Chaque story testée avec axe' },
            { name: 'Playwright', description: 'Tests de bout en bout' },
          ],
        },
        {
          label: 'Étape 3',
          title: 'Publication',
          icon: 'package-check',
          items: [
            { name: 'Branches protégées', description: 'La CI doit passer' },
            { name: 'Dependabot', description: 'Mises à jour hebdomadaires' },
            { name: 'Journal des modifications', description: 'Des notes pour chaque version' },
            { name: 'Workflow de publication', description: 'Uniquement des builds réussis' },
          ],
        },
      ],
      highlights: [
        'Chaque commit est vérifié',
        'Les mêmes vérifications en local et en CI',
        'Des versions issues uniquement de builds réussis',
      ],
    },
    {
      id: 'talk',
      type: 'cta-editorial',
      eyebrow: 'Prêt à démarrer quelque chose de nouveau ?',
      title: 'Parlons de votre projet.',
      primaryAction: { label: 'Engager la conversation', href: '/contact' },
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
      id: 'numbers',
      type: 'stats',
      eyebrow: 'En chiffres',
      title: 'Une base qui suit votre rythme.',
      description:
        'Chaque version passe par la même série de tests, dans toutes les langues et les deux thèmes, avant d’arriver dans votre projet.',
      stats: [
        { value: '4', label: 'Langues incluses' },
        { value: '40+', label: 'Composants testés' },
        { value: '400+', label: 'Tests automatisés' },
      ],
    },
    {
      id: 'pricing',
      type: 'pricing',
      eyebrow: 'Tarifs',
      title: 'Des tarifs simples à chaque étape.',
      description:
        'Commencez avec la base LaunchKit, puis choisissez le niveau d’accompagnement dont vous avez besoin.',
      // The plans, shared with /pricing, and a link to everything else there.
      currencies: pricingCurrencies,
      plans: pricingPlans,
      callout: {
        title: 'Comparez les offres en détail',
        description:
          'Tout ce que comprend chaque offre, les prix dans votre devise et les réponses aux questions fréquentes.',
        action: { label: 'Voir les tarifs', href: '/pricing' },
      },
    },
    {
      // Demo reviews from the fixture: invented people. Replace them with real,
      // attributable reviews before launch.
      id: 'reviews',
      type: 'reviews',
      eyebrow: 'Avis',
      title: 'Ce que les équipes disent de LaunchKit',
      reviews: [
        {
          name: 'Amara Osei',
          role: 'Fondatrice, studio de design',
          quote:
            'Nous avons lancé notre nouveau site en une semaine. Les sections, les traductions et les tests étaient déjà là, alors nous avons consacré ce temps à notre histoire.',
        },
        {
          name: 'Jonas Weber',
          role: 'Développeur principal, agence logicielle',
          quote:
            'Le modèle de contenu, c’est ce dont je ne savais pas avoir besoin. Avec des sections typées, le build échoue avant qu’une page cassée n’arrive en production.',
        },
        {
          name: 'Lucía Romero',
          role: 'Designer indépendante',
          quote:
            'Changer de marque a tenu en un seul fichier. Les deux thèmes ont suivi, et les vérifications de contraste m’ont montré où ma palette devait être retravaillée.',
        },
        {
          name: 'Théo Martin',
          role: 'CTO, e-commerçant',
          quote:
            'Quatre langues dès le premier jour. Nos clients français et allemands ont enfin le même site que tout le monde.',
        },
        {
          name: 'Priya Nair',
          role: 'Responsable produit, start-up SaaS',
          quote:
            'Storybook a simplifié les relectures : chaque section isolée, à chaque largeur, dans les deux thèmes, avant toute mise en ligne.',
        },
        {
          name: 'Sam Okafor',
          role: 'Responsable, agence web',
          quote:
            'Nous démarrons désormais chaque projet client avec LaunchKit, et les améliorations faites pour un client profitent aussi aux autres.',
        },
      ],
    },
    {
      id: 'faq',
      type: 'faq',
      eyebrow: 'FAQ',
      title: 'Questions fréquentes',
      description: 'Tout ce que vous pourriez vouloir savoir avant de commencer.',
      groups: [
        {
          title: 'Général',
          items: [
            {
              question: 'Qu’est-ce que LaunchKit ?',
              answer:
                'Une base Next.js réutilisable pour créer et lancer des sites web : des pages pilotées par le contenu, des sections prêtes à l’emploi, deux thèmes, quatre langues et une batterie de tests complète.',
            },
            {
              question: 'À qui s’adresse-t-il ?',
              answer:
                'Aux fondateurs, startups et agences qui lancent souvent de nouveaux sites et veulent que chacun parte de la même base bien testée.',
            },
            {
              question: 'Puis-je changer la marque ?',
              answer:
                'Oui. Les couleurs et la typographie tiennent dans un seul fichier de thème, que chaque composant suit en clair comme en sombre.',
            },
            {
              question: 'Est-il gratuit ?',
              answer:
                'Oui. LaunchKit est publié sous licence MIT, pour les projets personnels comme commerciaux.',
            },
          ],
        },
        {
          title: 'Assistance',
          items: [
            {
              question: 'Comment ajouter une page ?',
              answer:
                'Ajoutez un fichier de contenu par langue et enregistrez-le. La page est rendue à partir de sections typées, donc une erreur est repérée avant la mise en ligne.',
            },
            {
              question: 'Comment les mises à jour arrivent-elles dans mon projet ?',
              answer:
                'Les projets créés à partir de LaunchKit récupèrent les changements upstream avec Git, comme le décrit le guide de synchronisation.',
            },
            {
              question: 'Quelles langues sont incluses ?',
              answer:
                'L’anglais, l’espagnol, le français et l’allemand. En ajouter une demande un catalogue de messages et un jeu de fichiers de contenu.',
            },
            {
              question: 'Pouvez-vous créer mon site pour moi ?',
              answer:
                'Oui. Contactez-nous depuis la page de contact et nous parlerons de vos besoins.',
            },
          ],
        },
      ],
    },
    {
      // The previous homepage's closing band, with the header's contact label.
      id: 'begin',
      type: 'cta-band',
      title: 'Partez d’une meilleure base.',
      description:
        'Créez votre prochain site à partir de LaunchKit, rendez-le résolument vôtre, et laissez l’ingénierie continuer de s’améliorer en dessous.',
      primaryAction: { label: 'Commencer', href: '/docs/getting-started' },
      secondaryAction: { label: 'Nous contacter', href: '/contact' },
    },
  ],
} satisfies PageDefinition;
