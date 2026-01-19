// ===============================
// SUPABASE
// ===============================
const SUPABASE_URL = "https://cjkfayemtiixlfxfcddp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqa2ZheWVtdGlpeGxmeGZjZGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NzAxODYsImV4cCI6MjA4NDA0NjE4Nn0.pcLZYsl1avZzz54f7G-TWS_z-zzm0UY1S21hFVjYYew";

window.supabase = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ===============================
// UI TOGGLE
// ===============================
function showRegister() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
  document.getElementById("message").innerText = "";
}

function showLogin() {
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("message").innerText = "";
}

// ===============================
// REGISTER
// ===============================
async function register() {
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const message = document.getElementById("message");

  if (!email || !password) {
    message.innerText = "Email dan password wajib diisi";
    return;
  }

  if (password.length < 6) {
    message.innerText = "Password minimal 6 karakter";
    return;
  }

  const { error } = await client.auth.signUp({ email, password });

  if (error) {
    message.innerText = error.message;
  } else {
    message.innerText = "Akun berhasil dibuat 🎉 Silakan login";
    showLogin();
  }
}

// ===============================
// LOGIN
// ===============================
async function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const message = document.getElementById("message");

  if (!email || !password) {
    message.innerText = "Email dan password wajib diisi";
    return;
  }

  const { error } = await client.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    message.innerText = error.message;
  } else {
    window.location.href = "home.html";
  }
}

// ===============================
// GLOBAL
// ===============================
window.showRegister = showRegister;
window.showLogin = showLogin;
window.register = register;
window.login = login;
