// Landing page (index.html) nav/auth logic. Handlers attach to window because
// the HTML wires them through inline onclick attributes.
import { _supabase as supabase } from './supabaseClient.js';

window.copyDiscordTag = function() {
  const btn = document.getElementById('discord-tag-btn');
  const original = btn.textContent;
  navigator.clipboard.writeText('daniyal7216').then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = original; }, 1500);
  });
};

document.addEventListener('DOMContentLoaded', function () {
  // ─── UI HELPERS ──────────────────────────────────────────────────────────
  window.openAuth = function(tab) {
    document.getElementById('auth-modal').classList.add('open');
    switchTab(tab || 'signin');
  };
  function closeAuth() {
    document.getElementById('auth-modal').classList.remove('open');
    clearErrors();
  }
  window.closeAuth = closeAuth;
  function switchTab(tab) {
    const isSignin = tab === 'signin';
    document.getElementById('form-signin').classList.toggle('hidden', !isSignin);
    document.getElementById('form-signup').classList.toggle('hidden', isSignin);
    document.getElementById('tab-signin').className = `flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${isSignin ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`;
    document.getElementById('tab-signup').className = `flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${!isSignin ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`;
    clearErrors();
  }
  window.switchTab = switchTab;
  function showError(id, msg) {
    const el = document.getElementById(id);
    el.textContent = msg; el.classList.remove('hidden');
  }
  function clearErrors() {
    ['signin-error','signin-success','signup-error','signup-success'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.textContent = ''; el.classList.add('hidden'); }
    });
  }
  const ADMIN_EMAILS = ['daniyalrizvi10@gmail.com'];

  function setNavState(user) {
    const loggedIn = !!user;
    const isAdmin = loggedIn && ADMIN_EMAILS.includes(user.email || '');
    document.getElementById('nav-loggedout').classList.toggle('hidden', loggedIn);
    document.getElementById('nav-loggedin').classList.toggle('hidden', !loggedIn);
    document.getElementById('hero-create-btn').classList.toggle('hidden', loggedIn);
    document.getElementById('cta-create-btn').classList.toggle('hidden', loggedIn);
    document.getElementById('cta-browse-btn').textContent = loggedIn ? 'Browse Problems' : 'Browse Problems First';
    document.getElementById('nav-admin-tab').classList.toggle('hidden', !isAdmin);
    if (loggedIn) {
      const name = user.user_metadata?.display_name || user.email?.split('@')[0] || 'User';
      document.getElementById('nav-username').textContent = `Hi, ${name}`;
    }
  }

  // ─── AUTH HANDLERS ────────────────────────────────────────────────────────
  window.handleSignIn = async function() {
    clearErrors();
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;
    if (!email || !password) return showError('signin-error', 'Please fill in all fields.');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return showError('signin-error', error.message);
    closeAuth();
  };
  window.handleSignUp = async function() {
    clearErrors();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    if (!name || !email || !password) return showError('signup-error', 'Please fill in all fields.');
    if (password.length < 8) return showError('signup-error', 'Password must be at least 8 characters.');
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { display_name: name } }
    });
    if (error) return showError('signup-error', error.message);
    // If email confirmation is disabled in Supabase, the user is signed in immediately
    if (data.session) {
      closeAuth();
    } else {
      document.getElementById('signup-success').textContent = 'Account created! You can now sign in.';
      document.getElementById('signup-success').classList.remove('hidden');
    }
  };

  window.handleForgotPassword = async function() {
    clearErrors();
    const email = document.getElementById('signin-email').value.trim();
    if (!email) return showError('signin-error', 'Type your email in the field above, then click "Forgot password?" again.');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://daniyalriz.github.io/UIL-General-Math-Practice/reset-password.html'
    });
    if (error) return showError('signin-error', error.message);
    const el = document.getElementById('signin-success');
    el.textContent = 'If an account exists for that email, a password reset link is on its way. Check your inbox.';
    el.classList.remove('hidden');
  };

  window.handleGoogleAuth = async function() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://daniyalriz.github.io/UIL-General-Math-Practice/' }
    });
    if (error) console.error('Google auth error:', error.message);
  };
  window.handleSignOut = async function() {
    await supabase.auth.signOut();
  };

  // ─── AUTH STATE LISTENER ──────────────────────────────────────────────────
  supabase.auth.onAuthStateChange((_event, session) => {
    setNavState(session?.user ?? null);
  });
  // Check existing session on load
  supabase.auth.getSession().then(({ data: { session } }) => {
    setNavState(session?.user ?? null);
  });

  // ─── LIVE STATS (Users / Problems / Topics / Real Tests) ──────────────────
  supabase.from('public_questions').select('topic, source').limit(5000).then(({ data, error }) => {
    if (error || !data) return;
    const topics = new Set(data.map(q => q.topic).filter(Boolean));
    const tests = new Set(data.map(q => q.source).filter(Boolean));
    document.getElementById('stat-problems').textContent = data.length;
    document.getElementById('stat-topics').textContent = topics.size;
    document.getElementById('stat-tests').textContent = tests.size;
  });
  supabase.rpc('get_user_count').then(({ data, error }) => {
    if (error || data == null) return;
    document.getElementById('stat-users').textContent = data;
  });

  // Close modal on backdrop click
  document.getElementById('auth-modal').addEventListener('click', function(e) {
    if (e.target === this) window.closeAuth();
  });
});
