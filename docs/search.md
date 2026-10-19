# Site search

LaunchKit's search is local: no hosted service and no search library. At
build time each locale gets a small JSON index of the site's own content. The
browser loads it the first time someone opens search, and a short, predictable
ranking module matches against it. Results open the page, or go straight to
the section that matched.

## Switching it on

Search lives in the wide header's `wide-search` variant, which puts a search
field where `wide` has its call to action. Choose the variant in
`src/app/[locale]/layout.tsx`:

```tsx
// Search where the call to action would be; ⌘K / Ctrl+K opens it too.
<SiteHeader variant="wide-search" />

// A call to action instead, and no search.
<SiteHeader variant="wide" />
```

A new site with a handful of pages is fine with `wide`. Switch once there's
enough content to search. With `wide`, search renders nothing and the dialog
and index never load. The index files are still built; delete
`src/app/[locale]/search-index.json/` too if the site will never search.

## How it fits together

```text
src/content (pages, guides, legal pages)
        │  at build time
        ▼
buildSearchIndex(locale)                  src/lib/search/build-index.ts
        │
        ▼
/<locale>/search-index.json               src/app/[locale]/search-index.json/route.ts
        │  fetched the first time search opens
        ▼
SiteSearch ── SearchTrigger (field, icon) src/components/layout/site-search.tsx
   │  ⌘K / Ctrl+K, open state, index loading
   ▼
SearchDialog (shadcn Command on cmdk)     src/components/layout/search-dialog.tsx
   │
   ▼
search(index, query)                      src/lib/search/search.ts
```

| File                                          | What it owns                                                    |
| --------------------------------------------- | --------------------------------------------------------------- |
| `src/lib/search/search.ts`                    | Types, matching, ranking, highlights, excerpts. Runs anywhere.  |
| `src/lib/search/build-index.ts`               | Turns content into index entries. Server only (reads the disk). |
| `src/config/search.ts`                        | Each structured page's path, or `null` to keep it out.          |
| `src/app/[locale]/search-index.json/route.ts` | Serves one static index file per locale.                        |
| `src/components/layout/site-search.tsx`       | `SiteSearch` (state, shortcut, loading) and `SearchTrigger`.    |
| `src/components/layout/search-dialog.tsx`     | The dialog: input, grouped results, empty state.                |
| `src/lib/content/docs.ts` (`parseMarkdown`)   | Heading ids in guides and legal pages, and the text under each. |
| `messages/<locale>.json` (`Search`)           | Every label, placeholder and message in the interface.          |

## The index

Every entry is a page or one section of a page:

```ts
type SearchEntry = {
  href: string; // locale-free: '/pricing', '/docs/getting-started#run-it-locally'
  kind: 'page' | 'doc' | 'legal';
  title: string; // the page's title
  heading?: string; // set for a section
  description?: string;
  text: string;
  lang?: string; // the text's language, when a guide falls back to English
};
```

What goes in, all from content the site already renders (nothing is written
twice for search):

