import React from 'react'
import { PlugZap, BatteryCharging, Zap } from 'lucide-react'

export const GRID_SYSTEM_TYPES = [
  {
    key: 'on-grid',
    label: 'On-Grid Systems',
    shortLabel: 'On-Grid',
    icon: PlugZap,
    desc: 'Grid-connected systems with net metering & zero battery cost'
  },
  {
    key: 'off-grid',
    label: 'Off-Grid Systems',
    shortLabel: 'Off-Grid',
    icon: BatteryCharging,
    desc: 'Battery-backed standalone systems with 24/7 power autonomy'
  },
  {
    key: 'hybrid-grid',
    label: 'Hybrid Systems',
    shortLabel: 'Hybrid-Grid',
    icon: Zap,
    desc: 'Smart inverter + lithium storage with seamless power cutover'
  }
]

export default function CodaTabBar({ activeType, onChangeType }) {
  return (
    <section className="coda-tabbar-section">
      <div className="coda-tabbar-container">
        <div className="coda-tabbar" role="tablist" aria-label="Solar System Types">
          {GRID_SYSTEM_TYPES.map((g) => {
            const Icon = g.icon
            const isActive = activeType === g.key
            return (
              <button
                key={g.key}
                role="tab"
                aria-selected={isActive}
                className={`coda-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => onChangeType(g.key)}
              >
                <Icon className="coda-tab-icon" size={16} />
                <span>{g.shortLabel}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
