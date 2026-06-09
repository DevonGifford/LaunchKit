import type { Metadata } from 'next';
import { resolveLocale } from '@/i18n/server';
import { getPage } from '@/lib/content/pages';
import { PageSections } from '@/lib/content/render';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/examples'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, '/examples', getPage(locale, 'examples').meta);
}

export default async function ExamplesPage({ params }: PageProps<'/[locale]/examples'>) {
  const locale = await resolveLocale(params);
  return <PageSections sections={getPage(locale, 'examples').sections} />;
}
