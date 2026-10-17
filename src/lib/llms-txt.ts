import packageJson from '../../package.json';
import { getSiteUrl } from '@/config/site';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getLegalDoc, listDocs } from '@/lib/content/docs';
import { getPage } from '@/lib/content/pages';

/*
 * LaunchKit's /llms.txt, following the proposal at https://llmstxt.org: a
 * curated Markdown map of the site for LLMs and coding agents, with an H1, a
 * one-paragraph summary, notes, then lists of links. It's English only, like
 * the file itself.
 *
 * The route at src/app/llms.txt and the LLM notice both render it from here,
 * so the file and the copy shown on the page can't drift apart. Page and
 * document descriptions come from the content, so a new guide appears here
 * without editing this file.
 */

const locale = routing.defaultLocale;

/** The major version of a dependency, e.g. "16" for "16.4.0". */
function major(name: 'next' | 'react' | 'typescript' | 'tailwindcss') {
  const versions: Record<string, string> = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };
  return versions[name]?.split('.')[0] ?? '';
}

/** A list item linking to `href` on this site, with its description. */
function link(name: string, href: string, description: string) {
  const url = new URL(getPathname({ locale, href }), getSiteUrl()).href;
  return `- [${name}](${url}): ${description}`;
}

/** The complete contents of /llms.txt. */
export async function getLlmsTxt(): Promise<string> {
  const docs = await listDocs(locale);
  const legal = await Promise.all(
    (['privacy', 'terms', 'llm-notice'] as const).map(async (slug) => ({
      slug,
      doc: await getLegalDoc(locale, slug),
    })),
  );
  const page = (slug: 'home' | 'examples' | 'pricing' | 'contact') =>
    getPage(locale, slug).meta.description;

  return [
    '# LaunchKit',
    '',
    `> LaunchKit is an open-source, reusable website foundation built on Next.js ${major('next')} (App Router), React ${major('react')}, TypeScript ${major('typescript')} and Tailwind CSS ${major('tailwindcss')}. It gives each new website a themeable design system, four languages, typed section-based content, validated forms, automated tests and CI from the first day.`,
    '',
    'Important notes:',
    '',
    '- LaunchKit is a website foundation, not a SaaS boilerplate. It deliberately has no database, authentication, payments or paid monitoring services; projects add those when they need them.',
    '- A project starts as a clone of LaunchKit, kept as its `upstream` Git remote, and merges LaunchKit releases deliberately.',
    '- Pages are ordered lists of typed sections in `src/content/<locale>/`, validated with Zod. Interface text lives in `messages/<locale>.json`.',
    `- This version of Next.js has breaking changes from older ones. Don't assume APIs from memory; follow the documentation that ships with the installed version.`,
    '- The source code and its documentation are the authority. Where this website disagrees with them, they win.',
    '- The website is written in English first. The Spanish, French and German versions may lag behind or fall back to English.',
    '- The source code is licensed under the MIT License.',
    '',
    '## Docs',
    '',
    ...docs.map((doc) => link(doc.title, `/docs/${doc.slug}`, doc.description)),
    '',
    '## Website',
    '',
    link('Home', '/', page('home')),
    link('Examples', '/examples', page('examples')),
    link('Pricing', '/pricing', page('pricing')),
    link('Contact', '/contact', page('contact')),
    '',
    '## Policies',
    '',
    ...legal.flatMap(({ slug, doc }) =>
      doc ? [link(doc.title, `/${slug}`, doc.description)] : [],
    ),
    '',
    '## Optional',
    '',
    link('Documentation index', '/docs', 'Every guide and article, in reading order.'),
    `- [Sitemap](${new URL('/sitemap.xml', getSiteUrl()).href}): Every page, in every language.`,
    '',
  ].join('\n');
}
