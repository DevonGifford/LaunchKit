/**
 * Storybook-only stand-in for `next-intl/server`. Its real `getTranslations`
 * needs a Next.js request and throws in the browser, so async Server
 * Components (the site header and footer, the article) would not render. This
 * answers from the English catalogue instead. Aliased in .storybook/main.ts.
 */
import { createTranslator, type NamespaceKeys, type NestedKeyOf } from 'next-intl';
import messages from '../messages/en.json';

type Namespace = NamespaceKeys<typeof messages, NestedKeyOf<typeof messages>>;

export function getTranslations(options?: Namespace | { namespace?: Namespace }) {
  const namespace = typeof options === 'string' ? options : options?.namespace;
  // The same time zone as the stories' NextIntlClientProvider (.storybook/preview.tsx).
  return Promise.resolve(createTranslator({ locale: 'en', messages, namespace, timeZone: 'UTC' }));
}

export function getLocale() {
  return Promise.resolve('en');
}
