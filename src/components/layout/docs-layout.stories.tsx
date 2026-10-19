import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { sampleArticle, sampleGuides, sampleNavigation } from '../../../tests/fixtures/docs';
import { DocsLayout } from './docs-layout';

const meta = {
  title: 'Layout/Docs layout',
  component: DocsLayout,
  parameters: {
    layout: 'fullscreen',
    nextjs: { navigation: { pathname: '/docs/getting-started' } },
  },
  args: {
    content: sampleArticle,
    sections: sampleNavigation,
    next: [sampleGuides.launching, sampleGuides.customizing],
    fallbackNotice: 'This guide isn’t available in Español yet, so it’s shown in English.',
  },
} satisfies Meta<typeof DocsLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A guide with the docs navigation in the margin to its left. The article
 * keeps its reading width, centred on wide screens, and the navigation stays
 * in view while it scrolls.
 */
export const Desktop: Story = {
  globals: { viewport: { value: 'desktop' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: 'Documentation' })).toBeVisible();
    // The small-screen button is hidden, so it isn't in the accessibility tree.
    await expect(canvas.queryByRole('button', { name: 'Browse guides' })).toBeNull();
  },
};

/** Below 1024px the column gives way to a button, and the article keeps the full width. */
export const Tablet: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'tablet' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('navigation', { name: 'Documentation' })).toBeNull();
    await expect(canvas.getByRole('button', { name: 'Browse guides' })).toBeVisible();
  },
};

/** On phones the reading experience is unchanged; the guides open in a sheet. */
export const Mobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Browse guides' }));
    const sheet = await within(document.body).findByRole('dialog', { name: 'Documentation' });
    await waitFor(() =>
      expect(within(sheet).getByRole('group', { name: 'Getting started' })).toBeVisible(),
    );
  },
};

export const Dark: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'desktop' }, theme: 'dark' },
};
