import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import type { SectionOf } from '@/lib/content/types';
import { FaqSection } from './faq-section';

/** Fixture copy until the section is placed on a page. */
const section = {
  id: 'faq',
  type: 'faq',
  eyebrow: 'FAQ',
  title: 'Frequently asked questions',
  description: 'Anything else you might want to know before you start.',
  groups: [
    {
      title: 'General',
      items: [
        {
          question: 'What is LaunchKit?',
          answer:
            'A reusable Next.js foundation for building and launching websites: content-driven pages, ready-made sections, two themes, four languages and a full test setup.',
        },
        {
          question: 'Who is it for?',
          answer:
            'Founders, startups and agencies who start new sites often and want each one to begin from the same well-tested base.',
        },
        {
          question: 'Can I change the brand?',
          answer:
            'Yes. Colours and type live in one theme file, and every component follows it in light and dark.',
        },
        {
          question: 'Is it free to use?',
          answer:
            'Yes. LaunchKit is released under the MIT licence, for personal and commercial projects alike.',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          question: 'How do I add a page?',
          answer:
            'Add a content file for each language and register it. The page is rendered from typed sections, so a mistake is caught before it ships.',
        },
        {
          question: 'How do updates reach my project?',
          answer:
            'Projects started from LaunchKit pull upstream changes with Git, as the upstream sync guide describes.',
        },
        {
          question: 'Which languages are included?',
          answer:
            'English, Spanish, French and German. Adding another takes a message catalogue and a set of content files.',
        },
        {
          question: 'Can you build my site for me?',
          answer:
            'Yes. Get in touch through the contact page and we’ll talk through what you need.',
        },
      ],
    },
  ],
} satisfies SectionOf<'faq'>;

const meta = {
  title: 'Sections/FAQ',
  component: FaqSection,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof FaqSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The heading beside two groups of questions; one answer opens at a time per group. */
export const Default: Story = {};

/** Choosing a question opens its answer. */
export const OpensAnAnswer: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const question = canvas.getByRole('button', { name: 'Is it free to use?' });

    await step('opens an answer', async () => {
      await userEvent.click(question);
      await expect(question).toHaveAttribute('aria-expanded', 'true');
      await expect(canvas.getByText(/released under the MIT licence/)).toBeVisible();
    });
  },
};

/** Below 1024px the groups stack beside the heading. */
export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

/** On phones the heading sits above the questions. */
export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** Story tests run axe in the light theme; this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };
