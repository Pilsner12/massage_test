import { NavLink } from 'react-router-dom'
import { Phone, Mail, Instagram, Facebook } from 'lucide-react'
import { clsx } from 'clsx'
import { CONTACT_INFO } from '@/utils/constants'

const MobileMenu = ({ isOpen, onClose }) => {
  const navItems = [
    { path: '/', label: 'Domů' },
    { path: '/sluzby', label: 'Služby' },
    { path: '/o-mne', label: 'O mně' },
    { path: '/kontakt', label: 'Kontakt' },
    { path: '/rezervace', label: 'Rezervace' },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-30 lg:hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="absolute top-20 left-0 right-0 bg-surface shadow-2xl animate-slide-in">
        <nav className="flex flex-col p-6 space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'text-lg font-medium py-3 px-4 rounded-lg transition-colors',
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-text-primary hover:bg-primary-light'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Contact info */}
          <div className="pt-6 border-t border-border space-y-3">
            <a 
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <a 
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>

          {/* Social media */}
          <div className="flex items-center gap-4 pt-4">
            <a 
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-primary-light hover:bg-primary hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href={CONTACT_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-primary-light hover:bg-primary hover:text-white transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MobileMenu
