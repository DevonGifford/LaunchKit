import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ChevronDownIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { Button } from './button';
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from './button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Input } from './input';

const meta = {
  title: 'UI/Actions/Button group',
  component: ButtonGroup,
  args: { 'aria-label': 'Text alignment' },
  argTypes: { orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] } },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Related actions joined into one control. Give the group an accessible name. */
export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Centre</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical', 'aria-label': 'Quantity' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline" size="icon" aria-label="Increase">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Decrease">
        <MinusIcon aria-hidden="true" />
      </Button>
    </ButtonGroup>
  ),
};

/** A main action with a menu of alternatives. */
export const SplitButton: Story = {
  args: { 'aria-label': 'Publish' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Publish</Button>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" aria-label="More publish options">
            <ChevronDownIcon aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Schedule</DropdownMenuItem>
          <DropdownMenuItem>Save as draft</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  ),
};

/** Text and inputs can join a group too. */
export const WithInput: Story = {
  args: { 'aria-label': 'Site address' },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupText>https://</ButtonGroupText>
      <Input aria-label="Subdomain" placeholder="my-launch" className="w-40" />
      <Button variant="outline">Check</Button>
    </ButtonGroup>
  ),
};
