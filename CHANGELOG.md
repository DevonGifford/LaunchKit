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
  Examples page and a Pricing page, in English first; the other languages show
  their previous homepage and coming-soon placeholders until translated. The
  previous homepage stays at `/home-v1`, unlinked and out of search results.
- Site navigation: the wide header with Product, Examples, Pricing and Docs and
  a "Get in Contact" call to action (also in the mobile menu), and the full
  footer with placeholder contact details and social links.
- A coming-soon page for links whose page doesn't exist yet.
- Page transitions: a cross-fade between pages with React's `<ViewTransition>`,
  turned off by reduced motion.
- A privacy policy at `/privacy`, written in Markdown under
  `src/content/<locale>/legal/` and loaded like the docs, with the same
  fallback to English.
- Documentation: the getting-started and making-it-yours guides rewritten, and
  four new articles on launching a project, the component library, building
  with AI, and the roadmap. Each document shows an estimated reading time.

### Changed

- The wide header shows its navigation inline from 1024px rather than 768px,
  so the row fits in every language.
- The pricing section's title is optional, so a page's hero can introduce the
  plans.
