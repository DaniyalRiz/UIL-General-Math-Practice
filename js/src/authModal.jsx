// In-app sign in / create account modal.
//
// The landing page (index.html + landing.js) has its own hand-written copy of
// this modal. This is the React twin so that a "Sign in" prompt anywhere inside
// app.html can open it in place instead of bouncing the user out to the landing
// page and making them find the button again. The two are deliberate duplicates:
// keep the copy, classes, and behavior in sync when either one changes.
import { useState, useEffect, useRef } from 'react';
import { _supabase } from '../supabaseClient.js';

const RESET_REDIRECT = 'https://daniyalriz.github.io/UIL-General-Math-Practice/reset-password.html';

// Send OAuth back to the page the user is actually on, so signing in from the
// app leaves them in the app. Supabase only honors this when the URL is in the
// project's Redirect URLs allow list; otherwise it falls back to the Site URL
// (the landing page), which is exactly the old behavior.
const returnUrl = () => window.location.origin + window.location.pathname;

function GoogleIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  );
}

const FIELD_CLS = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const LABEL_CLS = "block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider";

export function AuthModal({ initialTab = 'signin', onClose }) {
  const [tab, setTab] = useState(initialTab === 'signup' ? 'signup' : 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);
  const firstFieldRef = useRef(null);
  const panelRef = useRef(null);

  const clearMessages = () => { setError(''); setSuccess(''); };
  const switchTab = (next) => { setTab(next); clearMessages(); };

  useEffect(() => { firstFieldRef.current?.focus(); }, [tab]);

  // Return focus to whatever opened the dialog. Without this the caret lands
  // back at the top of the document and a keyboard user has to tab all the way
  // to where they were.
  const openerRef = useRef(typeof document !== 'undefined' ? document.activeElement : null);
  useEffect(() => () => {
    const opener = openerRef.current;
    if (opener && typeof opener.focus === 'function' && document.contains(opener)) opener.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Keep Tab inside the dialog. Without it, tabbing walks straight out into the
  // page behind, which is still fully interactive underneath the overlay.
  const trapTab = (e) => {
    if (e.key !== 'Tab') return;
    const focusable = panelRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    clearMessages();
    if (!email.trim() || !password) return setError('Please fill in all fields.');
    setBusy(true);
    const { error: err } = await _supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (err) return setError(err.message);
    onClose();
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    clearMessages();
    if (!name.trim() || !email.trim() || !password) return setError('Please fill in all fields.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    setBusy(true);
    const { data, error: err } = await _supabase.auth.signUp({
      email: email.trim(), password,
      options: { data: { display_name: name.trim() } },
    });
    setBusy(false);
    if (err) return setError(err.message);
    // If email confirmation is disabled in Supabase, the user is signed in immediately
    if (data.session) onClose();
    else setSuccess('Account created! You can now sign in.');
  };

  const handleForgotPassword = async () => {
    clearMessages();
    if (!email.trim()) return setError('Type your email in the field above, then click "Forgot password?" again.');
    const { error: err } = await _supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: RESET_REDIRECT });
    if (err) return setError(err.message);
    setSuccess('If an account exists for that email, a password reset link is on its way. Check your inbox.');
  };

  const handleGoogleAuth = async () => {
    const { error: err } = await _supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: returnUrl() },
    });
    if (err) setError(err.message);
  };

  const isSignin = tab === 'signin';
  const tabCls = (active) => `flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
    active ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`;

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog" aria-modal="true" aria-label={isSignin ? 'Sign in' : 'Create account'}>
      <div ref={panelRef} onKeyDown={trapTab}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[92dvh] overflow-y-auto p-5 sm:p-8 relative">
        <button onClick={onClose} aria-label="Close"
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 text-2xl leading-none dark:text-slate-400">
          ×
        </button>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-6">
          <button onClick={() => switchTab('signin')} className={tabCls(isSignin)}>Sign In</button>
          <button onClick={() => switchTab('signup')} className={tabCls(!isSignin)}>Create Account</button>
        </div>

        {isSignin ? (
          <form onSubmit={handleSignIn}>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">Welcome back</h2>
            <p className="text-slate-600 dark:text-slate-400 text-[15px] mb-6">Sign in to track your progress</p>
            <div className="space-y-4">
              <div>
                <label className={LABEL_CLS} htmlFor="auth-signin-email">Email</label>
                <input id="auth-signin-email" ref={firstFieldRef} type="email" autoComplete="email" placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)} className={FIELD_CLS} />
              </div>
              <div>
                <label className={LABEL_CLS} htmlFor="auth-signin-password">Password</label>
                <input id="auth-signin-password" type="password" autoComplete="current-password" placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)} className={FIELD_CLS} />
                <div className="mt-1.5 text-right">
                  <button type="button" onClick={handleForgotPassword}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                    Forgot password?
                  </button>
                </div>
              </div>
              {error && <div className="text-rose-700 dark:text-rose-400 text-sm bg-rose-50 dark:bg-rose-500/10 rounded-lg px-3 py-2">{error}</div>}
              {success && <div className="text-emerald-700 dark:text-emerald-400 text-sm bg-emerald-50 dark:bg-emerald-500/10 rounded-lg px-3 py-2">{success}</div>}
              <button type="submit" disabled={busy}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors text-sm">
                {busy ? 'Signing in…' : 'Sign In'}
              </button>
              <button type="button" onClick={handleGoogleAuth}
                className="w-full py-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                <GoogleIcon /> Continue with Google
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignUp}>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">Create account</h2>
            <p className="text-slate-600 dark:text-slate-400 text-[15px] mb-6">Start tracking your UIL Math progress</p>
            <div className="space-y-4">
              <div>
                <label className={LABEL_CLS} htmlFor="auth-signup-name">Display Name</label>
                <input id="auth-signup-name" ref={firstFieldRef} type="text" autoComplete="name" placeholder="Your name"
                  value={name} onChange={e => setName(e.target.value)} className={FIELD_CLS} />
              </div>
              <div>
                <label className={LABEL_CLS} htmlFor="auth-signup-email">Email</label>
                <input id="auth-signup-email" type="email" autoComplete="email" placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)} className={FIELD_CLS} />
              </div>
              <div>
                <label className={LABEL_CLS} htmlFor="auth-signup-password">Password</label>
                <input id="auth-signup-password" type="password" autoComplete="new-password" placeholder="At least 8 characters"
                  value={password} onChange={e => setPassword(e.target.value)} className={FIELD_CLS} />
              </div>
              {error && <div className="text-rose-700 dark:text-rose-400 text-sm bg-rose-50 dark:bg-rose-500/10 rounded-lg px-3 py-2">{error}</div>}
              {success && <div className="text-emerald-700 dark:text-emerald-400 text-sm bg-emerald-50 dark:bg-emerald-500/10 rounded-lg px-3 py-2">{success}</div>}
              <button type="submit" disabled={busy}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors text-sm">
                {busy ? 'Creating…' : 'Create Account'}
              </button>
              <button type="button" onClick={handleGoogleAuth}
                className="w-full py-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                <GoogleIcon /> Continue with Google
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
