/**
 * Event Repository Interface
 */

import { Event, EventListItem, EventStatus, EventCategory } from '../entities/Event';

export interface IEventRepository {
  /**
   * Get all events
   */
  getAll(): Promise<EventListItem[]>;

  /**
   * Get events by status
   */
  getByStatus(status: EventStatus): Promise<EventListItem[]>;

  /**
   * Get events by category
   */
  getByCategory(category: EventCategory): Promise<EventListItem[]>;

  /**
   * Get upcoming events
   */
  getUpcoming(limit?: number): Promise<EventListItem[]>;

  /**
   * Get featured events
   */
  getFeatured(limit?: number): Promise<EventListItem[]>;

  /**
   * Get event by slug
   */
  getBySlug(slug: string): Promise<Event | null>;

  /**
   * Get events by date range
   */
  getByDateRange(startDate: string, endDate: string): Promise<EventListItem[]>;
}
