// ============================================================
// ENRG — Solar Marketplace Data Store
// ============================================================

export const homeContent = {
  'on-grid': {
    type: 'on-grid',
    headline: 'Stay Connected, Slash Electricity Bills',
    subheadline: 'On-grid solar systems connected to the utility grid with bi-directional net metering. Claim up to ₹78,000 PM Surya Ghar subsidy.',
    heroImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Avg. Monthly Savings', value: '₹4,500' },
      { label: 'Payback Period', value: '3.2 Years' },
      { label: 'CO₂ Offset / Year', value: '4.8 Tons' }
    ],
    features: [
      'Net Metering: Export surplus solar units to the grid and earn credits.',
      'Discom Grid Priority: Seamless auto-switching with 100% bill offset.',
      'Lowest Upfront Capex: Zero battery cost — the grid acts as your infinite storage.'
    ],
    products: [
      { name: '3.3 kW Surya Ghar Kit', price: '₹1,45,000', category: 'on-grid' },
      { name: '5 kW Smart Grid Package', price: '₹2,20,000', category: 'on-grid' }
    ],
    cta: { title: 'Get a free on-grid consultation', button: 'Talk to an expert' }
  },
  'off-grid': {
    type: 'off-grid',
    headline: 'Total Energy Independence Anywhere',
    subheadline: 'Complete standalone solar kits with LiFePO4 battery storage for homes, farmhouses, resorts and remote locations.',
    heroImage: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Energy Independence', value: '100%' },
      { label: 'Battery Backup', value: '14+ Hours' },
      { label: 'System Life', value: '25 Years' }
    ],
    features: [
      'Full Autonomy: Generate, store, and consume 100% off-grid clean power.',
      'High-Density LiFePO4 Battery: Safe lithium storage with 6000+ life cycles.',
      'Remote-Ready Architecture: Built for reliable off-road and rural installations.'
    ],
    products: [
      { name: '3 kW Off-Grid Home ESS', price: '₹2,10,000', category: 'off-grid' },
      { name: '5 kW Farm Microgrid Kit', price: '₹3,40,000', category: 'off-grid' }
    ],
    cta: { title: 'Get a free off-grid system design', button: 'Design my system' }
  },
  'hybrid-grid': {
    type: 'hybrid-grid',
    headline: 'The Ultimate Flexibility & Zero Outages',
    subheadline: 'Hybrid solar systems combining grid connection, net metering, and lithium battery backup for uninterruptible power.',
    heroImage: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Grid Export + Backup', value: 'Active' },
      { label: 'Peak-Shaving', value: '35% Saved' },
      { label: 'Cutover Time', value: '< 10 ms' }
    ],
    features: [
      'Smart Multi-Source Mix: Automatically routes power between Solar, Battery, and Grid.',
      'Zero-Delay Outage Protection: Sub-10ms switchover keeps computers and ACs running.',
      'Export & Monetize: Export daytime surplus while maintaining evening battery reserve.'
    ],
    products: [
      { name: '5 kW Smart Hybrid System', price: '₹2,85,000', category: 'hybrid-grid' },
      { name: '10 kW Commercial Hybrid', price: '₹5,60,000', category: 'hybrid-grid' }
    ],
    cta: { title: 'Get a free hybrid system quote', button: 'Get my quote' }
  }
}

