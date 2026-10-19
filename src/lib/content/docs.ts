import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { Marked, type Token, type Tokens, type TokensList } from 'marked';
import { routing, type Locale } from '@/i18n/routing';
import { docFrontmatterSchema, type DocFrontmatter } from './types';

/*
 * Long-form Markdown documents in src/content/<locale>/docs/<slug>.md, and legal
 * pages in src/content/<locale>/legal/<slug>.md.
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
  /** Estimated minutes to read, from the word count. */
  readingMinutes: number;
};

/** A heading in a document, and the text under it until the next one. */
export type DocSection = {
  heading: string;
  /** The heading's id in the rendered HTML: link to `#anchor`. */
  anchor: string;
  text: string;
};

export type Doc = DocSummary & {
  html: string;
  /** Plain text before the first heading. */
  intro: string;
  /** Every h2 and h3, in order, with its text. */
  sections: DocSection[];
};

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

/** Minutes to read `markdown` at about 220 words a minute, rounded up; at least one. */
export function estimateReadingMinutes(markdown: string): number {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

// Ids the page around a document already uses: the root layout and Article.
const reservedIds = ['main', 'summary-title', 'next-docs-title'];

/** Lowercase ASCII words joined by hyphens, with accents folded: "Déjà vu" → "deja-vu". */
export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replaceAll('ß', 'ss')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const entities: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" };

/**
 * HTML as plain text: block tags become spaces, inline tags disappear (so
 * "`pnpm dev`." stays "pnpm dev."), and the entities Markdown produces are decoded.
 */
export function htmlToText(html: string): string {
  return html
    .replace(
      /<\/?(?:p|li|ul|ol|h[1-6]|pre|blockquote|table|thead|tbody|tr|td|th|br|hr)\b[^>]*>/gi,
      ' ',
    )
    .replace(/<[^>]*>/g, '')
    .replace(/&(amp|lt|gt|quot|#39);/g, (_, entity: string) => entities[entity] ?? '')
    .replace(/\s+/g, ' ')
    .trim();
}

type AnchoredHeading = Tokens.Heading & { anchor?: string };

/** An h2 or h3, the headings that get ids. (marked's token union doesn't narrow on `type`.) */
function isSectionHeading(token: Token): token is AnchoredHeading {
  return token.type === 'heading' && (token.depth === 2 || token.depth === 3);
}

const markdown = new Marked({
  gfm: true,
  renderer: {
    heading(token) {
      const { anchor } = token as AnchoredHeading;
      const id = anchor ? ` id="${anchor}"` : '';
      return `<h${token.depth}${id}>${this.parser.parseInline(token.tokens)}</h${token.depth}>\n`;
    },
  },
});

/** Renders tokens to HTML. Scrollable code blocks must be reachable by keyboard. */
function render(tokens: Token[], links: TokensList['links']): string {
  return markdown
    .parser(Object.assign([...tokens], { links }))
    .replaceAll('<pre>', '<pre tabindex="0">');
}

/**
 * Renders trusted, repository-authored Markdown to HTML, giving each h2 and h3
 * an id from its text, and returns the text under each heading too. The ids
 * and the sections come from the same pass, so search can link to them.
 */
export function parseMarkdown(source: string): Pick<Doc, 'html' | 'intro' | 'sections'> {
  const tokens = markdown.lexer(source);
  const used = new Set(reservedIds);
  const intro: Token[] = [];
  const sections: { heading: string; anchor: string; tokens: Token[] }[] = [];

  for (const token of tokens) {
    if (isSectionHeading(token)) {
      const heading = htmlToText(markdown.parseInline(token.text, { async: false }));
      const base = slugify(heading) || 'section';
      let anchor = base;
      for (let n = 2; used.has(anchor); n += 1) anchor = `${base}-${n}`;
      used.add(anchor);
      token.anchor = anchor;
      sections.push({ heading, anchor, tokens: [] });
    } else {
      (sections.at(-1)?.tokens ?? intro).push(token);
    }
  }

  return {
    html: render(tokens, tokens.links),
    intro: htmlToText(render(intro, tokens.links)),
    sections: sections.map(({ heading, anchor, tokens: body }) => ({
      heading,
      anchor,
      text: htmlToText(render(body, tokens.links)),
    })),
  };
}

/** Renders trusted, repository-authored Markdown to HTML. */
export function renderMarkdown(source: string): string {
  return parseMarkdown(source).html;
}

/**
 * Documents in `<contentRoot>/<locale>/<folder>/` (normally src/content and
 * `docs`). A factory so tests can point it at fixtures; the app uses the
 * instances exported below.
 */
export function createDocsSource(contentRoot: string, folder: 'docs' | 'legal' = 'docs') {
  // Spelled out rather than joined from `folder`, so the build can trace which
  // files are read instead of tracing the whole project.
  function folderPath(locale: Locale) {
    return folder === 'legal'
      ? path.join(contentRoot, locale, 'legal')
      : path.join(contentRoot, locale, 'docs');
  }

  function docPath(locale: Locale, slug: string) {
    return path.join(folderPath(locale), `${slug}.md`);
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
    const files = await readdir(folderPath(routing.defaultLocale));
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
      readingMinutes: estimateReadingMinutes(body),
      ...parseMarkdown(body),
    };
  }

  /** Every document for a locale, in `order`, with fallbacks resolved. */
  async function listDocs(locale: Locale): Promise<DocSummary[]> {
    const docs = await Promise.all((await getDocSlugs()).map((slug) => getDoc(locale, slug)));
    return docs
      .filter((doc): doc is Doc => doc !== null)
      .map(({ html: _html, intro: _intro, sections: _sections, ...summary }) => summary)
      .sort((a, b) => a.order - b.order);
  }

  /**
   * The documents to suggest after `doc`: those its `next` lists, or else the
   * two that follow it in order, wrapping round to the start.
   */
  async function getNextDocs(locale: Locale, doc: DocSummary): Promise<DocSummary[]> {
    const docs = await listDocs(locale);
    if (doc.next.length > 0) {
      return doc.next.flatMap((slug) => docs.filter((candidate) => candidate.slug === slug));
    }
    const index = docs.findIndex((candidate) => candidate.slug === doc.slug);
    return [...docs.slice(index + 1), ...docs.slice(0, index)].slice(0, 2);
  }

  return { getDocSlugs, getDoc, listDocs, getNextDocs };
}

const contentRoot = path.join(process.cwd(), 'src', 'content');

export const { getDocSlugs, getDoc, listDocs, getNextDocs } = createDocsSource(contentRoot);

/**
 * Legal pages such as the privacy policy, in src/content/<locale>/legal/: kept
 * out of the docs index, with the same fallback to the default locale.
 */
export const { getDoc: getLegalDoc, getDocSlugs: getLegalSlugs } = createDocsSource(
  contentRoot,
  'legal',
);
