import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
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
export const Simple: Story = { globals: { viewport: { value: 'desktop' } } };

/** The tablet width is past md, so everything stays inline. */
export const SimpleOnTablet: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'tablet' } },
};

/** Below md the navigation collapses into the menu button. */
export const SimpleOnMobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
};

/** Story tests run axe in the light theme; this checks dark contrast too. */
export const SimpleDark: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'desktop' }, theme: 'dark' },
};

/** Nearly full width: the logo left, the navigation centred, the theme, language and a call to action right. */
export const Wide: Story = {
  args: { variant: 'wide' },
  globals: { viewport: { value: 'desktop' } },
};

/**
 * Below 1024px, tablets included, the menu button takes over: the full row is
 * wider than a 768px screen in the longer languages.
 */
export const WideOnTablet: Story = {
  tags: ['!autodocs'],
  args: { variant: 'wide' },
  globals: { viewport: { value: 'tablet' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Open menu' })).toBeVisible();
    await expect(canvas.queryByRole('navigation', { name: 'Main' })).toBeNull();
  },
};

/** On phones, the same menu button as the simple header, with the call to action inside. */
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
