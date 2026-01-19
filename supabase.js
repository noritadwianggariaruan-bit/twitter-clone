const SUPABASE_URL = "https://cjkfayemtiixlfxfcddp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqa2ZheWVtdGlpeGxmeGZjZGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NzAxODYsImV4cCI6MjA4NDA0NjE4Nn0.pcLZYsl1avZzz54f7G-TWS_z-zzm0UY1S21hFVjYYew";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// ⬇️ WAJIB GLOBAL
window.signup = async function () {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const avatar = document.getElementById("avatar").files[0];
  const message = document.getElementById("message");

  if (!username || !email || !password) {
    message.textContent = "Semua field wajib diisi";
    return;
  }

  // AUTH SIGNUP
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    message.textContent = error.message;
    return;
  }

  const user = data.user;
  let avatarUrl = null;

  // UPLOAD AVATAR
  if (avatar) {
    const path = `${user.id}/${avatar.name}`;

    const { error: uploadError } = await supabaseClient.storage
      .from("avatars")
      .upload(path, avatar, { upsert: true });

    if (!uploadError) {
      avatarUrl = supabaseClient
        .storage
        .from("avatars")
        .getPublicUrl(path).data.publicUrl;
    }
  }

  // INSERT PROFILE
  await supabaseClient.from("profiles").insert({
    id: user.id,
    username: username,
    avatar_url: avatarUrl
  });

  window.location.href = "home.html";
};
