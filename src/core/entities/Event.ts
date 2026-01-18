/**
 * Event Entity
 * Represents events and activities organized by the association
 */

export type EventCategory = 'seminar' | 'workshop' | 'community-service' | 'competition' | 'training' | 'other';
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: EventCategory;
  status: EventStatus;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address: string;
    mapUrl?: string;
  };
  coverImage: string;
  images?: string[];
  organizer: {
    name: string;
    contact: string;
  };
  registrationUrl?: string;
  registrationDeadline?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface EventListItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: EventCategory;
  status: EventStatus;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address: string;
  };
  coverImage: string;
  featured: boolean;
}
