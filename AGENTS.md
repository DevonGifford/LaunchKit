# AGENTS.md

Conventions for AI coding agents working in this repository. Humans: see
[CONTRIBUTING.md](CONTRIBUTING.md).

## Git rules — mandatory

Reproduced verbatim from the project specification (§10.5). They apply in
LaunchKit and in every project derived from it.

Automated coding agents must operate under **strict Git and GitHub permissions**. Agents may inspect the repository, modify files, run tests, and prepare changes, but must never publish or commit changes without explicit user authorization.

**The following actions are prohibited by default:**

- **Staging:** Agents must not execute `git add` or otherwise stage changes.
- **Committing:** Agents must not create commits, amend commits, or modify Git history.
- **Pushing:** Agents must not push changes, branches, or tags to any remote repository.
- **Pull Requests:** Agents must not create, merge, close, or otherwise modify pull requests.
- **Destructive operations:** Agents must not force-push, reset, discard changes, or perform destructive Git operations without authorization.

**Authorization requirements:**

- Exceptions require explicit instructions from the user.
- Even when instructed to perform a restricted action, the agent must **confirm with the user again immediately before execution**.
- Authorization applies only to the specific action approved and must not be assumed for subsequent operations.
- General instructions such as "implement this feature", "finish this task", or "prepare a PR" do not constitute permission to commit, push, or open a pull request.

**Expected workflow:**

Agents should complete the requested implementation, run applicable quality checks, review their changes, and provide a summary of modified files, test results, and outstanding issues.

All changes must remain **unstaged and uncommitted** unless the user explicitly authorizes otherwise.

**Core principle:** The agent writes and validates code. The user retains final control over Git history, repository changes, and publication.

## Project overview

LaunchKit is a reusable Next.js foundation (App Router, React 19, TypeScript,
Tailwind v4, shadcn/ui, next-intl) for building and launching ideas. It ships a
content-driven site in four locales (`en`, `es`, `fr`, `de`) with docs, a contact
form, theming and a full test setup. Downstream projects start from it and take
upstream updates ([docs/upstream-sync.md](docs/upstream-sync.md)), so keep the
foundation small, generic and free of project-specific features. It is a website
foundation, not an all-in-one SaaS boilerplate. The Yacht Club palette is a
reference brand, not something shared components may depend on.

Priorities: clarity over cleverness, working code over speculative abstraction,
and accessibility, performance and maintainability from the start.

Stack: Next.js 16 · next-intl · Zod · React Hook Form · Radix UI via shadcn/ui ·
Vitest (node + Browser Mode) · Storybook · Playwright + axe · pnpm.

## Before making changes

1. Read the relevant code, its nearby tests and the matching doc in `docs/`
   before choosing an approach. Don't assume a library or feature exists because
   a roadmap or the spec mentions it; check `package.json` and the code.
2. Check `git status` and `git diff` (read-only, allowed) so you don't overwrite
   the user's unrelated work.
3. For unclear work, state the likely approach and any consequential trade-off
   in a sentence or two before building. Avoid broad refactors unless asked.

## Commands

```sh
pnpm dev                 # dev server
pnpm build && pnpm start # production build and serve
pnpm storybook           # component workshop on :6006
```

## Before you report back

Run the checks relevant to your change and, when practical, the full set below.
Leave every change unstaged. Then report briefly and specifically:

1. What changed and why, with the important file paths.
2. Which checks you ran and whether they passed.
3. Anything still failing, any risks, and decisions the user needs to make.

If a check is unavailable, too costly for the task, or fails for an unrelated
reason, say so. Never claim a check passed unless you ran it and it did.

```sh
pnpm check       # typecheck, lint, format, translations, unit + browser + story tests
pnpm test:e2e    # production build + Playwright (desktop and mobile)
```

First run on a new machine: `pnpm exec playwright install chromium`.
Do not verify Git hooks with real commits. Use
`pnpm exec lefthook run pre-commit --file <path>` and
`echo "feat: example" | pnpm exec commitlint`.

Useful single steps while working: `pnpm typecheck`, `pnpm lint:fix`,
`pnpm format`, `pnpm i18n:check`, and `pnpm test:unit` / `test:integration` /
`test:storybook` for one Vitest project. Use `pnpm`, never npm or yarn.

