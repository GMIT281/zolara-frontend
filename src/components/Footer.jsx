import { Link } from 'react-router-dom'
import { SunMedium } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="brand brand-footer">
            <span className="brand-logo"><SunMedium aria-hidden="true" /></span>
            <span className="brand-text">Solar <span>E-Market</span></span>
          </div>
          <p className="footer-tagline">
            India&rsquo;s trusted marketplace connecting buyers, sellers and installers of
            solar energy systems — on-grid, off-grid and hybrid.
          </p>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <Link to="/">Home</Link>
          <Link to="/marketplace">Marketplace</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/docs">API Docs</Link>
        </div>
        <div className="footer-col">
          <h4>Marketplace</h4>
          <Link to="/marketplace?category=solar-module">Solar Modules</Link>
          <Link to="/marketplace?category=inverter">Inverters</Link>
          <Link to="/marketplace?category=cable">Cables</Link>
          <Link to="/marketplace?category=structure">Structures</Link>
          <Link to="/marketplace?category=BOS">BOS</Link>
        </div>
        <div className="footer-col">
          <h4>Account</h4>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Create Account</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          © {new Date().getFullYear()} Solar E-Market. Powering a cleaner tomorrow.
        </div>
      </div>
    </footer>
  )
}
