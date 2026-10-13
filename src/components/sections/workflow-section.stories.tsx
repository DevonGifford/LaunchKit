import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { home } from '@/content/en/pages/home';
import { findSection } from '@/lib/content/pages';
import { WorkflowSection } from './workflow-section';

const meta = {
  title: 'Sections/Workflow',
  component: WorkflowSection,
  parameters: { layout: 'fullscreen' },
  args: findSection(home, 'workflow'),
} satisfies Meta<typeof WorkflowSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The homepage workflow, rendered from src/content/en/pages/home.ts. */
export const Default: Story = {};

export const Tablet: Story = { globals: { viewport: { value: 'tablet' } } };

export const OnMobile: Story = { globals: { viewport: { value: 'mobile' } } };
