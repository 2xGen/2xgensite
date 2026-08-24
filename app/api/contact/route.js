import { NextResponse } from 'next/server';
import { sendContactInquiry } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot — bots fill this; humans leave it empty
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();
  const company = String(body.company || '').trim();
  const source = String(body.source || '').trim();

  if (!name || name.length > 120) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
  }
  if (!message || message.length < 10 || message.length > 4000) {
    return NextResponse.json(
      { error: 'Please write a short message (at least a sentence).' },
      { status: 400 }
    );
  }

  const result = await sendContactInquiry({
    name,
    email,
    message,
    company: company.slice(0, 160),
    source: source.slice(0, 200),
  });

  if (!result.ok) {
    if (result.skipped === 'RESEND_API_KEY not set') {
      return NextResponse.json(
        { error: 'Contact form is temporarily unavailable. Email hello@2xgen.com.' },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: 'Could not send. Try again or email hello@2xgen.com.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
