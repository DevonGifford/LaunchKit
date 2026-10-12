# LaunchKit — Project Specification

> **A reusable Next.js foundation for building and launching ideas.**
>
> **Working draft · October 2026 · Product and technical specification**
>
> **Project principle:** Build once, reuse often, improve centrally.

## 1. Project overview

LaunchKit is a reusable Next.js application foundation designed to accelerate the development, validation, and launch of websites, digital products, and startup ideas.

The project provides a maintained foundation of UI components, page layouts, marketing sections, theming, localization, content management, configuration, and development tooling. A new project should be able to start from LaunchKit, replace its branding and content, add the functionality it actually needs, and arrive at a professional website without rebuilding the basics.

LaunchKit is **primarily a website and landing-page foundation**, not an attempt to provide every possible backend or SaaS capability on day one. It should nevertheless be well engineered enough that a downstream project can grow into a production application.

Individual applications will derive from LaunchKit through Git-based forks or independent repositories sharing upstream history. Improvements should be maintainable centrally and incorporated into downstream projects when appropriate, while project-specific content and behaviour remain independent.

The goal is **not** six identical websites. It is six different websites that don't require six separate engineering foundations.

### Primary objectives

| Objective | Description |
| --- | --- |
| Rapid prototyping | Move from idea to a presentable, deployable website quickly. |
| Reusable UI | Avoid rebuilding common UI primitives, page layouts, and marketing sections. |
| Consistent tooling | Standardize local development, testing, code quality, and CI. |
| Upstream maintenance | Share improvements and dependency updates across related projects. |
| Design flexibility | Support distinctive brands without rewriting the foundation. |
| Production readiness | Begin with sound accessibility, SEO, performance, and security practices. |

### Intended uses

| Project | Type | Likely requirements |
| --- | --- | --- |
| Agency website | Corporate / portfolio | Services, case studies, contact. |
| Refurbished homelab business | Product showcase | Products, specifications, inquiries; commerce may come later. |
| UnPocketed | App landing page | Features, screenshots, download links. |
| selfOS | Product / SaaS landing page | Product explanation, documentation, waitlist. |
| Clothing brand | Retail showcase | Product imagery, collections, brand storytelling; checkout is separate. |
| Website redesign demonstrations | Sales / portfolio demo | Before-and-after comparisons, homepage refactors. |

Commerce, authentication, payment processing, and substantial project-specific business logic do **not** belong in the initial common foundation.

## 2. Design direction — Midnight Yacht Club

LaunchKit's own showcase website should have a **modern, minimalist, old-money aesthetic**. The agreed direction is *Midnight Yacht Club*: quiet luxury meets modern developer tooling.

Think premium yacht club, architectural studio, heritage tailoring, understated watch branding. Avoid the usual SaaS aesthetic of neon gradients, glowing cards, and decorative animations. The interface should feel expensive because of proportion, typography, precision, and restraint, not because it has lots of ornament.

**Design principle:** Luxury in presentation. Precision in engineering. Simplicity in experience.

The supplied LaunchKit rocket emblem and navy serif wordmark are the brand reference. The logo should be treated as a visual asset/identity reference, not as justification for hardcoding a navy palette into reusable components.

![LaunchKit brand reference](brand/launchkit-brand-reference.png)

### 2.1 Primary light palette

The LaunchKit light experience should feel like a yacht club in daylight: white or warm-ivory space, navy type, subdued accents.

| Token / role (initial reference) | Hex |
| --- | --- |
| Midnight Navy | `#142D46` |
| Deep Ocean | `#203D54` |
| Warm Ivory | `#F8F7F3` |
| Champagne | `#C5B391` |
| Slate | `#637182` |

Use large areas of warm ivory/white and navy text. Champagne should be reserved for restrained accents.

### 2.2 Primary dark palette — Midnight Yacht Club

The dark experience should feel like the same yacht club after sunset, not like a generic black developer dashboard.

