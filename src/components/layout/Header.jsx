import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { useIsMobile } from '@/hooks/useMediaQuery'
import Navigation from './Navigation'
import MobileMenu from './MobileMenu'
import Button from '@/components/common/Button'
import { CONTACT_INFO } from '@/utils/constants'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const location = useLocation()

  const isScrolled = typeof window !== 'undefined' && window.scrollY > 50

  return (
    <>
      {/* Top bar - Contact info */}
      {!isMobile && (
        <div className="bg-primary-light border-b border-primary/20">
          <div className="container-custom">
            <div className="flex items-center justify-between py-2 text-sm">
              <div className="flex items-center gap-6">
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{CONTACT_INFO.email}</span>
                </a>
              </div>
              <div className="text-text-secondary">
                Po-Pá: 9:00-18:00 | So: 9:00-14:00
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main header */}
      <header className="sticky top-0 z-40 bg-surface shadow-md transition-all duration-300">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-display text-xl group-hover:bg-primary-dark transition-colors">
                M
              </div>
              <div className="hidden sm:block">
                <div className="font-display text-xl font-semibold text-text-primary">
                  Masáže Praha
                </div>
                <div className="text-xs text-text-secondary">
                  S láskou k detailu
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && <Navigation />}

            {/* CTA Button */}
            {!isMobile && (
              <Link to="/rezervace">
                <Button variant="primary">
                  Rezervovat termín
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobile && (
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />
      )}

      {/* Fixed booking button on mobile */}
      {isMobile && location.pathname !== '/rezervace' && (
        <Link 
          to="/rezervace"
          className="fixed bottom-6 right-6 z-50 animate-fade-in"
        >
          <Button variant="primary" className="shadow-2xl">
            Rezervovat
          </Button>
        </Link>
      )}
    </>
  )
}

export default Header
