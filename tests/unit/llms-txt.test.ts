import { describe, expect, it } from 'vitest';
import { getSiteUrl } from '@/config/site';
import { getDocSlugs } from '@/lib/content/docs';
import { getLlmsTxt } from '@/lib/llms-txt';

// The structure the llms.txt proposal (https://llmstxt.org) describes, and links
// only to pages that exist.

const text = await getLlmsTxt();
const lines = text.split('\n');
const origin = getSiteUrl().origin;

describe('llms.txt', () => {
  it('opens with the H1 and a one-line blockquote summary', () => {
    expect(lines[0]).toBe('# LaunchKit');
    expect(lines.find((line) => line.trim())).toBe('# LaunchKit');
    expect(lines.filter((line) => line.startsWith('> '))).toHaveLength(1);
    expect(text.indexOf('> ')).toBeLessThan(text.indexOf('## '));
  });

  it('uses no headings other than the H1 and H2 sections, ending with Optional', () => {
    const headings = lines.filter((line) => line.startsWith('#'));
    expect(headings.slice(1).every((line) => line.startsWith('## '))).toBe(true);
    expect(headings.at(-1)).toBe('## Optional');
  });

  it('lists each link as "- [name](url): notes", on this site', () => {
    const items = lines.filter((line) => line.startsWith('- ['));
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(item).toMatch(/^- \[[^\]]+\]\(https?:\/\/[^)]+\): \S/);
      expect(item).toContain(`](${origin}/`);
    }
  });

  it('links only to pages that exist, including every document', async () => {
    const slugs = await getDocSlugs();
    const known = new Set(
      [
        ...['', '/examples', '/pricing', '/contact', '/docs', '/privacy', '/terms', '/llm-notice'],
        ...slugs.map((slug) => `/docs/${slug}`),
      ].map((path) => `/en${path}`),
    );
    known.add('/sitemap.xml');

    const paths = [...text.matchAll(/\]\(([^)]+)\)/g)].map(
      (match) => new URL(match[1] ?? '').pathname,
    );
    for (const path of paths) expect(known).toContain(path);
    for (const slug of slugs) expect(paths).toContain(`/en/docs/${slug}`);
  });
});
