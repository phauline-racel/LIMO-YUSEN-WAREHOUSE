// UI-only login handler — validates fields and redirects to dashboard (no backend)
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('loginForm')
  if(!form) return

  form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const username = form.querySelector('input[name="username"]').value.trim()
    const password = form.querySelector('input[name="password"]').value.trim()

    if(!username || !password){
      alert('Please enter username and password')
      return
    }

    // show a quick fake-auth loading state
    const btn = form.querySelector('button[type="submit"]')
    const previous = btn.textContent
    btn.textContent = 'Signing in...'
    btn.disabled = true

    setTimeout(()=>{
      // redirect to the dashboard page (static UI)
      window.location.href = '/dashboard.html'
    }, 700)
  })
})
