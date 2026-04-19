import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// Bulk stock update
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { updates } = await req.json();
    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const results = await Promise.all(
      updates.map((u: { id: string; stockQuantity: number }) =>
        prisma.product.update({
          where: { id: u.id },
          data: { stockQuantity: Math.max(0, u.stockQuantity) },
        })
      )
    );

    return NextResponse.json({ updated: results.length });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
