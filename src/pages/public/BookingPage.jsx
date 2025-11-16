import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import BookingForm from '@/components/booking/BookingForm'
import useBookingStore from '@/store/bookingStore'

const BookingPage = () => {
  const location = useLocation()
  const setSelectedService = useBookingStore((state) => state.setSelectedService)

  useEffect(() => {
    // If service was passed via navigation state, pre-select it
    if (location.state?.selectedService) {
      setSelectedService(location.state.selectedService)
    }
  }, [location.state, setSelectedService])

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-text-primary mb-6">
            Rezervace termínu
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Vyberte si službu, datum a čas, který vám vyhovuje. Rezervace trvá jen pár minut.
          </p>
        </div>

        {/* Booking form */}
        <BookingForm />

        {/* Help section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-info/10 border border-info rounded-lg p-6">
            <h3 className="font-semibold text-text-primary mb-3">
              Potřebujete pomoc s rezervací?
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Pokud máte jakékoliv dotazy nebo preferujete telefonickou rezervaci, 
              neváhejte nás kontaktovat.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="tel:+420123456789"
                className="text-primary hover:underline font-medium"
              >
                📞 +420 123 456 789
              </a>
              <a 
                href="mailto:info@masaze-praha.cz"
                className="text-primary hover:underline font-medium"
              >
                ✉️ info@masaze-praha.cz
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