// Marketplace catalog seeded with high-quality items for all 5 categories
export const marketplaceProducts = [
  // 1. solar-module
  {
    id: 'prod-mod-1',
    name: 'Tata Power 550W Mono-PERC Bifacial Module',
    category: 'solar-module',
    brand: 'Tata Solar',
    price: '₹14,850',
    numericPrice: 14850,
    rating: 4.9,
    reviews: 142,
    specs: '550W • Bifacial • 21.4% Efficiency • 25-Yr Warranty',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-mod-2',
    name: 'Adani Solar 545W TOPCon Glass-Glass Panel',
    category: 'solar-module',
    brand: 'Adani Solar',
    price: '₹15,200',
    numericPrice: 15200,
    rating: 4.8,
    reviews: 98,
    specs: '545W • TOPCon Cell • 22.1% Efficiency • ALMM Listed',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-mod-3',
    name: 'Waaree 540W Mono-Crystalline Half-Cut Panel',
    category: 'solar-module',
    brand: 'Waaree',
    price: '₹13,900',
    numericPrice: 13900,
    rating: 4.7,
    reviews: 115,
    specs: '540W • IP68 Junction Box • Anti-PID • Tier-1 Quality',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=600&q=80'
  },

  // 2. inverter
  {
    id: 'prod-inv-1',
    name: 'Growatt 5kW Dual-MPPT On-Grid Smart Inverter',
    category: 'inverter',
    brand: 'Growatt',
    price: '₹42,500',
    numericPrice: 42500,
    rating: 4.9,
    reviews: 87,
    specs: '5kW • 98.4% Efficiency • Built-in Wi-Fi • 10-Yr Warranty',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-inv-2',
    name: 'Deye 6kW Hybrid Inverter with Battery Port',
    category: 'inverter',
    brand: 'Deye',
    price: '₹68,000',
    numericPrice: 68000,
    rating: 4.8,
    reviews: 64,
    specs: '6kW • 48V Low Voltage Battery Port • Generator Auto-Start',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1558441719-8b5982a03784?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-inv-3',
    name: 'Havells 3.3kW Single Phase Net-Metering Inverter',
    category: 'inverter',
    brand: 'Havells',
    price: '₹31,000',
    numericPrice: 31000,
    rating: 4.7,
    reviews: 52,
    specs: '3.3kW • PM Surya Ghar Compatible • Discom Approved',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80'
  },

  // 3. cable
  {
    id: 'prod-cab-1',
    name: 'Polycab 4 sq.mm UV Resistant Solar DC Cable (100m)',
    category: 'cable',
    brand: 'Polycab',
    price: '₹4,200',
    numericPrice: 4200,
    rating: 4.9,
    reviews: 210,
    specs: '4 sq.mm • TUV 2PfG 1169 Certified • Halogen Free • 1500V DC',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-cab-2',
    name: 'Havells 6 sq.mm XLPO Insulated DC Cable (100m)',
    category: 'cable',
    brand: 'Havells',
    price: '₹5,800',
    numericPrice: 5800,
    rating: 4.8,
    reviews: 130,
    specs: '6 sq.mm • High Conductivity Copper • Flame Retardant',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
  },

  // 4. structure
  {
    id: 'prod-str-1',
    name: 'Galvanized HDG Aluminum Rooftop Mounting Structure (3kW)',
    category: 'structure',
    brand: 'ENRG Struct',
    price: '₹12,500',
    numericPrice: 12500,
    rating: 4.9,
    reviews: 78,
    specs: '80 Micron Hot-Dip Galvanized • 150 km/h Wind Rated • 15-Yr Warranty',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-str-2',
    name: 'Elevated High-Rise Rooftop Solar Structure (5kW)',
    category: 'structure',
    brand: 'ENRG Struct',
    price: '₹24,000',
    numericPrice: 24000,
    rating: 4.8,
    reviews: 45,
    specs: 'Elevated 8ft Walkable Design • Heavy Duty Steel • Anti-Corrosive',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
  },

  // 5. BOS (Balance of System)
  {
    id: 'prod-bos-1',
    name: '1-In 1-Out DC Distribution Box (AJB/DCDB) with SPD',
    category: 'BOS',
    brand: 'ENRG Electric',
    price: '₹3,400',
    numericPrice: 3400,
    rating: 4.9,
    reviews: 95,
    specs: 'Type-2 SPD • 1000V DC Fuse • IP65 Weatherproof Enclosure',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-bos-2',
    name: '3-Phase AC Distribution Box (ACDB) with MCB & Isolator',
    category: 'BOS',
    brand: 'ENRG Electric',
    price: '₹4,900',
    numericPrice: 4900,
    rating: 4.8,
    reviews: 62,
    specs: 'Schneider MCB • Class II Surge Protection • Discom Compliant',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
  }
]

