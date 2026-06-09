const API_URL = import.meta.env.VITE_API_URL;
 
// ── DOM ────────────────────────────────────────────────────────────────────
const overlay   = document.getElementById('auth-overlay');
const tabBtns   = document.querySelectorAll('.auth-tab');
const panels    = document.querySelectorAll('.auth-panel');
const msgBox    = document.getElementById('auth-msg');
 
// forms
const loginForm    = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
 



// ── Tab switching ──────────────────────────────────────────────────────────
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
    clearMsg();
  });
});
 
// ── Helpers ────────────────────────────────────────────────────────────────
function showMsg(text, isError = true) {
  msgBox.textContent = text;
  msgBox.className   = 'auth-msg ' + (isError ? 'error' : 'success');
}
function clearMsg() {
  msgBox.textContent = '';
  msgBox.className   = 'auth-msg';
}
function setLoading(btn, loading) {
  btn.disabled     = loading;
  btn.dataset.orig = btn.dataset.orig || btn.textContent;
  btn.textContent  = loading ? 'Hold on…' : btn.dataset.orig;
}
 
// ── Auth state ─────────────────────────────────────────────────────────────
export function getToken()  { return localStorage.getItem('wg_token'); }
export function getPlayer() {
  const raw = localStorage.getItem('wg_player');
  return raw ? JSON.parse(raw) : null;
}
function saveSession(token, user) {
  localStorage.setItem('wg_token',  token);
  localStorage.setItem('wg_player', JSON.stringify(user));
}
export function clearSession() {
  localStorage.removeItem('wg_token');
  localStorage.removeItem('wg_player');
}
 
// ── Show/hide overlay ──────────────────────────────────────────────────────
export function showAuth() {
  overlay.classList.remove('hidden');
  overlay.classList.add('visible');
}
export function hideAuth() {
  overlay.classList.remove('visible');
  overlay.classList.add('hidden');
}
 
if (loginForm && registerForm) {
  
  // ── Register ───────────────────────────────────────────────────────────────
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMsg();
    const btn      = registerForm.querySelector('button[type=submit]');
    const username = registerForm.username.value.trim();
    const email    = registerForm.email.value.trim();
    const password = registerForm.password.value;
    
    if (!username || !email || !password) return showMsg('Fill in all fields, partner.');
    if (password.length < 6)              return showMsg('Password needs at least 6 characters.');
    
    setLoading(btn, true);
    try {
      const res  = await fetch(`${API_URL}/auth/register`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return showMsg(data.message || 'Registration failed.');
      
      showMsg('Registered! Now sign in, outlaw. 🤠', false);
      registerForm.reset();
      
      // auto-switch to login tab
      setTimeout(() => {
        document.querySelector('[data-tab="login-panel"]').click();
      }, 1200);
      
    } catch {
      showMsg('Cannot reach the server. Is the backend running?');
    } finally {
      setLoading(btn, false);
    }
  });
  
  // ── Login ──────────────────────────────────────────────────────────────────
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMsg();
    const btn      = loginForm.querySelector('button[type=submit]');
    const email    = loginForm.email.value.trim();
    const password = loginForm.password.value;
    
    if (!email || !password) return showMsg('Fill in all fields, partner.');
    
    setLoading(btn, true);
    try {
      const res  = await fetch(`${API_URL}/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return showMsg(data.message || 'Login failed.');
      
      saveSession(data.token, data.user);
      showMsg(`Welcome back, ${data.user.username}! 🌵`, false);
      window.location.href = '/index.html';
      
      setTimeout(() => hideAuth(), 900);
      
    } catch {
      showMsg('Cannot reach the server. Is the backend running?');
    } finally {
      setLoading(btn, false);
    }
  });

}
 
// ── Boot: show auth if not logged in ──────────────────────────────────────
export function initAuth() {
  if (!getToken()) {
    showAuth();
  }
}