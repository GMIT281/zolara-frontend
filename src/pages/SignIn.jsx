import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globe2, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import { Spinner } from '../components/Loader'

const METHODS = [
  { key: 'JWT-auth', label: 'JWT Auth', icon: LockKeyhole, desc: 'Email + password' },
  { key: 'O-auth', label: 'OAuth', icon: Globe2, desc: 'Google / Apple login' },
  { key: 'no-password', label: 'No Password', icon: Mail, desc: 'Magic link / OTP' }
]

export default function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [method, setMethod] = useState('JWT-auth')
  const [form, setForm] = useState({ email: '', password: '', token: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const res = await api.signin({ method, ...form })
      const { user, token } = res
      signIn(user, token)
      setMessage(`Signed in via ${method} as ${user.name || user.email}`)
      setTimeout(() => navigate('/dashboard'), 600)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const quickFill = () => {
    setForm({ email: 'demo@solarmarket.in', password: 'demo123', token: '' })
    setMethod('JWT-auth')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-head">
          <span className="auth-icon"><ShieldCheck aria-hidden="true" /></span>
          <h1>Welcome Back</h1>
          <p>
            Sign in to Solar E-Market via{' '}
            <code>POST /api/signin</code>
          </p>
        </div>

        <div className="method-tabs">
          {METHODS.map((m) => (
            <button
              key={m.key}
              type="button"
              className={`method-tab ${method === m.key ? 'active' : ''}`}
              onClick={() => setMethod(m.key)}
            >
              <span className="method-icon"><m.icon aria-hidden="true" /></span>
              <strong>{m.label}</strong>
              <small>{m.desc}</small>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {method === 'O-auth' && (
            <div className="oauth-buttons">
              <button type="button" className="btn oauth-btn" onClick={() => { setForm((f) => ({ ...f, email: 'google.user@example.com' })); setMessage('OAuth provider selected — use any email to continue (simulated).') }}>
                <span className="g-logo">G</span> Continue with Google
              </button>
              <button type="button" className="btn oauth-btn" onClick={() => { setForm((f) => ({ ...f, email: 'apple.user@example.com' })); setMessage('OAuth provider selected — use any email to continue (simulated).') }}>
                Continue with Apple
              </button>
            </div>
          )}

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              required
              value={form.email}
              placeholder="you@example.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          {method === 'JWT-auth' && (
            <label className="field">
              <span>Password</span>
              <input
                type="password"
                required
                value={form.password}
                placeholder="••••••••"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </label>
          )}

          {method === 'O-auth' && (
            <label className="field">
              <span>OAuth Token (simulated)</span>
              <input
                type="text"
                value={form.token}
                placeholder="paste-oauth-token (optional)"
                onChange={(e) => setForm({ ...form, token: e.target.value })}
              />
            </label>
          )}

          {error && <div className="alert alert-error">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? <Spinner small /> : `Sign In with ${method}`}
          </button>
        </form>

        <div className="auth-alt">
          <button className="link-btn" onClick={quickFill}>Fill demo credentials (demo@solarmarket.in / demo123)</button>
        </div>

        <p className="auth-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
