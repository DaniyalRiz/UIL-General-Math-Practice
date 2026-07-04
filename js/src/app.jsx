

function SettingsPage({ authUser, navigateTab }) {
  const providers = authUser?.app_metadata?.providers || [];
  const hasPasswordAuth = providers.includes('email');
  const avatarColor = avatarColorFor(authUser);

  // Stored as custom_avatar_url, not avatar_url -- Google OAuth sign-ins make Supabase
  // re-populate user_metadata.avatar_url from the Google profile photo on every sign-in,
  // which would silently overwrite a custom upload stored under that key.
  const [avatarUrl, setAvatarUrl] = useState(authUser?.user_metadata?.custom_avatar_url || null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarMsg, setAvatarMsg] = useState('');

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState('');
  const [pwConfirming, setPwConfirming] = useState(false);

  const [toast, setToast] = useState('');
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const uploadAvatar = async (file) => {
    if (!file) return;
    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      setAvatarMsg('Please choose a PNG, JPEG, or WEBP image.');
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setAvatarMsg('Image is too large. Please use a file under 5 MB.');
      return;
    }
    setAvatarUploading(true);
    setAvatarMsg('');

    const cropped = await cropAndResizeAvatar(file);
    const path = `${authUser.id}/avatar.jpg`;

    const { error: uploadErr } = await _supabase.storage
      .from('avatars')
      .upload(path, cropped, { upsert: true, contentType: cropped.type });

    if (uploadErr) {
      setAvatarUploading(false);
      setAvatarMsg(uploadErr.message || 'Upload failed.');
      return;
    }

    const { data: pub } = _supabase.storage.from('avatars').getPublicUrl(path);
    // Cache-bust: the filename never changes between uploads, so the URL string
    // wouldn't otherwise change and the browser could keep showing the old image.
    const bustedUrl = `${pub.publicUrl}?t=${Date.now()}`;

    const { error: updateErr } = await _supabase.auth.updateUser({ data: { custom_avatar_url: bustedUrl } });
    setAvatarUploading(false);
    if (updateErr) {
      setAvatarMsg(updateErr.message || 'Could not save profile picture.');
      return;
    }
    setAvatarUrl(bustedUrl);
    setAvatarMsg('');
    showToast('Profile picture updated.');
  };

  const removeAvatar = async () => {
    setAvatarUploading(true);
    setAvatarMsg('');

    const { data: files } = await _supabase.storage.from('avatars').list(authUser.id);
    if (files && files.length) {
      await _supabase.storage.from('avatars').remove(files.map(f => `${authUser.id}/${f.name}`));
    }

    const { error: updateErr } = await _supabase.auth.updateUser({ data: { custom_avatar_url: null } });
    setAvatarUploading(false);
    if (updateErr) {
      setAvatarMsg(updateErr.message || 'Could not remove profile picture.');
      return;
    }
    setAvatarUrl(null);
    showToast('Profile picture removed.');
  };

  const requestPasswordChange = () => {
    setPwMsg('');
    if (!currentPw || !newPw || !confirmPw) { setPwMsg('Fill in all three fields.'); return; }
    if (newPw !== confirmPw) { setPwMsg('New passwords do not match.'); return; }
    if (newPw.length < 8) { setPwMsg('New password must be at least 8 characters.'); return; }
    setPwConfirming(true);
  };

  const confirmPasswordChange = async () => {
    setPwConfirming(false);
    setPwSaving(true);
    // Re-verify the current password is actually correct before changing anything --
    // Supabase has no dedicated "verify password" call, so re-authenticating against
    // the live session's email is the standard way to do this safely.
    const { error: verifyErr } = await _supabase.auth.signInWithPassword({
      email: authUser.email,
      password: currentPw,
    });
    if (verifyErr) {
      setPwSaving(false);
      setPwMsg('Current password is incorrect.');
      return;
    }

    const { error: updateErr } = await _supabase.auth.updateUser({ password: newPw });
    setPwSaving(false);
    if (updateErr) {
      setPwMsg(updateErr.message || 'Could not update password.');
      return;
    }
    setPwMsg('');
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    showToast('Password updated successfully.');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white">Settings</h1>
        <button onClick={() => navigateTab('problems')} title="Close"
          className="mt-1 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        {/* Profile picture */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Profile picture</label>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xl shrink-0 ${avatarUrl ? '' : avatarColor.bg + ' ' + avatarColor.text}`}>
              {avatarUrl ? <img src={avatarUrl} alt="" className="w-full h-full object-cover" /> : <span>{initialsFor(authUser)}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="px-3 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-center">
                {avatarUploading ? 'Uploading…' : 'Upload new photo'}
                <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" disabled={avatarUploading}
                  onChange={e => uploadAvatar(e.target.files?.[0])} />
              </label>
              {avatarUrl && (
                <button onClick={removeAvatar} disabled={avatarUploading}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10">
                  Remove photo
                </button>
              )}
            </div>
          </div>
          {avatarMsg && <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">{avatarMsg}</p>}
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Change password</label>
          {!hasPasswordAuth ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5">
              You signed in with Google, so there's no password to change here. Manage your password through your Google account.
            </p>
          ) : (
            <div className="space-y-2.5">
              <input type="password" value={currentPw} onChange={e=>setCurrentPw(e.target.value)} placeholder="Current password" disabled={pwConfirming}
                className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-60" />
              <input type="password" value={newPw} onChange={e=>setNewPw(e.target.value)} placeholder="New password" disabled={pwConfirming}
                className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-60" />
              <input type="password" value={confirmPw} onChange={e=>setConfirmPw(e.target.value)} placeholder="Confirm new password" disabled={pwConfirming}
                className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-60" />
              {pwMsg && <p className="text-xs text-rose-600 dark:text-rose-400">{pwMsg}</p>}

              {pwConfirming ? (
                <div className="rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-3">
                  <p className="text-xs text-amber-800 dark:text-amber-300 mb-2">Change your password now? You'll need the new password next time you sign in.</p>
                  <div className="flex gap-2">
                    <button onClick={() => setPwConfirming(false)}
                      className="flex-1 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                      Cancel
                    </button>
                    <button onClick={confirmPasswordChange} disabled={pwSaving}
                      className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white">
                      {pwSaving ? 'Updating…' : 'Yes, change it'}
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={requestPasswordChange}
                  className="w-full py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white">
                  Update Password
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

function ReportBugPage({ authUser, navigateTab }) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const submitReport = async () => {
    if (!subject.trim()) { setMessage('Please enter a subject.'); return; }
    if (!description.trim()) { setMessage('Please describe the problem.'); return; }
    setSaving(true);
    setMessage('');
    const { error } = await _supabase.from('bug_reports').insert({
      user_id: authUser.id,
      subject: subject.trim(),
      description: description.trim(),
    });
    setSaving(false);
    if (error) {
      setMessage(error.message || 'Could not submit report.');
      return;
    }
    setMessage('Thanks — your report was submitted.');
    setSubject('');
    setDescription('');
    setTimeout(() => navigateTab('problems'), 1200);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white">Report a Bug</h1>
        <button onClick={() => navigateTab('problems')} title="Close"
          className="mt-1 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Subject</label>
        <input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Briefly summarize the problem"
          className="w-full mb-4 px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={6}
          placeholder="What happened? What did you expect instead?"
          className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

        {message && <p className={`mt-3 text-sm ${message.startsWith('Thanks') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{message}</p>}

        <div className="mt-5 flex justify-end">
          <button onClick={submitReport} disabled={saving}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${!saving ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}>
            {saving ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileMenu({ authUser, dark, toggleTheme, signOut, view, setView, tab, setTab, recommendedMode, setRecommendedMode, bookmarksCount, setPage, navigateTab, onUsedRecommendedPractice, masteryStats }) {
  const [open, setOpen] = useState(false);
  const avatarUrl = authUser?.user_metadata?.custom_avatar_url || null;
  const menuRef = useRef(null);
  const avatarColor = avatarColorFor(authUser);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false); };
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center gap-4 shrink-0">
        {masteryStats && (() => {
          const pct = Math.min(100, Math.round((masteryStats.total_mastered / TOTAL_QUESTIONS) * 100));
          const lvl = getMasteryLevel(pct);
          return (
            <button onClick={() => { setOpen(false); navigateTab('mastery'); }}
              className="hidden md:flex flex-col items-end gap-1 hover:opacity-75 transition-opacity">
              <span className={`text-[9px] font-bold uppercase tracking-wide leading-none ${lvl.color}`}>{lvl.name}</span>
              <div className="flex items-center gap-1.5">
                <div className="w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${lvl.bar}`} style={{ width: `${pct}%` }} />
                </div>
                <span className={`text-[10px] font-bold tabular-nums ${lvl.color}`}>{pct}%</span>
              </div>
            </button>
          );
        })()}
        <button onClick={() => (tab === 'settings' || tab === 'reportBug') ? navigateTab('problems') : setOpen(o => !o)}
          title={(tab === 'settings' || tab === 'reportBug') ? 'Back to Problems' : 'Account menu'}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs hover:border-blue-400 transition-colors shrink-0 ${avatarUrl ? '' : avatarColor.bg + ' ' + avatarColor.text}`}>
          {avatarUrl ? <img src={avatarUrl} alt="" className="w-full h-full object-cover" /> : <span>{initialsFor(authUser)}</span>}
        </button>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg py-1.5 z-40 text-sm">
          <button onClick={() => { setOpen(false); navigateTab('mastery'); }}
            className={`w-full flex items-center px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${tab==="mastery" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-700 dark:text-slate-300"}`}>
            My Mastery
          </button>
          <button onClick={() => {
              const next = view !== "recommended" || tab !== "problems";
              setTab("problems");
              setRecommendedMode(next);
              setView(next ? "recommended" : "list");
              setPage(1);
              if (next) onUsedRecommendedPractice?.();
              setOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${view==="recommended" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-700 dark:text-slate-300"}`}>
            Recommended Practice
          </button>
          <button onClick={() => {
              setTab("problems");
              setRecommendedMode(false);
              setView(v=>(v==="review" && tab==="problems")?"list":"review");
              setPage(1);
              setOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${view==="review" ? "text-amber-600 dark:text-amber-400 font-semibold" : "text-slate-700 dark:text-slate-300"}`}>
            <span>Review Later</span>
            {bookmarksCount > 0 && <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">{bookmarksCount}</span>}
          </button>
          <button onClick={() => { setOpen(false); navigateTab('reportBug'); }}
            className={`w-full flex items-center px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${tab==="reportBug" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-700 dark:text-slate-300"}`}>
            Report a Bug
          </button>

          <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

          <button onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
            <span>Appearance</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">{dark ? <SunIcon/> : <MoonIcon/>}{dark ? 'Dark' : 'Light'}</span>
          </button>
          <button onClick={() => { setOpen(false); navigateTab('settings'); }}
            className={`w-full flex items-center px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${tab==="settings" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-700 dark:text-slate-300"}`}>
            Settings
          </button>

          <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

          <button onClick={() => { setOpen(false); signOut(); }}
            className="w-full flex items-center px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-600 dark:text-rose-400">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [dark, toggleTheme] = useTheme();
  const [authUser, setAuthUser] = useState(null);
  const [tab, setTab] = useLocalStorage('current_tab', 'problems'); // 'problems' | 'analytics' | 'history' | 'admin'

  // Auth state listener — use getSession() which reliably restores persisted sessions
  useEffect(() => {
    _supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthUser(session?.user ?? null);
    });
    const { data: { subscription } } = _supabase.auth.onAuthStateChange((_e, session) => {
      setAuthUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => { await _supabase.auth.signOut(); };
  const [topic, setTopic] = useState("All Topics");
  const [diff, setDiff] = useState("All Difficulties");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openIdx, setOpenIdx] = useState(null);
  const [view, setView] = useState("list");

  const answersRef = useRef({});
  const [answerVersion, setAnswerVersion] = useState(0);
  const [qStats, setQStats] = useLocalStorage("uilmath-qstats", {});
  const [bookmarks, setBookmarks] = useLocalStorage("uilmath-bookmarks", []);
  const [masteryStats, setMasteryStats] = useState(null);
  const [recommendedMode, setRecommendedMode] = useState(false);
  const [recStatus, setRecStatus] = useState("All");
  const [recSort, setRecSort] = useState("Most Recent");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [sourceFilter, setSourceFilter] = useState("All Sources");

  // Rebuild per-question stats from the `attempts` table on login. Answers can only be
  // submitted while signed in, so server history is authoritative — this keeps the list's
  // status dots correct on a new device/browser instead of relying on local cache alone.
  useEffect(() => {
    if (!authUser) return;
    let cancelled = false;
    _supabase
      .from('attempts')
      .select('question_id,is_correct,time_taken_ms,created_at')
      .eq('user_id', authUser.id)
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        const agg = {};
        data.forEach(r => {
          const cur = agg[r.question_id] || { attempts: 0, correct: 0, bestMs: null, lastMs: null };
          const ms = r.time_taken_ms || 0;
          cur.attempts += 1;
          if (r.is_correct) cur.correct += 1;
          cur.bestMs = cur.bestMs == null ? ms : Math.min(cur.bestMs, ms);
          cur.lastMs = ms; // rows are ascending by created_at, so the last write is the most recent
          agg[r.question_id] = cur;
        });
        setQStats(agg);
      });
    return () => { cancelled = true; };
  }, [authUser?.id]);

  const loadMasteryStats = async () => {
    if (!authUser) return;
    const { data, error } = await _supabase.rpc('get_mastery_stats');
    if (!error && data && data.length > 0) setMasteryStats(data[0]);
  };

  useEffect(() => {
    if (!authUser) { setMasteryStats(null); return; }
    loadMasteryStats();
  }, [authUser?.id]);

  const markUsedRecommendedPractice = async () => {
    if (!authUser || masteryStats?.used_recommended_practice) return;
    const { error } = await _supabase.from('user_stats')
      .upsert({ user_id: authUser.id, used_recommended_practice: true }, { onConflict: 'user_id' });
    if (!error) setMasteryStats(prev => prev ? { ...prev, used_recommended_practice: true } : prev);
  };

  // ── Browser back/forward history management ───────────────────────────────
  // Push a history entry when opening a problem or switching tabs so the
  // browser back button navigates within the SPA instead of leaving the page.
  const pushingHistory = useRef(false);

  const pushAppState = (state) => {
    pushingHistory.current = true;
    window.history.pushState(state, '');
    setTimeout(() => { pushingHistory.current = false; }, 0);
  };

  // Seed the initial history entry on mount
  useEffect(() => {
    window.history.replaceState({ tab: 'problems', openIdx: null, view: 'list', recommendedMode: false }, '');
  }, []);

  // Restore in-app state on browser back/forward
  useEffect(() => {
    const onPop = (e) => {
      if (pushingHistory.current) return;
      const s = e.state;
      if (!s) return;
      setTab(s.tab || 'problems');
      setView(s.view || 'list');
      setRecommendedMode(!!s.recommendedMode);
      setOpenIdx(s.openIdx ?? null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Navigation helpers that also push browser history
  const openProblem = (idx) => {
    pushAppState({ tab: 'problems', openIdx: idx, view, recommendedMode });
    setOpenIdx(idx);
  };
  const closeProblem = () => {
    setOpenIdx(null);
    if (view === "recommended") { setRecommendedMode(false); setView("list"); }
  };
  const navigateTab = (t) => {
    pushAppState({ tab: t, openIdx: null, view: 'list', recommendedMode: false });
    setTab(t);
    setOpenIdx(null);
    if (t === 'problems') {
      setRecommendedMode(false);
      setView('list');
      setTopic("All Topics");
      setDiff("All Difficulties");
      setSearch("");
      setPage(1);
    }
  };

  const [questions, setQuestions] = useState([]);
  const [loadState, setLoadState] = useState("loading"); // "loading" | "ready" | "error"
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function loadQuestionsFromSupabase() {
      try {
        const { data, error } = await _supabase
          .from("public_questions")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;

        const normalized = (data || []).map(q => ({
          ...q,
          imageAlt: q.image_alt || q.imageAlt || "Figure for problem",
          date_added: q.date_added || null,
          tags: q.tags || [],
          choices: q.choices || [],
        }));

        if (!cancelled) {
          setQuestions(normalized);
          setLoadState("ready");
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError(err.message || String(err));
          setLoadState("error");
        }
      }
    }

    loadQuestionsFromSupabase();
    return () => { cancelled = true; };
  }, []);

  const toggleBookmark = (id) => {
    setBookmarks(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const recommendedIds = useMemo(() => {
    if (!questions.length) return new Set();

    const answeredEntries = Object.entries(qStats || {});
    if (!answeredEntries.length) {
      return new Set(
        questions
          .slice()
          .sort((a, b) => {
            const rank = { Easy: 0, Medium: 1, Hard: 2 };
            return (rank[a.difficulty] ?? 1) - (rank[b.difficulty] ?? 1);
          })
          .slice(0, 20)
          .map(q => q.id)
      );
    }

    const attemptedIds = new Set(answeredEntries.map(([id]) => Number(id)));
    const topicStats = {};
    const columnStats = {};

    questions.forEach(q => {
      const stat = qStats[q.id];
      if (!stat || !stat.attempts) return;

      if (!topicStats[q.topic]) topicStats[q.topic] = { attempts: 0, correct: 0 };
      topicStats[q.topic].attempts += stat.attempts;
      topicStats[q.topic].correct += stat.correct || 0;

      const col = getColumnCategory(q);
      if (col) {
        if (!columnStats[col]) columnStats[col] = { attempts: 0, correct: 0 };
        columnStats[col].attempts += stat.attempts;
        columnStats[col].correct += stat.correct || 0;
      }
    });

    const acc = (obj, key) => obj[key] && obj[key].attempts ? obj[key].correct / obj[key].attempts : 0.65;

    const scored = questions.map(q => {
      const topicAccuracy = acc(topicStats, q.topic);
      const columnAccuracy = acc(columnStats, getColumnCategory(q));
      const unattemptedBoost = attemptedIds.has(q.id) ? 0 : 30;
      const weakTopicBoost = (1 - topicAccuracy) * 45;
      const weakColumnBoost = (1 - columnAccuracy) * 35;
      const difficultyBoost = q.difficulty === "Medium" ? 4 : q.difficulty === "Hard" ? 2 : 0;
      return { q, score: unattemptedBoost + weakTopicBoost + weakColumnBoost + difficultyBoost };
    });

    return new Set(scored.sort((a, b) => b.score - a.score).slice(0, 25).map(x => x.q.id));
  }, [questions, qStats]);

  const filtered = useMemo(() => questions.filter(q => {
    if (recommendedMode && !recommendedIds.has(q.id)) return false;
    if (topic !== "All Topics") {
      const col = getColumnCategory(q);
      if (["Column 1","Column 2","Column 3"].includes(topic)) {
        if (col !== topic) return false;
      } else if (q.topic !== topic) return false;
    }
    if (diff !== "All Difficulties" && q.difficulty !== diff) return false;
    if (typeFilter !== "All Types" && getSourceType(q.source || '') !== typeFilter) return false;
    if (sourceFilter !== "All Sources" && (q.source || "") !== sourceFilter) return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      return q.question.toLowerCase().includes(s) || q.tags.some(t=>t.includes(s)) || q.topic.toLowerCase().includes(s) || (q.source||"").toLowerCase().includes(s);
    }
    return true;
  }), [questions, topic, diff, search, typeFilter, sourceFilter, recommendedMode, recommendedIds]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageClamped = Math.min(page, totalPages);
  const pageItems = filtered.slice((pageClamped-1)*PAGE_SIZE, pageClamped*PAGE_SIZE);

  const recordAnswer = (rec) => {
    answersRef.current[rec.questionId] = rec;
    setAnswerVersion(v=>v+1);
    updateUserStatsOnly(authUser);
    if (rec.correct) loadMasteryStats();
    // Accumulate persistent per-question stats
    setQStats(prev => {
      const cur = prev[rec.questionId] || { attempts:0, correct:0, bestMs:null, lastMs:null };
      const next = {
        attempts: cur.attempts + 1,
        correct: cur.correct + (rec.correct ? 1 : 0),
        bestMs: cur.bestMs == null ? rec.timeMs : Math.min(cur.bestMs, rec.timeMs),
        lastMs: rec.timeMs,
      };
      return { ...prev, [rec.questionId]: next };
    });
  };


  // Reset specific source when type changes so stale selections don't persist
  useEffect(() => { setSourceFilter("All Sources"); setPage(1); }, [typeFilter]);

  const counts = useMemo(()=>{
    const t={}, d={};
    TOPICS.forEach(x=> {
      if (x==="All Topics") t[x]=questions.length;
      else if (["Column 1","Column 2","Column 3"].includes(x))
        t[x]=questions.filter(q=>getColumnCategory(q)===x).length;
      else
        t[x]=questions.filter(q=>q.topic===x).length;
    });
    DIFFICULTIES.forEach(x=> d[x] = x==="All Difficulties"?questions.length:questions.filter(q=>q.difficulty===x).length);
    return {t,d};
  },[questions]);

  const uniqueSources = useMemo(() => {
    const srcs = new Set(
      questions
        .filter(q => typeFilter === 'All Types' || getSourceType(q.source || '') === typeFilter)
        .map(q => q.source || '')
        .filter(Boolean)
    );
    return ['All Sources', ...[...srcs].sort()];
  }, [questions, typeFilter]);

  const onFilter = (setter,val)=>{ setter(val); setPage(1); };

  const statusFor = (q) => {
    const a = answersRef.current[q.id];
    if (!a) return undefined;
    return a.correct ? "correct" : "wrong";
  };

  const recommendedVisible = useMemo(() => {
    let arr = [...filtered];

    if (recStatus !== "All") {
      arr = arr.filter(q => {
        const s = statusFor(q);
        if (recStatus === "Unattempted") return !s;
        if (recStatus === "Correct") return s === "correct";
        if (recStatus === "Missed") return s === "wrong";
        return true;
      });
    }

    arr.sort((a,b) => {
      if (recSort === "Oldest") return (new Date(a.date_added || 0)) - (new Date(b.date_added || 0));
      if (recSort === "Title") return String(a.title || "").localeCompare(String(b.title || ""));
      if (recSort === "Hardest") {
        const rank = { Hard: 0, Medium: 1, Easy: 2 };
        return (rank[a.difficulty] ?? 3) - (rank[b.difficulty] ?? 3);
      }
      return (new Date(b.date_added || 0)) - (new Date(a.date_added || 0));
    });

    return arr;
  }, [filtered, recStatus, recSort, answerVersion]);

  // Loading / error screens — shown before the nav even renders
  if (loadState === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-700 dark:text-slate-200 font-semibold text-lg">Loading practice questions…</p>
          <p className="text-slate-400 text-sm mt-1">Fetching questions from Supabase</p>
        </div>
      </div>
    );
  }
  if (loadState === "error") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center px-6 max-w-md">
          <p className="text-slate-800 dark:text-slate-100 font-bold text-lg mb-2">Could not load questions</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">The secure question database could not be reached. Check your Supabase connection and public_questions view.</p>
          <p className="text-slate-400 text-xs font-mono">{loadError}</p>
          <button onClick={()=>window.location.reload()} className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* NAV */}
      <nav className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 h-14 flex items-center justify-between gap-1 sm:gap-4">
          {/* Left: logo + tabs — scrollable on mobile */}
          <div className="flex items-center gap-1 min-w-0 overflow-x-auto no-scrollbar flex-1">
            <img src="./assets/logo-icon.svg" alt="UIL Math Practice" className="hidden lg:block h-7 w-auto flex-shrink-0 mr-1" />
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <a href="./index.html"
                className="px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap">
                Home
              </a>
              <button onClick={()=>{ 
                  navigateTab('problems');
                  setView('list');
                  setRecommendedMode(false);
                  setTopic("All Topics");
                  setDiff("All Difficulties");
                  setTypeFilter("All Types");
                  setSourceFilter("All Sources");
                  setSearch("");
                  setPage(1);
                }}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap
                  ${tab==='problems'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                Problems
              </button>
              <button onClick={()=>navigateTab('analytics')}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap
                  ${tab==='analytics'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                Analytics
              </button>
              <button onClick={()=>navigateTab('history')}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap
                  ${tab==='history'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                History
              </button>
              <button onClick={()=>navigateTab('leaderboard')}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap
                  ${tab==='leaderboard'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                Leaderboard
              </button>
              {authUser && ADMIN_EMAILS.includes(authUser.email || '') && (
                <button onClick={()=>navigateTab('admin')}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap
                    ${tab==='admin'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  Admin
                </button>
              )}
            </div>
          </div>
          {/* Right: actions */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {authUser ? (
              <ProfileMenu authUser={authUser} dark={dark} toggleTheme={toggleTheme} signOut={signOut}
                view={view} setView={setView} tab={tab} setTab={setTab}
                recommendedMode={recommendedMode} setRecommendedMode={setRecommendedMode}
                bookmarksCount={bookmarks.length} setPage={setPage} navigateTab={navigateTab}
                onUsedRecommendedPractice={markUsedRecommendedPractice}
                masteryStats={masteryStats} />
            ) : (
              <a href="./index.html"
                className="text-xs px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors whitespace-nowrap">
                Sign In
              </a>
            )}
          </div>
        </div>
      </nav>

      {tab === 'mastery' ? (
        <MasteryPage authUser={authUser} masteryStats={masteryStats} bookmarksCount={bookmarks.length} navigateTab={navigateTab} />
      ) : tab === 'leaderboard' ? (
        <LeaderboardPage authUser={authUser} />
      ) : tab === 'analytics' ? (
        <AnalyticsPage authUser={authUser} />
      ) : tab === 'history' ? (
        <HistoryPage authUser={authUser} allQuestions={questions} onOpenQuestion={(id)=>{
          navigateTab('problems');
          setRecommendedMode(false);
          setTopic("All Topics");
          setDiff("All Difficulties");
          setSearch("");
          setView("list");
          setPage(1);
          setTimeout(() => {
            const idx = filtered.findIndex(q => q.id === id);
            if (idx !== -1) openProblem(idx);
          }, 80);
        }} />
      ) : tab === 'admin' ? (
        <AdminQuestionManager authUser={authUser} />
      ) : tab === 'settings' ? (
        <SettingsPage authUser={authUser} navigateTab={navigateTab} />
      ) : tab === 'reportBug' ? (
        <ReportBugPage authUser={authUser} navigateTab={navigateTab} />
      ) : view === "recommended" ? (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1">Recommended Practice</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{recommendedVisible.length} recommended problem{recommendedVisible.length!==1?"s":""}</p>
              </div>
              <button onClick={() => { setRecommendedMode(false); setView('list'); }} title="Close"
                className="mt-1 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-5 mb-6">
            <div className="flex items-start gap-3">
              <div>
                <h2 className="font-bold text-blue-900 dark:text-blue-200 mb-1">How recommendations work</h2>
                <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                  The site recommends questions by looking at your previous attempts. It prioritizes problems from your weakest topics and UIL columns, gives extra priority to questions you have not attempted yet, and slightly favors medium or hard problems when they are useful for growth.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="px-2 py-1 rounded-full bg-white/70 dark:bg-slate-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">Weak topics</span>
                  <span className="px-2 py-1 rounded-full bg-white/70 dark:bg-slate-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">Weak columns</span>
                  <span className="px-2 py-1 rounded-full bg-white/70 dark:bg-slate-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">Unattempted questions</span>
                  <span className="px-2 py-1 rounded-full bg-white/70 dark:bg-slate-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">Appropriate difficulty</span>
                </div>
              </div>
            </div>
          </div>

          {/* RECOMMENDED FILTER BAR */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="relative flex-1 min-w-[220px]">
              <input type="text" placeholder="Search title, text, topic, tags..." value={search}
                onChange={e=>{setSearch(e.target.value); setPage(1);}}
                className="w-full pl-3 pr-3 py-2 text-sm rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <Dropdown label="Status" value={recStatus} options={["All","Unattempted","Correct","Missed"]} onChange={v=>{setRecStatus(v); setPage(1);}} />
            <Dropdown label="Topic" value={topic} options={TOPICS} onChange={v=>onFilter(setTopic,v)} />
            <Dropdown label="Difficulty" value={diff} options={DIFFICULTIES} onChange={v=>onFilter(setDiff,v)} />
            <Dropdown label="Type" value={typeFilter} options={SOURCE_TYPES} onChange={v=>onFilter(setTypeFilter,v)} />
            <Dropdown label="Source" value={sourceFilter} options={uniqueSources} onChange={v=>onFilter(setSourceFilter,v)} />
            <Dropdown label="Sort" value={recSort} options={["Most Recent","Oldest","Title","Hardest"]} onChange={v=>{setRecSort(v); setPage(1);}} />
          </div>

          {recommendedVisible.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="font-semibold text-slate-700 dark:text-slate-300">No recommendations yet</p>
              <p className="text-sm text-slate-400 mt-1">Answer a few problems first so the site can learn your weak areas.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
              <div className="hidden sm:grid grid-cols-[3rem_1fr_9rem_7rem_11rem_7rem] gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <span>#</span><span>Problem</span><span>Topic</span><span>Difficulty</span><span>Source</span><span>Date Added</span>
              </div>
              {recommendedVisible.map((q,i) => (
                <ProblemRow key={q.id} q={q} n={i+1}
                  onOpen={()=>openProblem(filtered.findIndex(x=>x.id===q.id))} />
              ))}
            </div>
          )}
        </div>
      ) : view === "review" ? (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1">Review Later</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{bookmarks.length} bookmarked problem{bookmarks.length!==1?"s":""}</p>
            </div>
            <div className="flex items-center gap-2 mt-1 shrink-0">
              {bookmarks.length>0 && (
                <button onClick={()=>setBookmarks([])} className="text-xs text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">Clear all</button>
              )}
              <button onClick={() => setView('list')} title="Close"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
          {bookmarks.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="font-semibold text-slate-700 dark:text-slate-300">No bookmarks yet</p>
              <p className="text-sm text-slate-400 mt-1">Open any problem and click "Review later" to save it here.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
              <div className="hidden sm:grid grid-cols-[3rem_1fr_9rem_7rem_11rem_7rem] gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <span>#</span><span>Problem</span><span>Topic</span><span>Difficulty</span><span>Source</span><span>Date Added</span>
              </div>
              {questions.filter(q=>bookmarks.includes(q.id)).map((q,i) => (
                <ProblemRow key={q.id} q={q} n={i+1}
                  onOpen={()=>{ const idx=filtered.findIndex(x=>x.id===q.id); if(idx===-1){setTopic("All Topics");setDiff("All Difficulties");setSearch(""); setTimeout(()=>openProblem(questions.findIndex(x=>x.id===q.id)),50);} else openProblem(idx); }} />
              ))}
            </div>
          )}
        </div>
      ) : (
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1">Problems</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">UIL General Mathematics · {filtered.length} problems</p>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <input type="text" placeholder="Search problems…" value={search}
              onChange={e=>{setSearch(e.target.value); setRecommendedMode(false); setView("list"); setPage(1);}}
              className="w-full pl-3 pr-3 py-2 text-sm rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <Dropdown label="Topic" value={topic} options={TOPICS} onChange={v=>onFilter(setTopic,v)} />
          <Dropdown label="Difficulty" value={diff} options={DIFFICULTIES} onChange={v=>onFilter(setDiff,v)} />
          <Dropdown label="Type" value={typeFilter} options={SOURCE_TYPES} onChange={v=>onFilter(setTypeFilter,v)} />
          <Dropdown label="Source" value={sourceFilter} options={uniqueSources} onChange={v=>onFilter(setSourceFilter,v)} />
        </div>

        {/* TABLE */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          {/* column header */}
          <div className="hidden sm:grid grid-cols-[3rem_1fr_9rem_7rem_11rem_7rem] gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            <span>#</span><span>Problem</span><span>Topic</span><span>Difficulty</span><span>Source</span><span>Date Added</span>
          </div>
          {pageItems.length === 0 ? (
            <div className="py-20 text-center text-slate-400 dark:text-slate-600">
              <p className="font-semibold">No problems found</p>
            </div>
          ) : pageItems.map((q, i) => {
            const globalIdx = (pageClamped-1)*PAGE_SIZE + i;
            return <ProblemRow key={q.id} q={q} n={globalIdx+1} onOpen={()=>openProblem(globalIdx)} />;
          })}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (() => {
          const pages = new Set([1, totalPages]);
          for (let i = Math.max(1, pageClamped - 2); i <= Math.min(totalPages, pageClamped + 2); i++) pages.add(i);
          const items = [];
          [...pages].sort((a,b)=>a-b).forEach((p, i, arr) => {
            if (i > 0 && p - arr[i-1] > 1) items.push('...');
            items.push(p);
          });
          return (
            <div className="flex items-center justify-center gap-1.5 mt-6">
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={pageClamped===1}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${pageClamped===1?"text-slate-300 dark:text-slate-700 cursor-not-allowed":"text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>‹</button>
              {items.map((p, i) => p === '...'
                ? <span key={`e${i}`} className="px-1 text-slate-400 dark:text-slate-600 select-none">…</span>
                : <button key={p} onClick={()=>setPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium ${p===pageClamped?"bg-blue-600 text-white":"text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>{p}</button>
              )}
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={pageClamped===totalPages}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${pageClamped===totalPages?"text-slate-300 dark:text-slate-700 cursor-not-allowed":"text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>›</button>
            </div>
          );
        })()}
      </div>
      )}

      {/* PROBLEM VIEW — only when on problems tab */}

      {tab === 'problems' && openIdx !== null && filtered[openIdx] && (
        <ProblemView
          q={filtered[openIdx]}
          prevAnswer={answersRef.current[filtered[openIdx].id]}
          stat={qStats[filtered[openIdx].id]}
          isBookmarked={bookmarks.includes(filtered[openIdx].id)}
          onToggleBookmark={()=>toggleBookmark(filtered[openIdx].id)}
          onClose={closeProblem}
          onAnswered={recordAnswer}
          hasPrev={openIdx>0}
          hasNext={openIdx<filtered.length-1}
          onPrev={()=>openProblem(Math.max(0,openIdx-1))}
          onNext={()=>openProblem(Math.min(filtered.length-1,openIdx+1))}
          authUser={authUser}
          allQuestions={questions}
          answeredIds={Object.keys(answersRef.current).map(Number)}
          onOpenQuestion={(id)=>{
            const idx = filtered.findIndex(x=>x.id===id);
            if(idx!==-1){ openProblem(idx); }
            else {
              setTopic("All Topics"); setDiff("All Difficulties"); setSearch("");
              const qIdx = questions.findIndex(x=>x.id===id);
              if(qIdx!==-1) setTimeout(()=>openProblem(qIdx),50);
            }
          }}
        />
      )}
    </div>
  );
}

function mountApp() {
  const root = document.getElementById("root");
  if (!root) return;
  root.dataset.loaded = "1";
  ReactDOM.createRoot(root).render(<App />);
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountApp);
} else {
  mountApp();
}
