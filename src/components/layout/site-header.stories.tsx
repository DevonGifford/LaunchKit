import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SiteHeader } from './site-header';

const meta = {
  title: 'Layout/Site header',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'wide'] } },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Inline navigation, language menu and theme toggle from md up. */
export const Desktop: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'desktop' } } };

/** Below md the navigation collapses into the menu button. */
export const Mobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** Nearly full width: the logo left, the navigation centred, the theme, language and a call to action right. */
export const Wide: Story = {
  tags: ['!autodocs'],
  args: { variant: 'wide' },
  globals: { viewport: { value: 'desktop' } },
};

/** The same composition while it fits; the navigation nudges off centre rather than overlap. */
export const WideOnTablet: Story = {
  tags: ['!autodocs'],
  args: { variant: 'wide' },
  globals: { viewport: { value: 'tablet' } },
};

/** Below md it collapses into the same menu button as the default header. */
export const WideOnMobile: Story = {
  tags: ['!autodocs'],
  args: { variant: 'wide' },
  globals: { viewport: { value: 'mobile' } },
};

/** Story tests run axe in the light theme; this checks dark contrast too. */
export const WideDark: Story = {
  tags: ['!autodocs'],
  args: { variant: 'wide' },
  globals: { viewport: { value: 'desktop' }, theme: 'dark' },
};
