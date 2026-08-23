import { createServiceClient } from '@/lib/supabase/admin';
import { sendOperatorEmail } from '@/lib/email';

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
