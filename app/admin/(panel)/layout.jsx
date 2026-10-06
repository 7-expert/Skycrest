import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

async function signOutAction() {
  'use server';
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

export default async function AdminPanelLayout({ children }) {
  const user = await requireAdmin();
  const supabase = await createClient();

  // Fetch unread count for badge
  const { count: unreadCount } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0f0f11] text-[#F9FAFB]">
      <AdminSidebar
        userEmail={user?.email}
        unreadCount={unreadCount ?? 0}
        signOutAction={signOutAction}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
