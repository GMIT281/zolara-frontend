import { useEffect, useState } from 'react'
import { BadgeCheck, CircleCheck, Star } from 'lucide-react'
import { api } from '../../api/client'
import Loader, { Spinner } from '../../components/Loader'

export default function ListingView() {
  const [listing, setListing] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expanded, setExpanded] = useState(null)
  const [complaint, setComplaint] = useState(null) // company being complained about
  const [complainForm, setComplainForm] = useState({ customer: '', phone: '', issue: '', note: '' })
  const [submitting, setSubmitting] = useState(false)
  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    api
      .getListing()
      .then((res) => setListing(res?.listing || res?.data?.listing || (Array.isArray(res?.data) ? res.data : []) || []))
      .catch((err) => setError(err?.message || 'Failed to load company listings'))
      .finally(() => setLoading(false))
  }, [])

  const openComplaint = (company) => {
    setComplaint(company)
    setTicket(null)
    setComplainForm({ customer: '', phone: '', issue: '', note: '' })
  }

  const submitComplaint = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const companyId = complaint?._id || complaint?.id
      const res = await api.postCompanyComplaint(companyId, complainForm)
      setTicket(res?.ticket || res?.data?.ticket || res?.data)
    } catch (err) {
      setError(err?.message || 'Failed to register complaint')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="dash-head">
        <h1>Complain &amp; Listing</h1>
        <p>Company listings with dynamically generated complaint endpoints.</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading && <Loader text="Fetching listing…" />}

      {!loading && !error && (
        <div className="company-list">
          {listing.map((company) => {
            const compId = company?._id || company?.id
            const companyListings = company?.listings || company?.list || []
            return (
              <article className="company-card" key={compId}>
                <div className="company-card-head">
                  <div>
                    <h3>
                      {company?.name || 'Unnamed Company'}
                      {company?.verified && <span className="verified-badge" title="Verified"><BadgeCheck aria-hidden="true" /> Verified</span>}
                    </h3>
                    <p className="company-loc">
                      {company?.location || 'India'} · {company?.type || 'Partner'}
                    </p>
                    <div className="company-tags">
                      {company?.services?.map((s) => <span className="tag" key={s}>{s}</span>)}
                    </div>
                  </div>
                  <div className="company-card-actions">
                    {company?.rating && <span className="rating-lg"><Star aria-hidden="true" fill="currentColor" /> {company.rating}</span>}
                    <button className="btn btn-outline btn-sm" onClick={() => setExpanded(expanded === compId ? null : compId)}>
                      {expanded === compId ? 'Hide Listings' : 'View Listings'}
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={() => openComplaint(company)}>
                      Log Complaint
                    </button>
                  </div>
                </div>

                {expanded === compId && (
                  <div className="company-listings">
                    <h4>Listings</h4>
                    {companyListings.length === 0 ? (
                      <p className="muted">No packages listed yet.</p>
                    ) : (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Service / Package</th>
                            <th>Price</th>
                            <th>Duration</th>
                            <th>Warranty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {companyListings.map((l, i) => (
                            <tr key={i}>
                              <td>{l?.title || l?.name || 'Service Package'}</td>
                              <td>{l?.price || '—'}</td>
                              <td>{l?.duration || '—'}</td>
                              <td>{l?.warranty || '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}

      {/* Complaint modal */}
      {complaint && (
        <div className="modal-backdrop" onClick={() => setComplaint(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {!ticket ? (
              <>
                <h3>Log Complaint — {complaint?.name || 'Company'}</h3>
                <p className="modal-sub">
                  POST <code>/api/main-point/complain/company/{complaint?._id || complaint?.id}</code>
                </p>
                <form onSubmit={submitComplaint}>
                  <label className="field">
                    <span>Customer Name</span>
                    <input required value={complainForm.customer} onChange={(e) => setComplainForm({ ...complainForm, customer: e.target.value })} placeholder="e.g. Mahesh Kumar" />
                  </label>
                  <label className="field">
                    <span>Phone</span>
                    <input value={complainForm.phone} onChange={(e) => setComplainForm({ ...complainForm, phone: e.target.value })} placeholder="+91 …" />
                  </label>
                  <label className="field">
                    <span>Issue Type</span>
                    <select required value={complainForm.issue} onChange={(e) => setComplainForm({ ...complainForm, issue: e.target.value })}>
                      <option value="">Select issue…</option>
                      <option>Late installation</option>
                      <option>Equipment damaged on arrival</option>
                      <option>Warranty claim</option>
                      <option>Billing / quotation dispute</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label className="field">
                    <span>Note</span>
                    <textarea rows="3" value={complainForm.note} onChange={(e) => setComplainForm({ ...complainForm, note: e.target.value })} placeholder="Describe the issue…" />
                  </label>
                  <button className="btn btn-primary btn-block" disabled={submitting}>
                    {submitting ? <Spinner small /> : 'Submit Complaint'}
                  </button>
                </form>
              </>
            ) : (
              <div className="ticket-success">
                <span className="ticket-icon"><CircleCheck aria-hidden="true" /></span>
                <h3>Complaint Registered</h3>
                <p><strong>Ticket:</strong> {ticket?.ticketId || ticket?._id || ticket?.id || 'Registered'}</p>
                <p><strong>Company:</strong> {ticket?.companyName || complaint?.name || 'Company'}</p>
                <p><strong>Status:</strong> {ticket?.status || 'open'}</p>
                {ticket?.generatedAt && (
                  <p className="ticket-date">Generated at {new Date(ticket.generatedAt).toLocaleString()}</p>
                )}
                <button className="btn btn-primary btn-block" onClick={() => setComplaint(null)}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
