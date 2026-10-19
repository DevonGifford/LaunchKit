import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { sampleSearchIndex } from '../../../tests/fixtures/search';
import { SearchTrigger, SiteSearch } from './site-search';

const meta = {
  title: 'Layout/Site search',
  component: SearchTrigger,
  args: { variant: 'field' },
  argTypes: { variant: { control: 'inline-radio', options: ['field', 'icon'] } },
  // A fixed index, so stories don't fetch /en/search-index.json.
  decorators: [
    (Story) => (
      <SiteSearch siteName="LaunchKit" index={sampleSearchIndex}>
        <Story />
      </SiteSearch>
    ),
  ],
} satisfies Meta<typeof SearchTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

const openSearch = async (canvasElement: HTMLElement, name: string | RegExp = /Search/) => {
  await userEvent.click(within(canvasElement).getByRole('button', { name }));
  return within(document.body).findByRole('dialog', { name: 'Search' });
};

const selectedOption = (dialog: HTMLElement) =>
  within(dialog)
    .getAllByRole('option')
    .find((option) => option.getAttribute('aria-selected') === 'true');

/**
 * The wide header's search field, from 1280px. It's a button that opens
 * search; the shortcut hint (⌘K on Apple devices, Ctrl K elsewhere) appears
 * once the page knows which.
 */
export const Field: Story = {};

/** The compact button for narrower header rows and phones. */
export const Icon: Story = { args: { variant: 'icon' } };

/** Before anything is typed, search offers every page and guide. */
export const Open: Story = {
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const dialog = await openSearch(canvasElement);
    await expect(within(dialog).getByRole('group', { name: 'Pages' })).toBeInTheDocument();
    await expect(within(dialog).getByRole('group', { name: 'Documentation' })).toBeInTheDocument();
  },
};

/**
 * Results match words anywhere in the page, grouped by kind, best first, with
 * the matching words marked. A section shows its page beneath its heading.
 */
export const Results: Story = {
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const dialog = await openSearch(canvasElement);
    await userEvent.type(within(dialog).getByRole('combobox'), 'accessibility');
    await waitFor(() =>
      expect(selectedOption(dialog)).toHaveTextContent(
        'Everything a new site needs, already built.',
      ),
    );
    await expect(within(dialog).getByRole('group', { name: 'Documentation' })).toBeInTheDocument();
  },
};

/** Arrow keys move the selection; Enter opens it. */
export const KeyboardSelection: Story = {
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const dialog = await openSearch(canvasElement);
    await userEvent.type(within(dialog).getByRole('combobox'), 'storybook');
    await waitFor(() =>
      expect(selectedOption(dialog)).toHaveTextContent('Storybook, the workbench'),
    );
    await userEvent.keyboard('{ArrowDown}');
    await expect(selectedOption(dialog)).toHaveTextContent('What you get');
  },
};

/** Opened with the keyboard shortcut, from anywhere on the page. */
export const Shortcut: Story = {
  tags: ['!autodocs'],
  play: async () => {
    const apple = /mac|iphone|ipad/i.test(navigator.platform);
    await userEvent.keyboard(apple ? '{Meta>}k{/Meta}' : '{Control>}k{/Control}');
    await expect(
      await within(document.body).findByRole('dialog', { name: 'Search' }),
    ).toBeInTheDocument();
  },
};

export const NoResults: Story = {
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const dialog = await openSearch(canvasElement);
    await userEvent.type(within(dialog).getByRole('combobox'), 'zebra');
    await expect(await within(dialog).findByText('No results for “zebra”.')).toBeInTheDocument();
  },
};

export const Mobile: Story = {
  tags: ['!autodocs'],
  args: { variant: 'icon' },
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    const dialog = await openSearch(canvasElement, 'Search');
    await userEvent.type(within(dialog).getByRole('combobox'), 'pricing');
    await waitFor(() => expect(selectedOption(dialog)).toHaveTextContent('Pricing'));
  },
};

export const Dark: Story = {
  tags: ['!autodocs'],
  globals: { theme: 'dark' },
  play: async ({ canvasElement }) => {
    const dialog = await openSearch(canvasElement);
    await userEvent.type(within(dialog).getByRole('combobox'), 'launchkit');
  },
};
