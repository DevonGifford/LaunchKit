import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { homeV1 } from '@/content/en/pages/home-v1';
import { findSection } from '@/lib/content/pages';
import { FeaturesSection } from './features-section';

const meta = {
  title: 'Sections/Features',
  component: FeaturesSection,
  parameters: { layout: 'fullscreen' },
  args: findSection(homeV1, 'features'),
} satisfies Meta<typeof FeaturesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };
