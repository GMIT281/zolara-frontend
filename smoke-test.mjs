// ============================================================
// ENRG — Comprehensive Solar Marketplace API Smoke Test Suite
// ============================================================
const base = process.env.TEST_BASE_URL || 'http://localhost:5000'

let failed = 0
let passed = 0

async function t(name, fn) {
  try {
    const res = await fn()
    if (res?.error) {
      console.log(`❌ ${name}: Returned error -> ${res.error}`)
      failed++
    } else {
      console.log(`✅ ${name}: ${JSON.stringify(res).slice(0, 120)}…`)
      passed++
    }
  } catch (e) {
    console.log(`❌ ${name}: Exception -> ${e.message}`)
    failed++
  }
}

console.log('======================================================')
console.log('      ENRG SOLAR MARKETPLACE API SMOKE TESTS          ')
console.log('======================================================\n')

// ------------------------------------------------------------
// 1. Authentication & Onboarding
// ------------------------------------------------------------
console.log('--- 1. Authentication & Onboarding ---')

await t('POST /api/signup (User)', () =>
  fetch(`${base}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      role: 'user',
      name: 'Rohan Sharma',
      email: `rohan.${Date.now()}@example.com`,
      phone: '+91 98765 11223',
      password: 'password123'
    })
  }).then((r) => r.json())
)

await t('POST /api/signin (JWT-auth)', () =>
  fetch(`${base}/api/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method: 'JWT-auth',
      email: 'user@example.com',
      password: 'password123'
    })
  }).then((r) => r.json())
)

await t('POST /api/signin (O-auth)', () =>
  fetch(`${base}/api/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method: 'O-auth',
      email: 'oauth.tester@enrg.in',
      name: 'Google OAuth User',
      oauthProvider: 'Google'
    })
  }).then((r) => r.json())
)

await t('POST /api/signin (no-password)', () =>
  fetch(`${base}/api/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method: 'no-password',
      email: 'user@example.com'
    })
  }).then((r) => r.json())
)

await t('POST /api/customers/register', () =>
  fetch(`${base}/api/customers/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Priya Patel',
      mobile: '+91 98989 00112',
      email: 'priya.patel@example.com',
      location: 'Ahmedabad, Gujarat',
      pincode: '380015',
      propertyType: 'Residential Villa',
      electricityBillUrl: 'https://storage.enrg.in/bills/bill-test.pdf',
      approxBillAmount: 5200,
      requiredSystemSize: '5 kW',
      otp: '123456'
    })
  }).then((r) => r.json())
)

// ------------------------------------------------------------
// 2. Home & Public Routes
// ------------------------------------------------------------
console.log('\n--- 2. Home & Public Routes ---')

await t('GET /api/home?type=on-grid', () =>
  fetch(`${base}/api/home?type=on-grid`).then((r) => r.json())
)

await t('GET /api/home?type=off-grid', () =>
  fetch(`${base}/api/home?type=off-grid`).then((r) => r.json())
)

await t('GET /api/home?type=hybrid-grid', () =>
  fetch(`${base}/api/home?type=hybrid-grid`).then((r) => r.json())
)

// ------------------------------------------------------------
// 3. Customer & Project Routes
// ------------------------------------------------------------
console.log('\n--- 3. Customer & Project Routes ---')

let testProjectId = 'proj-1'
await t('POST /api/projects/request', async () => {
  const res = await fetch(`${base}/api/projects/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'Bengaluru, Karnataka',
      pincode: '560001',
      monthlyBill: '₹6,000',
      roofType: 'Residential Rooftop',
      systemPreference: 'on-grid',
      approxBudget: '₹2,60,000',
      customerName: 'Aarav Sharma',
      customerPhone: '+91 98765 00000',
      customerEmail: 'aarav@test.in'
    })
  }).then((r) => r.json())
  if (res?.projectId) testProjectId = res.projectId
  return res
})

await t(`GET /api/projects/${testProjectId}/quotes`, () =>
  fetch(`${base}/api/projects/${testProjectId}/quotes`).then((r) => r.json())
)

// ------------------------------------------------------------
// 4. Marketplace Routes
// ------------------------------------------------------------
console.log('\n--- 4. Marketplace Routes ---')

await t('GET /api/marketplace?category=solar-module', () =>
  fetch(`${base}/api/marketplace?category=solar-module`).then((r) => r.json())
)

