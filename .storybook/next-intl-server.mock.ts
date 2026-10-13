/**
 * Storybook-only stand-in for `next-intl/server`. Its real `getTranslations`
 * needs a Next.js request and throws in the browser, so async Server
 * Components (the site header and footer) would not render. This answers from
 * the English catalogue instead. Aliased in .storybook/main.ts.
 */
import { createTranslator } from 'next-intl';
import messages from '../messages/en.json';

export function getTranslations() {
  return Promise.resolve(createTranslator({ locale: 'en', messages }));
}
