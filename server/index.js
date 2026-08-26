// ============================================================
// ENRG — SOLAR MARKETPLACE API SERVER
// ============================================================
import express from 'express'
import cors from 'cors'
import {
  homeContent,
  marketplaceProducts,
  allCompanies,
  callLogs,
  users,
  customers,
  projects,
  quotes,
  leads,
  paymentTracking,
  getAdminDashboardMetrics,
  getCompanyMetrics,
  getAdminManagementData,
  apiDocs
} from './data.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({ limit: '10mb' }))

// ============================================================
// 1. AUTHENTICATION & ONBOARDING
// ============================================================

// POST /api/signup
// Payload expected: { role: 'seller-co' | 'install-co' | 'user', ...userDetails }
app.post('/api/signup', (req, res) => {
  const { role = 'user', name, email, phone, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  if (users.some((u) => u.email?.toLowerCase() === email.toLowerCase())) {
    return res.status(400).json({ error: 'An account with this email already exists.' })
  }

  const validRoles = ['seller-co', 'install-co', 'user']
  const assignedRole = validRoles.includes(role) ? role : 'user'

  const newUser = {
    id: `u-${users.length + 1}`,
    role: assignedRole,
    name: name || email.split('@')[0],
    email,
    phone: phone || '',
    password,
    method: 'JWT-auth',
    createdAt: new Date().toISOString()
  }

  users.push(newUser)

  const token = `jwt-token-${newUser.id}`
  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    token,
    user: {
      id: newUser.id,
      role: newUser.role,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone
    }
  })
})

// POST /api/signin
// Payload expected: { method: 'O-auth' | 'JWT-auth' | 'no-password', ...credentials }
app.post('/api/signin', (req, res) => {
  const { method = 'JWT-auth', email, password, oauthProvider } = req.body || {}

  if (!email && method !== 'O-auth') {
    return res.status(400).json({ error: 'Email is required for sign in.' })
  }

  let user = users.find((u) => u.email?.toLowerCase() === email?.toLowerCase())

  if (method === 'no-password') {
    if (!user) {
      return res.status(404).json({ error: 'No account found for this email. Please sign up first.' })
    }
    const token = `magic-token-${user.id}`
    return res.json({
      success: true,
      message: 'Magic sign-in successful',
      token,
      user: { id: user.id, role: user.role, name: user.name, email: user.email, phone: user.phone }
    })
  }

  if (method === 'O-auth') {
    const oauthEmail = email || `user-${Date.now()}@oauth.enrg.in`
    user = users.find((u) => u.email?.toLowerCase() === oauthEmail.toLowerCase())
    if (!user) {
      user = {
        id: `u-oauth-${users.length + 1}`,
        role: 'user',
        name: req.body?.name || `OAuth User`,
        email: oauthEmail,
        method: 'O-auth',
        oauthProvider: oauthProvider || 'Google',
        createdAt: new Date().toISOString()
      }
      users.push(user)
    }
    const token = `oauth-token-${user.id}`
    return res.json({
      success: true,
      message: `Signed in via ${user.oauthProvider || 'OAuth'}`,
      token,
      user: { id: user.id, role: user.role, name: user.name, email: user.email, phone: user.phone }
    })
  }

  // Default JWT-auth
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  const token = `jwt-token-${user.id}`
  res.json({
    success: true,
    message: 'Signed in successfully',
    token,
    user: { id: user.id, role: user.role, name: user.name, email: user.email, phone: user.phone }
  })
})

// POST /api/customers/register
// Description: Handles customer registration
// Payload: Name, mobile (with OTP), email, location/pincode, property type, electricity bill upload, approx bill amount, required system size.
app.post('/api/customers/register', (req, res) => {
  const {
    name,
    mobile,
    email,
    location,
    pincode,
    propertyType,
    electricityBillUrl,
    electricityBill,
    approxBillAmount,
    requiredSystemSize,
    otp
  } = req.body || {}

  if (!name || !mobile || !email) {
    return res.status(400).json({ error: 'Name, mobile number, and email are required for registration.' })
  }

  const existingCust = customers.find((c) => c.email?.toLowerCase() === email.toLowerCase() || c.mobile === mobile)
  if (existingCust) {
    return res.status(200).json({
      success: true,
      message: 'Customer profile already exists. Profile loaded.',
      customer: existingCust,
      token: `cust-token-${existingCust.id}`,
      otpVerified: true
    })
  }

  const newCustomer = {
    id: `cust-${customers.length + 1}`,
    name,
    mobile,
    email,
    location: location || (pincode ? `Pincode ${pincode}` : 'India'),
    pincode: pincode || '',
    propertyType: propertyType || 'Residential Rooftop',
    electricityBillUrl: electricityBillUrl || electricityBill || '',
    approxBillAmount: Number(approxBillAmount) || 0,
    requiredSystemSize: requiredSystemSize || '5 kW',
    otpVerified: Boolean(otp),
    createdAt: new Date().toISOString()
  }

  customers.push(newCustomer)

  if (!users.some((u) => u.email === email)) {
    users.push({
      id: `u-cust-${newCustomer.id}`,
      role: 'user',
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.mobile,
      method: 'JWT-auth',
      createdAt: newCustomer.createdAt
    })
  }

  res.status(201).json({
    success: true,
    message: 'Customer registered successfully',
    customer: newCustomer,
    token: `cust-token-${newCustomer.id}`,
    otpVerified: newCustomer.otpVerified
  })
})

