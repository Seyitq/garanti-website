import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { FiPlus } from 'react-icons/fi';
import { getStockInfo } from '@/lib/constants';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      brand: true,
      category: true,
      images: { take: 1, orderBy: { sortOrder: 'asc' } },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Ürünler</h1>
        <Link
          href="/admin/urunler/yeni"
          className="flex items-center gap-2 bg-[#0057A8] hover:bg-[#004080] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Yeni Ürün
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-[#6B7280]">Ürün</th>
                <th className="px-4 py-3 font-medium text-[#6B7280]">Parça Kodu</th>
                <th className="px-4 py-3 font-medium text-[#6B7280]">Marka</th>
                <th className="px-4 py-3 font-medium text-[#6B7280]">Kategori</th>
                <th className="px-4 py-3 font-medium text-[#6B7280]">Stok</th>
                <th className="px-4 py-3 font-medium text-[#6B7280]">Öne Çıkan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => {
                const stockInfo = getStockInfo(p.stockQuantity);
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={p.images[0]?.url || '/images/products/placeholder.svg'}
                            alt={p.name}
                            width={40}
                            height={40}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <span className="font-medium text-[#1A1A2E] line-clamp-1">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#6B7280]">{p.oemCode}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{p.brand.name}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{p.category.name}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stockInfo.badgeClass}`}>
                        {p.stockQuantity} adet
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {p.isFeatured && <span className="text-xs bg-[#F5A800]/20 text-[#F5A800] px-2 py-0.5 rounded-full font-medium">⭐</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
          <div className="text-center py-12 text-[#6B7280]">
            Henüz ürün eklenmemiş.
          </div>
        )}
      </div>
    </div>
  );
}
