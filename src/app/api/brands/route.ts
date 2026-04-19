import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { slugify } from '@/lib/constants';

// GET brands with categories
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const brands = await prisma.brand.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      categories: { orderBy: { sortOrder: 'asc' } },
      _count: { select: { products: true } },
    },
  });

  return NextResponse.json({ brands });
}

// POST create brand
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role === 'viewer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });

    const slug = slugify(name);
    const maxSort = await prisma.brand.aggregate({ _max: { sortOrder: true } });

    const brand = await prisma.brand.create({
      data: { name, slug, sortOrder: (maxSort._max.sortOrder || 0) + 1 },
    });

    return NextResponse.json(brand, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Brand creation failed' }, { status: 500 });
  }
}

// PUT update brand
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role === 'viewer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id, name } = await req.json();
    if (!id || !name) return NextResponse.json({ error: 'ID and name required' }, { status: 400 });

    const slug = slugify(name);
    const brand = await prisma.brand.update({
      where: { id },
      data: { name, slug },
    });

    return NextResponse.json(brand);
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

// DELETE brand
export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.brand.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
