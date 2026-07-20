document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const errorBox = document.getElementById('loginError');
  const userIdInput = form.querySelector('input[name="userId"]') || form.querySelector('input[name="username"]');
  const passwordInput = form.querySelector('input[name="password"]');
  const submitButton = form.querySelector('button[type="submit"]');

  const setError = (message) => {
    if (errorBox) {
      errorBox.textContent = message;
    }
  };

  const setLoading = (isLoading) => {
    if (!submitButton) return;
    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading ? 'Signing in...' : 'Login';
  };

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
