import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Link } from '@/i18n/navigation';
import { localeNames, routing } from '@/i18n/routing';
import { resolveLocale } from '@/i18n/server';
import { getDoc, getDocSlugs } from '@/lib/content/docs';
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

  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <article lang={doc.isFallback ? doc.locale : undefined} className="mx-auto max-w-3xl">
        <header className="space-y-5 border-b pb-10">
          <Link
            href="/docs"
            className="inline-flex min-h-10 items-center rounded-md text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            ← {t('allGuides')}
          </Link>
          <h1 className="text-display">{doc.title}</h1>
          <p className="text-lede text-muted-foreground">{doc.description}</p>
          <p className="text-sm text-muted-foreground">
            {t('updated', { date: new Date(doc.updated) })}
          </p>
          {doc.isFallback && (
            <p lang={locale} className="rounded-lg bg-muted px-4 py-3 text-sm">
              {t('fallbackNotice', {
                language: localeNames[locale],
                fallbackLanguage: localeNames[doc.locale],
              })}
            </p>
          )}
        </header>
        {/* Repository-authored Markdown, rendered at build time. */}
        <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: doc.html }} />
      </article>
    </Container>
  );
}
