 <div align="center">
  <a href="https://launch-kit-flax.vercel.app/">
    <img
      src="docs/brand/launchkit-readme-banner.png"
      alt="LaunchKit — reusable Next.js website foundation"
      height="250"
    />
  </a>
  <h2>A reusable foundation for building & launching ideas.</h2>
  <p>
    <img
      src="https://skillicons.dev/icons?i=ts,react,tailwind,vitest,nextjs,vercel,github"
      alt="Next.js, React, TypeScript, Tailwind CSS, Vitest, Vercel and GitHub"
    />
  </p>
  <p>
    <a href="https://launchkit-website.vercel.app/">LaunchKit Website ↗</a>
    &nbsp;&nbsp;·&nbsp;&nbsp;
    <a href="https://launchkit-library.vercel.app/">LaunchKit Library ↗</a>
  </p>

</div>

<!-- -------------------------------------------------------------------------- -->

### About This Project

---

**LaunchKit is a reusable foundation for building and launching better websites, faster and cheaper.** <br/> It provides everything a modern website needs - responsive UI, themes, localization, section-based content, forms, testing, CI and AI-assisted development - so each new project can launch faster and focus on what makes it different.

LaunchKit is centrally maintained, with improvements and dependency updates shared across downstream projects.

<br/>
<!-- -------------------------------------------------------------------------- -->

### Philosophy

---

**Build once. Reuse often. Improve centrally.**\
LaunchKit is opinionated about the things worth standardizing, without forcing every website into the same template. Shared foundations improve upstream, while branding, content and project-specific features remain independent.

<br/>

<!-- -------------------------------------------------------------------------- -->

<div align="center">
  <a href="https://launchkit-website.vercel.app/">
    <img
      src="docs/brand/midnight-yacht-club-brand-board.png"
      alt="Midnight Yacht Club — Dark Theme"
      width="49%"
    />
    <img
      src="docs/brand/sunlight-yacht-club-brand-board.png"
      alt="Sunlight Yacht Club — Light Theme"
      width="49%"
    />
  </a>

  <p>
    <sub>Midnight Yacht Club & Sunlight Yacht Club design system.</sub>
  </p>
</div>

<!-- -------------------------------------------------------------------------- -->

<details>
  <summary><strong>Tech Stack</strong></summary>
  <br/>

LaunchKit uses a modern, intentionally small stack. The foundation stays opinionated about tooling while leaving product-specific infrastructure to downstream projects.

| Area         | Stack                                                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core         | [Next.js 16](https://nextjs.org/) · [React 19](https://react.dev/) · [TypeScript 6](https://www.typescriptlang.org/)                                                            |
| UI           | [Tailwind v4](https://tailwindcss.com/) · [shadcn/ui](https://ui.shadcn.com/) · [Design Tokens](docs/theming.md)                                                                |
| Content      | [TypeScript](https://www.typescriptlang.org/) · [Markdown](https://commonmark.org/) · [JSON](https://www.json.org/)                                                             |
| Localization | [next-intl](https://next-intl.dev/) · [i18n-check](https://github.com/lingualdev/i18n-check)                                                                                    |
| Forms        | [React Hook Form](https://react-hook-form.com/) · [Zod](https://zod.dev/)                                                                                                       |
| Testing      | [Vitest](https://vitest.dev/) · [Vitest Browser Mode](https://vitest.dev/guide/browser/) · [Playwright](https://playwright.dev/) · [axe](https://github.com/dequelabs/axe-core) |
| Components   | [Storybook](https://storybook.js.org/)                                                                                                                                          |
| Tooling      | [ESLint](https://eslint.org/) · [Prettier](https://prettier.io/) · [Lefthook](https://lefthook.dev/) · [Commitlint](https://commitlint.js.org/) · [T3 Env](https://env.t3.gg/)  |
| Automation   | [GitHub Actions](https://github.com/features/actions) · [Dependabot](https://github.com/dependabot)                                                                             |
| Hosting      | [Vercel](https://vercel.com/)                                                                                                                                                   |

</details>

---

<!-- -------------------------------------------------------------------------- -->

<details>
  <summary><strong>Features</strong></summary>
  <br/>

LaunchKit provides the foundations most modern websites need, while leaving product-specific infrastructure to the projects that actually need it.

- **Design System** <br/>
  Reusable shadcn/ui components, semantic tokens, responsive layouts, and light/dark/system themes.

- **Content Architecture** <br/>
  Typed, ordered page sections keep content separate from presentation, with Markdown for long-form content.

- **Localization** <br/>
  Built-in support for multiple locales, with locale-aware routes, content, navigation, metadata, and translation checks.

- **Reusable Sections** <br/>
  Accessible layouts, navigation, heroes, CTAs, pricing, FAQs, reviews, stats, and other building blocks without a visual page builder.

- **Code Quality** <br/>
  Strict TypeScript, linting, formatting, Git hooks, environment validation, and consistent project conventions.

- **Automated Testing** <br/>
  Unit, browser integration, and end-to-end testing with Vitest and Playwright, backed by reusable Storybook stories.

- **Accessibility Standards** <br/>
  WCAG 2.2 AA as the project target, with accessible component patterns and automated axe checks across key experiences.

- **CI & Pipelines** <br/>
  GitHub Actions for pull-request validation, automated quality checks, builds, and controlled release workflows.

- **AI Agent Configuration** <br/>
  Project-level instructions, conventions, skills, and guardrails for AI-assisted development and coding agents.

- **SEO & Performance** <br/>
  Metadata, Open Graph, canonical URLs, alternate languages, sitemap, robots, optimized assets, and modern rendering defaults.

- **Downstream Friendly** <br/>
  Build distinct sites on top of LaunchKit while continuing to merge improvements from the shared foundation.

> **Intentionally not included:** <br/>
> Authentication, databases, payments, or paid monitoring. Add them downstream when the product actually needs them.

</details>

---

<!-- -------------------------------------------------------------------------- -->

<details>
  <summary><strong>Documentation</strong></summary>
  <br/>

New to LaunchKit? Start with the [live documentation ↗](https://launchkit-website.vercel.app/en/docs) or explore the project guides below.

| Guide                                  | What you'll find                                           |
| -------------------------------------- | ---------------------------------------------------------- |
| [Project Specification](docs/SPEC.md)  | Vision, scope, architecture, and development phases        |
| [Style Guide](docs/STYLE_GUIDE.md)     | Brand identity, typography, palettes, and visual direction |
| [Theming](docs/theming.md)             | Design tokens, brand customization, and shadcn/ui          |
| [Upstream Sync](docs/upstream-sync.md) | Creating downstream projects and taking LaunchKit updates  |
| [Releasing](docs/releasing.md)         | Branches, versions, tags, and GitHub Releases              |
| [Toolchain](docs/toolchain.md)         | Version decisions, compatibility, and maintenance          |

**Project guides:** [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Code of Conduct](CODE_OF_CONDUCT.md) · [Changelog](CHANGELOG.md)

**AI development:** [Agent Instructions](AGENTS.md) — project conventions, workflows, and Git restrictions for coding agents.

</details>

---
