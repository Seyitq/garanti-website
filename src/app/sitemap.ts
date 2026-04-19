import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://garantiismakineleri.com';

  const products = await prisma.product.findMany({
    select: { slug: true, updatedAt: true, brand: { select: { slug: true } }, category: { select: { slug: true } } },
  });

  const brands = await prisma.brand.findMany({ select: { slug: true, updatedAt: true } });

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/urunler`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/hakkimizda`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/gizlilik-politikasi`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/kvkk-aydinlatma-metni`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const brandPages = brands.map((b) => ({
    url: `${baseUrl}/urunler?brand=${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const productPages = products.map((p) => ({
    url: `${baseUrl}/urunler/${p.brand.slug}/${p.category.slug}/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...brandPages, ...productPages];
}
