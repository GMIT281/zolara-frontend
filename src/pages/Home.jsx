import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BatteryCharging, PlugZap, SunMedium, Zap } from 'lucide-react'
import { api } from '../api/client'
import Loader from '../components/Loader'

const GRID_TYPES = [
  { key: 'on-grid', label: 'On-Grid', icon: PlugZap, desc: 'Grid-connected systems with net metering' },
  { key: 'off-grid', label: 'Off-Grid', icon: BatteryCharging, desc: 'Battery-backed standalone systems' },
  { key: 'hybrid-grid', label: 'Hybrid-Grid', icon: Zap, desc: 'Grid + battery flexibility combined' }
]

export default function Home() {
  const [type, setType] = useState('on-grid')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    api
      .getHome(type)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [type])

  const active = GRID_TYPES.find((g) => g.key === type)

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-eyebrow"><SunMedium aria-hidden="true" /> India&rsquo;s Solar E-Marketplace</span>
            <h1 className="hero-title">{loading ? 'Loading…' : data?.headline || 'Solar made simple'}</h1>
            <p className="hero-sub">
              {loading ? 'Fetching live data…' : data?.subheadline || 'Explore verified solar products and installation partners.'}
            </p>
            <div className="hero-cta">
              <Link to="/marketplace" className="btn btn-primary btn-lg">Browse Marketplace</Link>
              <Link to="/signup" className="btn btn-outline btn-lg">Join as Seller / Installer</Link>
            </div>
          </div>

          <div className="hero-visual">
            {data?.heroImage && (
              <div className="hero-img-wrap">
                <img src={data.heroImage} alt={active?.label} />
                <div className="hero-stats">
                  {data.stats?.map((s, i) => (
                    <div className="stat-chip" key={i}>
                      <strong>{s.value}</strong>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Grid type selector */}
      <section className="container section">
        <div className="section-head">
          <h2>Choose Your System Type</h2>
          <p>Pick a configuration — content updates live from <code>GET /api/home?type=…</code></p>
        </div>
        <div className="grid-selector">
          {GRID_TYPES.map((g) => (
            <button
              key={g.key}
              className={`grid-option ${type === g.key ? 'active' : ''}`}
              onClick={() => setType(g.key)}
            >
              <span className="grid-icon"><g.icon aria-hidden="true" /></span>
              <strong>{g.label}</strong>
              <small>{g.desc}</small>
            </button>
          ))}
        </div>
      </section>

      {/* Content area */}
      <section className="container section">
        {loading && <Loader text={`Loading ${active?.label} content…`} />}
        {error && <div className="alert alert-error">Failed to load: {error}</div>}

        {!loading && !error && data && (
          <>
            {/* Stats */}
            <div className="stats-row">
              {data.stats?.map((s, i) => (
                <div className="stat-card" key={i}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="features-grid">
              {data.features?.map((f, i) => (
                <div className="feature-card" key={i}>
                  <span className="feature-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Featured products */}
            <div className="section-inner">
              <div className="section-head">
                <h2>Popular {active?.label} Packages</h2>
              </div>
              <div className="mini-product-grid">
                {data.products?.map((p, i) => (
                  <div className="mini-product" key={i}>
                    <span className="mini-cat">{p.category}</span>
                    <h3>{p.name}</h3>
                    <span className="mini-price">{p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-inner">
          <h2>{data?.cta?.title || 'Ready to go solar?'}</h2>
          <p>Our verified partners handle everything from design to installation.</p>
          <Link to="/signup" className="btn btn-light btn-lg">{data?.cta?.button || 'Get Started'}</Link>
        </div>
      </section>
    </div>
  )
}
