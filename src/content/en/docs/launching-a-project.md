---
title: Launching a new project with LaunchKit
description: A worked example, from an empty repository to a site that’s live, tested and still taking LaunchKit’s improvements.
updated: 2026-10-17
order: 3
---

LaunchKit exists to be built on. This walkthrough follows one project from
the first command to launch day: **UnPocketed**, a mobile app that needs a
landing page with its features, a few screenshots and download links. It’s
one of the sites lined up to be built on LaunchKit, which makes it a good
example: small enough to follow, different enough from LaunchKit’s own site
to prove the point.

The steps are the same for any project. Where UnPocketed makes a choice,
yours might make another.

## 1. Start from upstream

A downstream project is its own repository that shares LaunchKit’s Git
history. That shared history is what lets improvements flow down later, so
start with a clone, not a copy:

```sh
git clone --origin upstream git@github.com:DevonGifford/LaunchKit.git unpocketed-site
cd unpocketed-site
git remote add origin git@github.com:unpocketed/unpocketed-site.git
git push -u origin main
pnpm install
```

LaunchKit is now the `upstream` remote and your repository is `origin`.
GitHub allows only one fork per account, which is why this is a clone with
two remotes rather than a fork: what matters is the history, not the badge.

Then set up the repository:

1. Run `scripts/setup-github.sh`. It creates the `staging` branch and the
   rules that protect it and `main`: changes by pull request only, and CI
   must pass.
2. Switch on Dependabot alerts and security updates when the script offers.
   The configuration comes with the code, but GitHub doesn’t enable it for a
   new repository by itself.
3. Replace the contact details in `CODE_OF_CONDUCT.md` and `SECURITY.md`.

## 2. Give it a brand

UnPocketed’s look starts in one file. Its palette replaces the two blocks of
tokens in `src/app/theme.css`, one for light and one for dark, and every
component follows. Its logo goes into `public/brand/`, as new files rather
than overwriting LaunchKit’s, which keeps future merges clean.

Open Storybook and flip between the themes. Every section is there at
every screen size, so a palette problem shows up in minutes, and the
accessibility panel points out any text that falls below the contrast it
needs.

## 3. Shape the pages

An app landing page needs a strong opener, proof that the app is worth
installing, and a clear way to get it. UnPocketed’s homepage, in
`src/content/en/pages/home.ts`, comes together from sections LaunchKit
already has:

| Section         | Its job on UnPocketed’s homepage                         |
| --------------- | -------------------------------------------------------- |
| `hero-centered` | The app’s promise, with the download button first        |
| `showcase`      | A carousel of real screenshots, light and dark           |
| `features`      | What the app does, in three plain groups                 |
| `reviews`       | What early users say, once there are real ones           |
| `faq`           | Privacy, pricing and platforms, answered before they ask |
| `cta-band`      | The download links again, for people who read to the end |

No component changes are needed: the page is data, and TypeScript checks
every field. Anything specific to UnPocketed, such as an app-store badge
row, would become a new section in the project, built the way
[How the component library works](component-library) describes.

## 4. Fill in the details

`src/config/site.ts` takes the project’s name, contact details and social
profiles. `src/config/navigation.ts` sets the menus. For a one-page app site,
that might be just Features, Reviews and FAQ, pointing at sections on the
homepage. Every label is a message in `messages/`, so the menus translate
with everything else.

## 5. Connect the contact form

This step is easy to miss. LaunchKit’s contact form validates every message,
in the browser and again on the server, and then stops: delivery is left to
each project, so a fresh clone needs no mail account. Until you connect it,
messages go nowhere.

Delivery is one function, `deliver()` in `src/lib/forms/contact-action.ts`.
Send the message to an email service, a CRM or a webhook from there. Declare
any keys in `src/env.ts`, so a missing value fails safely, and don’t log the
messages themselves: they’re personal data.

## 6. Check everything

Before anything goes live, run the same checks CI runs:

```sh
pnpm check       # types, lint, formatting, translations, unit, browser and story tests
pnpm test:e2e    # a production build, tested on desktop and mobile
```

Between them, they check every page for accessibility problems in both
themes, make sure no page scrolls sideways on a 320px phone, and catch any
language that’s missing a message.

## 7. Go live

Deploy on any host that runs Next.js. On Vercel, connect the repository and
production deploys follow `main`. Set `NEXT_PUBLIC_SITE_URL` to the site’s
real address, so canonical links, the sitemap and language alternates point
at the right domain.

From here, work follows LaunchKit’s branch model: short-lived branches into
`staging` by pull request, and `staging` into `main` when it’s ready to ship.

## 8. Keep taking improvements

Launch isn’t the end of the relationship. When LaunchKit releases a new
version, UnPocketed merges it deliberately:

```sh
git fetch upstream --tags
git switch staging
git switch -c chore/launchkit-v0.2.0
git merge v0.2.0
pnpm install
pnpm check && pnpm test:e2e
```

Read that version’s notes in LaunchKit’s `CHANGELOG.md` first; breaking
changes come with the steps to take. Conflicts in `src/content/`, `messages/`
and `theme.css` are expected. Keep your side, since LaunchKit’s versions of
those files are only examples.

And when UnPocketed builds something other sites could use, such as a better
screenshot carousel, it can travel the other way: as a pull request to
LaunchKit, then back down in the next release. That’s the whole idea. Build
it once, reuse it often, and improve it centrally.
