import { globSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * Storybook renders component and story JSDoc as Markdown on docs pages, so a
 * literal `<html>`, `<head>` or `<body>` in a comment becomes a real element.
 * React 19 treats those as the document's own root elements, and the docs page
 * freezes. Write them in backticks instead.
 */
const documentTag = /<(html|head|body)\b[^>]*>/i;

function rawDocumentTags(source: string) {
  const comments = source.match(/\/\*\*[\s\S]*?\*\//g) ?? [];
  return comments
    .map((comment) => comment.replace(/`[^`\n]*`/g, ''))
    .filter((comment) => documentTag.test(comment));
}

describe('JSDoc rendered on Storybook docs pages', () => {
  const files = globSync('src/components/**/*.tsx');

  it('finds the component and story files', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s has no raw <html>, <head> or <body> in its JSDoc', (file) => {
    expect(rawDocumentTags(readFileSync(file, 'utf8'))).toEqual([]);
  });
});
