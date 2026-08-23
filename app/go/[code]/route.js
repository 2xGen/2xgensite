import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  const code = params?.code;
  if (!code) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const admin = createServiceClient();
    const { data: link, error } = await admin
      .from('tracking_links')
      .select('id, destination_url, active')
      .eq('code', code)
      .maybeSingle();

    if (error || !link || !link.active || !link.destination_url) {
      return NextResponse.redirect(new URL('/?go=missing', request.url));
    }

    const ua = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';

    await admin.from('link_clicks').insert({
      tracking_link_id: link.id,
      user_agent: ua.slice(0, 500),
      referer: referer.slice(0, 500),
    });

    return NextResponse.redirect(link.destination_url, 302);
  } catch (err) {
    console.error('go redirect', err);
    return NextResponse.redirect(new URL('/?go=error', request.url));
  }
}
