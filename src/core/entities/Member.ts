/**
 * Member Entity
 * Represents organization members
 */

export type MemberStatus = 'active' | 'inactive' | 'alumni';

export interface Member {
  id: string;
  name: string;
  nim: string;
  email: string;
  phone?: string;
  photo?: string;
  batch: string;
  status: MemberStatus;
  division?: string;
  position?: string;
  joinedAt: string;
  graduatedAt?: string;
  bio?: string;
  interests?: string[];
  achievements?: string[];
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
  };
}

export interface MemberListItem {
  id: string;
  name: string;
  nim: string;
  photo?: string;
  batch: string;
  status: MemberStatus;
  division?: string;
  position?: string;
}
