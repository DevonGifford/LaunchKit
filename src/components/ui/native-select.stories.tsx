import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Field, FieldDescription, FieldError, FieldLabel } from './field';
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from './native-select';

const meta = {
  title: 'UI/Forms/Native select',
  component: NativeSelect,
  args: { id: 'country', defaultValue: 'de' },
  argTypes: { size: { control: 'inline-radio', options: ['default', 'sm'] } },
  decorators: [
    (Story) => (
      <Field className="max-w-xs">
        <FieldLabel htmlFor="country">Country</FieldLabel>
        <Story />
      </Field>
    ),
  ],
  render: (args) => (
    <NativeSelect {...args}>
      <NativeSelectOption value="">Choose a country</NativeSelectOption>
      <NativeSelectOptGroup label="Europe">
        <NativeSelectOption value="de">Germany</NativeSelectOption>
        <NativeSelectOption value="es">Spain</NativeSelectOption>
        <NativeSelectOption value="fr">France</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Elsewhere">
        <NativeSelectOption value="ca">Canada</NativeSelectOption>
        <NativeSelectOption value="jp">Japan</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The browser's own select: best on touch devices and for long, simple lists. */
export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };

export const Disabled: Story = { args: { disabled: true } };

export const Invalid: Story = {
  args: { defaultValue: '', 'aria-invalid': true, 'aria-describedby': 'country-error' },
  decorators: [
    (Story) => (
      <>
        <Story />
        <FieldError id="country-error">Choose a country.</FieldError>
      </>
    ),
  ],
};

export const WithDescription: Story = {
  args: { 'aria-describedby': 'country-hint' },
  decorators: [
    (Story) => (
      <>
        <Story />
        <FieldDescription id="country-hint">Used for tax and delivery.</FieldDescription>
      </>
    ),
  ],
};
