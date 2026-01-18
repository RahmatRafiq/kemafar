/**
 * Article Entity
 * Represents articles/posts in the organization
 */

export type ArticleCategory = 'post' | 'blog' | 'opinion' | 'publication' | 'info';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured: boolean;
  views?: number;
}

export interface ArticleListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: ArticleCategory;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  coverImage: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
  views?: number;
}
