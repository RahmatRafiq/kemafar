import { Metadata } from 'next';
import { Suspense } from 'react';
import { ArticlesPageClient } from '@/features/articles/components/ArticlesPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Artikel',
  description: 'Koleksi artikel, blog, opini, publikasi, dan informasi terbaru',
};

export default function ArticlesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ArticlesPageClient />
    </Suspense>
  );
}
