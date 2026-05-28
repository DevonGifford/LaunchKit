import type { Messages } from 'next-intl';

type NavigationKey = keyof Messages['Navigation'];
type NavigationLink = { key: NavigationKey; href: string };

// Links that appear in more than one list, defined once.
const docs: NavigationLink = { key: 'docs', href: '/docs' };
const contact: NavigationLink = { key: 'contact', href: '/contact' };
const privacy: NavigationLink = { key: 'privacy', href: '/privacy' };
const terms: NavigationLink = { key: 'terms', href: '/terms' };

/**
 * Primary navigation. Labels are translation keys in `messages/*.json`
 * (`Navigation.<key>`); hrefs are locale-less — the i18n Link adds the prefix.
 */
export const mainNavigation: readonly NavigationLink[] = [
  { key: 'home', href: '/' },
  docs,
  contact,
];

/** The call to action at the end of the wide header. */
export const headerAction: NavigationLink = { key: 'getStarted', href: '/docs/getting-started' };

/**
 * Grouped footer links, shared by every footer variant. Headings are
 * `Footer.groups.<key>` messages; a `wide` group spans two columns from 768px,
 * its links flowing down both. Routes that don't exist yet are placeholders for
 * the project to add or remove.
 */
export const footerNavigation: ReadonlyArray<{
  key: keyof Messages['Footer']['groups'];
  wide?: boolean;
  links: readonly NavigationLink[];
}> = [
  {
    key: 'company',
    links: [{ key: 'about', href: '/about' }, contact, privacy, terms],
  },
  {
    key: 'resources',
    wide: true,
    links: [
      { key: 'features', href: '/#included' },
      { key: 'pricing', href: '/pricing' },
      { key: 'roadmap', href: '/roadmap' },
      { key: 'showcase', href: '/#adapt' },
      docs,
      { key: 'storybook', href: '/storybook' },
      { key: 'changelog', href: '/changelog' },
      { key: 'faq', href: '/faq' },
    ],
  },
];

/** Legal and policy pages, in the footer's bottom row. */
export const legalNavigation: readonly NavigationLink[] = [
  privacy,
  terms,
  { key: 'llmNotice', href: '/llm-notice' },
];
