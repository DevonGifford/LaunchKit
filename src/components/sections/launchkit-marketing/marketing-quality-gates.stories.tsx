import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { SectionOf } from '@/lib/content/types';
import { MarketingQualityGates } from './marketing-quality-gates';

/** Fixture copy until the section is placed on a page. It describes LaunchKit's own checks. */
const section = {
  id: 'quality',
  type: 'marketing-quality-gates',
  eyebrow: 'Quality gates',
  title: 'Checked at every step.',
  description:
    'The same automated checks run on your machine and in CI, whether a person or an agent wrote the code.',
  stages: [
    {
      label: 'Stage 1',
      title: 'Before commit',
      icon: 'shield-check',
      items: [
        { name: 'Lefthook', description: 'Fast, check-only Git hooks' },
        { name: 'ESLint', description: 'Zero warnings allowed' },
        { name: 'Prettier', description: 'Consistent formatting' },
        { name: 'Commitlint', description: 'Conventional Commits' },
      ],
    },
    {
      label: 'Stage 2',
      title: 'CI pipeline',
      icon: 'flask-conical',
      items: [
        { name: 'TypeScript', description: 'Strict type checking' },
        { name: 'Vitest', description: 'Unit and browser-mode tests' },
        { name: 'Storybook', description: 'Every story tested with axe' },
        { name: 'Playwright', description: 'End-to-end tests' },
      ],
    },
    {
      label: 'Stage 3',
      title: 'Release',
      icon: 'package-check',
      items: [
        { name: 'Protected branches', description: 'CI must pass' },
        { name: 'Dependabot', description: 'Weekly updates' },
        { name: 'Changelog', description: 'Notes for every version' },
        { name: 'Release workflow', description: 'Passing builds' },
      ],
    },
  ],
  highlights: [
    'Every commit is checked',
    'The same checks locally and in CI',
    'Releases only from passing builds',
  ],
} satisfies SectionOf<'marketing-quality-gates'>;

const meta = {
  title: 'Sections/LaunchKit Marketing/Quality gates',
  component: MarketingQualityGates,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof MarketingQualityGates>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three stages side by side on wide screens, joined by a hairline. */
export const Default: Story = {};

/** Below 1024px the stages stack; the highlights stay on one row. */
export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

/** On phones the highlights stack too. */
export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** Story tests run axe in the light theme; this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };
