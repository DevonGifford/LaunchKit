---
title: LaunchKit Design System
description: The primitives and sections every LaunchKit site is built from, how a section goes from typed content to the page, and how to add your own.
updated: 2026-10-21
order: 4
summary: How LaunchKit’s two layers fit together: around fifty owned primitives and 28 section types, how a section travels from a Zod schema to the page, how Storybook tests every story, and the steps and house rules for adding your own.
next: making-it-yours, building-with-ai
---

Every page on a LaunchKit site, including this one, is assembled from the
same library. It has two layers. **Primitives** are the small, accessible
building blocks: buttons, inputs, dialogs, menus. **Sections** are the
full-width blocks a page is made of: a hero, a set of features, pricing plans,
a closing call to action. Primitives make sections; sections make pages.

This article explains how both layers work, and why they’re shaped the way
they are.

## Primitives: owned, not installed

The primitives in `src/components/ui/` come from shadcn/ui, which isn’t a
package you install but code you copy into the project and own. That matters
for a foundation: every primitive can be adapted to LaunchKit’s tokens, its
40px controls and its translatable labels, and none of it changes behind your
back on an upgrade.

There are around fifty of them today: the shadcn/ui set, from accordion to
tooltip, plus a few of LaunchKit’s own small controls such as the logo, the
language switcher and the theme toggle. Each one colours itself only with
semantic tokens like `bg-surface` and `text-muted-foreground`, so a new brand
in `theme.css` reaches all of them at once.

Adding another from the shadcn/ui registry takes one command and a short
checklist: swap its hover colours to LaunchKit’s, make its labels
translatable, and check its control heights. The checklist lives in
`docs/theming.md`.

## Sections: content in, page out

Sections are where LaunchKit differs from most starters. A section never
contains its own copy. It takes typed content and draws it, which keeps the
words in `src/content/`, where they can be translated and rewritten without
touching a component.

Each section type travels the same path:

1. **A schema.** A Zod schema in `src/lib/content/types.ts` describes the
   content the section takes. The TypeScript type comes from the schema, so
   the two can’t disagree.
2. **A component.** The section’s component, in
   `src/components/sections/`, takes exactly that type.
3. **The registry.** `src/lib/content/registry.ts` maps each section type to
   its component. The map’s type requires every section type to be listed,
   so a schema without a component is a compile error, not a blank space on
   a page.
4. **The page.** A page in `src/content/` lists sections in order, and the
   renderer draws each one with its component.

Here’s the smallest example, a row of figures:

```ts
// The schema: two to four figures under a heading.
export const statsSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('stats'),
  eyebrow: text.optional(),
  title: text,
  stats: z
    .array(z.object({ value: text, label: text }))
    .min(2)
    .max(4),
});
```

```ts
// The content, on any page.
{
  id: 'numbers',
  type: 'stats',
  title: 'A foundation that keeps up with you.',
  stats: [
    { value: '4', label: 'Languages out of the box' },
    { value: '40+', label: 'Tested components' },
  ],
}
```

Get a field wrong, or give it five figures, and TypeScript says so before
the page ever renders.

## What’s in the library

There are 28 section types, grouped by the job they do on a page:

| Group                | Sections                                                        |
| -------------------- | --------------------------------------------------------------- |
| Open the page        | Basic, centred, split, cinematic and video heroes               |
| Tell the story       | Statement, features, capabilities, bento, lineup, showcase      |
| Make the case        | Stats, logo marquee, reviews, pricing, FAQ, contact form        |
| Invite the next step | Band, panel, editorial, media and split calls to action         |
| LaunchKit’s own site | Six marketing sections, from the homepage hero to quality gates |

The last group is written for LaunchKit’s own website and lives in its own
folder. Generic sections never import from it, so a downstream project can
ignore it entirely.

One rule decides whether a new layout is a **variant** or a **new type**. If
two layouts take the same content, they’re one section with a `variant`
field; the capabilities section, for instance, has cards, numbered and
detailed variants. If they need different content, they’re separate types,
grouped in a folder named after their kind, like `hero/` and `cta/`.

## Storybook, the workbench

Every component has stories beside it: 92 story files today, each showing
the component with realistic content. Storybook (`pnpm storybook`) is where
a section gets designed and reviewed before it’s used on a page.

The stories also run as tests. Every story renders in a real browser and is
checked by axe for accessibility problems. Separate stories pin the dark
theme and the phone, tablet and desktop widths, so contrast and layout are
checked in each, and interaction tests confirm that menus open, carousels
move and forms complain politely. Several stories read their content straight
from a real page, so what you review there is exactly what ships.

## Adding your own section

When a project needs a section LaunchKit doesn’t have, it follows the same
path:

1. Add a schema to `src/lib/content/types.ts`, and add it to
   `sectionSchema`, the list of every section type.
2. Build the component in `src/components/sections/`. It takes
   `SectionOf<'your-type'>` and nothing else.
3. Register it in `src/lib/content/registry.ts`. TypeScript fails until you do.
4. Give it a story, so it’s reviewed and tested like the rest.

A few house rules keep the library healthy as it grows:

- **No copy in components.** Text arrives as content or comes from
  `messages/`, so every word can be translated.
- **Tokens only.** Colours come from the theme, never from the component.
- **Server first.** Sections render on the server; only the smallest
  interactive part, such as a carousel or a menu, runs in the browser.
- **Sections stand alone.** They don’t import each other. Shared pieces go in
  `section-parts.tsx`.

A section that proves useful beyond one project is a good candidate to
contribute back to LaunchKit. That’s how the library grows: one real need at
a time, rather than a gallery built for imagined ones.
