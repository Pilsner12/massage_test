import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Layouts
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AdminLayout from '@/components/admin/layout/AdminLayout'

// Public pages
import HomePage from '@/pages/public/HomePage'
import ServicesPage from '@/pages/public/ServicesPage'
import AboutPage from '@/pages/public/AboutPage'
import ContactPage from '@/pages/public/ContactPage'
import BookingPage from '@/pages/public/BookingPage'
import BookingSuccessPage from '@/pages/public/BookingSuccessPage'

// Admin pages
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminReservations from '@/pages/admin/AdminReservations'
import AdminCalendar from '@/pages/admin/AdminCalendar'
import AdminSettings from '@/pages/admin/AdminSettings'

// Protected route
import ProtectedRoute from '@/components/common/ProtectedRoute'

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#2C2C2C',
          },
          success: {
            iconTheme: {
              primary: '#4CAF50',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#F44336',
              secondary: '#fff',
            },
          },
        }}
      />

      <Routes>
        {/* Public routes with layout */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="sluzby" element={<ServicesPage />} />
          <Route path="o-mne" element={<AboutPage />} />
          <Route path="kontakt" element={<ContactPage />} />
          <Route path="rezervace" element={<BookingPage />} />
          <Route path="rezervace/uspech" element={<BookingSuccessPage />} />
        </Route>

        {/* Admin login (no layout) */}
        <Route path="admin/login" element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route path="admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="rezervace" element={<AdminReservations />} />
            <Route path="kalendar" element={<AdminCalendar />} />
            <Route path="nastaveni" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

// Public layout wrapper
const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

// 404 page
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-text-secondary mb-8">Stránka nebyla nalezena</p>
      <a href="/" className="btn btn-primary">
        Zpět na hlavní stránku
      </a>
    </div>
  </div>
)

export default App
