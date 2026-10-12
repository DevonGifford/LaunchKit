import { hasLocale, type Messages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const catalogue = (await import(`../../messages/${locale}.json`)) as { default: Messages };

  return {
    locale,
    // A fixed zone keeps server- and client-rendered dates identical.
    timeZone: 'UTC',
    messages: catalogue.default,
  };
});
