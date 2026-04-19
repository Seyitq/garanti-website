import { prisma } from '@/lib/prisma';
import StockManager from '@/components/admin/StockManager';

export default async function StockPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ stockQuantity: 'asc' }, { name: 'asc' }],
    include: { brand: true, category: true },
  });

  const data = products.map((p) => ({
    id: p.id,
    name: p.name,
    oemCode: p.oemCode,
    stockQuantity: p.stockQuantity,
    brand: { name: p.brand.name },
    category: { name: p.category.name },
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Stok Yönetimi</h1>
      <StockManager products={data} />
    </div>
  );
}
