import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Award,
  BadgeCheck,
  Building2,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  HardHat,
  IndianRupee,
  Kanban,
  Layers,
  LayoutDashboard,
  PhoneCall,
  ShieldCheck,
  SunMedium,
  TrendingUp,
  UserCheck,
  Wrench,
  Zap
} from 'lucide-react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import ListingView from './dashboard/ListingView'
import CallLogView from './dashboard/CallLogView'
import InstallersView from './dashboard/InstallersView'
import CustomerPortalView from './dashboard/CustomerPortalView'
import CompanyLeadsView from './dashboard/CompanyLeadsView'
import AdminControlView from './dashboard/AdminControlView'

const SECTIONS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard, group: 'General' },
  { key: 'customer', label: '1. Customer Quotes', icon: SunMedium, group: 'Customer' },
  { key: 'company-leads', label: '2. Company Leads & Funnel', icon: Kanban, group: 'Company' },
  { key: 'admin-control', label: '3. Admin Control Centre', icon: ShieldCheck, group: 'Admin' },
  { key: 'listing', label: 'Complain & Listing', icon: ClipboardList, group: 'Core' },
  { key: 'call-log', label: 'Call Logs', icon: PhoneCall, group: 'Core' },
  { key: 'installers', label: 'Installer Teams', icon: HardHat, group: 'Core' }
]

export default function Dashboard() {
  const { user } = useAuth()
  const [section, setSection] = useState('overview')
  const [adminMetrics, setAdminMetrics] = useState(null)
  const [listingCount, setListingCount] = useState(null)
  const [callLogCount, setCallLogCount] = useState(null)

  useEffect(() => {
    Promise.all([
      api.getAdminDashboard().catch(() => null),
      api.getListing().catch(() => null),
      api.getCallLogs().catch(() => null)
    ]).then(([adm, list, cl]) => {
      if (adm?.metrics) setAdminMetrics(adm.metrics)
      if (list?.count) setListingCount(list.count)
      if (cl?.count) setCallLogCount(cl.count)
    })
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
          <div className="dash-nav-section-title">PLATFORM SUITES</div>
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              className={`dash-link ${section === s.key ? 'active' : ''}`}
              onClick={() => setSection(s.key)}
            >
              <span className="dash-icon"><s.icon aria-hidden="true" size={18} /></span> {s.label}
            </button>
          ))}
          <div className="dash-nav-section-title" style={{ marginTop: '12px' }}>API REFERENCE</div>
          <Link to="/docs" className="dash-link">
            <span className="dash-icon"><FileText aria-hidden="true" size={18} /></span> Complete API Docs
          </Link>
        </nav>

        <div className="dash-tip">
          <strong>Active Suites:</strong>
          <div>• Customer Solar Quotes API</div>
          <div>• Company Pipeline API</div>
          <div>• Admin Control &amp; Verifications</div>
        </div>
      </aside>

      <main className="dash-content">
        {section === 'overview' && (
          <div>
            <div className="dash-head">
              <h1>ENRG Control Centre</h1>
              <p>Unified enterprise portal across Customer, Company, and Marketplace Admin domains.</p>
            </div>

            <div className="overview-cards">
              <div className="overview-card clickable" onClick={() => setSection('customer')}>
                <span className="ov-icon"><SunMedium aria-hidden="true" /></span>
                <strong>{adminMetrics?.activeProjects ?? 0}</strong>
                <span>Customer Project Requests</span>
                <small>POST /api/projects/request &amp; compare quotes</small>
              </div>

              <div className="overview-card clickable" onClick={() => setSection('company-leads')}>
                <span className="ov-icon"><TrendingUp aria-hidden="true" /></span>
                <strong>{adminMetrics?.newLeads ?? 0}</strong>
                <span>Company Pipeline Leads</span>
                <small>GET /api/companies/leads &amp; metrics</small>
              </div>

              <div className="overview-card clickable" onClick={() => setSection('admin-control')}>
                <span className="ov-icon"><ShieldCheck aria-hidden="true" /></span>
                <strong>{adminMetrics?.verifiedCompanies ?? 0} / {adminMetrics?.totalCompanies ?? 0}</strong>
                <span>Verified Companies</span>
                <small>PUT /api/admin/companies/:id/verify</small>
              </div>

              <div className="overview-card clickable" onClick={() => setSection('admin-control')}>
                <span className="ov-icon"><IndianRupee aria-hidden="true" /></span>
                <strong>{adminMetrics?.projectValue ?? '₹0'}</strong>
                <span>Marketplace GMV</span>
                <small>GET /api/admin/dashboard</small>
              </div>

              <div className="overview-card clickable" onClick={() => setSection('listing')}>
                <span className="ov-icon"><Building2 aria-hidden="true" /></span>
                <strong>{listingCount ?? 0}</strong>
                <span>Listed Partners</span>
                <small>GET /api/main-point/complain/listing</small>
              </div>

              <div className="overview-card clickable" onClick={() => setSection('call-log')}>
                <span className="ov-icon"><PhoneCall aria-hidden="true" /></span>
                <strong>{callLogCount ?? 0}</strong>
                <span>Customer Call Logs</span>
                <small>POST /api/main-point/complain/call-log</small>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="portal-quick-grid" style={{ marginTop: '28px' }}>
              <div className="quick-portal-card" onClick={() => setSection('customer')}>
                <div className="qp-icon-wrap cust"><SunMedium size={26} /></div>
                <h3>1. Customer Portal</h3>
                <p>Request quotes, upload electricity bills, simulate solar sizing, and compare bids.</p>
                <span className="link-btn">Open Customer Portal &rarr;</span>
              </div>

              <div className="quick-portal-card" onClick={() => setSection('company-leads')}>
                <div className="qp-icon-wrap comp"><Kanban size={26} /></div>
                <h3>2. Company Leads Portal</h3>
                <p>Track sales pipeline stages, submit quotations, view funnel metrics, and update profile.</p>
                <span className="link-btn">Open Company Leads &rarr;</span>
              </div>

              <div className="quick-portal-card" onClick={() => setSection('admin-control')}>
                <div className="qp-icon-wrap adm"><ShieldCheck size={26} /></div>
                <h3>3. Admin Control Centre</h3>
                <p>Marketplace metrics, manual company verification badging, and commission tracking.</p>
                <span className="link-btn">Open Admin Control &rarr;</span>
              </div>
            </div>
          </div>
        )}

        {section === 'customer' && <CustomerPortalView />}
        {section === 'company-leads' && <CompanyLeadsView />}
        {section === 'admin-control' && <AdminControlView />}
        {section === 'listing' && <ListingView />}
        {section === 'call-log' && <CallLogView />}
        {section === 'installers' && <InstallersView />}
      </main>
    </div>
  )
}
