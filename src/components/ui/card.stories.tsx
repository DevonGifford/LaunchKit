import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

const meta = {
  title: 'Primitives/Card',
  component: Card,
  args: { className: 'max-w-sm' },
  argTypes: { size: { control: 'inline-radio', options: ['default', 'sm'] } },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Starter plan</CardTitle>
        <CardDescription>Everything you need to launch a first version.</CardDescription>
      </CardHeader>
      <CardContent>Content, localisation and a full test setup, ready on day one.</CardContent>
    </Card>
  ),
};

/** A footer takes the bottom edge; `CardAction` sits top-right in the header. */
export const WithActionAndFooter: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Release notes</CardTitle>
        <CardDescription>What changed in the latest tag.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            View
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>Read the changelog before merging upstream changes.</CardContent>
      <CardFooter>
        <Button>Merge</Button>
      </CardFooter>
    </Card>
  ),
};

export const Small: Story = { ...Playground, args: { size: 'sm' } };
