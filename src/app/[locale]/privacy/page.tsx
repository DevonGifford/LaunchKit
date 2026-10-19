import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ArticleLayout } from '@/components/layout/article-layout';
import { localeNames } from '@/i18n/routing';
import { resolveLocale } from '@/i18n/server';
import { getLegalDoc } from '@/lib/content/docs';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/privacy'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const doc = await getLegalDoc(locale, 'privacy');
  if (!doc) return {};
  return pageMetadata(locale, '/privacy', doc);
}

export default async function PrivacyPage({ params }: PageProps<'/[locale]/privacy'>) {
  const locale = await resolveLocale(params);
  const doc = await getLegalDoc(locale, 'privacy');
  if (!doc) notFound();

  const t = await getTranslations('Legal');

  return (
    <ArticleLayout
      content={doc}
      fallbackNotice={t('fallbackNotice', {
        language: localeNames[locale],
        fallbackLanguage: localeNames[doc.locale],
      })}
    />
  );
}
