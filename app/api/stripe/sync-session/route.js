import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/admin';
import { getStripe } from '@/lib/saas';
import { applyPaidSubscription } from '@/lib/stripeSync';

/**
 * Sync subscription after Checkout success (or manual refresh).
 * Body: { sessionId?: string }
 * Works without webhooks — important for localhost when webhooks point at production.
 */
export async function POST(request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';

    const stripe = getStripe();
    const admin = createServiceClient();
    let subscription = null;

    if (sessionId.startsWith('cs_')) {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['subscription'],
      });
      const profileId = session.client_reference_id || session.metadata?.profile_id;
      if (profileId && profileId !== user.id) {
        return NextResponse.json({ error: 'Session does not match this account' }, { status: 403 });
      }
      if (session.payment_status !== 'paid' && session.status !== 'complete') {
        return NextResponse.json({ error: 'Checkout not completed yet' }, { status: 400 });
      }
      subscription =
        typeof session.subscription === 'object' && session.subscription
          ? session.subscription
          : session.subscription
            ? await stripe.subscriptions.retrieve(session.subscription)
            : null;
    } else {
      const { data: subRow } = await admin
        .from('subscriptions')
        .select('stripe_customer_id')
        .eq('profile_id', user.id)
        .maybeSingle();

      if (!subRow?.stripe_customer_id) {
        return NextResponse.json(
          { error: 'No Stripe customer on file. Complete checkout first.' },
          { status: 400 }
        );
      }

      const list = await stripe.subscriptions.list({
        customer: subRow.stripe_customer_id,
        status: 'all',
        limit: 5,
      });
      subscription =
        list.data.find((s) => s.status === 'active' || s.status === 'trialing') ||
        list.data[0] ||
        null;
    }

    if (!subscription) {
      return NextResponse.json({ error: 'No subscription found yet' }, { status: 404 });
    }

    const result = await applyPaidSubscription(user.id, subscription);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Sync failed' }, { status: 500 });
  }
}