Git hooks (Lefthook) are check-only and never rewrite files. Pre-commit runs
ESLint (`--max-warnings=0`) and Prettier on staged files, commit-msg runs
commitlint, and pre-push runs the typecheck. `pnpm check` covers all of that and
more, so run it first and the hooks will pass.

## Principles

- Clarity and consistency over cleverness. Make the smallest change that does the
  job and match the surrounding code.
- Don't reformat or refactor code unrelated to the task.
- Keep components and functions short; split when it improves structure.
- Debug from hypotheses: name one to three likely causes, check the most likely
  first, and don't change code until a cause is confirmed.
- If a convention here conflicts with what the code does, say so rather than
  silently picking one.

## Where things live

| Path                                      | Contents                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| `src/app/[locale]/`                       | Routes. Every page calls `resolveLocale(params)` first.                   |
| `src/app/theme.css`                       | Brand tokens (project-owned). `globals.css` maps them to Tailwind.        |
| `src/content/<locale>/`                   | Page content (`pages/*.ts`), Markdown docs (`docs/*.md`) and legal pages. |
| `messages/<locale>.json`                  | Interface text; English is the source catalogue.                          |
| `src/lib/content/`                        | Content model (Zod → types), section registry, renderer, Markdown loader. |
| `src/components/ui/`                      | shadcn/ui primitives plus small shared controls (logo, container, …).     |
| `src/components/{layout,sections,forms}/` | Shared layout, section and form components.                               |
| `src/config/`                             | Site settings, navigation, feature switches.                              |
| `tests/{unit,integration,e2e}/`           | Vitest (node), Vitest Browser Mode, Playwright. Stories are tested too.   |
| `docs/`                                   | Spec, toolchain decisions, theming, releasing, upstream sync.             |

## Architecture

Dependencies point one way: `config`, `i18n` and `lib` (leaf code) ← `components`
← `app` (routes). Keep it that way.

- `src/app/` composes; it holds no reusable logic. Routes fetch content and
  render components.
- `src/components/` never imports from `src/app/`. `ui/` primitives import
  nothing from the other component folders.
- `src/lib/` and `src/config/` stay free of components, with one exception:
  `src/lib/content/registry.ts` maps section types to their components.
- Sections do not import each other. Shared pieces go in
  `src/components/sections/section-parts.tsx`, or a helper beside it such as
  `tech-icons.tsx`.
- Reusable sections sit in `src/components/sections/` with plain names
  (`stats-section.tsx`, type `stats`). Layouts that share one data model are
  one section with a `variant` field, in one file (`capabilities-section.tsx`,
  type `capabilities`). A kind whose variants are separate section types gets a
  folder named after its prefix, such as `hero/` (`hero-centered-section.tsx`,
  type `hero-centered`) and `cta/` (`cta-band-section.tsx`, type `cta-band`).
  Sections written for LaunchKit's own site sit in
  `sections/launchkit-marketing/` with a `marketing-` prefix, and generic
  sections never import from there. Their stories mirror this: `Sections/<Name>`,
  `Sections/<Group>/<Name>` (`Sections/CTA/Band`) and, for
  `launchkit-marketing/`, `Sections/Marketing/<Name>`.
- Page states (not found, error, coming soon) sit in `src/components/layout/`
  and are built from the hero section; route files such as `not-found.tsx`
  and `error.tsx` only render them.
- Colocate: a component's stories sit beside it, and a helper used by one
  component stays in that component's folder until a second user appears.
- Server Components by default. Add `'use client'` only for state, effects,
  event handlers or browser APIs, and push it down to the smallest leaf.

## Conventions

- **TypeScript:** strict. No `any` unless isolated and commented; narrow
  instead of casting. Let the compiler infer return types unless an annotation
  helps the reader. Use `import { type X }` (inline type imports, enforced).
- **Imports and exports:** absolute `@/` imports outside the current directory.
  Named exports, except where Next.js requires a default (`page`, `layout`,
  `not-found`, `sitemap`, `robots`, stories).
