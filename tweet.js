const supabase = window.supabaseClient;
const tweetsDiv = document.getElementById("tweets");

// ===== POST TWEET =====
window.postTweet = async function () {
  const content = document.getElementById("tweet").value.trim();
  if (!content) return;

  await supabase.from("tweets").insert([{ content }]);
  document.getElementById("tweet").value = "";
  loadTweets();
};

// ===== LOAD TWEETS =====
async function loadTweets() {
  const { data } = await supabase
    .from("tweets")
    .select("*")
    .order("created_at", { ascending: false });

  tweetsDiv.innerHTML = "";
  data.forEach(tweet => {
    const p = document.createElement("p");
    p.textContent = tweet.content;
    tweetsDiv.appendChild(p);
  });
}

// ===== AUTH GUARD =====
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = "index.html";
  }
}

checkAuth();
loadTweets();
