'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '◈' },
  { href: '/admin/gallery', label: 'Gallery', icon: '◻' },
  { href: '/admin/projects', label: 'Projects', icon: '◧' },
  { href: '/admin/content', label: 'Content', icon: '≡' },
  { href: '/admin/links', label: 'Links', icon: '⌲' },
  { href: '/admin/subscribers', label: 'Subscribers', icon: '◎' },
  { href: '/admin/inquiries', label: 'Inquiries', icon: '◉' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-56 bg-black text-white flex flex-col z-50 hidden md:flex">
      <div className="px-5 py-6 border-b border-white/10">
        <p className="font-display italic text-lg text-white">Vira Admin</p>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                active ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xs">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
