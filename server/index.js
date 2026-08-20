// ============================================================
// Solar E-Market — API Server (Express)
// Implements every endpoint listed in the project spec.
// ============================================================
import express from 'express'
import cors from 'cors'
import {
  homeContent,
  marketplaceProducts,
  allCompanies,
  callLogs,
  users,
  installersResponse,
  apiDocs
} from './data.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// ------------------------------------------------------------
// 1. HOME ROUTES
// GET /api/home?type=on-grid | off-grid | hybrid-grid
// ------------------------------------------------------------
app.get('/api/home', (req, res) => {
  const { type = 'on-grid' } = req.query
  const content = homeContent[type]
  if (!content) {
    return res.status(400).json({ error: 'Invalid type. Use on-grid, off-grid or hybrid-grid.' })
  }
  res.json({
    success: true,
    type,
    data: content
  })
})

// ------------------------------------------------------------
// 2. AUTHENTICATION ROUTES
// POST /api/signup  { role: 'seller-co' | 'install-co' | 'user', ...userDetails }
// POST /api/signin  { method: 'O-auth' | 'JWT-auth' | 'no-password', ...credentials }
// ------------------------------------------------------------
const validRoles = ['seller-co', 'install-co', 'user']
const validMethods = ['O-auth', 'JWT-auth', 'no-password']

app.post('/api/signup', (req, res) => {
  const { role, name, email, password, companyName, phone } = req.body || {}
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: `role must be one of: ${validRoles.join(', ')}` })
  }
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' })
  }
  const existing = users.find((u) => u.email === email)
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists.' })
  }
  const newUser = {
    id: `u-${users.length + 1}`,
    role,
    name,
    email,
    password: password || 'no-password',
    companyName: companyName || null,
    phone: phone || null,
    method: 'JWT-auth',
    createdAt: new Date().toISOString()
  }
  users.push(newUser)
  const { password: _pw, ...safeUser } = newUser
  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    token: `jwt-token-${newUser.id}`,
    user: safeUser
  })
})


app.post('/api/signin', (req, res) => {
  const { method, email, password, token } = req.body || {}
  if (!validMethods.includes(method)) {
    return res.status(400).json({ error: `method must be one of: ${validMethods.join(', ')}` })
  }

  // O-auth: any provided OAuth token is accepted (simulated)
  if (method === 'O-auth') {
    const user = users.find((u) => u.email === email)
    return res.json({
      success: true,
      method: 'O-auth',
      token: token || 'oauth-simulated-token',
      user: user
        ? { id: user.id, name: user.name, email: user.email, role: user.role, method: user.method }
        : { id: 'oauth-guest', name: 'OAuth Guest', email: email || 'guest@oauth.in', role: 'user', method: 'O-auth' }
    })
  }

  // no-password: magic-link style access using only email
  if (method === 'no-password') {
    if (!email) return res.status(400).json({ error: 'email is required for no-password sign in' })
    let user = users.find((u) => u.email === email)
    if (!user) {
      user = { id: `u-${users.length + 1}`, role: 'user', name: email.split('@')[0], email, method: 'no-password' }
      users.push(user)
    }
    return res.json({ success: true, method: 'no-password', token: 'magic-link-token', user })
  }

  // JWT-auth: standard email + password
  const user = users.find((u) => u.email === email && u.password === password)
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }
  const { password: _pw, ...safeUser } = user
  res.json({ success: true, method: 'JWT-auth', token: `jwt-token-${user.id}`, user: safeUser })
})

// ------------------------------------------------------------
// 3. MARKETPLACE ROUTES
// GET /api/marketplace?category=...
// ------------------------------------------------------------
const categories = ['solar-module', 'inverter', 'cable', 'structure', 'BOS']

app.get('/api/marketplace', (req, res) => {
  const { category } = req.query
  if (!category) {
    return res.json({ success: true, count: marketplaceProducts.length, products: marketplaceProducts })
  }
  if (!categories.includes(category)) {
    return res.status(400).json({ error: `category must be one of: ${categories.join(', ')}` })
  }
  const products = marketplaceProducts.filter((p) => p.category === category)
  res.json({ success: true, category, count: products.length, products })
})

// ------------------------------------------------------------
// 4. MAIN POINT (CORE DASHBOARD) ROUTES
// ------------------------------------------------------------

// GET /api/main-point/complain/listing — product listing only
app.get('/api/main-point/complain/listing', (req, res) => {
  const listing = allCompanies.map((c) => ({
    id: c.id,
    name: c.name,
    type: c.type,
    verified: c.verified,
    rating: c.rating,
    location: c.location,
    services: c.services,
    listings: c.list
  }))
  res.json({ success: true, count: listing.length, listing })
})

// POST /api/main-point/complain/call-log — store call logs
app.post('/api/main-point/complain/call-log', (req, res) => {
  const { companyId, companyName, customer, phone, issue, note, agent, status } = req.body || {}
  if (!companyName || !customer) {
    return res.status(400).json({ error: 'companyName and customer are required' })
  }
  const log = {
    id: `cl-${callLogs.length + 1}`,
    companyId,
    companyName,
    customer,
    phone: phone || null,
    issue: issue || '',
    note: note || '',
    agent: agent || 'system',
    status: status || 'logged',
    createdAt: new Date().toISOString()
  }
  callLogs.push(log)
  res.status(201).json({ success: true, message: 'Call log stored', log })
})

// GET /api/main-point/complain/call-log — read stored call logs
app.get('/api/main-point/complain/call-log', (_req, res) => {
  res.json({ success: true, count: callLogs.length, callLogs })
})

// POST /api/main-point/complain/company/:id — dynamically generated endpoint
app.post('/api/main-point/complain/company/:id', (req, res) => {
  const company = allCompanies.find((c) => c.id === req.params.id)
  if (!company) {
    return res.status(404).json({ error: 'Company not found' })
  }
  const ticket = {
    ticketId: `TKT-${Date.now().toString().slice(-6)}`,
    companyId: company.id,
    companyName: company.name,
    ...req.body,
    status: req.body?.status || 'open',
    generatedAt: new Date().toISOString()
  }
  res.status(201).json({ success: true, message: `Complaint logged against ${company.name}`, ticket })
})

// GET /api/main-point/installer/company/ — default Team 1, Team 2 and Team 3 data
app.get('/api/main-point/installer/company/', (_req, res) => {
  res.json({
    success: true,
    teams: installersResponse
  })
})

// GET /api/main-point/installer/company/:id — teams for a specific company
app.get('/api/main-point/installer/company/:id', (req, res) => {
  const company = allCompanies.find((c) => c.id === req.params.id)
  if (!company) {
    return res.status(404).json({ error: 'Company not found' })
  }
  res.json({
    success: true,
    company: { id: company.id, name: company.name },
    teams: company.teams || installersResponse
  })
})

// GET /api/main-point/docs — API / system documentation
app.get('/api/main-point/docs', (_req, res) => {
  res.json({ success: true, docs: apiDocs })
})

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Solar E-Market API', time: new Date().toISOString() })
})

// 404 fallback
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'API route not found' })
})

app.listen(PORT, () => {
  console.log(`Solar E-Market API running at http://localhost:${PORT}`)
})
