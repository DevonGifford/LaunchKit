import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { SectionOf } from '@/lib/content/types';
import { MarketingTechStack } from './marketing-tech-stack';

/** Fixture copy until the section is placed on a page. It lists what LaunchKit ships. */
const section = {
  id: 'stack',
  type: 'marketing-tech-stack',
  eyebrow: 'Tech stack',
  title: 'Built on proven tools.',
  description: 'Current, well-supported tools, already configured and tested together.',
  featured: [
    { name: 'Next.js', description: 'React framework', icon: 'nextjs' },
    { name: 'React', description: 'UI library', icon: 'react' },
    { name: 'TypeScript', description: 'Strict type safety', icon: 'typescript' },
    { name: 'Tailwind CSS', description: 'Token-driven styling', icon: 'tailwindcss' },
    { name: 'shadcn/ui', description: 'UI components', icon: 'shadcn-ui' },
    { name: 'next-intl', description: 'Four locales built in', icon: 'next-intl' },
    { name: 'Zod', description: 'Schema validation', icon: 'zod' },
    { name: 'React Hook Form', description: 'Validated forms', icon: 'react-hook-form' },
  ],
  tools: [
    { name: 'Radix UI', description: 'UI primitives', icon: 'radix-ui' },
    { name: 'Lucide', description: 'Icons', icon: 'lucide' },
    { name: 'next-themes', description: 'Light and dark', icon: 'next-themes' },
    { name: 'Sonner', description: 'Toasts', icon: 'sonner' },
    { name: 'date-fns', description: 'Dates', icon: 'date-fns' },
    { name: 'Marked', description: 'Markdown docs', icon: 'marked' },
    { name: 'T3 Env', description: 'Typed env vars', icon: 't3-env' },
    { name: 'Vitest', description: 'Unit tests', icon: 'vitest' },
    { name: 'Playwright', description: 'End-to-end tests', icon: 'playwright' },
    { name: 'Storybook', description: 'Component docs', icon: 'storybook' },
    { name: 'axe-core', description: 'Accessibility checks', icon: 'axe-core' },
    { name: 'ESLint', description: 'Linting', icon: 'eslint' },
    { name: 'Prettier', description: 'Formatting', icon: 'prettier' },
    { name: 'Lefthook', description: 'Git hooks', icon: 'lefthook' },
    { name: 'Commitlint', description: 'Commit messages', icon: 'commitlint' },
    { name: 'pnpm', description: 'Package manager', icon: 'pnpm' },
    { name: 'GitHub Actions', description: 'CI', icon: 'github-actions' },
    { name: 'Dependabot', description: 'Weekly updates', icon: 'dependabot' },
  ],
} satisfies SectionOf<'marketing-tech-stack'>;

const meta = {
  title: 'Sections/Marketing/Tech stack',
  component: MarketingTechStack,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof MarketingTechStack>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Four featured cards and six tools per row on wide screens. */
export const Default: Story = {};

/** Two featured cards and four tools per row; the last row of tools is centred. */
export const Tablet: Story = { globals: { viewport: { value: 'tablet' } } };

/** One featured card and two tools per row. */
export const OnMobile: Story = { globals: { viewport: { value: 'mobile' } } };

/** Story tests run axe in the light theme; this checks dark contrast too. */
export const Dark: Story = { globals: { theme: 'dark' } };
