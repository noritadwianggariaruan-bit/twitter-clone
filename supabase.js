const supabaseUrl = "https://cjkfayemtiixlfxfcddp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqa2ZheWVtdGlpeGxmeGZjZGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NzAxODYsImV4cCI6MjA4NDA0NjE4Nn0.pcLZYsl1avZzz54f7G-TWS_z-zzm0UY1S21hFVjYYew";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

async function signup() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const avatarFile = document.getElementById("avatar").files[0];
  const message = document.getElementById("message");

  if (!username || !email || !password) {
    message.textContent = "Semua field wajib diisi";
    return;
  }

  // 1️⃣ Signup auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    message.textContent = error.message;
    return;
  }

  const user = data.user;
  let avatarUrl = null;

  // 2️⃣ Upload avatar (kalau ada)
  if (avatarFile) {
    const filePath = `${user.id}/${avatarFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, { upsert: true });

    if (!uploadError) {
      avatarUrl = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath).data.publicUrl;
    }
  }

  // 3️⃣ Simpan ke profiles
  await supabase.from("profiles").insert({
    id: user.id,
    username,
    avatar_url: avatarUrl
  });

  window.location.href = "home.html";
}
