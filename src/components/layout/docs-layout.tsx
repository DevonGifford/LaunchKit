import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Link } from '@/i18n/navigation';
import type { DocSummary } from '@/lib/content/docs';
import type { DocsNavigationSection } from '@/lib/content/docs-navigation';
import { Article, type ArticleContent } from './article';
import { DocsNav, DocsNavSheet, type DocsNavSection } from './docs-nav';
import { NextDocs } from './next-docs';

/**
 * A guide in the docs: the article, with the docs navigation in a column to
 * its left from 1024px and behind a "browse guides" button below that, and
 * suggestions of what to read next.
 *
 * From 1024px the frame widens to the footer's, so the navigation takes the
 * left margin and the article keeps its reading width, centred on wide
 * screens. The navigation stays in view while the article scrolls.
 */
export async function DocsLayout({
  content,
  sections,
  next,
  fallbackNotice,
}: {
  content: ArticleContent;
  sections: readonly DocsNavigationSection[];
  next: DocSummary[];
  fallbackNotice: string;
}) {
  const t = await getTranslations('Docs');
  const tCommon = await getTranslations('Common');
  const navigation: DocsNavSection[] = sections.map(({ key, docs }) => ({
    title: t(`sections.${key}`),
    items: docs.map((doc) => ({
      href: `/docs/${doc.slug}`,
      label: doc.title,
      lang: doc.isFallback ? doc.locale : undefined,
    })),
  }));

  return (
    <Container className="max-w-[88rem] py-16 sm:py-20 lg:grid lg:grid-cols-[minmax(15rem,1fr)_minmax(0,48rem)_minmax(0,1fr)] lg:py-24">
      {/* Below 1024px the button in the article's header takes over. */}
      <div className="hidden lg:block lg:pr-10">
        <DocsNav
          sections={navigation}
          label={t('navigation')}
          className="sticky top-24 ml-auto max-h-[calc(100dvh-7rem)] max-w-60 overflow-y-auto pb-2"
        />
      </div>
      <div className="mx-auto w-full max-w-3xl">
        <Article
          content={content}
          fallbackNotice={fallbackNotice}
          before={
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/docs"
                className="inline-flex min-h-10 items-center rounded-md text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                ← {t('allGuides')}
              </Link>
              <DocsNavSheet
                sections={navigation}
                className="lg:hidden"
                labels={{
                  browse: t('browse'),
                  title: t('navigation'),
                  description: t('browseDescription'),
                  close: tCommon('close'),
                }}
              />
            </div>
          }
        />
        {/* Outside the article, so it's in the page's language even when the text isn't. */}
        <NextDocs docs={next} />
      </div>
    </Container>
  );
}
