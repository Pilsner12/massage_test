import { Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, Phone } from 'lucide-react'
import Button from '@/components/common/Button'
import { CONTACT_INFO } from '@/utils/constants'

const QuickBooking = () => {
  return (
    <section className="py-20 bg-surface">
      <div className="container-custom">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
              Objednejte se ještě dnes
            </h2>
            <p className="text-lg mb-10 opacity-90">
              Dopřejte si chvíli relaxace a regenerace. Rezervace je jednoduchá a rychlá.
            </p>

            {/* Quick info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="flex flex-col items-center gap-2">
                <Calendar className="w-8 h-8" />
                <span className="text-sm">Volné termíny</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock className="w-8 h-8" />
                <span className="text-sm">Po-So</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MapPin className="w-8 h-8" />
                <span className="text-sm">Praha 1</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Phone className="w-8 h-8" />
                <span className="text-sm">{CONTACT_INFO.phone}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/rezervace">
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Online rezervace
                </Button>
              </Link>
              <a href={`tel:${CONTACT_INFO.phone}`}>
                <Button variant="ghost" size="lg" className="text-white border-2 border-white hover:bg-white/10">
                  Zavolat
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickBooking
