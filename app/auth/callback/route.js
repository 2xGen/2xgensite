import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ensureUserProfile } from '@/lib/ensureProfile';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const nextRaw = searchParams.get('next') || '/dashboard';
  const next = nextRaw.startsWith('/') ? nextRaw : '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let dest = next;
      if (user) {
        try {
          const profile = await ensureUserProfile(user);
          if (profile?.role === 'admin' && (next === '/dashboard' || next.startsWith('/admin'))) {
            dest = '/admin/operators';
          }
        } catch (err) {
          console.error('ensure profile after oauth', err);
        }
      }

      return NextResponse.redirect(new URL(dest, origin));
    }
  }

  return NextResponse.redirect(new URL('/login?error=auth', origin));
}
