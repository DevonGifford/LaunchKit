import type { Messages } from 'next-intl';

type NavigationKey = keyof Messages['Navigation'];

/**
 * Primary navigation. Labels are translation keys in `messages/*.json`
 * (`Navigation.<key>`); hrefs are locale-less — the i18n Link adds the prefix.
 */
export const mainNavigation: ReadonlyArray<{ key: NavigationKey; href: string }> = [
  { key: 'home', href: '/' },
  { key: 'docs', href: '/docs' },
  { key: 'contact', href: '/contact' },
];
