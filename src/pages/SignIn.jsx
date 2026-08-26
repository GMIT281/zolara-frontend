import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight, BadgeCheck, Eye, EyeOff, LockKeyhole,
  Mail, ShieldCheck, SunMedium, Zap
} from 'lucide-react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import { Spinner } from '../components/Loader'

const BENEFITS = [
  'Manage products, enquiries and installations in one place.',
  'Work with verified sellers and installation partners.',
  'Keep every support request and update in your account.'
]

export default function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('password')
  const [form, setForm] = useState(() => ({
    email: sessionStorage.getItem('si-email') || '', password: '', token: ''
  }))
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const finishSignIn = (text, delay = 550) => {
    setMessage(text)
    setTimeout(() => navigate('/dashboard'), delay)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    const method = mode === 'magic' ? 'no-password' : 'JWT-auth'
    const payload = method === 'no-password' ? { method, email: form.email } : { method, ...form }

    try {
      const res = await api.signin(payload)
      const user = res?.user || res?.data?.user
      const token = res?.token || res?.data?.token || ''
      if (!user) {
        throw new Error(res?.error || res?.message || 'Failed to authenticate')
      }
      signIn(user, token)
      if (remember && form.email) sessionStorage.setItem('si-email', form.email)
      else sessionStorage.removeItem('si-email')
      const displayName = user.name || user.email || 'User'
      finishSignIn(method === 'no-password'
        ? `Secure link verified. Welcome, ${displayName}!`
        : `Signed in successfully. Welcome back, ${displayName}!`)
    } catch (err) {
      setError(err.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  const handleOauth = async (provider) => {
    if (loading) return
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const res = await api.signin({
        method: 'O-auth',
        email: form.email,
        token: form.token
      })
      const user = res?.user || res?.data?.user
      const token = res?.token || res?.data?.token || ''
      if (!user) {
        throw new Error(res?.error || res?.message || 'OAuth authentication failed')
      }
      signIn(user, token)
      const displayName = user.name || user.email || 'User'
      finishSignIn(`Signed in with ${provider}. Welcome, ${displayName}!`, 450)
    } catch (err) {
      setError(err.message || 'OAuth sign in failed')
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setError(null)
    setMessage(null)
  }

  return (
    <div className="si-page">
      <div className="si-shell">
        <aside className="si-brand" aria-label="Solar E-Market account benefits">
          <Link to="/" className="si-logo">
            <span className="si-logo-mark"><SunMedium aria-hidden="true" /></span>
            <span>Solar <b>E-Market</b></span>
          </Link>

          <div className="si-brand-copy">
            <span className="si-brand-kicker"><BadgeCheck aria-hidden="true" /> Secure business portal</span>
            <h1>Everything solar, connected.</h1>
            <p>Access the tools and trusted partners that keep your solar business moving.</p>
          </div>

          <ul className="si-benefits">
            {BENEFITS.map((benefit) => (
              <li key={benefit}><span><Zap aria-hidden="true" /></span>{benefit}</li>
            ))}
          </ul>

          <div className="si-brand-footer">
            <div className="si-partners"><strong>350+</strong><span>verified partners<br />across India</span></div>
            <span className="si-footer-note"><ShieldCheck aria-hidden="true" /> Trusted platform access</span>
          </div>
        </aside>

        <section className="si-form-wrap">
          <div className="si-card">
            <div className="si-topline">
              <span>Account access</span>
              <Link to="/signup">Create account <ArrowRight aria-hidden="true" /></Link>
            </div>

            <div className="si-head">
              <h2>{mode === 'magic' ? 'Sign in with a secure link' : 'Welcome back'}</h2>
              <p>{mode === 'magic'
                ? 'Enter your email and we’ll send a secure, password-free sign-in link.'
                : 'Sign in to your Solar E-Market account to continue.'}
              </p>
            </div>

            {mode === 'password' && <>
              <div className="si-divider"><span>use your email</span></div>
            </>}

            {error && <div className="alert alert-error">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <form className="si-form" onSubmit={handleSubmit}>
              <label className="si-field">
                <span className="si-label">Work email</span>
                <div className="si-in">
                  <Mail aria-hidden="true" />
                  <input type="email" autoComplete="email" required placeholder="you@company.in" value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })} />
                </div>
              </label>

              {mode === 'password' && <>
                <label className="si-field">
                  <span className="si-label"><span>Password</span><button type="button" className="si-forgot" onClick={() => setMessage('Password recovery is available through support@solarmarket.in.')}>Forgot password?</button></span>
                  <div className="si-in si-password">
                    <LockKeyhole aria-hidden="true" />
                    <input type={showPw ? 'text' : 'password'} autoComplete="current-password" required placeholder="Enter your password" value={form.password}
                      onChange={(event) => setForm({ ...form, password: event.target.value })} />
                    <button type="button" className="si-eye" aria-label={showPw ? 'Hide password' : 'Show password'} onClick={() => setShowPw(!showPw)}>
                      {showPw ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                    </button>
                  </div>
                </label>
                <label className="si-check"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span>Keep me signed in for 30 days</span></label>
              </>}

              <button className="si-submit" type="submit" disabled={loading}>
                {loading ? <Spinner small /> : <>{mode === 'magic' ? 'Email secure link' : 'Sign in'}<ArrowRight aria-hidden="true" /></>}
              </button>
            </form>

            <button type="button" className="si-switch-btn" onClick={() => switchMode(mode === 'password' ? 'magic' : 'password')}>
              {mode === 'password' ? 'Prefer password-free access? ' : 'Want to use a password instead? '}<u>{mode === 'password' ? 'Email me a secure link' : 'Sign in with password'}</u>
            </button>

            <p className="si-security"><ShieldCheck aria-hidden="true" /> Your sign-in is protected with SSL encryption.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