- **Files:** `kebab-case` for files and folders, `PascalCase` components,
  `camelCase` functions. Stories sit next to their component
  (`stats-section.stories.tsx`).
- **Pages:** the default export is named `<Thing>Page`, takes
  `PageProps<'/[locale]/...'>`, and calls `resolveLocale(params)` first.
- **Environment variables** are declared and validated in `src/env.ts`. Read
  them from there, never from `process.env` elsewhere.
- **Functions:** take an options object for three or more parameters, optional
  flags or ambiguous arguments. No `try/catch` unless you handle the failure
  there; expected failures return a result object (see `ContactActionResult`).
- **Comments:** JSDoc (`/** … */`) on exported symbols, one short present-tense
  sentence of intent; add `@param`, `@returns` and `@throws` only when they add
  something the signature doesn't. Explain why, not what.
- **Colours come from tokens only** (`bg-surface`, `text-muted-foreground`, …).
  ESLint rejects hex literals; `src/app/theme.css` is the one place for values.
- **No hard-coded copy in shared components.** Interface text goes in
  `messages/` (all four locales); page copy goes in `src/content/`. Components
  take text as props or read it with next-intl. Run `pnpm i18n:check`.
  - Server code uses `getTranslations`, client components `useTranslations`.
  - One namespace per component or area (`Footer`, `LocaleSwitcher`), `camelCase`
    keys named for their role (`skipToContent`, not `text1`).
  - Sentence case, short messages, and ICU for plurals and dates. Use
    `t.rich(...)` for inline markup instead of splitting a sentence.
  - Add the key to `en.json` first, then to `es`, `fr` and `de`.
- **New section type:** add its Zod schema to `src/lib/content/types.ts` and to
  `sectionSchema`, build the component in `src/components/sections/`, and
  register it in `src/lib/content/registry.ts`. TypeScript then fails until the
  registry is complete.
- **Links** inside the app use `Link` from `@/i18n/navigation`, never
  `next/link`. Content hrefs are locale-less (`/docs`).
- **Accessibility:** WCAG 2.2 AA. Labels for every control, visible focus,
  touch targets of at least 24px (LaunchKit uses 40px controls), and live regions for
  async results. axe runs in the story, integration and end-to-end tests.
