import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const supabase = await createClient();

  if (!supabase) {
    redirect('/admin/login?error=Supabase+credentials+missing.+Please+fill+NEXT_PUBLIC_SUPABASE_URL+and+NEXT_PUBLIC_SUPABASE_ANON_KEY+in+.env.local');
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    redirect('/admin/login');
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');

  if (adminError || !isAdmin) {
    redirect('/admin/login?error=Unauthorized+access.+Admin+privileges+required.');
  }

  return user;
}

export async function getAdminUser() {
  try {
    const supabase = await createClient();
    if (!supabase) return null;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: isAdmin } = await supabase.rpc('is_admin');
    return isAdmin ? user : null;
  } catch (err) {
    return null;
  }
}
