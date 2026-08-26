import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sun, ShieldCheck, Sparkles, Building, Users, Battery, Zap } from 'lucide-react'

export default function CodaCardCluster() {
  return (
    <section className="coda-section">
      <div className="container">
        <div className="coda-section-head">
          <span className="coda-section-tag">COMPLETE SOLAR SUITE</span>
          <h2 className="coda-section-title">Engineered for Maximum Savings & Long-Term Reliability</h2>
          <p className="coda-section-sub">
            From residential rooftops to MW-scale commercial arrays, access verified hardware, direct subsidies, and certified engineers.
          </p>
        </div>

        <div className="coda-card-cluster">
          {/* Spotlight Card */}
          <div className="coda-card spotlight">
            <div className="coda-card-top">
              <div className="coda-card-badge amber" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fcd34d' }}>
                <Sparkles size={14} />
                <span>PM Surya Ghar Muft Bijli</span>
              </div>
              <h3 className="coda-card-title">Residential Solar Subsidy up to ₹78,000</h3>
              <p className="coda-card-desc">
                Avail direct government subsidies credited straight into your bank account. Zero-cost net metering sanctioning handled by our certified EPC partners.
              </p>
            </div>
            <div className="coda-card-bottom">
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Payback Period: 3.2 Years</span>
              <Link to="/marketplace" className="coda-card-link" style={{ color: '#f59e0b' }}>
                Claim Subsidy <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Card 2: Commercial Solutions */}
          <div className="coda-card">
            <div className="coda-card-top">
              <div className="coda-card-badge green">
                <Building size={14} />
                <span>Commercial & Industrial</span>
              </div>
              <h3 className="coda-card-title">Zero-Capex Solar PPAs</h3>
              <p className="coda-card-desc">
                Reduce factory and enterprise power bills by up to 50% without any upfront capital. Fixed tariff protection for 25 years with guaranteed generation.
              </p>
            </div>
            <div className="coda-card-bottom">
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Accelerated Depreciation 40%</span>
              <Link to="/dashboard" className="coda-card-link" style={{ color: '#0f172a' }}>
                Explore EPC <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Card 3: Installer & Verified Network */}
          <div className="coda-card">
            <div className="coda-card-top">
              <div className="coda-card-badge blue">
                <ShieldCheck size={14} />
                <span>Escrow Trust Protection</span>
              </div>
              <h3 className="coda-card-title">350+ Certified Solar EPCs</h3>
              <p className="coda-card-desc">
                Every installer is background-verified with ALMM compliance checks. Customer payments are held in escrow and released only upon discom commissioning.
              </p>
            </div>
            <div className="coda-card-bottom">
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>100% Secure Milestone Pay</span>
              <Link to="/marketplace" className="coda-card-link" style={{ color: '#0f172a' }}>
                Find Installer <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
