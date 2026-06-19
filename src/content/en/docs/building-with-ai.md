---
title: Building LaunchKit with AI
description: How coding agents work in this repository, the rules that keep them safe, and what a real working session looks like.
updated: 2026-10-17
order: 5
summary: How AI coding agents work in LaunchKit: the shared rulebook in AGENTS.md, the rule that only people commit, 18 pinned skills, bundled framework docs, the checks that catch mistakes, and the five-step loop this website was built with.
next: component-library, roadmap
---

Much of LaunchKit, this website included, was built with an AI coding agent
working alongside a person. That only works because the repository is set up
for it. An agent needs the same things a new developer does: clear
conventions, fast feedback and firm limits. LaunchKit gives it all three, and
keeps the final say with the person.

## One rulebook for people and agents

Every agent session starts by reading `AGENTS.md` at the root of the
repository. (`CLAUDE.md` simply points to it, so every tool reads the same
file.) It covers what any newcomer needs to know:

- **How the code is organised:** which folders depend on which, where
  sections live, and why routes hold no reusable logic.
- **The conventions:** strict TypeScript, colours from tokens only, no copy
  hard-coded in components, every interface string in all four languages.
- **The checks to run:** `pnpm check` and `pnpm test:e2e`, and what to do
  when one fails for an unrelated reason.
- **How to report back:** what changed and why, which checks ran and passed,
  and what the person still needs to decide.

Writing the rules down once does two jobs. Agents follow them, and people
joining the project get the same guide.

## Agents write code; people own the history

The most important section of `AGENTS.md` is copied word for word from the
project specification. Agents may read the repository, change files, run
tests and prepare work. They may not stage, commit, push, open pull requests
or rewrite history without explicit permission, and even then they must
confirm again immediately before acting.

> The agent writes and validates code. The person retains final control over
> Git history, repository changes, and publication.

In practice, an agent finishes a piece of work, runs the checks and leaves
every change unstaged with a summary. The person reviews the diff, commits it
and decides what’s next. Nothing reaches the repository’s history without a
person choosing it.

## Skills: know-how on demand

Agents can load **skills**: packaged instructions for a particular kind of
task. LaunchKit pins 18 of them at project level in `skills-lock.json`, so
every clone gets exactly the same versions:

- fourteen engineering skills from Matt Pocock’s collection, for code review,
  test-driven development, diagnosing bugs and designing modules;
- two from Vercel, on React performance and web interface guidelines;
- one from Anthropic, on frontend design;
- one from shadcn/ui, for working with its components.

Skills are restored on a fresh clone with
`pnpm dlx skills experimental_install`. A skill runs with the agent’s full
permissions, so each one’s `SKILL.md` is read before it’s added, and
`AGENTS.md` always overrides a skill’s advice. The Git rules win every time.

## Fresh knowledge, not stale memory

A model’s training ends at some point; the tools keep moving. LaunchKit uses
Next.js 16, which changes enough that an agent’s memory of older versions can
mislead it. Next.js ships its documentation inside the installed package, and
`AGENTS.md` tells agents to read the relevant guide in
`node_modules/next/dist/docs/` before writing code. When an agent added page
transitions to this site, it worked from those docs, not from memory.

Storybook does the same: `pnpm exec storybook skills stories` and
`write-story` hand an agent current instructions for writing stories.

## Checks that catch what review misses

Rules only help if breaking them is noticed. LaunchKit’s checks don’t care
who wrote the code:

- **TypeScript and Zod** reject content that doesn’t match a section’s schema.
- **The section registry** won’t compile while a section type has no component.
- **ESLint** allows no warnings, and rejects hard-coded colours.
- **`pnpm i18n:check`** fails on any message missing from a language.
- **Story tests** run axe on every component, and **end-to-end tests** check
  every page on desktop and mobile, in both themes.

An agent runs all of them before reporting back, and the same checks run in
CI on every pull request.

## What a session looks like

This website was built in a series of agent sessions, each one a single,
reviewable piece of work: the header and navigation, the homepage, the
Examples and Pricing pages, a polish pass, and these docs. Each followed the
same loop.

1. **A brief.** The person describes the goal and the limits: what’s in
   scope, what isn’t, and what must not be touched.
2. **Read first.** The agent inspects the relevant code, tests and docs
   before proposing anything, and asks about decisions that are genuinely the
   person’s, such as which sections a page should have.
3. **Build and verify.** It makes the smallest clean change, runs every
   check, and looks at the result in a real browser, in both themes and at
   several widths.
4. **Report.** It lists what changed, which checks passed, and anything the
   person needs to decide or should know.
5. **Review and commit.** The person reads the diff and commits it, or asks
   for changes.

The verification step earns its keep. In these sessions it found a header
that scrolled sideways on tablets in three languages, a test that only failed
under load, a dropdown that scrolled the page back up after jumping to a
section, and a contact form that was quietly discarding every message. None
of them showed up in a quick look at the code. All of them showed up when the
agent measured, ran and clicked through the real site.

## Working this way yourself

Any project built on LaunchKit inherits the setup: the same `AGENTS.md`, the
same skills and the same checks. Adapt `AGENTS.md` to your project, keep the
Git rules, and let the checks do the policing. The aim isn’t to hand the
project to an agent. It’s to give a capable collaborator clear rules, fast
feedback and a person who decides.
