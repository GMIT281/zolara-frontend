import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, SunMedium, Zap, Sparkles, TrendingUp } from 'lucide-react'

export default function CodaHero({ subheadline, loading }) {
  return (
    <section className="coda-hero-section">
      {/* Background Organic Curved SVG */}
      <div className="coda-hero-backdrop" aria-hidden="true">
        <svg
          viewBox="0 0 1400 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          <path
            d="M700 0C1250 10 1420 300 1400 800C1380 1300 1200 1550 700 1550C200 1550 20 1300 0 850L0 750C0 250 180 0 700 0Z"
            fill="url(#codaHeroGradient)"
          />
          <defs>
            <linearGradient id="codaHeroGradient" x1="700" y1="0" x2="700" y2="1550" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#dbeafe" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="coda-hero-container">
        {/* Top Announcement Pill */}
        <Link to="/marketplace" className="coda-announcement-pill">
          <span>Ready to switch to solar? We're ready to go</span>
          <ArrowRight size={15} />
        </Link>

        {/* Eyebrow with Dashed Indicator Line */}
        <div className="coda-eyebrow-wrap">
          <div className="coda-eyebrow-chip">
            <Sparkles size={13} />
            <span>ENRG • POWERING A BETTER TOMORROW</span>
          </div>
          <div className="coda-eyebrow-line"></div>
        </div>

        {/* Split Animated Headline with Inline Badges */}
        <h1 className="coda-hero-headline">
          <span>DISCOVER</span>
          <span className="coda-inline-badge-icon amber">
            <SunMedium size={28} />
          </span>
          <span>CALCULATE</span>
          <span className="coda-inline-badge-icon green">
            <TrendingUp size={28} />
          </span>
          <br />
          <span className="coda-inline-badge-icon blue">
            <Zap size={28} />
          </span>
          <span>POWER UP</span>
        </h1>

        {/* Subhead */}
        <p className="coda-hero-subhead">
          {loading
            ? 'Fetching live solar marketplace configurations…'
            : subheadline ||
              'Accelerate your rooftop solar transition with verified Tier-1 equipment, instant discom net-metering estimates, and certified local EPC installers.'}
        </p>

        {/* Hero Actions */}
        <div className="coda-hero-ctas">
          <Link to="/marketplace" className="coda-btn coda-btn-primary">
            Explore Marketplace <ArrowRight size={16} />
          </Link>
          <Link to="/signup" className="coda-btn coda-btn-outline">
            Join as Seller / Installer
          </Link>
        </div>
      </div>
    </section>
  )
}
