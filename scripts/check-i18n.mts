/**
 * Missing-translation check: `pnpm i18n:check`.
 *
 * Compares every locale with the default locale (the source of truth):
 *   - messages/<locale>.json: the same keys, and the same ICU arguments in each
 *     message (a translation that drops `{min}` is a bug).        → error
 *   - src/content/<locale>/docs/*.md: the same documents. Missing ones fall
 *     back to the default locale at runtime, so they are reported.  → warning
 *
 * Structured pages (src/content/<locale>/pages) need no check here: a locale
 * missing a page is already a type error (see src/content/index.ts).
 *
 * Runs on Node's built-in TypeScript support; no dependencies.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { routing } from '../src/i18n/routing.ts';
import { icuArguments } from './icu-arguments.mts';

type Messages = { [key: string]: string | Messages };

const root = path.resolve(import.meta.dirname, '..');
const { defaultLocale, locales } = routing;
const errors: string[] = [];
const warnings: string[] = [];

/** Flattens nested messages to `Namespace.key` → message. */
function flatten(messages: Messages, prefix = ''): Map<string, string> {
  const result = new Map<string, string>();
  for (const [key, value] of Object.entries(messages)) {
    const id = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') result.set(id, value);
    else for (const [nested, text] of flatten(value, id)) result.set(nested, text);
  }
  return result;
}

function readMessages(locale: string): Map<string, string> | null {
  const file = path.join(root, 'messages', `${locale}.json`);
  if (!existsSync(file)) return null;
  return flatten(JSON.parse(readFileSync(file, 'utf8')) as Messages);
}

function listDocs(locale: string): Set<string> {
  const dir = path.join(root, 'src', 'content', locale, 'docs');
  if (!existsSync(dir)) return new Set();
  return new Set(readdirSync(dir).filter((file) => file.endsWith('.md')));
}

const source = readMessages(defaultLocale);
if (!source) {
  errors.push(`messages/${defaultLocale}.json (default locale) does not exist`);
} else {
  const sourceDocs = listDocs(defaultLocale);

  for (const locale of locales.filter((l) => l !== defaultLocale)) {
    const target = readMessages(locale);
    if (!target) {
      errors.push(`messages/${locale}.json does not exist`);
      continue;
    }

    for (const [key, message] of source) {
      const translation = target.get(key);
      if (translation === undefined) {
        errors.push(`messages/${locale}.json: missing "${key}"`);
        continue;
      }
      const expected = [...icuArguments(message)].sort().join(', ');
      const actual = [...icuArguments(translation)].sort().join(', ');
      if (expected !== actual) {
        errors.push(
          `messages/${locale}.json: "${key}" uses {${actual}} but ${defaultLocale} uses {${expected}}`,
        );
      }
    }
    for (const key of target.keys()) {
      if (!source.has(key)) errors.push(`messages/${locale}.json: unused key "${key}"`);
    }

    const docs = listDocs(locale);
    for (const doc of sourceDocs) {
      if (!docs.has(doc)) {
        warnings.push(
          `src/content/${locale}/docs/${doc}: missing — falls back to ${defaultLocale}`,
        );
      }
    }
    for (const doc of docs) {
      if (!sourceDocs.has(doc)) {
        errors.push(
          `src/content/${locale}/docs/${doc}: no ${defaultLocale} original, so never shown`,
        );
      }
    }
  }
}

for (const warning of warnings) console.warn(`warning  ${warning}`);
for (const error of errors) console.error(`error    ${error}`);

if (errors.length > 0) {
  console.error(`\n✖ ${errors.length} translation error(s)`);
  process.exit(1);
}
console.log(
  `✔ ${locales.length} locales consistent with "${defaultLocale}"` +
    (warnings.length > 0 ? ` (${warnings.length} warning(s))` : ''),
);
