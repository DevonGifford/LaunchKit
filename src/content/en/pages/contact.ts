import type { PageDefinition } from '@/lib/content/types';

export const contact = {
  meta: {
    title: 'Contact',
    description:
      'Questions about LaunchKit, or a project you would like to build on it? Send a message.',
  },
  sections: [
    {
      id: 'intro',
      type: 'hero',
      eyebrow: 'Contact',
      title: 'Let’s talk about your next launch.',
      description:
        'Starting a new site from LaunchKit, or improving the foundation itself? We would like to hear from you.',
    },
    {
      id: 'message',
      type: 'contact',
      title: 'Send a message',
      description:
        'This form is LaunchKit’s reference pattern: validated as you type, and validated again on the server before it is accepted.',
      details: [
        { label: 'Validation', value: 'In the browser and on the server' },
        { label: 'Delivery', value: 'Configured by each project' },
      ],
    },
  ],
} satisfies PageDefinition;
