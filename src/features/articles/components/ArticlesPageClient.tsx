'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Article, ArticleCategory, PaginatedResult } from '@/lib/api/articles';
import { ARTICLE_CATEGORIES } from '@/config/domain.config';
import { ArticlesGrid } from './ArticlesGrid';
import { SegmentedControl } from '@/shared/components/ui/SegmentedControl';
import { Pagination } from '@/shared/components/ui/Pagination';

const ITEMS_PER_PAGE = 12;

function ArticlesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="relative aspect-[4/3] bg-gray-200 rounded-3xl animate-pulse" />
      ))}
    </div>
  );
}

export function ArticlesPageClient() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<PaginatedResult<Article> | null>(null);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') as ArticleCategory | null;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(ITEMS_PER_PAGE),
        });

        if (category) {
          params.append('category', category);
        }

        const response = await fetch(`/api/articles?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, currentPage]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Bold & Minimal */}
      <section className="relative bg-gray-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-gray-900" />
        <div className="container-custom relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Artikel
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl leading-relaxed">
            Koleksi artikel, blog, opini, publikasi, dan informasi terbaru
          </p>
        </div>
      </section>

      {/* Category Filter - Segmented Control */}
      <SegmentedControl
        basePath="/articles"
        paramName="category"
        currentValue={category || undefined}
        allLabel="Semua"
        options={Object.entries(ARTICLE_CATEGORIES).map(([value, label]) => ({
          value,
          label,
        }))}
      />

      {/* Articles Masonry Grid - Animated */}
      <section className="container-custom py-16">
        {loading ? (
          <ArticlesSkeleton />
        ) : result ? (
          <>
            {/* Results Count */}
            <p className="text-gray-600 mb-8">
              Menampilkan {result.items.length} dari {result.totalCount} artikel
            </p>

            <ArticlesGrid articles={result.items} />

            {/* Pagination */}
            <Pagination
              currentPage={result.currentPage}
              totalPages={result.totalPages}
              basePath="/articles"
              searchParams={{ category: category || undefined }}
            />
          </>
        ) : (
          <p className="text-center text-gray-500">Tidak ada artikel tersedia</p>
        )}
      </section>
    </div>
  );
}
