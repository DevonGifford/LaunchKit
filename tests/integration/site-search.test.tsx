import { beforeEach, expect, test, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { SearchTrigger, SiteSearch } from '@/components/layout/site-search';
import { sampleSearchIndex } from '../fixtures/search';
import { axeViolations, renderWithIntl } from './utils';

const router = vi.hoisted(() => ({ push: vi.fn() }));

// The real router needs Next.js; results only need to say where they lead.
vi.mock('@/i18n/navigation', () => ({ useRouter: () => router }));

// Chromium in the test runner isn't an Apple platform, so the shortcut is Ctrl+K.
const shortcut = '{Control>}k{/Control}';

function renderSearch() {
  return renderWithIntl(
    <SiteSearch siteName="LaunchKit" index={sampleSearchIndex}>
      <SearchTrigger />
      <SearchTrigger variant="icon" />
      <label>
        Your name <input />
      </label>
    </SiteSearch>,
  );
}

const dialog = () => page.getByRole('dialog', { name: 'Search' });
const input = () => dialog().getByRole('combobox');
const selected = () => dialog().getByRole('option', { selected: true });
const selectedText = () => selected().element().textContent;

beforeEach(() => {
  router.push.mockClear();
});

test('opens from the search field, offering every page and guide', async () => {
  await renderSearch();
  const field = page.getByRole('button', { name: 'Search…' });
  await expect.element(field).toHaveAttribute('aria-keyshortcuts', 'Control+K');
  // The visible hint, beside the shortcut the button announces.
  await expect.poll(() => field.element().textContent).toContain('Ctrl');

  await field.click();
  await expect.element(input()).toHaveFocus();
  await expect.element(input()).toHaveAttribute('placeholder', 'Search LaunchKit…');
  await expect.element(dialog().getByRole('group', { name: 'Pages' })).toBeVisible();
  await expect.element(dialog().getByRole('group', { name: 'Documentation' })).toBeVisible();
});

test('lists pages by name alone, and guides with their description', async () => {
  await renderSearch();
  await page.getByRole('button', { name: 'Search…' }).click();
  const pages = dialog().getByRole('group', { name: 'Pages' });
  const docs = dialog().getByRole('group', { name: 'Documentation' });
  await expect.element(pages).toBeVisible();

  expect(
    pages
      .getByRole('option')
      .elements()
      .map((option) => option.textContent),
  ).toEqual(['Home', 'Pricing']);
  expect(docs.getByRole('option').first().element().textContent).toContain(
    'how to go from a fresh clone to a running site',
  );
});

test('Escape closes it and puts focus back on the button', async () => {
  await renderSearch();
  const button = page.getByRole('button', { name: 'Search', exact: true });
  await button.click();
  await expect.element(input()).toHaveFocus();

  await userEvent.keyboard('{Escape}');
  await expect.element(dialog()).not.toBeInTheDocument();
  await expect.element(button).toHaveFocus();
});

test('opens with Ctrl+K, and closes back to where focus was', async () => {
  await renderSearch();
  const button = page.getByRole('button', { name: 'Search', exact: true });
  await userEvent.click(button);
  await userEvent.keyboard('{Escape}');
  await expect.element(button).toHaveFocus();

  await userEvent.keyboard(shortcut);
  await expect.element(input()).toHaveFocus();
  await userEvent.keyboard('{Escape}');
  await expect.element(button).toHaveFocus();
});

test('leaves Ctrl+K alone while someone types in another field', async () => {
  await renderSearch();
  await page.getByLabelText('Your name').click();
  await userEvent.keyboard(shortcut);
  await expect.element(dialog()).not.toBeInTheDocument();
});

test('ranks results as you type, and Enter opens the best one', async () => {
  await renderSearch();
  await page.getByRole('button', { name: 'Search…' }).click();
  await userEvent.type(input(), 'storybook');

  await expect.poll(selectedText).toContain('Storybook, the workbench');
  await userEvent.keyboard('{Enter}');
  await expect.element(dialog()).not.toBeInTheDocument();
  // Once the dialog has gone, so an anchor on the same page can scroll.
  await expect
    .poll(() => router.push.mock.calls)
    .toEqual([['/docs/component-library#storybook-the-workbench']]);
});

test('shows each guide once, with the section that matched beneath its title', async () => {
  await renderSearch();
  await page.getByRole('button', { name: 'Search…' }).click();
  await userEvent.type(input(), 'storybook');
  await expect.poll(selectedText).toContain('Storybook, the workbench');

  const options = dialog().getByRole('group', { name: 'Documentation' }).getByRole('option');
  const texts = options.elements().map((option) => option.textContent ?? '');
  expect(texts[0]?.startsWith('LaunchKit Design SystemStorybook, the workbench')).toBe(true);
  expect(texts.filter((text) => text.startsWith('LaunchKit Design System'))).toHaveLength(1);
});

test('arrow keys choose another result', async () => {
  await renderSearch();
  await page.getByRole('button', { name: 'Search…' }).click();
  await userEvent.type(input(), 'storybook');
  await expect.poll(selectedText).toContain('Storybook, the workbench');

  await userEvent.keyboard('{ArrowDown}');
  await expect.poll(selectedText).toContain('What you get');
  await userEvent.keyboard('{Enter}');
  await expect.poll(() => router.push.mock.calls).toEqual([['/docs/getting-started#what-you-get']]);
});

const statusText = () => dialog().getByRole('status').element().textContent;

test('says so when nothing matches, and suggests what to try', async () => {
  await renderSearch();
  await page.getByRole('button', { name: 'Search…' }).click();
  await userEvent.type(input(), 'zebra');

  await expect.poll(statusText).toContain('No results for “zebra”.');
  expect(statusText()).toContain('Check the spelling, or try a broader word.');
  await expect.element(dialog().getByRole('listbox')).not.toBeInTheDocument();
});

test('offers the contact page when nothing matches', async () => {
  await renderSearch();
  await page.getByRole('button', { name: 'Search…' }).click();
  await userEvent.type(input(), 'zebra');
  await expect
    .element(dialog().getByText('Not finding what you’re looking for? Tell us what you need.'))
    .toBeVisible();

  await dialog().getByRole('button', { name: 'Get in touch' }).click();
  await expect.element(dialog()).not.toBeInTheDocument();
  await expect.poll(() => router.push.mock.calls).toEqual([['/contact']]);
});

test('has no accessibility violations, with results or without', async () => {
  await renderSearch();
  await page.getByRole('button', { name: 'Search…' }).click();
  await userEvent.type(input(), 'accessibility');
  await expect.element(selected()).toBeVisible();
  // Contrast is only meaningful once the dialog has finished fading in.
  await expect.poll(() => document.getAnimations().length).toBe(0);
  expect(await axeViolations(document.body)).toEqual([]);

  await userEvent.clear(input());
  await userEvent.type(input(), 'zebra');
  await expect.poll(statusText).toContain('No results for “zebra”.');
  expect(await axeViolations(document.body)).toEqual([]);
});
