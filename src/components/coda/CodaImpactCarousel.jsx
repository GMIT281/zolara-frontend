import React from 'react'
import { Star, ShieldCheck, Quote } from 'lucide-react'

export const IMPACT_STORIES = [
  {
    quote:
      'Our monthly electricity bill went from ₹6,400 to almost zero within the first billing cycle after net-metering was sanctioned. The subsidy of ₹78,000 was credited directly to our account.',
    author: 'Rajesh Sharma',
    location: 'Jaipur, Rajasthan',
    system: '3.3 kW On-Grid Mono-PERC',
    avatar: 'RS'
  },
  {
    quote:
      'As a manufacturing unit, uninterrupted power and lower operating costs were crucial. ENRG connected us with a certified Tier-1 EPC who finished the 45kW installation in under 10 days.',
    author: 'Sunil Mehta',
    location: 'Ahmedabad, Gujarat',
    system: '45 kW Commercial Array',
    avatar: 'SM'
  },
  {
    quote:
      'The milestone-based escrow payment gave us complete peace of mind. We only released the final payment after the discom bi-directional meter was commissioned and active.',
    author: 'Priya Nambiar',
    location: 'Bengaluru, Karnataka',
    system: '5 kW Hybrid Storage',
    avatar: 'PN'
  }
]

export default function CodaImpactCarousel() {
  return (
    <section className="coda-section" style={{ background: '#f8f9fa' }}>
      <div className="container">
        <div className="coda-section-head">
          <span className="coda-section-tag">CUSTOMER SUCCESS</span>
          <h2 className="coda-section-title">Loved by Homeowners & Commercial Enterprises</h2>
          <p className="coda-section-sub">
            See how real rooftop owners across India transformed their energy bills into lasting wealth.
          </p>
        </div>

        <div className="coda-impact-grid">
          {IMPACT_STORIES.map((item, idx) => (
            <div key={idx} className="coda-impact-card">
              <div>
                <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" />
                  ))}
                </div>
                <p className="coda-impact-quote">“{item.quote}”</p>
              </div>

              <div className="coda-impact-author">
                <div className="coda-impact-avatar">{item.avatar}</div>
                <div className="coda-impact-info">
                  <strong>{item.author}</strong>
                  <span>{item.location} • <b style={{ color: '#059669' }}>{item.system}</b></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
