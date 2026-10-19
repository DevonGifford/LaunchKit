---
title: What’s Next for LaunchKit
description: Where LaunchKit is heading, what each phase adds, and what it will deliberately never become.
updated: 2026-10-19
order: 6
summary: Where LaunchKit is heading: finishing and translating this website, proving the foundation on real sites, optional analytics and error monitoring, application services only when needed, the decisions still open, and what it will never become.
next: launching-a-project, building-with-ai
---

LaunchKit is meant to stay small. It won’t grow by adding everything a
website might one day need; it grows when real projects show what they
actually need. So this roadmap isn’t a feature list with dates. It’s the
order in which LaunchKit plans to prove itself, and the rules for what gets
in.

## Now: finishing the website

The foundation itself is in place: the design system, four languages,
section-based content, forms, tests, CI and a controlled release process.
The current work is LaunchKit’s own website, the one you’re reading.

- **Final content.** Real reviews in place of the placeholders and settled
  pricing, in every language.
- **Every page in every language.** The website and these guides are written
  in English first, then translated into Spanish, French and German once the
  English is settled, so nothing is translated twice.
- **The remaining pages.** The footer’s placeholder links, such as About and
  the changelog, get real destinations.

## Next: proving it on real sites

The specification calls this **real-world validation**, and it’s the phase
that matters most. A foundation is only as good as the sites built on it.

- **A first real site**, built from LaunchKit by replacing its brand, content
  and navigation while keeping the shared engineering intact.
- **A second, deliberately different one**, to show that two unlike sites
  can share a foundation without fighting it.
- **Improvements flowing both ways.** A change made for one project is
  contributed upstream, released, and merged into the other, testing the
  whole upstream and downstream model end to end.

Six sites are lined up for this, from an agency website and a homelab
hardware shop to UnPocketed, an app landing page. As they launch, they’ll
appear on the [Examples](/examples) page, shown off with Storybook components
built for the purpose.

## Later: optional insight

When real deployments justify it, LaunchKit will offer lightweight ways to
see how sites are doing. The first are already here:

- **Traffic and speed** with Vercel Web Analytics and Speed Insights. Neither
  identifies visitors, so both run for everyone, and they load only on Vercel.
- **Error monitoring** with Sentry, sampled conservatively.
- **Product analytics** with PostHog where a project needs it, waiting for the
  visitor's consent. Never alongside Vercel Web Analytics by default.

Each is, or will be, a switch in `src/config/features.ts`, privacy-aware and
safe to leave unconfigured. A fresh clone still runs with no accounts at all.

## Further out: application services

Some projects will outgrow being a website. For those, and only when a real
project needs them, LaunchKit may add:

- **Authentication**, with Clerk or another provider chosen at the time.
- **A database**, likely Neon PostgreSQL with Drizzle.
- **Structured logging**, with sensible sampling and privacy protections.

Payments, uptime monitoring and visual regression testing sit further out
still. They’re possibilities, not promises, and none of them is a condition
for LaunchKit’s success.

## Still to decide

Two choices are deliberately open, to be made with evidence rather than by
default:

- **The final typefaces.** LaunchKit uses system fonts until serif and
  sans-serif faces are chosen for rendering, accessibility and licensing.
- **The analytics provider**, if any: whether Vercel Web Analytics is enough,
  or a project needs PostHog.

## What LaunchKit won’t become

Saying no is part of the plan. LaunchKit will not grow:

- a mandatory CMS or a drag-and-drop page builder;
- a sprawling system of section variants built for imagined requirements;
- a required authentication, database or billing stack;
- a mandatory monitoring or logging service, paid or self-hosted.

Each of these would make every project carry the weight of a few. If a
project needs one, it adds it downstream, and if it turns out to help
everyone, it can come back upstream.

## Following along

Every notable change is recorded in `CHANGELOG.md`, and each release comes
with notes on anything downstream projects need to do. If you have an idea,
or a project you’d like to build on LaunchKit,
[get in touch](/contact).
