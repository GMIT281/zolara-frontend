import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Zap, TrendingUp, Users, Award } from 'lucide-react'

export const STATS_ITEMS = [
  {
    number: '50 MW+',
    label: 'Clean Solar Capacity',
    detail: 'Over 50 megawatts of rooftop and commercial solar capacity deployed across 40+ Indian cities.'
  },
  {
    number: '12,000+',
    label: 'Rooftops Energized',
    detail: 'Homes and businesses enjoying reliable, independent green electricity with zero outage risk.'
  },
  {
    number: '₹4.2 Cr+',
    label: 'Monthly Bill Savings',
    detail: 'Aggregate monthly customer savings delivered through net-metering and PM Surya Ghar subsidies.'
  },
  {
    number: '350+',
    label: 'Certified EPC Partners',
    detail: 'Vetted solar engineers and installation companies guaranteeing 25-year system performance.'
  }
]

export default function CodaStatsCarousel() {
  const [startIndex, setStartIndex] = useState(0)

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? STATS_ITEMS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev === STATS_ITEMS.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="coda-stats-section">
      <div className="coda-stats-container">
        <div className="coda-stats-header">
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f59e0b' }}>
              PROVEN MARKET IMPACT
            </span>
            <h2 style={{ marginTop: '8px' }}>Empowering India’s Clean Energy Revolution</h2>
          </div>

          <div className="coda-carousel-controls">
            <button
              type="button"
              className="coda-carousel-arrow"
              onClick={handlePrev}
              aria-label="Previous statistics"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="coda-carousel-arrow"
              onClick={handleNext}
              aria-label="Next statistics"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="coda-stats-grid">
          {STATS_ITEMS.map((stat, idx) => (
            <div key={idx} className="coda-stat-box">
              <span className="coda-stat-number">{stat.number}</span>
              <span className="coda-stat-label">{stat.label}</span>
              <p className="coda-stat-detail">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
