import fs from 'fs';

for (const f of ['.env', '.env.local', '.env.example']) {
  if (!fs.existsSync(f)) {
    console.log(f + ': missing');
    continue;
  }
  console.log('--- ' + f + ' ---');
  const t = fs.readFileSync(f, 'utf8');
  for (const key of [
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_PRICE_ID_ANNUAL',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  ]) {
    const m = t.match(new RegExp('^' + key + '=(.*)$', 'm'));
    let v = (m ? m[1] : '').trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    const ok = v && !v.includes('...');
    console.log(key + ': ' + (ok ? 'OK len=' + v.length : 'empty/placeholder'));
  }
}
