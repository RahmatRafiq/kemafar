import { Metadata } from 'next';
import { Suspense } from 'react';
import { EventsPageClient } from '@/features/events/components/EventsPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Event',
  description: 'Kegiatan dan event terbaru',
};

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <EventsPageClient />
    </Suspense>
  );
}
