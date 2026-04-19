import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    const brands = [
      { name: 'Volvo', slug: 'volvo' },
      { name: 'Champion', slug: 'champion' },
      { name: 'Komatsu', slug: 'komatsu' },
      { name: 'Caterpillar', slug: 'caterpillar' },
      { name: 'Hidromek', slug: 'hidromek' },
      { name: 'John Deere', slug: 'john-deere' },
    ];
    const subcategories = [
      { name: 'Motor Parçaları', slug: 'motor-parcalari' },
      { name: 'Hidrolik Sistem', slug: 'hidrolik-sistem' },
      { name: 'Elektrik Sistemi', slug: 'elektrik-sistemi' },
      { name: 'Şasi & Gövde', slug: 'sasi-govde' },
      { name: 'Filtreler', slug: 'filtreler' },
      { name: 'Fren Sistemi', slug: 'fren-sistemi' },
      { name: 'Aktarma Organları', slug: 'aktarma-organlari' },
      { name: 'Soğutma Sistemi', slug: 'sogutma-sistemi' },
    ];

    // Admin user
    const passwordHash = await bcrypt.hash('admin123', 12);
    await prisma.user.upsert({
      where: { email: 'admin@garantiismakineleri.com' },
      update: {},
      create: { email: 'admin@garantiismakineleri.com', passwordHash, name: 'Admin', role: 'super_admin' },
    });

    // Brands
    const brandMap: Record<string, string> = {};
    for (let i = 0; i < brands.length; i++) {
      const b = brands[i];
      const brand = await prisma.brand.upsert({
        where: { slug: b.slug },
        update: {},
        create: { name: b.name, slug: b.slug, sortOrder: i },
      });
      brandMap[b.slug] = brand.id;
    }

    // Categories
    for (const b of brands) {
      for (let j = 0; j < subcategories.length; j++) {
        const sc = subcategories[j];
        await prisma.category.upsert({
          where: { brandId_slug: { brandId: brandMap[b.slug], slug: sc.slug } },
          update: {},
          create: { name: sc.name, slug: sc.slug, brandId: brandMap[b.slug], sortOrder: j },
        });
      }
    }

    // Hero slide
    await prisma.heroSlide.upsert({
      where: { id: 'hero-1' },
      update: {},
      create: {
        id: 'hero-1',
        title: "Türkiye'nin Güvenilir İş Makinesi Yedek Parça Tedarikçisi",
        subtitle: 'Orijinal ve muadil yedek parçalar.',
        imageUrl: '/images/hero/hero-bg.jpg',
        ctaLink: '/urunler',
      },
    });

    return NextResponse.json({ success: true, message: 'Database seeded (no mock products)!' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}

// DELETE all products
export async function DELETE() {
  try {
    await prisma.productAttribute.deleteMany();
    await prisma.productSpec.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    return NextResponse.json({ success: true, message: 'All products deleted.' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
