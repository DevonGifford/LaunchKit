import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { home } from '@/content/en/pages/home';
import { findSection } from '@/lib/content/pages';
import { CtaBandSection } from './cta-band-section';

const meta = {
  title: 'Sections/CTA/Band',
  component: CtaBandSection,
  parameters: { layout: 'fullscreen' },
  args: findSection(home, 'cta-band'),
} satisfies Meta<typeof CtaBandSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Full width on the high-emphasis surface. */
export const Default: Story = {};

export const WithoutSecondaryAction: Story = { args: { secondaryAction: undefined } };
