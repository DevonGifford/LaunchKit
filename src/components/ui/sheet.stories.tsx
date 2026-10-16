import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from './button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

const meta = {
  title: 'UI/Overlays/Sheet',
  component: Sheet,
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Close labels are required props, so every sheet can be translated. */
function Example(props: { side: 'top' | 'right' | 'bottom' | 'left' }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side={props.side} closeLabel="Close">
        <SheetHeader>
          <SheetTitle>Preferences</SheetTitle>
          <SheetDescription>Choose a language and an appearance.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export const Right: Story = {
  render: () => <Example side="right" />,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Open sheet' }));
    // Radix renders the sheet in a portal on document.body.
    const sheet = await within(document.body).findByRole('dialog', { name: 'Preferences' });
    // Waits for the slide-in to finish.
    await waitFor(() => expect(sheet).toBeVisible());
  },
};

export const Left: Story = { render: () => <Example side="left" /> };

export const Bottom: Story = { render: () => <Example side="bottom" /> };
