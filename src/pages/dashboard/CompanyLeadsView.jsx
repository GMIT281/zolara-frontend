import { useEffect, useState } from 'react'
import {
  AlertCircle,
  Building,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  DollarSign,
  FileEdit,
  History,
  Kanban,
  MapPin,
  Package,
  Phone,
  Plus,
  Send,
  Sparkles,
  TrendingUp,
  User,
  Users,
  Wrench,
  XCircle
} from 'lucide-react'
import { api } from '../../api/client'
import Loader, { Spinner } from '../../components/Loader'

export default function CompanyLeadsView() {
  const [activeTab, setActiveTab] = useState('pipeline') // 'pipeline' | 'metrics' | 'profile'
  const [companyId, setCompanyId] = useState('')
  const [companiesList, setCompaniesList] = useState([])
  const [leadsList, setLeadsList] = useState([])
  const [projectHistory, setProjectHistory] = useState([])
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  // Quote Submission / Status Update Modal state
  const [selectedLead, setSelectedLead] = useState(null)
  const [modalStatus, setModalStatus] = useState('Quote Submitted')
  const [quotePayload, setQuotePayload] = useState({
    price: '',
    warranty: '',
    notes: '',
    packageTitle: ''
  })
  const [statusUpdating, setStatusUpdating] = useState(false)

  // Company Profile state
  const [profileForm, setProfileForm] = useState({
    companyId: '',
    name: '',
    gstCertificate: '',
    businessRegistration: '',
    installationExperience: '',
    serviceLocations: '',
    products: '',
    brands: '',
    pricingPackages: [],
    completedProjectPhotos: ''
  })
  const [savingProfile, setSavingProfile] = useState(false)

  // Load companies, leads, and metrics
  useEffect(() => {
    api.getListing()
      .then((res) => {
        const list = res?.listing || res?.data?.listing || []
        setCompaniesList(list)
        if (list.length > 0 && !companyId) {
          setCompanyId(list[0].id)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    loadData()
  }, [companyId])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [leadsRes, metricsRes] = await Promise.all([
        api.getCompanyLeads(companyId),
        api.getCompanyMetrics(companyId)
      ])
      setLeadsList(leadsRes?.leads || [])
      setProjectHistory(leadsRes?.projectHistory || [])
      setMetrics(metricsRes?.metrics || metricsRes?.totals || null)
    } catch (err) {
      setError(err?.message || 'Failed to load company pipeline data')
    } finally {
      setLoading(false)
    }
  }

  // Quick status update or opening quote modal
  const handleUpdateStatus = async (lead, newStatus, isWon = false) => {
    if (newStatus === 'Quote Submitted') {
      setSelectedLead(lead)
      setModalStatus('Quote Submitted')
      setQuotePayload({
        price: lead.quoteDetails?.price || '',
        warranty: lead.quoteDetails?.warranty || '',
        notes: lead.quoteDetails?.notes || '',
        packageTitle: lead.quoteDetails?.packageTitle || ''
      })
      return
    }

    setStatusUpdating(true)
    setError(null)
    setSuccessMsg(null)
    try {
      await api.updateCompanyLead(lead.id, {
        status: newStatus,
        subStatus: isWon ? 'Won' : newStatus,
        notes: isWon ? 'Customer confirmed purchase order — deal won!' : `Moved to ${newStatus}`
      })
      setSuccessMsg(`Lead status updated to ${newStatus}`)
      loadData()
    } catch (err) {
      setError(err?.message || 'Failed to update lead status')
    } finally {
      setStatusUpdating(false)
    }
  }

  // Submit quote from modal
  const handleModalSubmit = async (e) => {
    e.preventDefault()
    if (!selectedLead) return

    setStatusUpdating(true)
    setError(null)
    try {
      await api.updateCompanyLead(selectedLead.id, {
        status: modalStatus,
        subStatus: modalStatus,
        quoteDetails: quotePayload,
        notes: `Submitted formal quotation: ${quotePayload.price}`
      })
      setSuccessMsg(`Quotation submitted and lead updated for ${selectedLead.customerName}`)
      setSelectedLead(null)
      loadData()
    } catch (err) {
      setError(err?.message || 'Failed to submit quote')
    } finally {
      setStatusUpdating(false)
    }
  }

  // Save Company Profile
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setSavingProfile(true)
    setError(null)
    setSuccessMsg(null)
    try {
      const payload = {
        companyId: profileForm.companyId || companyId,
        name: profileForm.name,
        gstCertificate: profileForm.gstCertificate,
        businessRegistration: profileForm.businessRegistration,
        installationExperience: profileForm.installationExperience,
        serviceLocations: profileForm.serviceLocations ? profileForm.serviceLocations.split(',').map((s) => s.trim()) : [],
        products: profileForm.products ? profileForm.products.split(',').map((s) => s.trim()) : [],
        brands: profileForm.brands ? profileForm.brands.split(',').map((s) => s.trim()) : [],
        pricingPackages: profileForm.pricingPackages,
        completedProjectPhotos: profileForm.completedProjectPhotos ? profileForm.completedProjectPhotos.split(',').map((s) => s.trim()) : []
      }
      const res = await api.updateCompanyProfile(payload)
      setSuccessMsg(`Company profile saved successfully for ${res?.company?.name || profileForm.name}!`)
      // Refresh companies list
      api.getListing().then((r) => setCompaniesList(r?.listing || []))
    } catch (err) {
      setError(err?.message || 'Failed to update company profile')
    } finally {
      setSavingProfile(false)
    }
  }

  return (
    <div className="company-leads-view">
      <div className="dash-head">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1>Company Portal &amp; Leads Funnel</h1>
            <p>Track sales pipeline stages, submit quotations, view funnel metrics, and manage company profile.</p>
          </div>
          {companiesList.length > 0 && (
            <div className="inline-field">
              <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Active Company:</span>
              <select
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '8px', border: '1.6px solid var(--border)' }}
              >
                {companiesList.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="view-tabs-bar">
        <button
          className={`view-tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
          onClick={() => { setActiveTab('pipeline'); setError(null); setSuccessMsg(null); }}
        >
          <Kanban size={18} />
          <span>Leads Pipeline ({leadsList.length})</span>
        </button>
        <button
          className={`view-tab-btn ${activeTab === 'metrics' ? 'active' : ''}`}
          onClick={() => { setActiveTab('metrics'); setError(null); setSuccessMsg(null); }}
        >
          <TrendingUp size={18} />
          <span>Sales Funnel Metrics</span>
        </button>
        <button
          className={`view-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => { setActiveTab('profile'); setError(null); setSuccessMsg(null); }}
        >
          <Building size={18} />
          <span>Company Profile &amp; Packages</span>
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {/* Quick KPI Overview row */}
      {metrics && (
        <div className="funnel-summary-bar">
          <div className="funnel-chip">
            <span>Total Leads</span>
            <strong>{metrics.leads || metrics.Leads || 0}</strong>
          </div>
          <div className="funnel-chip">
            <span>Contacted</span>
            <strong>{metrics.contacted || metrics.Contacted || 0}</strong>
          </div>
          <div className="funnel-chip">
            <span>Site Visits</span>
            <strong>{metrics.siteVisits || metrics['Site Visits'] || 0}</strong>
          </div>
          <div className="funnel-chip">
            <span>Quotes Submitted</span>
            <strong>{metrics.quotes || metrics.Quotes || 0}</strong>
          </div>
          <div className="funnel-chip highlight">
            <span>Projects Won</span>
            <strong>{metrics.projectsWon || metrics['Projects Won'] || 0}</strong>
          </div>
          <div className="funnel-chip rate">
            <span>Conversion Rate</span>
            <strong>{metrics.conversionRate || '0%'}</strong>
          </div>
        </div>
      )}

      {loading && <Loader text="Loading pipeline and company data…" />}

      {/* TAB 1: LEADS PIPELINE */}
      {!loading && activeTab === 'pipeline' && (
        <div className="leads-pipeline-section">
          {leadsList.length === 0 ? (
            <div className="empty-state">
              <p>No active customer leads in the pipeline yet.</p>
            </div>
          ) : (
            <div className="leads-table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer &amp; Contact</th>
                    <th>Location &amp; System</th>
                    <th>Monthly Bill / Budget</th>
                    <th>Pipeline Stage</th>
                    <th>Quotation / Notes</th>
                    <th>Advance Stage Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leadsList.map((lead) => {
                    const isWon = lead.subStatus === 'Won' || lead.status === 'Won'
                    const statusClass = (lead.status || 'new').toLowerCase().replace(/[^a-z]/g, '-')

                    return (
                      <tr key={lead.id}>
                        <td>
                          <div className="lead-cust-info">
                            <strong>{lead.customerName}</strong>
                            <span className="lead-phone"><Phone size={12} /> {lead.customerPhone}</span>
                            <span className="lead-email">{lead.customerEmail}</span>
                          </div>
                        </td>
                        <td>
                          <div className="lead-loc-info">
                            <span><MapPin size={12} /> {lead.location}</span>
                            <span className="tag">{lead.systemPreference?.toUpperCase() || 'ON-GRID'}</span>
                            <small className="muted">{lead.propertyType}</small>
                          </div>
                        </td>
                        <td>
                          <div>
                            <strong>{lead.monthlyBill}</strong>
                            <small className="muted" style={{ display: 'block' }}>Budget: {lead.approxBudget}</small>
                          </div>
                        </td>
                        <td>
                          <span className={`status-pill ${statusClass}`}>
                            {lead.status}
                          </span>
                          {lead.history?.length > 0 && (
                            <small className="muted" style={{ display: 'block', marginTop: '4px' }}>
                              {lead.history.length} audit logs
                            </small>
                          )}
                        </td>
                        <td>
                          {lead.quoteDetails ? (
                            <div className="lead-quote-box">
                              <strong>{lead.quoteDetails.price}</strong>
                              <small>{lead.quoteDetails.warranty}</small>
                            </div>
                          ) : (
                            <span className="muted" style={{ fontSize: '0.82rem' }}>No quotation yet</span>
                          )}
                        </td>
                        <td>
                          <div className="stage-actions-group">
                            {lead.status === 'Accept/Reject' && (
                              <button
                                className="btn btn-outline btn-sm"
                                onClick={() => handleUpdateStatus(lead, 'Contacted')}
                                disabled={statusUpdating}
                              >
                                Accept &amp; Contact
                              </button>
                            )}
                            {lead.status === 'Contacted' && (
                              <button
                                className="btn btn-outline btn-sm"
                                onClick={() => handleUpdateStatus(lead, 'Site Visit')}
                                disabled={statusUpdating}
                              >
                                Schedule Site Visit
                              </button>
                            )}
                            {(lead.status === 'Site Visit' || lead.status === 'Contacted') && (
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleUpdateStatus(lead, 'Quote Submitted')}
                                disabled={statusUpdating}
                              >
                                <DollarSign size={13} /> Submit Quote
                              </button>
                            )}
                            {lead.status === 'Quote Submitted' && !isWon && (
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => handleUpdateStatus(lead, 'Won/Lost', true)}
                                  disabled={statusUpdating}
                                >
                                  <CheckCircle2 size={13} /> Mark Won
                                </button>
                                <button
                                  className="btn btn-ghost btn-sm"
                                  onClick={() => handleUpdateStatus(lead, 'Quote Submitted')}
                                >
                                  Edit Quote
                                </button>
                              </div>
                            )}
                            {isWon && (
                              <span className="won-badge">
                                <CheckCircle2 size={14} /> Project Won
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Project History */}
          {projectHistory.length > 0 && (
            <div className="panel" style={{ marginTop: '24px' }}>
              <h3>Project Execution History</h3>
              <p className="muted" style={{ marginBottom: '14px' }}>Previous and ongoing installations linked to company projects.</p>
              <div className="history-grid">
                {projectHistory.map((proj) => (
                  <div className="history-card" key={proj.id}>
                    <div className="hc-head">
                      <strong>{proj.customerName}</strong>
                      <span className={`status-pill ${proj.status}`}>{proj.status}</span>
                    </div>
                    <p className="hc-loc"><MapPin size={12} /> {proj.location}</p>
                    <div className="hc-meta">
                      <span>{proj.systemPreference?.toUpperCase()}</span>
                      <span>{proj.approxBudget}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SALES FUNNEL METRICS */}
      {!loading && activeTab === 'metrics' && metrics && (
        <div className="metrics-page-content">
          <div className="dash-head">
            <h3>Sales Pipeline &amp; Conversion Performance</h3>
            <p>Live metrics aggregated across all pipeline stages.</p>
          </div>

          <div className="funnel-cards-row">
            <div className="funnel-kpi-card">
              <span className="fk-icon"><Users size={24} /></span>
              <span className="fk-label">New Leads Received</span>
              <strong className="fk-value">{metrics.leads || metrics.Leads || 0}</strong>
              <small>Incoming Customer Inquiries</small>
            </div>
            <div className="funnel-kpi-card">
              <span className="fk-icon"><Phone size={24} /></span>
              <span className="fk-label">Customers Contacted</span>
              <strong className="fk-value">{metrics.contacted || metrics.Contacted || 0}</strong>
              <small>Phone &amp; WhatsApp Discussions</small>
            </div>
            <div className="funnel-kpi-card">
              <span className="fk-icon"><Wrench size={24} /></span>
              <span className="fk-label">Site Visits Completed</span>
              <strong className="fk-value">{metrics.siteVisits || metrics['Site Visits'] || 0}</strong>
              <small>Roof &amp; Electrical Inspection</small>
            </div>
            <div className="funnel-kpi-card">
              <span className="fk-icon"><FileEdit size={24} /></span>
              <span className="fk-label">Quotes Submitted</span>
              <strong className="fk-value">{metrics.quotes || metrics.Quotes || 0}</strong>
              <small>Formal Turnkey Proposals</small>
            </div>
            <div className="funnel-kpi-card highlight">
              <span className="fk-icon"><CheckCircle2 size={24} /></span>
              <span className="fk-label">Projects Won</span>
              <strong className="fk-value">{metrics.projectsWon || metrics['Projects Won'] || 0}</strong>
              <small>Conversion: {metrics.conversionRate || '0%'}</small>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMPANY PROFILE & PACKAGES */}
      {!loading && activeTab === 'profile' && (
        <div className="portal-grid">
          <div className="panel form-panel">
            <div className="panel-title-wrap">
              <Building className="panel-icon-accent" size={22} />
              <div>
                <h3>Company Profile &amp; Verification Details</h3>
                <p className="muted">Endpoint: <code>POST /api/companies/profile</code></p>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="quote-form">
              <div className="form-row-2">
                <label className="field">
                  <span>Company Name</span>
                  <input
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    placeholder="Enter company name"
                  />
                </label>
                <label className="field">
                  <span>GST Certificate Number</span>
                  <input
                    value={profileForm.gstCertificate}
                    onChange={(e) => setProfileForm({ ...profileForm, gstCertificate: e.target.value })}
                    placeholder="e.g. 27AAACG0123M1Z8"
                  />
                </label>
              </div>

              <div className="form-row-2">
                <label className="field">
                  <span>Business Registration (CIN / LLP)</span>
                  <input
                    value={profileForm.businessRegistration}
                    onChange={(e) => setProfileForm({ ...profileForm, businessRegistration: e.target.value })}
                    placeholder="CIN-U40106..."
                  />
                </label>
                <label className="field">
                  <span>Installation Experience</span>
                  <input
                    value={profileForm.installationExperience}
                    onChange={(e) => setProfileForm({ ...profileForm, installationExperience: e.target.value })}
                    placeholder="e.g. 10 years (25MW installed)"
                  />
                </label>
              </div>

              <label className="field">
                <span>Service Locations (comma separated)</span>
                <input
                  value={profileForm.serviceLocations}
                  onChange={(e) => setProfileForm({ ...profileForm, serviceLocations: e.target.value })}
                  placeholder="Pune, Mumbai, Nashik..."
                />
              </label>

              <div className="form-row-2">
                <label className="field">
                  <span>Products Offered</span>
                  <input
                    value={profileForm.products}
                    onChange={(e) => setProfileForm({ ...profileForm, products: e.target.value })}
                    placeholder="Mono PERC, Inverters, Battery..."
                  />
                </label>
                <label className="field">
                  <span>Brands Distributed / Installed</span>
                  <input
                    value={profileForm.brands}
                    onChange={(e) => setProfileForm({ ...profileForm, brands: e.target.value })}
                    placeholder="Tata Power, SolarEdge, Waaree..."
                  />
                </label>
              </div>

              <label className="field">
                <span>Completed Project Photos (URLs, comma separated)</span>
                <textarea
                  rows="2"
                  value={profileForm.completedProjectPhotos}
                  onChange={(e) => setProfileForm({ ...profileForm, completedProjectPhotos: e.target.value })}
                  placeholder="https://.../photo1.jpg, https://.../photo2.jpg"
                />
              </label>

              <button className="btn btn-primary btn-lg btn-block" disabled={savingProfile}>
                {savingProfile ? <Spinner small /> : 'Save & Publish Company Profile'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* QUOTE SUBMISSION MODAL */}
      {selectedLead && (
        <div className="modal-backdrop" onClick={() => setSelectedLead(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Submit Solar Quotation</h3>
            <p className="modal-sub">
              Submitting quote for <strong>{selectedLead.customerName}</strong> ({selectedLead.location})
            </p>

            <form onSubmit={handleModalSubmit}>
              <label className="field">
                <span>Package Title</span>
                <input
                  required
                  value={quotePayload.packageTitle}
                  onChange={(e) => setQuotePayload({ ...quotePayload, packageTitle: e.target.value })}
                  placeholder="e.g. 5kW Turnkey Solar Package"
                />
              </label>

              <div className="form-row-2">
                <label className="field">
                  <span>Estimated Total Price (₹)</span>
                  <input
                    required
                    value={quotePayload.price}
                    onChange={(e) => setQuotePayload({ ...quotePayload, price: e.target.value })}
                    placeholder="e.g. ₹2,35,000"
                  />
                </label>
                <label className="field">
                  <span>Warranty Terms</span>
                  <input
                    required
                    value={quotePayload.warranty}
                    onChange={(e) => setQuotePayload({ ...quotePayload, warranty: e.target.value })}
                    placeholder="e.g. 5 Years System / 25 Years Panels"
                  />
                </label>
              </div>

              <label className="field">
                <span>Quote Description &amp; Scope of Work</span>
                <textarea
                  rows="3"
                  required
                  value={quotePayload.notes}
                  onChange={(e) => setQuotePayload({ ...quotePayload, notes: e.target.value })}
                  placeholder="Details on panels, inverters, cabling, liaisoning..."
                />
              </label>

              <div className="form-row-2" style={{ marginTop: '14px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setSelectedLead(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={statusUpdating}>
                  {statusUpdating ? <Spinner small /> : <><Send size={15} /> Send Quotation</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
