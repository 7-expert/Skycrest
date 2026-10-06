'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Mail, FolderKanban, ExternalLink, LogOut, Shield, Menu, X } from 'lucide-react';

export default function AdminSidebar({ userEmail, unreadCount, signOutAction }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile navigation drawer whenever pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/admin', label: 'DASHBOARD', icon: LayoutDashboard },
    { href: '/admin/messages', label: 'MESSAGES', icon: Mail, badge: unreadCount },
    { href: '/admin/projects', label: 'PROJECTS', icon: FolderKanban },
  ];

  return (
    <>
      {/* Mobile Top Header Bar */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[#18181b] border-b border-[#27272a] sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/logo2.png"
            alt="Skycrest Logo"
            width={120}
            height={36}
            className="h-7 w-auto object-contain filter brightness-110"
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          {typeof unreadCount === 'number' && unreadCount > 0 && (
            <span className="px-2.5 py-0.5 text-xs font-mono bg-[#F59E0B] text-[#141414] font-black rounded-full shadow-md">
              {unreadCount}
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-300 hover:text-white rounded-xl bg-[#242427] border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6 text-[#F59E0B]" /> : <Menu className="w-6 h-6 text-[#F59E0B]" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/75 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          w-full md:w-64 bg-[#18181b] border-r border-[#27272a] flex-col justify-between shrink-0
          md:flex md:relative md:top-0 md:z-0 md:h-auto
          ${isOpen ? 'fixed inset-x-0 top-[65px] bottom-0 z-50 flex flex-col bg-[#18181b] overflow-y-auto' : 'hidden md:flex'}
        `}
      >
        <div>
          {/* Desktop Brand Header */}
          <div className="hidden md:flex p-6 border-b border-[#27272a] items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <Image
                src="/logo2.png"
                alt="Skycrest Logo"
                width={140}
                height={40}
                className="h-9 w-auto object-contain filter brightness-110"
                priority
              />
            </Link>
          </div>

          {/* Admin Email Badge */}
          <div className="px-6 py-4 bg-[#121214] border-b border-[#27272a] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F59E0B] w-full overflow-hidden">
              <Shield className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span className="truncate max-w-[180px] font-medium">{userEmail || 'Admin User'}</span>
            </div>
          </div>

          {/* Nav Menu Links */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3.5 text-sm font-condensed font-bold tracking-wider uppercase rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                      : 'text-white hover:bg-[#27272a] hover:text-[#F59E0B]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#F59E0B]' : 'text-[#F59E0B]/80'}`} />
                    <span>{link.label}</span>
                  </div>
                  {typeof link.badge === 'number' && link.badge > 0 && (
                    <span className="px-2.5 py-0.5 text-xs font-mono bg-[#F59E0B] text-[#141414] font-black rounded-full shadow-md">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3.5 text-sm font-condensed font-bold tracking-wider uppercase text-gray-400 hover:text-white hover:bg-[#27272a] rounded-xl transition-all pt-4 border-t border-[#27272a] mt-4"
            >
              <ExternalLink className="w-4 h-4 text-gray-400" />
              <span>VIEW PUBLIC SITE</span>
            </Link>
          </nav>
        </div>

        {/* Sign Out Button */}
        <div className="p-4 border-t border-[#27272a] mt-auto">
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-condensed font-extrabold tracking-wider uppercase bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-800/60 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-300" />
              <span>SIGN OUT</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
