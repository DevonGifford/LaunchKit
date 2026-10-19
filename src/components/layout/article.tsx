import type { ReactNode } from 'react';
import { SparklesIcon } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import type { Doc } from '@/lib/content/docs';

/** What an article shows: a Markdown document from src/content, or anything shaped like one. */
export type ArticleContent = Pick<
  Doc,
  | 'title'
  | 'description'
  | 'updated'
  | 'readingMinutes'
  | 'summary'
  | 'html'
  | 'isFallback'
  | 'locale'
>;

/**
 * Long-form text: its title, description, date and reading time, its
 * executive summary if it has one, then the text. The page around it decides
 * the frame (see `ArticleLayout` and `DocsLayout`). `before` sits above the
 * title, such as a link back to an index; `children` continue the text inside
 * the article; `fallbackNotice` says why the text is in another language, when
 * it is.
 */
export async function Article({
  content,
  before,
  children,
  fallbackNotice,
  className,
}: {
  content: ArticleContent;
  before?: ReactNode;
  children?: ReactNode;
  fallbackNotice: string;
  className?: string;
}) {
  const locale = await getLocale();
  const t = await getTranslations('Article');

  return (
    <article lang={content.isFallback ? content.locale : undefined} className={className}>
      <header className="space-y-5 border-b pb-10">
        {before}
        {/* Long single words, such as German ones, hyphenate or wrap instead of overflowing a phone. */}
        <h1 className="text-display wrap-break-word hyphens-auto">{content.title}</h1>
        <p className="text-lede text-muted-foreground">{content.description}</p>
        <p className="text-sm text-muted-foreground">
          {t('updated', { date: new Date(content.updated) })}
          <span aria-hidden="true"> · </span>
          {t('readingTime', { minutes: content.readingMinutes })}
        </p>
        {content.isFallback && (
          <p lang={locale} className="rounded-lg bg-muted px-4 py-3 text-sm">
            {fallbackNotice}
          </p>
        )}
      </header>
      {content.summary && <ExecutiveSummary summary={content.summary} />}
      {/* Repository-authored Markdown, rendered at build time. */}
      <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: content.html }} />
      {children}
    </article>
  );
}

/**
 * What the page covers, in a few lines, for readers deciding whether to read
 * on. Its label says it was written with AI.
 */
async function ExecutiveSummary({ summary }: { summary: string }) {
  const locale = await getLocale();
  const t = await getTranslations('Article');

  return (
    <section
      aria-labelledby="summary-title"
      className="mt-10 rounded-xl border border-accent/40 bg-surface p-6 sm:p-8"
    >
      <h2
        id="summary-title"
        lang={locale}
        className="flex items-center gap-2 font-sans text-xs font-medium tracking-[0.2em] text-accent-text uppercase"
      >
        <SparklesIcon aria-hidden="true" className="size-4" />
        {t('summaryLabel')}
      </h2>
      <p lang={locale} className="mt-4 font-serif text-xl">
        {t('summaryIntro')}
      </p>
      <p className="mt-2 leading-relaxed text-muted-foreground">{summary}</p>
    </section>
  );
}
