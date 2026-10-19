import { docsNavigation, type DocsSection } from '@/config/docs-navigation';
import type { Locale } from '@/i18n/routing';
import { listDocs, type DocSummary } from './docs';

/** A section of the docs navigation with its guides resolved for one locale. */
export type DocsNavigationSection = { key: DocsSection['key']; docs: DocSummary[] };

/**
 * Puts `docs` into `sections`, in the sections' order. Slugs with no document
 * are left out, and so are sections left empty.
 */
export function groupDocs(
  sections: readonly DocsSection[],
  docs: readonly DocSummary[],
): DocsNavigationSection[] {
  const bySlug = new Map(docs.map((doc) => [doc.slug, doc]));
  return sections
    .map(({ key, docs: slugs }) => ({
      key,
      docs: slugs.flatMap((slug) => bySlug.get(slug) ?? []),
    }))
    .filter((section) => section.docs.length > 0);
}

/** The docs navigation for `locale`, with titles in that language where they exist. */
export async function getDocsNavigation(locale: Locale) {
  return groupDocs(docsNavigation, await listDocs(locale));
}
