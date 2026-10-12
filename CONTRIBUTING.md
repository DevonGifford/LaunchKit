# Contributing to LaunchKit

LaunchKit is a foundation that several different websites build on, so every
change is judged by one question: **does it help more than one project?**
Fixes, accessibility and performance improvements, and generally useful
components are welcome. Project-specific sections, integrations and business
logic belong in the downstream project that needs them.

AI coding agents: read [AGENTS.md](AGENTS.md) as well. Its Git rules are
mandatory.

## Setting up

```sh
pnpm install                            # also installs the Git hooks
pnpm exec playwright install chromium   # once: the browser the tests use
pnpm dev
```

## Making a change

1. Start a branch from `staging`: `feat/…`, `fix/…`, `docs/…`, `chore/…`.
2. Make the change, with tests where behaviour changes:
   - logic → `tests/unit/`
   - component behaviour → `tests/integration/` (runs in a real browser)
   - user journeys → `tests/e2e/`
   - a new shared component → a story next to it (`*.stories.tsx`); stories
     are tested for rendering, interactions and accessibility.
3. Run the checks:
   ```sh
   pnpm check
   pnpm test:e2e
   ```
4. Add a line under **Unreleased** in [CHANGELOG.md](CHANGELOG.md) if the
   change is notable for people using LaunchKit.
5. Open a pull request into `staging` and fill in the template, especially
   **Downstream impact**.

### Commit messages

[Conventional Commits](https://www.conventionalcommits.org), checked by
Commitlint in a Git hook:

```text
feat(forms): add a file upload field
fix(i18n): keep the query string when switching language
docs: explain upstream merges
```

Pull requests into `staging` are squash-merged, so the PR title is what ends
up in history. Write it in the same format.

### Standards

- Strict TypeScript, ESLint and Prettier — the hooks and CI enforce them.
- Colours only through semantic tokens, never literal values in components.
- Every user-facing string translated into all four locales (`pnpm i18n:check`).
- WCAG 2.2 AA: labelled controls, visible focus, keyboard support, 24px+
  targets. Check new UI in both light and dark appearance, and at 320px wide.
- Prefer composition and plain props over configuration frameworks. Add a
  dependency only when it earns its place, and record any version conflict in
  [docs/toolchain.md](docs/toolchain.md).

## Contributing from a downstream project

Found an improvement while building a site on LaunchKit? Re-create it on a
branch from LaunchKit's `staging`, without project-specific copy or branding,
and open a pull request. [docs/upstream-sync.md](docs/upstream-sync.md#contributing-back-upstream)
walks through it.

## Releases

Maintainers cut releases from `main`. See [docs/releasing.md](docs/releasing.md).

## Conduct and security

Everyone taking part follows the [Code of Conduct](CODE_OF_CONDUCT.md). Report
security issues privately as described in [SECURITY.md](SECURITY.md), never in
a public issue.
