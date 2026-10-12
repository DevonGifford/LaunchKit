import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getSiteUrl, siteConfig } from '@/config/site';
import { getPathname } from '@/i18n/navigation';
import { resolveLocale } from '@/i18n/server';
import { getPage } from '@/lib/content/pages';
import { PageSections } from '@/lib/content/render';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { meta } = getPage(locale, 'home');
  // The layout's title template only applies to child segments, and the home
  // page shares the layout's segment, so it spells out its full title.
  return {
    ...pageMetadata(locale, '/', meta),
    title: { absolute: `${siteConfig.name} — ${meta.title}` },
  };
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const locale = await resolveLocale(params);
  const page = getPage(locale, 'home');
  const t = await getTranslations('Metadata');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t('siteName'),
    description: page.meta.description,
    inLanguage: locale,
    url: new URL(getPathname({ locale, href: '/' }), getSiteUrl()).href,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Serialized from a static object; `<` is escaped so content cannot close the tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll('<', '\\u003c'),
        }}
      />
      <PageSections sections={page.sections} />
    </>
  );
}
