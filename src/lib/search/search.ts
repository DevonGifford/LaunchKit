/*
 * Site search: matching and ranking over a small index of the site's text,
 * built per locale at build time (see build-index.ts) and loaded in the
 * browser. No dependencies, and nothing here reads the file system, so it can
 * run on either side.
 *
 * A query matches an entry when every word in it starts a word somewhere in
 * the entry, ignoring case and accents ("polit" finds "Política"). Each word
 * scores by the most important field it appears in, so a page's title
 * outranks a section's heading, a heading outranks a description, and that
 * outranks body text. A section's page title counts only a little: it says
 * where the section is, not what it's about. Ties break on fixed fields, so
 * the same query always gives the same order.
 *
 * The index holds every page and section, so a query can find the passage it
 * belongs to; results come back one per page, each led by its best-matching
 * entry. A page ranks by that best match, never by how often the words recur.
 */

/** What an entry is: a structured page, a guide or a legal page. */
export type SearchKind = 'page' | 'doc' | 'legal';

/** A page, or one section of it, as the index stores it. */
export type SearchEntry = {
  /** Locale-free path, with `#anchor` for a section: `/docs/getting-started#run-it-locally`. */
  href: string;
  kind: SearchKind;
  /** The page's title. */
  title: string;
  /** The section's heading, for an entry that is one section of a page. */
  heading?: string;
  description?: string;
  text: string;
  /** Set when the text is in another language than the index, as for a fallback guide. */
  lang?: string;
};

export type SearchIndex = { locale: string; entries: SearchEntry[] };

/** A piece of displayed text; `match` marks the part that matched the query. */
export type Segment = { text: string; match: boolean };

export type SearchResult = {
  /** The page's best-matching entry: the page itself, or one of its sections. */
  entry: SearchEntry;
  score: number;
  /** The page's title. */
  title: Segment[];
  /** The section that matched best, when that wasn't the page itself. */
  heading?: Segment[];
  /** Where the query matched in the body or description, or the start of either. */
  excerpt?: Segment[];
};

// `title` is a page's own title; a section's page title is only `context`.
const weights = { title: 8, heading: 6, description: 3, context: 2, text: 1 } as const;
type Field = keyof typeof weights;
const fields = Object.keys(weights) as Field[];

const kindOrder: Record<SearchKind, number> = { page: 0, doc: 1, legal: 2 };
const wordCharacter = /[\p{L}\p{N}]/u;

/** One character's search form: lowercase, accents removed, ß as ss. */
function normalizeCharacter(character: string) {
  return character.normalize('NFKD').replace(/\p{M}/gu, '').replaceAll('ß', 'ss').toLowerCase();
}

/** Text in the form search compares: lowercase, accents removed, ß as ss. */
export function normalize(text: string): string {
  return [...text].map(normalizeCharacter).join('');
}

/** `text` normalized, with each normalized character's position in the original. */
function normalizeWithPositions(text: string) {
  let normalized = '';
  const positions: number[] = [];
  let index = 0;
  for (const character of text) {
    for (const part of normalizeCharacter(character)) {
      normalized += part;
      // One position per UTF-16 unit, so an emoji (two units) keeps later ones aligned.
      for (let unit = 0; unit < part.length; unit += 1) positions.push(index);
    }
    index += character.length;
  }
  return { normalized, positions };
}

/** The query's words, normalized. */
export function queryTerms(query: string): string[] {
  return normalize(query).match(/[\p{L}\p{N}]+/gu) ?? [];
}

/** Every position where `term` starts a word in `text` (both normalized). */
function wordStarts(text: string, term: string): number[] {
  const starts: number[] = [];
  for (let at = text.indexOf(term); at !== -1; at = text.indexOf(term, at + 1)) {
    if (at === 0 || !wordCharacter.test(text[at - 1] ?? '')) starts.push(at);
  }
  return starts;
}

/** 0 if `term` starts no word in `text`, 1 if it starts one, 1.5 if it is one. */
function matchStrength(text: string, term: string): number {
  let strength = 0;
  for (const at of wordStarts(text, term)) {
    if (!wordCharacter.test(text[at + term.length] ?? '')) return 1.5;
    strength = 1;
  }
  return strength;
}

type Prepared = { entry: SearchEntry; fields: Record<Field, string> };

/** Normalizes an index's text once, so each keystroke only compares. */
export function prepareIndex(index: SearchIndex): Prepared[] {
  return index.entries.map((entry) => ({
    entry,
    fields: {
      title: entry.heading ? '' : normalize(entry.title),
      heading: normalize(entry.heading ?? ''),
      description: normalize(entry.description ?? ''),
      context: entry.heading ? normalize(entry.title) : '',
      text: normalize(entry.text),
    },
  }));
}

