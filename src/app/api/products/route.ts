import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET all products (admin)
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(req.url);
  const brand = url.searchParams.get('brand');
  const category = url.searchParams.get('category');
  const stock = url.searchParams.get('stock');
  const q = url.searchParams.get('q');
  const page = Number(url.searchParams.get('page')) || 1;
  const limit = 20;

  const where: Record<string, unknown> = {};
  if (brand) where.brand = { slug: brand };
  if (category) where.category = { slug: category };
  if (stock) {
    if (stock === 'in_stock') where.stockQuantity = { gt: 5 };
    else if (stock === 'low_stock') where.stockQuantity = { gt: 0, lte: 5 };
    else if (stock === 'out_of_stock') where.stockQuantity = { lte: 0 };
  }
  if (q) where.OR = [{ name: { contains: q } }, { oemCode: { contains: q } }];

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { updatedAt: 'desc' },
      include: { brand: true, category: true, images: { take: 1 } },
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ products, total, pages: Math.ceil(total / limit) });
}

// POST create product
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role === 'viewer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const data = await req.json();
    const slug = data.slug || data.name
      .toLowerCase()
      .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
      .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        oemCode: data.oemCode,
        brandId: data.brandId,
        categoryId: data.categoryId,
        description: data.description || null,
        compatibleModels: data.compatibleModels || null,
        stockQuantity: typeof data.stockQuantity === 'number' ? data.stockQuantity : 0,
        isFeatured: data.isFeatured || false,
        metaTitle: data.metaTitle || null,
        metaDesc: data.metaDesc || null,
        images: data.images?.length ? {
          create: data.images.map((img: { url: string; alt?: string }, i: number) => ({
            url: img.url,
            alt: img.alt || data.name,
            sortOrder: i,
          })),
        } : undefined,
        specifications: data.specifications?.length ? {
          create: data.specifications.map((spec: { key: string; value: string }, i: number) => ({
            key: spec.key,
            value: spec.value,
            sortOrder: i,
          })),
        } : undefined,
      },
      include: { brand: true, category: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Ürün oluşturulamadı.' }, { status: 500 });
  }
}
