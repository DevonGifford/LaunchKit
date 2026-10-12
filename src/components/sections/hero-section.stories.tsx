import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { contact } from '@/content/en/pages/contact';
import { home } from '@/content/en/pages/home';
import { findSection } from '@/lib/content/pages';
import { HeroSection } from './hero-section';

const meta = {
  title: 'Sections/Hero',
  component: HeroSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The homepage hero, rendered from src/content/en/pages/home.ts. */
export const WithPreview: Story = { args: findSection(home, 'hero') };

/** Without actions or preview, the hero doubles as a page header. */
export const PageHeader: Story = { args: findSection(contact, 'hero') };

export const OnMobile: Story = {
  args: findSection(home, 'hero'),
  globals: { viewport: { value: 'mobile' } },
};
