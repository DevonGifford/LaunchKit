import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { home } from '@/content/en/pages/home';
import { findSection } from '@/lib/content/pages';
import { CtaSection } from './cta-section';

const meta = {
  title: 'Sections/Call to action',
  component: CtaSection,
  parameters: { layout: 'fullscreen' },
  args: findSection(home, 'cta'),
  argTypes: { appearance: { control: 'inline-radio', options: ['band', 'panel'] } },
} satisfies Meta<typeof CtaSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Full width on the high-emphasis surface: the default. */
export const Band: Story = {};

/** The same content in a quieter, contained panel on the muted surface. */
export const Panel: Story = { args: { appearance: 'panel' } };

export const WithoutSecondaryAction: Story = { args: { secondaryAction: undefined } };

/** On phones the panel's actions wrap, centred. */
export const PanelOnMobile: Story = {
  tags: ['!autodocs'],
  args: { appearance: 'panel' },
  globals: { viewport: { value: 'mobile' } },
};

/** Story tests run axe in the light theme; this checks the panel's dark contrast too. */
export const PanelDark: Story = {
  tags: ['!autodocs'],
  args: { appearance: 'panel' },
  globals: { theme: 'dark' },
};
