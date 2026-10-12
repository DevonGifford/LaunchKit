---
title: Making it yours
description: Change the brand, rewrite the pages, choose your languages, and keep taking improvements from LaunchKit.
updated: 2026-10-12
order: 2
---

## Brand

Every colour in LaunchKit is a semantic token — `background`, `foreground`, `surface`, `primary`, `muted`, `accent` and a few more — defined for light and dark appearances in `src/app/theme.css`. Components only ever use the token names, so a new palette is a change to that one file.

Keep each text colour at a contrast of at least 4.5:1 against the backgrounds it sits on. The comments in `theme.css` note which tokens are meant for text and which are decorative.

## Pages

Structured pages are ordered lists of sections in `src/content/<language>/pages/`. To change a page, edit its sections: reorder them, remove one, or add another of a type LaunchKit already provides. TypeScript checks every field as you type.

A section your project needs but LaunchKit does not have belongs in your project first. If it later proves useful to other sites, propose it upstream.

## Languages

The supported languages are listed in `src/i18n/routing.ts`. To add one, add it there, create `messages/<language>.json` and `src/content/<language>/`, then run:

```sh
pnpm i18n:check
```

The check lists every missing message and document, so nothing ships half-translated by accident.

## Staying in sync

Improvements to LaunchKit arrive the same way any Git change does — deliberately:

```sh
git fetch upstream
git merge upstream/main
```

Merges are not automatic and can conflict. Conflicts stay small when project-specific work lives in content, messages, the theme file and your own components.
