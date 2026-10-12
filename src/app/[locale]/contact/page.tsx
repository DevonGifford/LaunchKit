import type { Metadata } from 'next';
import { resolveLocale } from '@/i18n/server';
import { getPage } from '@/lib/content/pages';
import { PageSections } from '@/lib/content/render';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, '/contact', getPage(locale, 'contact').meta);
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const locale = await resolveLocale(params);
  return <PageSections sections={getPage(locale, 'contact').sections} />;
}
