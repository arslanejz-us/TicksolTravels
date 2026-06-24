import { NextRequest, NextResponse } from 'next/server';

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

    // Email content for logging
    const emailContent = `
New Contact Form Submission

Name: ${body.name}
Email: ${body.email}
Phone: ${body.phone || 'Not provided'}
Service Type: ${body.serviceType || 'Not specified'}

Message:
${body.message}

---
Sent to: ${CONTACT_EMAIL}
Time: ${new Date().toISOString()}
    `;

    console.log(emailContent);

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will contact you soon!',
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
