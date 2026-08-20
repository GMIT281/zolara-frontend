// API client — all requests go through the Vite proxy (/api -> localhost:5000)
const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(json.error || `Request failed (${res.status})`)
  }
  return json
}

export const api = {
  // 1. Home routes
  getHome: (type = 'on-grid') => request(`/home?type=${type}`),

  // 2. Authentication routes
  signup: (payload) =>
    request('/signup', { method: 'POST', body: JSON.stringify(payload) }),
  signin: (payload) =>
    request('/signin', { method: 'POST', body: JSON.stringify(payload) }),

  // 3. Marketplace routes
  getMarketplace: (category) =>
    request(category ? `/marketplace?category=${category}` : '/marketplace'),

  // 4. Main Point (Core Dashboard) routes
  getListing: () => request('/main-point/complain/listing'),
  getCallLogs: () => request('/main-point/complain/call-log'),
  postCallLog: (payload) =>
    request('/main-point/complain/call-log', { method: 'POST', body: JSON.stringify(payload) }),
  postCompanyComplaint: (id, payload) =>
    request(`/main-point/complain/company/${id}`, { method: 'POST', body: JSON.stringify(payload) }),
  getInstallerTeams: (id) => request(`/main-point/installer/company/${id}`),
  getDocs: () => request('/main-point/docs'),

  // Health
  health: () => request('/health')
}