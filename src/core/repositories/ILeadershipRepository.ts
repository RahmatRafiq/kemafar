/**
 * Leadership Repository Interface
 */

import { Leadership, LeadershipListItem, Division, LeadershipPosition } from '../entities/Leadership';

export interface ILeadershipRepository {
  /**
   * Get all leadership members
   */
  getAll(): Promise<LeadershipListItem[]>;

  /**
   * Get core leadership (Ketua, Sekretaris, Bendahara)
   */
  getCore(): Promise<LeadershipListItem[]>;

  /**
   * Get leadership by division
   */
  getByDivision(division: Division): Promise<LeadershipListItem[]>;

  /**
   * Get leadership by position
   */
  getByPosition(position: LeadershipPosition): Promise<LeadershipListItem[]>;

  /**
   * Get leadership by id
   */
  getById(id: string): Promise<Leadership | null>;

  /**
   * Get current period leadership
   */
  getCurrentPeriod(): Promise<LeadershipListItem[]>;
}
