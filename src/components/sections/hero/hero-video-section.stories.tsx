import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import type { SectionOf } from '@/lib/content/types';
import { HeroVideoSection } from './hero-video-section';

/**
 * Fixture copy until the section is placed on a page. The video and its poster
 * live in public/marketing/videos/; docs/video.md explains how they were made.
 */
const section = {
  id: 'hero',
  type: 'hero-video',
  eyebrow: 'For teams with ideas to launch',
  title: 'Start every website on proven ground.',
  description:
    'LaunchKit gives each new idea the same tested foundation: a design system, four languages, typed content and checks that run before anything ships.',
  primaryAction: { label: 'Get started', href: '/docs/getting-started' },
  secondaryAction: { label: 'See the examples', href: '/examples' },
  video: {
    src: '/marketing/videos/office-timelapse.mp4',
    mobileSrc: '/marketing/videos/office-timelapse-mobile.mp4',
    poster: '/marketing/videos/office-timelapse-poster.webp',
  },
} satisfies SectionOf<'hero-video'>;

const meta = {
  title: 'Sections/Hero/Video',
  component: HeroVideoSection,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof HeroVideoSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The video, once its first frame has played over the poster. */
const playingVideo = async (canvasElement: HTMLElement) => {
  const video = canvasElement.querySelector('video');
  await waitFor(() => expect(video).toHaveAttribute('data-started'), { timeout: 5000 });
  return video;
};

/** Whether the hero fills the screen under the 4rem header, without scrolling sideways. */
const fillsScreen = async (canvasElement: HTMLElement) => {
  const hero = canvasElement.querySelector('section')?.getBoundingClientRect();
  const page = canvasElement.ownerDocument.documentElement;
  await expect(hero?.height).toBeGreaterThanOrEqual(page.clientHeight - 64);
  await expect(page.scrollWidth).toBeLessThanOrEqual(page.clientWidth);
};

/**
 * The copy straight on the video, over a wash that keeps it at AA contrast. The
 * video is muted, loops and has no controls, only a pause button in the corner.
 */
export const Overlay: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent(section.title);
    // The i18n Link adds the locale to internal paths.
    await expect(canvas.getByRole('link', { name: 'Get started' })).toHaveAttribute(
      'href',
      '/en/docs/getting-started',
    );
    const video = await playingVideo(canvasElement);
    await expect(video).toHaveAttribute('aria-hidden', 'true');
    await expect(video).not.toHaveAttribute('controls');
    await expect([video?.muted, video?.loop, video?.playsInline]).toEqual([true, true, true]);
    await userEvent.click(canvas.getByRole('button', { name: 'Pause background video' }));
    await expect(video?.paused).toBe(true);
    await userEvent.click(canvas.getByRole('button', { name: 'Play background video' }));
    await waitFor(() => expect(video?.paused).toBe(false));
  },
};

/** The copy in a panel on the surface colour, so the video needs only a light wash. */
export const Card: Story = {
  args: { variant: 'card' },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('heading', { level: 1 })).toBeVisible();
    await playingVideo(canvasElement);
  },
};

/** A wide screen: the wash thins towards the right, and the full-width file plays. */
export const Desktop: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'desktop' } },
  play: async ({ canvasElement }) => {
    await fillsScreen(canvasElement);
    const video = await playingVideo(canvasElement);
    await expect(video?.currentSrc).toMatch(/\/office-timelapse\.mp4$/);
  },
};

/** The card on a wide screen. */
export const CardDesktop: Story = {
  tags: ['!autodocs'],
  args: { variant: 'card' },
  globals: { viewport: { value: 'desktop' } },
  play: async ({ canvasElement }) => fillsScreen(canvasElement),
};

/** Tablets get an even wash, since the copy may run across the screen. */
export const Tablet: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'tablet' } },
  play: async ({ canvasElement }) => fillsScreen(canvasElement),
};

/** Phones play the lighter portrait cut of the video. */
export const OnMobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    await fillsScreen(canvasElement);
    const video = await playingVideo(canvasElement);
    await expect(video?.currentSrc).toMatch(/\/office-timelapse-mobile\.mp4$/);
  },
};

/** The card on phones, across the bottom of the screen. */
export const CardOnMobile: Story = {
  tags: ['!autodocs'],
  args: { variant: 'card' },
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => fillsScreen(canvasElement),
};

/** The Midnight appearance; story tests run axe in light, so this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

/** The card in the Midnight appearance. */
export const CardDark: Story = {
  tags: ['!autodocs'],
  args: { variant: 'card' },
  globals: { theme: 'dark' },
};

/**
 * With reduced motion the video never starts or loads: the poster stands in,
 * and the button offers to play it. Storybook can't change the system setting,
 * so this story answers the media query itself.
 */
export const ReducedMotion: Story = {
  tags: ['!autodocs'],
  beforeEach: () => {
    const matchMedia = window.matchMedia.bind(window);
    window.matchMedia = (query) => {
      const list = matchMedia(query);
      return query === '(prefers-reduced-motion: reduce)'
        ? Object.defineProperty(list, 'matches', { value: true })
        : list;
    };
    return () => {
      window.matchMedia = matchMedia;
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByRole('button', { name: 'Play background video' }),
    ).toBeVisible();
    const video = canvasElement.querySelector('video');
    await expect(video?.paused).toBe(true);
    await expect(video?.readyState).toBe(HTMLMediaElement.HAVE_NOTHING);
    await expect(video).not.toHaveAttribute('data-started');
    await expect(canvasElement.querySelector('img')).toBeVisible();
  },
};
