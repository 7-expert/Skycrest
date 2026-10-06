import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, CheckCircle2, XCircle, MapPin, Tag } from 'lucide-react';

async function deleteProjectAction(formData) {
  'use server';
  await requireAdmin();
  const id = formData.get('id');
  const imageUrl = formData.get('imageUrl');

  const supabase = await createClient();

  // If image is in Supabase storage, delete storage object
  if (imageUrl && imageUrl.includes('supabase.co/storage/v1/object/public/project-images/')) {
    const filename = imageUrl.split('project-images/').pop();
    if (filename) {
      await supabase.storage.from('project-images').remove([filename]);
    }
  }

  // Delete DB record
  await supabase.from('projects').delete().eq('id', id);

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/admin/projects');
}

export default async function AdminProjectsPage() {
  await requireAdmin();
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
        <div>
          <div className="text-xs font-mono text-[#F59E0B] tracking-widest uppercase mb-1">
            PORTFOLIO MANAGEMENT
          </div>
          <h1 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            PROJECTS CATALOG
          </h1>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#d98206] text-[#141414] font-condensed font-black text-sm tracking-wider uppercase px-6 py-3.5 rounded-xl transition-all shadow-xl cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5 text-[#141414]" />
          <span>NEW PROJECT</span>
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-950/80 border border-red-500 text-red-200 text-xs font-mono rounded-xl">
          Error loading projects: {error.message}
        </div>
      )}

      {(!projects || projects.length === 0) ? (
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-12 text-center text-xs font-mono text-gray-500 space-y-4">
          <div>No projects created in catalog.</div>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 bg-[#F59E0B] text-[#141414] px-4 py-2 font-condensed font-extrabold uppercase rounded-lg"
          >
            <Plus className="w-4 h-4" /> CREATE FIRST PROJECT
          </Link>
        </div>
      ) : (
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-[#27272a] text-[10px] font-mono text-gray-400 uppercase bg-[#121214]">
                  <th className="py-4 px-4">THUMBNAIL</th>
                  <th className="py-4 px-4">PROJECT TITLE</th>
                  <th className="py-4 px-4">CATEGORY</th>
                  <th className="py-4 px-4">STATUS</th>
                  <th className="py-4 px-4">PUBLISHED</th>
                  <th className="py-4 px-4">ORDER</th>
                  <th className="py-4 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]/70">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-[#242427] transition-colors">
                    <td className="py-3 px-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-[#121214] border border-[#27272a] shrink-0">
                        {proj.image_url ? (
                          <Image
                            src={proj.image_url}
                            alt={proj.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-gray-500">
                            NO IMG
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-condensed font-extrabold text-base text-white uppercase max-w-xs truncate">
                        {proj.title}
                      </div>
                      {proj.location && (
                        <div className="text-[10px] font-mono text-gray-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#F59E0B]" />
                          <span>{proj.location}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono bg-[#242427] text-[#F59E0B] font-bold border border-white/5">
                        <Tag className="w-3 h-3" />
                        {proj.category}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                          proj.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}
                      >
                        {proj.status}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      {proj.is_published ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> YES
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500">
                          <XCircle className="w-4 h-4 text-gray-500" /> NO
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 font-mono text-gray-300 font-bold">
                      {proj.sort_order ?? 0}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/${proj.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#242427] hover:bg-[#F59E0B] hover:text-[#141414] text-white text-xs font-condensed font-bold uppercase rounded-lg transition-all"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>EDIT</span>
                        </Link>

                        <form action={deleteProjectAction}>
                          <input type="hidden" name="id" value={proj.id} />
                          <input type="hidden" name="imageUrl" value={proj.image_url || ''} />
                          <button
                            type="submit"
                            className="p-2 bg-red-950/40 hover:bg-red-900/80 text-red-400 hover:text-white rounded-lg transition-colors border border-red-900/60 cursor-pointer"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
