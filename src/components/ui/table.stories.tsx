import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

const releases = [
  { version: '0.3.0', date: '13 Oct 2026', status: 'Latest', changes: 41 },
  { version: '0.2.1', date: '28 Sep 2026', status: 'Supported', changes: 6 },
  { version: '0.2.0', date: '15 Sep 2026', status: 'Supported', changes: 23 },
  { version: '0.1.0', date: '02 Aug 2026', status: 'Retired', changes: 87 },
] as const;

const meta = {
  title: 'UI/Content/Table',
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tabular data with a caption, header cells and a total row. Scrolls sideways on small screens. */
export const Default: Story = {
  render: () => (
    <Table className="max-w-2xl">
      <TableCaption>LaunchKit releases</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Version</TableHead>
          <TableHead>Released</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Changes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {releases.map((release) => (
          <TableRow key={release.version}>
            <TableCell className="font-mono">{release.version}</TableCell>
            <TableCell>{release.date}</TableCell>
            <TableCell>
              <Badge variant={release.status === 'Latest' ? 'default' : 'outline'}>
                {release.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right tabular-nums">{release.changes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right tabular-nums">
            {releases.reduce((sum, release) => sum + release.changes, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const OnMobile: Story = {
  ...Default,
  tags: ['!autodocs'],
  globals: { viewport: { value: 'mobile' } },
};

export const Empty: Story = {
  render: () => (
    <Table className="max-w-2xl">
      <TableCaption>LaunchKit releases</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Version</TableHead>
          <TableHead>Released</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
            No releases yet.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
