/**
 * Supabase Server Client - Privileged server-side instance
 *
 * Creates a Supabase client using the service role key, which bypasses Row Level Security (RLS).
 * This client has full database access and should ONLY be used in secure server environments.
 *
 * @remarks
 * **SECURITY WARNING:**
 * - Uses SUPABASE_SERVICE_ROLE_KEY (NEVER expose to browsers!)
 * - Bypasses ALL RLS policies (full database access)
 * - No automatic user authentication (runs as service role)
 * - Must be used ONLY in server-side code (API routes, server actions, server components)
 *
 * **When to Use:**
 * - ✅ Admin operations that need to bypass RLS
 * - ✅ Bulk operations on behalf of users
 * - ✅ System-level tasks (cleanup, migrations, cron jobs)
 * - ✅ API routes that need elevated permissions
 * - ❌ NEVER in client components
 * - ❌ NEVER in browser-accessible code
 * - ❌ Regular CRUD operations (use client.ts instead)
 *
 * **Use Cases:**
 * 1. **Admin User Management**: Create/update users with specific roles
 * 2. **Batch Operations**: Update multiple records across users
 * 3. **System Operations**: Database maintenance, analytics aggregation
 * 4. **Webhooks**: Process external events with full permissions
 *
 * **Permission Model:**
 * This client operates as the 'service_role' user:
 * - Can read/write ANY table regardless of RLS
 * - Can access auth.users table directly
 * - Can perform operations that users cannot
 * - Should validate permissions manually in your code
 *
 * @example
 * ```ts
 * // API Route example (app/api/admin/users/route.ts)
 * import { supabaseServer } from '@/lib/supabase/server';
 *
 * export async function POST(request: Request) {
 *   // IMPORTANT: Validate user is admin BEFORE using server client
 *   const { user } = await getSession();
 *   if (!isAdmin(user)) {
 *     return new Response('Unauthorized', { status: 403 });
 *   }
 *
 *   if (!supabaseServer) {
 *     return new Response('Server client not configured', { status: 500 });
 *   }
 *
 *   // Now safe to use server client (bypasses RLS)
 *   const { data, error } = await supabaseServer
 *     .from('users')
 *     .update({ role: 'admin' })
 *     .eq('id', userId);
 *
 *   return Response.json({ data, error });
 * }
 * ```
 *
 * @example
 * ```ts
 * // Bad example - DO NOT DO THIS
 * 'use client'; // ❌ NEVER use server client in client components!
 * import { supabaseServer } from '@/lib/supabase/server';
 *
 * function BadComponent() {
 *   // This exposes service key to browser - SECURITY VULNERABILITY!
 *   const data = await supabaseServer.from('articles').select('*');
 * }
 * ```
 *
 * @see {@link https://supabase.com/docs/guides/auth/auth-helpers/nextjs#server-side} Server-side Auth
 * @see {@link https://supabase.com/docs/guides/database/postgres/row-level-security#bypassing-rls} Bypassing RLS
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Server-side Supabase client with service role privileges
 *
 * @remarks
 * **Initialization:**
 * - Returns `null` if environment variables are not set (safe fallback)
 * - Always check for null before using: `if (!supabaseServer) throw error`
 * - Only initializes on server (service key is not available in browser)
 *
 * **Environment Variables:**
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Secret key (NEVER commit to git, NEVER expose to client)
 *
 * **Best Practices:**
 * 1. Always validate user permissions before executing queries
 * 2. Check for null before using
 * 3. Use specific queries (avoid SELECT *)
 * 4. Log all service role operations for audit trail
 * 5. Prefer client.ts for operations that can use RLS
 */
export const supabaseServer = supabaseUrl && supabaseServiceKey
  ? createClient<Database>(supabaseUrl, supabaseServiceKey)
  : null;

/**
 * Create a fresh Supabase client for server-side requests (respects RLS)
 *
 * This function creates a NEW client instance on each call, ensuring that
 * environment variables are read fresh from process.env on every request.
 * This prevents caching issues on platforms like Vercel where env vars
 * might be different at build time vs runtime.
 *
 * @remarks
 * **Why use this instead of the singleton client?**
 * - ✅ Reads env vars fresh on EACH request (no build-time caching)
 * - ✅ Works correctly when env vars change on Vercel/production
 * - ✅ Still respects RLS policies (uses anon key, not service role)
 * - ✅ Prevents stale data issues between environments
 *
 * **When to Use:**
 * - ✅ API routes (app/api/...)
 * - ✅ Server Actions
 * - ✅ Server Components that need data fetching
 * - ✅ Any server-side code that queries Supabase
 * - ❌ NEVER in client components (use client.ts instead)
 *
 * **Performance:**
 * Creating a new client is lightweight - it only creates a JS object
 * and doesn't establish any persistent connections. The overhead is
 * negligible compared to network requests.
 *
 * @example
 * ```ts
 * // API Route
 * import { createServerSupabase } from '@/lib/supabase/server';
 *
 * export async function GET() {
 *   const supabase = createServerSupabase();
 *
 *   const { data, error } = await supabase
 *     .from('articles')
 *     .select('*')
 *     .eq('status', 'published');
 *
 *   return Response.json(data);
 * }
 * ```
 *
 * @example
 * ```ts
 * // In a lib/api file
 * import { createServerSupabase } from '@/lib/supabase/server';
 *
 * export async function getArticles() {
 *   const supabase = createServerSupabase();
 *   const { data } = await supabase.from('articles').select('*');
 *   return data;
 * }
 * ```
 *
 * @returns A fresh Supabase client instance with anon key (respects RLS)
 */
export function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  return createClient<Database>(url, key, {
    auth: {
      // Don't persist sessions on server-side
      persistSession: false,
      // Don't try to auto-refresh tokens
      autoRefreshToken: false,
      // Don't detect session in URL
      detectSessionInUrl: false,
    },
    global: {
      // Force no caching on fetch requests
      fetch: (url, options = {}) => {
        return fetch(url, {
          ...options,
          cache: 'no-store',
        });
      },
    },
  });
}
