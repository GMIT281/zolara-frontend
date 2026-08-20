import { Link, NavLink, useNavigate } from 'react-router-dom'
import { SunMedium } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut()
    navigate('/')
  }

  const navLinkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span className="brand-logo">
            <SunMedium aria-hidden="true" />
          </span>
          <span className="brand-text">
            Solar <span>E-Market</span>
          </span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/marketplace" className={navLinkClass}>Marketplace</NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
          <NavLink to="/docs" className={navLinkClass}>Docs</NavLink>
        </nav>

        <div className="nav-actions">
          {user ? (
            <>
              <span className="user-chip" title={user.role}>
                <span className="user-avatar">{user.name ? user.name[0].toUpperCase() : 'U'}</span>
                <span className="user-name">{user.name}</span>
              </span>
              <button className="btn btn-ghost" onClick={handleLogout}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-ghost">Sign In</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
