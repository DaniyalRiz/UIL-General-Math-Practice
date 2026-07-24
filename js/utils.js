// ─── STATS HELPERS ────────────────────────────────────────────────────────────
async function updateUserStatsOnly(user) {
  if (!user) return;
  const display_name =
    user.user_metadata?.display_name ||
    user.email?.split('@')[0] ||
    'User';
  try {
    await _supabase.from('user_stats').upsert({
      user_id: user.id,
      display_name,
      last_seen: new Date().toISOString(),
      streak_updated: new Date().toDateString(),
    }, { onConflict: 'user_id' });
  } catch(e) {
    console.warn('user_stats update exception:', e.message);
  }
}
