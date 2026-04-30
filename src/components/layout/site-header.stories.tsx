import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SiteHeader } from './site-header';

const meta = {
  title: 'Layout/Site header',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Inline navigation, language menu and theme toggle from md up. */
export const Desktop: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'desktop' } } };

/** Below md the navigation collapses into the menu button. */
export const Mobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };
