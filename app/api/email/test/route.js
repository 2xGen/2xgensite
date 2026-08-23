import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendOperatorEmail } from '@/lib/email';

/** Dev/admin helper: send a test template to the signed-in user. Body: { template } */
export async function POST(request) {
  try {
    if (process.env.NODE_ENV === 'production' && process.env.ALLOW_EMAIL_TEST !== '1') {
      return NextResponse.json({ error: 'Disabled in production' }, { status: 403 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const template = body.template || 'welcome';

    const result = await sendOperatorEmail(template, {
      to: user.email,
      name: user.user_metadata?.full_name || user.user_metadata?.name || 'there',
      publicUrl: 'https://example.2xgen.com',
      endsOn: new Date(Date.now() + 365 * 86400000).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 502 });
    }
    return NextResponse.json({ ok: true, ...result, to: user.email, template });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