| Token / role (initial reference) | Hex |
| --- | --- |
| Deep Midnight | `#0D1B2A` |
| Navy Surface | `#172B40` |
| Warm Ivory Text | `#E8E2D5` |
| Antique Gold | `#BDA77B` |
| Muted Blue-Grey | `#8996A3` |

Prefer deep navy backgrounds, warm ivory text, subtle borders, sparse antique-gold details, and considered whitespace. Gold is an accent, **not** a default for every button or headline.

### 2.3 Other explored palette directions

These are **reference directions for future downstream brands**, not a requirement to ship three more themes in Phase 0.

| Direction | Reference colours | Character |
| --- | --- | --- |
| Heritage British Racing | `#10241E`, `#1D3830`, `#F0E9DB`, `#C2A879`, `#7E948A` | Deep green, heritage, brass. |
| Black Tie Minimalism | `#131516`, `#242829`, `#F2EFE8`, `#AC9B85`, `#929898` | Charcoal, ivory, almost no ornament. |

The underlying design system must make other palettes possible without rewriting generic components.

### 2.4 Typography and composition

- **Editorial/headline direction:** Explore Cormorant Garamond or Bodoni Moda, or similarly refined serif typography.
- **Body/UI direction:** Inter or Geist, or an equally legible modern sans-serif.
- Maintain strong hierarchy, comfortable line lengths, thoughtful responsive type scaling, and generous negative space.
- Keep navigation, documentation, code samples, and interactive controls extremely functional. The luxury treatment is a presentation layer, not a usability compromise.

### 2.5 Showcase homepage concept

The initial LaunchKit homepage should be short, intentional, polished, and built using its own foundation:

1. **Hero** — Editorial headline, concise explanation, clear primary/secondary actions, polished product preview.
2. **The Philosophy** — Why a better foundation means less repeated work.
3. **What's Included** — Design system, application foundation, and developer experience.
4. **Built to Adapt** — Illustrate different project types that can derive from the same foundation.
5. **Developer Experience** — Repository, stack, example terminal workflow or code.
6. **Final CTA** — A restrained invitation to use or explore LaunchKit, potentially on a midnight-navy background.

This is the homepage **direction**, not a demand to invent complex sections or animations before the foundation exists.

## 3. Fundamental architecture

LaunchKit has three layers:

1. **Design system** — Tokens, typography, spacing, themes, responsive layout rules, accessibility, and shared UI primitives.
2. **Marketing and layout components** — Header, footer, hero, features, CTA, and a modest set of reusable website sections.
3. **Application foundation** — Next.js routing, configuration, localization, content rendering, forms, metadata, SEO, testing, CI, deployment readiness, and eventually optional services.

The default architecture must remain straightforward. It should be easy to understand and change without an elaborate abstraction framework.

**Boundary:** LaunchKit owns the foundations and shared conventions. Each downstream project owns its copy, branding, custom components, integrations, and business logic.

### 3.1 Phase 0 technology stack

| Area                       | Decision                                                          |
| -------------------------- | ----------------------------------------------------------------- |
| Framework                  | Next.js App Router and React 19 (compatible stable versions).      |
| Language                   | Strict TypeScript; target TypeScript 6 with compatible tooling.    |
| Package management         | pnpm and committed `pnpm-lock.yaml`.                              |
| Styling                    | Tailwind CSS 4.                                                  |
| UI primitives              | shadcn/ui, with components owned in the repository.               |
| Forms                      | React Hook Form.                                                  |
| Validation                 | Zod.                                                              |
| Localization               | next-intl is the preferred starting point.                        |
| Unit and integration tests | Vitest; prefer Browser Mode for UI tests where practical.         |
| E2E tests                  | Playwright.                                                       |
| Component workshop         | Storybook (Next.js/Vite integration), with accessibility support. |
| Linting                    | ESLint.                                                           |
| Formatting                 | Prettier.                                                         |
| Git hooks                  | Lefthook.                                                         |
| CI                         | GitHub Actions.                                                   |
| Dependency maintenance     | Dependabot.                                                       |
| Environment validation     | T3 Env for typed, validated environment configuration.            |
| Commit conventions         | Conventional Commits checked with Commitlint.                     |
| Translation checks         | i18n-check or equivalent missing-translation detection.          |

