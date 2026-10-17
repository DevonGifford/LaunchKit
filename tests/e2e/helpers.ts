import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { routing } from '../../src/i18n/routing';

export const locales = routing.locales;

/** Every page of the site, without a locale prefix. */
export const routes = [
  '/',
  '/examples',
  '/pricing',
  '/docs',
  '/docs/getting-started',
  '/docs/making-it-yours',
  '/docs/launching-a-project',
  '/docs/component-library',
  '/docs/building-with-ai',
  '/docs/roadmap',
  '/contact',
  '/privacy',
  '/terms',
  '/llm-notice',
  '/coming-soon',
  '/home-v1',
] as const;

export const localized = (locale: string, route: string) =>
  route === '/' ? `/${locale}` : `/${locale}${route}`;

/** WCAG 2.2 A/AA violations on the current page, as readable strings. */
export async function axeViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  return results.violations.map(
    (violation) =>
      `${violation.id}: ${violation.nodes.map((node) => node.target.join(' ')).join(', ')}`,
  );
}

/** Pixels the page can scroll sideways; anything above zero is unintended overflow. */
export function horizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}