// ============================================================
// 2. HOME & PUBLIC ROUTES
// ============================================================
// GET /api/home?type=on-grid | off-grid | hybrid-grid
app.get('/api/home', (req, res) => {
  const { type = 'on-grid' } = req.query
  const data = homeContent[type] || homeContent['on-grid']

  res.json({
    success: true,
    type,
    data
  })
})

// ============================================================
// 3. CUSTOMER & PROJECT ROUTES
// ============================================================

// POST /api/projects/request
// Description: Submits the main "Get Solar Quote" form to generate a project request.
// Payload: Location, monthly electricity bill, roof/property type, system preference (on-grid/off-grid/hybrid), approximate budget.
app.post('/api/projects/request', (req, res) => {
  const {
    location,
    pincode,
    monthlyBill,
    monthlyElectricityBill,
    roofType,
    propertyType,
    systemPreference = 'on-grid',
    approxBudget,
    customerName,
    customerPhone,
    customerEmail,
    customerId
  } = req.body || {}

  if (!location && !pincode) {
    return res.status(400).json({ error: 'Location or pincode is required to request solar quotes.' })
  }

  const effectiveBill = monthlyBill || monthlyElectricityBill || ''
  const effectiveProperty = propertyType || roofType || 'Residential Rooftop'

  const projectId = `proj-${projects.length + 1}`
  const newProject = {
    id: projectId,
    customerId: customerId || `cust-${Date.now().toString().slice(-4)}`,
    customerName: customerName || '',
    customerPhone: customerPhone || '',
    customerEmail: customerEmail || '',
    location: location || (pincode ? `Pincode: ${pincode}` : ''),
    pincode: pincode || '',
    monthlyBill: typeof effectiveBill === 'number' ? `₹${effectiveBill.toLocaleString('en-IN')}` : effectiveBill,
    propertyType: effectiveProperty,
    systemPreference: systemPreference.toLowerCase(),
    approxBudget: approxBudget || '',
    status: 'open',
    createdAt: new Date().toISOString()
  }

  projects.push(newProject)

  // Auto-generate matching quotes from verified companies
  allCompanies.forEach((comp) => {
    quotes.push({
      id: `quote-${quotes.length + 1}`,
      projectId,
      companyId: comp.id,
      company: comp.name,
      rating: comp.rating || 4.8,
      experience: comp.experience || '6+ Years',
      estimatedPrice: approxBudget || '₹1,85,000',
      warranty: '25-Year Performance / 5-Yr Installation',
      verified: Boolean(comp.verified),
      verificationBadges: comp.verificationBadges || ['GST Verified', 'Installer Verified'],
      packageTitle: `${comp.name} ${systemPreference.toUpperCase()} Solar Package`,
      details: `Complete turnkey installation by ${comp.name} including discom net-metering and subsidies.`,
      status: 'submitted'
    })
  })

  res.status(201).json({
    success: true,
    message: 'Solar quote project request created successfully. Awaiting quotes from verified companies.',
    projectId,
    project: newProject,
    matchedQuotesCount: quotes.filter((q) => q.projectId === projectId).length,
    quotes: quotes.filter((q) => q.projectId === projectId)
  })
})

