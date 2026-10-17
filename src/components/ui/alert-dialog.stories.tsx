import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';
import { Button } from './button';

const meta = {
  title: 'UI/Feedback/Alert dialog',
  component: AlertDialog,
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DeleteExample({ size }: { size?: 'default' | 'sm' }) {
  const [deleted, setDeleted] = useState(false);
  return (
    <div className="space-y-3">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete project</Button>
        </AlertDialogTrigger>
        <AlertDialogContent size={size}>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <Trash2Icon aria-hidden="true" />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              Its pages and content are removed for good. This can’t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep project</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={() => setDeleted(true)}>
              Delete project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p role="status" className="text-sm text-muted-foreground">
        {deleted ? 'Project deleted.' : ''}
      </p>
    </div>
  );
}

/**
 * For decisions that can't be undone. Unlike a dialog it can't be dismissed by
 * clicking outside, and focus starts on the safe choice.
 */
export const Default: Story = {
  render: () => <DeleteExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Delete project' }));
    const dialog = await body.findByRole('alertdialog', { name: 'Delete this project?' });
    await expect(within(dialog).getByRole('button', { name: 'Keep project' })).toHaveFocus();
    await userEvent.click(within(dialog).getByRole('button', { name: 'Delete project' }));
    await waitFor(() => expect(body.queryByRole('alertdialog')).not.toBeInTheDocument());
    await expect(canvas.getByRole('status')).toHaveTextContent('Project deleted.');
  },
};

export const Small: Story = { render: () => <DeleteExample size="sm" /> };
