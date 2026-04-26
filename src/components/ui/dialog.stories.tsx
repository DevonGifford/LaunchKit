import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

const meta = {
  title: 'UI/Overlays/Dialog',
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Close labels are required props, so every dialog can be translated. */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent closeLabel="Close">
        <DialogHeader>
          <DialogTitle>Merge upstream changes?</DialogTitle>
          <DialogDescription>
            This brings the latest LaunchKit release into your project. Review the changelog first.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton closeLabel="Cancel">
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' }));
    // Radix renders the dialog in a portal on document.body.
    const dialog = await within(document.body).findByRole('dialog', {
      name: 'Merge upstream changes?',
    });
    await expect(dialog).toBeVisible();
  },
};
