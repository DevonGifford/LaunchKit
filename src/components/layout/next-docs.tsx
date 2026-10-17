import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { DocSummary } from '@/lib/content/docs';

/** Documents to read next, as linked titles with their descriptions. */
export async function NextDocs({ docs }: { docs: DocSummary[] }) {
  if (docs.length === 0) return null;
  const t = await getTranslations('Docs');

  return (
    <nav aria-labelledby="next-docs-title" className="mt-16 border-t pt-10">
      <h2 id="next-docs-title" className="text-3xl">
        {t('whereNext')}
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/docs/${doc.slug}`}
              lang={doc.isFallback ? doc.locale : undefined}
              className="group flex h-full flex-col gap-2 rounded-lg border bg-surface p-5 transition-colors outline-none hover:border-accent focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="font-serif text-xl decoration-accent underline-offset-4 group-hover:underline">
                {doc.title}
                <span aria-hidden="true"> →</span>
              </span>
              <span className="text-sm text-muted-foreground">{doc.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
