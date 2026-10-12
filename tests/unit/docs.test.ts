import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { createDocsSource, parseFrontmatter, renderMarkdown } from '@/lib/content/docs';

const fixtures = path.join(import.meta.dirname, '..', 'fixtures');
const docs = createDocsSource(path.join(fixtures, 'content'));

describe('Markdown documents', () => {
  it('serves the translation when one exists', async () => {
    const doc = await docs.getDoc('es', 'first');
    expect(doc).toMatchObject({ title: 'Primero', locale: 'es', isFallback: false });
  });

  it('falls back to the default locale when a translation is missing', async () => {
    const doc = await docs.getDoc('de', 'second');
    expect(doc).toMatchObject({ title: 'Second: English only', locale: 'en', isFallback: true });
  });

  it('lists documents in order, with fallbacks resolved', async () => {
    const list = await docs.listDocs('es');
    expect(list.map((doc) => [doc.slug, doc.locale])).toEqual([
      ['first', 'es'],
      ['second', 'en'],
    ]);
    expect(list[0]).not.toHaveProperty('html');
  });

  it('returns null for unknown or unsafe slugs', async () => {
    expect(await docs.getDoc('en', 'missing')).toBeNull();
    expect(await docs.getDoc('en', '../../package')).toBeNull();
  });

  it('fails loudly on invalid frontmatter', async () => {
    const invalid = createDocsSource(path.join(fixtures, 'content-invalid'));
    await expect(invalid.getDoc('en', 'broken')).rejects.toThrow(/Invalid frontmatter.*broken\.md/);
  });
});

describe('parseFrontmatter', () => {
  it('splits key/value frontmatter from the body and unquotes values', () => {
    const { data, body } = parseFrontmatter("---\ntitle: 'A: B'\norder: 2\n---\n\n# Body\n");
    expect(data).toEqual({ title: 'A: B', order: '2' });
    expect(body.trim()).toBe('# Body');
  });

  it('treats a document without frontmatter as all body', () => {
    expect(parseFrontmatter('Just text')).toEqual({ data: {}, body: 'Just text' });
  });
});

describe('renderMarkdown', () => {
  it('makes code blocks keyboard-focusable so they can be scrolled', () => {
    expect(renderMarkdown('```sh\npnpm dev\n```')).toContain('<pre tabindex="0">');
  });

  it('renders GitHub-flavoured tables', () => {
    expect(renderMarkdown('| a | b |\n| - | - |\n| 1 | 2 |')).toContain('<table>');
  });
});
