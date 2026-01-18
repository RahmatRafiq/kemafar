/**
 * Member Repository Interface
 */

import { Member, MemberListItem, MemberStatus } from '../entities/Member';

export interface IMemberRepository {
  /**
   * Get all members
   */
  getAll(): Promise<MemberListItem[]>;

  /**
   * Get members by status
   */
  getByStatus(status: MemberStatus): Promise<MemberListItem[]>;

  /**
   * Get members by batch
   */
  getByBatch(batch: string): Promise<MemberListItem[]>;

  /**
   * Get members by division
   */
  getByDivision(division: string): Promise<MemberListItem[]>;

  /**
   * Get member by id
   */
  getById(id: string): Promise<Member | null>;

  /**
   * Search members by query
   */
  search(query: string): Promise<MemberListItem[]>;
}