// GET /api/projects/:projectId/quotes
// Description: Retrieves multiple company quotes for the customer to compare.
// Response: Array of quotes including Company, Rating, Experience, Estimated Price, Warranty, and Verified status.
app.get('/api/projects/:projectId/quotes', (req, res) => {
  const { projectId } = req.params
  const projectQuotes = quotes.filter((q) => q.projectId === projectId)

  const formattedQuotes = projectQuotes.map((q) => ({
    id: q.id,
    projectId: q.projectId,
    companyId: q.companyId,
    company: q.company,
    Company: q.company,
    rating: q.rating,
    Rating: q.rating,
    experience: q.experience,
    Experience: q.experience,
    estimatedPrice: q.estimatedPrice,
    'Estimated Price': q.estimatedPrice,
    warranty: q.warranty,
    Warranty: q.warranty,
    verified: q.verified,
    'Verified status': q.verified ? 'Verified' : 'Unverified',
    verificationBadges: q.verificationBadges || [],
    packageTitle: q.packageTitle,
    details: q.details,
    status: q.status
  }))

  res.json({
    success: true,
    projectId,
    count: formattedQuotes.length,
    quotes: formattedQuotes
  })
})

// ============================================================
// 4. MARKETPLACE ROUTES
// ============================================================
// GET /api/marketplace?category=solar-module | inverter | cable | structure | BOS
app.get('/api/marketplace', (req, res) => {
  const { category, search, minPrice, maxPrice } = req.query
  let filtered = [...marketplaceProducts]

  if (category) {
    filtered = filtered.filter((p) => p.category?.toLowerCase() === category.toLowerCase())
  }

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (p) => p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q) || p.specs?.toLowerCase().includes(q)
    )
  }

  if (minPrice) {
    filtered = filtered.filter((p) => (p.numericPrice || 0) >= Number(minPrice))
  }
  if (maxPrice) {
    filtered = filtered.filter((p) => (p.numericPrice || 0) <= Number(maxPrice))
  }

  res.json({
    success: true,
    category: category || 'all',
    count: filtered.length,
    products: filtered
  })
})

// ============================================================
// 5. COMPANY APIS (DASHBOARD & LEAD MANAGEMENT)
// ============================================================

// POST /api/companies/profile
// Description: Creates or updates a company profile.
// Payload: GST certificate, business registration, installation experience, service locations, products, brands, pricing/packages, completed-project photos.
app.post('/api/companies/profile', (req, res) => {
  const {
    companyId,
    name,
    gstCertificate,
    businessRegistration,
    installationExperience,
    experience,
    serviceLocations,
    products,
    brands,
    pricingPackages,
    completedProjectPhotos
  } = req.body || {}

  let company = allCompanies.find((c) => c.id === companyId)
  const isNew = !company

  if (isNew) {
    company = {
      id: companyId || `comp-${allCompanies.length + 1}`,
      name: name || '',
      type: 'install-co',
      verified: false,
      rating: 0,
      location: Array.isArray(serviceLocations) && serviceLocations[0] ? serviceLocations[0] : '',
      employees: 0,
      projectsDone: 0,
      teams: {},
      list: []
    }
    allCompanies.push(company)
  }

  if (name) company.name = name
  if (gstCertificate) company.gstCertificate = gstCertificate
  if (businessRegistration) company.businessRegistration = businessRegistration
  if (installationExperience || experience) {
    company.installationExperience = installationExperience || experience
    company.experience = installationExperience || experience
  }
  if (serviceLocations) company.serviceLocations = Array.isArray(serviceLocations) ? serviceLocations : [serviceLocations]
  if (products) company.products = Array.isArray(products) ? products : [products]
  if (brands) company.brands = Array.isArray(brands) ? brands : [brands]
  if (pricingPackages) {
    company.pricingPackages = Array.isArray(pricingPackages) ? pricingPackages : [pricingPackages]
    company.list = company.pricingPackages.map((p) => ({
      title: p.name || p.title || '',
      price: p.price || '',
      duration: p.duration || '',
      warranty: p.warranty || ''
    }))
  }
  if (completedProjectPhotos) {
    company.completedProjectPhotos = Array.isArray(completedProjectPhotos) ? completedProjectPhotos : [completedProjectPhotos]
  }

  company.updatedAt = new Date().toISOString()

  res.status(isNew ? 201 : 200).json({
    success: true,
    message: isNew ? 'Company profile created successfully' : 'Company profile updated successfully',
    company
  })
})

// GET /api/companies/leads
// Description: Retrieves the list of available customer leads and previous projects.
app.get('/api/companies/leads', (req, res) => {
  const { companyId } = req.query
  const filteredLeads = companyId ? leads.filter((l) => l.companyId === companyId) : leads

  const projectHistory = projects.map((p) => {
    const associatedLead = leads.find((l) => l.projectId === p.id)
    return {
      ...p,
      leadId: associatedLead?.id || null,
      leadStatus: associatedLead?.status || 'Open'
    }
  })

  res.json({
    success: true,
    count: filteredLeads.length,
    leads: filteredLeads,
    projectHistory
  })
})

