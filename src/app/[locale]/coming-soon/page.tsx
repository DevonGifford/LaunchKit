import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ComingSoonState } from '@/components/layout/coming-soon-state';
import { resolveLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/coming-soon'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'ComingSoon' });
  // A placeholder destination for links whose page doesn't exist yet: kept out
  // of search results and the sitemap.
  return {
    ...pageMetadata(locale, '/coming-soon', { title: t('label'), description: t('description') }),
    robots: { index: false },
  };
}

export default async function ComingSoonPage({ params }: PageProps<'/[locale]/coming-soon'>) {
  await resolveLocale(params);
  return <ComingSoonState />;
}
