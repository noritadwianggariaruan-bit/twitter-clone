// ===============================
// CEK SESSION
// ===============================
(async () => {
  const { data } = await supabaseClient.auth.getSession();
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
  } = await supabaseClient.auth.getUser();

  if (!user) return;

  const { data, error } = await supabaseClient
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
window.updateProfile = async () => {
  const { data: { user }, error } = await supabaseClient.auth.getUser()

  if (error || !user) {
    alert("User belum login")
    return
  }

  const username = document.getElementById("username").value

  const { error: updateError } = await supabaseClient
    .from("profiles")
    .update({ username })
    .eq("id", user.id)

  if (updateError) {
    alert("Gagal update profil")
  } else {
    alert("Profil berhasil diupdate")
  }
}

