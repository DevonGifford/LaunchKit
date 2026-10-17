import { describe, expect, it } from 'vitest';
import { pages } from '@/content';
import { routing } from '@/i18n/routing';
import { getDoc, getDocSlugs, getLegalDoc } from '@/lib/content/docs';
import { pageDefinitionSchema, type PageDefinition } from '@/lib/content/types';

// Rules TypeScript cannot express (URL formats, unique ids) are enforced here,
// over the real content, instead of re-validating on every request.

const slugs = await getDocSlugs();
const knownPaths = new Set([
  '/',
  '/examples',
  '/pricing',
  '/docs',
  '/contact',
  ...slugs.map((slug) => `/docs/${slug}`),
]);

function internalLinks(page: PageDefinition): string[] {
  return page.sections
    .flatMap((section) =>
      'primaryAction' in section || 'secondaryAction' in section
        ? [
            section.primaryAction,
            'secondaryAction' in section ? section.secondaryAction : undefined,
          ]
        : [],
    )
    .map((action) => action?.href)
    .filter((href): href is string => href?.startsWith('/') ?? false);
}

describe.each(routing.locales)('content: %s', (locale) => {
  const localePages = Object.entries<PageDefinition>(pages[locale]);

  it.each(localePages)('page "%s" matches the content schema', (_slug, page) => {
    const result = pageDefinitionSchema.safeParse(page);
    expect(result.error?.issues).toBeUndefined();
  });

  it.each(localePages)('page "%s" links only to pages that exist', (_slug, page) => {
    for (const href of internalLinks(page)) expect(knownPaths).toContain(href.split('#')[0]);
  });

  it.each(['privacy', 'terms', 'llm-notice'])(
    'legal page "%s" loads with valid frontmatter',
    async (slug) => {
      const doc = await getLegalDoc(locale, slug);
      expect(doc?.html).toContain('<h2');
    },
  );

  it.each(slugs)('document "%s" loads with valid frontmatter', async (slug) => {
    const doc = await getDoc(locale, slug);
    expect(doc).not.toBeNull();
    expect(doc?.html).toContain('<h2');
  });
});

describe(`documents: ${routing.defaultLocale}`, () => {
  it.each(slugs)('"%s" has a summary that reads in under 20 seconds', async (slug) => {
    const doc = await getDoc(routing.defaultLocale, slug);
    const words = doc?.summary?.split(/\s+/).length ?? 0;
    expect(words).toBeGreaterThan(0);
    expect(words).toBeLessThanOrEqual(70); // about 20 seconds at 220 words a minute
  });

  it.each(slugs)('"%s" suggests only documents that exist', async (slug) => {
    const doc = await getDoc(routing.defaultLocale, slug);
    for (const next of doc?.next ?? []) expect(slugs).toContain(next);
  });
});

describe('pageDefinitionSchema', () => {
  const page = (sections: unknown[]) => ({ meta: { title: 'T', description: 'D' }, sections });
  const cta = (id: string, href: string) => ({
    id,
    type: 'cta-band',
    title: 'Begin',
    primaryAction: { label: 'Go', href },
  });

  it('accepts internal paths, https and mailto links', () => {
    for (const href of ['/docs', 'https://example.com', 'mailto:hello@example.com']) {
      expect(pageDefinitionSchema.safeParse(page([cta('begin', href)])).success).toBe(true);
    }
  });

  it('rejects protocol-relative, http and javascript links', () => {
    for (const href of ['//evil.example', 'http://example.com', 'javascript:alert(1)', 'docs']) {
      expect(pageDefinitionSchema.safeParse(page([cta('begin', href)])).success).toBe(false);
    }
  });

  it('rejects duplicate section ids', () => {
    const result = pageDefinitionSchema.safeParse(page([cta('begin', '/'), cta('begin', '/docs')]));
    expect(result.error?.issues[0]?.message).toMatch(/unique/);
  });

  it('rejects unknown section types and empty pages', () => {
    expect(pageDefinitionSchema.safeParse(page([{ id: 'x', type: 'carousel' }])).success).toBe(
      false,
    );
    expect(pageDefinitionSchema.safeParse(page([])).success).toBe(false);
  });
});
