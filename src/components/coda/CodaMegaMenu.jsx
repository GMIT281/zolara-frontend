import React from 'react'
import { Link } from 'react-router-dom'
import {
  PlugZap,
  SunMedium,
  BatteryCharging,
  Zap,
  Calculator,
  ShieldCheck,
  Building2,
  BookOpen,
  FileText,
  HelpCircle,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react'

export const MEGA_MENU_DATA = {
  products: {
    label: 'Products',
    sections: [
      {
        heading: 'Solar Hardware (Marketplace)',
        items: [
          {
            title: 'Solar Modules',
            desc: 'Mono-PERC & TOPCon high-yield panels',
            icon: SunMedium,
            color: 'amber',
            to: '/marketplace?category=solar-module'
          },
          {
            title: 'Solar Inverters',
            desc: 'On-grid, off-grid & smart hybrid inverters',
            icon: PlugZap,
            color: 'blue',
            to: '/marketplace?category=inverter'
          },
          {
            title: 'Solar DC Cables',
            desc: 'TUV certified 4 & 6 sq.mm UV resistant cables',
            icon: Zap,
            color: 'green',
            to: '/marketplace?category=cable'
          }
        ]
      },
      {
        heading: 'Mounting & Electricals',
        items: [
          {
            title: 'Mounting Structures',
            desc: 'HDG aluminum rooftop & elevated structures',
            icon: Layers,
            color: 'charcoal',
            to: '/marketplace?category=structure'
          },
          {
            title: 'BOS Electricals',
            desc: 'ACDB, DCDB, SPDs, fuses & earthing kits',
            icon: Cpu,
            color: 'purple',
            to: '/marketplace?category=BOS'
          }
        ]
      },
      {
        heading: 'Certified Packages',
        items: [
          {
            title: 'MNRE Certified Kits',
            desc: 'ALMM approved rooftop complete packages',
            icon: ShieldCheck,
            color: 'green',
            to: '/marketplace'
          }
        ]
      }
    ],
    featured: {
      badge: 'Surya Ghar Scheme',
      title: 'Get Up to ₹78,000 Subsidy',
      text: 'Direct benefit transfer under PM Surya Ghar Muft Bijli Yojana for 1kW - 3kW rooftops.',
      linkText: 'Check Subsidy Eligibility',
      linkTo: '/marketplace'
    }
  },
  solutions: {
    label: 'Solutions',
    sections: [
      {
        heading: 'System Architectures',
        items: [
          {
            title: 'On-Grid Net Metering',
            desc: 'Export surplus units & offset bill to ₹0',
            icon: TrendingUp,
            color: 'green',
            to: '/?type=on-grid'
          },
          {
            title: 'Off-Grid Standalone',
            desc: 'LiFePO4 battery backed autonomous power',
            icon: BatteryCharging,
            color: 'amber',
            to: '/?type=off-grid'
          },
          {
            title: 'Hybrid Multi-Source',
            desc: 'Grid + battery flexibility with auto switch',
            icon: Zap,
            color: 'blue',
            to: '/?type=hybrid-grid'
          }
        ]
      },
      {
        heading: 'Commercial & Installer',
        items: [
          {
            title: 'Commercial Solar EPC',
            desc: 'MW-scale turnkey solar arrays for businesses',
            icon: Building2,
            color: 'charcoal',
            to: '/dashboard'
          },
          {
            title: 'Installer Leads Network',
            desc: 'Receive verified customer leads and manage bids',
            icon: Users,
            color: 'purple',
            to: '/dashboard'
          }
        ]
      }
    ],
    featured: {
      badge: 'Installer Portal',
      title: 'Grow Your Solar EPC Business',
      text: 'Receive verified customer leads, quote directly, and manage discom approvals online.',
      linkText: 'Join Installer Network',
      linkTo: '/signup'
    }
  },
  knowledge: {
    label: 'Knowledge Center',
    sections: [
      {
        heading: 'Documentation & Guides',
        items: [
          {
            title: 'API Documentation',
            desc: 'Full REST API suite for catalog, quotes, & leads',
            icon: FileText,
            color: 'blue',
            to: '/docs'
          },
          {
            title: 'Installation Guidelines',
            desc: 'Step-by-step rooftop layout and safety manuals',
            icon: BookOpen,
            color: 'purple',
            to: '/docs'
          }
        ]
      },
      {
        heading: 'Insights & Research',
        items: [
          {
            title: 'ENRG Energy Capsule',
            desc: 'Weekly tariff trends, policy updates & tech shifts',
            icon: TrendingUp,
            color: 'amber',
            to: '/docs'
          },
          {
            title: 'Case Studies',
            desc: 'Real performance metrics across 12,000+ homes',
            icon: Award,
            color: 'green',
            to: '/docs'
          }
        ]
      }
    ],
    featured: {
      badge: 'API Documentation',
      title: 'ENRG Marketplace API Suite',
      text: 'Explore REST endpoints for marketplace catalog, real-time quotes, and solar lead tracking.',
      linkText: 'Browse Documentation',
      linkTo: '/docs'
    }
  },
  company: {
    label: 'Company',
    sections: [
      {
        heading: 'About ENRG',
        items: [
          {
            title: 'About Us',
            desc: 'Powering a Better Tomorrow through clean solar energy',
            icon: SunMedium,
            color: 'amber',
            to: '/'
          },
          {
            title: 'Verified Partners',
            desc: 'Over 350+ certified Tier-1 distributors & installers',
            icon: ShieldCheck,
            color: 'green',
            to: '/marketplace'
          }
        ]
      },
      {
        heading: 'Support & Security',
        items: [
          {
            title: 'Customer Support Desk',
            desc: 'Speak with our regional solar engineering advisors',
            icon: HelpCircle,
            color: 'blue',
            to: '/docs'
          },
          {
            title: 'Escrow Payment Protection',
            desc: 'Milestone-based release for all solar installations',
            icon: Award,
            color: 'charcoal',
            to: '/docs'
          }
        ]
      }
    ],
    featured: {
      badge: 'About ENRG',
      title: 'Powering A Better Tomorrow',
      text: 'Connecting rooftop owners with verified solar hardware, certified installers, and discom subsidies.',
      linkText: 'Learn More About Us',
      linkTo: '/docs'
    }
  }
}

export default function CodaMegaMenu({ activeCategory, onClose, onMouseEnter, onMouseLeave }) {
  if (!activeCategory || !MEGA_MENU_DATA[activeCategory]) return null

  const category = MEGA_MENU_DATA[activeCategory]

  return (
    <div
      className="coda-megamenu-panel open"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="coda-megamenu-grid">
        {category.sections.map((sec, idx) => (
          <div key={idx} className="coda-megamenu-section">
            <span className="coda-megamenu-label">{sec.heading}</span>
            {sec.items.map((item, i) => {
              const Icon = item.icon
              return (
                <Link
                  key={i}
                  to={item.to}
                  className="coda-megamenu-link"
                >
                  <div className={`coda-icon-badge ${item.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="coda-link-content">
                    <span className="coda-link-title">{item.title}</span>
                    <span className="coda-link-desc">{item.desc}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      {category.featured && (
        <div className="coda-megamenu-featured">
          <span className="coda-featured-badge">{category.featured.badge}</span>
          <div className="coda-featured-body">
            <h4 className="coda-featured-title">{category.featured.title}</h4>
            <p className="coda-featured-text">{category.featured.text}</p>
            <Link
              to={category.featured.linkTo}
              className="coda-featured-btn"
            >
              {category.featured.linkText} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
