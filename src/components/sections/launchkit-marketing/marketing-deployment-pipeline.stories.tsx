import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { SectionOf } from '@/lib/content/types';
import { MarketingDeploymentPipeline } from './marketing-deployment-pipeline';

/** Fixture copy until the section is placed on a page. */
const section = {
  id: 'infrastructure',
  type: 'marketing-deployment-pipeline',
  eyebrow: 'Deployment pipeline',
  title: 'Infrastructure that grows with you.',
  description:
    'One push takes a change from your branch to production, on infrastructure that scales with demand.',
  items: [
    {
      icon: 'globe',
      title: 'Deploy anywhere',
      description: 'Built on portable web standards, with deployment kept simple.',
    },
    {
      icon: 'trending-up',
      title: 'Auto-scaling',
      description: 'Designed for serverless infrastructure that grows with traffic.',
    },
    {
      icon: 'coins',
      title: 'Cost efficient',
      description: 'Start lean and pay for infrastructure as usage grows.',
    },
    {
      icon: 'file-code',
      title: 'Infrastructure as code',
      description: 'Configuration, environments and deployment stay version-controlled.',
    },
  ],
  pipeline: {
    caption: 'From push to production',
    command: 'git push origin feat/pricing-page',
    steps: [
      { label: 'Quality', detail: 'types, lint, tests and axe' },
      { label: 'Build', detail: 'every locale prerendered' },
      { label: 'Preview', detail: 'a URL for every pull request' },
      { label: 'Production', detail: 'live on merge to main' },
    ],
  },
  badges: ['GitHub Actions', 'Vercel', 'Node.js 24+', 'pnpm 12'],
} satisfies SectionOf<'marketing-deployment-pipeline'>;

const meta = {
  title: 'Sections/Marketing/Deployment pipeline',
  component: MarketingDeploymentPipeline,
  parameters: { layout: 'fullscreen' },
  args: section,
} satisfies Meta<typeof MarketingDeploymentPipeline>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Four promises beside the pipeline, which takes the wider column. */
export const Default: Story = {};

export const Tablet: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'tablet' } } };

/** Stacked, with the pipeline below the list and each step's detail under its name. */
export const OnMobile: Story = { tags: ['!autodocs'], globals: { viewport: { value: 'mobile' } } };

/** The Midnight appearance; story tests run axe in light, so this checks dark contrast too. */
export const Dark: Story = { tags: ['!autodocs'], globals: { theme: 'dark' } };
