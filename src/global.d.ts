import type messages from '../messages/en.json';
import type { routing } from './i18n/routing';

// English is the source catalogue: its keys type-check every `t()` call.
// `pnpm i18n:check` makes sure the other locales have the same keys.
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
