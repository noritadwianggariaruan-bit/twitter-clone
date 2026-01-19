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
