import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { homeV1 } from '@/content/en/pages/home-v1';
import { findSection } from '@/lib/content/pages';
import { StatementSection } from './statement-section';

const meta = {
  title: 'Sections/Statement',
  component: StatementSection,
  parameters: { layout: 'fullscreen' },
  args: findSection(homeV1, 'statement'),
} satisfies Meta<typeof StatementSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The previous homepage's statement, rendered from src/content/en/pages/home-v1.ts. */
export const Default: Story = {};

export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };
