// ============================================================
// Solar E-Market — API Server (Express)
// Implements Customer, Company, Admin, Home, Auth, Marketplace & Main-Point routes.
// ============================================================
import express from 'express'
import cors from 'cors'
import {
  homeContent,
  marketplaceProducts,
  allCompanies,
  companies,
  company3,
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

// ------------------------------------------------------------
// 1. CUSTOMER APIS
// ------------------------------------------------------------

// POST /api/customers/register
// Handles customer registration
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

  // Also record in users store if not already present
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

// POST /api/projects/request
// Submits the main "Get Solar Quote" form to generate a project request
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

  res.status(201).json({
    success: true,
    message: 'Solar quote project request created successfully. Awaiting quotes from verified companies.',
    projectId,
    project: newProject,
    matchedQuotesCount: 0,
    quotes: []
  })
})

// GET /api/projects/:projectId/quotes
// Retrieves multiple company quotes for the customer to compare
app.get('/api/projects/:projectId/quotes', (req, res) => {
  const { projectId } = req.params
  const projectQuotes = quotes.filter((q) => q.projectId === projectId)

  // Format array of quotes ensuring requested fields (Company, Rating, Experience, Estimated Price, Warranty, Verified)
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

// ------------------------------------------------------------
// 2. COMPANY APIS
// ------------------------------------------------------------

// POST /api/companies/profile
// Creates or updates a company profile
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
    completedProjectPhotos,
    'completed-project photos': completedPhotosHyphen
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
      founded: new Date().getFullYear(),
      teams: {},
      list: []
    }
    allCompanies.push(company)
  }

  // Update company profile fields
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
    // Sync with listing table for main-point dashboard
    company.list = company.pricingPackages.map((p) => ({
      title: p.name || p.title || '',
      price: p.price || '',
      duration: p.duration || '',
      warranty: p.warranty || ''
    }))
  }
  const photos = completedProjectPhotos || completedPhotosHyphen
  if (photos) company.completedProjectPhotos = Array.isArray(photos) ? photos : [photos]

  company.updatedAt = new Date().toISOString()

  res.status(isNew ? 201 : 200).json({
    success: true,
    message: isNew ? 'Company profile created successfully' : 'Company profile updated successfully',
    company
  })
})

// GET /api/companies/leads
// Retrieves the list of available customer leads and previous projects
app.get('/api/companies/leads', (req, res) => {
  const { companyId } = req.query
  const filteredLeads = companyId ? leads.filter((l) => l.companyId === companyId) : leads

  // Attach previous project history
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
// Updates the lead pipeline status or submits a quotation
app.put('/api/companies/leads/:leadId', (req, res) => {
  const { leadId } = req.params
  const {
    status,
    subStatus,
    quoteDetails,
    quote,
    notes,
    action
  } = req.body || {}

  const lead = leads.find((l) => l.id === leadId)
  if (!lead) {
    return res.status(404).json({ error: `Lead ${leadId} not found` })
  }

  const effectiveStatus = status || action || lead.status
  lead.status = effectiveStatus
  lead.subStatus = subStatus || effectiveStatus
  lead.updatedAt = new Date().toISOString()

  if (!lead.history) lead.history = []
  lead.history.push({
    status: effectiveStatus,
    timestamp: new Date().toISOString(),
    note: notes || (quoteDetails ? `Quote updated: ${quoteDetails.price || ''}` : `Status changed to ${effectiveStatus}`)
  })

  const incomingQuote = quoteDetails || quote
  if (incomingQuote) {
    lead.quoteDetails = {
      ...(lead.quoteDetails || {}),
      ...incomingQuote,
      updatedAt: new Date().toISOString()
    }

    // Sync or add to global quotes array if projectId exists
    if (lead.projectId) {
      const existingQuote = quotes.find((q) => q.projectId === lead.projectId && q.companyId === lead.companyId)
      if (existingQuote) {
        existingQuote.estimatedPrice = incomingQuote.price || existingQuote.estimatedPrice
        existingQuote.warranty = incomingQuote.warranty || existingQuote.warranty
        existingQuote.details = incomingQuote.notes || existingQuote.details
        existingQuote.status = effectiveStatus.toLowerCase().includes('won') ? 'accepted' : 'submitted'
      } else {
        const company = allCompanies.find((c) => c.id === lead.companyId)
        quotes.push({
          id: `quote-${quotes.length + 1}`,
          projectId: lead.projectId,
          companyId: lead.companyId,
          company: company?.name || '',
          rating: company?.rating || 0,
          experience: company?.experience || '',
          estimatedPrice: incomingQuote.price || '',
          warranty: incomingQuote.warranty || '',
          verified: company?.verified || false,
          verificationBadges: company?.verificationBadges || [],
          packageTitle: incomingQuote.packageTitle || '',
          details: incomingQuote.notes || '',
          status: 'submitted',
          createdAt: new Date().toISOString()
        })
      }
    }
  }

  // If status is Won, update project status & track commission
  if (effectiveStatus === 'Won' || effectiveStatus === 'Won/Lost') {
    if (lead.projectId) {
      const project = projects.find((p) => p.id === lead.projectId)
      if (project) project.status = 'in_progress'

      // Add to payment tracking if not already added
      const priceNum = Number(String(lead.quoteDetails?.price || '').replace(/[^0-9]/g, '')) || 0
      if (!paymentTracking.some((p) => p.projectId === lead.projectId) && priceNum > 0) {
        const commEarned = Math.round(priceNum * 0.04)
        paymentTracking.push({
          id: `pay-${paymentTracking.length + 1}`,
          projectId: lead.projectId,
          customerName: lead.customerName,
          companyId: lead.companyId,
          companyName: allCompanies.find((c) => c.id === lead.companyId)?.name || '',
          projectValue: priceNum,
          commissionRate: '4%',
          commissionEarned: commEarned,
          paymentStatus: 'Pending',
          paidAt: null,
          payoutRef: `PAY-REC-${Date.now().toString().slice(-6)}`
        })
      }
    }
  }

  res.json({
    success: true,
    message: `Lead ${leadId} status updated to ${effectiveStatus}`,
    lead
  })
})

// GET /api/companies/metrics
// Fetches sales funnel metrics for the company dashboard
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

// ------------------------------------------------------------
// 3. ADMIN APIS
// ------------------------------------------------------------

// GET /api/admin/dashboard
// Retrieves high-level marketplace metrics for the admin control centre
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
      'Pending commission': metrics.pendingCommission,
      raw: metrics
    }
  })
})

