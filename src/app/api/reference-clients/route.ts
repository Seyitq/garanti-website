import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET all reference clients
export async function GET() {
  const clients = await prisma.referenceClient.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json({ clients });
}

// POST create reference client
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role === 'viewer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { name, logoUrl, isActive } = await req.json();
    if (!name || !logoUrl) return NextResponse.json({ error: 'Name and logoUrl required' }, { status: 400 });

    const maxSort = await prisma.referenceClient.aggregate({ _max: { sortOrder: true } });

    const client = await prisma.referenceClient.create({
      data: {
        name,
        logoUrl,
        isActive: isActive !== false,
        sortOrder: (maxSort._max.sortOrder || 0) + 1,
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Creation failed' }, { status: 500 });
  }
}

// PUT update reference client
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role === 'viewer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id, name, logoUrl, isActive } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = name;
    if (logoUrl !== undefined) data.logoUrl = logoUrl;
    if (isActive !== undefined) data.isActive = isActive;

    const client = await prisma.referenceClient.update({
      where: { id },
      data,
    });

    return NextResponse.json(client);
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

// DELETE reference client
export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role === 'viewer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.referenceClient.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
