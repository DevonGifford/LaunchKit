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

## Before you report back

Run the checks, then summarise the files you changed, the results and anything
left open. Leave every change unstaged.

```sh
pnpm check       # typecheck, lint, format, translations, unit + browser + story tests
pnpm test:e2e    # production build + Playwright (desktop and mobile)
```

First run on a new machine: `pnpm exec playwright install chromium`.
Do not verify Git hooks with real commits. Use
`pnpm exec lefthook run pre-commit --file <path>` and
`echo "feat: example" | pnpm exec commitlint`.

## Where things live

| Path                                      | Contents                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| `src/app/[locale]/`                       | Routes. Every page calls `resolveLocale(params)` first.                   |
| `src/app/theme.css`                       | Brand tokens (project-owned). `globals.css` maps them to Tailwind.        |
| `src/content/<locale>/`                   | Page content (`pages/*.ts`) and Markdown documents (`docs/*.md`).         |
| `messages/<locale>.json`                  | Interface text; English is the source catalogue.                          |
| `src/lib/content/`                        | Content model (Zod → types), section registry, renderer, Markdown loader. |
| `src/components/ui/`                      | shadcn/ui primitives, owned here.                                         |
| `src/components/{layout,sections,forms}/` | Shared layout, section and form components.                               |
| `src/config/`                             | Site settings, navigation, feature switches.                              |
| `tests/{unit,integration,e2e}/`           | Vitest (node), Vitest Browser Mode, Playwright. Stories are tested too.   |
| `docs/`                                   | Spec, toolchain decisions, theming, releasing, upstream sync.             |

## Conventions

- **Colours come from tokens only** (`bg-surface`, `text-muted-foreground`, …).
  ESLint rejects hex literals; `src/app/theme.css` is the one place for values.
- **No hard-coded copy in shared components.** Interface text goes in
  `messages/` (all four locales); page copy goes in `src/content/`. Components
  take text as props or read it with next-intl. Run `pnpm i18n:check`.
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
  downstream projects ([docs/upstream-sync.md](docs/upstream-sync.md)).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
