import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Honeypot check: field "website"
    if (body.website && body.website.trim() !== '') {
      return NextResponse.json(
        { success: true, message: 'Message sent successfully' },
        { status: 200 }
      );
    }

    const name = body.name ? body.name.trim() : '';
    const email = body.email ? body.email.trim() : '';
    const phone = body.phone ? body.phone.trim() : '';
    const subject = body.subject ? body.subject.trim() : '';
    const message = body.message ? body.message.trim() : '';

    // Field validations
    if (!name) {
      return NextResponse.json(
        { error: 'Full name is required.' },
        { status: 400 }
      );
    }
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Name must not exceed 100 characters.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'A valid corporate email address is required.' },
        { status: 400 }
      );
    }
    if (email.length > 255) {
      return NextResponse.json(
        { error: 'Email must not exceed 255 characters.' },
        { status: 400 }
      );
    }

    if (phone.length > 50) {
      return NextResponse.json(
        { error: 'Phone number must not exceed 50 characters.' },
        { status: 400 }
      );
    }

    if (subject.length > 200) {
      return NextResponse.json(
        { error: 'Subject must not exceed 200 characters.' },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: 'Message / project scope is required.' },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must not exceed 5000 characters.' },
        { status: 400 }
      );
    }

    // Supabase Insert
    const supabase = await createClient();
    const { error } = await supabase.from('contact_submissions').insert([
      {
        name,
        email,
        phone: phone || null,
        subject: subject || 'Capital Project Inquiry',
        message,
        is_read: false,
      },
    ]);

    if (error) {
      console.error('Database error saving contact submission:', error);
      return NextResponse.json(
        { error: 'Failed to record inquiry in database. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Your inquiry has been transmitted successfully.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Contact API Exception:', err);
    return NextResponse.json(
      { error: 'An invalid request payload was received.' },
      { status: 400 }
    );
  }
}
