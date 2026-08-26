// ============================================================
// Solar E-Market — In-Memory Data Store (Clean / Ready for DB)
// ============================================================

export const homeContent = {
  'on-grid': {
    type: 'on-grid',
    headline: 'Stay Connected, Save More',
    subheadline: 'On-grid solar systems that slash your electricity bill while keeping you connected to the utility grid.',
    heroImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Avg. monthly savings', value: '₹0' },
      { label: 'Payback period', value: '—' },
      { label: 'CO₂ offset / year', value: '0 t' }
    ],
    features: [
      { title: 'Net Metering', desc: 'Export surplus power to the grid and earn credits on your bill.' },
      { title: 'Grid Priority', desc: 'Use solar first, automatically switch to grid at night or in clouds.' },
      { title: 'Lower Upfront', desc: 'No battery cost — the grid becomes your storage.' }
    ],
    products: [],
    cta: { title: 'Get a free on-grid consultation', button: 'Talk to an expert' }
  },
  'off-grid': {
    type: 'off-grid',
    headline: 'Power Wherever You Are',
    subheadline: 'Complete off-grid solar kits with battery storage for homes, farms and remote sites.',
    heroImage: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Energy independence', value: '—' },
      { label: 'Battery backup', value: '—' },
      { label: 'System life', value: '—' }
    ],
    features: [
      { title: 'Full Independence', desc: 'Generate, store and consume — zero reliance on the grid.' },
      { title: 'Reliable Backup', desc: 'Lithium battery bank keeps essentials running through outages.' },
      { title: 'Remote Ready', desc: 'Perfect for farms, resorts and off-road sites.' }
    ],
    products: [],
    cta: { title: 'Get a free off-grid system design', button: 'Design my system' }
  },
  'hybrid-grid': {
    type: 'hybrid-grid',
    headline: 'The Best of Both Worlds',
    subheadline: 'Hybrid solar systems combine grid connection with battery backup for unmatched flexibility.',
    heroImage: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Energy independence', value: '—' },
      { label: 'Peak-shaving', value: '—' },
      { label: 'Backup + export', value: '—' }
    ],
    features: [
      { title: 'Smart Energy Mix', desc: 'Auto-switches between solar, battery and grid based on tariffs.' },
      { title: 'Outage Protection', desc: 'Battery backup kicks in within milliseconds during blackouts.' },
      { title: 'Future Ready', desc: 'Expand with more panels or batteries whenever you want.' }
    ],
    products: [],
    cta: { title: 'Get a free hybrid system quote', button: 'Get my quote' }
  }
}

// Marketplace catalog (Clean empty store)
export const moduleInverterProducts = []
export const extraProducts = []
export const marketplaceProducts = []

// Companies & teams store (Clean empty store)
export const companies = []
export const company3 = null
export const allCompanies = []
export const installersResponse = {}

// Communication & call logs
export const callLogs = []

// User accounts
export const users = []

// Customer profiles
export const customers = []

// Project requests
export const projects = []

// Quotations
export const quotes = []

// Leads pipeline
export const leads = []

// Payment & commission ledger
export const paymentTracking = []

// Helper calculation functions
export function getAdminDashboardMetrics() {
  const totalCust = customers.length
  const totalComp = allCompanies.length
  const verifiedComp = allCompanies.filter((c) => c?.verified).length
  const newLds = leads.filter((l) => l?.status === 'Accept/Reject' || l?.subStatus === 'New' || l?.status === 'Contacted').length
  const activeProjs = projects.filter((p) => p?.status === 'open' || p?.status === 'in_progress').length
  const completedProjs = projects.filter((p) => p?.status === 'completed').length

  const projectVal = paymentTracking.reduce((acc, p) => acc + (p?.projectValue || 0), 0)
  const commEarned = paymentTracking.filter((p) => p?.paymentStatus === 'Paid').reduce((acc, p) => acc + (p?.commissionEarned || 0), 0)
  const pendingComm = paymentTracking.filter((p) => p?.paymentStatus === 'Pending').reduce((acc, p) => acc + (p?.commissionEarned || 0), 0)

  return {
    totalCustomers: totalCust,
    totalCompanies: totalComp,
    verifiedCompanies: verifiedComp,
    newLeads: newLds,
    activeProjects: activeProjs,
    completedProjects: completedProjs,
    projectValue: `₹${projectVal.toLocaleString('en-IN')}`,
    numericProjectValue: projectVal,
    commissionEarned: `₹${commEarned.toLocaleString('en-IN')}`,
    numericCommissionEarned: commEarned,
    pendingCommission: `₹${pendingComm.toLocaleString('en-IN')}`,
    numericPendingCommission: pendingComm
  }
}

