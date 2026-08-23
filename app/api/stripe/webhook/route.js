import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/saas';
import { createServiceClient } from '@/lib/supabase/admin';
import { applyPaidSubscription } from '@/lib/stripeSync';

export const runtime = 'nodejs';

export async function POST(request) {
  const stripe = getStripe();
  const sig = request.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 });
  }

  const body = await request.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    console.error('Webhook signature', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const admin = createServiceClient();

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const profileId = session.client_reference_id || session.metadata?.profile_id;
      if (profileId && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        await applyPaidSubscription(profileId, subscription);
        if (session.customer) {
          await admin
            .from('subscriptions')
            .update({
              stripe_customer_id: String(session.customer),
              updated_at: new Date().toISOString(),
            })
            .eq('profile_id', profileId);
        }
      }
    }

    if (
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.deleted'
    ) {
      const subscription = event.data.object;
      const profileId = subscription.metadata?.profile_id;
      let resolvedId = profileId;

      if (!resolvedId) {
        const { data: row } = await admin
          .from('subscriptions')
          .select('profile_id')
          .eq('stripe_subscription_id', subscription.id)
          .maybeSingle();
        resolvedId = row?.profile_id;
      }

      if (resolvedId) {
        await applyPaidSubscription(resolvedId, subscription);
      }
    }

    if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object;
      const subscriptionId =
        typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id;
      if (subscriptionId) {
        const { data: row } = await admin
          .from('subscriptions')
          .select('profile_id')
          .eq('stripe_subscription_id', subscriptionId)
          .maybeSingle();
        if (row?.profile_id) {
          await admin
            .from('subscriptions')
            .update({ status: 'past_due', updated_at: new Date().toISOString() })
            .eq('profile_id', row.profile_id);
          const { emailOperatorByProfileId } = await import('@/lib/notifyOperator');
          emailOperatorByProfileId(row.profile_id, 'payment_failed').catch(() => {});
        }
      }
    }
  } catch (err) {
    console.error('Webhook handler', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
