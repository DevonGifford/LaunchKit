import type { PageSlug } from '@/content';

/**
 * Where each structured page lives, for site search; `null` keeps a page out
 * of search. Every page in src/content must be listed (a type error
 * otherwise), so a new page is a deliberate choice. Guides and legal pages are
 * found from their Markdown files.
 */
export const searchablePages: Record<PageSlug, string | null> = {
  home: '/',
  examples: '/examples',
  pricing: '/pricing',
  contact: '/contact',
  // The previous homepage: unlinked and out of search engines too.
  homeV1: null,
};
