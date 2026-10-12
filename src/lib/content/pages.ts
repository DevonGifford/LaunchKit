import { pages, type PageSlug } from '@/content';
import type { Locale } from '@/i18n/routing';
import type { PageDefinition, SectionOf, SectionType } from './types';

/** A structured page's content in the requested locale. */
export function getPage(locale: Locale, slug: PageSlug): PageDefinition {
  return pages[locale][slug];
}

/** The first section of a given type in a page — for stories and tests. */
export function findSection<T extends SectionType>(page: PageDefinition, type: T): SectionOf<T> {
  const section = page.sections.find(
    (candidate): candidate is SectionOf<T> => candidate.type === type,
  );
  if (!section) throw new Error(`Page has no "${type}" section`);
  return section;
}
