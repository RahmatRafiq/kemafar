import { NextRequest, NextResponse } from 'next/server';
import { getPaginatedEvents, EventCategory } from '@/lib/api/events';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const category = searchParams.get('category') as EventCategory | undefined;

    // Validate page and limit
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100); // Max 100 per page

    const result = await getPaginatedEvents(validPage, validLimit, category);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching paginated events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
