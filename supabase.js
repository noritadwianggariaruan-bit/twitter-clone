// ===============================
// SUPABASE CONFIG
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
window.showRegister = function () {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
  document.getElementById("message").innerText = "";
};

window.showLogin = function () {
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("message").innerText = "";
};

// ===============================
// REGISTER
// ===============================
window.register = async function () {
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const message = document.getElementById("message");

  if (!email || !password) {
    message.innerText = "Email dan password wajib diisi";
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    message.innerText = error.message;
  } else {
    message.innerText = "Akun berhasil dibuat, silakan login";
    showLogin();
  }
};

// ===============================
// LOGIN
// ===============================
window.login = async function () {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const message = document.getElementById("message");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    message.innerText = error.message;
  } else {
    window.location.href = "home.html";
  }
};

// ===============================
// LOGOUT
// ===============================
window.logout = async function () {
  await supabase.auth.signOut();
  window.location.href = "index.html";
};
