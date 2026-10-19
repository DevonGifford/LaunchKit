import type { Messages } from 'next-intl';

/** A group of guides in the docs navigation. */
export type DocsSection = {
  /** Its heading: `Docs.sections.<key>` in `messages/*.json`. */
  key: keyof Messages['Docs']['sections'];
  /** Slugs of the guides in src/content/<locale>/docs/, in reading order. */
  docs: readonly string[];
};

/**
 * The docs navigation, beside each guide: every guide in exactly one section
 * (a unit test checks). Reorder or regroup guides here; titles come from each
 * guide's own frontmatter, so every language follows.
 */
export const docsNavigation: readonly DocsSection[] = [
  { key: 'gettingStarted', docs: ['getting-started', 'making-it-yours', 'launching-a-project'] },
  { key: 'building', docs: ['component-library', 'building-with-ai'] },
  { key: 'project', docs: ['roadmap'] },
];
