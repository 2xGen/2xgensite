import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ensureUserProfile } from '@/lib/ensureProfile';

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await ensureUserProfile(user);
    return NextResponse.json({ profile });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Failed' }, { status: 500 });
  }
}
