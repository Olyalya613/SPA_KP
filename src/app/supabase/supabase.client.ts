import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
const noOpLock = async <R>(_name: string, _ms: number, fn: () => Promise<R>) => await fn();
const g = (window as any);
export const supabase: SupabaseClient =
  g.__supabase__ ??
  createClient(environment.supabase.url, environment.supabase.anonKey, {
    auth: {
      persistSession: true,
      storage: localStorage,
      storageKey: 'phones-archive-auth',
      autoRefreshToken: true,
      detectSessionInUrl: true,
      lock: noOpLock,
    },
    global: { headers: { 'X-Client-Info': 'phones-archive' } },
  });
g.__supabase__ = supabase;
