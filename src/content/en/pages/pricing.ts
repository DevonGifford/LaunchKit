import type { PageDefinition, SectionOf } from '@/lib/content/types';

/** Currencies the plans are priced in; the first is the default. */
export const pricingCurrencies = [
  'GBP',
  'EUR',
  'USD',
  'ZAR',
] satisfies SectionOf<'pricing'>['currencies'];

/**
 * The plans, shared with the homepage's pricing section so prices are set in
 * one place. The EUR, USD and ZAR amounts are set by hand from the GBP price.
 */
export const pricingPlans = [
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
] satisfies SectionOf<'pricing'>['plans'];

/** Placeholder client wordmarks in public/marketing/clients/, from the marquee story's fixtures. */
const client = (name: string, file: string, width: number) => ({
  name,
  src: `/marketing/clients/${file}.svg`,
  width,
  height: 40,
});

/**
 * The Pricing page: every plan in full, then proof, the questions people ask
 * before choosing, and a quiet invitation to talk. English first; the other locales show a coming-soon
 * placeholder until it is translated.
 */
export const pricing = {
  meta: {
    title: 'Pricing',
    description:
      'Start free with the LaunchKit foundation, or have your website designed, built and grown with you.',
  },
  sections: [
    {
      // The pricing fixture in full. Its own compact heading opens the page, so
      // the plans start close to the top.
      id: 'plans',
      type: 'pricing',
      eyebrow: 'Pricing',
      title: 'Simple pricing for every stage.',
      description:
        'Start free with the foundation, or let us design, build and grow your website with you.',
      currencies: pricingCurrencies,
      currencyNote: 'Choose your currency. Prices are set for each region.',
      plans: pricingPlans,
      callout: {
        title: 'Need something more?',
        description:
          'For larger builds, broader software work or dedicated engineering support, get in touch.',
        action: { label: 'Contact us', href: '/contact' },
      },
      // Facts about LaunchKit itself, not customer metrics: it has none to show yet.
      proof: {
        title: 'LaunchKit at a glance',
        items: [
          { value: 'MIT', label: 'Open-source licence' },
          { value: '4', label: 'Languages built in' },
          { value: '0', label: 'Accounts needed to start' },
          { value: '5', label: 'Required CI checks on every pull request' },
        ],
      },
    },
    {
      // Placeholders: invented companies from the marquee fixture. Replace them
      // with real clients, or remove the section, before launch.
      id: 'clients',
      type: 'marquee',
      title: 'Trusted by teams at',
      items: [
        client('Brightfold', 'brightfold', 168),
        client('Quillmark', 'quillmark', 172),
        client('Fernvale', 'fernvale', 156),
        client('Kitewell', 'kitewell', 150),
        client('Lumora', 'lumora', 132),
        client('Northpine', 'northpine', 170),
      ],
    },
    {
      id: 'faq',
      type: 'faq',
      eyebrow: 'FAQ',
      title: 'Questions about pricing',
      description: 'Choosing a plan, and what happens once your site is live.',
      groups: [
        {
          title: 'Choosing a plan',
          items: [
            {
              question: 'Which plan is right for me?',
              answer:
                'Build It Yourself if you or your team will develop the site, Built For You if you want us to design and build it, and Built to Grow if you need custom features and ongoing support.',
            },
            {
              question: 'What does “starting price” mean?',
              answer:
                'It’s where a typical Built For You website begins. The final price depends on the pages and features you need, and you’ll know it before any work starts.',
            },
            {
              question: 'Why is Built to Grow priced as custom?',
              answer:
                'Custom features and ongoing support vary from team to team, so the price is shaped around what you need. Get in touch to talk it through.',
            },
            {
              question: 'Why can I choose a currency?',
              answer:
                'Prices are set by hand for each region rather than converted live, so they stay round and don’t change with exchange rates.',
            },
          ],
        },
        {
          title: 'After launch',
          items: [
            {
              question: 'Can I start on my own and get help later?',
              answer:
                'Yes. Every plan uses the same foundation, so a site you started yourself can move to Built For You or Built to Grow without starting again.',
            },
            {
              question: 'Where will my site be hosted?',
              answer:
                'Wherever suits you. A LaunchKit site is a standard Next.js application, so it runs on Vercel or any host that supports Next.js.',
            },
            {
              question: 'Will my site keep improving?',
              answer:
                'Improvements to LaunchKit reach your site when you choose to merge them, through Git. Built to Grow adds ongoing improvements made for your site specifically.',
            },
          ],
        },
      ],
    },
    {
      // A quiet close for anyone who read this far: the plans' buttons are well above.
      id: 'talk',
      type: 'cta-panel',
      title: 'Still deciding?',
      description:
        'Tell us about your project and we’ll help you choose the plan that fits, or start on your own today.',
      primaryAction: { label: 'Get in Contact', href: '/contact' },
      secondaryAction: { label: 'Start for free', href: '/docs/getting-started' },
    },
  ],
} satisfies PageDefinition;
