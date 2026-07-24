import { _supabase } from './supabaseClient.js';
import { MAX_AVATAR_DIMENSION } from './constants.js';

// ─── STATS HELPERS ────────────────────────────────────────────────────────────
export async function updateUserStatsOnly(user) {
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

// Avatars are always a small square photo, never need transparency or crisp vector lines,
// so unlike adminPanel's resizeImageForUpload this always crops to a centered square and
// re-encodes as JPEG -- gives a small, predictable file size regardless of the source
// image's shape. Lives here (not adminPanel.jsx) because Settings uses it too and the
// admin panel is lazy-loaded.
export async function cropAndResizeAvatar(file, maxDim = MAX_AVATAR_DIMENSION) {
  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch (e) {
    return file; // unreadable as an image — let the normal upload/validation handle it
  }

  const side = Math.min(bitmap.width, bitmap.height);
  const sx = (bitmap.width - side) / 2;
  const sy = (bitmap.height - side) / 2;
  const outSide = Math.min(side, maxDim);

  const canvas = document.createElement('canvas');
  canvas.width = outSide;
  canvas.height = outSide;
  canvas.getContext('2d').drawImage(bitmap, sx, sy, side, side, 0, 0, outSide, outSide);

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.85));
  if (!blob) return file;
  return new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
}
