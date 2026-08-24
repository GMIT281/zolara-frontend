import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, HardHat, SunMedium, UserRound } from 'lucide-react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import { Spinner } from '../components/Loader'

const ROLES = [
  { key: 'seller-co', label: 'Seller Co', icon: Building2, desc: 'Product & equipment sellers' },
  { key: 'install-co', label: 'Install Co', icon: HardHat, desc: 'Roofing / installation companies' },
  { key: 'user', label: 'User', icon: UserRound, desc: 'Residential or commercial buyer' }
]

export default function SignUp() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState('seller-co')
  const [form, setForm] = useState({
    name: '', email: '', password: '', companyName: '', phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const payload = { role, ...form }
      const res = await api.signup(payload)
      const user = res?.user || res?.data?.user
      const token = res?.token || res?.data?.token || ''
      if (!user) {
        throw new Error(res?.error || res?.message || 'Failed to create account')
      }
      signIn(user, token)
      const displayName = user.name || user.email || 'User'
      setMessage(`Account created — welcome, ${displayName}!`)
      setTimeout(() => navigate('/dashboard'), 700)
    } catch (err) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-head">
          <span className="auth-icon"><SunMedium aria-hidden="true" /></span>
          <h1>Create Your Solar Account</h1>
          <p>Register via <code>POST /api/signup</code> — choose your platform role.</p>
        </div>

        <div className="role-tabs">
          {ROLES.map((r) => (
            <button
              key={r.key}
              type="button"
              className={`role-tab ${role === r.key ? 'active' : ''}`}
              onClick={() => setRole(r.key)}
            >
              <span className="role-icon"><r.icon aria-hidden="true" /></span>
              <strong>{r.label}</strong>
              <small>{r.desc}</small>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">
            <span>Full Name</span>
            <input
              type="text"
              required
              value={form.name}
              placeholder="Raj Sharma"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          {(role === 'seller-co' || role === 'install-co') && (
            <label className="field">
              <span>Company Name</span>
              <input
                type="text"
                value={form.companyName}
                placeholder="ACME Solar Pvt. Ltd."
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              />
            </label>
          )}

          <label className="field">
            <span>{role === 'user' ? 'Email Address' : 'Business Email'}</span>
            <input
              type="email"
              required
              value={form.email}
              placeholder={role === 'user' ? 'you@example.com' : 'you@company.in'}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              required
              value={form.password}
              placeholder="Create a strong password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          <label className="field">
            <span>Phone Number</span>
            <input
              type="tel"
              required
              value={form.phone}
              placeholder="+91 98xxxxxx"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </label>

          {error && <div className="alert alert-error">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? <Spinner small /> : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