Use compatible stable package versions during implementation. Target React 19, TypeScript 6, and Tailwind CSS 4, with the latest compatible stable Next.js version. Verify compatibility (particularly TypeScript with ESLint) before installation; document any conflicts rather than silently switching the agreed tooling. Do not copy tooling solely because the reference boilerplate uses it.

## 4. Theming and design system

LaunchKit **must** support both light and dark themes. It must use configurable design-token palettes, with the Midnight Yacht Club brand as its initial demonstration.

- Use **semantic design tokens** such as `background`, `foreground`, `surface`, `primary`, `muted`, `accent`, and `border`, rather than putting literal brand hex codes in generic UI components.
- Treat light/dark *appearance* separately from a project's brand/palette. A new project should be able to provide its own coordinated light and dark palettes.
- Centralize colour and foundational style decisions (typography, spacing, radii, etc.).
- Allow visitors to switch between light and dark; support system preference and prevent avoidable theme flashes. Exact initial default (system or dark for the branded demo) can be settled during implementation.
- Generic shadcn-derived components must consume the shared tokens and remain usable in both appearances.
- Theme configuration belongs in project-owned configuration/token files so downstream customizations do not require broad changes to shared components.

The initial deliverable is **one complete LaunchKit brand with matching light/dark appearances**, plus an architecture that makes future brand palettes practical. There is no Phase 0 requirement for a public palette picker or five prebuilt skins.

## 5. Localization and responsive design

### 5.1 Localization

LaunchKit must accommodate roughly **three to five locales** without a CMS or a large translation platform.

- Locale-aware routes, for example `/en`, `/es`, and `/de`.
- Localized page content, navigation, common UI strings, and SEO metadata.
- Configurable supported locales, default locale, and fallback behaviour.
- Accessible locale selection and appropriate date/number formatting.
- Localized canonical/hreflang conventions where applicable.
- Automated checks for missing translation keys and locale consistency, where practical.
- Avoid hardcoding text in reusable UI components where localization is needed.

The intent is to **support** three to five locales, not to require a hardcoded limit or translations for five languages on day one. English, Spanish, and German are illustrative initial locales.

### 5.2 Responsiveness

LaunchKit must use a **mobile-first responsive approach**, with intentional mobile, tablet, and desktop layouts.

- Responsive typography, spacing, navigation, and media.
- No unintended horizontal overflow at supported viewport sizes.
- Accessible menu behaviour and touch targets.
- Responsive sections and form layouts.
- Meaningful mobile and desktop E2E checks, not only resizing a screenshot.

## 6. File-based, section-driven content

LaunchKit must keep content separate from presentation without introducing a CMS.

### 6.1 Content formats

| Format | Purpose | Phase 0 stance |
| --- | --- | --- |
| TypeScript `.ts` | Structured pages, ordered sections, marketing copy and navigation data | **Primary** |
| Markdown `.md` | Long-form writing such as articles or documentation | **Supported** |
| JSON `.json` | Short translated UI messages | **Supported** |
| MDX `.mdx` | Interactive/rich documentation with React components | **Optional, not a prerequisite** |

**Do not use JSON as the primary format for pages.** Typed TypeScript objects are preferable for section composition, editor support, refactoring, and integration with schemas.

### 6.2 Section-based composition

Each page should describe an **ordered array of sections**. A small renderer maps each known section type to its React component. For example:

```ts
// src/content/en/pages/home.ts
import type { PageDefinition } from '@/lib/content/types';

export const home = {
  sections: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Built for what\'s next.',
      description: 'A refined foundation for ambitious ideas.',
      primaryAction: { label: 'Get Started', href: '/docs' },
    },
    {
      id: 'features',
      type: 'features',
      title: 'Everything you need.',
      items: [
        { title: 'Reusable components', description: 'Build once. Use everywhere.' },
      ],
    },
  ],
} satisfies PageDefinition;
```

