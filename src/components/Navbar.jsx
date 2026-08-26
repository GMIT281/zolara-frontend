import React, { useState, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  Menu,
  X,
  Globe
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import CodaMegaMenu from './coda/CodaMegaMenu'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimerRef = useRef(null)

  const handleMouseEnter = (menuKey) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setActiveMenu(menuKey)
  }

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 250)
  }

  const handleLogout = () => {
    signOut()
    navigate('/')
    setMobileOpen(false)
  }

  return (
    <header className="coda-header-wrapper">
      <div className="coda-nav-container" onMouseLeave={handleMouseLeave}>
        <nav className="coda-navbar" aria-label="Main Navigation">
          {/* ENRG Brand Logo */}
          <Link to="/" className="coda-brand" onClick={() => setActiveMenu(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src="/logo.png"
              alt="ENRG - Powering a Better Tomorrow"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <span style={{ fontWeight: 900, letterSpacing: '-0.03em', fontSize: '1.4rem', color: '#0f172a' }}>
              ENRG
            </span>
          </Link>

          {/* Desktop Mega-Menu Categories */}
          <ul className="coda-nav-menu">
            <li
              className={`coda-menu-item ${activeMenu === 'products' ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnter('products')}
            >
              <button
                type="button"
                className="coda-menu-trigger"
                onClick={() => setActiveMenu(activeMenu === 'products' ? null : 'products')}
              >
                Products
                <ChevronDown className="coda-trigger-icon" size={14} />
              </button>
            </li>

            <li
              className={`coda-menu-item ${activeMenu === 'solutions' ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnter('solutions')}
            >
              <button
                type="button"
                className="coda-menu-trigger"
                onClick={() => setActiveMenu(activeMenu === 'solutions' ? null : 'solutions')}
              >
                Solutions
                <ChevronDown className="coda-trigger-icon" size={14} />
              </button>
            </li>

            <li
              className={`coda-menu-item ${activeMenu === 'knowledge' ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnter('knowledge')}
            >
              <button
                type="button"
                className="coda-menu-trigger"
                onClick={() => setActiveMenu(activeMenu === 'knowledge' ? null : 'knowledge')}
              >
                Knowledge Center
                <ChevronDown className="coda-trigger-icon" size={14} />
              </button>
            </li>

            <li
              className={`coda-menu-item ${activeMenu === 'company' ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnter('company')}
            >
              <button
                type="button"
                className="coda-menu-trigger"
                onClick={() => setActiveMenu(activeMenu === 'company' ? null : 'company')}
              >
                Company
                <ChevronDown className="coda-trigger-icon" size={14} />
              </button>
            </li>

            <li className="coda-menu-item" onMouseEnter={() => setActiveMenu(null)}>
              <NavLink to="/marketplace" className="coda-menu-trigger">
                Marketplace
              </NavLink>
            </li>

            <li className="coda-menu-item" onMouseEnter={() => setActiveMenu(null)}>
              <NavLink to="/docs" className="coda-menu-trigger">
                API Docs
              </NavLink>
            </li>
          </ul>

          {/* Right Action Items */}
          <div className="coda-nav-actions">
            <div className="coda-pill-region" title="Region: India (₹ INR)">
              <Globe size={14} />
              <span>IN (₹)</span>
            </div>

            {user ? (
              <>
                <Link to="/dashboard" className="coda-user-chip" title={`Role: ${user.role || 'user'}`}>
                  <div className="coda-user-avatar">
                    {(user.name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                  </div>
                  <span className="coda-user-name">{user.name || user.email?.split('@')[0] || 'Dashboard'}</span>
                </Link>
                <button type="button" className="coda-btn coda-btn-ghost" onClick={handleLogout}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="coda-btn coda-btn-ghost">
                  Sign In
                </Link>
                <Link to="/signup" className="coda-btn coda-btn-primary">
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="coda-mobile-toggle"
              aria-label="Toggle navigation drawer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mega Menu Dropdown */}
        <CodaMegaMenu activeCategory={activeMenu} onClose={() => setActiveMenu(null)} />
      </div>

      {/* Mobile Slide-Out Drawer */}
      <div className={`coda-mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="coda-drawer-head">
          <Link to="/" className="coda-brand" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="ENRG" style={{ height: '32px', width: 'auto' }} />
            <span style={{ fontWeight: 900, color: '#0f172a' }}>ENRG</span>
          </Link>
          <button
            type="button"
            className="coda-btn coda-btn-ghost"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="coda-drawer-links">
          <Link to="/marketplace" className="coda-drawer-item" onClick={() => setMobileOpen(false)}>
            Marketplace Catalog
          </Link>
          <Link to="/docs" className="coda-drawer-item" onClick={() => setMobileOpen(false)}>
            API Documentation
          </Link>
          <Link to="/dashboard" className="coda-drawer-item" onClick={() => setMobileOpen(false)}>
            Dashboard & Portal
          </Link>
          
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {user ? (
              <button type="button" className="coda-btn coda-btn-outline" onClick={handleLogout}>
                Sign Out ({user.name || user.email})
              </button>
            ) : (
              <>
                <Link to="/signin" className="coda-btn coda-btn-outline" onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
                <Link to="/signup" className="coda-btn coda-btn-primary" onClick={() => setMobileOpen(false)}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
