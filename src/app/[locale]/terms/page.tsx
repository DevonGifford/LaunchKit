import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { DocArticle } from '@/components/layout/doc-article';
import { localeNames } from '@/i18n/routing';
import { resolveLocale } from '@/i18n/server';
import { getLegalDoc } from '@/lib/content/docs';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/terms'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const doc = await getLegalDoc(locale, 'terms');
  if (!doc) return {};
  return pageMetadata(locale, '/terms', doc);
}

export default async function TermsPage({ params }: PageProps<'/[locale]/terms'>) {
  const locale = await resolveLocale(params);
  const doc = await getLegalDoc(locale, 'terms');
  if (!doc) notFound();

  const t = await getTranslations('Legal');

  return (
    <DocArticle
      doc={doc}
      fallbackNotice={t('fallbackNotice', {
        language: localeNames[locale],
        fallbackLanguage: localeNames[doc.locale],
      })}
    />
  );
}
