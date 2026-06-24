import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Fetch services error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const service = await prisma.service.create({
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon || '✈️',
        rating: body.rating || 3,
        price3Star: body.price3Star || '',
        price4Star: body.price4Star || '',
        pricePremium: body.pricePremium || '',
        isActive: body.isActive !== undefined ? body.isActive : true,
        order: body.order || 0,
      },
    });
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Create service error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
