import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import type { SectionOf } from '@/lib/content/types';
import { MarketingPricing } from './marketing-pricing';

/**
 * Fixture copy until the section is placed on a page. The EUR, USD and ZAR
 * amounts are illustrative, set by hand from the GBP price.
 */
const section = {
  id: 'pricing',
  type: 'marketing-pricing',
  eyebrow: 'Pricing',
  title: 'Simple pricing for every stage.',
  description: 'Start with the LaunchKit foundation, then choose how much hands-on help you need.',
  currencies: ['GBP', 'EUR', 'USD', 'ZAR'],
  currencyNote: 'Choose your currency. Prices are set for each region.',
  plans: [
    {
      name: 'Build It Yourself',
      description: 'For founders, developers and teams using LaunchKit directly.',
      price: { amounts: { GBP: 0, EUR: 0, USD: 0, ZAR: 0 } },
      priceNote: 'open source',
      features: [
        'Reusable website foundation',
        'Themes and four languages',
        'Section-based content',
        'Forms, tests and CI',
      ],
      action: { label: 'Get started', href: '/docs/getting-started' },
    },
    {
      name: 'Built For You',
      description: 'We design and build your website with LaunchKit.',
      price: { amounts: { GBP: 1300, EUR: 1500, USD: 1700, ZAR: 30000 } },
      priceNote: 'starting price',
      features: [
        'Design for your brand',
        'Responsive build and launch',
        'Content structure and guidance',
        'A tested foundation underneath',
      ],
      action: { label: 'Book a call', href: '/contact' },
      recommended: true,
    },
    {
      name: 'Built to Grow',
      description: 'For teams that need custom features and ongoing support.',
      price: { label: 'Custom' },
      priceNote: 'ongoing',
      features: [
        'Custom features and integrations',
        'Ongoing improvements',
        'Maintenance and support',
        'A long-term engineering partner',
      ],
      action: { label: 'Talk to us', href: '/contact' },
    },
  ],
  callout: {
    title: 'Need something more?',
    description:
      'For larger builds, broader software work or dedicated engineering support, get in touch.',
    action: { label: 'Contact us', href: '/contact' },
  },
  // Facts about LaunchKit itself, not customer metrics: it has none to show yet.
  // Replace with real, verifiable proof before this goes on a page.
  proof: {
    title: 'LaunchKit at a glance',
    items: [
      { value: 'MIT', label: 'Open-source licence' },
      { value: '4', label: 'Languages built in' },
      { value: '0', label: 'Accounts needed to start' },
      { value: '5', label: 'CI checks on every pull request' },
    ],
  },
} satisfies SectionOf<'marketing-pricing'>;

const meta = {
  title: 'Sections/Marketing/Pricing',
  component: MarketingPricing,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof MarketingPricing>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Three plans in a row from 1024px, the recommended one ringed in champagne.
 * Changing the currency updates every fixed price; "Custom" stays as it is.
 */
export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Prices start in the first currency', async () => {
      await expect(canvas.getByText('£1,300')).toBeInTheDocument();
    });
    await step('Choosing another currency updates the prices', async () => {
      await userEvent.click(canvas.getByRole('combobox', { name: 'Currency' }));
      await userEvent.click(await screen.findByRole('option', { name: /^EUR/ }));
      await waitFor(() => expect(canvas.getByText('€1,500')).toBeInTheDocument());
      await expect(canvas.getAllByText('€0')).toHaveLength(1);
      await expect(canvas.getByText('Custom')).toBeInTheDocument();
    });
  },
};

/** A carousel that starts on the recommended plan, with the neighbours peeking in. */
export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

/** The same carousel on a phone; swipe, or use the buttons below it. */
export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** The Midnight appearance; story tests run axe in light, so this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };

/** Without the callout and the row of figures. */
export const PlansOnly: Story = { args: { callout: undefined, proof: undefined } };
