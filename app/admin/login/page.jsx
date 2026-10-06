import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, AlertCircle } from 'lucide-react';

async function loginAction(formData) {
  'use server';

  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    redirect('/admin/login?error=Please+provide+both+email+and+password');
  }

  const supabase = await createClient();

  if (!supabase) {
    redirect('/admin/login?error=Supabase+credentials+missing.+Please+set+your+real+NEXT_PUBLIC_SUPABASE_URL+and+NEXT_PUBLIC_SUPABASE_ANON_KEY+in+.env.local');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data?.user) {
    let msg = error?.message || 'Invalid email or password';
    if (
      msg.includes('Invalid path specified in request URL') ||
      msg.includes('URL and Key are required') ||
      msg.includes('fetch failed')
    ) {
      msg = 'Supabase API variables missing or invalid. Please configure your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local';
    }
    redirect(`/admin/login?error=${encodeURIComponent(msg)}`);
  }

  // Check is_admin()
  const { data: isAdmin, error: adminErr } = await supabase.rpc('is_admin');

  if (adminErr || !isAdmin) {
    await supabase.auth.signOut();
    redirect('/admin/login?error=Access+denied.+Account+is+not+registered+as+an+administrator.');
  }

  redirect('/admin');
}

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0d0d0f] relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F59E0B]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 w-full max-w-md bg-[#18181b] border-2 border-[#F59E0B]/40 rounded-3xl p-8 sm:p-10 shadow-2xl">
        {/* Brand Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo2.png"
              alt="Skycrest Logo"
              width={200}
              height={60}
              className="h-14 w-auto object-contain filter brightness-110"
              priority
            />
          </div>
          <div className="inline-block text-[10px] font-mono font-bold tracking-[0.25em] text-[#F59E0B] uppercase bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/20 mb-2">
            ADMINISTRATOR PORTAL
          </div>
          <h1 className="font-condensed font-black text-3xl text-white uppercase tracking-tight">
            SYSTEM SIGN IN
          </h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/80 border border-red-500/80 text-red-200 text-xs font-mono rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{decodeURIComponent(error)}</span>
          </div>
        )}

        <form action={loginAction} className="space-y-6">
          <div>
            <label htmlFor="admin-email" className="block text-xs font-condensed font-extrabold text-[#F59E0B] tracking-wider uppercase mb-2">
              ADMIN EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                id="admin-email"
                name="email"
                type="email"
                required
                placeholder="Enter admin email"
                className="w-full bg-[#242427] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-xs font-condensed font-extrabold text-[#F59E0B] tracking-wider uppercase mb-2">
              PASSWORD
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                id="admin-password"
                name="password"
                type="password"
                required
                placeholder="••••••••••••"
                className="w-full bg-[#242427] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#F59E0B] hover:bg-[#d98206] text-[#141414] font-condensed font-black text-base tracking-wider uppercase py-4 rounded-xl transition-all duration-200 shadow-xl cursor-pointer"
          >
            SIGN IN TO ADMIN PANEL
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-[11px] font-mono text-gray-500">
          Authorized Operations Personnel Only
        </div>
      </div>
    </div>
  );
}
