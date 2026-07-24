// ─── SUPABASE CONFIG ─────────────────────────────────────────────────────────
// Replace with your own values from supabase.com → Project Settings → API
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://vhodgagwcxoooqnmfpbo.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_SXqKKIMvbNZJFq9OzM0uHA_3FGZf84v';
export const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
