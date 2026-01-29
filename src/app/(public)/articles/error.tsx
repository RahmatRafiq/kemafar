'use client';

import { ErrorState } from '@/shared/components/ui/ErrorState';

export default function ArticlesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white">
      <ErrorState
        title="Gagal Memuat Artikel"
        message="Kami tidak dapat memuat artikel. Silakan coba lagi."
        error={error}
        onRetry={reset}
        showDetails={process.env.NODE_ENV === 'development'}
      />
    </div>
  );
}
