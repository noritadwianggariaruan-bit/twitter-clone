async function updatePassword() {
  const newPassword = document.getElementById('newPassword').value

  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) {
    alert(error.message)
  } else {
    alert('Password berhasil diganti 🎉')
    window.location.href = 'login.html'
  }
}

window.updatePassword = updatePassword
