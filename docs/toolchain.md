# Toolchain decisions

The spec (§3.1) asks for the latest compatible stable versions, and for any
conflict to be **documented rather than silently resolved**. This page records
those conflicts, what was chosen, and when to revisit. Versions were verified
against the npm registry on 2026-10-12.

## Pinned versions

Dependencies are pinned to exact versions in `package.json` (`savePrefix: ''`
in `pnpm-workspace.yaml`); Dependabot proposes upgrades as pull requests.

| Area               | Package                                | Version                                     |
| ------------------ | -------------------------------------- | ------------------------------------------- |
| Framework          | `next`                                 | 16.4.0                                      |
|                    | `react`, `react-dom`                   | 19.3.0                                      |
| Language           | `typescript`                           | 6.0.3 (see below)                           |
| Styling            | `tailwindcss`, `@tailwindcss/postcss`  | 4.3.3                                       |
| Lint / format      | `eslint`                               | 10.12.0                                     |
|                    | `typescript-eslint`                    | 8.71.1                                      |
|                    | `eslint-config-next`                   | 16.4.0                                      |
|                    | `prettier`                             | 3.9.10                                      |
| Hooks / commits    | `lefthook`                             | 2.2.1                                       |
|                    | `@commitlint/cli`                      | 21.2.3                                      |
| Tests              | `vitest`, `@vitest/browser-playwright` | 5.0.3                                       |
|                    | `@playwright/test`                     | 1.64.0                                      |
| Workshop           | `storybook`, `@storybook/nextjs-vite`  | 10.6.1                                      |
|                    | `vite`                                 | 8.3.4 (satisfies Vitest 5 and Storybook 10) |
| i18n               | `next-intl`                            | 4.14.9                                      |
| Forms / validation | `react-hook-form`                      | 7.89.0 (see “Release age” below)            |
|                    | `zod`                                  | 4.6.6                                       |
| Environment        | `@t3-oss/env-nextjs`                   | 0.13.11                                     |
| UI primitives      | `radix-ui`                             | 1.7.0                                       |
|                    | `@base-ui/react`                       | 1.9.0 (Combobox only, see below)            |
|                    | `@shadcn/react`                        | 0.3.1 (Questionnaire only, see below)       |
| UI components      | `react-day-picker`, `date-fns`         | 10.0.2, 4.4.0 (Calendar)                    |
|                    | `input-otp`                            | 1.5.0                                       |
|                    | `sonner`                               | 2.0.8                                       |
|                    | `embla-carousel-react`                 | 8.6.0                                       |
|                    | `vaul`                                 | 1.1.2 (Drawer, see below)                   |
| Runtime            | Node.js                                | ≥ 24 (`.node-version`: 26)                  |
| Package manager    | pnpm                                   | 12.3.4 (`packageManager` field)             |

## TypeScript 6, not 7

`typescript@7` is the current `latest` tag, but `typescript-eslint@8.71.1` —
and its `canary` tag — declares `typescript: >=4.8.4 <6.1.0`. Adopting
TypeScript 7 would mean losing type-aware linting, which the spec requires.

**Decision:** TypeScript 6.0.3, the newest version the lint toolchain supports.

**Revisit when:** `typescript-eslint` widens its `typescript` peer range to
include 7.x. Check with `pnpm view typescript-eslint peerDependencies`.

## ESLint 10 with plugins that declare ESLint ≤ 9

`eslint-config-next@16.4.0` (and its current canary) depends on three plugins
whose `eslint` peer range stops at `^9`:

| Plugin                   | Version | Declared `eslint` peer |
| ------------------------ | ------- | ---------------------- |
| `eslint-plugin-react`    | 7.37.5  | `… \|\| ^9.7`          |
| `eslint-plugin-import`   | 2.32.0  | `… \|\| ^9`            |
| `eslint-plugin-jsx-a11y` | 6.10.2  | `… \|\| ^9`            |

The alternatives were worse:

- **ESLint 9** — out of maintenance. ESLint 10.0.0 shipped on 2026-02-06; the
  last 9.x release was 9.39.5 (2026-07-10). A new foundation should not start
  on an unmaintained major.
- **Replacing `eslint-config-next`** with ESLint-10-native plugins
  (`@eslint-react`, `eslint-plugin-import-x`, `eslint-plugin-jsx-a11y-x`) —
  workable, but swaps Next's official config for a bespoke stack, and the
  jsx-a11y fork is still 0.x.

**Decision:** ESLint 10 with `eslint-config-next`. Before adopting it, the
config was run on ESLint 10 against a probe file and every rule family fired
correctly — React (`react/jsx-key`), Hooks, Next, and all 34 rules of
jsx-a11y's recommended set. The three peer ranges are acknowledged explicitly
in `pnpm-workspace.yaml` under `peerDependencyRules.allowedVersions`, so
`pnpm install` stays warning-free without hiding any _other_ peer conflict.

`eslint.config.mjs` enables jsx-a11y's full recommended set (Next only enables
a handful of its rules). It reads the plugin from the instance
`eslint-config-next` registers, instead of adding `eslint-plugin-jsx-a11y` as a
direct dependency: one plugin instance, one version. (Adding it directly also
hit a pnpm 12 linking bug when combined with `peerDependencyRules`.)

**Revisit when:** each plugin publishes a version declaring ESLint 10 — remove
its `allowedVersions` entry then. If a future ESLint release breaks one of
them at runtime, switch that plugin to its ESLint-10-native alternative above.

