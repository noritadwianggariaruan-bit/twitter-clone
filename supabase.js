// ===============================
// SUPABASE CONFIG
// ===============================
const SUPABASE_URL = "https://cjkfayemtiixlfxfcddp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqa2ZheWVtdGlpeGxmeGZjZGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NzAxODYsImV4cCI6MjA4NDA0NjE4Nn0.pcLZYsl1avZzz54f7G-TWS_z-zzm0UY1S21hFVjYYew";

const client = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

console.log("Supabase siap");

// ===============================
// UI SWITCH
// ===============================
function showRegister() {
  document.getElementById("title").innerText = "Create your account";
  document.getElementById("actionBtn").innerText = "Daftar";
  document.getElementById("actionBtn").onclick = register;

  document.getElementById("switchText").innerText = "Sudah punya akun?";
  document.querySelector(".link-btn").innerText = "Login";
  document.querySelector(".link-btn").onclick = showLogin;

  document.getElementById("message").innerText = "";
}

function showLogin() {
  document.getElementById("title").innerText = "Sign in to X";
  document.getElementById("actionBtn").innerText = "Login";
  document.getElementById("actionBtn").onclick = login;

  document.getElementById("switchText").innerText = "Belum punya akun?";
  document.querySelector(".link-btn").innerText = "Daftar";
  document.querySelector(".link-btn").onclick = showRegister;

  document.getElementById("message").innerText = "";
}

// ===============================
// REGISTER
// ===============================
async function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
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

  message.innerText = error
    ? error.message
    : "Akun berhasil dibuat 🎉 Silakan login";
}

// ===============================
// LOGIN
// ===============================
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  const { error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  message.innerText = error
    ? error.message
    : "Login berhasil 🎉";
}

// ===============================
// GLOBAL
// ===============================
window.showRegister = showRegister;
window.showLogin = showLogin;
window.register = register;
window.login = login;
