# Getting started

Requirements: Node.js 24+ and pnpm 12.

```sh
git clone --origin upstream git@github.com:DevonGifford/LaunchKit.git my-site
cd my-site
pnpm install
pnpm exec playwright install chromium   # once: the browser used by the tests
pnpm dev
```

Open <http://localhost:3000>. No `.env` file is needed; see
[`.env.example`](.env.example) for the optional settings.

Starting a new project from LaunchKit? Read
[docs/upstream-sync.md](docs/upstream-sync.md) first. It covers remotes, where
project-specific work belongs, and how to merge LaunchKit releases later.

## Commands

| Command                | What it does                                                        |
| ---------------------- | ------------------------------------------------------------------- |
| `pnpm dev`             | Development server                                                  |
| `pnpm build`           | Production build                                                    |
| `pnpm start`           | Serve the production build                                          |
| `pnpm check`           | Everything CI checks except the build and end-to-end tests          |
| `pnpm typecheck`       | TypeScript                                                          |
| `pnpm lint`            | ESLint (`pnpm lint:fix` to fix)                                     |
| `pnpm format:check`    | Prettier (`pnpm format` to write)                                   |
| `pnpm i18n:check`      | Missing or inconsistent translations                                |
| `pnpm test`            | All Vitest projects: unit, integration (browser), Storybook stories |
| `pnpm test:coverage`   | The same, with a local coverage report in `coverage/`               |
| `pnpm test:e2e`        | Builds, serves and runs Playwright on desktop and mobile            |
| `pnpm storybook`       | Component workshop on <http://localhost:6006>                       |
| `pnpm build-storybook` | Static Storybook in `storybook-static/`                             |

Git hooks (Lefthook) run ESLint and Prettier on staged files, Commitlint on
commit messages and the type checker before pushing.

## Making it yours

| To change…                      | Edit                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| Colours, typefaces, radius      | `src/app/theme.css` — see [docs/theming.md](docs/theming.md) |
| Page content and section order  | `src/content/<locale>/pages/*.ts`                            |
| Long-form documents             | `src/content/<locale>/docs/*.md`                             |
| Interface text                  | `messages/<locale>.json`                                     |
| Navigation and feature switches | `src/config/`                                                |
| Languages                       | `src/i18n/routing.ts`, then `pnpm i18n:check`                |
| Logo and social image           | `public/brand/`                                              |

Pages are composed from sections:

```ts
// src/content/en/pages/home.ts
export const home = {
  meta: { title: 'A reusable Next.js foundation', description: '…' },
  sections: [
    { id: 'hero', type: 'hero', title: 'Built for what’s next.', description: '…' },
    {
      id: 'begin',
      type: 'cta',
      title: 'Begin with a better foundation.',
      primaryAction: { label: 'Read the guide', href: '/docs/getting-started' },
    },
  ],
} satisfies PageDefinition;
```

Reorder, remove or add sections and the page follows — no component changes.
TypeScript checks every field, and an unknown section type is a compile error.

## Project structure

```text
src/
  app/              routes ([locale]/…), theme.css, globals.css, sitemap, robots
  components/       ui/ (primitives) · layout/ · sections/ · forms/ · theme/ · brand/
  content/          page content and Markdown documents, per locale
  config/           site, navigation, feature switches
  i18n/             routing, navigation, request config
  lib/              content model and rendering, forms, SEO helpers
messages/           interface text, per locale
tests/              unit/ · integration/ · e2e/
docs/               specification and guides
```