function score({ fields: text }: Prepared, terms: string[], query: string): number {
  let total = 0;
  for (const term of terms) {
    const best = Math.max(
      ...fields.map((field) => weights[field] * matchStrength(text[field], term)),
    );
    if (best === 0) return 0;
    total += best;
  }
  // The whole query as a title or heading, or the start of one, is the best match of all.
  for (const field of ['title', 'heading'] as const) {
    if (text[field] === query) total += 20;
    else if (text[field].startsWith(query)) total += 10;
  }
  return total;
}

function compare(a: { entry: SearchEntry; score: number }, b: typeof a) {
  return (
    b.score - a.score ||
    kindOrder[a.entry.kind] - kindOrder[b.entry.kind] ||
    Number(Boolean(a.entry.heading)) - Number(Boolean(b.entry.heading)) ||
    a.entry.href.localeCompare(b.entry.href)
  );
}

/** Splits `text` into segments, marking where each of `terms` starts a word. */
export function highlight(text: string, terms: string[]): Segment[] {
  const { normalized, positions } = normalizeWithPositions(text);
  const ranges: [number, number][] = [];
  for (const term of terms) {
    for (const at of wordStarts(normalized, term)) {
      const start = positions[at] ?? 0;
      const lastPosition = positions[at + term.length - 1] ?? start;
      const end = lastPosition + ((text.codePointAt(lastPosition) ?? 0) > 0xffff ? 2 : 1);
      ranges.push([start, end]);
    }
  }
  ranges.sort(([a], [b]) => a - b);

  const segments: Segment[] = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    if (end <= cursor) continue;
    if (start > cursor) segments.push({ text: text.slice(cursor, start), match: false });
    segments.push({ text: text.slice(Math.max(start, cursor), end), match: true });
    cursor = end;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), match: false });
  return segments;
}

/**
 * A short passage of `text` around the first word `terms` match, trimmed to
 * whole words; or its start, if nothing matches.
 */
export function excerpt(text: string, terms: string[], length = 120): Segment[] {
  const { normalized, positions } = normalizeWithPositions(text);
  const first = Math.min(...terms.flatMap((term) => wordStarts(normalized, term).slice(0, 1)));
  const at = Number.isFinite(first) ? (positions[first] ?? 0) : 0;

  let start = Math.max(0, at - Math.round(length / 4));
  let end = Math.min(text.length, start + length);
  if (start > 0) start = text.indexOf(' ', start) + 1 || start;
  if (end < text.length)
    end = text.lastIndexOf(' ', end) > start ? text.lastIndexOf(' ', end) : end;

  const body = text.slice(start, end).trim();
  // A cut after a full sentence needs no ellipsis: "clean." rather than "clean.…".
  const cut = end < text.length && !/[.!?]$/.test(body);
  const passage = `${start > 0 ? '…' : ''}${body}${cut ? '…' : ''}`;
  return highlight(passage, terms);
}

/**
 * Pages matching `query`, best first: one result per page, represented by its
 * best-matching entry, so a guide that mentions a word in every section still
 * appears once, and links to the section where it matched best.
 */
export function search(
  index: Prepared[],
  query: string,
  { limit = 12 }: { limit?: number } = {},
): SearchResult[] {
  const terms = queryTerms(query);
  if (terms.length === 0) return [];
  const whole = terms.join(' ');

  const ranked = index
    .map((prepared) => ({ entry: prepared.entry, score: score(prepared, terms, whole) }))
    .filter((result) => result.score > 0)
    .sort(compare);

  // Ranked best first, so the first entry seen for a page is its best match.
  const seen = new Set<string>();
  const results: SearchResult[] = [];
  for (const { entry, score: points } of ranked) {
    const page = entry.href.split('#')[0] ?? entry.href;
    if (seen.has(page)) continue;
    seen.add(page);

    const body = [entry.text, entry.description ?? ''].find((field) =>
      terms.some((term) => wordStarts(normalize(field), term).length > 0),
    );
    results.push({
      entry,
      score: points,
      title: highlight(entry.title, terms),
      heading: entry.heading ? highlight(entry.heading, terms) : undefined,
      excerpt: excerpt(body ?? entry.description ?? entry.text, terms),
    });
    if (results.length === limit) break;
  }
  return results;
}

/** What to offer before anything is typed: every page and guide, without sections. */
export function suggestions(index: SearchIndex): SearchEntry[] {
  return index.entries.filter((entry) => !entry.heading && entry.kind !== 'legal');
}
