'use client';

import { ErrorState } from '@/shared/components/ui/ErrorState';

export default function ArticleDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ErrorState
        title="Gagal Memuat Artikel"
        message="Kami tidak dapat memuat artikel ini. Mungkin sudah dipindahkan atau dihapus."
        error={error}
        onRetry={reset}
        showDetails={process.env.NODE_ENV === 'development'}
      />
    </div>
  );
}
