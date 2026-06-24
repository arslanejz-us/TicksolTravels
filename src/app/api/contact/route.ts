import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

const CONTACT_EMAIL = 'me.arslanejaz@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store message in database
    const message = await prisma.contactMessage.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        serviceType: body.serviceType || null,
        message: body.message,
      },
    });

    // Email content for debugging/logging
    const emailContent = `
    New Contact Form Submission

    Name: ${body.name}
    Email: ${body.email}
    Phone: ${body.phone || 'Not provided'}
    Service Type: ${body.serviceType || 'Not specified'}

    Message:
    ${body.message}

    ---
    This message should be sent to: ${CONTACT_EMAIL}
    Database ID: ${message.id}
    Time: ${new Date().toISOString()}
    `;

    console.log(emailContent);

    // TODO: Configure email service (SendGrid, Resend, Nodemailer, etc.)
    // For now, the message is stored in the database and logged to console
    // In production, implement email sending here

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will contact you soon!',
        id: message.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
