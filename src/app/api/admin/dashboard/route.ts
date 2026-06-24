import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [totalBookings, pendingBookings, confirmedBookings, cancelledBookings, completedBookings, totalMessages, unreadMessages] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'pending' } }),
      prisma.booking.count({ where: { status: 'confirmed' } }),
      prisma.booking.count({ where: { status: 'cancelled' } }),
      prisma.booking.count({ where: { status: 'completed' } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
    ]);

    const recentBookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return NextResponse.json({
      stats: { totalBookings, pendingBookings, confirmedBookings, cancelledBookings, completedBookings, totalMessages, unreadMessages },
      recentBookings,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
