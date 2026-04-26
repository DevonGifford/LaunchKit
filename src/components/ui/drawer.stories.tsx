import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from './button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';

const meta = {
  title: 'UI/Overlays/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({ direction }: { direction?: 'bottom' | 'right' | 'left' | 'top' }) {
  return (
    <Drawer direction={direction}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Share this project</DrawerTitle>
            <DrawerDescription>Anyone with the link can view the preview.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Copy link</Button>
            <DrawerClose asChild>
              <Button variant="outline">Done</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/** A panel from the screen edge that can be swiped away: good on phones. */
export const Bottom: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const body = within(document.body);
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Open drawer' }));
    const drawer = await body.findByRole('dialog', { name: 'Share this project' });
    await userEvent.click(within(drawer).getByRole('button', { name: 'Done' }));
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument());
  },
};

export const Right: Story = { render: () => <Example direction="right" /> };

export const OnMobile: Story = {
  render: () => <Example />,
  globals: { viewport: { value: 'mobile' } },
};
