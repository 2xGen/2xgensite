import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/admin';
import { sendOperatorEmail, templateForSiteStatus } from '@/lib/email';

/** Admin: send status email via Resend when site status changes. */
export async function POST(request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const adminClient = createServiceClient();
    const { data: profile } = await adminClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const siteId = body.siteId;
    const status = body.status;
    if (!siteId || !status) {
      return NextResponse.json({ error: 'siteId and status required' }, { status: 400 });
    }

    const { data: site } = await adminClient
      .from('sites')
      .select('*, profiles(email, full_name)')
      .eq('id', siteId)
      .single();

    const to = site?.profiles?.email;
    const templateId = templateForSiteStatus(status);
    if (!templateId) {
      return NextResponse.json({ ok: true, skipped: 'no template for status' });
    }

    const result = await sendOperatorEmail(templateId, {
      to,
      name: site?.profiles?.full_name || 'there',
      publicUrl: site?.public_url || null,
    });

    if (result.error) {
      return NextResponse.json({ error: 'Email send failed', detail: result.error }, { status: 502 });
    }

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
