import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

interface FeaturedProduct {
  name: string;
  slug: string;
  oemCode: string;
  brandName: string;
  brandSlug: string;
  categorySlug: string;
  imageUrl: string;
  stockQuantity: number;
  stockLabel: string;
  stockBadgeClass: string;
}

export default function FeaturedProducts({ products }: { products: FeaturedProduct[] }) {
  return (
    <section className="py-16 md:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-2">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-[#6B7280]">
              En çok tercih edilen yedek parçalarımız
            </p>
          </div>
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 text-[#0057A8] hover:text-[#004080] font-medium text-sm transition-colors"
          >
            Tümünü Gör
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              name={product.name}
              slug={product.slug}
              oemCode={product.oemCode}
              brandName={product.brandName}
              brandSlug={product.brandSlug}
              categorySlug={product.categorySlug}
              imageUrl={product.imageUrl}
              stockQuantity={product.stockQuantity}
              stockLabel={product.stockLabel}
              stockBadgeClass={product.stockBadgeClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
