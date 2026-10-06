import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  let supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

  // Normalize URL (strip /rest/v1 and trailing slashes)
  supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl.includes('your-project-id') ||
    supabaseAnonKey.includes('your-anon-key')
  ) {
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
