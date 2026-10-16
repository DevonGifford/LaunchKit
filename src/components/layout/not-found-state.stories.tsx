import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NotFoundState } from './not-found-state';

const meta = {
  title: 'Layout/Not found',
  component: NotFoundState,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof NotFoundState>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The 404 page, built from the basic hero. */
export const Default: Story = {};

export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** Story tests run axe in the light theme; this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };
