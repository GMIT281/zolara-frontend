import React, { useEffect, useState } from 'react'
import { api } from '../api/client'
import Loader from '../components/Loader'
import CodaHero from '../components/coda/CodaHero'
import CodaTabBar from '../components/coda/CodaTabBar'
import CodaProductVisualizer from '../components/coda/CodaProductVisualizer'
import CodaCardCluster from '../components/coda/CodaCardCluster'
import CodaStatsCarousel from '../components/coda/CodaStatsCarousel'
import CodaImpactCarousel from '../components/coda/CodaImpactCarousel'
import CodaCTACard from '../components/coda/CodaCTACard'

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
      .then((res) => setData(res?.data || res))
      .catch((err) => {
        console.warn('Fallback home data used:', err?.message)
        setData(null)
      })
      .finally(() => setLoading(false))
  }, [type])

  return (
    <div className="coda-home-page">
      {/* 1. Coda Hero Section */}
      <CodaHero
        headline={data?.headline}
        subheadline={data?.subheadline}
        loading={loading}
      />

      {/* 2. Coda System Switcher TabBar & Product Visualizer */}
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CodaTabBar activeType={type} onChangeType={setType} />
        <CodaProductVisualizer activeType={type} data={data} />
      </div>

      {/* 3. Coda Card Cluster: Spotlight & Feature Grids */}
      <CodaCardCluster />

      {/* 4. Coda Stats Carousel: Numeric Proof Badges */}
      <div className="container">
        <CodaStatsCarousel />
      </div>

      {/* 5. Coda Impact Testimonials & Case Studies */}
      <CodaImpactCarousel />

      {/* 6. Coda High-Impact CTA Banner with Sizing Calculator */}
      <CodaCTACard />
    </div>
  )
}
