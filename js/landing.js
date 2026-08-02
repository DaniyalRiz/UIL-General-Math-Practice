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
    // The hero no longer carries a "Create an Account" button: practising is the
    // primary action there, and the account lives in the nav.
    document.getElementById('cta-create-btn').classList.toggle('hidden', loggedIn);
    document.getElementById('cta-browse-btn').textContent = loggedIn ? 'Keep practicing' : 'Start practicing';
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

  // ─── HERO PROBLEM CARD ────────────────────────────────────────────────────
  // A different real question every visit, rendered to match the app's problem
  // view. Grading goes through guest_check_answer, the same RPC the app uses for
  // signed-out visitors, so the answer key never reaches the client -- which is
  // also the only way a *random* question could work at all, since
  // public_questions deliberately omits `answer`.
  const heroCard = document.getElementById('hero-card');

  const esc = (t) => String(t ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // KaTeX is loaded on demand: 999 of 1000 solutions contain LaTeX, so the card
  // needs it, but blocking first paint of the hero on a maths library would be
  // the wrong trade. Text renders first and upgrades when the chunk lands.
  let katexLib = null;
  const katexReady = import('katex')
    .then(async (m) => { await import('katex/dist/katex.min.css'); katexLib = m.default || m; })
    .catch(() => {});

  // Same splitting rule as MathText in the app.
  function renderMath(text) {
    const parts = String(text ?? '').split(/(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g);
    return parts.map(part => {
      if (!part) return '';
      const display = part.startsWith('\\[') && part.endsWith('\\]');
      const inline = part.startsWith('\\(') && part.endsWith('\\)');
      if (display || inline) {
        const tex = part.slice(2, part.length - 2);
        if (!katexLib) return esc(tex);
        try { return katexLib.renderToString(tex, { displayMode: display, throwOnError: false }); }
        catch (e) { return esc(tex); }
      }
      return esc(part);
    }).join('');
  }

  const fmtClock = (ms) => {
    const s = Math.max(0, Math.round(ms / 1000));
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  };
  const stripLetter = (c) => String(c ?? '').replace(/^\([A-E]\)\s*/, '');
  const DIFF_PILL = {
    Easy:   'bg-emerald-100 text-emerald-800',
    Medium: 'bg-amber-100 text-amber-800',
    Hard:   'bg-rose-100 text-rose-800',
  };
  const TOPIC_DOT = {
    'Algebra 1 & 2': 'bg-violet-500', 'Geometry': 'bg-sky-500',
    'Precalculus': 'bg-emerald-500', 'AP Calculus': 'bg-orange-500',
    'AP Statistics': 'bg-blue-500',
  };
  const sourceLabel = (q) => {
    const src = q.source || q.original_test || '';
    const n = q.original_question_number;
    return src && n ? `${src} · Problem ${n}` : src;
  };

  // Same scoring the app's "Practice Similar Problems" uses.
  function similarTo(q, pool) {
    return pool.filter(x => x.id !== q.id)
      .map(x => {
        const shared = (q.tags || []).filter(t => (x.tags || []).includes(t));
        let score = shared.length * 10;
        if (x.topic === q.topic) score += 4;
        if (x.difficulty === q.difficulty) score += 2;
        return { x, score, shared };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(s => ({ ...s.x, sharedTags: s.shared }));
  }

  function mountHeroCard(q, pool) {
    const similar = similarTo(q, pool);
    const nextId = similar[0]?.id ?? q.id;
    const started = Date.now();
    let pending = null, answered = false, medianMs = null;

    heroCard.innerHTML = `
      <div class="p-5 sm:p-6">
        <div class="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
              <span class="w-2.5 h-2.5 rounded-full ${TOPIC_DOT[q.topic] || 'bg-slate-400'}"></span>${esc(q.topic || '')}
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${DIFF_PILL[q.difficulty] || 'bg-slate-100 text-slate-700'}">${esc(q.difficulty || '')}</span>
            ${sourceLabel(q) ? `<span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">${esc(sourceLabel(q))}</span>` : ''}
          </div>
          <span id="hero-timer" class="font-mono text-blue-700 tabular-nums text-sm">00:00</span>
        </div>

        ${q.title ? `<h2 class="font-display text-lg font-bold text-slate-900 tracking-tight mb-3">${esc(q.title)}</h2>` : ''}
        <p id="hero-qtext" class="text-slate-900 text-[15px] leading-relaxed mb-4 overflow-x-auto">${renderMath(q.question)}</p>
        ${q.image ? `<img src="${esc(q.image)}" alt="${esc(q.image_alt || 'Figure for this problem')}" class="max-w-full rounded-xl border border-slate-200 mb-4 mx-auto"/>` : ''}

        <div id="hero-choices" class="grid gap-2"></div>

        <button id="hero-submit" type="button" disabled
          class="w-full mt-4 py-3 rounded-lg text-sm font-bold transition-all bg-slate-100 text-slate-500 cursor-not-allowed">
          Select an answer first
        </button>
        <p id="hero-hint" class="text-slate-500 text-xs mt-3">Answer it the way you would in a contest.</p>

        <div id="hero-result" class="hidden mt-4 pt-4 border-t border-slate-200"></div>
      </div>
      <div id="hero-panels" class="hidden border-t border-slate-200 bg-slate-50 p-5 sm:p-6 space-y-4"></div>
    `;

    const choicesEl = document.getElementById('hero-choices');
    const submitEl  = document.getElementById('hero-submit');
    const timerEl   = document.getElementById('hero-timer');
    const timerId = setInterval(() => {
      if (!answered) timerEl.textContent = fmtClock(Date.now() - started);
    }, 250);

    const BASE  = 'w-full text-left px-3 py-3 rounded-xl border-2 text-[15px] font-medium transition-all duration-150 flex items-center gap-3 select-none';
    const BADGE = 'w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 font-black border-2 transition-all';
    let correctIndex = -1;

    const paint = () => {
      [...choicesEl.children].forEach((btn, i) => {
        const badge = btn.querySelector('span');
        if (!answered) {
          const on = pending === i;
          btn.className = `${BASE} ${on ? 'border-blue-500 bg-blue-50 text-slate-900' : 'border-slate-200 text-slate-800 hover:border-blue-300 hover:bg-blue-50/50'}`;
          badge.className = `${BADGE} ${on ? 'bg-blue-500 text-white border-blue-500' : 'border-slate-300 text-slate-500'}`;
          return;
        }
        const isAnswer = i === correctIndex, isPick = i === pending;
        btn.disabled = true;
        btn.className = `${BASE} ${isAnswer ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                                 : isPick   ? 'border-rose-500 bg-rose-50 text-rose-900'
                                            : 'border-slate-200 text-slate-500 opacity-70'}`;
        badge.className = `${BADGE} ${isAnswer ? 'bg-emerald-500 text-white border-emerald-500'
                                    : isPick   ? 'bg-rose-500 text-white border-rose-500'
                                               : 'border-slate-300 text-slate-400'}`;
      });
    };

    const setSubmitState = () => {
      const ready = pending !== null && !answered;
      submitEl.disabled = !ready;
      submitEl.textContent = ready ? 'Submit Answer' : 'Select an answer first';
      submitEl.className = ready
        ? 'w-full mt-4 py-3 rounded-lg text-sm font-bold transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
        : 'w-full mt-4 py-3 rounded-lg text-sm font-bold transition-all bg-slate-100 text-slate-500 cursor-not-allowed';
    };

    (q.choices || []).forEach((choice, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const badge = document.createElement('span');
      badge.textContent = String.fromCharCode(65 + i);
      btn.appendChild(badge);
      const label = document.createElement('span');
      label.innerHTML = renderMath(stripLetter(choice));
      btn.appendChild(label);
      btn.addEventListener('click', () => {
        if (answered) return;
        pending = pending === i ? null : i;
        paint(); setSubmitState();
      });
      choicesEl.appendChild(btn);
    });
    paint(); setSubmitState();

    submitEl.addEventListener('click', async () => {
      if (answered || pending === null) return;
      submitEl.disabled = true;
      submitEl.textContent = 'Checking…';
      const elapsed = Date.now() - started;
      const selectedRaw = (q.choices || [])[pending];

      const { data, error } = await supabase.rpc('guest_check_answer', {
        p_question_id: q.id, p_selected: selectedRaw,
      });
      const res = Array.isArray(data) ? data[0] : data;
      if (error || !res || res.error) {
        submitEl.disabled = false;
        submitEl.textContent = 'Submit Answer';
        document.getElementById('hero-hint').textContent = 'Could not check that answer. Try again in a moment.';
        return;
      }

      answered = true;
      clearInterval(timerId);
      timerEl.textContent = fmtClock(elapsed);
      correctIndex = (q.choices || []).findIndex(c => c === res.correct_answer);
      paint();
      submitEl.classList.add('hidden');
      document.getElementById('hero-hint').classList.add('hidden');

      const secs = Math.max(1, Math.round(elapsed / 1000));
      const medianLine = medianMs
        ? `You: ${secs}s · median: ${Math.round(medianMs / 1000)}s`
        : `You: ${secs}s`;

      const result = document.getElementById('hero-result');
      result.innerHTML = `
        <p class="font-bold text-[15px] mb-2 ${res.is_correct ? 'text-emerald-700' : 'text-rose-700'}">
          ${res.is_correct ? 'Correct: ' + esc(stripLetter(res.correct_answer)) : 'Incorrect. The answer is ' + esc(stripLetter(res.correct_answer)) + '.'}
        </p>
        <p class="text-slate-600 text-sm mb-3 font-medium">${medianLine}</p>
        <div class="text-slate-800 text-[15px] leading-relaxed overflow-x-auto">${renderMath(res.explanation || '')}</div>
        <a href="./app.html?id=${nextId}"
          class="mt-4 inline-block px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-lg transition-colors">
          Next problem &rarr;
        </a>`;
      result.classList.remove('hidden');

      // The same three panels the app shows beside a solved problem.
      const panels = document.getElementById('hero-panels');
      panels.innerHTML = `
        <div class="rounded-xl border border-slate-200 bg-white px-4 py-3">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Your history on this problem</p>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div><p class="text-lg font-bold text-slate-800">${res.is_correct ? '100%' : '0%'}</p><p class="text-[11px] text-slate-500">${res.is_correct ? '1/1' : '0/1'} correct</p></div>
            <div><p class="text-lg font-bold text-slate-800">${fmtClock(elapsed)}</p><p class="text-[11px] text-slate-500">best time</p></div>
            <div><p class="text-lg font-bold text-slate-800">${fmtClock(elapsed)}</p><p class="text-[11px] text-slate-500">last time</p></div>
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white">
          <div class="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
            <p class="text-sm font-bold text-slate-700">My Notes</p>
            <span class="ml-auto text-xs text-slate-500">Sign in to save notes</span>
          </div>
          <div class="px-4 py-3">
            <p class="text-xs text-slate-500">
              <button type="button" onclick="openAuth('signin')" class="text-blue-600 hover:underline">Sign in</button> to add and save notes.
            </p>
          </div>
        </div>

        ${similar.length ? `
        <div class="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div class="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <p class="text-sm font-bold text-slate-700">Practice Similar Problems</p>
            <p class="text-xs text-slate-500 mt-0.5">Build speed by drilling the same question pattern.</p>
          </div>
          <div class="divide-y divide-slate-100">
            ${similar.map(sq => `
              <div class="px-4 py-3 flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-slate-800 truncate">${esc(sq.title || 'Problem #' + sq.id)}</p>
                  <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
                    <span class="w-1.5 h-1.5 rounded-full ${TOPIC_DOT[sq.topic] || 'bg-slate-400'}"></span>${esc(sq.topic || '')}
                    <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold ${DIFF_PILL[sq.difficulty] || 'bg-slate-100 text-slate-700'}">${esc(sq.difficulty || '')}</span>
                  </p>
                  ${(sq.sharedTags || []).length ? `<p class="text-[11px] text-blue-700 mt-1">${sq.sharedTags.slice(0,2).map(t => '#' + esc(t)).join(' ')}</p>` : ''}
                </div>
                <a href="./app.html?id=${sq.id}" class="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white">Open</a>
              </div>`).join('')}
          </div>
        </div>` : ''}
      `;
      panels.classList.remove('hidden');
    });

    // Real median for this exact question, same RPC the app uses.
    supabase.rpc('get_question_time_stats', { p_question_id: q.id }).then(({ data, error }) => {
      if (error) return;
      const row = Array.isArray(data) ? data[0] : data;
      if (row?.median_ms > 0) medianMs = row.median_ms;
    });
  }

  // ─── QUESTION POOL (feeds both the hero card and the stats) ───────────────
  // One fetch, two jobs: the stats row and the hero's random question. The pool
  // is also what "Practice Similar Problems" scores against, which is why the
  // whole set is pulled rather than a single random row.
  supabase.from('public_questions')
    .select('id,title,topic,difficulty,source,question,choices,tags,image,image_alt,original_test,original_question_number')
    .limit(5000)
    .then(({ data, error }) => {
      if (error || !data || data.length === 0) {
        if (heroCard) heroCard.innerHTML = '<div class="p-6 text-slate-600 text-[15px]">Could not load a practice question. <a class="text-blue-700 font-semibold hover:underline" href="./app.html?tab=problems">Open the app</a> instead.</div>';
        return;
      }

      const tests = new Set(data.map(q => q.source).filter(Boolean));
      document.getElementById('stat-problems').textContent = data.length;
      document.getElementById('stat-tests').textContent = tests.size;

      if (!heroCard) return;
      // A different question every visit, but not any question. A random draw
      // from all 1000 surfaces hard, multi-paragraph problems that dwarf the
      // hero and that a visitor cannot solve in the few seconds the card is
      // asking for -- which loses the hook instead of proving it. Easy and
      // Medium, short, and image-free leaves 251 questions across all five
      // topics; the length cap is what actually keeps the card in shape, not
      // the difficulty.
      const HERO_DIFFICULTIES = ['Easy', 'Medium'];
      const fits = (q) =>
        Array.isArray(q.choices) && q.choices.length >= 2 &&
        q.question && q.question.length <= 160 &&
        HERO_DIFFICULTIES.includes(q.difficulty) && !q.image;
      const usable = data.filter(fits);
      // Fall back to anything answerable rather than showing nothing.
      const pool = usable.length ? usable : data.filter(q => Array.isArray(q.choices) && q.choices.length >= 2 && q.question);
      const pick = pool[Math.floor(Math.random() * pool.length)];
      if (!pick) return;
      // Wait for KaTeX so the question does not visibly reflow from raw TeX to
      // typeset maths a moment after it appears.
      katexReady.finally(() => mountHeroCard(pick, data));
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
