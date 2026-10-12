import type { Locale } from '@/i18n/routing';
import type { PageDefinition } from '@/lib/content/types';
import * as de from './de';
import * as en from './en';
import * as es from './es';
import * as fr from './fr';

/**
 * Every structured page, per locale. PROJECT-OWNED: add a page by exporting it
 * from each `src/content/<locale>/index.ts`. A locale missing a page that
 * English has is a type error, so translations cannot silently fall behind.
 */
export const pages = { en, es, fr, de } satisfies Record<
  Locale,
  Record<keyof typeof en, PageDefinition>
>;

export type PageSlug = keyof typeof en;
