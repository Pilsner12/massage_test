import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { useBooking } from '@/hooks/useBooking'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const TimeSlots = ({ date, service, selectedTime, onSelect }) => {
  const { availableSlots, loading, loadAvailableSlots } = useBooking()

  useEffect(() => {
    if (date && service) {
      loadAvailableSlots(date, service)
    }
  }, [date, service])

  if (loading) {
    return <LoadingSpinner text="Načítání dostupných termínů..." />
  }

  if (availableSlots.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-12 h-12 text-text-secondary mx-auto mb-4" />
        <p className="text-text-secondary">
          Pro vybraný den nejsou dostupné žádné termíny.
        </p>
        <p className="text-sm text-text-secondary mt-2">
          Zkuste prosím vybrat jiný den.
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-text-secondary mb-4">
        Dostupné termíny pro {service.name} ({service.selectedVariant.duration} min)
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {availableSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
              selectedTime === slot
                ? 'border-primary bg-primary text-white'
                : 'border-border hover:border-primary hover:bg-primary-light'
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TimeSlots
