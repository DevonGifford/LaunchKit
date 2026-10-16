import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CopyIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Field, FieldError, FieldLabel } from './field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './input-group';

const meta = {
  title: 'UI/Forms/Input group',
  component: InputGroup,
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** An icon before the input. Clicking the icon focuses the input. */
export const WithIcon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupInput aria-label="Search components" placeholder="Search components" />
    </InputGroup>
  ),
};

/** Fixed text before and after the value. */
export const WithText: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="site-url">Site address</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput id="site-url" placeholder="my-launch" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.launchkit.dev</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  ),
};

function CopyExample() {
  const [copied, setCopied] = useState(false);
  return (
    <Field>
      <FieldLabel htmlFor="api-key">Project key</FieldLabel>
      <InputGroup>
        <InputGroupInput id="api-key" readOnly defaultValue="lk_live_4f9a2c" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={copied ? 'Copied' : 'Copy project key'}
            onClick={() => setCopied(true)}
          >
            <CopyIcon aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}

/** A button inside the field. Icon-only buttons need an accessible name. */
export const WithButton: Story = {
  render: () => <CopyExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Copy project key' }));
    await expect(canvas.getByRole('button', { name: 'Copied' })).toBeVisible();
  },
};

/** A textarea with a footer row. */
export const WithTextarea: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="release-notes">Release notes</FieldLabel>
      <InputGroup>
        <InputGroupTextarea id="release-notes" placeholder="What changed?" />
        <InputGroupAddon align="block-end">
          <InputGroupText className="ml-auto">Markdown supported</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field data-invalid>
      <FieldLabel htmlFor="site-url-invalid">Site address</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id="site-url-invalid"
          defaultValue="my launch"
          aria-invalid
          aria-describedby="site-url-error"
        />
      </InputGroup>
      <FieldError id="site-url-error">Use letters, numbers and hyphens only.</FieldError>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupInput aria-label="Search components" placeholder="Search components" disabled />
    </InputGroup>
  ),
};
