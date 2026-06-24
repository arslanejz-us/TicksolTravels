import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const service = await prisma.service.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        rating: body.rating,
        price3Star: body.price3Star,
        price4Star: body.price4Star,
        pricePremium: body.pricePremium,
        isActive: body.isActive,
        order: body.order,
      },
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error('Update service error:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete service error:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
