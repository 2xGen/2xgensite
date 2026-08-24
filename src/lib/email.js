const SITE = () => (process.env.NEXT_PUBLIC_SITE_URL || 'https://2xgen.com').replace(/\/$/, '');

function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function layout({ title, bodyHtml, ctaLabel, ctaHref }) {
  const site = SITE();
  const href = ctaHref || `${site}/dashboard`;
  const label = ctaLabel || 'Open dashboard';
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f3f7fb;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#09294c;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f7fb;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid rgba(9,41,76,0.08);">
        <tr><td style="background:#09294c;padding:20px 28px;">
          <p style="margin:0;font-size:18px;font-weight:600;color:#ffffff;letter-spacing:-0.02em;">2xGen</p>
        </td></tr>
        <tr><td style="padding:28px;">
          <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;color:#09294c;">${escapeHtml(title)}</h1>
          ${bodyHtml}
          <p style="margin:28px 0 0;">
            <a href="${escapeHtml(href)}" style="display:inline-block;background:#1a5f9e;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:999px;font-size:14px;font-weight:600;">${escapeHtml(label)}</a>
          </p>
        </td></tr>
        <tr><td style="padding:16px 28px 24px;border-top:1px solid rgba(9,41,76,0.08);">
          <p style="margin:0;font-size:12px;color:#6b7c8f;line-height:1.5;">
            This is a service message about your 2xGen account. Questions? Reply to this email or write support@2xgen.com.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const TEMPLATES = {
  welcome: ({ name }) => ({
    subject: 'Welcome to 2xGen — finish onboarding',
    text: `Hi ${name},\n\nYour account is ready. Complete onboarding and subscribe so we can build your managed Google-facing site.\n\n${SITE()}/dashboard\n\n— 2xGen`,
    html: layout({
      title: 'Welcome to 2xGen',
      bodyHtml: `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">Hi ${escapeHtml(name)},</p>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#334155;">Your account is ready. Finish onboarding (name, brand, destination, listing URLs) and subscribe so we can start your managed SEO site.</p>`,
      ctaLabel: 'Continue onboarding',
    }),
  }),

  payment_received: ({ name }) => ({
    subject: 'Payment received — you’re in the build queue',
    text: `Hi ${name},\n\nThanks for subscribing. Your payment was received and your site is now queued to build.\n\n${SITE()}/dashboard\n\n— 2xGen`,
    html: layout({
      title: 'You’re in the build queue',
      bodyHtml: `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">Hi ${escapeHtml(name)},</p>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#334155;">Thanks for subscribing. Your payment was received and your site is <strong>queued to build</strong>. We’ll email you again when building starts and when your site goes live.</p>`,
    }),
  }),

  status_queued: ({ name }) => ({
    subject: 'Your 2xGen site is queued',
    text: `Hi ${name},\n\nYour site is queued to build. We’ll start soon.\n\n${SITE()}/dashboard\n\n— 2xGen`,
    html: layout({
      title: 'Site queued to build',
      bodyHtml: `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">Hi ${escapeHtml(name)},</p>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#334155;">Your site is in the build queue. We’ll notify you when work begins.</p>`,
    }),
  }),

  status_building: ({ name }) => ({
    subject: 'We’re building your 2xGen site',
    text: `Hi ${name},\n\nWe’re building your Google-facing site now.\n\n${SITE()}/dashboard\n\n— 2xGen`,
    html: layout({
      title: 'Building your site',
      bodyHtml: `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">Hi ${escapeHtml(name)},</p>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#334155;">We’re building your managed Google-facing site now. You’ll get another email when it’s live.</p>`,
    }),
  }),

  status_live: ({ name, publicUrl }) => ({
    subject: 'Your 2xGen site is live',
    text: `Hi ${name},\n\nYour site is live.${publicUrl ? ` Open it: ${publicUrl}` : ''}\n\nTrack booking-link clicks in your dashboard:\n${SITE()}/dashboard\n\n— 2xGen`,
    html: layout({
      title: 'Your site is live',
      bodyHtml: `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">Hi ${escapeHtml(name)},</p>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">Your managed SEO site is live. Track booking-link clicks in your dashboard.</p>
        ${
          publicUrl
            ? `<p style="margin:0;font-size:15px;line-height:1.6;"><a href="${escapeHtml(publicUrl)}" style="color:#1a5f9e;">${escapeHtml(publicUrl)}</a></p>`
            : ''
        }`,
      ctaLabel: 'View dashboard',
    }),
  }),

  payment_failed: ({ name }) => ({
    subject: 'Action needed — payment failed for your 2xGen subscription',
    text: `Hi ${name},\n\nWe couldn’t process a payment for your 2xGen subscription. Update your payment method in billing to avoid interruption.\n\n${SITE()}/dashboard/billing\n\n— 2xGen`,
    html: layout({
      title: 'Payment failed',
      bodyHtml: `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">Hi ${escapeHtml(name)},</p>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#334155;">We couldn’t process a payment for your subscription. Please update your payment method so your managed site isn’t interrupted.</p>`,
      ctaLabel: 'Update billing',
      ctaHref: `${SITE()}/dashboard/billing`,
    }),
  }),

  cancellation_scheduled: ({ name, endsOn }) => ({
    subject: 'Your 2xGen subscription will not renew',
    text: `Hi ${name},\n\nYour subscription is scheduled to cancel${endsOn ? ` on ${endsOn}` : ''}. You’ll keep access until then; it will not renew.\n\n${SITE()}/dashboard/billing\n\n— 2xGen`,
    html: layout({
      title: 'Cancellation scheduled',
      bodyHtml: `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">Hi ${escapeHtml(name)},</p>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#334155;">Your subscription is set to cancel${endsOn ? ` on <strong>${escapeHtml(endsOn)}</strong>` : ''}. You keep access until then; it will not renew. You can manage billing anytime from your dashboard.</p>`,
      ctaLabel: 'Manage billing',
      ctaHref: `${SITE()}/dashboard/billing`,
    }),
  }),

  admin_new_account: ({ email, name, company }) => ({
    subject: `New 2xGen account — ${email || 'unknown'}`,
    text: `New operator account created.\n\nEmail: ${email || '—'}\nName: ${name || '—'}\nCompany: ${company || '—'}\n\n${SITE()}/admin/operators\n`,
    html: layout({
      title: 'New operator account',
      bodyHtml: `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">A new account was created.</p>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#334155;">
          <strong>Email:</strong> ${escapeHtml(email || '—')}<br/>
          <strong>Name:</strong> ${escapeHtml(name || '—')}<br/>
          <strong>Company:</strong> ${escapeHtml(company || '—')}
        </p>`,
      ctaLabel: 'Open admin',
      ctaHref: `${SITE()}/admin/operators`,
    }),
  }),

  admin_new_order: ({ email, name, company, destination }) => ({
    subject: `New 2xGen order — ${email || company || 'operator'}`,
    text: `New paid subscription.\n\nEmail: ${email || '—'}\nName: ${name || '—'}\nCompany: ${company || '—'}\nDestination: ${destination || '—'}\n\n${SITE()}/admin/operators\n`,
    html: layout({
      title: 'New paid order',
      bodyHtml: `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">An operator just subscribed ($249/year). Site moved to the build queue.</p>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#334155;">
          <strong>Email:</strong> ${escapeHtml(email || '—')}<br/>
          <strong>Name:</strong> ${escapeHtml(name || '—')}<br/>
          <strong>Company:</strong> ${escapeHtml(company || '—')}<br/>
          <strong>Destination:</strong> ${escapeHtml(destination || '—')}
        </p>`,
      ctaLabel: 'Open admin',
      ctaHref: `${SITE()}/admin/operators`,
    }),
  }),
};

export async function sendOperatorEmail(templateId, { to, ...vars }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, skipped: 'RESEND_API_KEY not set' };
  }
  if (!to) {
    return { ok: false, skipped: 'no email' };
  }

  const build = TEMPLATES[templateId];
  if (!build) {
    return { ok: false, skipped: `unknown template ${templateId}` };
  }

  const name = vars.name || 'there';
  const payload = build({ ...vars, name });
  const from = process.env.RESEND_FROM_EMAIL || '2xGen <noreply@2xgen.com>';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('Resend', templateId, errText);
    return { ok: false, error: errText };
  }

  const json = await res.json().catch(() => ({}));
  return { ok: true, id: json.id };
}

