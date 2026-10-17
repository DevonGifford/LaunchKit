import type { ReactNode } from 'react';
import { SparklesIcon } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import type { Doc } from '@/lib/content/docs';

/**
 * A Markdown document as a page: its title, description, date and reading
 * time, its executive summary if it has one, then the text. `before` sits above
 * the title, such as a link back to an index; `children` continue the text
 * inside the article, and `after` follows it outside; `fallbackNotice` says why
 * the text is in another language, when it is.
 */
export async function DocArticle({
  doc,
  before,
  after,
  children,
  fallbackNotice,
}: {
  doc: Doc;
  before?: ReactNode;
  after?: ReactNode;
  children?: ReactNode;
  fallbackNotice: string;
}) {
  const locale = await getLocale();
  const t = await getTranslations('Docs');

  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <article lang={doc.isFallback ? doc.locale : undefined} className="mx-auto max-w-3xl">
        <header className="space-y-5 border-b pb-10">
          {before}
          {/* Long single words, such as German ones, hyphenate or wrap instead of overflowing a phone. */}
          <h1 className="text-display wrap-break-word hyphens-auto">{doc.title}</h1>
          <p className="text-lede text-muted-foreground">{doc.description}</p>
          <p className="text-sm text-muted-foreground">
            {t('updated', { date: new Date(doc.updated) })}
            <span aria-hidden="true"> · </span>
            {t('readingTime', { minutes: doc.readingMinutes })}
          </p>
          {doc.isFallback && (
            <p lang={locale} className="rounded-lg bg-muted px-4 py-3 text-sm">
              {fallbackNotice}
            </p>
          )}
        </header>
        {doc.summary && <ExecutiveSummary summary={doc.summary} />}
        {/* Repository-authored Markdown, rendered at build time. */}
        <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: doc.html }} />
        {children}
      </article>
      {/* Outside the article, so it's in the page's language even when the text isn't. */}
      {after && <div className="mx-auto max-w-3xl">{after}</div>}
    </Container>
  );
}

/**
 * What the page covers, in a few lines, for readers deciding whether to read
 * on. Its label says it was written with AI.
 */
async function ExecutiveSummary({ summary }: { summary: string }) {
  const locale = await getLocale();
  const t = await getTranslations('Docs');

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
