import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import { routing, type Locale } from '@/i18n/routing';
import { docFrontmatterSchema, type DocFrontmatter } from './types';

/*
 * Long-form Markdown documents in src/content/<locale>/docs/<slug>.md.
 *
 * The default locale defines which documents exist. A document missing from
 * another locale falls back to the default-locale version, flagged so the page
 * can say so and mark the text's language. Documents are read at build time
 * (the docs routes are statically generated), so this never runs per request.
 */

export type DocSummary = DocFrontmatter & {
  slug: string;
  /** The locale the text is actually written in. */
  locale: Locale;
  isFallback: boolean;
};

export type Doc = DocSummary & { html: string };

/** Splits `---`-delimited frontmatter (simple `key: value` lines) from the body. */
export function parseFrontmatter(source: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { data: {}, body: source };

  const data: Record<string, string> = {};
  for (const line of (match[1] ?? '').split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1 || !line.trim()) continue;
    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^(['"])(.*)\1$/, '$2');
    data[key] = value;
  }
  return { data, body: source.slice(match[0].length) };
}

/** Renders trusted, repository-authored Markdown to HTML. */
export function renderMarkdown(markdown: string): string {
  const html = marked.parse(markdown, { async: false, gfm: true });
  // Scrollable code blocks must be reachable by keyboard.
  return html.replaceAll('<pre>', '<pre tabindex="0">');
}

/**
 * Documents under `contentRoot` (normally src/content). A factory so tests can
 * point it at fixtures; the app uses the default instance exported below.
 */
export function createDocsSource(contentRoot: string) {
  function docPath(locale: Locale, slug: string) {
    return path.join(contentRoot, locale, 'docs', `${slug}.md`);
  }

  async function readDocSource(locale: Locale, slug: string) {
    try {
      return await readFile(docPath(locale, slug), 'utf8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw error;
    }
  }

  /** Slugs of every document, as defined by the default locale. */
  async function getDocSlugs(): Promise<string[]> {
    const files = await readdir(path.join(contentRoot, routing.defaultLocale, 'docs'));
    return files.filter((file) => file.endsWith('.md')).map((file) => file.slice(0, -3));
  }

  async function getDoc(locale: Locale, slug: string): Promise<Doc | null> {
    if (!/^[a-z0-9-]+$/.test(slug)) return null;

    let source = await readDocSource(locale, slug);
    let sourceLocale: Locale = locale;
    if (source === null && locale !== routing.defaultLocale) {
      source = await readDocSource(routing.defaultLocale, slug);
      sourceLocale = routing.defaultLocale;
    }
    if (source === null) return null;

    const { data, body } = parseFrontmatter(source);
    const result = docFrontmatterSchema.safeParse(data);
    if (!result.success) {
      throw new Error(
        `Invalid frontmatter in ${path.relative(process.cwd(), docPath(sourceLocale, slug))}: ${result.error.message}`,
      );
    }

    return {
      ...result.data,
      slug,
      locale: sourceLocale,
      isFallback: sourceLocale !== locale,
      html: renderMarkdown(body),
    };
  }

  /** Every document for a locale, in `order`, with fallbacks resolved. */
  async function listDocs(locale: Locale): Promise<DocSummary[]> {
    const docs = await Promise.all((await getDocSlugs()).map((slug) => getDoc(locale, slug)));
    return docs
      .filter((doc): doc is Doc => doc !== null)
      .map(({ html: _html, ...summary }) => summary)
      .sort((a, b) => a.order - b.order);
  }

  return { getDocSlugs, getDoc, listDocs };
}

export const { getDocSlugs, getDoc, listDocs } = createDocsSource(
  path.join(process.cwd(), 'src', 'content'),
);