The section types must be type-safe; Zod can provide runtime/build-time validation where it genuinely adds value. Don't redundantly parse every static object on every request without a reason.

A page should be able to reorder or omit available sections through its content definition. **Do not build a visual page builder or a system of multiple variants per section.** One good reference implementation for each essential section is enough initially. Specialized layouts and alternate designs belong in downstream apps until there is a proven case for upstream reuse.

### 6.3 Clear separation

- `content/` — actual page content, section ordering, articles, and project copy, organized by locale.
- `messages/` — small translated UI labels and messages, typically JSON.
- `components/` — visual components, including the section implementations.
- `lib/content/` or equivalent — schemas/types, content loading, and section rendering.

This separation is also important for upstream merging: project-specific page copy and brand assets should not be interwoven with shared framework code.

## 7. Reusable components and forms

LaunchKit should have a useful **small baseline**, not an enormous gallery built for imagined requirements.

- Use shadcn/ui as the starting point for buttons, inputs, cards, selects, checkboxes, dialogs, and related primitives **as needed**.
- Provide responsive, accessible layout building blocks: container, header, footer, and navigation.
- Provide a handful of reusable marketing sections, including hero, features, and CTA; expand to FAQ/testimonials/pricing only where they serve the first real site.
- Use React Hook Form with Zod validation for the form pattern demonstrated by LaunchKit.
- Prefer composition and straightforward component props over generic configuration engines.
- Custom sections and business-specific components are created in each downstream project, with useful improvements proposed upstream later.

### Storybook

Storybook is included in **Phase 0**, but kept lightweight:

- Begin with roughly 5–10 meaningful stories, not every shadcn component.
- Include representative primitives, a form example, and one or two layout/section components.
- Preview both light and dark themes and representative responsive widths.
- Add the accessibility addon and make stories useful as interactive documentation.
- Prefer colocated `*.stories.tsx` files.
- Storybook is a development/documentation environment, **not** the source of truth for design tokens and components.
- No hosted Storybook, Chromatic subscription, or paid visual regression service required initially.

## 8. Developer experience and testing

### 8.1 Local tooling

- pnpm is the required package manager.
- ESLint, Prettier, and strict TypeScript must be wired to familiar package scripts.
- Lefthook should run appropriate lightweight local checks.
- React Hook Form and Zod demonstrate a validated form pattern.
- Use Conventional Commits and Commitlint, keeping the release/changelog workflow straightforward; Commitizen and a separate lint-staged dependency are not required.
- Use T3 Env for typed, validated environment variables, without requiring external service credentials for local development.
- Configure the `@/` import alias for application source code.
- Keep AI coding-agent guidance in `AGENTS.md`, including the mandatory restrictions in §10.5.
- No external credentials should be needed to start development.

### 8.2 Testing pyramid

| Level | Tooling | Initial example |
| --- | --- | --- |
| Unit | Vitest | Helpers, locale/config logic, or Zod schemas. |
| Integration | Vitest Browser Mode where practical; Testing Library if needed | Theme switcher, navigation, or form validation. |
| E2E | Playwright | Homepage loads, locale changes, mobile navigation works. |

There must be **a few meaningful test suites at all three levels**. Add representative coverage for light/dark behaviour, localization, and responsive layouts. Local Vitest code-coverage reporting is fine in Phase 0; a hosted Codecov service is expressly excluded.

Tests should provide confidence, not exist merely to inflate a percentage.

### 8.3 Accessibility, SEO, and performance

These are quality requirements from the beginning, not optional integrations:

- **Accessibility:** Aim for WCAG 2.2 AA; semantic HTML, keyboard operation, visible focus, accessible navigation and forms, contrast checks, and automated axe-style checks where practical.
- **SEO:** Next.js metadata, appropriate titles/descriptions, canonical URLs, sitemap/robots, Open Graph information, locale alternatives, and appropriate structured data where relevant.
- **Performance:** Mobile-first, optimized assets/fonts, minimal unnecessary client-side JavaScript, sensible Server/Client Component boundaries, and good Core Web Vitals.
- **Security baseline:** No committed secrets, typed/validated environment variables where appropriate, secure defaults, and dependency/security checks.

