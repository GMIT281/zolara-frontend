import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  BadgeCheck,
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  FileSpreadsheet,
  IndianRupee,
  Layers,
  PhoneCall,
  RotateCcw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Star,
  Users,
  Zap
} from 'lucide-react'
import { api } from '../../api/client'
import Loader, { Spinner } from '../../components/Loader'

const AVAILABLE_BADGES = ['GST Verified', 'Business Verified', 'Installer Verified', 'Top Rated']

export default function AdminControlView() {
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard' | 'verify' | 'management'
  const [dashboardMetrics, setDashboardMetrics] = useState(null)
  const [companiesList, setCompaniesList] = useState([])
  const [managementData, setManagementData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  // Verification modal / editing state
  const [editingCompany, setEditingCompany] = useState(null)
  const [selectedBadges, setSelectedBadges] = useState([])
  const [isVerified, setIsVerified] = useState(true)
  const [verifying, setVerifying] = useState(false)

  useEffect(() => {
    loadAllAdminData()
  }, [])

  const loadAllAdminData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [dashRes, listRes, mgmtRes] = await Promise.all([
        api.getAdminDashboard(),
        api.getListing(),
        api.getAdminManagement()
      ])
      setDashboardMetrics(dashRes?.metrics || null)
      setCompaniesList(listRes?.listing || [])
      setManagementData(mgmtRes?.data || null)
    } catch (err) {
      setError(err?.message || 'Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  // Open verification dialog for a company
  const openVerifyModal = (company) => {
    setEditingCompany(company)
    setIsVerified(company.verified ?? true)
    setSelectedBadges(company.verificationBadges || ['GST Verified', 'Installer Verified'])
  }

  // Toggle a badge
  const toggleBadge = (badge) => {
    if (selectedBadges.includes(badge)) {
      setSelectedBadges(selectedBadges.filter((b) => b !== badge))
    } else {
      setSelectedBadges([...selectedBadges, badge])
    }
  }

  // Submit company verification
  const handleSaveVerification = async (e) => {
    e.preventDefault()
    if (!editingCompany) return

    setVerifying(true)
    setError(null)
    setSuccessMsg(null)
    try {
      const res = await api.verifyCompany(editingCompany.id, {
        verified: isVerified,
        verificationBadges: selectedBadges
      })
      setSuccessMsg(`Verification updated for ${editingCompany.name}!`)
      setEditingCompany(null)
      loadAllAdminData()
    } catch (err) {
      setError(err?.message || 'Failed to update company verification')
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div className="admin-control-view">
      <div className="dash-head">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1>Admin Control Centre &amp; Marketplace Management</h1>
            <p>High-level marketplace KPIs, manual company verification badging, and operational monitoring.</p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={loadAllAdminData} disabled={loading}>
            <RotateCcw size={14} /> Refresh Data
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="view-tabs-bar">
        <button
          className={`view-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => { setActiveTab('dashboard'); setError(null); setSuccessMsg(null); }}
        >
          <Layers size={18} />
          <span>Marketplace Metrics</span>
        </button>
        <button
          className={`view-tab-btn ${activeTab === 'verify' ? 'active' : ''}`}
          onClick={() => { setActiveTab('verify'); setError(null); setSuccessMsg(null); }}
        >
          <ShieldCheck size={18} />
          <span>Company Verification &amp; Badges</span>
        </button>
        <button
          className={`view-tab-btn ${activeTab === 'management' ? 'active' : ''}`}
          onClick={() => { setActiveTab('management'); setError(null); setSuccessMsg(null); }}
        >
          <FileSpreadsheet size={18} />
          <span>Operations &amp; Commission Tracking</span>
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {loading && <Loader text="Fetching marketplace administration telemetry…" />}

      {/* ------------------------------------------------------------
          TAB 1: MARKETPLACE DASHBOARD METRICS
          ------------------------------------------------------------ */}
      {!loading && activeTab === 'dashboard' && dashboardMetrics && (
        <div>
          <div className="admin-kpi-grid">
            <div className="admin-kpi-card">
              <span className="ak-icon"><Users size={22} /></span>
              <span className="ak-label">Total Customers</span>
              <strong className="ak-val">{dashboardMetrics.totalCustomers ?? 0}</strong>
              <small>Registered Solar Seekers</small>
            </div>
            <div className="admin-kpi-card">
              <span className="ak-icon"><Building2 size={22} /></span>
              <span className="ak-label">Total Companies</span>
              <strong className="ak-val">{dashboardMetrics.totalCompanies ?? 0}</strong>
              <small>Onboarded EPC Partners</small>
            </div>
            <div className="admin-kpi-card">
              <span className="ak-icon"><BadgeCheck size={22} /></span>
              <span className="ak-label">Verified Companies</span>
              <strong className="ak-val">{dashboardMetrics.verifiedCompanies ?? 0}</strong>
              <small>GST &amp; Installer Certified</small>
            </div>
            <div className="admin-kpi-card">
              <span className="ak-icon"><Zap size={22} /></span>
              <span className="ak-label">New Leads</span>
              <strong className="ak-val">{dashboardMetrics.newLeads ?? 0}</strong>
              <small>Pipeline Inquiries</small>
            </div>
            <div className="admin-kpi-card">
              <span className="ak-icon"><Clock size={22} /></span>
              <span className="ak-label">Active Projects</span>
              <strong className="ak-val">{dashboardMetrics.activeProjects ?? 0}</strong>
              <small>In Execution / Survey</small>
            </div>
            <div className="admin-kpi-card">
              <span className="ak-icon"><CheckCircle size={22} /></span>
              <span className="ak-label">Completed Projects</span>
              <strong className="ak-val">{dashboardMetrics.completedProjects ?? 0}</strong>
              <small>Commissioned Systems</small>
            </div>
            <div className="admin-kpi-card highlight-gold">
              <span className="ak-icon"><IndianRupee size={22} /></span>
              <span className="ak-label">Total Project Value</span>
              <strong className="ak-val">{dashboardMetrics.projectValue ?? '₹0'}</strong>
              <small>Gross Marketplace GMV</small>
            </div>
            <div className="admin-kpi-card highlight-green">
              <span className="ak-icon"><DollarSign size={22} /></span>
              <span className="ak-label">Commission Earned</span>
              <strong className="ak-val">{dashboardMetrics.commissionEarned ?? '₹0'}</strong>
              <small>Realized 4% Platform Fee</small>
            </div>
            <div className="admin-kpi-card">
              <span className="ak-icon"><Clock size={22} /></span>
              <span className="ak-label">Pending Commission</span>
              <strong className="ak-val">{dashboardMetrics.pendingCommission ?? '₹0'}</strong>
              <small>Settlements in Escrow</small>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------
          TAB 2: COMPANY MANUAL VERIFICATION
          ------------------------------------------------------------ */}
      {!loading && activeTab === 'verify' && (
        <div>
          <div className="dash-head">
            <h3>Company Verification &amp; Trust Badges</h3>
            <p>Manually inspect credentials and grant verified badges to trusted installers.</p>
          </div>

          <div className="company-list">
            {companiesList.map((company) => {
              const badges = company.verificationBadges || ['GST Verified', 'Installer Verified']

              return (
                <div className="company-card" key={company.id}>
                  <div className="company-card-head">
                    <div>
                      <h3>
                        {company.name}
                        {company.verified ? (
                          <span className="verified-badge">
                            <BadgeCheck size={14} /> Verified Partner
                          </span>
                        ) : (
                          <span className="unverified-badge">
                            <ShieldAlert size={14} /> Unverified
                          </span>
                        )}
                      </h3>
                      <p className="company-loc">{company.location} · {company.type}</p>
                      <div className="company-tags" style={{ marginTop: '8px' }}>
                        {badges.map((b) => (
                          <span className="badge-tag" key={b}>{b}</span>
                        ))}
                      </div>
                    </div>

                    <div className="company-card-actions">
                      <button className="btn btn-primary btn-sm" onClick={() => openVerifyModal(company)}>
                        <ShieldCheck size={15} /> Edit Verification &amp; Badges
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------
          TAB 3: OPERATIONS & MANAGEMENT DATA
          ------------------------------------------------------------ */}
      {!loading && activeTab === 'management' && managementData && (
        <div className="management-sections">
          {/* Section 1: Company Performance */}
          <div className="panel" style={{ marginBottom: '24px' }}>
            <h3>Company Performance Metrics</h3>
            <p className="muted" style={{ marginBottom: '14px' }}>Turnaround SLA, conversion performance, and project revenues per partner.</p>

            <div className="leads-table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Rating</th>
                    <th>Total Leads</th>
                    <th>Won Projects</th>
                    <th>Total Revenue</th>
                    <th>Complaints</th>
                    <th>SLA Score</th>
                  </tr>
                </thead>
                <tbody>
                  {managementData.companyPerformance?.map((cp) => (
                    <tr key={cp.companyId}>
                      <td><strong>{cp.companyName}</strong></td>
                      <td><span className="rating"><Star size={13} fill="currentColor" /> {cp.rating}</span></td>
                      <td>{cp.totalLeads}</td>
                      <td><strong>{cp.projectsWon}</strong></td>
                      <td><strong style={{ color: 'var(--primary-3)' }}>{cp.totalRevenue}</strong></td>
                      <td>{cp.complaints === 0 ? <span style={{ color: 'var(--success)' }}>0</span> : <span style={{ color: 'var(--danger)' }}>{cp.complaints}</span>}</td>
                      <td><span className="tag" style={{ background: '#e9f8ef', color: '#16a34a' }}>{cp.slaScore}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Payment & Commission Tracking */}
          <div className="panel" style={{ marginBottom: '24px' }}>
            <h3>Payment &amp; Commission Tracking</h3>
            <p className="muted" style={{ marginBottom: '14px' }}>Marketplace commission ledger (4% platform fee) and settlement tracking.</p>

            <div className="leads-table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Ref / Project</th>
                    <th>Customer</th>
                    <th>Installer Company</th>
                    <th>Project Value</th>
                    <th>Commission (4%)</th>
                    <th>Payout Status</th>
                    <th>Transaction Ref</th>
                  </tr>
                </thead>
                <tbody>
                  {managementData.paymentTracking?.map((pay) => (
                    <tr key={pay.id}>
                      <td><code>{pay.projectId}</code></td>
                      <td><strong>{pay.customerName}</strong></td>
                      <td>{pay.companyName}</td>
                      <td>₹{pay.projectValue?.toLocaleString('en-IN')}</td>
                      <td><strong style={{ color: 'var(--success)' }}>₹{pay.commissionEarned?.toLocaleString('en-IN')}</strong></td>
                      <td>
                        <span className={`status-pill ${pay.paymentStatus.toLowerCase()}`}>
                          {pay.paymentStatus}
                        </span>
                      </td>
                      <td><small className="muted">{pay.payoutRef}</small></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Customer Complaints */}
          <div className="panel">
            <h3>Customer Complaints &amp; Escalations</h3>
            <p className="muted" style={{ marginBottom: '14px' }}>Active dispute tickets logged against solar companies.</p>

            <div className="leads-table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Ticket / ID</th>
                    <th>Company</th>
                    <th>Customer Name</th>
                    <th>Issue Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {managementData.customerComplaints?.map((c) => (
                    <tr key={c.id}>
                      <td><code>{c.id}</code></td>
                      <td><strong>{c.companyName}</strong></td>
                      <td>{c.customer} ({c.phone || '—'})</td>
                      <td>
                        <strong>{c.issue}</strong>
                        {c.note && <small className="muted" style={{ display: 'block' }}>{c.note}</small>}
                      </td>
                      <td>
                        <span className={`status-pill ${c.status}`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------
          COMPANY VERIFICATION MODAL
          ------------------------------------------------------------ */}
      {editingCompany && (
        <div className="modal-backdrop" onClick={() => setEditingCompany(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Verify Company — {editingCompany.name}</h3>
            <p className="modal-sub">
              PUT <code>/api/admin/companies/{editingCompany.id}/verify</code>
            </p>

            <form onSubmit={handleSaveVerification}>
              <div className="verify-toggle-box">
                <label className="field" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                    style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                  />
                  <div>
                    <strong>Grant Verified Partner Status</strong>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-2)' }}>
                      Enables the green verified badge across customer quote comparisons.
                    </span>
                  </div>
                </label>
              </div>

              <div style={{ marginTop: '16px' }}>
                <label className="field">
                  <span>Assign Verification Badges:</span>
                </label>
                <div className="badge-checkboxes-grid">
                  {AVAILABLE_BADGES.map((badge) => {
                    const isChecked = selectedBadges.includes(badge)
                    return (
                      <button
                        type="button"
                        key={badge}
                        className={`badge-toggle-chip ${isChecked ? 'active' : ''}`}
                        onClick={() => toggleBadge(badge)}
                      >
                        <ShieldCheck size={16} />
                        <span>{badge}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="form-row-2" style={{ marginTop: '22px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setEditingCompany(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={verifying}>
                  {verifying ? <Spinner small /> : 'Save Verification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
