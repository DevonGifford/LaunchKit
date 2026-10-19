import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ConsentIntegrations } from '@/components/layout/consent-integrations';
import { ConsentPreferences } from '@/components/layout/consent-preferences';
import { ConsentPrompt } from '@/components/layout/consent-prompt';
import { ConsentProvider } from '@/components/layout/consent-provider';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { activeIntegrations } from '@/config/integrations';
import { getSiteUrl } from '@/config/site';
import { routing } from '@/i18n/routing';
import { resolveLocale } from '@/i18n/server';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: getSiteUrl(),
    title: { default: t('siteName'), template: `%s · ${t('siteName')}` },
    description: t('description'),
    applicationName: t('siteName'),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Layout');
  const messages = await getMessages();
  const services = activeIntegrations().map(({ name, consent }) => ({ name, consent }));

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          {t('skipToContent')}
        </a>
        {/* Client components only receive the catalogues they use. */}
        <NextIntlClientProvider
          messages={{
            Common: messages.Common,
            Consent: messages.Consent,
            ContactForm: messages.ContactForm,
            Error: messages.Error,
            Search: messages.Search,
          }}
        >
          <ThemeProvider>
            <ConsentProvider services={services}>
              {/* Early in the tab order, so keyboard users reach it before the page. */}
              <ConsentPrompt />
              <SiteHeader variant="wide" />
              <main id="main" tabIndex={-1} className="flex-1 outline-none">
                {children}
              </main>
              <SiteFooter />
              <ConsentPreferences />
              <ConsentIntegrations />
            </ConsentProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
