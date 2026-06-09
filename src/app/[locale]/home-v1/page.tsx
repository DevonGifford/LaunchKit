import type { Metadata } from 'next';
import { resolveLocale } from '@/i18n/server';
import { getPage } from '@/lib/content/pages';
import { PageSections } from '@/lib/content/render';
import { pageMetadata } from '@/lib/seo';

// The previous homepage, kept for reference with its translations: kept out of
// search results, the sitemap and the navigation.

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/home-v1'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return {
    ...pageMetadata(locale, '/home-v1', getPage(locale, 'homeV1').meta),
    robots: { index: false },
  };
}

export default async function HomeV1Page({ params }: PageProps<'/[locale]/home-v1'>) {
  const locale = await resolveLocale(params);
  return <PageSections sections={getPage(locale, 'homeV1').sections} />;
}
