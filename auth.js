import { supabase } from "./supabase.js";

document.getElementById("registerBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) alert(error.message);
  else window.location.href = "home.html";
});

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) alert(error.message);
  else window.location.href = "home.html";
});

async function resetPassword() {
  const email = document.getElementById('email').value

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5500/reset-password.html'
  })

  if (error) {
    alert(error.message)
  } else {
    alert('Cek email kamu untuk reset password 💌')
  }
}

window.resetPassword = resetPassword
