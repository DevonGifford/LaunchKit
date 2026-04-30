import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { home } from '@/content/en/pages/home';
import { findSection } from '@/lib/content/pages';
import { UseCasesSection } from './use-cases-section';

const meta = {
  title: 'Sections/Use cases',
  component: UseCasesSection,
  parameters: { layout: 'fullscreen' },
  args: findSection(home, 'use-cases'),
} satisfies Meta<typeof UseCasesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The homepage use cases, rendered from src/content/en/pages/home.ts. */
export const Default: Story = {};

export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };
