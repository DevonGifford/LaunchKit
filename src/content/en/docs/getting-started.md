---
title: Getting started
description: What LaunchKit is, what you need, and how to go from a fresh clone to a running site in a few minutes.
updated: 2026-10-17
order: 1
summary: What LaunchKit is and deliberately leaves out, the two tools you need, the commands to get a site running locally, a map of where everything lives, and how a page is assembled from typed sections.
next: launching-a-project, making-it-yours, component-library
---

LaunchKit is a reusable foundation for building and launching better websites,
faster. It gives every new project what a modern site needs from the first
day: a responsive design system with light and dark themes, four languages,
section-based content, validated forms, automated tests and CI. Each project
then spends its time on what makes it different.

The idea fits in one line: **build once, reuse often, improve centrally.**
LaunchKit is opinionated about its foundations and flexible about everything
built on top. Shared components and tooling live upstream in LaunchKit; brand,
copy, custom sections and business logic belong to each project.

## What you get

- **A modern application foundation:** Next.js with the App Router, React,
  strict TypeScript and Tailwind CSS.
- **A themeable design system:** semantic colour tokens, accessible
  components from shadcn/ui, and light and dark appearances that follow the
  visitor’s system.
- **Four languages:** English, Spanish, French and German, with localised
  routes, metadata and a check for missing translations.
- **Section-based content:** pages are typed lists of sections in
  `src/content/`, kept apart from the React components that draw them.
- **Validated forms:** React Hook Form and Zod, checked in the browser and
  again on the server.
- **Tests and checks:** unit, browser and end-to-end tests, Storybook stories
  that double as tests, and accessibility checks with axe.

What it deliberately leaves out matters just as much. There is no database,
authentication, checkout or paid monitoring service. Projects add those when
they have a real need for them.

## What you need

- Node.js 24 or later
- pnpm 12, the exact version pinned in `package.json`

That’s all. A fresh clone installs, builds and passes its tests without any
accounts, API keys or environment variables. The optional settings are
described in `.env.example`.

## Run it locally

Clone LaunchKit into a new folder, keeping it as the `upstream` remote so you
can merge improvements later:

```sh
git clone --origin upstream git@github.com:DevonGifford/LaunchKit.git my-site
cd my-site
pnpm install
pnpm exec playwright install chromium   # once: the browser the tests use
pnpm dev
```

The site is now running at `http://localhost:3000`.

> Starting a real project rather than exploring? Read
> [Launching a new project with LaunchKit](launching-a-project) next. It
> covers remotes, repository setup and deployment, step by step.

## Everyday commands

| Command          | What it does                                                      |
| ---------------- | ----------------------------------------------------------------- |
| `pnpm dev`       | Start the development server                                      |
| `pnpm check`     | Type-check, lint, check formatting and translations, run tests    |
| `pnpm test:e2e`  | Build the site and run the end-to-end tests on desktop and mobile |
| `pnpm storybook` | Open the component workshop at `http://localhost:6006`            |
| `pnpm build`     | Create a production build                                         |

Git hooks run ESLint and Prettier on the files you commit, check the commit
message, and run the type checker before you push. `pnpm check` covers all of
that and more, so run it first and the hooks will pass.

## Where things live

| Path                | Contains                                                      |
| ------------------- | ------------------------------------------------------------- |
| `src/content/`      | Page content and long-form documents, one folder per language |
| `messages/`         | Short interface text, one JSON file per language              |
| `src/app/theme.css` | Brand colours, typefaces and corner radius                    |
| `src/components/`   | Primitives, layout and section components                     |
| `src/config/`       | Site details, navigation and feature switches                 |
| `docs/`             | The specification and the guides for maintainers              |

Your project’s copy and brand live in `src/content/`, `messages/` and
`src/app/theme.css`. Keeping them there, away from shared code, is what keeps
future merges from LaunchKit small.

## How a page is put together

A page is an ordered list of sections, each a typed object:

```ts
// src/content/en/pages/contact.ts
export const contact = {
  meta: { title: 'Contact', description: '…' },
  sections: [
    { id: 'intro', type: 'hero', title: 'Let’s talk about your next launch.', description: '…' },
    { id: 'message', type: 'contact', title: 'Send a message' },
  ],
} satisfies PageDefinition;
```

Reorder, remove or add sections and the page follows, with no component
changes. TypeScript checks every field as you type, and an unknown section
type stops the build.
