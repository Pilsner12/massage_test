import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Facebook, Heart } from 'lucide-react'
import { CONTACT_INFO } from '@/utils/constants'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-text-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-display text-lg">
                M
              </div>
              <div>
                <div className="font-display text-lg font-semibold">
                  Masáže Praha
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Profesionální masáže s láskou k detailu. 
              5 let zkušeností, holistický přístup k vašemu zdraví a pohodě.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Rychlé odkazy
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Domů
                </Link>
              </li>
              <li>
                <Link 
                  to="/sluzby" 
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Služby
                </Link>
              </li>
              <li>
                <Link 
                  to="/o-mne" 
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  O mně
                </Link>
              </li>
              <li>
                <Link 
                  to="/kontakt" 
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link 
                  to="/rezervace" 
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Rezervace
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Služby
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Klasická relaxační masáž</li>
              <li className="text-gray-400">Sportovní masáž</li>
              <li className="text-gray-400">Reflexní masáž chodidel</li>
              <li className="text-gray-400">Lymfatická masáž</li>
              <li className="text-gray-400">Masáž lávovými kameny</li>
              <li className="text-gray-400">Těhotenská masáž</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Kontakt
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-6">
              <a 
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={CONTACT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Masáže Praha. Všechna práva vyhrazena.
            </p>
            <p className="flex items-center gap-2 text-gray-400 text-sm">
              Vytvořeno s
              <Heart className="w-4 h-4 fill-primary text-primary" />
              pro vaše zdraví
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
