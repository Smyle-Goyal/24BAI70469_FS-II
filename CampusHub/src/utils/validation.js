export function validateLogin(email, password) {
  const trimmedEmail = email.trim()
  const trimmedPassword = password.trim()

  if (!trimmedEmail || !trimmedPassword) {
    return 'Enter both email and password.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return 'Enter a valid email address.'
  }

  if (trimmedPassword.length < 4) {
    return 'Password must be at least 4 characters.'
  }

  return ''
}
