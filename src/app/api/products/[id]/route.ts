import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      brand: true,
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
      specifications: { orderBy: { sortOrder: 'asc' } },
    },
  });

  if (!product) return NextResponse.json({ error: 'Ürün bulunamadı.' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role === 'viewer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  try {
    const data = await req.json();
    const slug = data.name
      .toLowerCase()
      .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
      .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Mevcut ilişkili kayıtları sil, yeniden oluştur
    await prisma.productImage.deleteMany({ where: { productId: id } });
    await prisma.productSpec.deleteMany({ where: { productId: id } });

    const product = await prisma.product.update({
      where: { id },
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
    });

    return NextResponse.json(product);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Ürün güncellenemedi.' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role === 'viewer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Ürün silinemedi.' }, { status: 500 });
  }
}
