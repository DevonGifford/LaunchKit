import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { CtaMediaSection } from '@/components/sections/cta/cta-media-section';
import { Eyebrow } from '@/components/sections/section-parts';
import { Link } from '@/i18n/navigation';
import { localeNames } from '@/i18n/routing';
import { resolveLocale } from '@/i18n/server';
import { listDocs } from '@/lib/content/docs';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/docs'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Docs' });
  return pageMetadata(locale, '/docs', { title: t('title'), description: t('description') });
}

export default async function DocsIndexPage({ params }: PageProps<'/[locale]/docs'>) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Docs');
  const tArticle = await getTranslations('Article');
  const tNavigation = await getTranslations('Navigation');
  const docs = await listDocs(locale);

  return (
    <>
      <Container className="py-16 sm:py-20 lg:py-24">
        <header className="max-w-2xl space-y-5">
          <Eyebrow>{t('count', { count: docs.length })}</Eyebrow>
          <h1 className="text-display">{t('title')}</h1>
          <p className="text-lede text-muted-foreground">{t('description')}</p>
        </header>

        <ul className="mt-14 border-t">
          {docs.map((doc) => (
            <li key={doc.slug} className="border-b">
              <Link
                href={`/docs/${doc.slug}`}
                className="group grid gap-2 rounded-md py-7 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <span className="font-serif text-2xl decoration-accent underline-offset-8 group-hover:underline md:col-span-5">
                  {doc.title}
                </span>
                <span
                  className="text-muted-foreground md:col-span-5"
                  lang={doc.isFallback ? doc.locale : undefined}
                >
                  {doc.description}
                </span>
                <span className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground md:col-span-2 md:flex-col md:items-end">
                  <span>
                    {doc.isFallback
                      ? localeNames[doc.locale]
                      : tArticle('updated', { date: new Date(doc.updated) })}
                  </span>
                  <span>{tArticle('readingTime', { minutes: doc.readingMinutes })}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      {/* A closing invitation, so the index ends on a next step rather than the last guide. */}
      <CtaMediaSection
        id="start"
        type="cta-media"
        title={t('cta.title')}
        description={t('cta.description')}
        primaryAction={{ label: t('cta.quickstart'), href: '/docs/getting-started' }}
        secondaryAction={{ label: tNavigation('getInContact'), href: '/contact' }}
      />
    </>
  );
}
