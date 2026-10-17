import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

const meta = {
  title: 'UI/Navigation/Pagination',
  component: Pagination,
  args: { label: 'Pagination' },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Page links in a labelled nav. The current page has aria-current="page". */
export const Default: Story = {
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#page-1" text="Previous" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-1" aria-label="Page 1">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-2" aria-label="Page 2" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-3" aria-label="Page 3">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-12" aria-label="Page 12">
            12
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#page-3" text="Next" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/** On small screens Previous and Next collapse to icons, keeping their names. */
export const OnMobile: Story = {
  ...Default,
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
};

export const Localised: Story = {
  args: { label: 'Seitennavigation' },
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#seite-1" text="Zurück" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#seite-1" aria-label="Seite 1" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#seite-2" aria-label="Seite 2">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#seite-2" text="Weiter" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};
