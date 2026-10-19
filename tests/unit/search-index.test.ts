import { describe, expect, it } from 'vitest';
import { searchablePages } from '@/config/search';
import type { PageSlug } from '@/content';
import { routing } from '@/i18n/routing';
import { getDoc, getDocSlugs, getLegalDoc, getLegalSlugs } from '@/lib/content/docs';
import { getPage } from '@/lib/content/pages';
import { buildSearchIndex, sectionText } from '@/lib/search/build-index';
import type { SearchEntry } from '@/lib/search/search';

const indexes = await Promise.all(routing.locales.map((locale) => buildSearchIndex(locale)));
const docSlugs = await getDocSlugs();
const legalSlugs = await getLegalSlugs();
const pagePaths = Object.entries(searchablePages) as [PageSlug, string | null][];

describe('search index', () => {
  it('covers every page, guide and legal page, in every locale', () => {
    const expected = [
      ...pagePaths.flatMap(([, href]) => (href === null ? [] : [href])),
      ...docSlugs.map((slug) => `/docs/${slug}`),
      ...legalSlugs.map((slug) => `/${slug}`),
    ].sort();
    for (const index of indexes) {
      const pages = index.entries.filter((entry) => !entry.heading).map((entry) => entry.href);
      expect(pages.sort()).toEqual(expected);
    }
  });

  it('leaves out pages kept out of search', () => {
    for (const index of indexes) {
      expect(index.entries.some((entry) => entry.href.startsWith('/home-v1'))).toBe(false);
    }
  });

  it('links each section to an anchor that exists on its page', async () => {
    for (const index of indexes) {
      const locale = routing.locales.find((candidate) => candidate === index.locale) ?? 'en';
      for (const { href } of index.entries.filter((entry) => entry.heading)) {
        const [path = '', anchor = ''] = href.split('#');
        const slug = pagePaths.find(([, pagePath]) => pagePath === path)?.[0];
        if (slug) {
          expect(getPage(locale, slug).sections.map((section) => section.id)).toContain(anchor);
        } else {
          const doc = path.startsWith('/docs/')
            ? await getDoc(locale, path.slice('/docs/'.length))
            : await getLegalDoc(locale, path.slice(1));
          expect(doc?.html).toContain(` id="${anchor}"`);
        }
      }
    }
  });

  it('keeps links, paths and empty values out of the text', () => {
    for (const { entries } of indexes) {
      for (const entry of entries.filter((candidate) => candidate.kind === 'page')) {
        const text = [entry.heading, entry.description, entry.text].join(' ');
        expect(text).not.toMatch(/(^|\s)\/[a-z]|https?:\/\/|undefined|\[object Object\]/);
      }
    }
  });

  it('names a page by its navigation title, keeping its headline searchable', () => {
    const names = { en: 'Home', es: 'Inicio', fr: 'Accueil', de: 'Startseite' };
    for (const index of indexes) {
      const home = index.entries.filter((entry) => entry.href.split('#')[0] === '/');
      expect(home.find((entry) => entry.href === '/')?.title).toBe(
        names[index.locale as keyof typeof names],
      );
      // Its sections name the page the same way, and the hero heading is still there.
      expect(new Set(home.map((entry) => entry.title)).size).toBe(1);
      expect(home.find((entry) => entry.href === '/#hero')?.heading).toBeTruthy();
    }
  });

  it('uses each locale’s own text', async () => {
    const [english, spanish] = [indexes[0], indexes[1]];
    const quickstart = (entries: SearchEntry[]) =>
      entries.find((entry) => entry.href === '/docs/getting-started')?.title;
    expect(quickstart(spanish?.entries ?? [])).toBe((await getDoc('es', 'getting-started'))?.title);
    expect(quickstart(spanish?.entries ?? [])).not.toBe(quickstart(english?.entries ?? []));
  });
});

describe('sectionText', () => {
  it('takes the heading, lead-in and readable text, not links, icons or options', () => {
    expect(
      sectionText({
        id: 'hero',
        type: 'marketing-hero-launchkit',
        eyebrow: 'The modern foundation',
        title: ['Launch faster.', 'Build what matters.'],
        titleHighlight: 'matters.',
        description: 'A refined foundation.',
        primaryAction: { label: 'Get started', href: '/docs/getting-started' },
        audiences: ['For founders', 'For startups'],
        showcase: {
          light: '/marketing/hero-light.webp',
          dark: '/marketing/hero-dark.webp',
          alt: 'Screens of LaunchKit sites',
          width: 1600,
          height: 1000,
        },
      }),
    ).toEqual({
      heading: 'Launch faster. Build what matters.',
      description: 'The modern foundation A refined foundation.',
      text: 'For founders For startups',
    });
  });
});
