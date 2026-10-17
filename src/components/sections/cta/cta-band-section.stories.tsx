import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { homeV1 } from '@/content/en/pages/home-v1';
import { findSection } from '@/lib/content/pages';
import { CtaBandSection } from './cta-band-section';

const meta = {
  title: 'Sections/CTA/Band',
  component: CtaBandSection,
  parameters: { layout: 'fullscreen' },
  args: findSection(homeV1, 'cta-band'),
} satisfies Meta<typeof CtaBandSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Full width on the high-emphasis surface. */
export const Default: Story = {};

export const WithoutSecondaryAction: Story = { args: { secondaryAction: undefined } };
