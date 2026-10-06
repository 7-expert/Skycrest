import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { Mail, Trash2, Eye, EyeOff, Phone, Calendar, Filter } from 'lucide-react';

async function toggleReadAction(formData) {
  'use server';
  await requireAdmin();
  const id = formData.get('id');
  const is_read = formData.get('is_read') === 'true';

  const supabase = await createClient();
  await supabase
    .from('contact_submissions')
    .update({ is_read: !is_read })
    .eq('id', id);

  revalidatePath('/admin/messages');
  revalidatePath('/admin');
}

async function deleteMessageAction(formData) {
  'use server';
  await requireAdmin();
  const id = formData.get('id');

  const supabase = await createClient();
  await supabase.from('contact_submissions').delete().eq('id', id);

  revalidatePath('/admin/messages');
  revalidatePath('/admin');
}

export default async function AdminMessagesPage({ searchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const filter = params?.filter === 'unread' ? 'unread' : 'all';

  const supabase = await createClient();
  let query = supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (filter === 'unread') {
    query = query.eq('is_read', false);
  }

  const { data: messages, error } = await query;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
        <div>
          <div className="text-xs font-mono text-[#F59E0B] tracking-widest uppercase mb-1">
            COMMUNICATIONS CENTER
          </div>
          <h1 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            CONTACT INQUIRIES
          </h1>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 bg-[#18181b] p-1.5 border border-[#27272a] rounded-xl self-start">
          <Link
            href="/admin/messages?filter=all"
            className={`px-4 py-2 text-xs font-condensed font-bold uppercase rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-[#F59E0B] text-[#141414] shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ALL INQUIRIES
          </Link>
          <Link
            href="/admin/messages?filter=unread"
            className={`px-4 py-2 text-xs font-condensed font-bold uppercase rounded-lg transition-all ${
              filter === 'unread'
                ? 'bg-[#F59E0B] text-[#141414] shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            UNREAD ONLY
          </Link>
        </div>
      </div>

      {/* Messages List */}
      {error && (
        <div className="p-4 bg-red-950/80 border border-red-500 text-red-200 text-xs font-mono rounded-xl">
          Error loading inquiries: {error.message}
        </div>
      )}

      {(!messages || messages.length === 0) ? (
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-12 text-center text-xs font-mono text-gray-500">
          No inquiries found for filter: <span className="text-[#F59E0B] font-bold uppercase">{filter}</span>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-[#18181b] border rounded-2xl p-6 transition-all shadow-lg ${
                msg.is_read
                  ? 'border-[#27272a] opacity-90'
                  : 'border-[#F59E0B]/60 shadow-[#F59E0B]/5'
              }`}
            >
              {/* Header Info Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#27272a]">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-condensed font-extrabold text-xl text-white uppercase">
                      {msg.name}
                    </span>
                    {msg.is_read ? (
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-gray-800 text-gray-400">
                        READ
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#F59E0B] text-[#141414] font-black">
                        UNREAD
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-[#F59E0B] hover:underline flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{msg.email}</span>
                    </a>
                    {msg.phone && (
                      <a
                        href={`tel:${msg.phone}`}
                        className="text-gray-300 hover:text-white flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>{msg.phone}</span>
                      </a>
                    )}
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(msg.created_at).toLocaleString()}</span>
                    </span>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex items-center gap-2 shrink-0">
                  <form action={toggleReadAction}>
                    <input type="hidden" name="id" value={msg.id} />
                    <input type="hidden" name="is_read" value={msg.is_read ? 'true' : 'false'} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#242427] hover:bg-gray-700 text-gray-300 hover:text-white text-xs font-condensed font-bold uppercase rounded-lg transition-colors cursor-pointer"
                    >
                      {msg.is_read ? (
                        <>
                          <Eye className="w-4 h-4 text-[#F59E0B]" />
                          <span>MARK UNREAD</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4 text-gray-400" />
                          <span>MARK READ</span>
                        </>
                      )}
                    </button>
                  </form>

                  <form action={deleteMessageAction}>
                    <input type="hidden" name="id" value={msg.id} />
                    <button
                      type="submit"
                      className="p-2 bg-red-950/40 hover:bg-red-900/80 text-red-400 hover:text-white rounded-lg transition-colors border border-red-900/60 cursor-pointer"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Subject Tag */}
              {msg.subject && (
                <div className="mt-4 text-xs font-mono text-[#F59E0B] uppercase font-bold">
                  SUBJECT: {msg.subject}
                </div>
              )}

              {/* Full Message Body */}
              <div className="mt-3 text-sm font-light text-gray-200 leading-relaxed bg-[#121214] p-4 rounded-xl border border-[#27272a] whitespace-pre-wrap">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
