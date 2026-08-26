import { useEffect, useState } from 'react'
import {
  Award,
  BadgeCheck,
  Building2,
  CheckCircle,
  FileCheck2,
  FileText,
  IndianRupee,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  UploadCloud,
  UserCheck,
  Zap
} from 'lucide-react'
import { api } from '../../api/client'
import Loader, { Spinner } from '../../components/Loader'

export default function CustomerPortalView() {
  const [activeTab, setActiveTab] = useState('request-quote') // 'request-quote' | 'compare-quotes' | 'register-customer'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  // 1. "Get Solar Quote" form state
  const [quoteForm, setQuoteForm] = useState({
    location: '',
    pincode: '',
    monthlyBill: '',
    propertyType: 'Residential Rooftop',
    systemPreference: 'on-grid',
    approxBudget: '',
    customerName: '',
    customerPhone: '',
    customerEmail: ''
  })

  // 2. Comparison Quotes state
  const [selectedProjectId, setSelectedProjectId] = useState('')
  const [quotesList, setQuotesList] = useState([])
  const [loadingQuotes, setLoadingQuotes] = useState(false)
  const [acceptedQuoteId, setAcceptedQuoteId] = useState(null)

  // 3. Customer Registration form state
  const [regForm, setRegForm] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    pincode: '',
    propertyType: 'Independent House / Villa',
    electricityBillUrl: '',
    billFileName: '',
    approxBillAmount: '',
    requiredSystemSize: '',
    otp: ''
  })
  const [registeredCustomer, setRegisteredCustomer] = useState(null)

  // Fetch quotes when selectedProjectId changes
  useEffect(() => {
    if (activeTab === 'compare-quotes' && selectedProjectId) {
      fetchQuotes(selectedProjectId)
    }
  }, [activeTab, selectedProjectId])

  const fetchQuotes = async (projId) => {
    if (!projId) return
    setLoadingQuotes(true)
    setError(null)
    try {
      const res = await api.getProjectQuotes(projId)
      setQuotesList(res?.quotes || res?.data?.quotes || [])
    } catch (err) {
      setError(err?.message || 'Failed to fetch quotes for this project')
    } finally {
      setLoadingQuotes(false)
    }
  }

  // Handle Quote Request Submit
  const handleQuoteRequestSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMsg(null)
    try {
      const res = await api.requestProjectQuote(quoteForm)
      const createdProjId = res?.projectId || res?.project?.id || ''
      if (createdProjId) {
        setSelectedProjectId(createdProjId)
        setSuccessMsg(`Quote request created successfully! Reference: ${createdProjId}`)
        setActiveTab('compare-quotes')
        fetchQuotes(createdProjId)
      }
    } catch (err) {
      setError(err?.message || 'Failed to submit quote request')
    } finally {
      setLoading(false)
    }
  }

  // Handle Customer Registration Submit
  const handleCustomerRegisterSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMsg(null)
    try {
      const res = await api.registerCustomer({
        ...regForm,
        approxBillAmount: Number(regForm.approxBillAmount)
      })
      setRegisteredCustomer(res?.customer || res?.data?.customer || regForm)
      setSuccessMsg('Customer registration complete with verified mobile OTP and bill record.')
    } catch (err) {
      setError(err?.message || 'Failed to register customer')
    } finally {
      setLoading(false)
    }
  }

  // Handle accepting a quote
  const handleAcceptQuote = (quote) => {
    setAcceptedQuoteId(quote.id)
    setSuccessMsg(`Quotation from ${quote.company || quote.Company} accepted! Installer notified to initiate site survey.`)
  }

  return (
    <div className="customer-portal-view">
      <div className="dash-head">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1>Customer Portal &amp; Solar Quotes</h1>
            <p>Request solar quotations, compare verified company bids, and manage customer profile.</p>
          </div>
          <div className="view-pill-group">
            <span className="api-chip">POST /api/projects/request</span>
            <span className="api-chip">GET /api/projects/:id/quotes</span>
            <span className="api-chip">POST /api/customers/register</span>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="view-tabs-bar">
        <button
          className={`view-tab-btn ${activeTab === 'request-quote' ? 'active' : ''}`}
          onClick={() => { setActiveTab('request-quote'); setError(null); setSuccessMsg(null); }}
        >
          <Sun size={18} />
          <span>Get Solar Quote Form</span>
        </button>
        <button
          className={`view-tab-btn ${activeTab === 'compare-quotes' ? 'active' : ''}`}
          onClick={() => { setActiveTab('compare-quotes'); setError(null); setSuccessMsg(null); }}
        >
          <Award size={18} />
          <span>Compare Company Quotes</span>
          {quotesList.length > 0 && <span className="tab-count-badge">{quotesList.length}</span>}
        </button>
        <button
          className={`view-tab-btn ${activeTab === 'register-customer' ? 'active' : ''}`}
          onClick={() => { setActiveTab('register-customer'); setError(null); setSuccessMsg(null); }}
        >
          <UserCheck size={18} />
          <span>Customer Registration &amp; Bill Upload</span>
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {/* TAB 1: GET SOLAR QUOTE FORM */}
      {activeTab === 'request-quote' && (
        <div className="portal-grid">
          <div className="panel form-panel">
            <div className="panel-title-wrap">
              <Sparkles className="panel-icon-accent" size={22} />
              <div>
                <h3>Submit Solar Project Request</h3>
                <p className="muted">Endpoint: <code>POST /api/projects/request</code></p>
              </div>
            </div>

            <form onSubmit={handleQuoteRequestSubmit} className="quote-form">
              <div className="form-row-2">
                <label className="field">
                  <span>Location / City</span>
                  <input
                    required
                    value={quoteForm.location}
                    onChange={(e) => setQuoteForm({ ...quoteForm, location: e.target.value })}
                    placeholder="e.g. Pune, Maharashtra"
                  />
                </label>
                <label className="field">
                  <span>Pincode</span>
                  <input
                    required
                    value={quoteForm.pincode}
                    onChange={(e) => setQuoteForm({ ...quoteForm, pincode: e.target.value })}
                    placeholder="e.g. 411001"
                  />
                </label>
              </div>

              <div className="form-row-2">
                <label className="field">
                  <span>Monthly Electricity Bill</span>
                  <input
                    required
                    value={quoteForm.monthlyBill}
                    onChange={(e) => setQuoteForm({ ...quoteForm, monthlyBill: e.target.value })}
                    placeholder="e.g. ₹5,500"
                  />
                </label>
                <label className="field">
                  <span>Roof / Property Type</span>
                  <select
                    value={quoteForm.propertyType}
                    onChange={(e) => setQuoteForm({ ...quoteForm, propertyType: e.target.value })}
                  >
                    <option>Residential Rooftop</option>
                    <option>Residential Villa / Bungalow</option>
                    <option>Apartment / Society Rooftop</option>
                    <option>Commercial Shed / Office</option>
                    <option>Industrial Factory</option>
                    <option>Agricultural / Ground Mount</option>
                  </select>
                </label>
              </div>

              <div className="form-row-2">
                <label className="field">
                  <span>System Preference</span>
                  <select
                    value={quoteForm.systemPreference}
                    onChange={(e) => setQuoteForm({ ...quoteForm, systemPreference: e.target.value })}
                  >
                    <option value="on-grid">On-Grid (Net Metering, No Battery)</option>
                    <option value="off-grid">Off-Grid (100% Battery Backup)</option>
                    <option value="hybrid">Hybrid (Grid + Battery Storage)</option>
                  </select>
                </label>
                <label className="field">
                  <span>Approximate Budget</span>
                  <input
                    value={quoteForm.approxBudget}
                    onChange={(e) => setQuoteForm({ ...quoteForm, approxBudget: e.target.value })}
                    placeholder="e.g. ₹2,50,000 - ₹3,50,000"
                  />
                </label>
              </div>

              <div className="form-divider">
                <span>Contact Details (For Quotations)</span>
              </div>

              <div className="form-row-3">
                <label className="field">
                  <span>Your Full Name</span>
                  <input
                    required
                    value={quoteForm.customerName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, customerName: e.target.value })}
                    placeholder="Name"
                  />
                </label>
                <label className="field">
                  <span>Mobile Phone</span>
                  <input
                    required
                    value={quoteForm.customerPhone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, customerPhone: e.target.value })}
                    placeholder="+91..."
                  />
                </label>
                <label className="field">
                  <span>Email Address</span>
                  <input
                    required
                    type="email"
                    value={quoteForm.customerEmail}
                    onChange={(e) => setQuoteForm({ ...quoteForm, customerEmail: e.target.value })}
                    placeholder="Email"
                  />
                </label>
              </div>

              <button className="btn btn-primary btn-lg btn-block" disabled={loading} style={{ marginTop: '12px' }}>
                {loading ? <Spinner small /> : (
                  <>
                    <Send size={18} /> Request Quotes from Verified Companies
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="panel side-info-panel">
            <h3>Why Request Through ENRG?</h3>
            <ul className="feature-bullets">
              <li>
                <ShieldCheck className="bullet-icon" size={20} />
                <div>
                  <strong>MNRE &amp; GST Verified Installers</strong>
                  <span>Compare bids only from verified tier-1 EPC partners.</span>
                </div>
              </li>
              <li>
                <IndianRupee className="bullet-icon" size={20} />
                <div>
                  <strong>Direct Competitive Pricing</strong>
                  <span>Save up to 25% by receiving multiple bids with zero middlemen markups.</span>
                </div>
              </li>
              <li>
                <Zap className="bullet-icon" size={20} />
                <div>
                  <strong>PM Surya Ghar Subsidy Assistance</strong>
                  <span>Get end-to-end guidance to claim Central &amp; State solar subsidies.</span>
                </div>
              </li>
              <li>
                <FileCheck2 className="bullet-icon" size={20} />
                <div>
                  <strong>Net-Metering Liaisoning Included</strong>
                  <span>Free DISCOM meter replacement and grid synchronization support.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: COMPARE COMPANY QUOTES */}
      {activeTab === 'compare-quotes' && (
        <div>
          <div className="toolbar" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
            <div className="inline-field">
              <span>Project Reference ID:</span>
              <input
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                placeholder="Enter Project ID (e.g. proj-1)"
                style={{ padding: '8px 14px', borderRadius: '8px', border: '1.6px solid var(--border)', fontWeight: '600' }}
              />
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => fetchQuotes(selectedProjectId)} disabled={loadingQuotes || !selectedProjectId}>
              Load Quotes
            </button>
          </div>

          {loadingQuotes && <Loader text="Retrieving company quotes for comparison…" />}

          {!loadingQuotes && quotesList.length === 0 && (
            <div className="empty-state">
              <p>{selectedProjectId ? `No quotes currently available for project "${selectedProjectId}".` : 'Enter a Project Reference ID above or submit a new quote request.'}</p>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('request-quote')} style={{ marginTop: '12px' }}>
                Submit a New Quote Request
              </button>
            </div>
          )}

          {!loadingQuotes && quotesList.length > 0 && (
            <div className="quotes-compare-grid">
              {quotesList.map((quote) => {
                const isAccepted = acceptedQuoteId === quote.id || quote.status === 'accepted'
                const companyName = quote.company || quote.Company || '—'
                const ratingVal = quote.rating || quote.Rating || '—'
                const expVal = quote.experience || quote.Experience || '—'
                const priceVal = quote.estimatedPrice || quote['Estimated Price'] || '—'
                const warrantyVal = quote.warranty || quote.Warranty || '—'
                const isVerified = quote.verified || quote['Verified status'] === 'Verified'
                const badges = quote.verificationBadges || []

                return (
                  <div className={`quote-card ${isAccepted ? 'is-accepted' : ''}`} key={quote.id}>
                    {isAccepted && (
                      <div className="accepted-banner">
                        <CheckCircle size={15} /> Selected Quotation
                      </div>
                    )}

                    <div className="quote-card-header">
                      <div className="quote-co-title">
                        <h3>{companyName}</h3>
                        {isVerified && (
                          <span className="verified-badge">
                            <BadgeCheck size={14} /> Verified
                          </span>
                        )}
                      </div>
                      <div className="quote-rating-badge">
                        <Star size={14} fill="currentColor" /> {ratingVal}
                      </div>
                    </div>

                    <div className="quote-badges-row">
                      {badges.map((b) => (
                        <span className="badge-tag" key={b}>{b}</span>
                      ))}
                    </div>

                    <div className="quote-metric-box">
                      <div className="qm-item">
                        <span className="qm-label">Estimated Price</span>
                        <strong className="qm-val price">{priceVal}</strong>
                      </div>
                      <div className="qm-item">
                        <span className="qm-label">Experience</span>
                        <strong className="qm-val">{expVal}</strong>
                      </div>
                    </div>

                    <div className="quote-details-list">
                      <div className="qd-row">
                        <strong>Package:</strong>
                        <span>{quote.packageTitle || '—'}</span>
                      </div>
                      <div className="qd-row">
                        <strong>Warranty:</strong>
                        <span className="warranty-tag">{warrantyVal}</span>
                      </div>
                      {quote.details && (
                        <p className="qd-desc">{quote.details}</p>
                      )}
                    </div>

                    <div className="quote-card-footer">
                      <button
                        className={`btn btn-block ${isAccepted ? 'btn-outline' : 'btn-primary'}`}
                        onClick={() => handleAcceptQuote(quote)}
                        disabled={isAccepted}
                      >
                        {isAccepted ? 'Quotation Accepted' : 'Accept & Schedule Site Visit'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CUSTOMER REGISTRATION & BILL UPLOAD */}
      {activeTab === 'register-customer' && (
        <div className="portal-grid">
          <div className="panel form-panel">
            <div className="panel-title-wrap">
              <UserCheck className="panel-icon-accent" size={22} />
              <div>
                <h3>Customer Registration &amp; Onboarding</h3>
                <p className="muted">Endpoint: <code>POST /api/customers/register</code></p>
              </div>
            </div>

            <form onSubmit={handleCustomerRegisterSubmit} className="quote-form">
              <div className="form-row-2">
                <label className="field">
                  <span>Full Name</span>
                  <input
                    required
                    value={regForm.name}
                    onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    placeholder="Customer Name"
                  />
                </label>
                <label className="field">
                  <span>Mobile Number (with OTP)</span>
                  <input
                    required
                    value={regForm.mobile}
                    onChange={(e) => setRegForm({ ...regForm, mobile: e.target.value })}
                    placeholder="+91..."
                  />
                </label>
              </div>

              <div className="form-row-2">
                <label className="field">
                  <span>Email Address</span>
                  <input
                    required
                    type="email"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    placeholder="Email"
                  />
                </label>
                <label className="field">
                  <span>Location / City</span>
                  <input
                    required
                    value={regForm.location}
                    onChange={(e) => setRegForm({ ...regForm, location: e.target.value })}
                    placeholder="City, State"
                  />
                </label>
              </div>

              <div className="form-row-2">
                <label className="field">
                  <span>Pincode</span>
                  <input
                    required
                    value={regForm.pincode}
                    onChange={(e) => setRegForm({ ...regForm, pincode: e.target.value })}
                    placeholder="e.g. 560001"
                  />
                </label>
                <label className="field">
                  <span>Property Type</span>
                  <select
                    value={regForm.propertyType}
                    onChange={(e) => setRegForm({ ...regForm, propertyType: e.target.value })}
                  >
                    <option>Independent House / Villa</option>
                    <option>Residential Society / Rooftop</option>
                    <option>Commercial Property</option>
                    <option>Industrial Facility</option>
                  </select>
                </label>
              </div>

              <div className="form-row-2">
                <label className="field">
                  <span>Electricity Bill URL / Reference</span>
                  <input
                    value={regForm.electricityBillUrl}
                    onChange={(e) => setRegForm({ ...regForm, electricityBillUrl: e.target.value, billFileName: e.target.value.split('/').pop() || '' })}
                    placeholder="https://.../bill.pdf"
                  />
                </label>
                <label className="field">
                  <span>Approximate Monthly Bill Amount (₹)</span>
                  <input
                    required
                    type="number"
                    value={regForm.approxBillAmount}
                    onChange={(e) => setRegForm({ ...regForm, approxBillAmount: e.target.value })}
                    placeholder="e.g. 6000"
                  />
                </label>
              </div>

              <div className="form-row-2">
                <label className="field">
                  <span>Required System Size</span>
                  <input
                    required
                    value={regForm.requiredSystemSize}
                    onChange={(e) => setRegForm({ ...regForm, requiredSystemSize: e.target.value })}
                    placeholder="e.g. 5 kW"
                  />
                </label>
                <label className="field">
                  <span>Mobile OTP Code</span>
                  <input
                    value={regForm.otp}
                    onChange={(e) => setRegForm({ ...regForm, otp: e.target.value })}
                    placeholder="6-digit OTP"
                  />
                </label>
              </div>

              <button className="btn btn-primary btn-lg btn-block" disabled={loading} style={{ marginTop: '12px' }}>
                {loading ? <Spinner small /> : 'Register Customer & Save Profile'}
              </button>
            </form>
          </div>

          {registeredCustomer && (
            <div className="panel profile-success-panel">
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <CheckCircle size={42} style={{ color: 'var(--success)', marginBottom: '8px' }} />
                <h3>Customer Profile Registered!</h3>
                <p className="muted">ID: <code>{registeredCustomer.id}</code></p>
              </div>

              <div className="profile-details-table">
                <div className="p-row">
                  <span>Customer Name:</span>
                  <strong>{registeredCustomer.name}</strong>
                </div>
                <div className="p-row">
                  <span>Mobile Phone:</span>
                  <strong>{registeredCustomer.mobile}</strong>
                </div>
                <div className="p-row">
                  <span>Email:</span>
                  <strong>{registeredCustomer.email}</strong>
                </div>
                <div className="p-row">
                  <span>Location:</span>
                  <strong>{registeredCustomer.location} (PIN: {registeredCustomer.pincode})</strong>
                </div>
                <div className="p-row">
                  <span>Property Type:</span>
                  <strong>{registeredCustomer.propertyType}</strong>
                </div>
                <div className="p-row">
                  <span>Required Size:</span>
                  <strong>{registeredCustomer.requiredSystemSize}</strong>
                </div>
                <div className="p-row">
                  <span>Monthly Bill:</span>
                  <strong>₹{registeredCustomer.approxBillAmount?.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
