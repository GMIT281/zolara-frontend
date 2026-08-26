import React from 'react'
import { Link } from 'react-router-dom'
import { Globe, ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="coda-footer">
      <div className="container">
        <div className="coda-footer-grid">
          {/* Brand Column */}
          <div className="coda-footer-brand-col">
            <Link to="/" className="coda-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <img src="/logo.png" alt="ENRG Logo" style={{ height: '34px', width: 'auto' }} />
              <span style={{ fontWeight: 900, fontSize: '1.35rem', color: '#0f172a' }}>ENRG</span>
            </Link>
            <p style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 700, letterSpacing: '0.04em', margin: '4px 0 12px' }}>
              POWERING A BETTER TOMORROW
            </p>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 16px', lineHeight: 1.5 }}>
              India’s premier digital solar marketplace connecting rooftop owners with verified equipment, certified EPC installers, and direct discom subsidies.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#059669' }}>
              <ShieldCheck size={16} /> MNRE & PM Surya Ghar Compliant
            </div>
          </div>

          {/* Column 1: Marketplace Products */}
          <div className="coda-footer-col">
            <h4>Marketplace</h4>
            <ul className="coda-footer-links">
              <li><Link to="/marketplace?category=solar-module">Solar Modules</Link></li>
              <li><Link to="/marketplace?category=inverter">Solar Inverters</Link></li>
              <li><Link to="/marketplace?category=cable">Solar DC Cables</Link></li>
              <li><Link to="/marketplace?category=structure">Mounting Structures</Link></li>
              <li><Link to="/marketplace?category=BOS">BOS Electricals</Link></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="coda-footer-col">
            <h4>Solutions</h4>
            <ul className="coda-footer-links">
              <li><Link to="/?type=on-grid">On-Grid Net Metering</Link></li>
              <li><Link to="/?type=off-grid">Off-Grid Standalone</Link></li>
              <li><Link to="/?type=hybrid-grid">Hybrid Energy Systems</Link></li>
              <li><Link to="/dashboard">Commercial EPC</Link></li>
              <li><Link to="/marketplace">PM Surya Ghar Subsidy</Link></li>
            </ul>
          </div>

          {/* Column 3: Documentation */}
          <div className="coda-footer-col">
            <h4>Knowledge & API</h4>
            <ul className="coda-footer-links">
              <li><Link to="/docs">API Documentation</Link></li>
              <li><Link to="/docs">Rooftop Installation Guide</Link></li>
              <li><Link to="/docs">Discom Net-Metering Policy</Link></li>
              <li><Link to="/docs">ENRG Solar Capsule</Link></li>
              <li><Link to="/docs">Support Desk</Link></li>
            </ul>
          </div>

          {/* Column 4: Platform */}
          <div className="coda-footer-col">
            <h4>Platform</h4>
            <ul className="coda-footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/marketplace">Marketplace</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/signup">Join as Installer</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="coda-footer-bottom">
          <div>
            © {new Date().getFullYear()} ENRG Solar Marketplace. Powering a better tomorrow.
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Globe size={14} /> India (₹ INR)
            </span>
            <Link to="/docs" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/docs" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
