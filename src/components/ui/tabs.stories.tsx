import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const panels = [
  { value: 'overview', label: 'Overview', body: 'Pages, content and locales at a glance.' },
  { value: 'content', label: 'Content', body: 'Edit page sections and long-form docs.' },
  { value: 'settings', label: 'Settings', body: 'Domain, brand tokens and feature switches.' },
];

const meta = {
  title: 'UI/Content/Tabs',
  component: Tabs,
  args: { defaultValue: 'overview' },
  render: (args) => (
    <Tabs {...args} className="max-w-md">
      <TabsList aria-label="Project">
        {panels.map((panel) => (
          <TabsTrigger key={panel.value} value={panel.value}>
            {panel.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {panels.map((panel) => (
        <TabsContent key={panel.value} value={panel.value} className="p-1 text-sm">
          {panel.body}
        </TabsContent>
      ))}
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Arrow keys move between tabs; Tab moves into the panel. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: 'Overview' }));
    await userEvent.keyboard('{ArrowRight>}');
    await waitFor(() =>
      expect(canvas.getByRole('tab', { name: 'Content' })).toHaveAttribute('aria-selected', 'true'),
    );
    await userEvent.keyboard('{/ArrowRight}');
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Edit page sections');
  },
};

/** The underlined style, for navigation within a page. */
export const Line: Story = {
  render: (args) => (
    <Tabs {...args} className="max-w-md">
      <TabsList variant="line" aria-label="Project">
        {panels.map((panel) => (
          <TabsTrigger key={panel.value} value={panel.value}>
            {panel.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {panels.map((panel) => (
        <TabsContent key={panel.value} value={panel.value} className="p-1 text-sm">
          {panel.body}
        </TabsContent>
      ))}
    </Tabs>
  ),
};

export const Vertical: Story = { args: { orientation: 'vertical' } };
