/* =========================
   PROTEKSI HALAMAN
========================= */
(async () => {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    window.location.href = "index.html";
  }
})();

/* =========================
   LOAD PROFILE
========================= */
async function loadProfile() {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return;

  // tampilkan email
  document.getElementById("email").textContent = user.email;

  // ambil profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile) {
    document.getElementById("username").textContent =
      "@" + profile.username;

    if (profile.avatar_url) {
      document.getElementById("avatar").innerHTML =
        `<img src="${profile.avatar_url}" />`;
    } else {
      document.getElementById("avatar").textContent =
        profile.username.charAt(0).toUpperCase();
    }
  }

  loadMyTweets(user.id);
}

/* =========================
   LOAD TWEET USER
========================= */
async function loadMyTweets(userId) {
  const { data } = await supabase
    .from("tweets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const container = document.getElementById("myTweets");
  container.innerHTML = "";

  data.forEach(tweet => {
    const div = document.createElement("div");
    div.className = "tweet-card";

    div.innerHTML = `
      <div class="tweet-content">
        <div class="tweet-text">${tweet.content}</div>
        <div class="time">
          ${new Date(tweet.created_at).toLocaleString()}
        </div>
      </div>
    `;

    container.appendChild(div);
  });
}

loadProfile();

/* =========================
   UPDATE PROFILE
========================= */
window.updateProfile = async function () {
  const message = document.getElementById("profileMessage");
  const newUsername = document.getElementById("editUsername").value.trim();
  const avatarFile = document.getElementById("editAvatar").files[0];

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return;

  let avatarUrl = null;

  // UPLOAD AVATAR BARU
  if (avatarFile) {
    const filePath = `${user.id}/${Date.now()}_${avatarFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, { upsert: true });

    if (uploadError) {
      message.textContent = uploadError.message;
      return;
    }

    avatarUrl = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath).data.publicUrl;
  }

  // UPDATE PROFILE
  const updates = {};
  if (newUsername) updates.username = newUsername;
  if (avatarUrl) updates.avatar_url = avatarUrl;

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    message.textContent = error.message;
    return;
  }

  message.style.color = "#1d9bf0";
  message.textContent = "Profil berhasil diperbarui";

  // refresh profile
  loadProfile();
};
