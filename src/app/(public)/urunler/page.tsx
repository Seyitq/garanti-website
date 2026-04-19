import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import ProductCard from '@/components/product/ProductCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CatalogFilters from './CatalogFilters';
import { getStockInfo } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Ürünler',
  description: 'İş makinesi yedek parçaları kataloğu. Volvo, Komatsu, Caterpillar, Hidromek, John Deere ve Champion yedek parçaları.',
};

interface CatalogPageProps {
  searchParams: Promise<{
    brand?: string;
    category?: string;
    stock?: string;
    sort?: string;
    page?: string;
    q?: string;
  }>;
}

const PAGE_SIZE = 12;

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const offset = (currentPage - 1) * PAGE_SIZE;

  // Build where clause
  const where: Record<string, unknown> = {};
  if (params.brand) {
    where.brand = { slug: params.brand };
  }
  if (params.category) {
    where.category = { slug: params.category };
  }
  if (params.stock) {
    if (params.stock === 'in_stock') where.stockQuantity = { gt: 5 };
    else if (params.stock === 'low_stock') where.stockQuantity = { gt: 0, lte: 5 };
    else if (params.stock === 'out_of_stock') where.stockQuantity = { lte: 0 };
  }
  if (params.q) {
    where.OR = [
      { name: { contains: params.q } },
      { oemCode: { contains: params.q } },
    ];
  }

  // Sort
  let orderBy: Record<string, string> = { createdAt: 'desc' };
  if (params.sort === 'name') orderBy = { name: 'asc' };
  if (params.sort === 'code') orderBy = { oemCode: 'asc' };

  const [products, total, brands, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: offset,
      take: PAGE_SIZE,
      include: {
        brand: true,
        category: true,
        images: { take: 1, orderBy: { sortOrder: 'asc' } },
      },
    }),
    prisma.product.count({ where }),
    prisma.brand.findMany({ orderBy: { sortOrder: 'asc' } }),
    params.brand
      ? prisma.category.findMany({
          where: { brand: { slug: params.brand } },
          orderBy: { sortOrder: 'asc' },
        })
      : prisma.category.findMany({
          orderBy: { sortOrder: 'asc' },
          distinct: ['name'],
        }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb items={[{ label: 'Ürünler' }]} />

        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <CatalogFilters
              brands={brands.map((b) => ({ name: b.name, slug: b.slug }))}
              categories={categories.map((c) => ({ name: c.name, slug: c.slug }))}
              currentBrand={params.brand}
              currentCategory={params.category}
              currentStock={params.stock}
              currentSort={params.sort}
              currentQuery={params.q}
            />
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#1A1A2E]">
                  {params.brand
                    ? brands.find((b) => b.slug === params.brand)?.name + ' Yedek Parçaları'
                    : 'Tüm Ürünler'}
                </h1>
                <p className="text-sm text-[#6B7280] mt-1">{total} ürün bulundu</p>
              </div>
            </div>

            {/* Product Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {products.map((p) => {
                  const stockInfo = getStockInfo(p.stockQuantity);
                  return (
                    <ProductCard
                      key={p.id}
                      name={p.name}
                      slug={p.slug}
                      oemCode={p.oemCode}
                      brandName={p.brand.name}
                      brandSlug={p.brand.slug}
                      categorySlug={p.category.slug}
                      imageUrl={p.images[0]?.url || '/images/products/placeholder.svg'}
                      stockQuantity={p.stockQuantity}
                      stockLabel={stockInfo.label}
                      stockBadgeClass={stockInfo.badgeClass}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <p className="text-[#6B7280] text-lg mb-2">Ürün bulunamadı</p>
                <p className="text-sm text-[#6B7280]">Filtrelerinizi değiştirmeyi deneyin.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const params2 = new URLSearchParams();
                  if (params.brand) params2.set('brand', params.brand);
                  if (params.category) params2.set('category', params.category);
                  if (params.stock) params2.set('stock', params.stock);
                  if (params.sort) params2.set('sort', params.sort);
                  if (params.q) params2.set('q', params.q);
                  params2.set('page', String(p));

                  return (
                    <a
                      key={p}
                      href={`/urunler?${params2.toString()}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        p === currentPage
                          ? 'bg-[#0057A8] text-white'
                          : 'bg-white text-[#1A1A2E] border border-gray-200 hover:bg-[#E6F0FA]'
                      }`}
                    >
                      {p}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
