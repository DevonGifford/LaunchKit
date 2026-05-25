import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { home } from '@/content/en/pages/home';
import { findSection } from '@/lib/content/pages';
import { MarketingDeveloperExperience } from './marketing-developer-experience';

const meta = {
  title: 'Sections/LaunchKit Marketing/Developer experience',
  component: MarketingDeveloperExperience,
  parameters: { layout: 'fullscreen' },
  // On the homepage already, so the story renders its real content.
  args: findSection(home, 'marketing-developer-experience'),
} satisfies Meta<typeof MarketingDeveloperExperience>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The homepage section, rendered from src/content/en/pages/home.ts: the stack beside the commands. */
export const Default: Story = {};

/** Below 1024px the terminal sits under the copy and the stack. */
export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

/** On phones long commands wrap inside the terminal. */
export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** The Midnight appearance; story tests run axe in light, so this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };
