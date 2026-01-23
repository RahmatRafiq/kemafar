/**
 * Article Repository Interface
 *
 * Defines the contract for article data access.
 * Implementations can use Supabase, JSON files, or any other data source.
 *
 * @remarks
 * This follows the repository pattern for clean architecture:
 * - Domain layer defines the interface (this file)
 * - Infrastructure layer provides implementations (SupabaseArticleRepository)
 * - Presentation layer uses the interface via factory
 *
 * Benefits:
 * - Easy to swap data sources without changing business logic
 * - Testable with mock implementations
 * - Clear separation of concerns
 *
 * @see {@link SupabaseArticleRepository} for Supabase implementation
 * @see {@link RepositoryFactory} for accessing implementations
 *
 * @example
 * ```typescript
 * const repo = RepositoryFactory.getArticleRepository();
 * const articles = await repo.getFeatured(3);
 * ```
 */

import { Article, ArticleListItem, ArticleCategory } from '../entities/Article';

/**
 * Pagination result wrapper
 * @template T - Type of items in the paginated result
 */
export interface PaginatedResult<T> {
  /** Array of items for current page */
  items: T[];
  /** Total number of items across all pages */
  totalCount: number;
  /** Total number of pages available */
  totalPages: number;
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Whether there is a next page */
  hasNextPage: boolean;
  /** Whether there is a previous page */
  hasPrevPage: boolean;
}

/**
 * Article Repository Interface
 *
 * @remarks
 * All methods return promises for async database operations.
 * RLS (Row Level Security) policies are enforced at the Supabase level.
 */
export interface IArticleRepository {
  /**
   * Retrieve all published articles
   * @returns Promise resolving to array of article list items
   * @throws {Error} If database query fails
   */
  getAll(): Promise<ArticleListItem[]>;

  /**
   * Retrieve articles filtered by category
   * @param category - Article category to filter by
   * @returns Promise resolving to filtered article list
   * @throws {Error} If database query fails
   */
  getByCategory(category: ArticleCategory): Promise<ArticleListItem[]>;

  /**
   * Retrieve paginated articles with optional category filter
   * @param page - Page number (1-indexed)
   * @param limit - Number of items per page
   * @param category - Optional category filter
   * @returns Promise resolving to paginated result
   * @throws {Error} If database query fails
   */
  getPaginated(
    page: number,
    limit: number,
    category?: ArticleCategory
  ): Promise<PaginatedResult<ArticleListItem>>;

  /**
   * Retrieve featured articles (marked as featured in database)
   * @param limit - Optional maximum number of articles (default: no limit)
   * @returns Promise resolving to featured articles
   * @throws {Error} If database query fails
   */
  getFeatured(limit?: number): Promise<ArticleListItem[]>;

  /**
   * Retrieve single article by slug
   * @param slug - URL-friendly article identifier
   * @returns Promise resolving to full article or null if not found
   * @throws {Error} If database query fails
   */
  getBySlug(slug: string): Promise<Article | null>;

  /**
   * Retrieve most recent articles
   * @param limit - Optional maximum number of articles (default: no limit)
   * @returns Promise resolving to recent articles sorted by date
   * @throws {Error} If database query fails
   */
  getRecent(limit?: number): Promise<ArticleListItem[]>;

  /**
   * Search articles by text query
   * @param query - Search string to match against title/content
   * @returns Promise resolving to matching articles
   * @throws {Error} If database query fails
   * @remarks Implementation may use full-text search or simple LIKE queries
   */
  search(query: string): Promise<ArticleListItem[]>;
}
