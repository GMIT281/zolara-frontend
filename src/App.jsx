import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Docs from './pages/Docs'
import NotFound from './pages/NotFound'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/signin" replace />
  return children
}

function AppShell() {
  const location = useLocation()
  // Auth pages get a dedicated, chrome-free experience.
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup'
  return (
    <div className={`app-shell${isAuthPage ? ' auth-shell' : ''}`}>
      {!isAuthPage && <Navbar />}
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/docs" element={<Docs />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  )
}