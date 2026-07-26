import { useState } from 'react'
import { validateLogin } from '../utils/validation.js'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('akash@campushub.edu')
  const [password, setPassword] = useState('student')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const validationError = validateLogin(email, password)

    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    onLogin({
      name: 'Akash',
      email: email.trim(),
    })
  }

  return (
    <main className="auth-shell">
      <section className="auth-card panel">
        <p className="eyebrow">Dummy Authentication</p>
        <h2>Login to CampusHub</h2>
        <p>Use any valid email and password to enter the student dashboard.</p>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error ? <p className="error-text">{error}</p> : null}
          <button type="submit" className="primary-button">
            Login
          </button>
        </form>
      </section>
    </main>
  )
}
