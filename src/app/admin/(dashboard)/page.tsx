import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { FiPackage, FiLayers, FiBarChart2, FiTrendingUp } from 'react-icons/fi';

export default async function AdminDashboard() {
  const [productCount, brandCount, categoryCount, inStockCount, lowStockCount, outStockCount] = await Promise.all([
    prisma.product.count(),
    prisma.brand.count(),
    prisma.category.count(),
    prisma.product.count({ where: { stockQuantity: { gt: 5 } } }),
    prisma.product.count({ where: { stockQuantity: { gt: 0, lte: 5 } } }),
    prisma.product.count({ where: { stockQuantity: { lte: 0 } } }),
  ]);

  const stats = [
    { label: 'Toplam Ürün', value: productCount, icon: FiPackage, color: 'bg-blue-50 text-[#0057A8]', href: '/admin/urunler' },
    { label: 'Markalar', value: brandCount, icon: FiTrendingUp, color: 'bg-green-50 text-green-700', href: '/admin/kategoriler' },
    { label: 'Kategoriler', value: categoryCount, icon: FiLayers, color: 'bg-purple-50 text-purple-700', href: '/admin/kategoriler' },
    { label: 'Stokta', value: inStockCount, icon: FiBarChart2, color: 'bg-emerald-50 text-emerald-700', href: '/admin/stok' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A2E]">{s.value}</p>
                <p className="text-sm text-[#6B7280]">{s.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">Stok Durumu Özeti</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-green-50">
            <div className="text-2xl font-bold text-green-700">{inStockCount}</div>
            <div className="text-sm text-green-600">Stokta Var</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-yellow-50">
            <div className="text-2xl font-bold text-yellow-700">{lowStockCount}</div>
            <div className="text-sm text-yellow-600">Az Kaldı</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-red-50">
            <div className="text-2xl font-bold text-red-700">{outStockCount}</div>
            <div className="text-sm text-red-600">Stok Dışı</div>
          </div>
        </div>
      </div>
    </div>
  );
}