## pnpm build-script allowlist

pnpm 10+ does not run dependency install scripts by default, and pnpm 12
**fails** the install when an unapproved package has one. The allowlist lives
in `pnpm-workspace.yaml` under `allowBuilds`. It matters most for `lefthook`:
its install script is what registers the Git hooks, so without the entry the
hooks would silently never install.

## Missing-translation check

`scripts/check-i18n.mts` replaces a dedicated package such as
`@lingual/i18n-check`, which would add a second copy of TypeScript (5.9) to
the dependency tree. The script has no dependencies, runs on Node's built-in
TypeScript support, and checks both `messages/` and `src/content/`.

## Release age: react-hook-form 7.89.0, not 7.90.0

pnpm refuses to install package versions published less than a day ago
(`minimumReleaseAge`, 1440 minutes by default since pnpm 11; a supply-chain
safeguard against compromised releases). `react-hook-form@7.90.0`
was about 14 hours old when LaunchKit was set up, and pnpm only installed it by
adding an exclusion to `pnpm-workspace.yaml`. Rather than start the project by
bypassing its own safeguard, LaunchKit pins 7.89.0 (released 2026-09-26);
Dependabot will propose 7.90.0 in its next run.

## Storybook and Next.js 16.4: patched App Router mock

From Next.js 16.4, `useRouter()` reads `parentRenderTree.data.bfcacheId` from
the layout router context. `@storybook/nextjs-vite@10.6.1` mocks that context
without `parentRenderTree`, so every story — even ones that never navigate —
crashes with `Cannot read properties of undefined (reading 'data')`. The only
newer Storybook release is an 11.0 alpha.

**Decision:** a one-line patch,
`patches/@storybook__nextjs-vite@10.6.1.patch`, applied by pnpm
(`patchedDependencies` in `pnpm-workspace.yaml`). It adds the missing field
with a neutral value. `allowUnusedPatches: true` keeps a Dependabot Storybook
bump installable once the patch no longer matches.

**Revisit when:** Storybook is upgraded. If the story tests (`pnpm
test:storybook`) pass without the patch, delete it and its
`patchedDependencies` entry.

## Other acknowledged peer ranges

`tsconfck@3.1.6`, used by `vite-tsconfig-paths` inside
`@storybook/nextjs-vite`, declares an optional `typescript: ^5` peer. It loads
TypeScript only for its "native" parser, which `vite-tsconfig-paths` does not
use, so TypeScript 6 is never exercised there. It is acknowledged in
`peerDependencyRules` alongside the ESLint plugins.

## Build scripts that stay off

`allowBuilds` in `pnpm-workspace.yaml` sets these to `false` deliberately:

| Package                        | Pulled in by                                    | Why its script isn't needed                                                            |
| ------------------------------ | ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| `esbuild`                      | Storybook's Vite builder                        | The platform binary arrives as an optional dependency; the script only re-verifies it. |
| `@parcel/watcher`, `@swc/core` | next-intl's optional message extractor (unused) | Prebuilt binaries; the scripts are build-from-source fallbacks.                        |

## shadcn/ui: the `cn` package

shadcn's CLI (4.21) now generates components that import `cn` from a new `cn`
npm package (0.x, published by shadcn) instead of `@/lib/utils`. LaunchKit
keeps `src/lib/utils.ts` (`clsx` + `tailwind-merge`, both long-stable). After
`shadcn add`, rewrite the import and remove the `cn` dependency — see
[theming.md](theming.md#components-from-the-shadcnui-registry).

**Revisit when:** the `cn` package reaches 1.0. Switching then is a find and
replace.

## shadcn/ui components that bring their own libraries

Most registry components build on `radix-ui`. Three add something else:

- **Combobox uses Base UI** (`@base-ui/react`). Radix has no combobox, and
  shadcn's Radix-flavoured Combobox is built on Base UI. It is a second
  primitive library, used by `combobox.tsx` only; its `date-fns` peers are
  optional. Base UI also renders a visually hidden "Dismiss" button with an
  English label that a prop can't change.
- **Questionnaire uses `@shadcn/react`** (0.x, published by shadcn). That cuts
  against the reason for avoiding the 0.x `cn` package above, but the
  Questionnaire primitive exists nowhere else. Its English defaults (progress
  text, errors, button labels) are overridden in `questionnaire.tsx`.
- **Drawer uses `vaul`**, whose last release was December 2024; its author no
  longer maintains it actively. It still works with React 19.

**Revisit when:** `@shadcn/react` reaches 1.0, Radix ships a combobox, or
shadcn moves Drawer off `vaul`.

## Route types before type-aware lint

`PageProps` and `LayoutProps` are global types that Next.js generates into
`.next/types`. Both `pnpm typecheck` and `pnpm lint` run `next typegen` first,
so they work on a fresh clone with no `.next` directory. Without it, type-aware
lint rules would see those types as unresolved.

## Testing notes

- **Vitest Browser Mode** runs the integration and Storybook projects in real
  Chromium, installed by Playwright. Run `pnpm exec playwright install
chromium` once after cloning.
- next-intl's own navigation is mocked in browser integration tests (mocking
  `next/navigation` breaks Vite's pre-bundled next-intl). The real behaviour
  is covered end to end by Playwright.
- The unit project inlines `next-intl` for Vite: it imports
  `next/navigation` without a file extension, which Node's ESM loader cannot
  resolve on its own.
