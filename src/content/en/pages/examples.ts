import type { PageDefinition } from '@/lib/content/types';

/** Screenshots of LaunchKit's own sections, in public/marketing/showcase/, each linking to where it lives. */
const screen = (name: string, file: string, href: string) => ({
  name,
  href,
  light: `/marketing/showcase/${file}-light.webp`,
  dark: `/marketing/showcase/${file}-dark.webp`,
});

/**
 * The Examples page, until there are launched projects to show: the projects in
 * progress, the sections they draw on and the sections themselves. English
 * first; the other locales show a coming-soon placeholder until it is translated.
 */
export const examples = {
  meta: {
    title: 'Examples',
    description:
      'The websites being built on LaunchKit, the sections they’re made from, and what you could build too.',
  },
  sections: [
    {
      // The fixture's social proof is left out: there are no real ratings to show yet.
      id: 'hero',
      type: 'hero-centered',
      title: 'What’s being built on LaunchKit',
      titleHighlight: 'LaunchKit',
      description:
        'The first projects are under way. Until they launch, see what each one will be, the sections they’re built from, and what you could build too.',
      primaryAction: { label: 'Start your project', href: '/contact' },
      menu: {
        label: 'Explore',
        items: [
          { label: 'Projects in progress', href: '/examples#projects' },
          { label: 'The section library', href: '/examples#library' },
          { label: 'Every section', href: '/examples#sections' },
          { label: 'Documentation', href: '/docs' },
        ],
      },
    },
    {
      // The previous homepage's use cases: the projects LaunchKit was made for.
      id: 'projects',
      type: 'lineup',
      eyebrow: 'In progress',
      title: 'Six websites in the making.',
      description:
        'Each keeps its own brand, content and features while sharing the engineering underneath. They’ll be linked here as they launch.',
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
      id: 'library',
      type: 'capabilities',
      variant: 'detailed',
      eyebrow: 'The section library',
      title: 'Different websites, composed from the same sections.',
      description:
        'Every project draws on one library of typed sections, each ready for both themes, four languages and every screen size.',
      action: { label: 'Read the docs', href: '/docs' },
      items: [
        {
          title: 'Open the page',
          description:
            'Four hero layouts, from a quiet typographic opener to a scroll-driven film, each with room for a clear first step.',
          tags: ['Basic hero', 'Centered hero', 'Split hero', 'Cinematic hero'],
        },
        {
          title: 'Tell the story',
          description:
            'Sections that explain what you do and why it matters, from a single statement to a grid of features.',
          tags: ['Statement', 'Features', 'Capabilities', 'Bento', 'Lineup', 'Showcase'],
        },
        {
          title: 'Make the case',
          description:
            'Proof and next steps: figures, logos, reviews, plans, answers and a form, so visitors know what to do next.',
          tags: [
            'Stats',
            'Marquee',
            'Reviews',
            'Pricing',
            'FAQ',
            'Calls to action',
            'Contact form',
          ],
        },
      ],
    },
    {
      // The showcase fixture, linking each screenshot to where the section lives now.
      id: 'sections',
      type: 'showcase',
      eyebrow: 'Showcase',
      title: 'Every section, ready to compose.',
      description:
        'Browse the sections LaunchKit ships with. Each one takes typed content, works in four languages and follows the active theme.',
      primaryAction: { label: 'Get started', href: '/docs/getting-started' },
      secondaryAction: { label: 'Read the docs', href: '/docs' },
      items: [
        screen('Hero', 'hero', '/#hero'),
        screen('Pricing', 'pricing', '/pricing'),
        screen('Timeline', 'timeline', '/#timeline'),
        screen('Infrastructure', 'infrastructure', '/#infrastructure'),
        screen('Tech stack', 'tech-stack', '/#stack'),
        screen('Developer experience', 'developer-experience', '/#developer-experience'),
        screen('Quality and automation', 'quality', '/#quality'),
        screen('Use cases', 'use-cases', '/examples#projects'),
      ],
    },
    {
      id: 'begin',
      type: 'cta-split',
      eyebrow: 'Your project next',
      title: 'Have a project in mind?',
      description:
        'Start from LaunchKit yourself, or let us build it with you. Either way, it begins on the same tested foundation.',
      primaryAction: { label: 'Get in Contact', href: '/contact' },
      secondaryAction: { label: 'Get started', href: '/docs/getting-started' },
      image: '/marketing/cta-images/cta-image-4.webp',
      items: ['Your brand', 'Four languages', 'Accessible', 'Tested', 'Maintained'],
    },
  ],
} satisfies PageDefinition;
