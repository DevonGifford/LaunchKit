/*
 * A small English search index for stories and browser tests, written from
 * LaunchKit's own pages and guides so results look like the real thing.
 */
import type { SearchIndex } from '@/lib/search/search';

export const sampleSearchIndex: SearchIndex = {
  locale: 'en',
  entries: [
    {
      href: '/',
      kind: 'page',
      title: 'The foundation for your next website',
      description:
        'LaunchKit is a refined Next.js foundation with a design system, four languages and automated checks.',
      text: '',
    },
    {
      href: '/#included',
      kind: 'page',
      title: 'The foundation for your next website',
      heading: 'Everything a new site needs, already built.',
      description:
        'Themes, four languages, responsive layouts, tests and accessibility checks come with every project.',
      text: '20+ sections Heroes, pricing, timelines, FAQs and more. 40+ components Primitives from shadcn/ui.',
    },
    {
      href: '/pricing',
      kind: 'page',
      title: 'Pricing',
      description:
        'Start free with the LaunchKit foundation, or have your website designed, built and grown with you.',
      text: '',
    },
    {
      href: '/pricing#faq',
      kind: 'page',
      title: 'Pricing',
      heading: 'Questions about pricing',
      text: 'Where can I host it? Wherever suits you. A LaunchKit site is a standard Next.js application.',
    },
    {
      href: '/docs/getting-started',
      kind: 'doc',
      title: 'LaunchKit Quickstart',
      description:
        'What LaunchKit is, what you need, and how to go from a fresh clone to a running site in a few minutes.',
      text: 'LaunchKit is a reusable foundation for building and launching better websites, faster.',
    },
    {
      href: '/docs/getting-started#what-you-get',
      kind: 'doc',
      title: 'LaunchKit Quickstart',
      heading: 'What you get',
      text: 'Automated tests: Vitest suites, Storybook stories that double as tests, and accessibility checks with axe.',
    },
    {
      href: '/docs/component-library',
      kind: 'doc',
      title: 'LaunchKit Design System',
      description: 'The primitives and sections every LaunchKit site is built from.',
      text: 'LaunchKit’s interface comes in two layers: primitives and sections.',
    },
    {
      href: '/docs/component-library#storybook-the-workbench',
      kind: 'doc',
      title: 'LaunchKit Design System',
      heading: 'Storybook, the workbench',
      text: 'Storybook is where a section gets designed and reviewed. Every story renders in a real browser and is checked by axe for accessibility problems.',
    },
    {
      href: '/privacy',
      kind: 'legal',
      title: 'Privacy policy',
      description: 'What this website collects, why, and the choices you have.',
      text: 'There’s no advertising and no tracking cookies.',
    },
    {
      href: '/privacy#measuring-visits-and-speed',
      kind: 'legal',
      title: 'Privacy policy',
      heading: 'Measuring visits and speed',
      text: 'Vercel Web Analytics counts page views without third-party cookies; Speed Insights measures how quickly pages load.',
    },
  ],
};
