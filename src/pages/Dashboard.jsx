import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, ClipboardList, FileText, HardHat, LayoutDashboard, PhoneCall, Wrench } from 'lucide-react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import ListingView from './dashboard/ListingView'
import CallLogView from './dashboard/CallLogView'
import InstallersView from './dashboard/InstallersView'

const SECTIONS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'listing', label: 'Complain & Listing', icon: ClipboardList },
  { key: 'call-log', label: 'Call Logs', icon: PhoneCall },
  { key: 'installers', label: 'Installers', icon: HardHat }
]

export default function Dashboard() {
  const { user } = useAuth()
  const [section, setSection] = useState('overview')
  const [overview, setOverview] = useState(null)

  useEffect(() => {
    api
      .getListing()
      .then((res) => setOverview(res))
      .catch(() => setOverview(null))
  }, [])

  return (
    <div className="dashboard-page">
      <aside className="dash-sidebar">
        <div className="dash-user">
          <span className="user-avatar lg">{(user?.name?.[0] || user?.email?.[0] || 'U').toUpperCase()}</span>
          <div>
            <strong>{user?.name || user?.email || 'User'}</strong>
            <span className="dash-role">{user?.role || 'user'}</span>
          </div>
        </div>
        <nav className="dash-nav">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              className={`dash-link ${section === s.key ? 'active' : ''}`}
              onClick={() => setSection(s.key)}
            >
              <span className="dash-icon"><s.icon aria-hidden="true" /></span> {s.label}
            </button>
          ))}
          <Link to="/docs" className="dash-link"><span className="dash-icon"><FileText aria-hidden="true" /></span> Documentation</Link>
        </nav>
        <div className="dash-tip">
          Core dashboard endpoints:
          <code>GET /api/main-point/…</code>
        </div>
      </aside>

      <main className="dash-content">
        {section === 'overview' && (
          <div>
            <div className="dash-head">
              <h1>Main Point Dashboard</h1>
              <p>Overview of the core dashboard routes.</p>
            </div>
            <div className="overview-cards">
              <div className="overview-card">
                <span className="ov-icon"><Building2 aria-hidden="true" /></span>
                <strong>{overview?.count ?? '…'}</strong>
                <span>Listed Companies</span>
                <small>GET /api/main-point/complain/listing</small>
              </div>
              <div className="overview-card">
                <span className="ov-icon"><Wrench aria-hidden="true" /></span>
                <strong>3</strong>
                <span>Company Teams</span>
                <small>GET /api/main-point/installer/company/:id</small>
              </div>
              <div className="overview-card">
                <span className="ov-icon"><PhoneCall aria-hidden="true" /></span>
                <strong>1</strong>
                <span>Call Log Store</span>
                <small>POST /api/main-point/complain/call-log</small>
              </div>
              <div className="overview-card">
                <span className="ov-icon"><FileText aria-hidden="true" /></span>
                <strong>1</strong>
                <span>Docs API</span>
                <small>GET /api/main-point/docs</small>
              </div>
            </div>
          </div>
        )}

        {section === 'listing' && <ListingView />}
        {section === 'call-log' && <CallLogView />}
        {section === 'installers' && <InstallersView />}
      </main>
    </div>
  )
}