// PUT /api/companies/leads/:leadId
// Description: Updates the lead pipeline status or submits a quotation.
// Payload: New status (Accept/Reject, Contacted, Site Visit, Quote Submitted, Won/Lost) and quote details.
app.put('/api/companies/leads/:leadId', (req, res) => {
  const { leadId } = req.params
  const { status, subStatus, quoteDetails, quote, notes } = req.body || {}

  const lead = leads.find((l) => l.id === leadId)
  if (!lead) {
    return res.status(404).json({ error: `Lead ${leadId} not found` })
  }

  const effectiveStatus = status || lead.status
  lead.status = effectiveStatus
  lead.subStatus = subStatus || effectiveStatus
  lead.updatedAt = new Date().toISOString()

  if (!lead.history) lead.history = []
  lead.history.push({
    status: effectiveStatus,
    timestamp: new Date().toISOString(),
    note: notes || `Status changed to ${effectiveStatus}`
  })

  const incomingQuote = quoteDetails || quote
  if (incomingQuote) {
    lead.quoteDetails = { ...(lead.quoteDetails || {}), ...incomingQuote }
  }

  res.json({
    success: true,
    message: `Lead ${leadId} status updated to ${effectiveStatus}`,
    lead
  })
})

// GET /api/companies/metrics
// Description: Fetches sales funnel metrics for the company dashboard.
// Response: Totals for Leads, Contacted, Site Visits, Quotes, and Projects Won.
app.get('/api/companies/metrics', (req, res) => {
  const { companyId } = req.query
  const metrics = getCompanyMetrics(companyId)

  res.json({
    success: true,
    companyId: companyId || 'all',
    totals: {
      Leads: metrics.leads,
      Contacted: metrics.contacted,
      'Site Visits': metrics.siteVisits,
      Quotes: metrics.quotes,
      'Projects Won': metrics.projectsWon
    },
    metrics
  })
})

// ============================================================
// 6. MAIN POINT (CORE DASHBOARD) ROUTES
// ============================================================

// GET /api/main-point/complain/listing
// Product listing only (no complex API generation)
app.get('/api/main-point/complain/listing', (_req, res) => {
  const allListings = []
  allCompanies.forEach((comp) => {
    if (Array.isArray(comp.list)) {
      comp.list.forEach((item, index) => {
        allListings.push({
          id: `${comp.id}-item-${index + 1}`,
          companyId: comp.id,
          companyName: comp.name,
          title: item.title,
          price: item.price,
          duration: item.duration,
          warranty: item.warranty,
          verified: comp.verified
        })
      })
    }
  })

  res.json({
    success: true,
    count: allListings.length,
    listing: allListings
  })
})

// POST /api/main-point/complain/call-log
// To store call logs
app.post('/api/main-point/complain/call-log', (req, res) => {
  const { companyId, companyName, customer, phone, type, message, notes } = req.body || {}

  const log = {
    id: `cl-${callLogs.length + 1}`,
    companyId: companyId || null,
    companyName: companyName || allCompanies.find((c) => c.id === companyId)?.name || 'Direct Customer Call',
    customer: customer || 'Customer',
    phone: phone || '',
    type: type || 'Inquiry',
    message: message || notes || '',
    status: 'Logged',
    date: new Date().toISOString()
  }

  callLogs.push(log)

  res.status(201).json({
    success: true,
    message: 'Call log stored',
    log
  })
})

