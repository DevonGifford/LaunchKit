# Security Policy

## Supported versions

LaunchKit is a foundation, not a hosted service. Security fixes land on
`staging`, are promoted to `main`, and ship in the next tagged release.

| Version                  | Supported                          |
| ------------------------ | ---------------------------------- |
| Latest release on `main` | Yes                                |
| Older `0.x` releases     | No — upgrade to the latest release |

Downstream projects own their own deployments. When a LaunchKit release fixes a
vulnerability, its release notes say so explicitly, and downstream projects
should merge that release promptly (see
[docs/upstream-sync.md](docs/upstream-sync.md)).

## Reporting a vulnerability

**Do not open a public issue for a security problem.**

Use GitHub's private vulnerability reporting: open the repository's
**Security** tab and choose **Report a vulnerability**. (GitHub offers this on
public repositories only. While a repository is private, contact the
maintainer, [@DevonGifford](https://github.com/DevonGifford), privately
instead.) Please include:

- the affected file, route or dependency and the LaunchKit version or commit;
- steps to reproduce, or a proof of concept;
- the impact you expect — for example data exposure or script injection.

You should get an acknowledgement within five working days. Confirmed issues
are fixed privately and disclosed in the release notes once a fixed release is
available; reporters are credited unless they ask not to be.

## Scope

In scope: code in this repository — components, content rendering, form
handling, configuration, headers, the build and CI configuration.

Out of scope: vulnerabilities in a downstream site's own code or hosting,
and issues in third-party dependencies that are already publicly disclosed
(Dependabot tracks those; a pull request upgrading the dependency is welcome).

## Security baseline

The foundation is built to keep downstream projects safe by default:

- **No committed secrets.** `.env*` files are ignored except `.env.example`,
  which documents non-secret configuration only.
- **Validated environment.** Environment variables are typed and validated with
  T3 Env (`src/env.ts`); the build fails on invalid values instead of shipping
  them.
- **No credentials to run.** A fresh clone installs, builds and tests without
  any external service account.
- **Response headers.** `next.config.ts` sets a conservative baseline
  (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
  `Permissions-Policy`).
- **Dependency monitoring.** Dependabot version and security updates, with
  security alerts surfaced on the default branch.
- **Pinned build scripts.** pnpm only runs install scripts for the packages
  allowlisted in `pnpm-workspace.yaml`.
