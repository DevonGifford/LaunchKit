import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { home } from '@/content/en/pages/home';
import { findSection } from '@/lib/content/pages';
import { StatementSection } from './statement-section';

const meta = {
  title: 'Sections/Statement',
  component: StatementSection,
  parameters: { layout: 'fullscreen' },
  args: findSection(home, 'statement'),
} satisfies Meta<typeof StatementSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The homepage statement, rendered from src/content/en/pages/home.ts. */
export const Default: Story = {};

export const OnMobile: Story = { globals: { viewport: { value: 'mobile' } } };
