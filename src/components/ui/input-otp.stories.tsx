import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { expect, userEvent, within } from 'storybook/test';
import { Field, FieldDescription, FieldError, FieldLabel } from './field';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp';

const meta = {
  title: 'UI/Forms/Input OTP',
  component: InputOTP,
  args: { maxLength: 6, children: null },
  render: (args) => (
    <Field className="w-fit">
      <FieldLabel htmlFor="otp">Verification code</FieldLabel>
      <InputOTP
        id="otp"
        maxLength={args.maxLength}
        pattern={REGEXP_ONLY_DIGITS}
        disabled={args.disabled}
        defaultValue={args.defaultValue}
        aria-describedby="otp-hint"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <FieldDescription id="otp-hint">Enter the six digits we emailed you.</FieldDescription>
    </Field>
  ),
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One real input behind the slots, so paste, autofill and screen readers all work. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText('Verification code');
    await userEvent.click(input);
    await userEvent.keyboard('12ab3456');
    // The digits-only pattern drops the letters.
    await expect(input).toHaveValue('123456');
  },
};

export const Disabled: Story = { args: { disabled: true, defaultValue: '123' } };

export const Invalid: Story = {
  args: { defaultValue: '000000' },
  render: (args) => (
    <Field className="w-fit" data-invalid>
      <FieldLabel htmlFor="otp">Verification code</FieldLabel>
      <InputOTP
        id="otp"
        maxLength={args.maxLength}
        defaultValue={args.defaultValue}
        aria-invalid
        aria-describedby="otp-error"
      >
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <InputOTPSlot key={index} index={index} aria-invalid />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <FieldError id="otp-error">That code has expired. Request a new one.</FieldError>
    </Field>
  ),
};
