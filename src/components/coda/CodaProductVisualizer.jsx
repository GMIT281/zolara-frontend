import React from 'react'
import { SunMedium, Zap, Home, ShieldCheck, CheckCircle2 } from 'lucide-react'

export default function CodaProductVisualizer({ activeType, data }) {
  const getSystemDetails = () => {
    switch (activeType) {
      case 'off-grid':
        return {
          title: 'Off-Grid Autonomous Microgrid',
          capacity: '5.0 kW Solar + 10 kWh LiFePO4 Battery',
          flowText: 'Solar PV ➔ MPPT Charge Controller ➔ LiFePO4 Storage ➔ Dedicated Backup Load',
          gridStatus: '100% Off-Grid Autonomy',
          batterySoC: '100% Charged',
          savings: 'Zero Utility Grid Dependency'
        }
      case 'hybrid-grid':
        return {
          title: 'Hybrid Smart Energy Architecture',
          capacity: '6.0 kW Dual-MPPT Smart Hybrid',
          flowText: 'Solar PV ➔ Hybrid Inverter ➔ Smart Automatic Transfer Switch (Grid & Battery)',
          gridStatus: 'Net-Meter Export Active',
          batterySoC: '94% Standby Reserve',
          savings: '₹5,800/mo Aggregate Savings'
        }
      case 'on-grid':
      default:
        return {
          title: 'Grid-Tied Net Metering Architecture',
          capacity: '3.3 kW PM Surya Ghar Package',
          flowText: 'Mono-PERC PV Array ➔ Smart String Inverter ➔ Bi-Directional Discom Net Meter',
          gridStatus: 'Discom Net Meter Connected',
          batterySoC: 'Zero Battery Capex',
          savings: '100% Monthly Bill Offset'
        }
    }
  }

  const details = getSystemDetails()

  return (
    <div className="coda-visualizer-wrap">
      {/* Floating Callout Badges */}
      <div className="coda-floating-stat" style={{ top: '16px', left: '24px' }}>
        <ShieldCheck size={16} color="#10b981" />
        <span>MNRE & ALMM Approved</span>
      </div>

      <div className="coda-floating-stat" style={{ top: '16px', right: '24px' }}>
        <Zap size={16} color="#f59e0b" />
        <span>98.6% Inverter Efficiency</span>
      </div>

      <div className="coda-visualizer-grid">
        {/* Node 1: Solar Generation */}
        <div className="coda-flow-node">
          <div className="coda-node-header">
            <div className="coda-icon-badge amber">
              <SunMedium size={20} />
            </div>
            <span className="coda-node-badge amber">Generation</span>
          </div>
          <h4 className="coda-node-title">Tier-1 Bifacial PV</h4>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            {data?.features?.[0] || 'High efficiency 550W+ half-cut solar panels generating peak DC output.'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#047857' }}>
            <CheckCircle2 size={14} /> 25-Year Warranty
          </div>
        </div>

        {/* Center Unit: Smart Inverter Engine */}
        <div className="coda-center-unit">
          <div className="coda-pulse-ring">
            <Zap size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>
            {details.title}
          </h3>
          <span style={{ fontSize: '0.85rem', color: '#fcd34d', fontWeight: 700, display: 'block', marginBottom: '14px' }}>
            {details.capacity}
          </span>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.4, margin: 0 }}>
            {details.flowText}
          </p>
        </div>

        {/* Node 3: Consumption & Export */}
        <div className="coda-flow-node">
          <div className="coda-node-header">
            <div className="coda-icon-badge green">
              <Home size={20} />
            </div>
            <span className="coda-node-badge green">Distribution</span>
          </div>
          <h4 className="coda-node-title">Rooftop Load & Export</h4>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            {details.gridStatus} — Powering domestic appliances and feeding surplus back into the grid.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#b45309' }}>
            <CheckCircle2 size={14} /> {details.savings}
          </div>
        </div>
      </div>
    </div>
  )
}
