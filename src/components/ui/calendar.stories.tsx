import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { de } from 'react-day-picker/locale';
import { expect, userEvent, within } from 'storybook/test';
import { Calendar } from './calendar';

// A fixed month keeps the stories and their tests the same every day.
const month = new Date(2026, 5, 1);

const meta = {
  title: 'UI/Forms/Calendar',
  component: Calendar,
  args: { defaultMonth: month },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

function SingleExample() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 5, 12));
  return (
    <Calendar
      mode="single"
      defaultMonth={month}
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
    />
  );
}

/** Click a day, or move with the arrow keys and press Enter. */
export const Single: Story = {
  render: () => <SingleExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /June 20th, 2026/ }));
    // react-day-picker marks the selection on the grid cell, not the button.
    const day = canvas.getByRole('button', { name: /June 20th, 2026/ });
    await expect(day.closest('[role="gridcell"]')).toHaveAttribute('aria-selected', 'true');
  },
};

function RangeExample() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 5, 8),
    to: new Date(2026, 5, 14),
  });
  return (
    <Calendar
      mode="range"
      defaultMonth={month}
      numberOfMonths={2}
      selected={range}
      onSelect={setRange}
      className="rounded-lg border"
    />
  );
}

export const Range: Story = { render: () => <RangeExample /> };

/** Month and year menus for dates far from today, such as a birthday. */
export const WithMonthAndYearMenus: Story = {
  args: {
    mode: 'single',
    captionLayout: 'dropdown',
    startMonth: new Date(1940, 0),
    endMonth: new Date(2026, 11),
    className: 'rounded-lg border',
  },
};

/** Weekends and past dates disabled. */
export const DisabledDays: Story = {
  args: {
    mode: 'single',
    disabled: [{ before: new Date(2026, 5, 10) }, { dayOfWeek: [0, 6] }],
    className: 'rounded-lg border',
  },
};

/** Day and month names, labels and the first day of the week follow the locale. */
export const Localised: Story = {
  args: { mode: 'single', locale: de, className: 'rounded-lg border' },
};
