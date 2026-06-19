---
title: Making it yours
description: Change the brand, rewrite the pages, set your languages and site details, and keep taking improvements from LaunchKit.
updated: 2026-10-17
order: 2
summary: A quick reference for what to edit, then how to swap in your own colours, typefaces and logo, rewrite the pages, set your languages, site details and menus, and keep merging LaunchKit’s improvements.
next: launching-a-project, component-library
---

A site built on LaunchKit shouldn’t look like LaunchKit. The foundation keeps
everything that defines your project in a handful of files, so you can
replace the brand and the words without touching shared code, and still
merge LaunchKit’s improvements later.

| To change…                      | Edit                                          |
| ------------------------------- | --------------------------------------------- |
| Colours, typefaces, radius      | `src/app/theme.css`                           |
| Page content and section order  | `src/content/<language>/pages/*.ts`           |
| Long-form documents             | `src/content/<language>/docs/*.md`            |
| Interface text                  | `messages/<language>.json`                    |
| Name, contact details, socials  | `src/config/site.ts`                          |
| Navigation and feature switches | `src/config/navigation.ts`, `features.ts`     |
| Languages                       | `src/i18n/routing.ts`, then `pnpm i18n:check` |
| Logo and social image           | `public/brand/`                               |

## The brand

Every colour in LaunchKit is a semantic token, such as `background`,
`foreground`, `surface`, `primary`, `muted`, `accent` and `emphasis`, defined
for both the light and dark appearance in `src/app/theme.css`. Components
only ever use the token names, so a new palette is a change to that one file.
ESLint rejects hex colours in TypeScript, to keep it that way.

To create a palette, copy the two blocks in `theme.css` and change the values:

```css
:root {
  --background: #f0e9db;
  --foreground: #10241e;
  --primary: #10241e;
  --accent: #c2a879;
  /* …every token */
}

.dark {
  --background: #10241e;
  --foreground: #f0e9db;
  /* …every token, again */
}
```

Then check contrast. Text tokens need at least 4.5:1 against the backgrounds
they sit on; the comments in `theme.css` say which tokens carry text and which
are decorative. The tests run axe on every page in both appearances, and
Storybook’s accessibility panel flags problems story by story while you’re
still choosing colours.

> Storybook’s own sidebar and toolbar can’t read CSS variables, so they keep
> a copy of the palette in `.storybook/theme.ts`, with a recoloured logo in
> `.storybook/brand/`. Update those too, then restart Storybook.

## Typefaces

LaunchKit uses system font stacks until a project picks its own: nothing to
download, and nothing to undo. To use a web font, load it with `next/font` in
`src/app/[locale]/layout.tsx` and put its variable first in the matching
stack in `theme.css`:

```css
--typeface-serif: var(--font-brand-serif), ui-serif, Georgia, serif;
```

## The pages

Structured pages are ordered lists of sections in
`src/content/<language>/pages/`. To change a page, edit its sections: reorder
them, remove one, or add another of a type LaunchKit already provides.
TypeScript checks every field as you type.

Browse the sections in Storybook (`pnpm storybook`) to see what each one
looks like, in both themes and at every screen size. When a page needs a
section LaunchKit doesn’t have, build it in your project first.
[How the component library works](component-library) explains how. If it
later proves useful to other sites, propose it upstream.

## The words around the pages

Short interface text, such as button labels, menu names and form errors,
lives in `messages/<language>.json`, with English as the source. Long-form
writing, like these guides, is Markdown in `src/content/<language>/docs/`. A
guide missing from a language falls back to English, with a note saying so.

## Site details and navigation

`src/config/site.ts` holds the site’s name, contact details and social
profiles. The full footer shows whichever details are set, so leave out
anything you don’t want to publish. The header and footer menus are in
`src/config/navigation.ts`; each label is a message, so it translates with
everything else. `src/config/features.ts` switches the theme and language
controls on or off.

## Languages

The supported languages are listed in `src/i18n/routing.ts`. To add one, add
it there, create `messages/<language>.json` and `src/content/<language>/`,
then run:

```sh
pnpm i18n:check
```

The check lists every missing message and document, so nothing ships
half-translated by accident. A page that exists in English but not in
another language is a type error, for the same reason.

## Staying in sync

Improvements to LaunchKit arrive the way any Git change does: deliberately.

```sh
git fetch upstream --tags
git merge v0.2.0   # a LaunchKit release
```

Merges aren’t automatic, and they can conflict. Conflicts stay small when
your project’s work lives in content, messages, the theme file and your own
components, which is what everything above is designed for.
