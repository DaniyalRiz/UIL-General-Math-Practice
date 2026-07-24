// Reset-password page logic. handleSavePassword attaches to window because the
// HTML wires it through an inline onclick attribute.
import { _supabase as sb } from './supabaseClient.js';

function show(stateId) {
  ['state-loading','state-invalid','state-form','state-success'].forEach(id => {
    document.getElementById(id).classList.toggle('hidden', id !== stateId);
  });
}

// Supabase appends errors from expired/used links as URL hash params
// (e.g. #error=access_denied&error_description=...) instead of a token.
const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
const linkError = hashParams.get('error_description') || hashParams.get('error');

let resolved = false;
function resolveTo(stateId, detail) {
  if (resolved) return;
  resolved = true;
  if (detail) document.getElementById('invalid-detail').textContent = detail;
  show(stateId);
}

if (linkError) {
  resolveTo('state-invalid', linkError.replace(/\+/g, ' '));
} else {
  // detectSessionInUrl exchanges the recovery token automatically on load;
  // the session lands via onAuthStateChange. The timeout catches direct
  // visits with no token at all, which never produce a session.
  sb.auth.onAuthStateChange((_event, session) => {
    if (session) resolveTo('state-form');
  });
  sb.auth.getSession().then(({ data: { session } }) => {
    if (session) resolveTo('state-form');
  });
  setTimeout(() => resolveTo('state-invalid'), 4000);
}

function showFormError(msg) {
  const el = document.getElementById('form-error');
  el.textContent = msg;
  el.classList.remove('hidden');
}

window.handleSavePassword = async function() {
  document.getElementById('form-error').classList.add('hidden');
  const pw = document.getElementById('new-password').value;
  const confirm = document.getElementById('confirm-password').value;
  if (pw.length < 8) return showFormError('Password must be at least 8 characters.');
  if (pw !== confirm) return showFormError('Passwords do not match.');

  const btn = document.getElementById('save-btn');
  btn.disabled = true;
  btn.textContent = 'Saving…';
  const { error } = await sb.auth.updateUser({ password: pw });
  btn.disabled = false;
  btn.textContent = 'Save New Password';
  if (error) return showFormError(error.message);
  show('state-success');
};

// Enter submits from either field
['new-password','confirm-password'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => {
    if (e.key === 'Enter') window.handleSavePassword();
  });
});
