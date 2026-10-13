import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
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
  const docs = await listDocs(locale);

  return (
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
              <span className="text-xs text-muted-foreground md:col-span-2 md:text-right">
                {doc.isFallback
                  ? localeNames[doc.locale]
                  : t('updated', { date: new Date(doc.updated) })}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
