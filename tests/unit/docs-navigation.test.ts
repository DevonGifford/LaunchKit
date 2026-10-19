import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { docsNavigation } from '@/config/docs-navigation';
import { createDocsSource, getDocSlugs } from '@/lib/content/docs';
import { getDocsNavigation, groupDocs } from '@/lib/content/docs-navigation';

const fixtures = createDocsSource(path.join(import.meta.dirname, '..', 'fixtures', 'content'));

describe('docs navigation config', () => {
  it('lists every guide exactly once', async () => {
    const listed = docsNavigation.flatMap((section) => section.docs);
    expect([...listed].sort()).toEqual([...(await getDocSlugs())].sort());
  });
});

describe('groupDocs', () => {
  it('keeps the sections’ order and leaves out missing guides and empty sections', async () => {
    const docs = await fixtures.listDocs('es');
    const grouped = groupDocs(
      [
        { key: 'project', docs: ['second', 'missing'] },
        { key: 'building', docs: ['missing'] },
        { key: 'gettingStarted', docs: ['first'] },
      ],
      docs,
    );

    expect(grouped.map(({ key, docs }) => [key, docs.map((doc) => doc.slug)])).toEqual([
      ['project', ['second']],
      ['gettingStarted', ['first']],
    ]);
  });

  it('keeps each guide’s language, so fallbacks can be marked', async () => {
    const [project, gettingStarted] = groupDocs(
      [
        { key: 'project', docs: ['second'] },
        { key: 'gettingStarted', docs: ['first'] },
      ],
      await fixtures.listDocs('es'),
    );
    expect(project?.docs[0]).toMatchObject({ isFallback: true, locale: 'en' });
    expect(gettingStarted?.docs[0]).toMatchObject({ isFallback: false, locale: 'es' });
  });
});

describe('getDocsNavigation', () => {
  it('gives every locale the same sections, with its own titles', async () => {
    const english = await getDocsNavigation('en');
    const spanish = await getDocsNavigation('es');

    expect(spanish.map((section) => section.key)).toEqual(english.map((section) => section.key));
    expect(spanish[0]?.docs[0]?.title).not.toBe(english[0]?.docs[0]?.title);
  });
});
