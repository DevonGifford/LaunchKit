'use client';

import { ErrorState } from '@/components/layout/error-state';

// Catches errors in the pages below the locale layout, within the header and
// footer. Errors in the layout itself fall through to Next's default page.
export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <ErrorState digest={error.digest} onRetry={retry} />;
}
