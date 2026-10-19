import { describe, expect, it } from 'vitest';
import {
  excerpt,
  highlight,
  normalize,
  prepareIndex,
  queryTerms,
  search,
  suggestions,
  type SearchEntry,
} from '@/lib/search/search';

const entry = (
  fields: Partial<SearchEntry> & Pick<SearchEntry, 'href' | 'title'>,
): SearchEntry => ({
  kind: 'doc',
  text: '',
  ...fields,
});

// A few real LaunchKit headings and passages, enough to see ranking at work.
const entries: SearchEntry[] = [
  entry({
    href: '/pricing',
    kind: 'page',
    title: 'Pricing',
    description: 'Plans for every project.',
  }),
  entry({
    href: '/docs/component-library',
    title: 'LaunchKit Design System',
    description: 'The primitives and sections every LaunchKit site is built from.',
  }),
  entry({
    href: '/docs/component-library#accessibility',
    title: 'LaunchKit Design System',
    heading: 'Accessibility',
    text: 'Components target WCAG 2.2 AA, with visible focus and labelled controls.',
  }),
  entry({
    href: '/docs/getting-started#what-you-get',
    title: 'LaunchKit Quickstart',
    heading: 'What you get',
    text: 'Automated tests, including accessibility checks with axe, run in CI.',
  }),
  entry({
    href: '/docs/getting-started#run-it-locally',
    title: 'LaunchKit Quickstart',
    heading: 'Run it locally',
    text: 'Install the dependencies, then start the server.',
  }),
  entry({
    href: '/docs/getting-started#where-things-live',
    title: 'LaunchKit Quickstart',
    heading: 'Where things live',
    text: 'Pages live in src/content; the server reads them at build time.',
  }),
  entry({
    href: '/privacy',
    kind: 'legal',
    title: 'Política de privacidad',
    text: 'Qué datos recoge este sitio web.',
  }),
];
const index = prepareIndex({ locale: 'en', entries });
const hrefs = (query: string, options?: Parameters<typeof search>[2]) =>
  search(index, query, options).map((result) => result.entry.href);

describe('normalize', () => {
  it('ignores case and accents, and spells ß as ss', () => {
    expect(normalize('Política Übersicht Straße')).toBe('politica ubersicht strasse');
    expect(queryTerms('  Déjà-vu, 2.2 ')).toEqual(['deja', 'vu', '2', '2']);
  });
});

describe('search', () => {
  it('ranks a title above a heading above body text', () => {
    expect(hrefs('accessibility')).toEqual([
      '/docs/component-library#accessibility',
      '/docs/getting-started#what-you-get',
    ]);
    expect(hrefs('pricing')[0]).toBe('/pricing');
  });

  it('matches the start of words, without accents', () => {
    expect(hrefs('access')).toContain('/docs/component-library#accessibility');
    expect(hrefs('politica')).toEqual(['/privacy']);
    expect(hrefs('cess')).toEqual([]);
  });

  it('needs every word of the query', () => {
    expect(hrefs('accessibility axe')).toEqual(['/docs/getting-started#what-you-get']);
    expect(hrefs('accessibility pricing')).toEqual([]);
  });

  it('returns each page once, led by its best-matching entry', () => {
    // Both Quickstart sections mention the server equally; the tie goes the same way every time.
    expect(hrefs('server')).toEqual(['/docs/getting-started#run-it-locally']);

    // The heading match beats the guide's own description, so the result links to that section.
    const [designSystem] = search(index, 'accessibility');
    expect(designSystem?.entry.href).toBe('/docs/component-library#accessibility');
    expect(designSystem?.title.map((segment) => segment.text).join('')).toBe(
      'LaunchKit Design System',
    );
    expect(designSystem?.heading?.find((segment) => segment.match)?.text).toBe('Accessibility');
    expect(
      hrefs('accessibility').filter((href) => href.startsWith('/docs/component-library')),
    ).toHaveLength(1);
  });

  it('ranks a page by its best match, not by how often the words recur', () => {
    const many = [
      entry({ href: '/docs/a', title: 'Guide A', text: '' }),
      ...[1, 2, 3, 4].map((n) =>
        entry({
          href: `/docs/a#part-${n}`,
          title: 'Guide A',
          heading: `Part ${n}`,
          text: 'tokens tokens',
        }),
      ),
      entry({ href: '/docs/b', title: 'Tokens', text: '' }),
    ];
    const ranked = search(prepareIndex({ locale: 'en', entries: many }), 'tokens');
    expect(ranked.map((result) => result.entry.href)).toEqual(['/docs/b', '/docs/a#part-1']);
  });

  it('keeps the list to its limit', () => {
    expect(hrefs('the', { limit: 1 })).toHaveLength(1);
  });

  it('gives the same order every time', () => {
    expect(hrefs('launchkit')).toEqual(hrefs('launchkit'));
    expect(hrefs('launchkit')[0]).toBe('/docs/component-library');
  });

  it('returns nothing for an empty query', () => {
    expect(search(index, '  ')).toEqual([]);
  });

  it('highlights the match in the title, heading and excerpt', () => {
    const [first] = search(index, 'wcag');
    expect(first?.excerpt?.find((segment) => segment.match)?.text).toBe('WCAG');
  });
});

describe('highlight', () => {
  it('marks where a term starts a word, keeping the original spelling', () => {
    expect(highlight('Política de privacidad', ['polit'])).toEqual([
      { text: 'Polít', match: true },
      { text: 'ica de privacidad', match: false },
    ]);
  });
});

describe('highlight after an emoji', () => {
  it('keeps marking the right letters', () => {
    expect(highlight('🚀 Ready for launch', ['launch'])).toEqual([
      { text: '🚀 Ready for ', match: false },
      { text: 'launch', match: true },
    ]);
  });
});

describe('excerpt', () => {
  it('shows the passage around the match, trimmed to whole words', () => {
    const text = `${'Lorem ipsum dolor sit amet. '.repeat(10)}The theme tokens live in theme.css. ${'Consectetur adipiscing elit. '.repeat(10)}`;
    const passage = excerpt(text, ['tokens'], 80)
      .map((segment) => segment.text)
      .join('');
    expect(passage.startsWith('…')).toBe(true);
    expect(passage).toContain('The theme tokens live in theme.css.');
    // Cut mid-sentence it trails off; cut after a full stop it doesn't need to.
    expect(passage).toMatch(/(…|[.!?])$/);
    expect(passage).not.toMatch(/[.!?]…$/);
  });

  it('trails off only when it stops mid-sentence', () => {
    const passage = (sentence: string, length: number) =>
      excerpt(`The tokens live in theme.css. ${sentence}`, ['tokens'], length)
        .map((segment) => segment.text)
        .join('');
    expect(passage('Everything else follows them.', 30)).toBe('The tokens live in theme.css.');
    expect(passage('Everything else follows them', 40)).toBe(
      'The tokens live in theme.css. Everything…',
    );
  });
});

describe('suggestions', () => {
  it('offers pages and guides, not their sections or legal pages', () => {
    expect(suggestions({ locale: 'en', entries }).map((suggestion) => suggestion.href)).toEqual([
      '/pricing',
      '/docs/component-library',
    ]);
  });
});
