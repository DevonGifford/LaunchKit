import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { home } from '@/content/en/pages/home';
import { findSection } from '@/lib/content/pages';
import { CtaPanelSection } from './cta-panel-section';

const meta = {
  title: 'Sections/CTA/Panel',
  component: CtaPanelSection,
  parameters: { layout: 'fullscreen' },
  // The homepage's closing invitation, shown as a panel.
  args: { ...findSection(home, 'cta-band'), type: 'cta-panel' },
} satisfies Meta<typeof CtaPanelSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A quieter, contained panel on the muted surface. */
export const Default: Story = {};

/** On phones the panel's actions wrap, centred. */
export const OnMobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
};

/** Story tests run axe in the light theme; this checks the panel's dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };
