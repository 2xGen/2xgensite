import { createServiceClient } from '@/lib/supabase/admin';
import { emailOperatorByProfileId } from '@/lib/notifyOperator';

function periodEndIso(subscription) {
  const periodEndUnix =
    subscription?.cancel_at ||
    subscription?.current_period_end ||
    subscription?.items?.data?.[0]?.current_period_end ||
    null;
  return periodEndUnix ? new Date(periodEndUnix * 1000).toISOString() : null;
}

function mapStatus(subscription) {
  if (subscription?.status === 'active' || subscription?.status === 'trialing') return 'active';
  if (subscription?.status === 'past_due' || subscription?.status === 'unpaid') return 'past_due';
  if (subscription?.status === 'canceled') return 'canceled';
  return 'inactive';
}

/** True when Stripe has a scheduled end (legacy cancel_at_period_end or cancel_at timestamp). */
export function isCancelScheduled(subscription) {
  if (!subscription) return false;
  if (subscription.cancel_at_period_end) return true;
  if (subscription.cancel_at && (subscription.status === 'active' || subscription.status === 'trialing')) {
    return true;
  }
  return false;
}

/** Apply paid subscription to profiles.sites + subscriptions (waitlist → queued). */
export async function applyPaidSubscription(profileId, subscription, options = {}) {
  const { notify = true } = options;
  const admin = createServiceClient();
  const periodEnd = periodEndIso(subscription);
  const status = mapStatus(subscription);
  const cancelAtPeriodEnd = isCancelScheduled(subscription);

  const { data: prev } = await admin
    .from('subscriptions')
    .select('status, cancel_at_period_end')
    .eq('profile_id', profileId)
    .maybeSingle();

  const row = {
    profile_id: profileId,
    stripe_customer_id:
      typeof subscription?.customer === 'string' ? subscription.customer : undefined,
    stripe_subscription_id: subscription?.id,
    status,
    current_period_end: periodEnd,
    cancel_at_period_end: cancelAtPeriodEnd,
    updated_at: new Date().toISOString(),
  };

  let { error: subErr } = await admin.from('subscriptions').upsert(row, { onConflict: 'profile_id' });

  if (subErr?.message?.includes('cancel_at_period_end')) {
    const { cancel_at_period_end: _, ...withoutCancel } = row;
    ({ error: subErr } = await admin
      .from('subscriptions')
      .upsert(withoutCancel, { onConflict: 'profile_id' }));
  }
  if (subErr) throw subErr;

  const { data: site } = await admin
    .from('sites')
    .select('id, status')
    .eq('profile_id', profileId)
    .maybeSingle();

  let promoted = false;
  if (site && (site.status === 'waitlist' || !site.status) && status === 'active') {
    const { error: siteErr } = await admin
      .from('sites')
      .update({ status: 'queued', updated_at: new Date().toISOString() })
      .eq('id', site.id);
    if (siteErr) throw siteErr;
    promoted = true;
  }

  if (notify) {
    const becameActive = status === 'active' && prev?.status !== 'active';
    const newlyCanceling =
      cancelAtPeriodEnd && !prev?.cancel_at_period_end && status === 'active';

    if (becameActive || promoted) {
      emailOperatorByProfileId(profileId, 'payment_received').catch(() => {});
    } else if (newlyCanceling) {
      const endsOn = periodEnd
        ? new Date(periodEnd).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : null;
      emailOperatorByProfileId(profileId, 'cancellation_scheduled', { endsOn }).catch(() => {});
    }
  }

  return {
    status,
    siteStatus: status === 'active' ? (promoted || site?.status === 'queued' ? 'queued' : site?.status) : site?.status,
    cancelAtPeriodEnd,
    currentPeriodEnd: periodEnd,
  };
}
