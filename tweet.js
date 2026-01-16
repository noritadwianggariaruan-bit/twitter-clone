import { supabase } from "./supabase.js";

const tweetsDiv = document.getElementById("tweets");

window.postTweet = async function () {
  const content = document.getElementById("tweet").value;

  if (!content) return;

  await supabase.from("tweets").insert([{ content }]);
  document.getElementById("tweet").value = "";
  loadTweets();
};

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

loadTweets();

const { data: { session } } = await client.auth.getSession();

if (!session) {
  window.location.href = "index.html";
}
