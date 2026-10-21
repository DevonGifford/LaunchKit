# Changelog

Notable changes to LaunchKit. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org) — see
[docs/releasing.md](docs/releasing.md).

Each release lists **Breaking changes** with the steps downstream projects
need to take when merging it.

## [Unreleased]

### Added

- Phase 0 foundation: Next.js 16 App Router, React 19, strict TypeScript 6,
  Tailwind CSS 4, pnpm.
- Design system: semantic tokens in `src/app/theme.css`, light and dark
  appearances following the system preference without a flash, the Midnight
  Yacht Club reference palette, and a token-coloured logo.
- shadcn/ui primitives (button, input, textarea, label, select, checkbox,
  dialog, sheet, dropdown menu), adapted to the tokens and to translatable
  labels.
- Layout: header with responsive navigation and an accessible mobile menu,
  footer, language switcher, theme toggle, skip link.
- Localization with next-intl in English, Spanish, French and German:
  localized routes, metadata, `hreflang` and canonical links, sitemap and
  robots, and `pnpm i18n:check` for missing translations.
- Section-based content: typed page definitions in `src/content/`, a section
  registry and renderer, and Markdown documents with a default-language
  fallback.
- Homepage, documentation and contact pages composed from content.
- Contact form reference: React Hook Form and Zod, validated in the browser
  and in a server action.
- Tooling: ESLint (type-aware, jsx-a11y), Prettier, Lefthook, Commitlint,
  T3 Env.
- Tests: Vitest unit and Browser Mode integration tests, Storybook stories as
  tests with accessibility checks, and Playwright end-to-end tests on desktop
  and mobile.
- GitHub Actions CI, Dependabot, a manual release workflow, and governance
  documents.
- Optional Storybook deployment to Vercel from CI: production from `main` and
  a preview for each pull request, off until switched on.
- Website pages: a new homepage composed from the section library, an
  Examples page and a Pricing page. The previous homepage stays at `/home-v1`,
  unlinked and out of search results.
- Site navigation: the wide header with Product, Examples, Pricing and Docs and
  a "Get in Contact" call to action (also in the mobile menu), and the full
  footer with placeholder contact details and social links.
- A coming-soon page for links whose page doesn't exist yet.
- Page transitions: a cross-fade between pages with React's `<ViewTransition>`,
  turned off by reduced motion.
- A privacy policy at `/privacy`, written in Markdown under
  `src/content/<locale>/legal/` and loaded like the docs, with the same
  fallback to English.
- Terms of use at `/terms`, separating use of the website from the MIT-licensed
  source code, and an LLM notice at `/llm-notice`.
- `/llms.txt`, a curated map of the site for LLMs and coding agents following
  the llms.txt proposal, generated from the content at build time; the LLM
  notice shows the same file in full.
- Documentation: the quickstart and customizing guides rewritten, and four new
  articles on launching a project, the design system, AI integrations and the
  roadmap, with a closing call to action on the docs index. Each document
  shows an estimated reading time, an optional executive summary from its
  frontmatter, and suggestions for what to read next.
- The new pages, documents and legal pages in English, Spanish, French and
  German, with the plans' prices shared by every language.
- Privacy consent: a first-party prompt (bottom right on desktop, a bottom
  panel on smaller screens) with Accept all, Reject all and Manage preferences,
  a preferences dialog with Necessary, Analytics and Marketing, and a Privacy
  settings button in the footer to change the choice later. The choice is kept
  in local storage as `consent`. Services list the category they need in
  `src/config/integrations.ts` and wait for it; `ConsentGate` and `useConsent()`
  do the same for any other code.
- Vercel Web Analytics and Speed Insights, switched in `src/config/features.ts`
  and loaded only in builds on Vercel. Neither identifies visitors, and both
  run for every visitor without waiting for consent; the privacy policy
  describes what they collect.
- Docs navigation beside every guide: sections and guides in a column to the
  left of the article from 1024px, staying in view while it scrolls, and behind
  a "Browse guides" button that opens a sheet below that. Sections and their
  order live in `src/config/docs-navigation.ts`; the article keeps its reading
  width and position.
- A shared long-form foundation: `Article` (title, metadata, executive summary,
  Markdown), framed by `ArticleLayout` for the legal pages and a future blog,
  and by `DocsLayout` for guides. It replaces `DocArticle`.
- Site search: a `wide-search` header variant with a search field in place of
  the call to action from 1024px (an icon beside the menu below that, where the
  call to action stays in the menu), opened with ⌘K on Apple devices and Ctrl+K elsewhere,
  and a command-menu dialog (shadcn/ui Command on `cmdk`) with results grouped
  into pages, documentation and legal pages, matching words highlighted and
  keyboard navigation. Each page or guide appears once, with the section that
  matched best beneath its title, and links straight to that section.
  When nothing matches, it suggests a broader word and offers the contact page.
- A search index per locale at `/<locale>/search-index.json`, built at build
  time from the existing content (pages and their sections, guides and legal
  pages and their headings) and loaded when search is first opened. Matching
  and ranking are LaunchKit's own (`src/lib/search/`), with no search service
  or library: titles outrank headings, headings descriptions, and those the
  text. `src/config/search.ts` sets each page's path, or keeps it out. A page
  can set `meta.navTitle`, its name as a search result ("Home" rather than the
  homepage's headline title); whole pages list by name alone, while guides and
  sections show an excerpt.
- shadcn/ui `Command` and `Kbd` primitives.
- A video hero (`hero-video`): a muted, looping background video filling the
  first screen, with the copy straight on it over a wash (`overlay`) or in a
  panel (`card`). The split call to action takes a `video` in place of its
  photo. Both share `BackgroundVideo`, which has a pause button, shows the
  poster instead with reduced motion, and plays only while on screen. A sample
  office time-lapse lives in `public/marketing/videos/`, and `docs/video.md`
  covers how it was encoded. New `BackgroundVideo` messages in every language.
- Downstream examples (`marketing-downstream-examples`), a marketing section for
  a group of three sites built with LaunchKit, such as company websites: one
  featured beside two others on wide screens, featured above the other two on
  tablets, and a compact list of thumbnails on phones. Each card links to the
  live site once it has one. Placeholder screenshots of six projects live in
  `public/marketing/downstream/`.

### Changed

- The Examples page shows its projects as downstream examples, in two groups,
  instead of the lineup, in every language.
- Guide and legal page headings (h2, h3) have ids from their text, so search
  and links can point to a section: `/docs/getting-started#run-it-locally`.
- **Breaking for translations:** `Docs.updated`, `Docs.readingTime`,
  `Docs.summaryLabel` and `Docs.summaryIntro` moved to a new `Article`
  namespace, and `Docs` gained `navigation`, `browse`, `browseDescription` and
  `sections`.
- **Breaking for code:** `DocArticle` is gone. Pages that used it render
  `<ArticleLayout content={doc}>` instead of `<DocArticle doc={doc}>`;
  `fallbackNotice`, `before`, `after` and `children` keep their meaning. Guide
  routes render `DocsLayout`, which adds the back link and "Where to go next"
  itself. A new guide's slug must also go in `src/config/docs-navigation.ts`.
- The privacy policy and roadmap, in every language, describe the consent
  settings and the two Vercel services.
- The wide header shows its navigation inline from 1024px rather than 768px,
  so the row fits in every language.
- The pricing section's title is optional, so a page's hero can introduce the
  plans.
- The full footer sits in a wider frame and keeps its tablet layout up to
  1280px, so its one-row layout fits in every language. Below 1024px the legal
  links sit under the copyright, one per line on phones.