await t('GET /api/marketplace?category=inverter', () =>
  fetch(`${base}/api/marketplace?category=inverter`).then((r) => r.json())
)

await t('GET /api/marketplace?category=cable', () =>
  fetch(`${base}/api/marketplace?category=cable`).then((r) => r.json())
)

await t('GET /api/marketplace?category=structure', () =>
  fetch(`${base}/api/marketplace?category=structure`).then((r) => r.json())
)

await t('GET /api/marketplace?category=BOS', () =>
  fetch(`${base}/api/marketplace?category=BOS`).then((r) => r.json())
)

// ------------------------------------------------------------
// 5. Company APIs (Dashboard & Lead Management)
// ------------------------------------------------------------
console.log('\n--- 5. Company APIs ---')

await t('POST /api/companies/profile', () =>
  fetch(`${base}/api/companies/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      companyId: 'comp-1',
      name: 'SunGrid Energy Solutions',
      gstCertificate: '27AAACG0123M1Z8',
      businessRegistration: 'CIN-U40106PN2012PTC145678',
      installationExperience: '12 years (45MW installed)',
      serviceLocations: ['Pune', 'Mumbai', 'Nashik'],
      products: ['Mono PERC Panels', 'String Inverters', 'BOS Kits'],
      brands: ['Tata Power', 'SolarEdge', 'Waaree'],
      pricingPackages: [
        { name: '5kW On-Grid Turnkey', price: '₹2,40,000', warranty: '5 Years' }
      ],
      completedProjectPhotos: ['https://images.unsplash.com/photo-1509391366360-2e959784a276']
    })
  }).then((r) => r.json())
)

await t('GET /api/companies/leads', () =>
  fetch(`${base}/api/companies/leads`).then((r) => r.json())
)

await t('PUT /api/companies/leads/lead-1', () =>
  fetch(`${base}/api/companies/leads/lead-1`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'Contacted',
      notes: 'Customer contacted, scheduled rooftop site survey.',
      quoteDetails: { price: '₹2,10,000', warranty: '25-Year Panel Warranty' }
    })
  }).then((r) => r.json())
)

await t('GET /api/companies/metrics', () =>
  fetch(`${base}/api/companies/metrics?companyId=comp-1`).then((r) => r.json())
)

// ------------------------------------------------------------
// 6. Main Point (Core Dashboard) Routes
// ------------------------------------------------------------
console.log('\n--- 6. Main Point Routes ---')

await t('GET /api/main-point/complain/listing', () =>
  fetch(`${base}/api/main-point/complain/listing`).then((r) => r.json())
)

await t('POST /api/main-point/complain/call-log', () =>
  fetch(`${base}/api/main-point/complain/call-log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      companyId: 'comp-1',
      customer: 'Kavita Singh',
      phone: '+91 99000 11223',
      type: 'Technical Support',
      message: 'Inquiry regarding 3.3kW inverter net metering sync.'
    })
  }).then((r) => r.json())
)

await t('POST /api/main-point/complain/company/comp-1', () =>
  fetch(`${base}/api/main-point/complain/company/comp-1`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Kavita Singh',
      phone: '+91 99000 11223',
      complaintType: 'Installation Schedule Query',
      description: 'Requesting confirmation on structure elevation.'
    })
  }).then((r) => r.json())
)

await t('GET /api/main-point/installer/company/comp-1', () =>
  fetch(`${base}/api/main-point/installer/company/comp-1`).then((r) => r.json())
)

await t('GET /api/main-point/docs', () =>
  fetch(`${base}/api/main-point/docs`).then((r) => r.json())
)

// ------------------------------------------------------------
// 7. Admin Control APIs
// ------------------------------------------------------------
console.log('\n--- 7. Admin Control APIs ---')

await t('GET /api/admin/dashboard', () =>
  fetch(`${base}/api/admin/dashboard`).then((r) => r.json())
)

await t('PUT /api/admin/companies/comp-1/verify', () =>
  fetch(`${base}/api/admin/companies/comp-1/verify`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      verified: true,
      verificationBadges: ['GST Verified', 'Business Verified', 'Installer Verified', 'Top Rated']
    })
  }).then((r) => r.json())
)

await t('GET /api/admin/management', () =>
  fetch(`${base}/api/admin/management`).then((r) => r.json())
)

console.log('\n==============================================')
console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`)
console.log('==============================================')

if (failed > 0) process.exit(1)