/**
 * Members API - Simplified data fetching
 */

import { supabase } from '@/lib/supabase/client';

/**
 * Member from database (raw snake_case)
 */
interface MemberRaw {
  id: string;
  name: string;
  nim: string;
  division: string;
  position: string;
  batch: string;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  bio: string | null;
  instagram: string | null;
  linkedin: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Member with camelCase fields (for frontend)
 */
export interface Member {
  id: string;
  name: string;
  nim: string;
  division?: string;
  position?: string;
  batch: string;
  email?: string;
  phone?: string;
  photo?: string;
  bio?: string;
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
  };
  status: 'active' | 'inactive';
  joinedAt: string;
}

/**
 * Transform raw database member to frontend format
 */
function transformMember(raw: MemberRaw): Member {
  return {
    id: raw.id,
    name: raw.name,
    nim: raw.nim,
    division: raw.division || undefined,
    position: raw.position || undefined,
    batch: raw.batch,
    email: raw.email || undefined,
    phone: raw.phone || undefined,
    photo: raw.avatar_url || undefined,
    bio: raw.bio || undefined,
    socialMedia: {
      instagram: raw.instagram || undefined,
      linkedin: raw.linkedin || undefined,
    },
    status: raw.is_active ? 'active' : 'inactive',
    joinedAt: raw.created_at,
  };
}

/**
 * Get all members
 */
export async function getMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching members:', error);
    throw new Error('Failed to fetch members');
  }

  return (data || []).map(transformMember);
}

/**
 * Get active members only
 */
export async function getActiveMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching active members:', error);
    throw new Error('Failed to fetch active members');
  }

  return (data || []).map(transformMember);
}

/**
 * Get members by division
 */
export async function getMembersByDivision(division: string): Promise<Member[]> {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('division', division)
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching members by division:', error);
    throw new Error('Failed to fetch members by division');
  }

  return (data || []).map(transformMember);
}

/**
 * Get members by batch
 */
export async function getMembersByBatch(batch: string): Promise<Member[]> {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('batch', batch)
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching members by batch:', error);
    throw new Error('Failed to fetch members by batch');
  }

  return (data || []).map(transformMember);
}

/**
 * Get member by ID
 */
export async function getMemberById(id: string): Promise<Member | null> {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching member by ID:', error);
    throw new Error('Failed to fetch member');
  }

  return data ? transformMember(data) : null;
}
