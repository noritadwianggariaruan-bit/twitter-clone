const tweetsDiv = document.getElementById("tweets");

window.postTweet = async function () {
  const content = document.getElementById("tweet").value.trim();
  if (!content) return;

  await supabase.from("tweets").insert([
    { content }
  ]);

  document.getElementById("tweet").value = "";
  loadTweets();
};

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
    const div = document.createElement("div");
    div.className = "tweet-card";

    div.innerHTML = `
      <div class="avatar">👤</div>
      <div class="tweet-content">
        <div class="tweet-header">
          <span class="username">@anonymous</span>
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

loadTweets();
