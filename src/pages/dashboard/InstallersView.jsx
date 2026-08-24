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
        const list = res?.listing || res?.data?.listing || (Array.isArray(res?.data) ? res.data : []) || []
        setCompanies(list)
        if (list.length) {
          const firstId = list[0]._id || list[0].id
          if (firstId) setCompanyId(firstId)
        }
      })
      .catch((err) => setError(err?.message || 'Failed to load installer companies'))
  }, [])

  useEffect(() => {
    if (!companyId) return
    setLoading(true)
    setError(null)
    api
      .getInstallerTeams(companyId)
      .then((res) => {
        const teamsData = res?.teams || res?.data?.teams || res?.data || {}
        setTeams(teamsData)
        const comp = res?.company || res?.data?.company
        const matched = companies.find((c) => (c._id || c.id) === companyId)
        setCompanyName(comp?.name || matched?.name || 'Solar Installer')
      })
      .catch((err) => setError(err?.message || 'Failed to load installer teams'))
      .finally(() => setLoading(false))
  }, [companyId, companies])

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
            {companies.map((c) => {
              const cId = c._id || c.id
              return (
                <option key={cId} value={cId}>{c.name || 'Unnamed Company'}</option>
              )
            })}
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
            {Object.entries(teams).map(([teamKey, team]) => {
              const members = Array.isArray(team)
                ? team
                : (Array.isArray(team?.members) ? team.members : (team ? [team] : []))
              const leadName = (!Array.isArray(team) && team?.lead)
                ? team.lead
                : (members[0]?.name || 'Assigned Lead')

              return (
                <section className="team-card" key={teamKey}>
                  <div className="team-head">
                    <span className="team-badge">{teamKey}</span>
                    <span className="team-lead">Lead: {leadName}</span>
                  </div>
                  <ul className="team-members">
                    {members.map((m, i) => (
                      <li key={i} className="member-row">
                        <span className="member-avatar">{(m?.name?.[0] || 'M').toUpperCase()}</span>
                        <div className="member-info">
                          <strong>{m?.name || 'Team Member'}</strong>
                          <span>{m?.role || 'Installer'}{m?.cert ? ` · ${m.cert}` : ''}</span>
                        </div>
                        {m?.phone && (
                          <a href={`tel:${m.phone.replace(/\s/g, '')}`} className="member-phone">{m.phone}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