// Companies & teams store
export const allCompanies = [
  {
    id: 'comp-1',
    name: 'SunGrid Energy Solutions',
    type: 'install-co',
    verified: true,
    rating: 4.9,
    experience: '8+ Years',
    installationExperience: '8+ Years',
    serviceLocations: ['Jaipur', 'Delhi NCR', 'Pune', 'Ahmedabad'],
    employees: 45,
    projectsDone: 820,
    verificationBadges: ['GST Verified', 'Business Verified', 'Installer Verified', 'Top Rated'],
    products: ['On-Grid Solar', 'Commercial EPC', 'LiFePO4 Storage'],
    brands: ['Tata Solar', 'Growatt', 'Polycab'],
    pricingPackages: [
      { name: '3.3 kW Rooftop Net-Metering', price: '₹1,45,000', duration: '5 Days', warranty: '5-Yr Workmanship' },
      { name: '5 kW Complete Hybrid Package', price: '₹2,65,000', duration: '7 Days', warranty: '5-Yr Workmanship' }
    ],
    list: [
      { title: '3.3 kW Rooftop Net-Metering', price: '₹1,45,000', duration: '5 Days', warranty: '5-Yr Workmanship' },
      { title: '5 kW Complete Hybrid Package', price: '₹2,65,000', duration: '7 Days', warranty: '5-Yr Workmanship' }
    ],
    teams: {
      team1: { lead: 'Vikram Singh', members: 4, area: 'North Zone', phone: '+91 98111 22334' },
      team2: { lead: 'Amit Sharma', members: 5, area: 'West Zone', phone: '+91 98222 33445' },
      team3: { lead: 'Karan Patel', members: 3, area: 'South Zone', phone: '+91 98333 44556' }
    }
  },
  {
    id: 'comp-2',
    name: 'VoltWave Solar EPC',
    type: 'install-co',
    verified: true,
    rating: 4.8,
    experience: '6+ Years',
    installationExperience: '6+ Years',
    serviceLocations: ['Bengaluru', 'Chennai', 'Hyderabad'],
    employees: 32,
    projectsDone: 510,
    verificationBadges: ['GST Verified', 'Installer Verified', 'Top Rated'],
    products: ['Commercial Solar', 'Hybrid ESS'],
    brands: ['Adani Solar', 'Deye', 'Havells'],
    pricingPackages: [
      { name: '5 kW On-Grid Surya Package', price: '₹2,15,000', duration: '6 Days', warranty: '5-Yr Workmanship' }
    ],
    list: [
      { title: '5 kW On-Grid Surya Package', price: '₹2,15,000', duration: '6 Days', warranty: '5-Yr Workmanship' }
    ],
    teams: {
      team1: { lead: 'Manoj Kumar', members: 4, area: 'East Hub', phone: '+91 98444 55667' }
    }
  }
]

export const companies = allCompanies
export const company3 = allCompanies[0]

// Communication & call logs
export const callLogs = [
  {
    id: 'cl-1',
    companyId: 'comp-1',
    companyName: 'SunGrid Energy Solutions',
    customer: 'Rajesh Sharma',
    phone: '+91 98765 43210',
    type: 'Inquiry',
    message: 'Customer requested site visit for 5kW hybrid installation in Jaipur.',
    status: 'Completed',
    date: new Date().toISOString()
  }
]

// User accounts
export const users = [
  {
    id: 'u-1',
    role: 'user',
    name: 'Aarav Sharma',
    email: 'user@example.com',
    phone: '+91 98765 43210',
    password: 'password123',
    method: 'JWT-auth'
  },
  {
    id: 'u-2',
    role: 'seller-co',
    name: 'SunGrid Energy Solutions',
    email: 'seller@example.com',
    phone: '+91 98111 22334',
    password: 'password123',
    companyId: 'comp-1',
    method: 'JWT-auth'
  }
]

// Customer profiles
export const customers = [
  {
    id: 'cust-1',
    name: 'Aarav Sharma',
    mobile: '+91 98765 43210',
    email: 'aarav.sharma@example.com',
    location: 'Jaipur, Rajasthan',
    pincode: '302001',
    propertyType: 'Residential Villa',
    electricityBillUrl: '',
    approxBillAmount: 4800,
    requiredSystemSize: '5 kW',
    otpVerified: true,
    createdAt: new Date().toISOString()
  }
]

