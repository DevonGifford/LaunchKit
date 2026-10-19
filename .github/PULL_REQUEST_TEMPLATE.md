# Feat: Short title

<!-- Type: Feat, Fix, Docs, Refactor, Chore or Release. The PR title itself
     uses Conventional Commits (`feat: add …`), since `staging` squash-merges. -->

## Summary

<!-- What this PR does and why, in one or two short paragraphs. Link the issue
     if there is one. -->

<!-- For a release promotion from `staging` to `main`, list the PRs it brings in:

#### Included PRs

- #
-->

<br/>

## Changelog

<!-- Notable changes, one line each. Delete any heading you don't need. -->

### Added

-

### Changed

-

### Fixed

-

### Removed

-

<br/>

## Downstream impact

<!-- Will downstream projects need to change anything when they merge this?
     Renamed tokens, moved files, changed section props, new required env vars… -->

None.

## Checklist

- [ ] Targets `staging` (only release promotions target `main`)
- [ ] `pnpm check` and `pnpm test:e2e` pass locally
- [ ] UI changes checked in light and dark appearance and at mobile width
- [ ] New user-facing strings added to every locale in `messages/`
- [ ] No brand colours or project-specific copy added to shared components
- [ ] `CHANGELOG.md` updated under **Unreleased** for notable changes
- [ ] Breaking changes and downstream migration steps described above
