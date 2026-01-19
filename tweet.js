const tweetsDiv = document.getElementById("tweets");

/* =========================
   PROTEKSI HALAMAN
========================= */
(async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    window.location.href = "index.html";
  }
})();

/* =========================
   POST TWEET
========================= */
window.postTweet = async function () {
  const content = document.getElementById("tweet").value.trim();
  if (!content) return;

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  const { error } = await supabase.from("tweets").insert({
    content,
    user_id: user.id,
    username: profile.username
  });

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
    const avatar = tweet.username
      ? tweet.username[0].toUpperCase()
      : "?";

    const div = document.createElement("div");
    div.className = "tweet-card";

    div.innerHTML = `
      <div class="avatar">${avatar}</div>
      <div class="tweet-content">
        <div class="tweet-header">
          <span class="username">@${tweet.username}</span>
          <span class="time">${new Date(tweet.created_at).toLocaleString()}</span>
        </div>
        <div class="tweet-text">${tweet.content}</div>
      </div>
    `;

    tweetsDiv.appendChild(div);
  });
}

loadTweets();
