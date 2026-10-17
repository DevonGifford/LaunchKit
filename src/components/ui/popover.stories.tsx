import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from './button';
import { Field, FieldLabel } from './field';
import { Input } from './input';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from './popover';

const meta = {
  title: 'UI/Overlays/Popover',
  component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Rich, interactive content next to its trigger. Escape or clicking outside closes it. */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Dimensions">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the size of the preview.</PopoverDescription>
        </PopoverHeader>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="popover-width">Width</FieldLabel>
            <Input id="popover-width" defaultValue="1440" />
          </Field>
          <Field>
            <FieldLabel htmlFor="popover-height">Height</FieldLabel>
            <Input id="popover-height" defaultValue="900" />
          </Field>
        </div>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const body = within(document.body);
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Dimensions' }));
    const width = await body.findByLabelText('Width');
    // Waits for the fade-in to finish.
    await waitFor(() => expect(width).toBeVisible());
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByLabelText('Width')).not.toBeInTheDocument());
  },
};

export const AlignedToStart: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Release notes</Button>
      </PopoverTrigger>
      <PopoverContent align="start" aria-label="Release notes">
        <PopoverHeader>
          <PopoverTitle>LaunchKit 0.3</PopoverTitle>
          <PopoverDescription>New form, feedback and navigation components.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};
