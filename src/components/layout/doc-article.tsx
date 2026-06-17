import type { ReactNode } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import type { Doc } from '@/lib/content/docs';

/**
 * A Markdown document as a page: its title, summary, date and reading time,
 * then the text. `before` sits above the title, such as a link back to an
 * index; `fallbackNotice` says why the text is in another language, when it is.
 */
export async function DocArticle({
  doc,
  before,
  fallbackNotice,
}: {
  doc: Doc;
  before?: ReactNode;
  fallbackNotice: string;
}) {
  const locale = await getLocale();
  const t = await getTranslations('Docs');

  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <article lang={doc.isFallback ? doc.locale : undefined} className="mx-auto max-w-3xl">
        <header className="space-y-5 border-b pb-10">
          {before}
          <h1 className="text-display">{doc.title}</h1>
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
        {/* Repository-authored Markdown, rendered at build time. */}
        <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: doc.html }} />
      </article>
    </Container>
  );
}
