import type { Messages } from 'next-intl';

type NavigationKey = keyof Messages['Navigation'];
type NavigationLink = { key: NavigationKey; href: string };

// Links that appear in more than one list, defined once.
const docs: NavigationLink = { key: 'docs', href: '/docs' };
const pricing: NavigationLink = { key: 'pricing', href: '/pricing' };
const contact: NavigationLink = { key: 'contact', href: '/contact' };
// Pages that don't exist yet point at the coming-soon page until they do.
const privacy: NavigationLink = { key: 'privacy', href: '/coming-soon' };
const terms: NavigationLink = { key: 'terms', href: '/coming-soon' };

/**
 * Primary navigation. Labels are translation keys in `messages/*.json`
 * (`Navigation.<key>`); hrefs are locale-less — the i18n Link adds the prefix.
 */
export const mainNavigation: readonly NavigationLink[] = [
  { key: 'product', href: '/' },
  { key: 'examples', href: '/examples' },
  pricing,
  docs,
];

/** The call to action at the end of the wide header. */
export const headerAction: NavigationLink = { key: 'getInContact', href: '/contact' };

/**
 * Grouped footer links, shared by every footer variant. Headings are
 * `Footer.groups.<key>` messages; a `wide` group spans two columns from 768px,
 * its links flowing down both. Pages that don't exist yet point at the
 * coming-soon page, for the project to add or remove.
 */
export const footerNavigation: ReadonlyArray<{
  key: keyof Messages['Footer']['groups'];
  wide?: boolean;
  links: readonly NavigationLink[];
}> = [
  {
    key: 'company',
    links: [{ key: 'about', href: '/coming-soon' }, contact, privacy, terms],
  },
  {
    key: 'resources',
    wide: true,
    links: [
      { key: 'features', href: '/#included' },
      pricing,
      { key: 'roadmap', href: '/coming-soon' },
      { key: 'examples', href: '/examples' },
      docs,
      { key: 'storybook', href: '/coming-soon' },
      { key: 'changelog', href: '/coming-soon' },
      { key: 'faq', href: '/#faq' },
    ],
  },
];

/** Legal and policy pages, in the footer's bottom row. */
export const legalNavigation: readonly NavigationLink[] = [
  privacy,
  terms,
  { key: 'llmNotice', href: '/coming-soon' },
];