/** Founder/ops alerts (new accounts, paid orders). */
export function adminNotifyEmail() {
  return (process.env.ADMIN_NOTIFY_EMAIL || 'hello@2xgen.com').trim();
}

export async function sendAdminEmail(templateId, vars = {}) {
  return sendOperatorEmail(templateId, {
    to: adminNotifyEmail(),
    ...vars,
  });
}

/** Pre-sale / account-manager inquiry → hello@ (reply-to = visitor). */
export async function sendContactInquiry({
  name,
  email,
  message,
  company = '',
  source = '',
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, skipped: 'RESEND_API_KEY not set' };
  }

  const to = process.env.CONTACT_INQUIRY_EMAIL || 'hello@2xgen.com';
  const from = process.env.RESEND_FROM_EMAIL || '2xGen <noreply@2xgen.com>';
  const safeName = String(name || '').trim() || 'Visitor';
  const safeEmail = String(email || '').trim();
  const safeMessage = String(message || '').trim();
  const safeCompany = String(company || '').trim();
  const safeSource = String(source || '').trim();

  if (!safeEmail || !safeMessage) {
    return { ok: false, skipped: 'missing fields' };
  }

  const subject = `Account inquiry — ${safeName}${safeCompany ? ` (${safeCompany})` : ''}`;
  const text = [
    'New pre-sale / account manager inquiry',
    '',
    `Name: ${safeName}`,
    `Email: ${safeEmail}`,
    `Company: ${safeCompany || '—'}`,
    `Source: ${safeSource || '—'}`,
    '',
    safeMessage,
  ].join('\n');

  const html = `<!DOCTYPE html>
<html><body style="font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#09294c;line-height:1.5;">
  <h2 style="margin:0 0 12px;">Account manager inquiry</h2>
  <p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(safeName)}</p>
  <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
  <p style="margin:0 0 8px;"><strong>Company:</strong> ${escapeHtml(safeCompany || '—')}</p>
  <p style="margin:0 0 16px;"><strong>Source:</strong> ${escapeHtml(safeSource || '—')}</p>
  <p style="margin:0;white-space:pre-wrap;">${escapeHtml(safeMessage)}</p>
</body></html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: safeEmail,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('Resend contact inquiry', errText);
    return { ok: false, error: errText };
  }

  const json = await res.json().catch(() => ({}));
  return { ok: true, id: json.id };
}

export function templateForSiteStatus(status) {
  if (status === 'queued') return 'status_queued';
  if (status === 'building') return 'status_building';
  if (status === 'live') return 'status_live';
  return null;
}
