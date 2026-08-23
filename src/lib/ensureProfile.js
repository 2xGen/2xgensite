import { createServiceClient } from '@/lib/supabase/admin';
import { isAdminEmail } from '@/lib/saas';
import { emailOperatorByProfileId, notifyAdminByProfileId } from '@/lib/notifyOperator';

function displayName(meta = {}) {
  return (
    meta.full_name ||
    meta.name ||
    [meta.given_name, meta.family_name].filter(Boolean).join(' ') ||
    ''
  );
}

/** Ensure profiles / sites / subscriptions exist; promote ADMIN_EMAILS to admin. */
export async function ensureUserProfile(user) {
  if (!user?.id) throw new Error('Unauthorized');

  const admin = createServiceClient();
  const email = user.email || '';
  const meta = user.user_metadata || {};
  const role = isAdminEmail(email) ? 'admin' : 'operator';
  const fullName = displayName(meta);

  const { data: existing } = await admin
    .from('profiles')
    .select('id, role, full_name')
    .eq('id', user.id)
    .maybeSingle();

  let created = false;
  if (!existing) {
    created = true;
    await admin.from('profiles').insert({
      id: user.id,
      email,
      full_name: fullName,
      company: meta.company || '',
      role,
    });

    if (role === 'operator') {
      await admin.from('sites').insert({
        profile_id: user.id,
        status: 'waitlist',
        destination: meta.destination || '',
      });
      await admin.from('subscriptions').insert({
        profile_id: user.id,
        status: 'inactive',
      });
    }
  } else {
    const patch = { email, updated_at: new Date().toISOString() };
    if (role === 'admin' && existing.role !== 'admin') patch.role = 'admin';
    if (!existing.full_name && fullName) patch.full_name = fullName;
    await admin.from('profiles').update(patch).eq('id', user.id);
  }

  const effectiveRole = role === 'admin' || existing?.role === 'admin' ? 'admin' : 'operator';

  if (effectiveRole === 'operator') {
    const { data: site } = await admin
      .from('sites')
      .select('id')
      .eq('profile_id', user.id)
      .maybeSingle();
    if (!site) {
      await admin.from('sites').insert({
        profile_id: user.id,
        status: 'waitlist',
        destination: meta.destination || '',
      });
    }
    const { data: sub } = await admin
      .from('subscriptions')
      .select('id')
      .eq('profile_id', user.id)
      .maybeSingle();
    if (!sub) {
      await admin.from('subscriptions').insert({
        profile_id: user.id,
        status: 'inactive',
      });
    }
  }

  const { data: profile } = await admin
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (created && effectiveRole === 'operator' && profile?.email) {
    emailOperatorByProfileId(user.id, 'welcome').catch(() => {});
    notifyAdminByProfileId(user.id, 'admin_new_account').catch(() => {});
  }

  return profile;
}