Do not promise universally perfect Lighthouse scores or perfect accessibility. These are measurable targets to validate and preserve as downstream projects add content and dependencies.

## 9. Configuration and feature flags

LaunchKit should offer **small, centralized, type-safe configuration** for capabilities a downstream site might enable or disable.

This is not a remote flag-management system.

Example conceptual configuration:

```ts
export const features = {
  themeSwitcher: true,
  localization: true,
  analytics: false,
  errorMonitoring: false,
} as const;
```

Differentiate:

- **Project/build-time configuration:** Brand, locales, navigation, available integrations, design palettes.
- **Environment configuration:** Credentials, endpoints, deployment-specific settings.
- **Runtime behaviour:** E.g. a visitor's selected colour appearance.

Do not install or stub entire future services merely to make their flags appear in Phase 0. A flag should control a real capability when that capability exists; a commented example is sufficient for later integrations.

**Principle:** Optional services must fail safely or remain disabled when not configured. A fresh clone must run with no Sentry, Clerk, Neon, Vercel Analytics, or similar account.

## 10. Git, upstream maintenance, and releases

### 10.1 Branches and pull requests

The repository should maintain two long-lived branches:

- **`main`** — stable, validated code; production/release source.
- **`staging`** — integration branch for upcoming changes.

Feature and fix branches should normally start from `staging` and merge through pull requests. Validated staging changes are promoted to `main` by pull request. Protect stable branches with appropriate GitHub repository rules and CI checks.

### 10.2 Downstream relationship

Expected structure:

```text
LaunchKit (upstream)
  ├── Agency Website
  ├── Homelab Store
  ├── UnPocketed Website
  ├── selfOS Website
  └── Clothing Store
```

Downstream projects should be able to fetch and **explicitly merge** upstream improvements, and propose suitable generic changes back upstream via pull requests.

GitHub has restrictions on multiple forks of the same repo under a single account/organization. Projects may therefore be genuine forks where appropriate or **independent repos with LaunchKit configured as an upstream remote**. What matters is shared Git history and a documented sync strategy, not the GitHub Fork badge.

Design and documentation should recognize that merging upstream is not automatic or conflict-free. Project-specific content, themes, assets, and business logic should be isolated to reduce merge conflicts.

### 10.3 Tags and releases

- Follow semantic version conventions such as `v0.1.0`, `v0.2.0`, and `v1.0.0`.
- Use Git tags to mark exact versions of the code.
- Publish GitHub Releases at meaningful milestones, with release notes and documented breaking changes.
- Begin with a simple, controlled release process on validated `main` commits; a manually dispatched GitHub Actions workflow is acceptable.
- Support a changelog and clear guidance for incorporating an upstream version downstream.
- Do **not** tie LaunchKit's foundation releases to production deployment of every downstream app; those are different concerns.

### 10.4 GitHub Actions and Dependabot

Phase 0 must include working GitHub Actions for pull-request checks: install, type-check, lint, formatting, tests, and production build. Run appropriate browser/E2E and Storybook build checks as part of CI, with practical job splitting or caching.

