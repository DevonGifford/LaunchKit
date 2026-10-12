---
title: Getting started
description: Create a project from LaunchKit, run it locally, and learn where everything lives.
updated: 2026-10-12
order: 1
---

## Requirements

- Node.js 24 or later
- pnpm 12 — the exact version is pinned in `package.json`

No database, accounts or API keys are needed. A fresh clone installs, builds and passes its tests without any environment variables.

## Create a project

Clone LaunchKit into a new directory and keep it as the `upstream` remote, so you can merge improvements into your project later:

```sh
git clone --origin upstream git@github.com:DevonGifford/LaunchKit.git my-site
cd my-site
git remote add origin git@github.com:your-org/my-site.git
pnpm install
pnpm exec playwright install chromium
pnpm dev
```

The site is now running at `http://localhost:3000`.

## Where things live

| Path                | Contains                                                      |
| ------------------- | ------------------------------------------------------------- |
| `src/content/`      | Page content and long-form documents, one folder per language |
| `messages/`         | Short interface text, one JSON file per language              |
| `src/app/theme.css` | Brand colours, typefaces and corner radius                    |
| `src/components/`   | Primitives, layout and section components                     |
| `src/config/`       | Navigation, feature switches and site settings                |

Your project’s copy and brand live in `src/content/`, `messages/` and `src/app/theme.css`. Keeping them there, away from shared code, is what keeps future merges from LaunchKit straightforward.

## Everyday commands

| Command          | What it does                                                   |
| ---------------- | -------------------------------------------------------------- |
| `pnpm dev`       | Start the development server                                   |
| `pnpm check`     | Type-check, lint, check formatting and translations, run tests |
| `pnpm test:e2e`  | Run end-to-end tests in real browsers                          |
| `pnpm storybook` | Open the component workshop                                    |
| `pnpm build`     | Create a production build                                      |
