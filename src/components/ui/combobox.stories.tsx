import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Fragment } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from './combobox';
import { Field, FieldError, FieldLabel } from './field';

const timezones = [
  'Europe/Berlin',
  'Europe/Lisbon',
  'Europe/London',
  'Europe/Madrid',
  'Europe/Paris',
  'America/New_York',
  'America/Toronto',
  'Asia/Tokyo',
  'Australia/Sydney',
];

const meta = {
  title: 'UI/Forms/Combobox',
  component: Combobox,
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

function Options() {
  return (
    <ComboboxContent>
      <ComboboxEmpty>No time zones match.</ComboboxEmpty>
      <ComboboxList>
        {(item: string) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  );
}

/** Type to filter, arrow keys to move, Enter to choose. */
export const Searchable: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="timezone">Time zone</FieldLabel>
      <Combobox items={timezones}>
        <ComboboxInput
          triggerLabel="Show time zones"
          id="timezone"
          placeholder="Search time zones"
          showClear
          clearLabel="Clear time zone"
        />
        <Options />
      </Combobox>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('combobox', { name: 'Time zone' });
    await userEvent.click(input);
    await userEvent.type(input, 'tok');
    const option = await within(document.body).findByRole('option', { name: 'Asia/Tokyo' });
    await userEvent.click(option);
    await expect(input).toHaveValue('Asia/Tokyo');
    await waitFor(() =>
      expect(within(document.body).queryByRole('listbox')).not.toBeInTheDocument(),
    );
  },
};

export const NoResults: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="timezone-empty">Time zone</FieldLabel>
      <Combobox items={timezones} defaultInputValue="Mars">
        <ComboboxInput
          id="timezone-empty"
          placeholder="Search time zones"
          triggerLabel="Show time zones"
        />
        <Options />
      </Combobox>
    </Field>
  ),
};

function MultipleExample({ disabled = false }: { disabled?: boolean }) {
  const anchor = useComboboxAnchor();
  return (
    <Field>
      <FieldLabel htmlFor="team-timezones">Team time zones</FieldLabel>
      <Combobox
        multiple
        autoHighlight
        items={timezones}
        defaultValue={['Europe/Berlin', 'Asia/Tokyo']}
        disabled={disabled}
      >
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(values: string[]) => (
              <Fragment>
                {values.map((value) => (
                  <ComboboxChip key={value} removeLabel={`Remove ${value}`}>
                    {value}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput id="team-timezones" placeholder="Add a time zone" />
              </Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No time zones match.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}

/** Several values as removable chips. */
export const Multiple: Story = { render: () => <MultipleExample /> };

export const Disabled: Story = { render: () => <MultipleExample disabled /> };

export const Invalid: Story = {
  render: () => (
    <Field data-invalid>
      <FieldLabel htmlFor="timezone-invalid">Time zone</FieldLabel>
      <Combobox items={timezones}>
        <ComboboxInput
          triggerLabel="Show time zones"
          id="timezone-invalid"
          placeholder="Search time zones"
          aria-invalid
          aria-describedby="timezone-error"
        />
        <Options />
      </Combobox>
      <FieldError id="timezone-error">Choose a time zone.</FieldError>
    </Field>
  ),
};
