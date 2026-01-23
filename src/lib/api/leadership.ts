/**
 * Leadership API - Simplified data fetching
 */

import { supabase } from '@/lib/supabase/client';

/**
 * Leadership from database (raw snake_case)
 */
interface LeadershipRaw {
  id: string;
  name: string;
  position: string;
  division: string | null;
  period: string;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  bio: string | null;
  instagram: string | null;
  linkedin: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Leadership member with camelCase fields (for frontend)
 */
export interface LeadershipMember {
  id: string;
  name: string;
  position: string;
  division?: string;
  period: {
    start: string;
    end: string;
  };
  email?: string;
  phone?: string;
  photo: string;
  bio?: string;
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
  };
  order: number;
}

/**
 * Transform raw database leadership to frontend format
 */
function transformLeadership(raw: LeadershipRaw): LeadershipMember {
  // Parse period - format should be "2024-2025"
  const periodParts = raw.period.split('-');
  const period = {
    start: periodParts[0] || raw.period,
    end: periodParts[1] || raw.period,
  };

  return {
    id: raw.id,
    name: raw.name,
    position: raw.position,
    division: raw.division || undefined,
    period,
    email: raw.email || undefined,
    phone: raw.phone || undefined,
    photo: raw.avatar_url || '/images/default-avatar.png',
    bio: raw.bio || undefined,
    socialMedia: {
      instagram: raw.instagram || undefined,
      linkedin: raw.linkedin || undefined,
    },
    order: raw.display_order,
  };
}

/**
 * Get all leadership members
 */
export async function getLeadership(): Promise<LeadershipMember[]> {
  const { data, error } = await supabase
    .from('leadership')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching leadership:', error);
    throw new Error('Failed to fetch leadership');
  }

  return (data || []).map(transformLeadership);
}

/**
 * Get active leadership only
 */
export async function getActiveLeadership(): Promise<LeadershipMember[]> {
  const { data, error } = await supabase
    .from('leadership')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching active leadership:', error);
    throw new Error('Failed to fetch active leadership');
  }

  return (data || []).map(transformLeadership);
}

/**
 * Get leadership by period
 */
export async function getLeadershipByPeriod(period: string): Promise<LeadershipMember[]> {
  const { data, error } = await supabase
    .from('leadership')
    .select('*')
    .eq('period', period)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching leadership by period:', error);
    throw new Error('Failed to fetch leadership by period');
  }

  return (data || []).map(transformLeadership);
}

/**
 * Get leadership by division
 */
export async function getLeadershipByDivision(division: string): Promise<LeadershipMember[]> {
  const { data, error } = await supabase
    .from('leadership')
    .select('*')
    .eq('division', division)
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching leadership by division:', error);
    throw new Error('Failed to fetch leadership by division');
  }

  return (data || []).map(transformLeadership);
}

/**
 * Get leadership member by ID
 */
export async function getLeadershipById(id: string): Promise<LeadershipMember | null> {
  const { data, error } = await supabase
    .from('leadership')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching leadership by ID:', error);
    throw new Error('Failed to fetch leadership member');
  }

  return data ? transformLeadership(data) : null;
}
