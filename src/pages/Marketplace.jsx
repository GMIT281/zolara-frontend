import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Boxes, Cable, Construction, PanelsTopLeft, Repeat2, ShoppingCart } from 'lucide-react'
import { api } from '../api/client'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

const CATEGORIES = [
  { key: '', label: 'All Products', icon: ShoppingCart },
  { key: 'solar-module', label: 'Solar Modules', icon: PanelsTopLeft },
  { key: 'inverter', label: 'Inverters', icon: Repeat2 },
  { key: 'cable', label: 'Cables', icon: Cable },
  { key: 'structure', label: 'Structures', icon: Construction },
  { key: 'BOS', label: 'BOS', icon: Boxes }
]

export default function Marketplace() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [enquiries, setEnquiries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sem_enquiries')) || []
    } catch {
      return []
    }
  })

  const getPid = (item) => item?._id || item?.id || ''

  useEffect(() => {
    setLoading(true)
    setError(null)
    api
      .getMarketplace(category)
      .then((res) => setProducts(res?.products || res?.data?.products || (Array.isArray(res?.data) ? res.data : []) || []))
      .catch((err) => setError(err?.message || 'Failed to load products'))
      .finally(() => setLoading(false))
  }, [category])

  const activeCat = useMemo(
    () => CATEGORIES.find((c) => c.key === category) || CATEGORIES[0],
    [category]
  )

  const addToEnquiry = (product) => {
    if (!product) return
    setEnquiries((current) => {
      const targetId = getPid(product)
      const exists = current.some((item) => getPid(item) === targetId)
      const next = exists ? current : [...current, product]
      localStorage.setItem('sem_enquiries', JSON.stringify(next))
      return next
    })
  }

  const clearEnquiries = () => {
    localStorage.removeItem('sem_enquiries')
    setEnquiries([])
  }

  return (
    <div className="marketplace-page">
      <section className="page-hero">
        <div className="container">
          <h1>Solar Marketplace</h1>
          <p>
            Verified products across every category — data served live from{' '}
            <code>GET /api/marketplace?category=…</code>
          </p>
        </div>
      </section>

      <section className="container section">
        <div className="category-tabs">
          {CATEGORIES.map((c) => (
            <button
              key={c.key || 'all'}
              className={`cat-tab ${category === c.key ? 'active' : ''}`}
              onClick={() => {
                const next = new URLSearchParams(params)
                if (c.key) next.set('category', c.key)
                else next.delete('category')
                setParams(next)
              }}
            >
              <span className="tab-icon"><c.icon aria-hidden="true" /></span> {c.label}
            </button>
          ))}
        </div>

        <div className="marketplace-head">
          <h2>{activeCat.label}</h2>
          {!loading && !error && (
            <span className="result-count">{products.length} product{products.length === 1 ? '' : 's'}</span>
          )}
        </div>

        {enquiries.length > 0 && (
          <div className="alert alert-success">
            {enquiries.length} product{enquiries.length === 1 ? '' : 's'} saved to your enquiry list.
            <button type="button" className="link-btn" onClick={clearEnquiries}>Clear list</button>
          </div>
        )}

        {loading && <Loader text="Fetching marketplace…" />}
        {error && <div className="alert alert-error">Failed to load: {error}</div>}

        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="empty-state">No products in this category yet.</div>
            ) : (
              <div className="product-grid">
                {products.map((p, idx) => {
                  const pid = getPid(p) || `p-${idx}`
                  return (
                    <ProductCard
                      key={pid}
                      product={p}
                      onAddToEnquiry={addToEnquiry}
                      isInEnquiry={enquiries.some((item) => getPid(item) === pid)}
                    />
                  )
                })}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
