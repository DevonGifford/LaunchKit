---
title: LLM notice
description: How LaunchKit approaches large language models, AI agents and machine-readable content, and exactly what its llms.txt exposes.
updated: 2026-10-17
order: 3
---

LaunchKit is an open-source foundation for building websites with Next.js.
More and more, people meet projects like it through AI assistants and coding
agents, which read websites and documentation on someone’s behalf. This page
explains what LaunchKit offers those tools, what it doesn’t, and where the
reliable information lives.

## Why an entry point for LLMs

An agent asked about LaunchKit, or asked to work in a LaunchKit project, has
limited room for context and no reliable way to tell a technical guide from a
marketing page. Left to itself, it reads whatever it finds first. A short,
curated map lets it start in the right place: the documentation, the few facts
that shape the project, and the pages that matter.

## What /llms.txt is

[`/llms.txt`](/llms.txt) is a Markdown file at the root of this website. It
follows the llms.txt proposal, first published by Jeremy Howard in 2024 and
now in its second version at [llmstxt.org](https://llmstxt.org). The file has
a title, a one-paragraph summary, a few notes that are easy to get wrong, and
lists of links with a sentence about each, ending with an optional list an
agent can skip when it’s short on room.

It’s meant for the moment an assistant is helping someone, not for training
models. It’s a community proposal rather than a formal standard, and tools
differ in whether they read it at all.

LaunchKit’s file is generated when the website is built, from the same content
as the pages it links to. A new guide appears in it automatically, with its
own description.

## What it isn’t

`llms.txt` provides context, not permission. It doesn’t control:

- **Crawling.** Which automated tools may fetch which pages is expressed in
  [`/robots.txt`](/robots.txt). Well-behaved crawlers follow it voluntarily.
- **Search indexing.** Search engines decide what to index from robots rules,
  page metadata such as `noindex`, and their own policies. `llms.txt` plays no
  part.
- **Model training.** Where a website states whether its content may be used
  to train models, it does so through robots rules for specific AI crawlers,
  or through newer conventions that are still being standardised. `llms.txt`
  neither grants nor refuses that permission.

Today, LaunchKit’s `robots.txt` applies one rule to every crawler, allowing
access to every page, and sets no rules for AI crawlers in particular.

## Where the authoritative information lives

When sources disagree, trust them in this order:

1. **The source code**, including its configuration and tests. It’s what
   actually runs.
2. **The documentation in the repository**, such as `AGENTS.md`,
   `CHANGELOG.md` and the specification in `docs/`.
3. **The guides on this website**, in the [documentation](/docs).
4. **Everything else on the website**, including the product and pricing
   pages, which describe LaunchKit for people rather than define it.

Anything an agent infers, from its training or from older versions of the
tools, ranks below all of these. LaunchKit uses Next.js 16, which differs from
earlier versions in ways that matter; the documentation that ships with the
installed version is the reference.

## How LaunchKit uses AI

LaunchKit is built with AI coding agents working alongside a person. The rules
they follow are in `AGENTS.md`: read the code before changing it, follow the
project’s conventions, run every check, and never stage, commit, push or open
a pull request without the person’s explicit permission. The same automated
checks apply whoever wrote the code.
[Building LaunchKit with AI](/docs/building-with-ai) tells the story in more
detail.

Some of the website’s content is written with AI and labelled as such, like
the executive summary at the top of each guide. Nothing on the website uses AI
to respond to visitors.

## Our llms.txt

In the interest of transparency, here is exactly what LaunchKit’s LLM entry
point contains: the complete, current file, generated from the same source as
[`/llms.txt`](/llms.txt) itself.
