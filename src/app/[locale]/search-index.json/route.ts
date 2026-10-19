import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { buildSearchIndex } from '@/lib/search/build-index';

// One file per locale, written at build time; any other locale is a 404.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Serves /<locale>/search-index.json, which site search loads when it's first opened. */
export async function GET(
  _request: Request,
  { params }: RouteContext<'/[locale]/search-index.json'>,
) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return new Response(null, { status: 404 });
  return Response.json(await buildSearchIndex(locale));
}
