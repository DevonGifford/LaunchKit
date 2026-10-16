import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import type { SectionOf } from '@/lib/content/types';
import { MarqueeSection } from './marquee-section';

/** Stand-in logos from tests/fixtures/logos/, which Storybook serves at /fixtures/logos/. */
const logo = (name: string, file: string, width: number, height: number) => ({
  name,
  src: `/fixtures/logos/${file}.svg`,
  width,
  height,
});

const clients = [
  logo('Brightfold', 'brightfold', 168, 40),
  logo('Quillmark', 'quillmark', 172, 40),
  logo('Fernvale', 'fernvale', 156, 40),
  logo('Kitewell', 'kitewell', 150, 40),
  logo('Lumora', 'lumora', 132, 40),
  logo('Northpine', 'northpine', 170, 40),
];

const partners = clients.map((client) => ({
  ...client,
  href: `https://example.com/${client.name.toLowerCase()}`,
}));

const technologies = [
  logo('Next.js', 'nextjs', 24, 24),
  logo('React', 'react', 24, 24),
  logo('TypeScript', 'typescript', 24, 24),
  logo('Tailwind CSS', 'tailwindcss', 24, 24),
  logo('Zod', 'zod', 24, 24),
  logo('Vitest', 'vitest', 24, 24),
  logo('Storybook', 'storybook', 24, 24),
  logo('pnpm', 'pnpm', 24, 24),
];

/** Fixture copy until the section is placed on a page. */
const section = {
  id: 'clients',
  type: 'marquee',
  title: 'Trusted by teams at',
  items: clients,
} satisfies SectionOf<'marquee'>;

const meta = {
  title: 'Sections/Marquee',
  component: MarqueeSection,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof MarqueeSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The moving row, the first list in it and the copy that follows. */
function parts(canvasElement: HTMLElement) {
  const [row, copy] = canvasElement.querySelectorAll('ul');
  const track = row?.parentElement;
  if (!row || !copy || !track) throw new Error('The marquee has not rendered');
  return { row, copy, track };
}

/** Client logos drifting left, muted, fading in and out at the edges. */
export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { row, copy, track } = parts(canvasElement);

    await step('The logo files load', async () => {
      const response = await fetch('/fixtures/logos/brightfold.svg');
      await expect(response.ok).toBe(true);
    });

    await step('Each logo is announced once; the copies are hidden', async () => {
      await expect(canvas.getAllByRole('img')).toHaveLength(section.items.length);
    });

    await step('The seam between copies matches the gap between logos', async () => {
      const logos = row.querySelectorAll('li');
      const first = logos[0]?.getBoundingClientRect();
      const second = logos[1]?.getBoundingClientRect();
      const last = logos[logos.length - 1]?.getBoundingClientRect();
      const next = copy.querySelector('li')?.getBoundingClientRect();
      if (!first || !second || !last || !next) throw new Error('Logos missing');
      await expect(Math.abs(next.left - last.right - (second.left - first.right))).toBeLessThan(1);
    });

    await step('One loop moves the row by exactly one copy', async () => {
      const [animation] = track.getAnimations();
      const duration = Number(animation?.effect?.getComputedTiming().duration);
      if (!animation) throw new Error('The row is not moving');
      // Seek halfway without pausing, so the story keeps responding to the pointer.
      animation.currentTime = 0;
      const start = track.getBoundingClientRect().left;
      animation.currentTime = duration / 2;
      const moved = start - track.getBoundingClientRect().left;
      await expect(Math.abs(moved - row.getBoundingClientRect().width / 2)).toBeLessThan(1);
    });

    await step('It drifts, with no pause button', async () => {
      await expect(getComputedStyle(track).animationName).toBe('marquee');
      await expect(getComputedStyle(track).animationPlayState).toBe('running');
      await expect(canvas.queryByRole('button')).toBeNull();
    });
  },
};

/** Square marks drift the other way, more slowly. */
export const TechnologyLogos: Story = {
  args: {
    id: 'stack',
    title: 'Built with tools you already know',
    items: technologies,
    direction: 'right',
    speed: 'slow',
  },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(parts(canvasElement).track).animationDirection).toBe('reverse');
  },
};

/** Client or partner logos, each linking to its site; focusing one stops the drift. */
export const PartnerLogos: Story = {
  args: { id: 'partners', title: 'Our partners', items: partners },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole('link', { name: 'Brightfold' })).toHaveFocus();
    await waitFor(() =>
      expect(getComputedStyle(parts(canvasElement).track).animationPlayState).toBe('paused'),
    );
  },
};

/** Too few logos to fill the strip: each copy stretches to its width, so the loop has no gap. */
export const FewLogos: Story = {
  args: { title: undefined, items: clients.slice(0, 3) },
  play: async ({ canvasElement }) => {
    const { row, track } = parts(canvasElement);
    const strip = track.parentElement?.clientWidth ?? Infinity;
    await expect(row.getBoundingClientRect().width).toBeGreaterThanOrEqual(strip - 1);
  },
};

/**
 * Smaller logos and gaps, here with links. The page never scrolls sideways, and
 * tabbing to a logo out of view brings it in without opening a gap in the loop.
 */
export const OnMobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
  args: { items: partners },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { row, track } = parts(canvasElement);
    const strip = track.parentElement;
    if (!strip) throw new Error('The strip has not rendered');

    await step('The page does not scroll sideways', async () => {
      const page = canvasElement.ownerDocument.documentElement;
      await expect(page.scrollWidth).toBeLessThanOrEqual(page.clientWidth);
    });

    await step('Tabbing to the last logo brings it into view', async () => {
      for (const _ of partners) await userEvent.tab();
      const last = canvas.getByRole('link', { name: 'Northpine' });
      await expect(last).toHaveFocus();
      const logo = last.getBoundingClientRect();
      const box = strip.getBoundingClientRect();
      await expect(logo.right).toBeGreaterThan(box.left);
      await expect(logo.left).toBeLessThan(box.right);
    });

    await step('The loop still has no gap', async () => {
      // At the end of a loop, the visible window must still fall inside the track.
      const loopEnd = strip.scrollLeft + row.getBoundingClientRect().width + strip.clientWidth;
      await expect(loopEnd).toBeLessThanOrEqual(track.getBoundingClientRect().width + 1);
    });
  },
};

/** The Midnight appearance; story tests run axe in light, so this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };
