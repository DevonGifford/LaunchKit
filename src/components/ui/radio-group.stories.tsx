import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Field, FieldDescription, FieldError, FieldLabel, FieldLegend, FieldSet } from './field';
import { RadioGroup, RadioGroupItem } from './radio-group';

const plans = [
  { value: 'starter', label: 'Starter', hint: 'One site, the essentials.' },
  { value: 'studio', label: 'Studio', hint: 'Several sites from one foundation.' },
  { value: 'agency', label: 'Agency', hint: 'Client projects with shared updates.' },
] as const;

const meta = {
  title: 'UI/Forms/Radio group',
  component: RadioGroup,
  args: { defaultValue: 'studio' },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <FieldSet className="max-w-sm">
      <FieldLegend>Plan</FieldLegend>
      <RadioGroup {...args}>
        {plans.map((plan) => (
          <Field key={plan.value} orientation="horizontal">
            <RadioGroupItem value={plan.value} id={`plan-${plan.value}`} />
            <FieldLabel htmlFor={`plan-${plan.value}`} className="font-normal">
              {plan.label}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Arrow keys move the selection within the group. Radix moves focus on a
    // timer and only selects while the key is down, so hold it like a person would.
    await userEvent.click(canvas.getByRole('radio', { name: 'Studio' }));
    await userEvent.keyboard('{ArrowDown>}');
    await waitFor(() => expect(canvas.getByRole('radio', { name: 'Agency' })).toBeChecked());
    await userEvent.keyboard('{/ArrowDown}');
  },
};

export const WithDescriptions: Story = {
  render: (args) => (
    <FieldSet className="max-w-sm">
      <FieldLegend>Plan</FieldLegend>
      <RadioGroup {...args}>
        {plans.map((plan) => (
          <Field key={plan.value} orientation="horizontal">
            <RadioGroupItem
              value={plan.value}
              id={`plan-d-${plan.value}`}
              aria-describedby={`plan-d-${plan.value}-hint`}
            />
            <div className="grid gap-1">
              <FieldLabel htmlFor={`plan-d-${plan.value}`}>{plan.label}</FieldLabel>
              <FieldDescription id={`plan-d-${plan.value}-hint`}>{plan.hint}</FieldDescription>
            </div>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
};

export const Invalid: Story = {
  args: { defaultValue: undefined },
  render: (args) => (
    <FieldSet className="max-w-sm" data-invalid>
      <FieldLegend>Plan</FieldLegend>
      <RadioGroup {...args} aria-invalid aria-describedby="plan-error">
        {plans.map((plan) => (
          <Field key={plan.value} orientation="horizontal" data-invalid>
            <RadioGroupItem value={plan.value} id={`plan-i-${plan.value}`} aria-invalid />
            <FieldLabel htmlFor={`plan-i-${plan.value}`} className="font-normal">
              {plan.label}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
      <FieldError id="plan-error">Choose a plan to continue.</FieldError>
    </FieldSet>
  ),
};