// Project requests
export const projects = [
  {
    id: 'proj-1',
    customerId: 'cust-1',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98765 43210',
    customerEmail: 'aarav.sharma@example.com',
    location: 'Jaipur, Rajasthan',
    pincode: '302001',
    monthlyBill: '₹4,800',
    propertyType: 'Residential Villa',
    systemPreference: 'on-grid',
    approxBudget: '₹2,20,000',
    status: 'open',
    createdAt: new Date().toISOString()
  }
]

// Quotations
export const quotes = [
  {
    id: 'quote-1',
    projectId: 'proj-1',
    companyId: 'comp-1',
    company: 'SunGrid Energy Solutions',
    rating: 4.9,
    experience: '8+ Years',
    estimatedPrice: '₹2,10,000',
    warranty: '25-Year Panel / 10-Yr Inverter / 5-Yr Installation',
    verified: true,
    verificationBadges: ['GST Verified', 'Installer Verified', 'Top Rated'],
    packageTitle: '5 kW Premium Mono-PERC On-Grid Package',
    details: 'Includes Tata 550W panels, Growatt dual-MPPT inverter, complete discom net-meter liaisoning.',
    status: 'submitted'
  }
]

// Leads pipeline
export const leads = [
  {
    id: 'lead-1',
    companyId: 'comp-1',
    projectId: 'proj-1',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98765 43210',
    customerEmail: 'aarav.sharma@example.com',
    location: 'Jaipur, Rajasthan',
    pincode: '302001',
    monthlyBill: '₹4,800',
    requiredSize: '5 kW',
    status: 'Contacted',
    subStatus: 'Contacted',
    quoteDetails: {
      price: '₹2,10,000',
      warranty: '25 Years',
      notes: 'Site survey scheduled for tomorrow.'
    },
    createdAt: new Date().toISOString()
  }
]

