/*
 * Sample guides for stories and browser tests: the shapes the docs pages pass
 * around, without reading src/content (which needs Node's file system).
 */
import type { ArticleContent } from '@/components/layout/article';
import type { DocsNavSection } from '@/components/layout/docs-nav';
import type { DocSummary } from '@/lib/content/docs';
import type { DocsNavigationSection } from '@/lib/content/docs-navigation';

const guide = (slug: string, title: string, description: string, order: number): DocSummary => ({
  slug,
  title,
  description,
  order,
  updated: '2026-10-17',
  next: [],
  locale: 'en',
  isFallback: false,
  readingMinutes: 4,
});

export const sampleGuides = {
  quickstart: guide(
    'getting-started',
    'LaunchKit Quickstart',
    'What LaunchKit is, what you need, and how to go from a fresh clone to a running site in a few minutes.',
    1,
  ),
  customizing: guide(
    'making-it-yours',
    'Customizing LaunchKit',
    'Change the brand, rewrite the pages, set your languages and site details.',
    2,
  ),
  launching: guide(
    'launching-a-project',
    'Launching with LaunchKit',
    'A worked example, from an empty repository to a live, tested site.',
    3,
  ),
  designSystem: guide(
    'component-library',
    'LaunchKit Design System',
    'The primitives and sections every LaunchKit site is built from.',
    4,
  ),
  ai: guide(
    'building-with-ai',
    'LaunchKit AI Integrations',
    'How coding agents work in this repository and the rules that keep them safe.',
    5,
  ),
  roadmap: guide(
    'roadmap',
    'What’s Next for LaunchKit',
    'Where LaunchKit is heading, and what it will deliberately never become.',
    6,
  ),
};

/** The docs navigation as `getDocsNavigation` returns it. */
export const sampleNavigation: DocsNavigationSection[] = [
  {
    key: 'gettingStarted',
    docs: [sampleGuides.quickstart, sampleGuides.customizing, sampleGuides.launching],
  },
  { key: 'building', docs: [sampleGuides.designSystem, sampleGuides.ai] },
  { key: 'project', docs: [sampleGuides.roadmap] },
];

/** The same navigation as `DocsNav` takes it: translated, as links. */
export const sampleNavSections: DocsNavSection[] = [
  { title: 'Getting started', docs: sampleNavigation[0]?.docs ?? [] },
  { title: 'Building', docs: sampleNavigation[1]?.docs ?? [] },
  { title: 'Project', docs: sampleNavigation[2]?.docs ?? [] },
].map(({ title, docs }) => ({
  title,
  items: docs.map((doc) => ({ href: `/docs/${doc.slug}`, label: doc.title })),
}));

/** A short guide with every kind of block the docs use. */
export const sampleArticle: ArticleContent = {
  ...sampleGuides.quickstart,
  summary:
    'What LaunchKit is and deliberately leaves out, the two tools you need, the commands to get a site running locally, and how a page is assembled from typed sections.',
  html: [
    '<p>LaunchKit is a reusable foundation for building and launching websites. It gives every new project a responsive design system, four languages, section-based content, validated forms, automated tests and CI from the first day.</p>',
    '<p>The idea fits in one line: <strong>build once, reuse often, improve centrally.</strong></p>',
    '<h2>What you get</h2>',
    '<ul><li><strong>A modern foundation:</strong> Next.js with the App Router, React, strict TypeScript and Tailwind CSS.</li><li><strong>A themeable design system:</strong> semantic colour tokens and light and dark appearances.</li><li><strong>Four languages:</strong> English, Spanish, French and German.</li></ul>',
    '<h2>Run it locally</h2>',
    '<p>Install the dependencies, then start the development server:</p>',
    '<pre tabindex="0"><code>pnpm install\npnpm dev</code></pre>',
    '<p>Open <code>http://localhost:3000</code> and edit a page in <code>src/content/</code>; it reloads as you save.</p>',
    '<blockquote><p>Shared foundations improve upstream; branding and content stay with each project.</p></blockquote>',
  ].join('\n'),
};
