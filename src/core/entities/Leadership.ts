/**
 * Leadership Entity
 * Represents organizational leadership structure
 */

export type LeadershipPosition =
  | 'ketua'
  | 'wakil-ketua'
  | 'sekretaris'
  | 'bendahara'
  | 'coordinator'
  | 'member';

export type Division =
  | 'internal-affairs'
  | 'external-affairs'
  | 'academic'
  | 'student-development'
  | 'entrepreneurship'
  | 'media-information'
  | 'sports-arts'
  | 'islamic-spirituality';

export interface Leadership {
  id: string;
  name: string;
  position: LeadershipPosition;
  division?: Division;
  photo: string;
  email?: string;
  phone?: string;
  nim?: string;
  batch?: string;
  bio?: string;
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  period: {
    start: string;
    end: string;
  };
  order: number;
}

export interface LeadershipListItem {
  id: string;
  name: string;
  position: LeadershipPosition;
  division?: Division;
  photo: string;
  email?: string;
  period: {
    start: string;
    end: string;
  };
  order: number;
}
