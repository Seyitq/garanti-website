import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/admin/giris');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <AdminSidebar userName={session.name} userRole={session.role} />
      <div className="flex-1 lg:ml-64">
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
