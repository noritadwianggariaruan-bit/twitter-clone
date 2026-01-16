// ===============================
// SUPABASE SETUP
// ===============================
const SUPABASE_URL = "https://cjkfayemtiixlfxfcddp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqa2ZheWVtdGlpeGxmeGZjZGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NzAxODYsImV4cCI6MjA4NDA0NjE4Nn0.pcLZYsl1avZzz54f7G-TWS_z-zzm0UY1S21hFVjYYew";

const supabase = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ===============================
// REGISTER
// ===============================
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
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
    message.innerText = "Registrasi berhasil! Cek email kamu 📧";
  }
}

// ===============================
// LOGIN
// ===============================
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    message.innerText = error.message;
  } else {
    message.innerText = "Login berhasil 🎉";
    // nanti kita redirect ke halaman tweet
  }
}