export function getCompanyMetrics(companyId) {
  const compLeads = leads.filter((l) => !companyId || l?.companyId === companyId)
  const totalLeads = compLeads.length
  const contacted = compLeads.filter((l) => ['Contacted', 'Site Visit', 'Quote Submitted', 'Won/Lost', 'Won'].includes(l?.status) || l?.history?.some((h) => h?.status === 'Contacted')).length
  const siteVisits = compLeads.filter((l) => ['Site Visit', 'Quote Submitted', 'Won/Lost', 'Won'].includes(l?.status) || l?.history?.some((h) => h?.status === 'Site Visit')).length
  const quotesSubmitted = compLeads.filter((l) => ['Quote Submitted', 'Won/Lost', 'Won'].includes(l?.status) || l?.history?.some((h) => h?.status === 'Quote Submitted')).length
  const projectsWon = compLeads.filter((l) => l?.subStatus === 'Won' || l?.status === 'Won' || (l?.status === 'Won/Lost' && l?.subStatus === 'Won')).length

  const conversionRate = totalLeads > 0 ? `${((projectsWon / totalLeads) * 100).toFixed(1)}%` : '0%'

  return {
    companyId: companyId || 'all',
    leads: totalLeads,
    contacted,
    siteVisits,
    quotes: quotesSubmitted,
    projectsWon,
    conversionRate
  }
}

export function getAdminManagementData() {
  const companyPerformance = allCompanies.map((c) => {
    const compLeads = leads.filter((l) => l?.companyId === c?.id)
    const won = compLeads.filter((l) => l?.subStatus === 'Won' || l?.status === 'Won').length
    const compPayments = paymentTracking.filter((p) => p?.companyId === c?.id)
    const revenue = compPayments.reduce((sum, p) => sum + (p?.projectValue || 0), 0)
    const complaintCount = callLogs.filter((cl) => cl?.companyId === c?.id).length

    return {
      companyId: c?.id,
      companyName: c?.name,
      rating: c?.rating || 5.0,
      verified: Boolean(c?.verified),
      badges: c?.verificationBadges || [],
      totalLeads: compLeads.length,
      projectsWon: won,
      totalRevenue: `₹${revenue.toLocaleString('en-IN')}`,
      complaints: complaintCount,
      slaScore: '100%'
    }
  })

  return {
    companyPerformance,
    customerComplaints: callLogs,
    paymentTracking
  }
}