// PUT /api/admin/companies/:companyId/verify
// Manually verifies a company and assigns verification badges
app.put('/api/admin/companies/:companyId/verify', (req, res) => {
  const { companyId } = req.params
  const {
    verified = true,
    verificationBadges,
    badges
  } = req.body || {}

  const company = allCompanies.find((c) => c.id === companyId)
  if (!company) {
    return res.status(404).json({ error: `Company ${companyId} not found` })
  }

  company.verified = Boolean(verified)
  const newBadges = verificationBadges || badges
  if (Array.isArray(newBadges)) {
    company.verificationBadges = newBadges
  } else if (company.verified && (!company.verificationBadges || company.verificationBadges.length === 0)) {
    company.verificationBadges = ['GST Verified', 'Business Verified', 'Installer Verified', 'Top Rated']
  }

  company.verifiedAt = new Date().toISOString()

  // Also update in all company quotes
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
// Retrieves operational management data
app.get('/api/admin/management', (_req, res) => {
  const data = getAdminManagementData()
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: {
      companyPerformance: data.companyPerformance,
      'Company performance metrics': data.companyPerformance,
      customerComplaints: data.customerComplaints,
      'Customer complaints': data.customerComplaints,
      paymentTracking: data.paymentTracking,
      'Payment tracking': data.paymentTracking
    }
  })
})

// ------------------------------------------------------------
// 4. HOME ROUTES
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
// 5. AUTHENTICATION ROUTES
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

  // O-auth: only existing, registered users can sign in via OAuth
  if (method === 'O-auth') {
    const user = users.find((u) => u.email === email)
    if (!user) {
      return res.status(401).json({ error: 'No account found for this email. Please sign up first.' })
    }
    return res.json({
      success: true,
      method: 'O-auth',
      token: token || '',
      user: { id: user.id, name: user.name, email: user.email, role: user.role, method: user.method }
    })
  }

  // no-password: magic-link style access using only email
  if (method === 'no-password') {
    if (!email) return res.status(400).json({ error: 'email is required for no-password sign in' })
    const user = users.find((u) => u.email === email)
    if (!user) {
      return res.status(401).json({ error: 'No account found for this email. Please sign up first.' })
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
// 6. MARKETPLACE ROUTES
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
// 7. CORE MAIN POINT (COMPLAIN & LISTING) ROUTES
// ------------------------------------------------------------

// GET /api/main-point/complain/listing — product listing only
app.get('/api/main-point/complain/listing', (_req, res) => {
  const listing = allCompanies.map((c) => ({
    id: c.id,
    name: c.name,
    type: c.type,
    verified: c.verified,
    verificationBadges: c.verificationBadges || [],
    rating: c.rating,
    location: c.location,
    services: c.services,
    listings: c.list || []
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
    companyId: companyId || null,
    companyName,
    customer,
    phone: phone || null,
    issue: issue || '',
    note: note || '',
    agent: agent || '',
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
    customer: req.body?.customer || '',
    phone: req.body?.phone || '',
    issue: req.body?.issue || '',
    note: req.body?.note || '',
    status: req.body?.status || 'open',
    generatedAt: new Date().toISOString()
  }
  callLogs.push({
    id: `cl-${callLogs.length + 1}`,
    companyId: company.id,
    companyName: company.name,
    customer: ticket.customer,
    phone: ticket.phone,
    issue: ticket.issue,
    note: ticket.note,
    agent: '',
    status: 'open',
    createdAt: ticket.generatedAt
  })
  res.status(201).json({ success: true, message: `Complaint logged against ${company.name}`, ticket })
})

// GET /api/main-point/installer/company/ — default Team 1, Team 2 and Team 3 data
app.get('/api/main-point/installer/company/', (_req, res) => {
  res.json({
    success: true,
    teams: {}
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
    teams: company.teams || {}
  })
})

// GET /api/main-point/docs — API / system documentation
app.get('/api/main-point/docs', (_req, res) => {
  res.json({ success: true, docs: apiDocs })
})

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Solar E-Market API v2.0', time: new Date().toISOString() })
})

// 404 fallback
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'API route not found' })
})

app.listen(PORT, () => {
  console.log(`Solar E-Market API running at http://localhost:${PORT}`)
})
