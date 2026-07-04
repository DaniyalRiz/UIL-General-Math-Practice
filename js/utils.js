// ─── SIMILAR QUESTION RECOMMENDER ────────────────────────────────────────────
function getSimilarQuestions(current, allQuestions, answeredIds = []) {
  const others = allQuestions.filter(q => q.id !== current.id);
  const scored = others.map(q => {
    let score = 0;
    // Tag overlap (highest weight — same pattern)
    const sharedTags = (current.tags || []).filter(t => (q.tags || []).includes(t));
    score += sharedTags.length * 10;
    // Same topic
    if (q.topic === current.topic) score += 4;
    // Same difficulty
    if (q.difficulty === current.difficulty) score += 2;
    // Penalise already-answered questions (prefer unseen)
    if (answeredIds.includes(q.id)) score -= 5;
    return { q, score, sharedTags };
  });
  // Sort by score desc, then shuffle ties so it's not always the same 3
  scored.sort((a, b) => b.score - a.score || Math.random() - 0.5);
  return scored.slice(0, 3).map(s => ({ ...s.q, sharedTags: s.sharedTags }));
}

// ─── CSV EXPORT ───────────────────────────────────────────────────────────────
function csvEscape(value) {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function downloadCsv(filename, rows) {
  const csv = rows.map(row => row.map(csvEscape).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

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
