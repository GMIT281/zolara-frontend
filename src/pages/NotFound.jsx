import { Link } from 'react-router-dom'
import { SunMedium } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="not-found">
      <span className="nf-icon"><SunMedium aria-hidden="true" /></span>
      <h1>404</h1>
      <p>This page stepped out of the sunlight.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  )
}
