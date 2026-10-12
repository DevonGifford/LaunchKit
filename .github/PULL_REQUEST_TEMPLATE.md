## Summary

<!-- What changes, and why. Link the issue if there is one. -->

## Type of change

- [ ] Fix
- [ ] Feature / improvement to the shared foundation
- [ ] Upstream contribution from a downstream project
- [ ] Dependency or tooling update
- [ ] Documentation

## Checklist

- [ ] Targets `staging` (only release promotions target `main`)
- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm format:check` and `pnpm test` pass locally
- [ ] UI changes checked in light and dark appearance and at mobile width
- [ ] New user-facing strings added to every locale in `messages/` (`pnpm i18n:check`)
- [ ] No brand colours or project-specific copy added to shared components
- [ ] `CHANGELOG.md` updated under **Unreleased** for notable changes
- [ ] Breaking changes and downstream migration steps described below

## Downstream impact

<!-- Will downstream projects need to change anything when they merge this?
     Renamed tokens, moved files, changed section props, new required env vars… -->

None.
