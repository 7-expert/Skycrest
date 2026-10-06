import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Mail, FolderKanban, ArrowRight, CheckCircle2, Eye, EyeOff, MessageSquare } from 'lucide-react';

export default async function AdminDashboardPage() {
  await requireAdmin();
  const supabase = await createClient();

  // Fetch Stats concurrently
  const [
    { count: unreadCount },
    { count: totalMessages },
    { count: totalProjects },
    { count: publishedProjects },
    { data: latestMessages },
  ] = await Promise.all([
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('is_read', false),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(5),
  ]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="text-xs font-mono text-[#F59E0B] tracking-widest uppercase mb-1">
          EXECUTIVE OVERVIEW // COMMAND DASHBOARD
        </div>
        <h1 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
          SYSTEM DASHBOARD
        </h1>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#18181b] border border-[#27272a] p-6 rounded-2xl relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-gray-400 uppercase mb-1">UNREAD MESSAGES</div>
              <div className="text-3xl font-condensed font-black text-[#F59E0B]">
                {unreadCount ?? 0}
              </div>
            </div>
            <div className="p-3 bg-[#F59E0B]/10 rounded-xl text-[#F59E0B]">
              <Mail className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-[#27272a] p-6 rounded-2xl relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-gray-400 uppercase mb-1">TOTAL INQUIRIES</div>
              <div className="text-3xl font-condensed font-black text-white">
                {totalMessages ?? 0}
              </div>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-[#27272a] p-6 rounded-2xl relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-gray-400 uppercase mb-1">TOTAL PROJECTS</div>
              <div className="text-3xl font-condensed font-black text-white">
                {totalProjects ?? 0}
              </div>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
              <FolderKanban className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-[#27272a] p-6 rounded-2xl relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-gray-400 uppercase mb-1">PUBLISHED PROJECTS</div>
              <div className="text-3xl font-condensed font-black text-emerald-400">
                {publishedProjects ?? 0}
              </div>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Messages Summary Card */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#27272a]">
          <div>
            <h2 className="font-condensed font-extrabold text-xl uppercase text-white">
              RECENT CAPITAL INQUIRIES
            </h2>
            <p className="text-xs font-mono text-gray-400 mt-0.5">
              5 Most recent contact form submissions
            </p>
          </div>
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-2 text-xs font-condensed font-bold text-[#F59E0B] hover:text-white uppercase transition-colors"
          >
            <span>VIEW ALL MESSAGES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {(!latestMessages || latestMessages.length === 0) ? (
          <div className="py-12 text-center text-xs font-mono text-gray-500">
            No contact submissions received yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-[#27272a] text-[10px] font-mono text-gray-400 uppercase">
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4">SENDER NAME</th>
                  <th className="py-3 px-4">EMAIL</th>
                  <th className="py-3 px-4">SUBJECT / CATEGORY</th>
                  <th className="py-3 px-4">DATE</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]/60">
                {latestMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-[#242427] transition-colors">
                    <td className="py-3.5 px-4">
                      {msg.is_read ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-gray-800 text-gray-400">
                          <EyeOff className="w-3 h-3" /> READ
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-[#F59E0B]/20 text-[#F59E0B] font-bold">
                          <Eye className="w-3 h-3" /> UNREAD
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">{msg.name}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-300">{msg.email}</td>
                    <td className="py-3.5 px-4 text-gray-300 truncate max-w-[200px]">
                      {msg.subject || 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-400">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href="/admin/messages"
                        className="text-xs font-condensed font-bold text-[#F59E0B] hover:underline uppercase"
                      >
                        VIEW DETAILS
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
