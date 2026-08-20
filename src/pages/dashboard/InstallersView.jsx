import { useEffect, useState } from 'react'
import { api } from '../../api/client'
import Loader from '../../components/Loader'

export default function InstallersView() {
  const [companies, setCompanies] = useState([])
  const [companyId, setCompanyId] = useState('')
  const [teams, setTeams] = useState(null)
  const [companyName, setCompanyName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .getListing()
      .then((res) => {
        const list = res.listing || []
        setCompanies(list)
        if (list.length) setCompanyId(list[0].id)
      })
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    if (!companyId) return
    setLoading(true)
    setError(null)
    api
      .getInstallerTeams(companyId)
      .then((res) => {
        setTeams(res.teams)
        setCompanyName(res.company.name)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [companyId])

  return (
    <div>
      <div className="dash-head">
        <h1>Installers</h1>
        <p>Company teams — <code>GET /api/main-point/installer/company/:id</code></p>
      </div>

      <div className="toolbar">
        <label className="field inline-field">
          <span>Company</span>
          <select value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {!loading && !error && companies.length === 0 && <div className="empty-state">No companies are available yet.</div>}
      {loading && <Loader text="Fetching teams…" />}

      {!loading && !error && teams && (
        <>
          <h3 className="installer-company-name">{companyName}</h3>
          <div className="teams-grid">
            {Object.entries(teams).map(([teamKey, team]) => (
              <section className="team-card" key={teamKey}>
                <div className="team-head">
                  <span className="team-badge">{teamKey}</span>
                  <span className="team-lead">Lead: {team.lead || team.members?.[0]?.name}</span>
                </div>
                <ul className="team-members">
                  {(team.members || team).map((m, i) => (
                    <li key={i} className="member-row">
                      <span className="member-avatar">{m.name?.[0]}</span>
                      <div className="member-info">
                        <strong>{m.name}</strong>
                        <span>{m.role}{m.cert ? ` · ${m.cert}` : ''}</span>
                      </div>
                      <a href={`tel:${m.phone?.replace(/\s/g, '')}`} className="member-phone">{m.phone}</a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
