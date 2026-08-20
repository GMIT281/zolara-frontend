// Quick smoke test for the Solar E-Market API
const base = 'http://localhost:5000'

async function t(name, fn) {
  try {
    const res = await fn()
    console.log(`✅ ${name}: ${JSON.stringify(res).slice(0, 160)}…` )
  } catch (e) {
    console.log(`❌ ${name}: ${e.message}`)
  }
}

// 1. Home routes
await t('GET /api/home?type=on-grid', () => fetch(`${base}/api/home?type=on-grid`).then(r => r.json()))
await t('GET /api/home?type=hybrid-grid', () => fetch(`${base}/api/home?type=hybrid-grid`).then(r => r.json()))

// 2. Auth
await t('POST /api/signup', () => fetch(`${base}/api/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: 'seller-co', name: 'Test Co', email: 'test@co.in', password: 'pass123' }) }).then(r => r.json()))
await t('POST /api/signin (JWT-auth)', () => fetch(`${base}/api/signin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ method: 'JWT-auth', email: 'demo@solarmarket.in', password: 'demo123' }) }).then(r => r.json()))
await t('POST /api/signin (no-password)', () => fetch(`${base}/api/signin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ method: 'no-password', email: 'magic@user.in' }) }).then(r => r.json()))

// 3. Marketplace
await t('GET /api/marketplace?category=inverter', () => fetch(`${base}/api/marketplace?category=inverter`).then(r => r.json()))
await t('GET /api/marketplace?category=BOS', () => fetch(`${base}/api/marketplace?category=BOS`).then(r => r.json()))

// 4. Main Point
await t('GET /api/main-point/complain/listing', () => fetch(`${base}/api/main-point/complain/listing`).then(r => r.json()))
await t('POST /api/main-point/complain/call-log', () => fetch(`${base}/api/main-point/complain/call-log`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ companyName: 'SunGrid', customer: 'Test Customer', issue: 'Follow up' }) }).then(r => r.json()))
await t('POST /api/main-point/complain/company/comp-1', () => fetch(`${base}/api/main-point/complain/company/comp-1`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customer: 'Test', issue: 'Delay' }) }).then(r => r.json()))
await t('GET /api/main-point/installer/company/comp-1', () => fetch(`${base}/api/main-point/installer/company/comp-1`).then(r => r.json()))
await t('GET /api/main-point/docs', () => fetch(`${base}/api/main-point/docs`).then(r => r.json()))

console.log('\nALL SMOKE TESTS COMPLETE')