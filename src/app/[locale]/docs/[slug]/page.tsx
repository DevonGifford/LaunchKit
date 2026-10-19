import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { DocsLayout } from '@/components/layout/docs-layout';
import { localeNames, routing } from '@/i18n/routing';
import { resolveLocale } from '@/i18n/server';
import { getDoc, getDocSlugs, getNextDocs } from '@/lib/content/docs';
import { getDocsNavigation } from '@/lib/content/docs-navigation';
import { pageMetadata } from '@/lib/seo';

// Only documents that exist at build time; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getDocSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/docs/[slug]'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const doc = await getDoc(locale, slug);
  if (!doc) return {};
  return pageMetadata(locale, `/docs/${slug}`, doc);
}

export default async function DocPage({ params }: PageProps<'/[locale]/docs/[slug]'>) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const doc = await getDoc(locale, slug);
  if (!doc) notFound();

  const t = await getTranslations('Docs');
  const [next, sections] = await Promise.all([getNextDocs(locale, doc), getDocsNavigation(locale)]);

  return (
    <DocsLayout
      content={doc}
      sections={sections}
      next={next}
      fallbackNotice={t('fallbackNotice', {
        language: localeNames[locale],
        fallbackLanguage: localeNames[doc.locale],
      })}
    />
  );
}
