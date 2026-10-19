import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CodeFile } from '@/components/layout/code-file';
import { ArticleLayout } from '@/components/layout/article-layout';
import { localeNames } from '@/i18n/routing';
import { resolveLocale } from '@/i18n/server';
import { getLegalDoc } from '@/lib/content/docs';
import { getLlmsTxt } from '@/lib/llms-txt';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/llm-notice'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const doc = await getLegalDoc(locale, 'llm-notice');
  if (!doc) return {};
  return pageMetadata(locale, '/llm-notice', doc);
}

export default async function LlmNoticePage({ params }: PageProps<'/[locale]/llm-notice'>) {
  const locale = await resolveLocale(params);
  const doc = await getLegalDoc(locale, 'llm-notice');
  if (!doc) notFound();

  const t = await getTranslations('Legal');

  return (
    <ArticleLayout
      content={doc}
      fallbackNotice={t('fallbackNotice', {
        language: localeNames[locale],
        fallbackLanguage: localeNames[doc.locale],
      })}
    >
      {/* The notice ends by explaining /llms.txt; here is the file itself, from its one source. */}
      <CodeFile name="llms.txt" code={await getLlmsTxt()} />
    </ArticleLayout>
  );
}
