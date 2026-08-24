import { useEffect, useState } from 'react'
import { api } from '../../api/client'
import Loader, { Spinner } from '../../components/Loader'

const EMPTY = { companyName: '', companyId: '', customer: '', phone: '', issue: '', note: '', agent: '' }

export default function CallLogView() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const loadLogs = () => {
    setLoading(true)
    api
      .getCallLogs()
      .then((res) => setLogs(res?.callLogs || res?.data?.callLogs || (Array.isArray(res?.data) ? res.data : []) || []))
      .catch((err) => setError(err?.message || 'Failed to load call logs'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadLogs()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)
    setError(null)
    try {
      const res = await api.postCallLog(form)
      const storedLog = res?.log || res?.data?.log || res?.data
      const logId = storedLog?.id || storedLog?._id || 'saved'
      setMessage(`Call log stored (${logId})`)
      setForm(EMPTY)
      loadLogs()
    } catch (err) {
      setError(err?.message || 'Failed to store call log')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="dash-head">
        <h1>Call Logs</h1>
        <p>Store and review follow-up calls — <code>POST /api/main-point/complain/call-log</code></p>
      </div>

      <div className="call-log-layout">
        <form className="panel form-panel" onSubmit={handleSubmit}>
          <h3>New Call Log</h3>
          <label className="field">
            <span>Company Name *</span>
            <input
              required
              value={form.companyName}
              placeholder="SunGrid Energy Solutions"
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            />
          </label>
          <label className="field">
            <span>Company ID</span>
            <input
              value={form.companyId}
              placeholder="comp-1"
              onChange={(e) => setForm({ ...form, companyId: e.target.value })}
            />
          </label>
          <label className="field">
            <span>Customer Name *</span>
            <input
              required
              value={form.customer}
              placeholder="e.g. Mahesh Kumar"
              onChange={(e) => setForm({ ...form, customer: e.target.value })}
            />
          </label>
          <label className="field">
            <span>Phone</span>
            <input
              value={form.phone}
              placeholder="+91 …"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </label>
          <label className="field">
            <span>Issue</span>
            <select value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })}>
              <option value="">Select…</option>
              <option>Quotation follow-up</option>
              <option>Installation delay</option>
              <option>Warranty claim</option>
              <option>Billing dispute</option>
              <option>General enquiry</option>
            </select>
          </label>
          <label className="field">
            <span>Note</span>
            <textarea rows="3" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Call summary…" />
          </label>
          <label className="field">
            <span>Agent</span>
            <input value={form.agent} onChange={(e) => setForm({ ...form, agent: e.target.value })} placeholder="Your name" />
          </label>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-error">{error}</div>}

          <button className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? <Spinner small /> : 'Save Call Log'}
          </button>
        </form>

        <div className="panel logs-panel">
          <h3>Stored Logs ({logs.length})</h3>
          {loading ? (
            <Loader text="Loading call logs…" />
          ) : logs.length === 0 ? (
            <div className="empty-state">No call logs yet. Submit your first log on the left.</div>
          ) : (
            <div className="log-list">
              {logs.map((log, index) => {
                const logKey = log?._id || log?.id || `log-${index}`
                return (
                  <div className="log-item" key={logKey}>
                    <div className="log-item-head">
                      <strong>{log?.companyName || 'Unknown Company'}</strong>
                      <span className="log-status">{log?.status || 'logged'}</span>
                    </div>
                    <p>{log?.customer || 'Customer'} {log?.phone && <span className="muted">· {log.phone}</span>}</p>
                    {log?.issue && <p className="muted">Issue: {log.issue}</p>}
                    {log?.note && <p className="log-note">{log.note}</p>}
                    {log?.createdAt && (
                      <span className="log-date">{new Date(log.createdAt).toLocaleString()}</span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
