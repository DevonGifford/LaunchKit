import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { toast } from 'sonner';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from './button';
import { Toaster } from './sonner';

const meta = {
  title: 'UI/Feedback/Sonner',
  component: Toaster,
  args: { containerAriaLabel: 'Notifications' },
  decorators: [
    // Follow the toolbar theme; the toast colours themselves come from the tokens.
    (Story, { args, globals }) => (
      <>
        <Story />
        <Toaster {...args} theme={globals.theme === 'dark' ? 'dark' : 'light'} />
      </>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Toasts confirm what just happened. Mount one `<Toaster />` near the root, then
 * call `toast()` anywhere. Interface text such as the region label is a prop.
 */
export const Default: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast('Changes saved', { description: 'Your site updates in a minute.' })}
    >
      Save changes
    </Button>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Save changes' }));
    // Toasts animate in, so wait until it is fully shown.
    const title = await within(document.body).findByText('Changes saved');
    await waitFor(() => expect(title).toBeVisible());
    toast.dismiss();
  },
};

export const Types: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.success('Project published')}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info('A new release is available')}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning('Your trial ends in 3 days')}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error('Couldn’t publish. Try again.')}>
        Error
      </Button>
    </div>
  ),
};

/** An undo action, for changes that are easy to reverse. */
export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast('Page deleted', {
          action: { label: 'Undo', onClick: () => toast('Page restored') },
        })
      }
    >
      Delete page
    </Button>
  ),
};

/** A promise toast: loading, then success or failure. */
export const PromiseToast: Story = {
  name: 'Promise',
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        void toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
          loading: 'Publishing…',
          success: 'Published',
          error: 'Couldn’t publish',
        })
      }
    >
      Publish
    </Button>
  ),
};
