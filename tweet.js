const tweetsDiv = document.getElementById("tweets");

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
   POST TWEET
========================= */
window.postTweet = async function () {
  const content = document.getElementById("tweet").value.trim();
  if (!content) return;

  // ambil user login
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    alert("Session habis, silakan login ulang");
    window.location.href = "index.html";
    return;
  }

  const username = user.email.split("@")[0];

  const { error } = await supabase.from("tweets").insert([
    {
      content,
      user_id: user.id,
      username: username
    }
  ]);

  if (error) {
    console.error(error);
    return;
  }

  document.getElementById("tweet").value = "";
  loadTweets();
};

/* =========================
   LOAD TWEETS
========================= */
async function loadTweets() {
  const { data, error } = await supabase
    .from("tweets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  tweetsDiv.innerHTML = "";

  data.forEach(tweet => {
    const avatarLetter = tweet.username
      ? tweet.username.charAt(0).toUpperCase()
      : "?";

    const div = document.createElement("div");
    div.className = "tweet-card";

    div.innerHTML = `
      <div class="avatar">${avatarLetter}</div>
      <div class="tweet-content">
        <div class="tweet-header">
          <span class="username">@${tweet.username}</span>
          <span class="time">
            ${new Date(tweet.created_at).toLocaleString()}
          </span>
        </div>
        <div class="tweet-text">${tweet.content}</div>
        <div class="tweet-actions">
          <span>💬</span>
          <span>❤️</span>
          <span>🗑️</span>
        </div>
      </div>
    `;

    tweetsDiv.appendChild(div);
  });
}

// pertama kali load
loadTweets();
