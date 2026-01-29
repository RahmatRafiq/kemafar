'use client';

import { ErrorState } from '@/shared/components/ui/ErrorState';

export default function EventDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ErrorState
        title="Gagal Memuat Event"
        message="Kami tidak dapat memuat event ini. Mungkin sudah dipindahkan atau dihapus."
        error={error}
        onRetry={reset}
        showDetails={process.env.NODE_ENV === 'development'}
      />
    </div>
  );
}
