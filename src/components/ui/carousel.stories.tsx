import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Card, CardContent } from './card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';

const slides = ['Design', 'Develop', 'Launch', 'Measure', 'Improve'];

const meta = {
  title: 'UI/Content/Carousel',
  component: Carousel,
  args: { 'aria-label': 'LaunchKit workflow', 'aria-roledescription': 'carousel' },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-xs px-12">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem
            key={slide}
            className={args.orientation === 'vertical' ? 'basis-1/2' : undefined}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <span className="font-serif text-3xl">{slide}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious label="Previous slide" />
      <CarouselNext label="Next slide" />
    </Carousel>
  ),
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Buttons, swipe or the arrow keys move between slides. Labels are props. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const previous = canvas.getByRole('button', { name: 'Previous slide' });
    await expect(previous).toBeDisabled();
    await userEvent.click(canvas.getByRole('button', { name: 'Next slide' }));
    await waitFor(() => expect(previous).toBeEnabled());
  },
};

/** Several slides in view at once. */
export const MultipleInView: Story = {
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-xl px-12">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Carousel {...args} opts={{ align: 'start' }}>
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem
            key={slide}
            className="basis-1/2 sm:basis-1/3"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <span className="text-lg">{slide}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious label="Previous slides" />
      <CarouselNext label="Next slides" />
    </Carousel>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical', opts: { align: 'start' } },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-xs py-14">
        <Story />
      </div>
    ),
  ],
};
