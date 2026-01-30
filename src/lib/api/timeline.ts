/**
 * Timeline API
 * Functions for managing organization timeline/history items
 */

import { supabase } from '@/lib/supabase/client';
import type { TimelineFormData } from '@/types/forms';

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  order_index: number;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all timeline items, sorted by year descending
 */
export async function getTimeline(): Promise<TimelineItem[]> {
  const { data, error } = await supabase
    .from('organization_timeline')
    .select('*')
    .order('year', { ascending: false });

  if (error) {
    console.error('Error fetching timeline:', error);
    throw new Error(`Failed to fetch timeline: ${error.message}`);
  }

  return data || [];
}

/**
 * Fetch a single timeline item by ID
 */
export async function getTimelineById(id: string): Promise<TimelineItem | null> {
  const { data, error } = await supabase
    .from('organization_timeline')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    console.error('Error fetching timeline item:', error);
    throw new Error(`Failed to fetch timeline item: ${error.message}`);
  }

  return data;
}

/**
 * Create a new timeline item
 */
export async function createTimeline(data: TimelineFormData): Promise<TimelineItem> {
  const { data: newItem, error } = await supabase
    .from('organization_timeline')
    .insert([
      {
        year: data.year,
        title: data.title,
        description: data.description,
        order_index: data.order_index,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating timeline item:', error);
    throw new Error(`Failed to create timeline item: ${error.message}`);
  }

  return newItem;
}

/**
 * Update an existing timeline item
 */
export async function updateTimeline(
  id: string,
  data: TimelineFormData
): Promise<TimelineItem> {
  const { data: updatedItem, error } = await supabase
    .from('organization_timeline')
    .update({
      year: data.year,
      title: data.title,
      description: data.description,
      order_index: data.order_index,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating timeline item:', error);
    throw new Error(`Failed to update timeline item: ${error.message}`);
  }

  return updatedItem;
}

/**
 * Delete a timeline item
 */
export async function deleteTimeline(id: string): Promise<void> {
  const { error } = await supabase
    .from('organization_timeline')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting timeline item:', error);
    throw new Error(`Failed to delete timeline item: ${error.message}`);
  }
}
