'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (status === 'unauthenticated' && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [status, router, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/bookings', label: 'Bookings', icon: '📋' },
    { href: '/admin/messages', label: 'Messages', icon: '💬' },
    { href: '/admin/services', label: 'Services', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Sidebar */}
      <aside className={`admin-sidebar w-64 fixed inset-y-0 left-0 z-30 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <span className="text-navy-950 font-bold text-lg">T</span>
            </div>
            <div>
              <h2 className="font-bold gradient-text text-sm">Ticksol Admin</h2>
              <p className="text-[10px] text-navy-400">Management Panel</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname === item.href
                    ? 'bg-gold-400/10 text-gold-400 border border-gold-400/20'
                    : 'text-navy-300 hover:text-white hover:bg-navy-800/50'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="glass-card-light p-4 mb-3">
            <p className="text-xs text-navy-400">Signed in as</p>
            <p className="text-sm text-white font-medium truncate">{session.user?.email}</p>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full text-sm text-navy-400 hover:text-red-400 transition-colors py-2">
            Sign Out
          </button>
          <Link href="/" className="block w-full text-center text-sm text-navy-500 hover:text-gold-400 transition-colors py-2 mt-1">
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-navy-950/80 backdrop-blur-xl border-b border-navy-800/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-navy-300 hover:text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            </button>
            <h1 className="text-lg font-semibold text-white hidden lg:block">
              {navItems.find((i) => i.href === pathname)?.label || 'Admin'}
            </h1>
            <div className="text-sm text-navy-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  );
}
