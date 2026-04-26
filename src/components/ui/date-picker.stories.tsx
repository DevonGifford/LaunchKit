import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from './button';
import { Calendar } from './calendar';
import { Field, FieldError, FieldLabel } from './field';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

/**
 * Not a component of its own: shadcn composes a date picker from Popover,
 * Button and Calendar, so it stays a recipe that each form adapts.
 */
const meta = {
  title: 'UI/Forms/Date picker',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const month = new Date(2026, 5, 1);

function SingleDatePicker({ invalid = false }: { invalid?: boolean }) {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  return (
    <Field className="w-72" data-invalid={invalid || undefined}>
      <FieldLabel htmlFor="launch-date">Launch date</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="launch-date"
            variant="outline"
            className="justify-start font-normal"
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? 'launch-date-error' : undefined}
          >
            <CalendarIcon data-icon="inline-start" aria-hidden="true" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            defaultMonth={month}
            selected={date}
            onSelect={(day) => {
              setDate(day);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {invalid && <FieldError id="launch-date-error">Choose a launch date.</FieldError>}
    </Field>
  );
}

/** Opens a calendar; choosing a day fills the button and closes it. */
export const Default: Story = {
  render: () => <SingleDatePicker />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Launch date/ }));
    const body = within(document.body);
    await userEvent.click(await body.findByRole('button', { name: /June 18th, 2026/ }));
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(canvas.getByRole('button', { name: /Launch date/ })).toHaveTextContent(
      'June 18th, 2026',
    );
  },
};

function RangeDatePicker() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 5, 8),
    to: new Date(2026, 5, 19),
  });
  const label = range?.from
    ? range.to
      ? `${format(range.from, 'LLL d, y')} – ${format(range.to, 'LLL d, y')}`
      : format(range.from, 'LLL d, y')
    : 'Pick dates';
  return (
    <Field className="w-80">
      <FieldLabel htmlFor="campaign-dates">Campaign dates</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="campaign-dates" variant="outline" className="justify-start font-normal">
            <CalendarIcon data-icon="inline-start" aria-hidden="true" />
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={range?.from ?? month}
            numberOfMonths={2}
            selected={range}
            onSelect={setRange}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}

export const Range: Story = { render: () => <RangeDatePicker /> };

export const Invalid: Story = { render: () => <SingleDatePicker invalid /> };
