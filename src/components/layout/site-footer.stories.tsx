import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SiteFooter } from './site-footer';

const meta = {
  title: 'Layout/Site footer',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: 'desktop' } } };

export const Mobile: Story = { globals: { viewport: { value: 'mobile' } } };