- **Structured pages** (`src/content/<locale>/pages/`): one entry for the
  page, from its `meta`, then one per section. A section's `title` is its
  heading, `eyebrow` and `description` its description, and every other
  readable string its text. A page's `meta.navTitle`, when set, names it in
  results ("Home" rather than the homepage's headline title).
- **Guides and legal pages** (Markdown): one entry for the document (its
  description and summary, and the text before the first heading), then one
  per `##` and `###` heading with the text under it.

Section anchors come from the content itself: a structured page's section `id`
is the element id, and `parseMarkdown` gives each guide heading an id from its
text (accents folded, `-2` for a repeat, never an id the page already uses).
The same pass builds the HTML and the index entries, so they can't disagree.

Each locale's index holds only that locale's text. A guide that isn't
translated yet falls back to English, in search as on the page, marked with
`lang`. Today each file is roughly 70–80 KB, about 25 KB compressed.

## Matching and ranking

All in `src/lib/search/search.ts`, deterministic and without dependencies:

- **Every word must match**, at the start of a word somewhere in the entry.
  "polit" finds "Política", but "price" doesn't find "pricing" and "cess"
  doesn't find "access".
- **Case and accents are ignored**, and ß matches ss.
- **Each word scores by the most important field it's in:**

  ```ts
  const weights = { title: 8, heading: 6, description: 3, context: 2, text: 1 } as const;
  ```

  A whole word scores 1.5×, the start of one 1×. `context` is a section's page
  title: it says where the section is, not what it's about.

- **The whole query as a title or heading** adds 20 (10 if it's how the title
  starts).
- **One result per page.** The index is granular, but results come back one
  per page, led by its best-scoring entry. A page ranks by that best match,
  never by how often a word recurs. If the best match is a section, the result
  opens its anchor.
- **Ties** break by kind (pages, then guides, then legal pages), then whole
  page before section, then path, so the same query always gives the same
  order.
- **Excerpts** are about 120 characters around the first match, cut at whole
  words.

## The interface

`SiteSearch` is a client component that owns the dialog's open state, the
shortcut and loading the index. It renders the dialog once, however many
triggers there are. The header uses it like this:

```tsx
<SiteSearch siteName={siteConfig.name}>
  {/* … */}
  <SearchTrigger /> {/* the field, with its ⌘K / Ctrl K hint */}
  <SearchTrigger variant="icon" /> {/* phones and tablets */}
</SiteSearch>
```

Pass `index={…}` to skip fetching, as the stories and browser tests do with
`tests/fixtures/search.ts`.

Behaviour worth knowing before changing it:

- **The shortcut** is ⌘K on Apple devices and Ctrl+K elsewhere. It's ignored
  while someone types in a field, and it overrides the browser's own Ctrl+K.
- **Loading:** the dialog (with `cmdk`) loads on the first hover, focus or
  shortcut, as does the index. Neither ships with the page.
- **Filtering:** `cmdk` draws the list and handles the keys. Its own filter is
  off (`shouldFilter={false}`), and the dialog reselects the top result
  whenever the results change, so typing and pressing Enter opens the best
  match.
- **Navigation** waits until the dialog has closed, because a section on the
  current page can't scroll into view while the dialog holds the page still.
- **Focus** returns to whatever had it before the dialog opened (Radix only
  does that for its own trigger buttons).
- **Rows:** a whole page shows by name alone. A guide, a legal page or a page
  whose best match was a section shows the section and an excerpt beneath its
  name. Matches are marked with the `accent-text` token.
- **Copy:** every string is in the `Search` namespace of `messages/`, which
  the root layout passes to the browser.

## Recipes

**Keep a page out of search, or add a new one.** List every structured page
in `src/config/search.ts`; TypeScript fails until a new page is there.

```ts
export const searchablePages: Record<PageSlug, string | null> = {
  home: '/',
  pricing: '/pricing',
  homeV1: null, // kept out
};
```

**Name a page in results.** When `meta.title` is written for search engines,
add a navigation title in every locale:

```ts
meta: { title: 'The foundation for your next website', navTitle: 'Home', description: '…' },
```

**Add a section type.** Every string field becomes searchable text. Add any
that aren't text (options, file names) to `skippedKeys` in
`src/lib/search/build-index.ts`; the unit tests catch paths, URLs and
`undefined`.

**Add a kind of content**, such as a blog:

1. Add the kind and its place in the order in `src/lib/search/search.ts`:

   ```ts
   export type SearchKind = 'page' | 'doc' | 'post' | 'legal';
   const kindOrder: Record<SearchKind, number> = { page: 0, doc: 1, post: 2, legal: 3 };
   ```

2. Add its entries in `buildSearchIndex`. Markdown posts can reuse
   `documentEntries`, the same as guides:

   ```ts
   ...posts.flatMap(({ slug, doc }) => documentEntries(doc, `/blog/${slug}`, 'post')),
   ```

3. Give it an icon in `search-dialog.tsx` (`icons` is a `Record<SearchKind, …>`,
   so TypeScript asks), and a group heading, `Search.groups.post`, in every
   locale.
4. Add it to `tests/unit/search-index.test.ts`.

**Tune the ranking.** Change `weights` or the bonuses in `search.ts`, then run
`pnpm test:unit`. `tests/unit/search.test.ts` pins the order on a small
fixture. To see real results, run a query against `buildSearchIndex('en')` in a
scratch test.

**Search from somewhere else.** Wrap the area in `SiteSearch` and place a
`SearchTrigger` anywhere inside it. Only use one `SiteSearch` per page: each
listens for the shortcut.

## Tests

| Where                                    | What                                                                  |
| ---------------------------------------- | --------------------------------------------------------------------- |
| `tests/unit/search.test.ts`              | Matching, accents, ranking, one result per page, highlights, excerpts |
| `tests/unit/search-index.test.ts`        | Real content: coverage, anchors that exist, clean text, locales       |
| `tests/unit/docs.test.ts`                | Heading ids: accents, repeats, ids the page already uses              |
| `tests/integration/site-search.test.tsx` | Dialog, shortcut, keyboard, focus, empty state, accessibility         |
| `src/components/layout/*.stories.tsx`    | `Layout/Site search` and the `Wide search` header stories             |
| `tests/e2e/search.spec.ts`               | The real site: anchors in view, locales, phones, the index files      |

## Limits, and when to outgrow it

The approach suits a site of tens to a few hundred pages:

- Matching is by word start only, with no stemming and no typo tolerance.
- The whole index for a locale loads at once.

If a project needs fuzzy matching or stemming, a client-side library such as
MiniSearch can replace the matching in `search.ts`; the index format and the
interface can stay. If the index grows too big to load at once, look at a
build-time tool that splits it into chunks, such as Pagefind, or a hosted
service. Either change stays behind `search()` and `buildSearchIndex()`, so the
dialog doesn't need to change.
