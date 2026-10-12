# Building on LaunchKit and staying in sync

LaunchKit is the **upstream**: the shared foundation. Each site built from it
is a **downstream** project with its own repository, brand and content, sharing
LaunchKit's Git history so improvements can flow both ways.

```text
LaunchKit (upstream)
  ├── Agency website
  ├── Homelab store
  ├── UnPocketed website
  ├── selfOS website
  └── Clothing store
```

## Starting a downstream project

GitHub allows only one fork of a repository per account or organisation, so
most downstream projects are independent repositories with LaunchKit added as
a remote. What matters is the shared history, not the fork badge.

```sh
git clone --origin upstream git@github.com:DevonGifford/LaunchKit.git my-site
cd my-site
git remote add origin git@github.com:your-org/my-site.git
git push -u origin main
```

Then, in the new repository:

1. Run `scripts/setup-github.sh` to create `staging` and the branch rules.
2. Enable Dependabot alerts and security updates (the script offers to). The
   `.github/dependabot.yml` file comes with the code, but Dependabot is **not**
   switched on automatically for a new repository.
3. Replace the contact details in `CODE_OF_CONDUCT.md` and `SECURITY.md`, and
   the copyright line in `LICENSE` if appropriate.

## Where project-specific work goes

Merges stay small when downstream changes live where upstream rarely touches:

| Change                           | Put it in                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| Brand colours, typefaces, radius | `src/app/theme.css`                                                                 |
| Page copy and section order      | `src/content/<locale>/`                                                             |
| Interface text                   | `messages/<locale>.json`                                                            |
| Navigation, feature switches     | `src/config/`                                                                       |
| Logos and images                 | `public/` (new files rather than replacing LaunchKit's where possible)              |
| New sections and components      | New files, e.g. `src/components/sections/` + a schema in `src/lib/content/types.ts` |
| Integrations, business logic     | New modules of your own                                                             |

Editing a shared component is sometimes the right call, but it is the change
most likely to conflict later. If the edit would help other projects, propose
it upstream instead.

## Taking upstream improvements

Upstream changes are merged deliberately, never automatically. Merge a tagged
release rather than whatever `main` happens to be:

```sh
git fetch upstream --tags
git switch staging
git switch -c chore/launchkit-v0.2.0
git merge v0.2.0          # a tag from LaunchKit
pnpm install
pnpm check && pnpm test:e2e
```

Read that version's section of LaunchKit's `CHANGELOG.md` first. Breaking
changes come with migration steps.

**Conflicts are normal.** The usual ones:

- `pnpm-lock.yaml` — take either side, then run `pnpm install` to regenerate
  it.
- `src/content/**`, `messages/**`, `theme.css` — keep yours; upstream changes
  here are only examples.
- `CHANGELOG.md`, `README.md` — keep yours.
- Shared components — merge by hand. A conflict here usually means the
  component was edited downstream; consider moving that change into a project
  component or contributing it upstream.

Open a pull request into your `staging` as for any other change.

## Contributing back upstream

A downstream improvement belongs upstream when it would help more than one
project and contains no project-specific copy, branding or business logic.

```sh
git fetch upstream
git switch -c feat/better-hero upstream/staging
git cherry-pick <commit>  # or re-apply the change cleanly
git push <your-launchkit-fork-or-branch> feat/better-hero
```

Then open a pull request against LaunchKit's `staging`. Once it is released,
merge that release downstream as usual. Your project's copy of the change is
then replaced by the upstream one, rather than conflicting with it.
