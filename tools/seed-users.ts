import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL as string;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
if (!url || !serviceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

type SeedUser = { email: string; password: string; role: 'admin' | 'user' };

const USERS: SeedUser[] = [
  { email: '1@spakp.dev',   password: '123456', role: 'admin' },
  { email: 'user@spakp.dev', password: '123456', role: 'user' },
];

async function ensureUser(u: SeedUser) {
  // Try to find by email
  const existing = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (existing.error) throw existing.error;
  const found = existing.data.users.find(x => x.email?.toLowerCase() === u.email.toLowerCase());

  let userId: string | null = found?.id ?? null;

  if (!userId) {
    // Create with email_confirmed = true so it can login right away (dev only)
    const created = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
      user_metadata: { role: u.role }
    });
    if (created.error) throw created.error;
    userId = created.data.user?.id ?? null;
    console.log(`Created user: ${u.email} (${userId})`);
  } else {
    console.log(`User exists: ${u.email} (${userId})`);
  }

  if (!userId) return;

  // Ensure profile row
  const { error: upErr } = await supabase.from('profiles').upsert({
    id: userId,
    email: u.email,
    role: u.role,
    updated_at: new Date().toISOString()
  }, { onConflict: 'id' });
  if (upErr) throw upErr;

  console.log(`Upserted profile for ${u.email} with role=${u.role}`);
}

(async () => {
  for (const u of USERS) {
    await ensureUser(u);
  }
  console.log('Seeding done.');
})().catch((e) => { console.error(e); process.exit(1); });
