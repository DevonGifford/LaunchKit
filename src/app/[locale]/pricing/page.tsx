import type { Metadata } from 'next';
import { resolveLocale } from '@/i18n/server';
import { getPage } from '@/lib/content/pages';
import { PageSections } from '@/lib/content/render';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/pricing'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, '/pricing', getPage(locale, 'pricing').meta);
}

export default async function PricingPage({ params }: PageProps<'/[locale]/pricing'>) {
  const locale = await resolveLocale(params);
  return <PageSections sections={getPage(locale, 'pricing').sections} />;
}
