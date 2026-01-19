// ===============================
// CEK SESSION
// ===============================
(async () => {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    window.location.href = "index.html";
  }
})();

// ===============================
// LOAD PROFILE
// ===============================
async function loadProfile() {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  document.getElementById("profileUsername").textContent =
    "@" + data.username;

  if (data.avatar_url) {
    document.getElementById("profileAvatar").src = data.avatar_url;
  }
}

loadProfile();

// ===============================
// UPDATE PROFILE (INI YANG PENTING)
// ===============================
window.updateProfile = async function () {
  const message = document.getElementById("profileMessage");
  message.textContent = "Menyimpan...";

  const newUsername = document
    .getElementById("editUsername")
    .value.trim();

  const avatarFile =
    document.getElementById("editAvatar").files[0];

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    message.textContent = "User tidak ditemukan";
    return;
  }

  let avatarUrl = null;

  // upload avatar
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

  loadProfile();
};
