import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import Breadcrumb from '@/components/ui/Breadcrumb';
import StockBadge from '@/components/ui/StockBadge';
import ProductCard from '@/components/product/ProductCard';
import { getWhatsAppUrl, getStockInfo } from '@/lib/constants';

interface Props {
  params: Promise<{ brand: string; category: string; slug: string }>;
}

async function getProduct(brand: string, category: string, slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
      brand: { slug: brand },
      category: { slug: category },
    },
    include: {
      brand: true,
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
      specifications: { orderBy: { sortOrder: 'asc' } },
    },
  });
  return product;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, category, slug } = await params;
  const product = await getProduct(brand, category, slug);
  if (!product) return { title: 'Ürün Bulunamadı' };

  return {
    title: `${product.name} - ${product.brand.name}`,
    description: product.metaDesc || `${product.name} - ${product.brand.name} ${product.category.name}. OEM Kodu: ${product.oemCode}`,
    openGraph: {
      title: `${product.name} - ${product.brand.name}`,
      description: product.metaDesc || `${product.name} yedek parça`,
      images: product.images[0] ? [{ url: product.images[0].url }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { brand, category, slug } = await params;
  const product = await getProduct(brand, category, slug);
  if (!product) notFound();

  const waUrl = getWhatsAppUrl(product.name, product.oemCode);

  // Related products: same brand & category, exclude current
  const relatedProducts = await prisma.product.findMany({
    where: {
      brandId: product.brandId,
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
    include: {
      brand: true,
      category: true,
      images: { take: 1, orderBy: { sortOrder: 'asc' } },
    },
  });

  const models = product.compatibleModels?.split(',').map((m) => m.trim()).filter(Boolean) || [];
  const mainImage = product.images[0]?.url || '/images/products/placeholder.svg';

  // Schema.org
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.oemCode,
    brand: { '@type': 'Brand', name: product.brand.name },
    image: product.images.map((i) => i.url),
    offers: {
      '@type': 'Offer',
      availability: product.stockQuantity > 5
        ? 'https://schema.org/InStock'
        : product.stockQuantity > 0
        ? 'https://schema.org/LimitedAvailability'
        : 'https://schema.org/OutOfStock',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'Ürünler', item: '/urunler' },
      { '@type': 'ListItem', position: 3, name: product.brand.name, item: `/urunler?brand=${brand}` },
      { '@type': 'ListItem', position: 4, name: product.name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb
            items={[
              { label: 'Ürünler', href: '/urunler' },
              { label: product.brand.name, href: `/urunler?brand=${brand}` },
              { label: product.category.name, href: `/urunler?brand=${brand}&category=${category}` },
              { label: product.name },
            ]}
          />

          {/* Product Main */}
          <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Gallery */}
              <div className="p-6 md:p-8 bg-[#F8FAFC]">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-white border border-gray-100">
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                    {product.images.map((img) => (
                      <div
                        key={img.id}
                        className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 shrink-0 bg-white"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt || product.name}
                          width={80}
                          height={80}
                          className="object-contain w-full h-full p-1"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#0057A8] text-white text-xs font-medium px-2.5 py-1 rounded-md">
                    {product.brand.name}
                  </span>
                  <span className="text-xs text-[#6B7280] bg-gray-100 px-2.5 py-1 rounded-md">
                    {product.category.name}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-2">
                  {product.name}
                </h1>

                <p className="text-sm text-[#6B7280] mb-4">
                  OEM Parça Kodu: <span className="font-mono font-medium text-[#1A1A2E]">{product.oemCode}</span>
                </p>

                <div className="mb-4">
                  <StockBadge quantity={product.stockQuantity} />
                </div>

                {product.description && (
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-[#1A1A2E] mb-2">Açıklama</h2>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{product.description}</p>
                  </div>
                )}

                {models.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-[#1A1A2E] mb-2">Uyumlu Modeller</h2>
                    <div className="flex flex-wrap gap-2">
                      {models.map((m) => (
                        <span key={m} className="text-xs bg-[#E6F0FA] text-[#0057A8] px-2.5 py-1 rounded-md font-medium">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications */}
                {product.specifications.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-[#1A1A2E] mb-2">Teknik Özellikler</h2>
                    <div className="border border-gray-100 rounded-lg overflow-hidden">
                      {product.specifications.map((spec, i) => (
                        <div key={spec.id} className={`flex text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                          <span className="w-1/3 px-4 py-2.5 font-medium text-[#1A1A2E] border-r border-gray-100">
                            {spec.key}
                          </span>
                          <span className="flex-1 px-4 py-2.5 text-[#6B7280]">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* WhatsApp CTA */}
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <h2 className="text-base font-semibold text-[#1A1A2E] mb-3">
                    Temsilcimizle İletişime Geçin
                  </h2>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1DA851] text-white text-base font-semibold py-3.5 rounded-lg transition-colors"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                    WhatsApp ile Bilgi Alın
                  </a>
                  <p className="text-xs text-[#6B7280] text-center mt-2">
                    Ürün ve fiyat bilgisi için hemen iletişime geçin.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">İlgili Ürünler</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((p) => {
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
            </div>
          )}
        </div>
      </div>
    </>
  );
}
