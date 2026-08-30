import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight, BadgeCheck, Eye, EyeOff, Link2, LockKeyhole,
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

const GoogleIcon = () => (
  <svg className="si-gg-icon" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
)

export default function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(() => ({
    email: sessionStorage.getItem('si-email') || '', password: ''
  }))
  const [magicEmail, setMagicEmail] = useState(() => sessionStorage.getItem('si-email') || '')
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [magicLoading, setMagicLoading] = useState(false)
  const [magicError, setMagicError] = useState(null)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [googleError, setGoogleError] = useState(null)
  const [message, setMessage] = useState(null)

  const finishSignIn = (text, delay = 550) => {
    setMessage(text)
    setTimeout(() => navigate('/dashboard'), delay)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setMagicError(null)
    setMessage(null)
    try {
      const res = await api.signin({ method: 'JWT-auth', ...form })
      const user = res?.user || res?.data?.user
      const token = res?.token || res?.data?.token || ''
      if (!user) {
        throw new Error(res?.error || res?.message || 'Failed to authenticate')
      }
      signIn(user, token)
      if (remember && form.email) sessionStorage.setItem('si-email', form.email)
      else sessionStorage.removeItem('si-email')
      const displayName = user.name || user.email || 'User'
      finishSignIn(`Signed in successfully. Welcome back, ${displayName}!`)
    } catch (err) {
      setError(err.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    if (googleLoading) return
    setGoogleLoading(true)
    setGoogleError(null)
    setError(null)
    setMagicError(null)
    setMessage(null)
    try {
      const res = await api.signin({
        method: 'O-auth',
        email: form.email || '',
        oauthProvider: 'Google',
        name: 'Google User'
      })
      const user = res?.user || res?.data?.user
      const token = res?.token || res?.data?.token || ''
      if (!user) {
        throw new Error(res?.error || res?.message || 'Google sign in failed')
      }
      signIn(user, token)
      const displayName = user.name || user.email || 'User'
      finishSignIn(`Signed in with Google. Welcome, ${displayName}!`, 450)
    } catch (err) {
      setGoogleError(err.message || 'Google sign in failed')
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleMagicLink = async (event) => {
    event.preventDefault()
    setMagicLoading(true)
    setMagicError(null)
    setError(null)
    setMessage(null)
    try {
      const res = await api.signin({ method: 'no-password', email: magicEmail })
      const user = res?.user || res?.data?.user
      const token = res?.token || res?.data?.token || ''
      if (!user) {
        throw new Error(res?.error || res?.message || 'Failed to send the secure link')
      }
      signIn(user, token)
      if (magicEmail) sessionStorage.setItem('si-email', magicEmail)
      const displayName = user.name || user.email || 'User'
      finishSignIn(`Secure link verified. Welcome, ${displayName}!`)
    } catch (err) {
      setMagicError(err.message || 'Could not send the secure link')
    } finally {
      setMagicLoading(false)
    }
  }

  return (
    <div className="si-page">
      <div className="si-shell">
        <aside className="si-brand" aria-label="ENRG account benefits">
          <Link to="/" className="si-logo">
            <span className="si-logo-mark"><SunMedium aria-hidden="true" /></span>
            <span className="si-logo-text">ENRG</span>
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
              <h2>Welcome back</h2>
              <p>Sign in to your ENRG account to continue.</p>
            </div>

            <div className="si-alerts" aria-live="polite">
              {error && <div className="alert alert-error" role="alert">{error}</div>}
              {message && <div className="alert alert-success" role="status">{message}</div>}
            </div>

            <form className="si-form" onSubmit={handleSubmit}>
              <label className="si-field">
                <span className="si-label">Work email</span>
                <div className="si-in">
                  <Mail aria-hidden="true" />
                  <input type="email" autoComplete="email" required placeholder="you@company.in" value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })} />
                </div>
              </label>

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

              <button className="si-submit" type="submit" disabled={loading}>
                {loading ? <Spinner small /> : <>Sign in<ArrowRight aria-hidden="true" /></>}
              </button>
            </form>

            <div className="si-divider"><span>or</span></div>

            {googleError && <div className="alert alert-error">{googleError}</div>}

            <button type="button" className="si-google" onClick={handleGoogle} disabled={googleLoading}>
              {googleLoading ? <Spinner small /> : <><GoogleIcon />Continue with Google</>}
            </button>

            <div className="si-divider"><span>or</span></div>

            <div className="si-magic">
              <div className="si-magic-head">
                <Link2 aria-hidden="true" />
                <strong>Continue with magic link</strong>
              </div>
              <p className="si-magic-desc">Enter your email and we&apos;ll send a secure sign-in link — no password needed.</p>

              {magicError && <div className="alert alert-error">{magicError}</div>}

              <form className="si-form" onSubmit={handleMagicLink}>
                <label className="si-field">
                  <span className="si-label">Email</span>
                  <div className="si-in">
                    <Mail aria-hidden="true" />
                    <input type="email" autoComplete="email" required placeholder="you@company.in" value={magicEmail}
                      onChange={(event) => setMagicEmail(event.target.value)} />
                  </div>
                </label>

                <button className="si-magic-submit" type="submit" disabled={magicLoading}>
                  {magicLoading ? <Spinner small /> : <>Continue<ArrowRight aria-hidden="true" /></>}
                </button>
              </form>

              <p className="si-magic-note"><ShieldCheck aria-hidden="true" /> We&apos;ll email a one-time secure link to this address.</p>
            </div>

            <p className="si-security"><ShieldCheck aria-hidden="true" /> Your sign-in is protected with SSL encryption.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
