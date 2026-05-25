import type { PageDefinition } from '@/lib/content/types';

export const home = {
  meta: {
    title: 'A reusable Next.js foundation',
    description:
      'LaunchKit is a maintained foundation of design system, localization, content and tooling, so every new website starts from proven ground.',
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      eyebrow: 'A foundation for ambitious ideas',
      title: 'Built for what’s next.',
      description:
        'LaunchKit is a refined Next.js foundation: design system, localization, content and tooling, ready on day one. Every new site starts from proven ground instead of an empty folder.',
      primaryAction: { label: 'Get started', href: '/docs/getting-started' },
      secondaryAction: { label: 'Start a project', href: '/contact' },
      preview: {
        filename: 'src/content/en/pages/home.ts',
        code: `export const home = {
  sections: [
    { type: 'hero', title: 'Built for what’s next.' },
    { type: 'statement', title: 'Build once…' },
    { type: 'features', title: 'Three layers…' },
    { type: 'lineup', title: 'Six websites…' },
    { type: 'marketing-developer-experience', title: 'From clone…' },
    { type: 'cta-band', title: 'Begin with…' },
  ],
} satisfies PageDefinition;`,
      },
    },
    {
      id: 'philosophy',
      type: 'statement',
      eyebrow: 'The philosophy',
      title: 'Build once. Reuse often. Improve centrally.',
      paragraphs: [
        'Most websites begin the same way: a framework, components, a theme, translations, forms, tests and CI, assembled again from scratch and slightly differently each time.',
        'LaunchKit does that work once, carefully, and keeps it maintained. New projects start accessible, localized and tested, and spend their time on what makes them different.',
        'When the foundation improves, every project built on it can take the improvement deliberately, through an ordinary Git merge.',
      ],
    },
    {
      id: 'included',
      type: 'features',
      eyebrow: 'What’s included',
      title: 'Three layers, each one ready on day one.',
      description:
        'A small, well-made baseline rather than an enormous gallery built for imagined requirements.',
      items: [
        {
          title: 'Design system',
          description:
            'Semantic tokens, light and dark appearances, and accessible primitives that take on a new brand without being rewritten.',
          points: [
            'A brand palette lives in one file',
            'Light and dark, following the system',
            'shadcn/ui primitives owned in the repository',
          ],
        },
        {
          title: 'Application foundation',
          description:
            'Routing, localization, typed content and validated forms: the parts every site needs, already connected.',
          points: [
            'Four locales with localized metadata',
            'Pages composed from typed sections',
            'React Hook Form with Zod validation',
          ],
        },
        {
          title: 'Developer experience',
          description:
            'Strict types, fast feedback, and checks that run the same way on every machine and in CI.',
          points: [
            'Strict TypeScript, ESLint and Prettier',
            'Unit, browser and end-to-end tests',
            'Storybook with accessibility checks',
          ],
        },
      ],
    },
    {
      id: 'adapt',
      type: 'lineup',
      eyebrow: 'Built to adapt',
      title: 'Six different websites. One foundation.',
      description:
        'Each project keeps its own brand, content and features, while sharing the engineering underneath.',
      items: [
        {
          name: 'Agency website',
          kind: 'Corporate · Portfolio',
          description: 'Services, case studies and a considered contact journey.',
        },
        {
          name: 'Homelab hardware',
          kind: 'Product showcase',
          description:
            'Refurbished equipment with specifications and enquiries; commerce can follow later.',
        },
        {
          name: 'UnPocketed',
          kind: 'App landing page',
          description: 'Features, screenshots and download links for a mobile app.',
        },
        {
          name: 'selfOS',
          kind: 'Product · SaaS',
          description: 'A clear product story, documentation and a waitlist.',
        },
        {
          name: 'Clothing brand',
          kind: 'Retail showcase',
          description:
            'Collections, imagery and brand storytelling, with checkout handled elsewhere.',
        },
        {
          name: 'Redesign demonstrations',
          kind: 'Sales · Portfolio',
          description:
            'Before-and-after homepage refactors that show what a better foundation allows.',
        },
      ],
    },
    {
      id: 'developer-experience',
      type: 'marketing-developer-experience',
      eyebrow: 'Developer experience',
      title: 'From clone to running site in minutes.',
      description:
        'pnpm, strict TypeScript and a familiar set of scripts. No accounts, keys or paid services are needed to start.',
      steps: [
        {
          comment: 'Start a project, keeping LaunchKit as upstream',
          command: 'git clone --origin upstream git@github.com:DevonGifford/LaunchKit.git my-site',
        },
        { comment: 'Install — no credentials required', command: 'pnpm install' },
        { comment: 'Run the development server', command: 'pnpm dev' },
        { comment: 'Run the same checks as CI', command: 'pnpm check' },
        {
          comment: 'Later: merge upstream improvements explicitly',
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
      title: 'Begin with a better foundation.',
      description:
        'Start your next website from LaunchKit, make it unmistakably yours, and keep the engineering improving underneath.',
      primaryAction: { label: 'Read the guide', href: '/docs/getting-started' },
      secondaryAction: { label: 'Get in touch', href: '/contact' },
    },
  ],
} satisfies PageDefinition;
