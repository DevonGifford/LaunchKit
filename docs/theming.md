# Theming

Two independent axes:

- **Brand palette** — the colours, typefaces and radius a project chooses. It
  lives in one project-owned file: `src/app/theme.css`.
- **Appearance** — light or dark. Visitors follow their system setting until
  they pick one; next-themes puts `light` or `dark` on `<html>` before the
  first paint.

Each palette provides values for both appearances. Components never contain a
colour — only token names — so a new palette changes no component. ESLint
rejects hex colour literals in TypeScript to keep it that way.

## Tokens

Defined in `theme.css`, mapped to Tailwind utilities in `globals.css`
(`bg-surface`, `text-muted-foreground`, `border-border`, …).

| Token                              | Use                                        | Contrast rule                                                     |
| ---------------------------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| `background` / `foreground`        | Page and body text                         | ≥ 4.5:1                                                           |
| `surface` / `surface-foreground`   | Cards, menus, dialogs                      | ≥ 4.5:1                                                           |
| `primary` / `primary-foreground`   | Primary buttons                            | ≥ 4.5:1                                                           |
| `muted` / `muted-foreground`       | Quiet backgrounds; secondary text          | `muted-foreground` ≥ 4.5:1 on `background`, `surface` and `muted` |
| `accent` / `accent-foreground`     | Small brand details: hairlines, markers    | Decorative — never body text on `background`                      |
| `emphasis` / `emphasis-foreground` | High-emphasis bands (final call to action) | ≥ 4.5:1                                                           |
| `border`                           | Dividers                                   | Decorative                                                        |
| `input`                            | Form control borders                       | ≥ 3:1 on `background` and `surface`                               |
| `ring`                             | Focus rings                                | ≥ 3:1 on `background`                                             |
| `destructive`                      | Errors                                     | ≥ 4.5:1 on `background` and `surface`                             |
| `overlay`                          | Behind dialogs and sheets                  | —                                                                 |

Typography: `--typeface-serif` (headings), `--typeface-sans` (body and
interface), `--typeface-mono` (code). Corner radius: `--radius`.

## Creating a palette

Copy the two blocks in `theme.css` and change the values. For example, the
_Heritage British Racing_ direction from the spec might start like this:

```css
:root {
  --background: #f0e9db;
  --foreground: #10241e;
  --surface: #f7f2e8;
  --primary: #10241e;
  --primary-foreground: #f0e9db;
  --accent: #c2a879;
  --emphasis: #10241e;
  /* … every token, for both appearances */
}

.dark {
  --background: #10241e;
  --foreground: #f0e9db;
  --surface: #1d3830;
  /* … */
}
```

Then check contrast. The browser and end-to-end tests run axe on every page in
both appearances (`pnpm test`, `pnpm test:e2e`). For a quick look while
choosing colours, toggle the theme in Storybook (`pnpm storybook`) — its
accessibility panel flags contrast problems story by story.

## Typography

The final typefaces are still to be chosen (spec §16), so `theme.css` uses
system font stacks: nothing to download, and nothing to undo. To adopt a web
font:

```tsx
// src/app/[locale]/layout.tsx
import { Cormorant_Garamond } from 'next/font/google';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-brand-serif',
});
// …and add `serif.variable` to the <html> className.
```

```css
/* src/app/theme.css */
--typeface-serif: var(--font-brand-serif), ui-serif, Georgia, serif;
```

## Storybook

Stories and the "Get started" page use the tokens, so they follow `theme.css`
with no extra work. Storybook's own interface (sidebar, toolbar, docs pages)
is themed in JavaScript and cannot read CSS variables, so it keeps a copy:

- `.storybook/theme.ts`: a light and a dark theme with the palette's values.
  Storybook picks one from the system appearance. Re-check contrast on the
  selected sidebar row: Storybook draws it as white text on `colorSecondary`.
- `.storybook/brand/`: the logo recoloured for each sidebar, from the lockup in
  `public/brand/`. For example:

```sh
magick public/brand/launchkit-lockup.png -alpha on -fill '#142d46' -colorize 100 \
  -resize x96 -strip .storybook/brand/launchkit-lockup-navy.png
```

Restart Storybook after changing either; they are read at startup.

## Components from the shadcn/ui registry

Primitives in `src/components/ui/` come from shadcn/ui and are owned here.
`globals.css` maps shadcn's token names (`card`, `popover`, `secondary`) onto
LaunchKit's, so most registry components work as added. When you add one with
`pnpm dlx shadcn@4.21.4 add <name>`, also:

1. Change `import { cn } from "cn"` to `import { cn } from '@/lib/utils'`, and
   remove the `cn` package the CLI adds to `package.json`. (shadcn's new styles
   import its `cn` package, which is still 0.x; LaunchKit keeps the mature
   `clsx` + `tailwind-merge` helper.)
2. Replace `bg-accent` / `text-accent-foreground` hover and focus states with
   `bg-muted` / `text-foreground`. In shadcn, "accent" means a hover highlight;
   in LaunchKit it is the brand's gold, reserved for small details.
3. Replace hard-coded text (such as an `sr-only` "Close") with a prop, so it
   can be translated.
4. Check control heights: LaunchKit uses 40px controls (`h-10`) so touch
   targets stay comfortably above WCAG 2.2's 24px minimum.
5. Replace `bg-black/…` overlays with `bg-overlay`, and the registry's
   `dark:bg-input/30` on text fields with LaunchKit's `dark:bg-input/15`.
6. Give icon-only buttons and landmarks a translated label prop, and check the
   primitive itself for English defaults: Radix names a range slider's thumbs
   "Minimum" and "Maximum" and a navigation menu "Main"; Base UI and
   `@shadcn/react` have fallbacks too. The story's axe check catches most
   missing names.
7. Never run `shadcn add` with `--overwrite`. Answer "no" when it offers to
   replace an existing component, then compare with `shadcn add <name> --diff`.
