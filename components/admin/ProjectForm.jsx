'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, Trash2, Loader2, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'Commercial',
  'Residential',
  'Infrastructure',
  'Fit-Out',
  'HIGH-RISE TOWERS',
  'RESIDENTIAL & COMMERCIAL',
  'LUXURY VILLAS',
  'INDUSTRIAL & WAREHOUSES',
];

const STATUSES = ['Completed', 'Ongoing'];

export default function ProjectForm({ project, action, title: formTitle }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [previewUrl, setPreviewUrl] = useState(project?.image_url || '');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check image format
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Selected file must be an image.');
      return;
    }

    // Check max size (8MB)
    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('Image size must be less than 8 MB.');
      return;
    }

    setErrorMsg('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const formData = new FormData(e.currentTarget);

      if (selectedFile) {
        formData.set('imageFile', selectedFile);
      }

      await action(formData);
    } catch (err) {
      setErrorMsg(err?.message || 'Failed to save project.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-[#27272a]">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="p-2.5 bg-[#18181b] hover:bg-[#242427] text-[#F59E0B] border border-[#27272a] rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="text-xs font-mono text-[#F59E0B] tracking-widest uppercase">
              PORTFOLIO EDITOR
            </div>
            <h1 className="font-condensed font-black text-3xl text-white uppercase tracking-tight">
              {formTitle}
            </h1>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-950/80 border border-red-500 text-red-200 text-xs font-mono rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
        {project?.id && <input type="hidden" name="id" value={project.id} />}
        {project?.image_url && <input type="hidden" name="current_image_url" value={project.image_url} />}

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-xs font-condensed font-extrabold text-[#F59E0B] tracking-wider uppercase mb-2">
            PROJECT TITLE *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={project?.title || ''}
            placeholder="e.g. Construction of Residential Building (G+2P+16+Roof)"
            className="w-full bg-[#242427] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
          />
        </div>

        {/* Category & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-xs font-condensed font-extrabold text-[#F59E0B] tracking-wider uppercase mb-2">
              CATEGORY *
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue={project?.category || CATEGORIES[0]}
              className="w-full bg-[#242427] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-[#18181b] text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-xs font-condensed font-extrabold text-[#F59E0B] tracking-wider uppercase mb-2">
              PROJECT STATUS *
            </label>
            <select
              id="status"
              name="status"
              required
              defaultValue={project?.status || STATUSES[0]}
              className="w-full bg-[#242427] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
            >
              {STATUSES.map((st) => (
                <option key={st} value={st} className="bg-[#18181b] text-white">
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location & Completion Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block text-xs font-condensed font-extrabold text-[#F59E0B] tracking-wider uppercase mb-2">
              LOCATION
            </label>
            <input
              id="location"
              name="location"
              type="text"
              defaultValue={project?.location || 'Dubai, UAE'}
              placeholder="e.g. Business Bay, Dubai, UAE"
              className="w-full bg-[#242427] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
            />
          </div>

          <div>
            <label htmlFor="completion_date" className="block text-xs font-condensed font-extrabold text-[#F59E0B] tracking-wider uppercase mb-2">
              COMPLETION YEAR / DATE
            </label>
            <input
              id="completion_date"
              name="completion_date"
              type="text"
              defaultValue={project?.completion_date || '2024'}
              placeholder="e.g. 2024"
              className="w-full bg-[#242427] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
            />
          </div>
        </div>

        {/* Image File Upload & Preview */}
        <div>
          <label className="block text-xs font-condensed font-extrabold text-[#F59E0B] tracking-wider uppercase mb-2">
            PROJECT IMAGE (MAX 8 MB, PNG/JPG/WEBP)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-[#121214] p-5 rounded-2xl border border-[#27272a]">
            {/* Image Preview */}
            <div className="sm:col-span-4 relative w-full h-36 rounded-xl overflow-hidden bg-[#242427] border border-white/10 flex items-center justify-center">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Project Preview"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              ) : (
                <div className="text-center text-xs font-mono text-gray-500 p-2">
                  No Image Uploaded
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="sm:col-span-8 space-y-3">
              <label className="inline-flex items-center gap-2 bg-[#242427] hover:bg-[#2f2f34] text-white text-xs font-condensed font-bold uppercase px-5 py-3 rounded-xl border border-white/15 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-[#F59E0B]" />
                <span>CHOOSE IMAGE FILE</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <div className="text-[11px] font-mono text-gray-400">
                Uploaded to public Supabase bucket <code className="text-[#F59E0B]">project-images</code>.
              </div>
            </div>
          </div>
        </div>

        {/* Scope & Description */}
        <div>
          <label htmlFor="scope" className="block text-xs font-condensed font-extrabold text-[#F59E0B] tracking-wider uppercase mb-2">
            SCOPE OF WORK
          </label>
          <input
            id="scope"
            name="scope"
            type="text"
            defaultValue={project?.scope || 'General Construction / Turnkey Handover'}
            placeholder="e.g. Turnkey EPC Contracting & Engineering"
            className="w-full bg-[#242427] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-condensed font-extrabold text-[#F59E0B] tracking-wider uppercase mb-2">
            FULL PROJECT DESCRIPTION
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={project?.description || ''}
            placeholder="Describe the architectural design, structural framing, MEP integration, and key technical specifications..."
            className="w-full bg-[#242427] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
          />
        </div>

        {/* Sort Order & Published Checkbox */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#27272a]">
          <div>
            <label htmlFor="sort_order" className="block text-xs font-condensed font-extrabold text-[#F59E0B] tracking-wider uppercase mb-2">
              SORT ORDER (DISPLAY DISPLAY PRIORITY)
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={project?.sort_order ?? 0}
              className="w-full bg-[#242427] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
            />
          </div>

          <div className="flex items-center pt-6">
            <label className="relative flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_published"
                defaultChecked={project ? project.is_published : true}
                className="w-5 h-5 accent-[#F59E0B] rounded cursor-pointer"
              />
              <span className="text-sm font-condensed font-extrabold uppercase text-white tracking-wider">
                PUBLISHED ON PUBLIC WEBSITE
              </span>
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-[#27272a] flex items-center justify-end gap-4">
          <Link
            href="/admin/projects"
            className="px-6 py-3.5 bg-[#242427] hover:bg-gray-800 text-gray-300 font-condensed font-bold text-sm tracking-wider uppercase rounded-xl transition-all"
          >
            CANCEL
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#d98206] text-[#141414] font-condensed font-black text-sm tracking-wider uppercase px-8 py-3.5 rounded-xl transition-all shadow-xl cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#141414]" />
                <span>SAVING PROJECT...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5 text-[#141414]" />
                <span>SAVE PROJECT</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
