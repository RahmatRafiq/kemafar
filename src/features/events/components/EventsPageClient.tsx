'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Event, EventCategory, PaginatedResult } from '@/lib/api/events';
import { EVENT_CATEGORIES } from '@/config/domain.config';
import { EVENT_STATUS_COLORS, EVENT_STATUS_LABELS } from '@/lib/constants/event';
import { EventsGrid } from './EventsGrid';
import { SegmentedControl } from '@/shared/components/ui/SegmentedControl';
import { Pagination } from '@/shared/components/ui/Pagination';

const ITEMS_PER_PAGE = 12;

function EventsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="relative aspect-[16/9] bg-gray-200 rounded-3xl animate-pulse" />
      ))}
    </div>
  );
}

export function EventsPageClient() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<PaginatedResult<Event> | null>(null);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') as EventCategory | null;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(ITEMS_PER_PAGE),
        });

        if (category) {
          params.append('category', category);
        }

        const response = await fetch(`/api/events?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category, currentPage]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Event
          </h1>
          <p className="text-2xl text-primary-100 max-w-3xl leading-relaxed">
            Temukan berbagai event menarik yang kami selenggarakan
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <SegmentedControl
        basePath="/events"
        paramName="category"
        currentValue={category || undefined}
        allLabel="Semua"
        options={Object.entries(EVENT_CATEGORIES).map(([value, label]) => ({
          value,
          label,
        }))}
      />

      {/* Events Grid */}
      <section className="container-custom py-16">
        {loading ? (
          <EventsSkeleton />
        ) : result ? (
          <>
            {/* Results Count */}
            <p className="text-gray-600 mb-8">
              Menampilkan {result.items.length} dari {result.totalCount} event
            </p>

            <EventsGrid
              events={result.items}
              statusColors={EVENT_STATUS_COLORS}
              statusLabels={EVENT_STATUS_LABELS}
            />

            {/* Pagination */}
            <Pagination
              currentPage={result.currentPage}
              totalPages={result.totalPages}
              basePath="/events"
              searchParams={{ category: category || undefined }}
            />
          </>
        ) : (
          <p className="text-center text-gray-500">Tidak ada event tersedia</p>
        )}
      </section>
    </div>
  );
}
