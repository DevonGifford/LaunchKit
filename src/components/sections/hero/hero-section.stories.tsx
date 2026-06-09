import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { contact } from '@/content/en/pages/contact';
import { homeV1 } from '@/content/en/pages/home-v1';
import { findSection } from '@/lib/content/pages';
import { HeroSection } from './hero-section';

const meta = {
  title: 'Sections/Hero/Basic',
  component: HeroSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The previous homepage's hero, rendered from src/content/en/pages/home-v1.ts. */
export const WithPreview: Story = { args: findSection(homeV1, 'hero') };

/** Without actions or preview, the hero doubles as a page header. */
export const PageHeader: Story = { args: findSection(contact, 'hero') };

export const OnMobile: Story = {
  args: findSection(homeV1, 'hero'),
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
};
