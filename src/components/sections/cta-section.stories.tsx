import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { home } from '@/content/en/pages/home';
import { findSection } from '@/lib/content/pages';
import { CtaSection } from './cta-section';

const meta = {
  title: 'Sections/Call to action',
  component: CtaSection,
  parameters: { layout: 'fullscreen' },
  args: findSection(home, 'cta'),
} satisfies Meta<typeof CtaSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutSecondaryAction: Story = { args: { secondaryAction: undefined } };
