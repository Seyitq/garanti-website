import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/home/HeroSection';
import BrandCards from '@/components/home/BrandCards';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyUsSection from '@/components/home/WhyUsSection';
import CTASection from '@/components/home/CTASection';
import { getStockInfo } from '@/lib/constants';

export default async function Home() {
  const [featuredProducts, referenceClients] = await Promise.all([
    prisma.product.findMany({
      where: { isFeatured: true },
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: {
        brand: true,
        category: true,
        images: { take: 1, orderBy: { sortOrder: 'asc' } },
      },
    }),
    prisma.referenceClient.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    }),
  ]);

  const featuredData = featuredProducts.map((p) => {
    const stockInfo = getStockInfo(p.stockQuantity);
    return {
      name: p.name,
      slug: p.slug,
      oemCode: p.oemCode,
      brandName: p.brand.name,
      brandSlug: p.brand.slug,
      categorySlug: p.category.slug,
      imageUrl: p.images[0]?.url || '/images/products/placeholder.svg',
      stockQuantity: p.stockQuantity,
      stockLabel: stockInfo.label,
      stockBadgeClass: stockInfo.badgeClass,
    };
  });

  const clientData = referenceClients.map((c) => ({
    id: c.id,
    name: c.name,
    logoUrl: c.logoUrl,
  }));

  return (
    <>
      <HeroSection />
      <BrandCards clients={clientData} />
      <FeaturedProducts products={featuredData} />
      <WhyUsSection />
      <CTASection />
    </>
  );
}
