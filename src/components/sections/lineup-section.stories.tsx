import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { home } from '@/content/en/pages/home';
import { findSection } from '@/lib/content/pages';
import { LineupSection } from './lineup-section';

const meta = {
  title: 'Sections/Lineup',
  component: LineupSection,
  parameters: { layout: 'fullscreen' },
  args: findSection(home, 'lineup'),
} satisfies Meta<typeof LineupSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The homepage use cases, rendered from src/content/en/pages/home.ts. */
export const Default: Story = {};

export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };
