import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { expect, userEvent, within } from 'storybook/test';
import { z } from 'zod';
import { Button } from './button';
import { Checkbox } from './checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from './field';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Textarea } from './textarea';

const meta = {
  title: 'UI/Forms/Field',
  component: Field,
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A label, a control and a description, spaced and linked for you. */
export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="field-name">Project name</FieldLabel>
      <Input id="field-name" placeholder="My launch" aria-describedby="field-name-hint" />
      <FieldDescription id="field-name-hint">Shown in the browser tab.</FieldDescription>
    </Field>
  ),
};

/** `data-invalid` on the field and `aria-invalid` on the control show the error state. */
export const Invalid: Story = {
  render: () => (
    <Field data-invalid>
      <FieldLabel htmlFor="field-email">Email</FieldLabel>
      <Input
        id="field-email"
        type="email"
        defaultValue="not-an-email"
        aria-invalid
        aria-describedby="field-email-error"
      />
      <FieldError id="field-email-error">Enter an email address like name@example.com.</FieldError>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field data-disabled>
      <FieldLabel htmlFor="field-locked">Domain</FieldLabel>
      <Input id="field-locked" defaultValue="launchkit.dev" disabled />
      <FieldDescription>Set when the project was created.</FieldDescription>
    </Field>
  ),
};

/** A group of related choices with a legend, and horizontal fields for checkboxes. */
export const FieldSetWithChoices: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Notifications</FieldLegend>
      <FieldDescription>Choose what you hear about.</FieldDescription>
      <FieldGroup className="gap-3">
        <Field orientation="horizontal">
          <Checkbox id="notify-releases" defaultChecked />
          <FieldLabel htmlFor="notify-releases" className="font-normal">
            New releases
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="notify-security" />
          <FieldContent>
            <FieldLabel htmlFor="notify-security" className="font-normal">
              Security notices
            </FieldLabel>
            <FieldDescription>Sent only when a fix needs action.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

const topics = ['General question', 'Project enquiry', 'Something else'] as const;

const schema = z.object({
  name: z.string().trim().min(1, 'Enter your name.'),
  email: z.email('Enter an email address like name@example.com.'),
  topic: z.enum(topics, { error: 'Choose a topic.' }),
  message: z.string().trim().min(20, 'Write at least 20 characters.'),
  consent: z.boolean().refine((value) => value, {
    error: 'Agree to be contacted so we can reply.',
  }),
});

type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;

function ContactExample() {
  const [sent, setSent] = useState<FormOutput | null>(null);
  const form = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', message: '', consent: false },
  });
  const { errors } = form.formState;

  return (
    <form
      noValidate
      onSubmit={(event) => void form.handleSubmit(setSent)(event)}
      className="space-y-6"
    >
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="contact-name">Name</FieldLabel>
          <Input
            id="contact-name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            {...form.register('name')}
          />
          <FieldError id="contact-name-error" errors={[errors.name]} />
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="contact-email">Email</FieldLabel>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            {...form.register('email')}
          />
          <FieldError id="contact-email-error" errors={[errors.email]} />
        </Field>

        <Controller
          control={form.control}
          name="topic"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-topic">Topic</FieldLabel>
              <Select name={field.name} value={field.value ?? ''} onValueChange={field.onChange}>
                <SelectTrigger
                  id="contact-topic"
                  className="w-full"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={fieldState.error ? 'contact-topic-error' : undefined}
                  onBlur={field.onBlur}
                >
                  <SelectValue placeholder="Choose a topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError id="contact-topic-error" errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <Textarea
            id="contact-message"
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? 'contact-message-hint contact-message-error' : 'contact-message-hint'
            }
            {...form.register('message')}
          />
          <FieldDescription id="contact-message-hint">At least 20 characters.</FieldDescription>
          <FieldError id="contact-message-error" errors={[errors.message]} />
        </Field>

        <Controller
          control={form.control}
          name="consent"
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="contact-consent"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.error ? 'contact-consent-error' : undefined}
              />
              <FieldContent>
                <FieldLabel htmlFor="contact-consent" className="font-normal">
                  I agree to be contacted about this message.
                </FieldLabel>
                <FieldError id="contact-consent-error" errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit">Send message</Button>
      <p role="status" className="text-sm text-muted-foreground">
        {sent ? `Thanks, ${sent.name}. We'll reply to ${sent.email}.` : ''}
      </p>
    </form>
  );
}

/**
 * React Hook Form and Zod with the Field components. Submitting empty shows
 * every error under its field; the play function then fills the form in.
 */
export const FormWithValidation: Story = {
  render: () => <ContactExample />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Submitting empty shows each error', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Send message' }));
      await expect(await canvas.findByText('Enter your name.')).toBeVisible();
      await expect(canvas.getByText('Choose a topic.')).toBeVisible();
      await expect(canvas.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
    });
    await step('A valid form submits', async () => {
      await userEvent.type(canvas.getByLabelText('Name'), 'Ada');
      await userEvent.type(canvas.getByLabelText('Email'), 'ada@example.com');
      await userEvent.click(canvas.getByRole('combobox', { name: 'Topic' }));
      await userEvent.click(
        await within(document.body).findByRole('option', { name: 'Project enquiry' }),
      );
      await userEvent.type(canvas.getByLabelText('Message'), 'I would like to launch a new site.');
      await userEvent.click(canvas.getByRole('checkbox'));
      await userEvent.click(canvas.getByRole('button', { name: 'Send message' }));
      await expect(await canvas.findByRole('status')).toHaveTextContent('Thanks, Ada.');
    });
  },
};
