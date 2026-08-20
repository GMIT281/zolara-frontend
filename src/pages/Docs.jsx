import { useEffect, useState } from 'react'
import { api } from '../api/client'
import Loader from '../components/Loader'

export default function Docs() {
  const [docs, setDocs] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .getDocs()
      .then((res) => setDocs(res.docs))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="docs-page">
      <section className="page-hero">
        <div className="container">
          <h1>API Documentation</h1>
          <p>Complete reference for the Solar E-Market API — <code>GET /api/main-point/docs</code></p>
        </div>
      </section>

      <section className="container section">
        {loading && <Loader text="Fetching documentation…" />}
        {error && <div className="alert alert-error">{error}</div>}

        {!loading && !error && docs && (
          <>
            <div className="docs-header">
              <h2>{docs.name}</h2>
              <span className="docs-version">v{docs.version}</span>
              <code className="docs-base">Base URL: {docs.baseUrl}</code>
            </div>

            {docs.sections.map((section) => (
              <div className="docs-section" key={section.id}>
                <h3>{section.title}</h3>
                <p className="docs-desc">{section.description}</p>
                <div className="docs-endpoints">
                  {section.endpoints.map((ep, i) => (
                    <div className="doc-row" key={i}>
                      <span className={`method-badge ${ep.method.toLowerCase()}`}>{ep.method}</span>
                      <div className="doc-path-wrap">
                        <code className="doc-path">{ep.path}</code>
                        <p className="doc-desc">{ep.desc}</p>
                        {ep.params && (
                          <p className="doc-params">
                            Query params: {ep.params.map(([k, v]) => <code key={k}>{k}={v}</code>)}
                          </p>
                        )}
                        {ep.body && (
                          <details className="doc-body">
                            <summary>Request body</summary>
                            <pre>{JSON.stringify(ep.body, null, 2)}</pre>
                          </details>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </section>
    </div>
  )
}