// Payment tracking
export const paymentTracking = [
  {
    id: 'pay-1',
    projectId: 'proj-1',
    customerName: 'Aarav Sharma',
    companyId: 'comp-1',
    companyName: 'SunGrid Energy Solutions',
    projectValue: 210000,
    commissionRate: '4%',
    commissionEarned: 8400,
    paymentStatus: 'Paid',
    paidAt: new Date().toISOString(),
    payoutRef: 'PAY-REC-991024'
  }
]

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
  const contacted = compLeads.filter((l) => ['Contacted', 'Site Visit', 'Quote Submitted', 'Won/Lost', 'Won'].includes(l?.status)).length
  const siteVisits = compLeads.filter((l) => ['Site Visit', 'Quote Submitted', 'Won/Lost', 'Won'].includes(l?.status)).length
  const quotesSubmitted = compLeads.filter((l) => ['Quote Submitted', 'Won/Lost', 'Won'].includes(l?.status)).length
  const projectsWon = compLeads.filter((l) => l?.subStatus === 'Won' || l?.status === 'Won').length

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
  name: 'ENRG Solar Marketplace API',
  version: '2.0.0',
  tagline: 'POWERING A BETTER TOMORROW',
  baseUrl: '/api',
  sections: [
    {
      id: 'auth',
      title: '1. Authentication & Onboarding',
      description: 'Account creation, multi-method sign in, and customer onboarding.',
      endpoints: [
        {
          method: 'POST',
          path: '/api/signup',
          desc: 'Creates a new user, installer, or seller account.',
          body: { role: 'seller-co | install-co | user', name: '', email: '', password: '', phone: '' }
        },
        {
          method: 'POST',
          path: '/api/signin',
          desc: 'Authenticates a user via O-auth, JWT-auth, or no-password method.',
          body: { method: 'O-auth | JWT-auth | no-password', email: '', password: '' }
        },
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
            requiredSystemSize: '',
            otp: ''
          }
        }
      ]
    },
    {
      id: 'home',
      title: '2. Home & Public Routes',
      description: 'Public landing page configurations per solar system type.',
      endpoints: [
        { method: 'GET', path: '/api/home?type=on-grid', desc: 'On-grid net-metering configuration & statistics.' },
        { method: 'GET', path: '/api/home?type=off-grid', desc: 'Off-grid battery standalone configuration.' },
        { method: 'GET', path: '/api/home?type=hybrid-grid', desc: 'Hybrid grid + storage configuration.' }
      ]
    },
    {
      id: 'projects',
      title: '3. Customer & Project Routes',
      description: 'Submit solar quote project requests and retrieve comparison quotes.',
      endpoints: [
        {
          method: 'POST',
          path: '/api/projects/request',
          desc: 'Submits the main "Get Solar Quote" form to generate a project request.',
          body: {
            location: '',
            monthlyBill: '',
            propertyType: '',
            systemPreference: 'on-grid | off-grid | hybrid-grid',
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
      id: 'marketplace',
      title: '4. Marketplace Routes',
      description: 'Browse certified solar equipment catalog filtered by category.',
      endpoints: [
        { method: 'GET', path: '/api/marketplace?category=solar-module', desc: 'Mono-PERC and TOPCon solar modules.' },
        { method: 'GET', path: '/api/marketplace?category=inverter', desc: 'On-grid, off-grid, and hybrid inverters.' },
        { method: 'GET', path: '/api/marketplace?category=cable', desc: 'TUV certified 4 sq.mm and 6 sq.mm DC cables.' },
        { method: 'GET', path: '/api/marketplace?category=structure', desc: 'Galvanized aluminum rooftop mounting structures.' },
        { method: 'GET', path: '/api/marketplace?category=BOS', desc: 'ACDB, DCDB, SPDs, and Balance of System electricals.' }
      ]
    },
    {
      id: 'company',
      title: '5. Company APIs (Dashboard & Lead Management)',
      description: 'Manage installer profile, leads pipeline, status progression, and sales funnel metrics.',
      endpoints: [
        {
          method: 'POST',
          path: '/api/companies/profile',
          desc: 'Creates or updates a company profile with GST, registration, services, and packages.',
          body: {
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
          desc: 'Retrieves the list of available customer leads and project history.'
        },
        {
          method: 'PUT',
          path: '/api/companies/leads/:leadId',
          desc: 'Updates lead pipeline status or submits a quotation.',
          body: {
            status: 'Accept/Reject | Contacted | Site Visit | Quote Submitted | Won/Lost',
            quoteDetails: { price: '', warranty: '', notes: '' }
          }
        },
        {
          method: 'GET',
          path: '/api/companies/metrics',
          desc: 'Fetches sales funnel totals for Leads, Contacted, Site Visits, Quotes, and Projects Won.'
        }
      ]
    },
    {
      id: 'main-point',
      title: '6. Main Point (Core Dashboard) Routes',
      description: 'Product listing, call logs, company complaints, installer teams, and API docs.',
      endpoints: [
        { method: 'GET', path: '/api/main-point/complain/listing', desc: 'Product & package listing only.' },
        { method: 'POST', path: '/api/main-point/complain/call-log', desc: 'Stores customer call interaction logs.' },
        { method: 'POST', path: '/api/main-point/complain/company/:id', desc: 'Logs a customer complaint against a company.' },
        { method: 'GET', path: '/api/main-point/installer/company/:id', desc: 'Returns installation teams for Team 1, Team 2, Team 3.' },
        { method: 'GET', path: '/api/main-point/docs', desc: 'Retrieves complete API and system documentation.' }
      ]
    },
    {
      id: 'admin',
      title: '7. Admin Control APIs',
      description: 'Marketplace-wide analytics, company verification badges, and ledger tracking.',
      endpoints: [
        { method: 'GET', path: '/api/admin/dashboard', desc: 'Retrieves high-level platform metrics.' },
        {
          method: 'PUT',
          path: '/api/admin/companies/:companyId/verify',
          desc: 'Manually verifies a company and applies verification badges.',
          body: { verified: true, verificationBadges: ['GST Verified', 'Business Verified', 'Installer Verified', 'Top Rated'] }
        },
        { method: 'GET', path: '/api/admin/management', desc: 'Retrieves company performance, complaints, and commissions.' }
      ]
    }
  ]
}