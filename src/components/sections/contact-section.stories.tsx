import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { contact } from '@/content/en/pages/contact';
import { findSection } from '@/lib/content/pages';
import { ContactSection } from './contact-section';

const meta = {
  title: 'Sections/Contact',
  component: ContactSection,
  parameters: { layout: 'fullscreen' },
  args: findSection(contact, 'contact'),
} satisfies Meta<typeof ContactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Contact details beside the reference form, from src/content/en/pages/contact.ts. */
export const Default: Story = {};

export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };
