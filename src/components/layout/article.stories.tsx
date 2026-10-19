import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { sampleArticle } from '../../../tests/fixtures/docs';
import { Article } from './article';

const meta = {
  title: 'Layout/Article',
  component: Article,
  args: {
    content: sampleArticle,
    fallbackNotice: 'This guide isn’t available in Español yet, so it’s shown in English.',
    className: 'mx-auto max-w-3xl',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The long-form foundation shared by the docs, the legal pages and a future
 * blog: title, description, date and reading time, an optional AI executive
 * summary, then the Markdown text. The page around it sets the frame.
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent(
      'LaunchKit Quickstart',
    );
    await expect(canvas.getByText(/Updated October 17, 2026/)).toBeInTheDocument();
    await expect(canvas.getByRole('region', { name: 'AI executive summary' })).toBeVisible();
  },
};

/** Without a summary in its frontmatter, the text follows the header directly. */
export const WithoutSummary: Story = {
  tags: ['!autodocs'],
  args: { content: { ...sampleArticle, summary: undefined } },
};

/** Shown in another language than the page's: a notice says so, and the text is marked with its language. */
export const Fallback: Story = {
  tags: ['!autodocs'],
  args: { content: { ...sampleArticle, isFallback: true } },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('article')).toHaveAttribute('lang', 'en');
  },
};

export const Dark: Story = {
  tags: ['!autodocs'],
  globals: { theme: 'dark' },
};
