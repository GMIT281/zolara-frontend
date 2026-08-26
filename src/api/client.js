const API_BASE = '/api'

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  }

  const token = localStorage.getItem('sem_token')
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers
  }

  let response
  try {
    response = await fetch(url, config)
  } catch (networkError) {
    throw new Error(`Network error: ${networkError.message || 'Failed to connect to server'}`)
  }

  let data
  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    const errorMsg = data?.error || data?.message || `Request failed with status ${response.status}`
    const error = new Error(errorMsg)
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

export const api = {
  // 1. Customer APIs
  registerCustomer: (payload) =>
    request('/customers/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  requestProjectQuote: (payload) =>
    request('/projects/request', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  getProjectQuotes: (projectId) =>
    request(`/projects/${encodeURIComponent(projectId)}/quotes`),

  // 2. Company APIs
  updateCompanyProfile: (payload) =>
    request('/companies/profile', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  getCompanyLeads: (companyId) =>
    request(companyId ? `/companies/leads?companyId=${encodeURIComponent(companyId)}` : '/companies/leads'),

  updateCompanyLead: (leadId, payload) =>
    request(`/companies/leads/${encodeURIComponent(leadId)}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),

  getCompanyMetrics: (companyId) =>
    request(companyId ? `/companies/metrics?companyId=${encodeURIComponent(companyId)}` : '/companies/metrics'),

  // 3. Admin APIs
  getAdminDashboard: () =>
    request('/admin/dashboard'),

  verifyCompany: (companyId, payload) =>
    request(`/admin/companies/${encodeURIComponent(companyId)}/verify`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),

  getAdminManagement: () =>
    request('/admin/management'),

  // 4. Home
  getHome: (type = 'on-grid') =>
    request(`/home?type=${encodeURIComponent(type)}`),

  // 5. Auth
  signup: (payload) =>
    request('/signup', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  signin: (payload) =>
    request('/signin', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  // 6. Marketplace
  getMarketplace: (category) =>
    request(category ? `/marketplace?category=${encodeURIComponent(category)}` : '/marketplace'),

  // 7. Main Point (Core Dashboard)
  getListing: () =>
    request('/main-point/complain/listing'),

  getCallLogs: () =>
    request('/main-point/complain/call-log'),

  postCallLog: (payload) =>
    request('/main-point/complain/call-log', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  postCompanyComplaint: (companyId, payload) =>
    request(`/main-point/complain/company/${encodeURIComponent(companyId)}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  getInstallerTeams: (companyId) =>
    request(companyId ? `/main-point/installer/company/${encodeURIComponent(companyId)}` : '/main-point/installer/company/'),

  getDocs: () =>
    request('/main-point/docs')
}

export default api
