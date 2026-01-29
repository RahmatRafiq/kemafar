'use client';

import { ErrorState } from '@/shared/components/ui/ErrorState';

export default function EventsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white">
      <ErrorState
        title="Gagal Memuat Event"
        message="Kami tidak dapat memuat event. Silakan coba lagi."
        error={error}
        onRetry={reset}
        showDetails={process.env.NODE_ENV === 'development'}
      />
    </div>
  );
}
