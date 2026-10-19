import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { sampleNavSections } from '../../../tests/fixtures/docs';
import { DocsNav, DocsNavSheet } from './docs-nav';

const meta = {
  title: 'Layout/Docs navigation',
  component: DocsNav,
  args: { sections: sampleNavSections, label: 'Documentation', className: 'max-w-60' },
  // The current guide comes from the URL.
  parameters: { nextjs: { navigation: { pathname: '/docs/getting-started' } } },
} satisfies Meta<typeof DocsNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Guides grouped into sections, from src/config/docs-navigation.ts, with the
 * current one marked. Beside each guide from 1024px.
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole('navigation', { name: 'Documentation' });
    await expect(within(nav).getByRole('link', { name: 'LaunchKit Quickstart' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(within(nav).getByRole('group', { name: 'Building' })).toBeVisible();
  },
};

/** The mark follows the guide being read, in whichever section it sits. */
export const CurrentInLaterSection: Story = {
  tags: ['!autodocs'],
  parameters: { nextjs: { navigation: { pathname: '/docs/building-with-ai' } } },
  play: async ({ canvasElement }) => {
    const group = within(canvasElement).getByRole('group', { name: 'Building' });
    await expect(
      within(group).getByRole('link', { name: 'LaunchKit AI Integrations' }),
    ).toHaveAttribute('aria-current', 'page');
  },
};

/** One section is enough; the layout doesn't depend on how many there are. */
export const SingleSection: Story = {
  tags: ['!autodocs'],
  args: { sections: sampleNavSections.slice(0, 1) },
};

export const Dark: Story = {
  tags: ['!autodocs'],
  globals: { theme: 'dark' },
};

const sheetLabels = {
  browse: 'Browse guides',
  title: 'Documentation',
  description: 'Every guide, grouped by topic.',
  close: 'Close',
};

/**
 * Below 1024px the navigation waits behind a button at the top of the guide,
 * and opens in a sheet that closes once a guide is chosen.
 */
export const CompactOnMobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
  render: (args) => <DocsNavSheet sections={args.sections} labels={sheetLabels} />,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Browse guides' }));
    const sheet = await within(document.body).findByRole('dialog', { name: 'Documentation' });
    const current = within(sheet).getByRole('link', { name: 'LaunchKit Quickstart' });
    await expect(current).toHaveAttribute('aria-current', 'page');

    await userEvent.click(within(sheet).getByRole('link', { name: 'Customizing LaunchKit' }));
    await waitFor(() => expect(sheet).not.toBeInTheDocument());
  },
};
