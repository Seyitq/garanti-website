'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiPackage, FiLayers, FiBarChart2, FiLogOut, FiMenu, FiX, FiUsers } from 'react-icons/fi';
import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: FiHome },
  { href: '/admin/urunler', label: 'Ürünler', icon: FiPackage },
  { href: '/admin/kategoriler', label: 'Kategoriler', icon: FiLayers },
  { href: '/admin/stok', label: 'Stok Yönetimi', icon: FiBarChart2 },
  { href: '/admin/referans-firmalar', label: 'Referans Firmalar', icon: FiUsers },
];

interface AdminSidebarProps {
  userName: string;
  userRole: string;
}

export default function AdminSidebar({ userName, userRole }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const roleLabels: Record<string, string> = {
    super_admin: 'Süper Admin',
    editor: 'Editör',
    viewer: 'İzleyici',
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/giris');
    router.refresh();
  };

  const sidebar = (
    <>
      {/* Header */}
      <div className="p-5 border-b border-gray-700">
        <Link href="/admin" className="block">
          <h2 className="text-white font-bold text-base">Garanti Admin</h2>
          <p className="text-xs text-gray-400 mt-0.5">Yönetim Paneli</p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#0057A8] text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-gray-700">
        <div className="mb-3">
          <p className="text-sm font-medium text-white">{userName}</p>
          <p className="text-xs text-gray-400">{roleLabels[userRole] || userRole}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-full"
        >
          <FiLogOut className="w-4 h-4" />
          Çıkış Yap
        </button>
        <Link href="/" className="block mt-2 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ← Siteye Dön
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1A1A2E] text-white rounded-lg shadow-lg"
        aria-label="Menü"
      >
        {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-[#1A1A2E]">
        {sidebar}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-[#1A1A2E] z-50 flex flex-col lg:hidden">
            {sidebar}
          </aside>
        </>
      )}
    </>
  );
}
