import { createServiceClient } from '@/lib/supabase/admin';
import { sendAdminEmail, sendOperatorEmail } from '@/lib/email';

export async function emailOperatorByProfileId(profileId, templateId, extra = {}) {
  if (!profileId) return { ok: false, skipped: 'no profile' };
  try {
    const admin = createServiceClient();
    const { data } = await admin
      .from('profiles')
      .select('email, full_name')
      .eq('id', profileId)
      .maybeSingle();
    return await sendOperatorEmail(templateId, {
      to: data?.email,
      name: data?.full_name || 'there',
      ...extra,
    });
  } catch (err) {
    console.error('emailOperatorByProfileId', err);
    return { ok: false, error: err.message };
  }
}

/** Alert matthijs@2xgen.com (or ADMIN_NOTIFY_EMAIL) with operator context. */
export async function notifyAdminByProfileId(profileId, templateId) {
  if (!profileId) return { ok: false, skipped: 'no profile' };
  try {
    const admin = createServiceClient();
    const { data: profile } = await admin
      .from('profiles')
      .select('email, full_name, company')
      .eq('id', profileId)
      .maybeSingle();
    const { data: site } = await admin
      .from('sites')
      .select('destination')
      .eq('profile_id', profileId)
      .maybeSingle();

    return await sendAdminEmail(templateId, {
      email: profile?.email,
      name: profile?.full_name || '',
      company: profile?.company || '',
      destination: site?.destination || '',
    });
  } catch (err) {
    console.error('notifyAdminByProfileId', err);
    return { ok: false, error: err.message };
  }
}
