import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { slugify } from '@/lib/constants';

// GET all categories (with brands)
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [brands, categories] = await Promise.all([
    prisma.brand.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.category.findMany({ orderBy: { sortOrder: 'asc' }, include: { brand: true } }),
  ]);

  return NextResponse.json({ brands, categories });
}

// POST create category
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role === 'viewer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { name, brandId } = await req.json();
    if (!name || !brandId) return NextResponse.json({ error: 'Name and brandId required' }, { status: 400 });

    const slug = slugify(name);
    const maxSort = await prisma.category.aggregate({
      where: { brandId },
      _max: { sortOrder: true },
    });

    const category = await prisma.category.create({
      data: { name, slug, brandId, sortOrder: (maxSort._max.sortOrder || 0) + 1 },
    });

    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Category creation failed' }, { status: 500 });
  }
}

// PUT update category
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role === 'viewer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id, name } = await req.json();
    if (!id || !name) return NextResponse.json({ error: 'ID and name required' }, { status: 400 });

    const slug = slugify(name);
    const category = await prisma.category.update({
      where: { id },
      data: { name, slug },
    });

    return NextResponse.json(category);
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

// DELETE category
export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
