/**
 * Navigation Configuration
 *
 * All route definitions and navigation structures for the application.
 * Centralized route management for consistency across the codebase.
 */

/**
 * Public Routes
 * Main navigation routes for the public-facing website.
 */
export const ROUTES = {
  home: '/',
  about: '/about',
  articles: '/articles',
  events: '/events',
  leadership: '/leadership',
  members: '/members',
  gallery: '/gallery',
} as const;

/**
 * Admin Routes
 * Routes for the admin panel and management pages.
 */
export const ADMIN_ROUTES = {
  dashboard: '/admin/dashboard',
  articles: '/admin/articles',
  events: '/admin/events',
  members: '/admin/members',
  leadership: '/admin/leadership',
  users: '/admin/users',
  settings: '/admin/settings',
} as const;

/**
 * Auth Routes
 * Routes for authentication pages.
 */
export const AUTH_ROUTES = {
  login: '/auth/login',
  logout: '/auth/logout',
} as const;

/**
 * Type helper for route values
 */
export type RouteValue<T> = T[keyof T];