Include `.github/dependabot.yml` for pnpm-compatible JavaScript dependency updates (GitHub's `npm` ecosystem) and GitHub Actions versions. Use sensible grouping and a weekly version-update cadence; target `staging` for ordinary version-update PRs where supported. Security alerts and urgent security updates should remain visible and actionable on the default branch. **Don't assume dependency update settings automatically enable themselves on every downstream fork.**

Avoid making CI depend on unnecessary paid accounts or secrets.

### 10.5 Agent Git Rules

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

## 11. Documentation and repository governance

The initial repository must include:

| File | Purpose |
| --- | --- |
| `README.md` | What LaunchKit is, setup, development, customization, and common commands. |
| `CONTRIBUTING.md` | Branch conventions, pull requests, tests, and contributing upstream. |
| `LICENSE` | MIT licensing and required attribution/permission terms. |
| `CODE_OF_CONDUCT.md` | Community expectations and reporting. |
| `SECURITY.md` | How to report vulnerabilities. |
| `CHANGELOG.md` | Notable changes between releases. |
| `.env.example` | Document any non-secret environment configuration. |
| `AGENTS.md` | Concise repository conventions for coding agents. |

Also provide sensible issue and PR templates, and a short explanation of upstream syncing. Detailed supporting docs may live under `docs/`, but don't create pages of filler just to populate a directory.

## 12. Proposed project structure

This is a **target shape**, not a mandate to add empty folders before there is corresponding code.

```text
launchkit/
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml
├── .storybook/
├── public/
├── src/
│   ├── app/
│   │   └── [locale]/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── sections/
│   ├── content/
│   │   ├── en/
│   │   │   ├── pages/
│   │   │   └── blog/
│   │   ├── es/
│   │   └── de/
│   ├── config/
│   ├── i18n/
│   ├── lib/
│   │   └── content/
│   └── hooks/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
├── .env.example
├── eslint.config.mjs
├── lefthook.yml
├── playwright.config.ts
├── vitest.config.ts
├── pnpm-lock.yaml
├── package.json
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── CHANGELOG.md
├── LICENSE
└── AGENTS.md
```

Component stories and component tests may be colocated where that is clearer. The section renderer and schemas may live within `lib/content/` or an equivalent simple module. Avoid duplicate competing abstractions for sections.

## 13. Phased delivery

The phases describe **product scope**, not necessarily matching semantic version tags.

### Phase 0 — Core Foundation

Build a complete, production-capable **frontend and website starter**, including:

- Next.js App Router (latest compatible stable), React 19, strict TypeScript 6, Tailwind CSS 4, pnpm, and shadcn/ui.
- Midnight Yacht Club brand showcase with complementary light and dark palettes, implemented through semantic design tokens.
- Mobile-first responsive shell, navigation, sections, and a clean example homepage.
- File-based TypeScript section composition, Markdown support, JSON UI translations, next-intl localization, and missing-translation checks.
- React Hook Form + Zod reference form.
- ESLint, Prettier, Lefthook, Commitlint, `@/` absolute imports, and sensible local scripts.
- Vitest unit/integration tests (prefer Browser Mode for UI testing where compatible); Playwright E2E tests; local coverage reporting.
- Lightweight Storybook environment with representative stories and accessibility support.
- SEO, accessibility, performance, and security fundamentals.
- Type-safe environment variables with T3 Env.
- `main`/`staging` strategy, GitHub Actions, Dependabot, semantic tags/releases, changelog, and governance docs.

**Phase 0 must work without a database, authentication provider, hosted telemetry, or paid services.**

### Phase 1 — Real-world validation

Build a first real site from LaunchKit by replacing its branding, content, navigation, and configuration while keeping shared infrastructure intact. Then build a sufficiently different second site, publish an upstream improvement only with the user’s explicit authorization, and explicitly merge that change downstream. Document any conflicts and improvements worth contributing back to LaunchKit.

This phase validates **the upstream/downstream maintenance model**. The Phase 0 technology stack is not reinstalled or reinvented here.

### Phase 2 — Optional analytics and error monitoring

Introduce lightweight, cost-aware, **opt-in** observability integrations only when real deployments justify them:

- **Sentry** for production error monitoring, with optional tracing and conservative sampling.
- **Sentry Spotlight** as an optional local development tool.
- **Vercel Web Analytics** as the preferred lightweight traffic analytics option for Vercel-hosted sites; **PostHog** can be evaluated as an alternative where product analytics are needed. Do not integrate both by default.
- Privacy-aware data collection, per-environment configuration, configurable sampling, and fail-safe disabling when not configured.

These integrations must not be mandatory for a fresh clone. Phase 0 already provides a simple, controlled GitHub release process and changelog; **Semantic Release is not required** to add analytics or ship the foundation.

### Phase 3 — Optional application services and advanced operations

Add full-stack services only when real downstream project requirements justify them:

- Authentication, with Clerk or another provider evaluated at that time.
- Database persistence, potentially Neon PostgreSQL + Drizzle.
- Local database tooling such as PGlite only if appropriate.
- More advanced application services, user accounts, and business workflows.
- Structured logging and optional log aggregation.
- Sensible sampling, privacy protections, per-environment controls, and off-by-default integrations.

Local tests and coverage reporting are **already Phase 0**. External monitoring subscriptions, hosted log platforms, and coverage dashboards are not.

### Later, only if justified

Uptime monitoring, visual regression hosting, full e-commerce/payment features with Stripe, more elaborate authorization, and advanced developer tooling may be considered in a downstream project or later LaunchKit work. None is a condition for initial success.

## 14. Explicit exclusions

The reference boilerplate should not be copied wholesale. The following are **excluded** from the planned baseline:

- **Better Stack**.
- **Checkly**.
- **Arcjet**.
- **Codecov** (local code coverage remains welcome).
- A mandatory external CMS or visual drag-and-drop website builder.
- An extensive multi-variant section builder.
- An obligatory authentication/database/billing stack in Phase 0.
- A mandatory self-hosted logging/monitoring stack.
- Paid Storybook hosting or visual regression services for the initial release.

Avoid dependencies and abstractions that serve only imagined requirements.

## 15. Initial quality bar / definition of done

Phase 0 is complete when:

1. A fresh checkout can install, run, build, and execute its documented checks using pnpm **without external service credentials**.
2. The homepage is polished, usable, responsive, and visually aligned with the supplied Midnight Yacht Club direction.
3. Light and dark modes both work, using shared semantic design tokens; components do not depend on hardcoded LaunchKit colours.
4. The initial four-locale configuration (`en`, `es`, `fr`, `de`) works end to end, with translated UI/page content and appropriate localized metadata.
5. Pages are composed from typed, ordered section definitions in `content/`; the content is not embedded throughout page JSX.
6. A functional validated example form is included.
7. A small set of Storybook stories demonstrates shared components in different themes and viewports.
8. Unit, integration, and E2E test suites are present, meaningful, and passing; representative accessibility checks are included.
9. Type checking, linting, formatting checks, tests, and builds run successfully in GitHub CI.
10. Dependabot configuration, version tags, releases, changelog approach, and main/staging process are documented and usable.
11. Required README, contribution, license, security, and community files exist with substantive content.
12. The project demonstrates sensible performance, SEO, and accessibility practices without claiming they can never regress.

Phase 1 then confirms the deeper objective: creating and maintaining a genuinely different downstream site without constantly fighting the shared codebase.

## 16. Reference and decisions still open

### Architectural reference

- [ixartz / Next-js-Boilerplate](https://github.com/ixartz/Next-js-Boilerplate) — a strong structural reference, **not** a dependency list to copy or a repository to fork automatically.

LaunchKit's intentional differences include pnpm, ESLint/Prettier, section-based local content, Midnight Yacht Club design, and moving database/authentication/hosted operations to later phases.

### Confirmed decisions

- **License:** MIT.
- **Default appearance:** Follow system preference, while supporting both light and dark modes.
- **Initial locales:** English (`en`), Spanish (`es`), French (`fr`), and German (`de`).
- **Hosting:** Vercel for the LaunchKit showcase; the reusable foundation should avoid unnecessary hosting lock-in.
- **Commit/release workflow:** Conventional Commits with Commitlint and a simple, controlled release process. No elaborate Commitizen or Semantic Release setup is required in Phase 0.

### Still open

- **Typography:** Final serif and sans-serif typefaces, after evaluating rendering, accessibility, and font licensing.
- **Phase 2 provider configuration:** Whether Vercel Web Analytics alone is enough or an individual downstream project needs PostHog; Sentry remains optional.

These remaining choices should be resolved deliberately during implementation, not silently treated as approved defaults.

