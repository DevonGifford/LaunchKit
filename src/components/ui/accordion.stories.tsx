import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

const faqs = [
  {
    value: 'what',
    question: 'What is LaunchKit?',
    answer: 'A reusable Next.js foundation for building and launching websites.',
  },
  {
    value: 'update',
    question: 'How do projects get updates?',
    answer:
      'Each project merges tagged LaunchKit releases, with migration notes for any breaking change.',
  },
  {
    value: 'brand',
    question: 'Can I change the brand?',
    answer: 'Yes. Edit the tokens in src/app/theme.css and every component follows.',
  },
];

function Faqs(props: React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion {...props}>
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

// Accordion's props are a union (single or multiple), so each story renders explicitly.
const meta = {
  title: 'UI/Content/Accordion',
  component: Accordion,
  args: { type: 'single' },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;
// Accordion props are a union, which Storybook can't infer story args from.
type Story = StoryObj;

/** One section open at a time. Triggers are buttons with aria-expanded. */
export const Single: Story = {
  render: () => <Faqs type="single" collapsible defaultValue="what" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Can I change the brand?' });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByRole('button', { name: 'What is LaunchKit?' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  },
};

/** Several sections open together. */
export const Multiple: Story = {
  render: () => <Faqs type="multiple" defaultValue={['what', 'brand']} />,
};

export const Disabled: Story = {
  render: () => <Faqs type="single" collapsible defaultValue="what" disabled />,
};
