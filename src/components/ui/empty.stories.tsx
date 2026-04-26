import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FolderOpenIcon, SearchXIcon } from 'lucide-react';
import { Button } from './button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './empty';

const meta = {
  title: 'UI/Feedback/Empty',
  component: Empty,
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

/** An empty state says what's missing and offers the next step. */
export const Default: Story = {
  render: () => (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>Start one from LaunchKit and it will appear here.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create a project</Button>
      </EmptyContent>
    </Empty>
  ),
};

export const NoResults: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>No components match “toast”</EmptyTitle>
        <EmptyDescription>Check the spelling, or try a shorter search.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Clear search</Button>
      </EmptyContent>
    </Empty>
  ),
};
