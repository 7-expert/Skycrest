import { createClient } from '@/lib/supabase/server';

export async function getPublishedProjects() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase projects fetch warning:', error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.warn('Exception in getPublishedProjects:', err);
    return null;
  }
}
