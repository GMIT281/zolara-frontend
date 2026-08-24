import { Star } from 'lucide-react'

const CATEGORY_LABELS = {
  'solar-module': 'Solar Module',
  inverter: 'Inverter',
  cable: 'Cable',
  structure: 'Structure',
  BOS: 'BOS'
}

export default function ProductCard({ product = {}, onAddToEnquiry, isInEnquiry = false }) {
  if (!product) return null

  const price = typeof product.price === 'number'
    ? `₹${product.price.toLocaleString('en-IN')}`
    : (product.price || '—')

  return (
    <article className="product-card">
      <div className="product-img">
        {product.image && <img src={product.image} alt={product.name || 'Solar product'} loading="lazy" />}
        {product.category && (
          <span className="product-badge">{CATEGORY_LABELS[product.category] || product.category}</span>
        )}
      </div>
      <div className="product-body">
        <h3 className="product-name">{product.name || 'Solar Product'}</h3>
        {product.brand && <p className="product-brand">{product.brand}</p>}
        <p className="product-desc">{product.desc}</p>
        <div className="product-meta">
          {product.rating && (
            <span className="rating"><Star aria-hidden="true" fill="currentColor" /> {product.rating}</span>
          )}
          {typeof product.stock === 'number' && (
            <span className={`stock ${product.stock > 0 ? 'in' : 'out'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          )}
        </div>
        <div className="product-footer">
          <div>
            <span className="product-price">{price}</span>
            <span className="product-unit">{product.unit ? ` ${product.unit}` : ''}</span>
          </div>
          {product.warranty && <span className="warranty">{product.warranty}</span>}
        </div>
        <button
          className="btn btn-primary btn-block"
          disabled={typeof product.stock === 'number' && product.stock === 0}
          type="button"
          onClick={() => onAddToEnquiry?.(product)}
        >
          {isInEnquiry ? 'Added to Enquiry' : 'Add to Enquiry'}
        </button>
      </div>
    </article>
  )
}
