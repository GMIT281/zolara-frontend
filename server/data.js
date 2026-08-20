// ============================================================
// Solar E-Market — in-memory data store (simulates the database)
// ============================================================

export const homeContent = {
  'on-grid': {
    type: 'on-grid',
    headline: 'Stay Connected, Save More',
    subheadline: 'On-grid solar systems that slash your electricity bill while keeping you connected to the utility grid.',
    heroImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Avg. monthly savings', value: '₹4,200' },
      { label: 'Payback period', value: '3.2 yrs' },
      { label: 'CO₂ offset / year', value: '2.4 t' }
    ],
    features: [
      { title: 'Net Metering', desc: 'Export surplus power to the grid and earn credits on your bill.' },
      { title: 'Grid Priority', desc: 'Use solar first, automatically switch to grid at night or in clouds.' },
      { title: 'Lower Upfront', desc: 'No battery cost — the grid becomes your storage.' }
    ],
    products: [
      { name: '10kW On-Grid Package', price: '₹4,80,000', category: 'solar-module' },
      { name: '5kW Grid-Tie Inverter', price: '₹62,000', category: 'inverter' },
      { name: '1kW On-Grid Starter Kit', price: '₹55,000', category: 'solar-module' }
    ],
    cta: { title: 'Get a free on-grid consultation', button: 'Talk to an expert' }
  },
  'off-grid': {
    type: 'off-grid',
    headline: 'Power Wherever You Are',
    subheadline: 'Complete off-grid solar kits with battery storage for homes, farms and remote sites.',
    heroImage: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Energy independence', value: '100%' },
      { label: 'Battery backup', value: '8–12 hrs' },
      { label: 'System life', value: '25+ yrs' }
    ],
    features: [
      { title: 'Full Independence', desc: 'Generate, store and consume — zero reliance on the grid.' },
      { title: 'Reliable Backup', desc: 'Lithium battery bank keeps essentials running through outages.' },
      { title: 'Remote Ready', desc: 'Perfect for farms, resorts and off-road sites.' }
    ],
    products: [
      { name: '5kW Off-Grid Kit + 10kWh Battery', price: '₹3,20,000', category: 'solar-module' },
      { name: '48V Lithium Battery Bank', price: '₹1,80,000', category: 'BOS' },
      { name: 'Off-Grid Hybrid Inverter 3kW', price: '₹38,000', category: 'inverter' }
    ],
    cta: { title: 'Get a free off-grid system design', button: 'Design my system' }
  },
  'hybrid-grid': {
    type: 'hybrid-grid',
    headline: 'The Best of Both Worlds',
    subheadline: 'Hybrid solar systems combine grid connection with battery backup for unmatched flexibility.',
    heroImage: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Energy independence', value: '90%' },
      { label: 'Peak-shaving', value: 'Up to 70%' },
      { label: 'Backup + export', value: 'Both' }
    ],
    features: [
      { title: 'Smart Energy Mix', desc: 'Auto-switches between solar, battery and grid based on tariffs.' },
      { title: 'Outage Protection', desc: 'Battery backup kicks in within milliseconds during blackouts.' },
      { title: 'Future Ready', desc: 'Expand with more panels or batteries whenever you want.' }
    ],
    products: [
      { name: '7.5kW Hybrid System + Battery', price: '₹4,50,000', category: 'solar-module' },
      { name: 'Hybrid Inverter 5kW (HPS)', price: '₹1,10,000', category: 'inverter' },
      { name: 'Smart Energy Management Unit', price: '₹28,000', category: 'BOS' }
    ],
    cta: { title: 'Get a free hybrid system quote', button: 'Get my quote' }
  }
}
export const moduleInverterProducts = [
  // Solar Modules
  { id: 'p-101', name: 'Tata Power 550W Mono PERC Panel', category: 'solar-module', price: 10500, unit: 'per panel', brand: 'Tata Power', rating: 4.7, stock: 120, warranty: '25 yr linear', image: 'https://images.unsplash.com/photo-1611365892117-00a3e9d2a1e8?auto=format&fit=crop&w=600&q=80', desc: 'High-efficiency monocrystalline module with PERC technology for maximum yield.' },
  { id: 'p-102', name: 'Adani 540W Bifacial Module', category: 'solar-module', price: 9800, unit: 'per panel', brand: 'Adani Solar', rating: 4.6, stock: 200, warranty: '25 yr linear', image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=600&q=80', desc: 'Bifacial dual-glass panel capturing light from both sides.' },
  { id: 'p-103', name: 'Waaree 335W Poly Panel', category: 'solar-module', price: 5600, unit: 'per panel', brand: 'Waaree', rating: 4.4, stock: 340, warranty: '25 yr linear', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80', desc: 'Reliable polycrystalline panel for budget-friendly installations.' },
  { id: 'p-104', name: 'Vikram 540W TopCon Elite', category: 'solar-module', price: 11200, unit: 'per panel', brand: 'Vikram Solar', rating: 4.8, stock: 80, warranty: '30 yr power', image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80', desc: 'N-type TOPCon cell technology with industry-leading efficiency.' },

  // Inverters
  { id: 'p-201', name: 'SolarEdge SE5K 5kW Inverter', category: 'inverter', price: 62000, unit: 'per unit', brand: 'SolarEdge', rating: 4.7, stock: 45, warranty: '12 yr', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80', desc: 'Smart grid-tie inverter with built-in monitoring and rapid shutdown.' },
  { id: 'p-202', name: 'Huawei SUN2000 8kW', category: 'inverter', price: 89000, unit: 'per unit', brand: 'Huawei', rating: 4.8, stock: 30, warranty: '10 yr', image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=600&q=80', desc: 'Hybrid-ready string inverter with AFCI protection.' },
  { id: 'p-203', name: 'Sungrow 10kW Hybrid', category: 'inverter', price: 115000, unit: 'per unit', brand: 'Sungrow', rating: 4.6, stock: 25, warranty: '10 yr', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80', desc: 'Dual MPPT hybrid inverter with battery and grid support.' },
  { id: 'p-204', name: 'Microinverter 600W (pair)', category: 'inverter', price: 18500, unit: 'per pair', brand: 'Enphase', rating: 4.9, stock: 150, warranty: '25 yr', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', desc: 'Panel-level power electronics for maximum shade tolerance.' }
]
export const extraProducts = [
  // Cable
  { id: 'p-301', name: 'Solar DC Cable 4mm² (100m)', category: 'cable', price: 3200, unit: 'per roll', brand: 'Polycab', rating: 4.5, stock: 500, warranty: '25 yr', image: 'https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&w=600&q=80', desc: 'UV-resistant PV cable with tinned copper conductor.' },
  { id: 'p-302', name: 'MC4 Connector Set (20 pcs)', category: 'cable', price: 1450, unit: 'per pack', brand: 'Stäubli', rating: 4.7, stock: 800, warranty: '10 yr', image: 'https://images.unsplash.com/photo-1533230404203-ef5c8a9d3a5c?auto=format&fit=crop&w=600&q=80', desc: 'Multi-contact connectors with IP67 water resistance.' },
  { id: 'p-303', name: 'AC Armoured Cable 6mm² (90m)', category: 'cable', price: 6800, unit: 'per roll', brand: 'KEI', rating: 4.4, stock: 210, warranty: '15 yr', image: 'https://images.unsplash.com/photo-1562411052-b0de3c4b35e4?auto=format&fit=crop&w=600&q=80', desc: 'Heavy-duty armoured cable for outdoor AC runs.' },
  { id: 'p-304', name: 'Cable Gland Kit (10 pcs)', category: 'cable', price: 850, unit: 'per pack', brand: 'Legrand', rating: 4.3, stock: 620, warranty: '5 yr', image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80', desc: 'Weatherproof cable glands for junction boxes and combiner.' },

  // Structure
  { id: 'p-401', name: 'Rooftop Mounting Kit (10kW)', category: 'structure', price: 25000, unit: 'per kit', brand: 'Strolar', rating: 4.6, stock: 65, warranty: '25 yr', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80', desc: 'Galvanised steel rooftop structure with full set of clamps.' },
  { id: 'p-402', name: 'Ground Mount Frame (6kW)', category: 'structure', price: 34000, unit: 'per kit', brand: 'Vasudha', rating: 4.5, stock: 40, warranty: '20 yr', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80', desc: 'Tilt-adjustable ground frame for high wind zones.' },
  { id: 'p-403', name: 'Solar Panel Cleaning Kit', category: 'structure', price: 2200, unit: 'per kit', brand: 'Hindustan', rating: 4.2, stock: 300, warranty: '2 yr', image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=600&q=80', desc: 'Telescopic brush, wiper and squeegee for panel upkeep.' },
  { id: 'p-404', name: 'Channel & Clamp Set (100 pcs)', category: 'structure', price: 9600, unit: 'per set', brand: 'Strolar', rating: 4.4, stock: 90, warranty: '10 yr', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80', desc: 'Mixed channel lengths and end/mid clamps for rail systems.' },
  // BOS (Balance of System)
  { id: 'p-501', name: 'Combiner Box 4-String', category: 'BOS', price: 7800, unit: 'per unit', brand: 'Kosam', rating: 4.5, stock: 140, warranty: '10 yr', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80', desc: 'IP65 combiner with DC isolator and surge protection.' },
  { id: 'p-502', name: 'Lightning Arrester Set', category: 'BOS', price: 5400, unit: 'per set', brand: 'OBO Bettermann', rating: 4.6, stock: 75, warranty: '10 yr', image: 'https://images.unsplash.com/photo-1562813733-b31f71025d54?auto=format&fit=crop&w=600&q=80', desc: 'Class-2 surge protection for DC & AC sides.' },
  { id: 'p-503', name: 'Smart Meter WiFi', category: 'BOS', price: 6800, unit: 'per unit', brand: 'Genus', rating: 4.3, stock: 260, warranty: '5 yr', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80', desc: 'Two-way net-metering with live app monitoring.' },
  { id: 'p-504', name: 'Monitoring Gateway + CT', category: 'BOS', price: 9200, unit: 'per unit', brand: 'SolarEdge', rating: 4.7, stock: 55, warranty: '10 yr', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80', desc: 'Wireless gateway with current transformers for production tracking.' }
]
export const marketplaceProducts = [...moduleInverterProducts, ...extraProducts]
export const companies = [
  {
    id: 'comp-1',
    name: 'SunGrid Energy Solutions',
    type: 'install-co',
    verified: true,
    rating: 4.8,
    location: 'Pune, Maharashtra',
    employees: 120,
    projectsDone: 340,
    founded: 2012,
    services: ['On-Grid', 'Off-Grid', 'Hybrid', 'O&M'],
    teams: {
      'Team 1': [
        { name: 'Rahul Sharma', role: 'Team Lead', cert: 'MNRE Certified', phone: '+91 98200 11223' },
        { name: 'Amit Patel', role: 'Solar Technician', cert: 'Level 2', phone: '+91 98200 11224' },
        { name: 'Vikram Singh', role: 'Electrician', cert: 'Licensed', phone: '+91 98200 11225' }
      ],
      'Team 2': [
        { name: 'Priya Nair', role: 'Project Engineer', cert: 'B.E. Electrical', phone: '+91 98200 11226' },
        { name: 'Suresh Kumar', role: 'Installer', cert: 'Level 1', phone: '+91 98200 11227' },
        { name: 'Ravi Menon', role: 'Electrician', cert: 'Licensed', phone: '+91 98200 11228' }
      ],
      'Team 3': [
        { name: 'Kavita Joshi', role: 'Design Engineer', cert: 'Solar PV Design', phone: '+91 98200 11229' },
        { name: 'Manoj Gupta', role: 'Site Supervisor', cert: 'Safety Officer', phone: '+91 98200 11230' }
      ]
    },
    list: [
      { title: 'Complete On-Grid Installation 5kW', price: '₹1,85,000', duration: '3 days', warranty: '5 yr' },
      { title: 'Off-Grid System with Battery 3kW', price: '₹1,60,000', duration: '4 days', warranty: '3 yr' },
      { title: 'Hybrid Upgrade Package', price: '₹2,40,000', duration: '5 days', warranty: '5 yr' }
    ]
  },
  {
    id: 'comp-2',
    name: 'GreenVolt Industries',
    type: 'install-co',
    verified: true,
    rating: 4.6,
    location: 'Bengaluru, Karnataka',
    employees: 85,
    projectsDone: 210,
    founded: 2015,
    services: ['On-Grid', 'Rooftop', 'C&I', 'Monitoring'],
    teams: {
      'Team 1': [
        { name: 'Arjun Reddy', role: 'Team Lead', cert: 'MNRE Certified', phone: '+91 98450 33441' },
        { name: 'Nikhil Gowda', role: 'Installer', cert: 'Level 2', phone: '+91 98450 33442' },
        { name: 'Sanjay Rao', role: 'Electrician', cert: 'Licensed', phone: '+91 98450 33443' }
      ],
      'Team 2': [
        { name: 'Divya Shetty', role: 'Project Manager', cert: 'PMP', phone: '+91 98450 33444' },
        { name: 'Prakash Hegde', role: 'Technician', cert: 'Level 1', phone: '+91 98450 33445' }
      ],
      'Team 3': [
        { name: 'Lakshmi Kulkarni', role: 'Solar Engineer', cert: 'B.Tech', phone: '+91 98450 33446' },
        { name: 'Rohit Desai', role: 'Installer', cert: 'Level 1', phone: '+91 98450 33447' }
      ]
    },
    list: [
      { title: 'Rooftop Solar Installation 10kW', price: '₹3,60,000', duration: '6 days', warranty: '5 yr' },
      { title: 'C&I Rooftop System 50kW', price: '₹16,50,000', duration: '15 days', warranty: '7 yr' }
    ]
  }
]
export const company3 = {
  id: 'comp-3',
  name: 'TerraSun Renewables',
  type: 'seller-co',
  verified: true,
  rating: 4.5,
  location: 'Jaipur, Rajasthan',
  employees: 50,
  projectsDone: 145,
  founded: 2018,
  services: ['Equipment Supply', 'Financing', 'EPC'],
  teams: {
    'Team 1': [
      { name: 'Harsh Vardhan', role: 'Sales Lead', cert: '—', phone: '+91 94140 22331' },
      { name: 'Neha Agarwal', role: 'Account Manager', cert: '—', phone: '+91 94140 22332' }
    ],
    'Team 2': [
      { name: 'Mohit Jain', role: 'Logistics Head', cert: '—', phone: '+91 94140 22333' },
      { name: 'Simran Kaur', role: 'Warehouse Incharge', cert: '—', phone: '+91 94140 22334' }
    ],
    'Team 3': [
      { name: 'Deepak Choudhary', role: 'Finance Executive', cert: 'CA', phone: '+91 94190 22335' },
      { name: 'Ankit Meena', role: 'Delivery Coordinator', cert: '—', phone: '+91 94190 22336' }
    ]
  },
  list: [
    { title: 'Module + Inverter Supply (5kW)', price: '₹2,20,000', duration: '2 days', warranty: '10 yr' },
    { title: 'Full BOS Kit Supply', price: '₹1,05,000', duration: '1 day', warranty: '5 yr' }
  ]
}

export const allCompanies = [...companies, company3]

export const callLogs = []

export const users = [
  { id: 'u-1', role: 'user', name: 'Demo User', email: 'demo@solarmarket.in', password: 'demo123', method: 'JWT-auth' },
  { id: 'u-2', role: 'seller-co', name: 'ACME Solar Co', email: 'seller@solarmarket.in', password: 'seller123', method: 'JWT-auth' },
  { id: 'u-3', role: 'install-co', name: 'SunGrid Energy', email: 'installer@solarmarket.in', password: 'install123', method: 'JWT-auth' }
]
export const installersResponse = {
  'Team 1': {
    name: 'Team 1',
    lead: 'Rahul Sharma',
    members: [
      { name: 'Rahul Sharma', role: 'Team Lead', cert: 'MNRE Certified', phone: '+91 98200 11223' },
      { name: 'Amit Patel', role: 'Solar Technician', cert: 'Level 2', phone: '+91 98200 11224' },
      { name: 'Vikram Singh', role: 'Electrician', cert: 'Licensed', phone: '+91 98200 11225' }
    ]
  },
  'Team 2': {
    name: 'Team 2',
    lead: 'Priya Nair',
    members: [
      { name: 'Priya Nair', role: 'Project Engineer', cert: 'B.E. Electrical', phone: '+91 98200 11226' },
      { name: 'Suresh Kumar', role: 'Installer', cert: 'Level 1', phone: '+91 98200 11227' },
      { name: 'Ravi Menon', role: 'Electrician', cert: 'Licensed', phone: '+91 98200 11228' }
    ]
  },
  'Team 3': {
    name: 'Team 3',
    lead: 'Kavita Joshi',
    members: [
      { name: 'Kavita Joshi', role: 'Design Engineer', cert: 'Solar PV Design', phone: '+91 98200 11229' },
      { name: 'Manoj Gupta', role: 'Site Supervisor', cert: 'Safety Officer', phone: '+91 98200 11230' }
    ]
  }
}

export const apiDocs = {
  name: 'Solar E-Market API',
  version: '1.0.0',
  baseUrl: '/api',
  sections: [
    {
      id: 'home',
      title: 'Home Routes',
      description: 'Home page content varies by system type.',
      endpoints: [
        { method: 'GET', path: '/api/home?type=on-grid', desc: 'On-grid home content', params: [['type', 'on-grid | off-grid | hybrid-grid']] },
        { method: 'GET', path: '/api/home?type=off-grid', desc: 'Off-grid home content' },
        { method: 'GET', path: '/api/home?type=hybrid-grid', desc: 'Hybrid-grid home content' }
      ]
    },
    {
      id: 'auth',
      title: 'Authentication Routes',
      description: 'Register and authenticate users.',
      endpoints: [
        { method: 'POST', path: '/api/signup', desc: 'Create account. Body: { role: seller-co | install-co | user, ...userDetails }', body: { role: 'seller-co', name: 'ACME Solar', email: 'acme@example.com', password: '****' } },
        { method: 'POST', path: '/api/signin', desc: 'Sign in. Body: { method: O-auth | JWT-auth | no-password, ...credentials }', body: { method: 'JWT-auth', email: 'demo@solarmarket.in', password: 'demo123' } }
      ]
    },
    {
      id: 'marketplace',
      title: 'Marketplace Routes',
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
      id: 'main-point',
      title: 'Main Point (Core Dashboard) Routes',
      description: 'Complain & Listing, Installers, Documentation.',
      endpoints: [
        { method: 'GET', path: '/api/main-point/complain/listing', desc: 'Product listing only (no complex API generation)' },
        { method: 'POST', path: '/api/main-point/complain/call-log', desc: 'Store call logs', body: { companyId: 'comp-1', customer: 'Name', note: 'Follow-up call' } },
        { method: 'POST', path: '/api/main-point/complain/company/:id', desc: 'Dynamically generated endpoint for listed companies' },
        { method: 'GET', path: '/api/main-point/installer/company/:id', desc: 'Returns arrays/objects for Team 1, Team 2, Team 3' },
        { method: 'GET', path: '/api/main-point/docs', desc: 'Retrieves API or system documentation' }
      ]
    }
  ]
}