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
  // Native <dialog>: showModal() gives Escape, the ::backdrop, focus moved into
  // the dialog, focus trapped inside it, and focus returned to whichever button
  // opened it. All of that used to be missing entirely.
  const authDialog = () => document.getElementById('auth-modal');

  window.openAuth = function(tab) {
    const d = authDialog();
    switchTab(tab || 'signin');
    if (!d.open) d.showModal();
    // Land on the first field rather than the close button, which is what the
    // browser would otherwise focus as the first tabbable element.
    d.querySelector(tab === 'signup' ? '#signup-name' : '#signin-email')?.focus();
  };
  function closeAuth() {
    const d = authDialog();
    if (d.open) d.close();
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
  // ─── ADMIN LINK ───────────────────────────────────────────────────────────
  // The Admin link is built in the DOM only for a verified admin, never shipped
  // in the page source. It used to sit in the static HTML behind a `hidden`
  // class, which advertised the route to everyone who opened view-source.
  //
  // Admin status comes from the server, not a hard-coded email list: is_admin()
  // is the same SECURITY DEFINER function the RLS policies use, so the link and
  // the real gate cannot drift apart. The link is cosmetic either way -- the
  // policies are what actually protect the data.
  const ADMIN_LINK_CLS = 'px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors';
  const ADMIN_LINK_CLS_MOBILE = 'px-3 py-3 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';

  function renderAdminLinks(isAdmin) {
    document.querySelectorAll('[data-admin-link]').forEach(el => el.remove());
    if (!isAdmin) return;

    const make = (cls) => {
      const a = document.createElement('a');
      a.href = './app.html?tab=admin';
      a.className = cls;
      a.textContent = 'Admin';
      a.setAttribute('data-admin-link', '');
      return a;
    };
    document.getElementById('nav-tabs')?.appendChild(make(ADMIN_LINK_CLS));
    const sheet = document.querySelector('#nav-mobile-menu .flex.flex-col');
    const divider = sheet?.querySelector('.border-t');
    if (sheet) sheet.insertBefore(make(ADMIN_LINK_CLS_MOBILE), divider || null);
  }

  // ─── MOBILE MENU ──────────────────────────────────────────────────────────
  // Below sm the tab strip is hidden, so this is the only way to reach
  // Problems/Analytics/History/Mastery/Leaderboard on a phone.
  function setNavMenu(open) {
    const menu = document.getElementById('nav-mobile-menu');
    const btn = document.getElementById('nav-menu-btn');
    if (!menu || !btn) return;
    menu.classList.toggle('hidden', !open);
    document.getElementById('nav-menu-icon-open').classList.toggle('hidden', open);
    document.getElementById('nav-menu-icon-close').classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  const isNavMenuOpen = () => !document.getElementById('nav-mobile-menu').classList.contains('hidden');
  window.toggleNavMenu = () => setNavMenu(!isNavMenuOpen());
  window.closeNavMenu = () => setNavMenu(false);

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNavMenu(false); });
  // Tapping the page behind the menu closes it, matching every other sheet.
  document.addEventListener('click', (e) => {
    if (!isNavMenuOpen()) return;
    if (e.target.closest('#nav-mobile-menu') || e.target.closest('#nav-menu-btn')) return;
    setNavMenu(false);
  });
  // Growing past the breakpoint brings the real tab strip back; leaving the
  // menu open would stack two navigations on top of each other.
  window.addEventListener('resize', () => { if (window.innerWidth >= 640) setNavMenu(false); });

  async function setNavState(user) {
    const loggedIn = !!user;
    // Ask the server. A signed-out visitor never calls it.
    let isAdmin = false;
    if (loggedIn) {
      const { data, error } = await supabase.rpc('is_admin');
      isAdmin = !error && data === true;
    }
    renderAdminLinks(isAdmin);
    document.getElementById('nav-loggedout').classList.toggle('hidden', loggedIn);
    document.getElementById('nav-loggedin').classList.toggle('hidden', !loggedIn);
    document.getElementById('hero-create-btn').classList.toggle('hidden', loggedIn);
    document.getElementById('cta-create-btn').classList.toggle('hidden', loggedIn);
    document.getElementById('cta-browse-btn').textContent = loggedIn ? 'Browse Problems' : 'Browse Problems First';
    // Admin links are built by renderAdminLinks above, not toggled here: they
    // do not exist in the markup at all unless the server says you are an admin.
    document.getElementById('nav-menu-signup').classList.toggle('hidden', loggedIn);
    document.getElementById('nav-menu-signout').classList.toggle('hidden', !loggedIn);
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

  // Light dismiss. A native <dialog> does not close on backdrop click by itself,
  // but a click on the backdrop targets the dialog element, so this still works.
  document.getElementById('auth-modal').addEventListener('click', function(e) {
    if (e.target === this) window.closeAuth();
  });
  // Escape closes the dialog without going through closeAuth(), so clear any
  // stale error there too rather than showing it again on the next open.
  document.getElementById('auth-modal').addEventListener('close', clearErrors);
});
