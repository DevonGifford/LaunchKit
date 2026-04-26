import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

/** A loading indicator. `label` is its translated accessible name, such as "Loading". */
function Spinner({ className, label, ...props }: React.ComponentProps<'svg'> & { label: string }) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
