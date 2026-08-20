# Solar E-Market

A React.js solar energy marketplace with a Node/Express API backend.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the API server (port 5000)
npm run server

# 3. In a second terminal, start the React app (port 3000)
npm run dev
```

Open http://localhost:3000

## Demo Credentials

| Role       | Email                    | Password     |
|------------|--------------------------|--------------|
| User       | demo@solarmarket.in      | demo123      |
| Seller Co  | seller@solarmarket.in    | seller123    |
| Install Co | installer@solarmarket.in | install123   |

## API Endpoints

### 1. Home Routes
- `GET /api/home?type=on-grid`
- `GET /api/home?type=off-grid`
- `GET /api/home?type=hybrid-grid`

### 2. Authentication Routes
- `POST /api/signup` — body: `{ role: 'seller-co' | 'install-co' | 'user', name, email, password, companyName?, phone? }`
- `POST /api/signin` — body: `{ method: 'O-auth' | 'JWT-auth' | 'no-password', email, password?, token? }`

### 3. Marketplace Routes
- `GET /api/marketplace?category=solar-module`
- `GET /api/marketplace?category=inverter`
- `GET /api/marketplace?category=cable`
- `GET /api/marketplace?category=structure`
- `GET /api/marketplace?category=BOS`
- `GET /api/marketplace` (all products)

### 4. Main Point (Core Dashboard) Routes
- `GET  /api/main-point/complain/listing`
- `POST /api/main-point/complain/call-log`
- `GET  /api/main-point/complain/call-log`
- `POST /api/main-point/complain/company/:id`
- `GET  /api/main-point/installer/company/:id`
- `GET  /api/main-point/docs`

## Pages

- `/` — Home with On-Grid / Off-Grid / Hybrid-Grid selector
- `/marketplace` — Category-filtered product marketplace
- `/signin` — Sign in via O-auth / JWT-auth / no-password
- `/signup` — Register as seller-co / install-co / user
- `/dashboard` — Main Point dashboard (Complain & Listing, Call Logs, Installers)
- `/docs` — API documentation

## Project Structure

```
├── server/
│   ├── index.js        # Express API server (all endpoints)
│   └── data.js         # In-memory data store
└── src/
    ├── api/client.js   # API client (fetch wrapper)
    ├── components/     # Navbar, Footer, ProductCard, Loader
    ├── context/        # AuthContext (session state)
    ├── pages/          # Home, Marketplace, SignIn, SignUp, Dashboard, Docs
    └── styles/         # Global CSS
```# fick-off
