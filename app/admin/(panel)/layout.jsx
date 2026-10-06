import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Mail, FolderKanban, ExternalLink, LogOut, Shield } from 'lucide-react';

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
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#18181b] border-r border-[#27272a] flex flex-col justify-between shrink-0">
          <div>
            {/* Sidebar Brand Header */}
            <div className="p-6 border-b border-[#27272a] flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-3">
                <Image
                  src="/logo2.png"
                  alt="Skycrest Logo"
                  width={140}
                  height={40}
                  className="h-9 w-auto object-contain filter brightness-110"
                />
              </Link>
            </div>

            {/* Admin Badge */}
            <div className="px-6 py-4 bg-[#121214] border-b border-[#27272a] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F59E0B]">
                <Shield className="w-4 h-4 text-[#F59E0B]" />
                <span className="truncate max-w-[140px] font-medium">{user?.email}</span>
              </div>
            </div>

            {/* Nav Menu Links */}
            <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-3 text-sm font-condensed font-bold tracking-wider uppercase text-white hover:bg-[#27272a] hover:text-[#F59E0B] rounded-xl transition-all"
              >
                <LayoutDashboard className="w-5 h-5 text-[#F59E0B]" />
                <span>DASHBOARD</span>
              </Link>

              <Link
                href="/admin/messages"
                className="flex items-center justify-between px-4 py-3 text-sm font-condensed font-bold tracking-wider uppercase text-white hover:bg-[#27272a] hover:text-[#F59E0B] rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#F59E0B]" />
                  <span>MESSAGES</span>
                </div>
                {typeof unreadCount === 'number' && unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-mono bg-[#F59E0B] text-[#141414] font-black rounded-full shadow-md">
                    {unreadCount}
                  </span>
                )}
              </Link>

              <Link
                href="/admin/projects"
                className="flex items-center gap-3 px-4 py-3 text-sm font-condensed font-bold tracking-wider uppercase text-white hover:bg-[#27272a] hover:text-[#F59E0B] rounded-xl transition-all"
              >
                <FolderKanban className="w-5 h-5 text-[#F59E0B]" />
                <span>PROJECTS</span>
              </Link>

              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 px-4 py-3 text-sm font-condensed font-bold tracking-wider uppercase text-gray-400 hover:text-white hover:bg-[#27272a] rounded-xl transition-all pt-4 border-t border-[#27272a] mt-4"
              >
                <ExternalLink className="w-4 h-4 text-gray-400" />
                <span>VIEW PUBLIC SITE</span>
              </Link>
            </nav>
          </div>

          {/* Sign Out Button */}
          <div className="p-4 border-t border-[#27272a]">
            <form action={signOutAction}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-condensed font-extrabold tracking-wider uppercase bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-800/60 rounded-xl transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-300" />
                <span>SIGN OUT</span>
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
  );
}
