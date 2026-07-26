document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const errorBox = document.getElementById('loginError');
  const userIdInput = form.querySelector('input[name="userId"]') || form.querySelector('input[name="username"]');
  const passwordInput = form.querySelector('input[name="password"]');
  const submitButton = form.querySelector('button[type="submit"]');
  const passwordToggle = form.querySelector('.password-toggle');

  const setError = (message) => {
    if (errorBox) {
      errorBox.textContent = message;
    }
  };

  const setLoading = (isLoading) => {
    if (!submitButton) return;
    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading ? 'Signing in...' : 'Sign In';
  };

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
      const isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';
      const icon = passwordToggle.querySelector('i');
      if (icon) {
        icon.className = isHidden ? 'bi bi-eye' : 'bi bi-eye-slash';
      }
      passwordToggle.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
      passwordToggle.title = isHidden ? 'Hide password' : 'Show password';
      passwordInput.focus();
    });
  }

  if (window.AuthService?.isAuthenticated?.()) {
    window.location.href = 'pages/dashboard.html';
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    setError('');

    const userId = userIdInput?.value.trim() || '';
    const password = passwordInput?.value.trim() || '';

    if (!userId || !password) {
      setError('Please enter your User ID and Password.');
      return;
    }

    setLoading(true);
    const result = window.AuthService?.authenticateUser?.(userId, password);

    if (result?.success) {
      window.location.href = 'pages/dashboard.html';
      return;
    }

    setLoading(false);
    setError(result?.message || 'Invalid credentials.');
  });
});
