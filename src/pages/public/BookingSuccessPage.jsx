import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle, Calendar, Mail, Phone, Home, ArrowRight } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import useBookingStore from '@/store/bookingStore'
import { useBooking } from '@/hooks/useBooking'
import { formatDateTime } from '@/utils/dateHelpers'
import { formatPrice } from '@/utils/formatters'

const BookingSuccessPage = () => {
  const navigate = useNavigate()
  const { 
    selectedService, 
    selectedDate, 
    selectedTime, 
    clientInfo,
    resetBooking 
  } = useBookingStore()

  const { createReservation } = useBooking()

  useEffect(() => {
    // If no booking data, redirect to booking page
    if (!selectedService || !selectedDate || !selectedTime || !clientInfo) {
      navigate('/rezervace')
      return
    }

    // Create reservation
    handleCreateReservation()
  }, [])

  const handleCreateReservation = async () => {
    const result = await createReservation(clientInfo)
    
    if (result.success) {
      toast.success('Rezervace byla úspěšně vytvořena!')
    } else {
      toast.error('Chyba při vytváření rezervace: ' + result.error)
      navigate('/rezervace')
    }
  }

  if (!selectedService || !selectedDate || !selectedTime || !clientInfo) {
    return null
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Success icon */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-success rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
              Rezervace potvrzena!
            </h1>
            <p className="text-lg text-text-secondary">
              Děkujeme za vaši rezervaci. Potvrzení jsme vám odeslali na email.
            </p>
          </div>

          {/* Reservation details */}
          <Card className="mb-6 animate-fade-in animation-delay-200">
            <h2 className="text-xl font-display font-semibold text-text-primary mb-6">
              Detaily rezervace
            </h2>

            <div className="space-y-4">
              {/* Service */}
              <div className="flex items-start gap-4 pb-4 border-b border-border">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: selectedService.color }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">
                    {selectedService.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-text-secondary mt-1">
                    <span>{selectedService.selectedVariant.duration} minut</span>
                    <span>•</span>
                    <span className="font-bold text-primary">
                      {formatPrice(selectedService.selectedVariant.price)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-text-secondary">Datum a čas</p>
                  <p className="font-semibold text-text-primary text-lg">
                    {formatDateTime(selectedDate, selectedTime)}
                  </p>
                </div>
              </div>

              {/* Client */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <p className="text-text-primary">{clientInfo.clientEmail}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <p className="text-text-primary">{clientInfo.clientPhone}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Next steps */}
          <Card className="mb-6 bg-primary-light border-2 border-primary animate-fade-in animation-delay-400">
            <h3 className="font-semibold text-text-primary mb-4">
              Co bude dál?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex-shrink-0">
                  1
                </span>
                <div>
                  <p className="font-medium text-text-primary">Email potvrzení</p>
                  <p className="text-sm text-text-secondary">
                    Obdrželi jste potvrzovací email s detaily rezervace
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex-shrink-0">
                  2
                </span>
                <div>
                  <p className="font-medium text-text-primary">Připomenutí</p>
                  <p className="text-sm text-text-secondary">
                    24 hodin před termínem vám pošleme připomínku
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex-shrink-0">
                  3
                </span>
                <div>
                  <p className="font-medium text-text-primary">Váš termín</p>
                  <p className="text-sm text-text-secondary">
                    Přijďte prosím 5 minut před začátkem
                  </p>
                </div>
              </li>
            </ul>
          </Card>

          {/* Important info */}
          <Card className="mb-8 animate-fade-in animation-delay-600">
            <h3 className="font-semibold text-text-primary mb-3">
              Důležité informace
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Adresa: Příkladná 123, 110 00 Praha 1</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Parkování dostupné v okolí (placené)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Platba v hotovosti nebo kartou na místě</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Storno do 24 hodin předem je zdarma</span>
              </li>
            </ul>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-800">
            <Link to="/" className="flex-1">
              <Button 
                variant="primary" 
                className="w-full"
                icon={<Home className="w-5 h-5" />}
                onClick={() => resetBooking()}
              >
                Zpět na hlavní stránku
              </Button>
            </Link>
            <Link to="/sluzby" className="flex-1">
              <Button 
                variant="secondary" 
                className="w-full"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={() => resetBooking()}
              >
                Prohlédnout služby
              </Button>
            </Link>
          </div>

          {/* Contact info */}
          <div className="mt-8 text-center text-sm text-text-secondary">
            <p className="mb-2">Potřebujete změnit nebo zrušit rezervaci?</p>
            <div className="flex items-center justify-center gap-4">
              <a href="tel:+420123456789" className="text-primary hover:underline">
                Zavolat
              </a>
              <span>•</span>
              <a href="mailto:info@masaze-praha.cz" className="text-primary hover:underline">
                Napsat email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingSuccessPage
