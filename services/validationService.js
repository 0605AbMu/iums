function validateRegister({ email, password }) {
  if (!email || !password) {
    return 'Email and password required';
  }
  // Email format check (simple regex)
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return null;
}

function validateLogin({ email, password }) {
  if (!email || !password) {
    return 'Email and password required';
  }
  return null;
}

module.exports = {
  validateRegister,
  validateLogin
};
