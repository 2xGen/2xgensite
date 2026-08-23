import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/admin';
import { getStripe } from '@/lib/saas';

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const priceId = process.env.STRIPE_PRICE_ID_ANNUAL;
    if (!priceId) return NextResponse.json({ error: 'Stripe price not configured' }, { status: 500 });

    const admin = createServiceClient();
    const { data: profile } = await admin.from('profiles').select('*').eq('id', user.id).single();
    const { data: sub } = await admin
      .from('subscriptions')
      .select('*')
      .eq('profile_id', user.id)
      .maybeSingle();

    const stripe = getStripe();
    let customerId = sub?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email || profile?.email,
        name: profile?.full_name || undefined,
        metadata: { profile_id: user.id },
      });
      customerId = customer.id;
      await admin.from('subscriptions').upsert(
        {
          profile_id: user.id,
          stripe_customer_id: customerId,
          status: sub?.status || 'inactive',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'profile_id' }
      );
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/dashboard/billing?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/billing?checkout=cancel`,
      client_reference_id: user.id,
      metadata: { profile_id: user.id },
      subscription_data: {
        metadata: { profile_id: user.id },
      },
      // Account has Managed Payments on by default; our product tax codes are ineligible.
      managed_payments: { enabled: false },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Checkout error' }, { status: 500 });
  }
}