- **shadcn/ui:** after `pnpm dlx shadcn@4.21.4 add <name>`, follow the
  checklist in [docs/theming.md](docs/theming.md#components-from-the-shadcnui-registry)
  (the `cn` import and package, accent → muted, translatable labels).
- **Dependencies** are pinned to exact versions. Check peer ranges before
  adding one. pnpm refuses versions less than a day old; don't add exclusions. Any
  install script must be reviewed in `allowBuilds`. Record conflicts in
  [docs/toolchain.md](docs/toolchain.md). TypeScript stays on 6.x for now.
- **Scope:** the foundation stays small. Project-specific features belong in
  downstream projects ([docs/upstream-sync.md](docs/upstream-sync.md)). Don't add
  authentication, a database, a global state library, remote feature flags or
  observability services without a demonstrated requirement, and don't build a
  visual page builder or a speculative variant system.
- **Third-party code:** no new scripts, analytics or dependencies without a clear
  need and a privacy and performance check. Don't upgrade unrelated packages as
  part of a focused change.

## Tests

| Kind        | Location and name              | Runner              |
| ----------- | ------------------------------ | ------------------- |
| Unit        | `tests/unit/*.test.ts`         | Vitest (node)       |
| Integration | `tests/integration/*.test.tsx` | Vitest Browser Mode |
| Stories     | `src/**/*.stories.tsx`         | Storybook + Vitest  |
| End-to-end  | `tests/e2e/*.spec.ts`          | Playwright          |

- Test behaviour a user can observe, not implementation details. Avoid mocking
  unless there is no alternative.
- Test titles are short, present tense and say what, not how:
  `renders the menu on mobile`, not `should work when…`.
- Fixtures live in `tests/fixtures/`. A new section type needs a story; new
  interface text needs all four locales.

## Components

- One clear purpose per component. Compose with `children` and slots rather than
  adding props; if a component takes many props, split it.
- Move complex JSX into a named component instead of a render function inside
  another component. Keep short event handlers inline.
- Section components take `SectionOf<'name'>` from the content model; they don't
  fetch or hard-code copy.
- Merge class names with `cn` from `@/lib/utils`. Style with Tailwind utilities
  and tokens; reuse `src/components/ui/` before writing new markup.
- Stay responsive from the narrowest width up, and keep every interactive
  element keyboard-operable.

## Forms and server actions

Forms use React Hook Form with a Zod resolver. The schema lives in
`src/lib/forms/<name>-schema.ts` and is shared by the client form and the server
action, which validates again. Schema messages are translation keys, resolved
in the component. Actions return a result object (`{ ok: true }` or
`{ ok: false, fieldErrors }`) rather than throwing for expected failures.
`src/components/forms/contact-form.tsx` and `src/lib/forms/contact-action.ts`
are the reference.

## Security

- Validate on the server even if the client already did. Server actions treat
  their input as `unknown`.
- Markdown in `src/content/**/docs/` is repo-authored and trusted, so it is
  rendered without sanitising. Never pass user-supplied text through that loader
  or into `dangerouslySetInnerHTML`; sanitise it first.
- Read secrets through `src/env.ts`. Only `NEXT_PUBLIC_*` values reach the
  browser, so never put a secret in one.
- Don't log personal data such as contact messages.

## Common tasks

- **Add a page:** create `src/content/<locale>/pages/<name>.ts` for all four
  locales and register it in `src/content/index.ts` (that defines `PageSlug`).
  Load it with `getPage` in a route under `src/app/[locale]/` that calls
  `resolveLocale(params)` first. For a menu entry, add it to
  `src/config/navigation.ts` and a `Navigation.<key>` message in every locale.
- **Add a doc:** add `<slug>.md` under `src/content/<locale>/docs/`. A locale
  without it falls back to English and shows a notice. Add its slug to a
  section in `src/config/docs-navigation.ts` (a unit test checks), and
  `Docs.sections.<key>` in every locale for a new section.
- **Add a locale:** follow the steps in `src/i18n/routing.ts`, then run
  `pnpm i18n:check` for what's missing.
- **Add a section type:** see Conventions. Give it a story.
- **Change the brand:** edit `src/app/theme.css`; components follow. Storybook's
  own UI copies those colours in `.storybook/theme.ts` and uses recoloured logos
  in `.storybook/brand/`, so update those too
  ([docs/theming.md](docs/theming.md#storybook)).
- **Add a third-party service** (analytics, monitoring, an embed): give it a
  switch in `src/config/features.ts`, an entry in `src/config/integrations.ts`
  with the consent category it waits for (or `null` to run for every visitor:
  the site owner's call, from what the provider documents it collects), and
  its component in `src/components/layout/consent-integrations.tsx`, which
  waits for consent where needed. Say what it collects in the privacy policy,
  in every locale. Code that must wait for consent elsewhere uses `ConsentGate`
  or `useConsent()`.

## Agent skills

Project skills live in `.claude/skills/` and are pinned in `skills-lock.json`
(installed with the `skills` CLI at project scope, never `-g`). Use a relevant
skill when its description matches the task, and treat what it says as advice
that `AGENTS.md` overrides: the Git rules above always win.

- Add one: `pnpm dlx skills add <owner/repo> --skill <name> --agent claude-code`.
- Restore from the lock file on a fresh clone:
  `pnpm dlx skills experimental_install`.
- Update: `pnpm dlx skills update --project`.
- Review a skill's `SKILL.md` before adding it. Skills run with full agent
  permissions.
- Storybook serves its own skills on demand:
  `pnpm exec storybook skills stories` and `write-story`. Don't run
  `storybook skills setup`; Storybook is already configured here.

## Commit messages

You don't commit (see Git rules). If asked to suggest a message, use
Conventional Commits without a scope, `type: summary`, where the summary says
what changed and why. Types: `feat`, `fix`, `docs`, `style`, `refactor`,
`perf`, `test`, `build`, `ci`, `chore`, `revert`. Commitlint enforces this.

The block below is generated by Next.js. Its advice to commit generated changes
does not override the Git rules above: leave it unstaged like everything else.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