// API Documentation Registry
export const apiDocs = {
  name: 'Solar E-Market API',
  version: '2.0.0',
  baseUrl: '/api',
  sections: [
    {
      id: 'customer',
      title: '1. Customer APIs',
      description: 'Customer registration, solar project quote submissions, and comparison quotes.',
      endpoints: [
        {
          method: 'POST',
          path: '/api/customers/register',
          desc: 'Handles customer registration with contact info, bill upload, and system requirements.',
          body: {
            name: '',
            mobile: '',
            email: '',
            location: '',
            pincode: '',
            propertyType: '',
            electricityBillUrl: '',
            approxBillAmount: 0,
            requiredSystemSize: ''
          }
        },
        {
          method: 'POST',
          path: '/api/projects/request',
          desc: 'Submits the main "Get Solar Quote" form to generate a project request.',
          body: {
            location: '',
            monthlyBill: '',
            propertyType: '',
            systemPreference: 'on-grid',
            approxBudget: ''
          }
        },
        {
          method: 'GET',
          path: '/api/projects/:projectId/quotes',
          desc: 'Retrieves multiple verified company quotes for the customer to compare.'
        }
      ]
    },
    {
      id: 'company',
      title: '2. Company APIs',
      description: 'Company profiles, customer leads funnel pipeline, and sales metrics.',
      endpoints: [
        {
          method: 'POST',
          path: '/api/companies/profile',
          desc: 'Creates or updates a company profile with GST, registration, services, and packages.',
          body: {
            companyId: '',
            name: '',
            gstCertificate: '',
            businessRegistration: '',
            installationExperience: '',
            serviceLocations: [],
            products: [],
            brands: [],
            pricingPackages: [],
            completedProjectPhotos: []
          }
        },
        {
          method: 'GET',
          path: '/api/companies/leads',
          desc: 'Retrieves the list of available customer leads and previous projects. Supports optional ?companyId= parameter.'
        },
        {
          method: 'PUT',
          path: '/api/companies/leads/:leadId',
          desc: 'Updates the lead pipeline status or submits a quotation.',
          body: {
            status: 'Quote Submitted',
            quoteDetails: {
              price: '',
              warranty: '',
              notes: ''
            }
          }
        },
        {
          method: 'GET',
          path: '/api/companies/metrics',
          desc: 'Fetches sales funnel metrics for the company dashboard (Leads, Contacted, Site Visits, Quotes, Won).'
        }
      ]
    },
    {
      id: 'admin',
      title: '3. Admin APIs',
      description: 'Marketplace KPIs, company verification badging, complaints, and financial tracking.',
      endpoints: [
        {
          method: 'GET',
          path: '/api/admin/dashboard',
          desc: 'Retrieves high-level marketplace metrics for the admin control centre.'
        },
        {
          method: 'PUT',
          path: '/api/admin/companies/:companyId/verify',
          desc: 'Manually verifies a company and applies verification badges.',
          body: {
            verified: true,
            verificationBadges: ['GST Verified', 'Business Verified', 'Installer Verified', 'Top Rated']
          }
        },
        {
          method: 'GET',
          path: '/api/admin/management',
          desc: 'Retrieves operational management data (company performance, complaints, and payment tracking).'
        }
      ]
    },
    {
      id: 'marketplace',
      title: '4. Marketplace Routes',
      description: 'Browse products by category.',
      endpoints: [
        { method: 'GET', path: '/api/marketplace?category=solar-module', desc: 'Solar panels' },
        { method: 'GET', path: '/api/marketplace?category=inverter', desc: 'Inverters' },
        { method: 'GET', path: '/api/marketplace?category=cable', desc: 'Cables & connectors' },
        { method: 'GET', path: '/api/marketplace?category=structure', desc: 'Mounting structures' },
        { method: 'GET', path: '/api/marketplace?category=BOS', desc: 'Balance of System' }
      ]
    },
    {
      id: 'auth',
      title: '5. Authentication Routes',
      description: 'Register and authenticate users.',
      endpoints: [
        { method: 'POST', path: '/api/signup', desc: 'Create account. Body: { role, name, email, password }' },
        { method: 'POST', path: '/api/signin', desc: 'Sign in. Body: { method, email, password }' }
      ]
    },
    {
      id: 'home',
      title: '6. Home Routes',
      description: 'Home page content dynamically tailored to grid type.',
      endpoints: [
        { method: 'GET', path: '/api/home?type=on-grid', desc: 'On-grid home content' },
        { method: 'GET', path: '/api/home?type=off-grid', desc: 'Off-grid home content' },
        { method: 'GET', path: '/api/home?type=hybrid-grid', desc: 'Hybrid-grid home content' }
      ]
    },
    {
      id: 'main-point',
      title: '7. Core Main-Point Routes',
      description: 'Listing, Call Logs, Team Installers, and System Docs.',
      endpoints: [
        { method: 'GET', path: '/api/main-point/complain/listing', desc: 'Product/partner listing' },
        { method: 'POST', path: '/api/main-point/complain/call-log', desc: 'Store call logs' },
        { method: 'GET', path: '/api/main-point/complain/call-log', desc: 'Read stored call logs' },
        { method: 'POST', path: '/api/main-point/complain/company/:id', desc: 'Dynamically generated endpoint for listed companies' },
        { method: 'GET', path: '/api/main-point/installer/company/:id', desc: 'Installer team structure for company' },
        { method: 'GET', path: '/api/main-point/docs', desc: 'System API documentation' }
      ]
    }
  ]
}