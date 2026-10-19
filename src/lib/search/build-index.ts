import { searchablePages } from '@/config/search';
import type { PageSlug } from '@/content';
import type { Locale } from '@/i18n/routing';
import { getDoc, getDocSlugs, getLegalDoc, getLegalSlugs, type Doc } from '@/lib/content/docs';
import { getPage } from '@/lib/content/pages';
import type { Section } from '@/lib/content/types';
import type { SearchEntry, SearchIndex, SearchKind } from './search';

/*
 * Builds a locale's search index from the content the site already renders:
 * structured pages and their sections, guides and legal pages and their
 * headings. Nothing is written twice for search. Runs at build time; the
 * route at src/app/[locale]/search-index.json serves the result.
 */

// Section fields that aren't readable text: ids and options, links and the
// buttons that carry them, media, prices and code.
const skippedKeys = new Set([
  'id',
  'type',
  'variant',
  'href',
  'action',
  'primaryAction',
  'secondaryAction',
  'menu',
  'icon',
  'image',
  'images',
  'desktopImage',
  'src',
  'alt',
  'light',
  'dark',
  'width',
  'height',
  'sequence',
  'loadingLabel',
  'direction',
  'speed',
  'currencies',
  'price',
  'preview',
]);

/** Every readable string under `value`, depth first. Paths and URLs are left out. */
function collectText(value: unknown, into: string[] = []): string[] {
  if (typeof value === 'string') {
    if (!/^(\/|https?:|mailto:|#)/.test(value)) into.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectText(item, into);
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      if (!skippedKeys.has(key)) collectText(item, into);
    }
  }
  return into;
}

/** A page section's heading, its lead-in and the rest of its text. */
export function sectionText(section: Section) {
  const {
    title,
    titleHighlight: _highlight,
    titleMuted,
    eyebrow,
    description,
    ...rest
  }: {
    title?: string | string[];
    titleHighlight?: string;
    titleMuted?: string;
    eyebrow?: string;
    description?: string;
  } = section;
  // A highlight repeats words of the title; a muted title is its second line.
  const heading = [title ?? [], titleMuted ?? []].flat().join(' ');
  return {
    heading: heading || undefined,
    description: [eyebrow, description].filter(Boolean).join(' ') || undefined,
    text: collectText(rest).join(' '),
  };
}

function pageEntries(locale: Locale, slug: PageSlug, href: string): SearchEntry[] {
  const page = getPage(locale, slug);
  const title = page.meta.title;
  return [
    { href, kind: 'page', title, description: page.meta.description, text: '' },
    ...page.sections.flatMap((section): SearchEntry[] => {
      const { heading, description, text } = sectionText(section);
      if (!heading && !text) return [];
      return [{ href: `${href}#${section.id}`, kind: 'page', title, heading, description, text }];
    }),
  ];
}

function documentEntries(doc: Doc, href: string, kind: SearchKind): SearchEntry[] {
  const lang = doc.isFallback ? doc.locale : undefined;
  return [
    {
      href,
      kind,
      title: doc.title,
      description: [doc.description, doc.summary].filter(Boolean).join(' '),
      text: doc.intro,
      lang,
    },
    ...doc.sections.map((section) => ({
      href: `${href}#${section.anchor}`,
      kind,
      title: doc.title,
      heading: section.heading,
      text: section.text,
      lang,
    })),
  ];
}

/** Every searchable page and section for `locale`, in site order. */
export async function buildSearchIndex(locale: Locale): Promise<SearchIndex> {
  const pages = (Object.entries(searchablePages) as [PageSlug, string | null][]).flatMap(
    ([slug, href]) => (href === null ? [] : pageEntries(locale, slug, href)),
  );

  const guides = await Promise.all(
    (await getDocSlugs()).map(async (slug) => ({ slug, doc: await getDoc(locale, slug) })),
  );
  const legal = await Promise.all(
    (await getLegalSlugs()).map(async (slug) => ({ slug, doc: await getLegalDoc(locale, slug) })),
  );

  return {
    locale,
    entries: [
      ...pages,
      ...guides
        .flatMap(({ slug, doc }) => (doc ? [{ slug, doc }] : []))
        .sort((a, b) => a.doc.order - b.doc.order)
        .flatMap(({ slug, doc }) => documentEntries(doc, `/docs/${slug}`, 'doc')),
      ...legal.flatMap(({ slug, doc }) => (doc ? documentEntries(doc, `/${slug}`, 'legal') : [])),
    ],
  };
}
