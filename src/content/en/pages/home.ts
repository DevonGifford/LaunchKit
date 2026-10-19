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

/**
 * The homepage. The copy is the sections' Storybook fixtures and the previous
 * homepage (home-v1.ts), adapted where noted.
 */
export const home = {
  meta: {
    title: 'The foundation for your next website',
    navTitle: 'Home',
    description:
      'LaunchKit is a refined Next.js foundation with a design system, four languages, typed content and automated checks, so every new website starts from proven ground.',
  },
  sections: [
    {
      id: 'hero',
      type: 'marketing-hero-launchkit',
      eyebrow: 'The modern foundation for your next big idea',
      title: ['Launch faster.', 'Build what matters.'],
      titleHighlight: 'matters.',
      audiences: ['For founders', 'For startups', 'For rewrites'],
      description:
        'A refined foundation for founders, startups and businesses ready for a fresh start.',
      primaryAction: { label: 'Get started', href: '/docs/getting-started' },
      secondaryAction: { label: 'See examples', href: '/examples' },
      showcase: {
        light: '/marketing/hero-showcase-light.webp',
        dark: '/marketing/hero-showcase-dark.webp',
        alt: 'Three websites built with LaunchKit, shown in browser windows',
        width: 1448,
        height: 1086,
      },
    },
    {
      id: 'technologies',
      type: 'marquee',
      title: 'Built with tools you already know',
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
      title: 'Same setup, every time.',
      titleMuted: 'It doesn’t have to be.',
      paragraphs: [
        {
          text: 'A framework, a theme, translations, forms, tests and CI, assembled again for every project and slightly differently each time.',
        },
        { text: 'Nine weeks of work that doesn’t make your site different.', emphasis: true },
        {
          text: 'LaunchKit does that work once and keeps it maintained, so each project starts on what makes it its own.',
        },
      ],
      callout: {
        eyebrow: 'With LaunchKit',
        title: 'Day 1: build what matters',
        description:
          'The foundation is done. Start with the brand, content and features only you can add.',
      },
      // Illustrative estimates, as in the fixture; the fixture's note to "replace
      // these figures" is meant for downstream projects, so it is left off here.
      timeline: {
        title: 'Development timeline',
        badge: 'Estimate',
        columns: { item: 'Capability', before: 'From scratch', after: 'With LaunchKit' },
        rows: [
          { item: 'Project setup and tooling', before: '1 week', after: 'Day 1' },
          { item: 'Design tokens and theming', before: '1 week', after: 'Day 1' },
          { item: 'Accessible UI components', before: '2 weeks', after: 'Day 1' },
          { item: 'Localisation in four languages', before: '1 week', after: 'Day 1' },
          { item: 'Typed content and sections', before: '1 week', after: 'Day 1' },
          { item: 'Forms and server actions', before: '1 week', after: 'Day 1' },
          { item: 'Unit, browser and end-to-end tests', before: '1 week', after: 'Day 1' },
          { item: 'CI, Git hooks and releases', before: '1 week', after: 'Day 1' },
        ],
        total: { item: 'Total', before: '9 weeks', after: 'Day 1' },
        note: 'Estimated for one experienced developer.',
      },
    },
    {
      id: 'included',
      type: 'bento',
      eyebrow: 'Inside LaunchKit',
      title: 'Everything a new site needs, already built.',
      description:
        'Themes, four languages, responsive layouts, tests and accessibility checks come with every project.',
      showcase: {
        stat: '20+ sections',
        title: 'Sections for every page',
        description:
          'Heroes, pricing, timelines, FAQs and more, each driven by typed content and ready for both themes.',
        images: [
          screenshot('hero'),
          screenshot('pricing'),
          screenshot('timeline'),
          screenshot('infrastructure'),
        ],
        alt: 'LaunchKit sections in turn: the hero, pricing plans, a timeline and an infrastructure overview.',
      },
      marquee: {
        stat: '40+ components',
        title: 'Primitives from shadcn/ui',
        description:
          'Accessible building blocks on Radix UI, restyled with LaunchKit’s tokens and reviewed in Storybook.',
        action: { label: 'Read the docs', href: '/docs' },
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
        title: 'Built on tools you know',
        description:
          'Next.js, React and TypeScript underneath; Tailwind CSS, shadcn/ui and Zod on top. Nothing proprietary to learn.',
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
        title: 'Pages that look finished',
        description:
          'Sunlight and Midnight themes, checked for contrast, so every page is presentable from the first deploy.',
        action: { label: 'Make it yours', href: '/docs/making-it-yours' },
        images: [
          { ...screenshot('tech-stack'), alt: 'The tech stack section' },
          { ...screenshot('developer-experience'), alt: 'The developer experience section' },
          { ...screenshot('quality'), alt: 'The quality and automation section' },
        ],
      },
    },
    {
      id: 'stack',
      type: 'marketing-technical-stack',
      eyebrow: 'Tech stack',
      title: 'Built on proven tools.',
      description: 'Current, well-supported tools, already configured and tested together.',
      featured: [
        { name: 'Next.js', description: 'React framework', icon: 'nextjs' },
        { name: 'React', description: 'UI library', icon: 'react' },
        { name: 'TypeScript', description: 'Strict type safety', icon: 'typescript' },
        { name: 'Tailwind CSS', description: 'Token-driven styling', icon: 'tailwindcss' },
        { name: 'shadcn/ui', description: 'UI components', icon: 'shadcn-ui' },
        { name: 'next-intl', description: 'Four locales built in', icon: 'next-intl' },
        { name: 'Zod', description: 'Schema validation', icon: 'zod' },
        { name: 'React Hook Form', description: 'Validated forms', icon: 'react-hook-form' },
      ],
      tools: [
        { name: 'Radix UI', description: 'UI primitives', icon: 'radix-ui' },
        { name: 'Lucide', description: 'Icons', icon: 'lucide' },
        { name: 'next-themes', description: 'Light and dark', icon: 'next-themes' },
        { name: 'Sonner', description: 'Toasts', icon: 'sonner' },
        { name: 'date-fns', description: 'Dates', icon: 'date-fns' },
        { name: 'Marked', description: 'Markdown docs', icon: 'marked' },
        { name: 'T3 Env', description: 'Typed env vars', icon: 't3-env' },
        { name: 'Vitest', description: 'Unit tests', icon: 'vitest' },
        { name: 'Playwright', description: 'End-to-end tests', icon: 'playwright' },
        { name: 'Storybook', description: 'Component docs', icon: 'storybook' },
        { name: 'axe-core', description: 'Accessibility checks', icon: 'axe-core' },
        { name: 'ESLint', description: 'Linting', icon: 'eslint' },
        { name: 'Prettier', description: 'Formatting', icon: 'prettier' },
        { name: 'Lefthook', description: 'Git hooks', icon: 'lefthook' },
        { name: 'Commitlint', description: 'Commit messages', icon: 'commitlint' },
        { name: 'pnpm', description: 'Package manager', icon: 'pnpm' },
        { name: 'GitHub Actions', description: 'CI', icon: 'github-actions' },
        { name: 'Dependabot', description: 'Weekly updates', icon: 'dependabot' },
      ],
    },
    {
      // The pipeline fixture, with two of its promises reworded to what
      // LaunchKit itself provides rather than what a host does.
      id: 'infrastructure',
      type: 'marketing-deployment-pipeline',
      eyebrow: 'Deployment pipeline',
      title: 'Infrastructure that grows with you.',
      description:
        'One push takes a change from your branch to production, through the same checks every time.',
      items: [
        {
          icon: 'globe',
          title: 'Deploy anywhere',
          description: 'A standard Next.js app, for Vercel or any host that runs Next.js.',
        },
        {
          icon: 'trending-up',
          title: 'Scales with traffic',
          description: 'Pages are prerendered at build time and served as static files.',
        },
        {
          icon: 'coins',
          title: 'Lean to run',
          description: 'No paid services to start, and static pages keep hosting costs low.',
        },
        {
          icon: 'file-code',
          title: 'Infrastructure as code',
          description: 'Configuration, environments and deployment stay version-controlled.',
        },
      ],
      pipeline: {
        caption: 'From push to production',
        command: 'git push origin feat/pricing-page',
        steps: [
          { label: 'Quality', detail: 'types, lint, tests and axe' },
          { label: 'Build', detail: 'every locale prerendered' },
          { label: 'Preview', detail: 'a URL for every pull request' },
          { label: 'Production', detail: 'live on merge to main' },
        ],
      },
      badges: ['GitHub Actions', 'Vercel', 'Node.js 24+', 'pnpm 12'],
    },
    {
      id: 'quality',
      type: 'marketing-quality-gates',
      eyebrow: 'Quality gates',
      title: 'Checked at every step.',
      description:
        'The same automated checks run on your machine and in CI, whether a person or an agent wrote the code.',
      stages: [
        {
          label: 'Stage 1',
          title: 'Before commit',
          icon: 'shield-check',
          items: [
            { name: 'Lefthook', description: 'Fast, check-only Git hooks' },
            { name: 'ESLint', description: 'Zero warnings allowed' },
            { name: 'Prettier', description: 'Consistent formatting' },
            { name: 'Commitlint', description: 'Conventional Commits' },
          ],
        },
        {
          label: 'Stage 2',
          title: 'CI pipeline',
          icon: 'flask-conical',
          items: [
            { name: 'TypeScript', description: 'Strict type checking' },
            { name: 'Vitest', description: 'Unit and browser-mode tests' },
            { name: 'Storybook', description: 'Every story tested with axe' },
            { name: 'Playwright', description: 'End-to-end tests' },
          ],
        },
        {
          label: 'Stage 3',
          title: 'Release',
          icon: 'package-check',
          items: [
            { name: 'Protected branches', description: 'CI must pass' },
            { name: 'Dependabot', description: 'Weekly updates' },
            { name: 'Changelog', description: 'Notes for every version' },
            { name: 'Release workflow', description: 'Passing builds' },
          ],
        },
      ],
      highlights: [
        'Every commit is checked',
        'The same checks locally and in CI',
        'Releases only from passing builds',
      ],
    },
    {
      id: 'talk',
      type: 'cta-editorial',
      eyebrow: 'Ready to start something new?',
      title: 'Let’s talk about your project.',
      primaryAction: { label: 'Start a conversation', href: '/contact' },
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
      id: 'numbers',
      type: 'stats',
      eyebrow: 'By the numbers',
      title: 'A foundation that keeps up with you.',
      description:
        'Every release is checked by the same suite of tests, in every language and both themes, before it reaches your project.',
      stats: [
        { value: '4', label: 'Languages out of the box' },
        { value: '40+', label: 'Tested components' },
        { value: '400+', label: 'Automated tests' },
      ],
    },
    {
      id: 'pricing',
      type: 'pricing',
      eyebrow: 'Pricing',
      title: 'Simple pricing for every stage.',
      description:
        'Start with the LaunchKit foundation, then choose how much hands-on help you need.',
      // The plans, shared with /pricing, and a link to everything else there.
      currencies: pricingCurrencies,
      plans: pricingPlans,
      callout: {
        title: 'Compare the plans in detail',
        description:
          'Everything each plan includes, prices in your currency, and answers to common questions.',
        action: { label: 'See pricing', href: '/pricing' },
      },
    },
    {
      // Demo reviews from the fixture: invented people. Replace them with real,
      // attributable reviews before launch.
      id: 'reviews',
      type: 'reviews',
      eyebrow: 'Reviews',
      title: 'What teams say about LaunchKit',
      reviews: [
        {
          name: 'Amara Osei',
          role: 'Founder, design studio',
          quote:
            'We launched our new site in a week. The sections, the translations and the tests were already there, so we spent the time on our story instead.',
        },
        {
          name: 'Jonas Weber',
          role: 'Lead developer, software agency',
          quote:
            'The content model is the part I didn’t know I needed. Typed sections mean the build fails before a broken page ever reaches production.',
        },
        {
          name: 'Lucía Romero',
          role: 'Freelance designer',
          quote:
            'Changing the brand took one file. Both themes followed, and the contrast checks told me where my palette needed work.',
        },
        {
          name: 'Théo Martin',
          role: 'CTO, online retailer',
          quote:
            'Four languages from day one. Our French and German customers finally get the same site as everyone else.',
        },
        {
          name: 'Priya Nair',
          role: 'Product manager, SaaS start-up',
          quote:
            'Storybook made reviews easy: every section on its own, at every width, in both themes, before anything went live.',
        },
        {
          name: 'Sam Okafor',
          role: 'Owner, web agency',
          quote:
            'We start every client project from LaunchKit now, and improvements we make for one client reach the others too.',
        },
      ],
    },
    {
      id: 'faq',
      type: 'faq',
      eyebrow: 'FAQ',
      title: 'Frequently asked questions',
      description: 'Anything else you might want to know before you start.',
      groups: [
        {
          title: 'General',
          items: [
            {
              question: 'What is LaunchKit?',
              answer:
                'A reusable Next.js foundation for building and launching websites: content-driven pages, ready-made sections, two themes, four languages and a full test setup.',
            },
            {
              question: 'Who is it for?',
              answer:
                'Founders, startups and agencies who start new sites often and want each one to begin from the same well-tested base.',
            },
            {
              question: 'Can I change the brand?',
              answer:
                'Yes. Colours and type live in one theme file, and every component follows it in light and dark.',
            },
            {
              question: 'Is it free to use?',
              answer:
                'Yes. LaunchKit is released under the MIT licence, for personal and commercial projects alike.',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              question: 'How do I add a page?',
              answer:
                'Add a content file for each language and register it. The page is rendered from typed sections, so a mistake is caught before it ships.',
            },
            {
              question: 'How do updates reach my project?',
              answer:
                'Projects started from LaunchKit pull upstream changes with Git, as the upstream sync guide describes.',
            },
            {
              question: 'Which languages are included?',
              answer:
                'English, Spanish, French and German. Adding another takes a message catalogue and a set of content files.',
            },
            {
              question: 'Can you build my site for me?',
              answer:
                'Yes. Get in touch through the contact page and we’ll talk through what you need.',
            },
          ],
        },
      ],
    },
    {
      // The previous homepage's closing band, with the header's contact label.
      id: 'begin',
      type: 'cta-band',
      title: 'Begin with a better foundation.',
      description:
        'Start your next website from LaunchKit, make it unmistakably yours, and keep the engineering improving underneath.',
      primaryAction: { label: 'Get started', href: '/docs/getting-started' },
      secondaryAction: { label: 'Get in Contact', href: '/contact' },
    },
  ],
} satisfies PageDefinition;
