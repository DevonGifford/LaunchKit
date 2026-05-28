# Branches, releases and dependency updates

## Branches

| Branch                      | Purpose                                            |
| --------------------------- | -------------------------------------------------- |
| `main`                      | Stable, validated code. Releases are tagged here.  |
| `staging`                   | Integration branch. Everything lands here first.   |
| `feat/…`, `fix/…`, `docs/…` | Short-lived work branches, started from `staging`. |

```text
feat/x ──PR (squash)──▶ staging ──PR (merge commit)──▶ main ──▶ tag vX.Y.Z
```

- Work branches merge into `staging` by pull request. Squash merging keeps
  `staging` readable; the PR title becomes the commit message, so write it as a
  Conventional Commit (`feat(forms): add file upload field`).
- `staging` is promoted to `main` by a pull request merged with a **merge
  commit**, never squashed. A squash would give `main` commits that `staging`
  doesn't have, and the two branches would drift apart — which also breaks
  downstream projects that merge from LaunchKit.
- Both branches are protected: pull requests only, CI must pass, no force
  pushes. `scripts/setup-github.sh` creates `staging` and the protection rules.
- Anything that lands on `main` directly from a pull request — a security
  update, say — goes back to `staging` through a `main` → `staging` pull
  request, so the branches don't drift.

## Versioning

LaunchKit follows [Semantic Versioning](https://semver.org). While the version
is `0.x`, a minor bump (`0.1.0` → `0.2.0`) may contain breaking changes; they
are always called out in the changelog. From `1.0.0`:

- **Major** — downstream projects must change something when they merge:
  renamed tokens, changed section props, moved files, new required config.
- **Minor** — new capabilities that need no downstream changes.
- **Patch** — fixes.

A LaunchKit release says nothing about when any downstream site deploys;
each project decides when to merge a release.

## Cutting a release

1. **On `staging`**, open a pull request that:
   - sets `"version"` in `package.json` to the new version;
   - moves the `Unreleased` entries in `CHANGELOG.md` under a new
     `## [X.Y.Z] - YYYY-MM-DD` heading, including a **Breaking changes** list
     with migration steps if there are any.
2. Merge it, then open the promotion pull request from `staging` to `main` and
   merge it with a merge commit once CI passes.
3. In GitHub, open **Actions → Release → Run workflow**, choose `main`, and
   enter the version (without the `v`).

The workflow checks that the version matches `package.json`, that it hasn't
been released before, and that CI passed for that exact commit. It then
creates the `vX.Y.Z` tag and a GitHub Release whose notes are that version's
section of `CHANGELOG.md`.

A version with a suffix (`0.2.0-rc.1`) is published as a pre-release.

## Dependency updates

- **Version updates** — Dependabot opens grouped pull requests against
  `staging` every Monday (`.github/dependabot.yml`). Related packages (Next.js
  and its ESLint config, Storybook, the test tooling…) are grouped so they move
  together. TypeScript major versions are ignored on purpose; see
  [toolchain.md](toolchain.md).
- **Security updates** — enabled in the repository settings, not in
  `dependabot.yml`. They target the default branch (`main`) so urgent fixes are
  visible there immediately; merge `main` back into `staging` afterwards.
  Unlike version updates they have no cooldown, so a fix published in the last
  24 hours fails `pnpm install` (pnpm's `minimumReleaseAge`). Either wait a day
  and re-run CI, or — for a genuine emergency — add that exact version to
  `minimumReleaseAgeExclude` in `pnpm-workspace.yaml` and remove it afterwards.
- **Patched dependencies** — `patches/` holds fixes for bugs in dependencies,
  each tied to one exact version. When Dependabot bumps a patched package the
  patch stops applying (the install still succeeds), and the tests show
  whether the upstream fix landed. Delete the patch if they pass; if not,
  re-create it with `pnpm patch`.

Downstream projects do not inherit Dependabot automatically: the config file
comes with the code, but alerts and security updates must be switched on in
each repository's settings.

## Storybook on Vercel (optional)

CI can publish the Storybook to Vercel: to production from `main`, and as a
preview for each pull request from this repository, linked in a comment. The
`Deploy Storybook` job uploads the build the `Storybook` job already made, so
Vercel builds nothing. It stays off until the `STORYBOOK_DEPLOY` variable is
set, so forks and downstream projects skip it.

To switch it on:

1. Create a Vercel project that is not connected to Git; a connected one would
   also build every push. In an empty folder outside the repository, run
   `pnpm dlx --allow-build=esbuild vercel@64.2.0 login`, then the same with
   `link` instead of `login`, create a new project
   (`launchkit-storybook`, say), and note `orgId` and `projectId` from
   `.vercel/project.json`.
2. Create a token at <https://vercel.com/account/tokens>.
3. Add them to the repository:

   ```sh
   gh secret set VERCEL_TOKEN
   gh variable set VERCEL_ORG_ID --body <orgId>
   gh variable set VERCEL_PROJECT_ID --body <projectId>
   gh variable set STORYBOOK_DEPLOY --body true
   ```

4. Run **Actions → CI → Run workflow** on `main` for the first deployment.

Good to know:

- The public address is the project's production domain,
  `<project>.vercel.app`. Under Vercel's default Standard Protection,
  previews and each deployment's own URL need a Vercel login; turn off
  Vercel Authentication in the project's **Settings → Deployment Protection**
  to share previews.
- Pull requests from forks and from Dependabot get no secrets, so they get no
  preview.
- The job deploys from outside the checkout, so Vercel sees no commit. On the
  Hobby plan Vercel can block deployments of a private repository's commits
  made by anyone but the account owner.
- A failed deployment doesn't fail CI: the job isn't a required check, and
  `continue-on-error` keeps the release workflow's "CI passed" check
  independent of Vercel. Look at the job if the site stops updating.
- The Vercel CLI version is pinned in `ci.yml` and Dependabot doesn't update
  it.
- Vercel's Hobby plan is for non-commercial use.
