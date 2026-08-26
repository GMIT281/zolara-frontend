import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react'

export default function CodaCTACard() {
  const navigate = useNavigate()
  const [bill, setBill] = useState('3500')
  const [pincode, setPincode] = useState('')

  const handleEstimate = (e) => {
    e.preventDefault()
    navigate(`/marketplace?bill=${bill}&pincode=${pincode}`)
  }

  return (
    <section className="container coda-cta-card-wrap">
      <div className="coda-cta-card">
        {/* Left Column */}
        <div className="coda-cta-left">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f59e0b', marginBottom: '12px' }}>
            <Sparkles size={14} /> ZERO UPFRONT CAPITAL AVAILABLE
          </span>
          <h2>Ready to Power Your Rooftop & Cut Electricity Bills to ₹0?</h2>
          <p>
            Get custom solar equipment sizing, claim up to ₹78,000 in PM Surya Ghar subsidies, and connect with top-rated local EPC installers.
          </p>

          <div className="coda-cta-badges">
            <div className="coda-trust-badge">
              <ShieldCheck size={16} color="#10b981" />
              <span>MNRE & ALMM Approved</span>
            </div>
            <div className="coda-trust-badge">
              <Zap size={16} color="#f59e0b" />
              <span>25-Year Performance Warranty</span>
            </div>
            <div className="coda-trust-badge">
              <CheckCircle2 size={16} color="#3b82f6" />
              <span>Milestone Escrow Protection</span>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Estimate Card */}
        <div className="coda-cta-calculator">
          <h3 className="coda-calc-title">Instant Solar ROI Sizer</h3>
          <p className="coda-calc-desc">Calculate your recommended system capacity and monthly savings.</p>

          <form onSubmit={handleEstimate}>
            <div className="coda-calc-field">
              <label className="coda-calc-label">Monthly Electricity Bill (₹)</label>
              <input
                type="number"
                className="coda-calc-input"
                placeholder="e.g. 4000"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                required
              />
            </div>

            <div className="coda-calc-field">
              <label className="coda-calc-label">Pincode / City</label>
              <input
                type="text"
                className="coda-calc-input"
                placeholder="e.g. 302001 (Jaipur)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            <button type="submit" className="coda-btn coda-btn-accent" style={{ width: '100%', marginTop: '8px' }}>
              Calculate Solar Savings <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