// POST /api/main-point/complain/company/:id
// Dynamically generated endpoint for listed companies
app.post('/api/main-point/complain/company/:id', (req, res) => {
  const { id } = req.params
  const { customerName, phone, complaintType, description } = req.body || {}

  const company = allCompanies.find((c) => c.id === id)
  const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`

  const complaint = {
    ticketId,
    companyId: id,
    companyName: company?.name || `Company ${id}`,
    customerName: customerName || 'Verified Customer',
    phone: phone || '',
    complaintType: complaintType || 'Service Inquiry',
    description: description || '',
    status: 'Under Review',
    createdAt: new Date().toISOString()
  }

  callLogs.push({
    id: `cl-${callLogs.length + 1}`,
    companyId: id,
    companyName: company?.name || `Company ${id}`,
    customer: customerName || 'Customer',
    phone: phone || '',
    type: 'Complaint',
    message: `[Ticket ${ticketId}] ${complaintType || 'Issue'}: ${description || ''}`,
    status: 'Action Required',
    date: new Date().toISOString()
  })

  res.status(201).json({
    success: true,
    message: `Complaint logged against ${company?.name || id}`,
    ticket: complaint
  })
})

// GET /api/main-point/installer/company/:id
// Returns arrays/objects for Team 1, Team 2, Team 3
app.get('/api/main-point/installer/company/:id', (req, res) => {
  const { id } = req.params
  const company = allCompanies.find((c) => c.id === id) || allCompanies[0]

  res.json({
    success: true,
    company: {
      id: company?.id,
      name: company?.name
    },
    teams: company?.teams || {
      team1: { lead: 'Team 1 Lead', members: 4, area: 'Central' },
      team2: { lead: 'Team 2 Lead', members: 5, area: 'North' },
      team3: { lead: 'Team 3 Lead', members: 3, area: 'South' }
    }
  })
})

// GET /api/main-point/docs
// Retrieves API or system documentation
app.get('/api/main-point/docs', (_req, res) => {
  res.json({
    success: true,
    docs: apiDocs
  })
})

// ============================================================
// 7. ADMIN CONTROL APIS
// ============================================================

// GET /api/admin/dashboard
// Description: Retrieves high-level marketplace metrics for the admin control centre.
// Response: Total customers, total companies, verified companies, new leads, active projects, completed projects, project value, commission earned, pending commission.
app.get('/api/admin/dashboard', (_req, res) => {
  const metrics = getAdminDashboardMetrics()
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    metrics: {
      totalCustomers: metrics.totalCustomers,
      'Total customers': metrics.totalCustomers,
      totalCompanies: metrics.totalCompanies,
      'Total companies': metrics.totalCompanies,
      verifiedCompanies: metrics.verifiedCompanies,
      'Verified companies': metrics.verifiedCompanies,
      newLeads: metrics.newLeads,
      'New leads': metrics.newLeads,
      activeProjects: metrics.activeProjects,
      'Active projects': metrics.activeProjects,
      completedProjects: metrics.completedProjects,
      'Completed projects': metrics.completedProjects,
      projectValue: metrics.projectValue,
      'Project value': metrics.projectValue,
      commissionEarned: metrics.commissionEarned,
      'Commission earned': metrics.commissionEarned,
      pendingCommission: metrics.pendingCommission,
      'Pending commission': metrics.pendingCommission
    }
  })
})

// PUT /api/admin/companies/:companyId/verify
// Description: Manually verifies a company.
// Payload: Verification badges to apply (GST Verified, Business Verified, Installer Verified, Top Rated).
app.put('/api/admin/companies/:companyId/verify', (req, res) => {
  const { companyId } = req.params
  const { verified = true, verificationBadges, badges } = req.body || {}

  const company = allCompanies.find((c) => c.id === companyId)
  if (!company) {
    return res.status(404).json({ error: `Company ${companyId} not found` })
  }

  company.verified = Boolean(verified)
  const newBadges = verificationBadges || badges
  if (Array.isArray(newBadges)) {
    company.verificationBadges = newBadges
  } else if (company.verified) {
    company.verificationBadges = ['GST Verified', 'Business Verified', 'Installer Verified', 'Top Rated']
  }

  company.verifiedAt = new Date().toISOString()

  quotes.forEach((q) => {
    if (q.companyId === companyId) {
      q.verified = company.verified
      q.verificationBadges = company.verificationBadges
    }
  })

  res.json({
    success: true,
    message: `Company ${company.name} verification updated successfully`,
    company: {
      id: company.id,
      name: company.name,
      verified: company.verified,
      verificationBadges: company.verificationBadges,
      verifiedAt: company.verifiedAt
    }
  })
})

// GET /api/admin/management
// Description: Retrieves operational management data.
// Response: Company performance metrics, customer complaints, and payment tracking.
app.get('/api/admin/management', (_req, res) => {
  const data = getAdminManagementData()
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data
  })
})

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'ENRG Solar Marketplace API',
    version: '2.0.0',
    time: new Date().toISOString()
  })
})

// 404 for unhandled API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: `Endpoint ${req.method} ${req.originalUrl} not found. Please refer to /api/main-point/docs.`
  })
})

app.listen(PORT, () => {
  console.log(`⚡ ENRG Solar Marketplace API running on http://localhost:${PORT}`)
})
