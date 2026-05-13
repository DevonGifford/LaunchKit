import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { MarketingCinematicHero } from './marketing-cinematic-hero';

/**
 * The reference's copy and image sequence, unchanged, for a proof of concept.
 * The 192 frames live in public/marketing/cinematic-hero/sequence/.
 */
const section = {
  id: 'cinematic-hero',
  type: 'marketing-cinematic-hero',
  title: 'Carry Your Own Story.',
  description:
    'Custom totebags designed for daily movement, personal identity, and quiet confidence.',
  action: { label: 'Customize Now', href: '/contact' },
  loadingLabel: 'Preparing your canvas',
  sequence: {
    directory: '/marketing/cinematic-hero/sequence',
    frames: 192,
    extension: 'jpg',
    alt: 'A black tote bag printed “CUSTOM” assembles from ribbons of fabric in mid-air.',
  },
} satisfies SectionOf<'marketing-cinematic-hero'>;

const meta = {
  title: 'Sections/Marketing/Cinematic Hero',
  component: MarketingCinematicHero,
  // A four-screen sticky section can't play inline on a docs page.
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
  args: section,
  decorators: [
    (Story) => (
      <>
        <Story />
        {/* The page after the section, so it is clear where the section ends. */}
        <div className="relative z-10 min-h-svh border-t bg-background">
          <Container className="space-y-4 py-24">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              After the cinematic section
            </p>
            <p className="max-w-xl text-lede text-muted-foreground">
              The sequence has finished and normal page content continues here. Scroll back up to
              play it in reverse.
            </p>
          </Container>
        </div>
      </>
    ),
  ],
} satisfies Meta<typeof MarketingCinematicHero>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Scroll the canvas: the frames play with the scroll, and the headline fades in near the end. */
export const Default: Story = {};
