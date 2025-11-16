import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { useBooking } from '@/hooks/useBooking'
import ServiceSelector from './ServiceSelector'
import DatePicker from './DatePicker'
import TimeSlots from './TimeSlots'
import ClientInfoForm from './ClientInfoForm'
import BookingConfirmation from './BookingConfirmation'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'

const BookingForm = () => {
  const {
    step,
    selectedService,
    selectedDate,
    selectedTime,
    clientInfo,
    setSelectedService,
    setSelectedDate,
    setSelectedTime,
    setClientInfo,
    setStep,
  } = useBooking()

  const steps = [
    { number: 1, title: 'Výběr služby' },
    { number: 2, title: 'Výběr data' },
    { number: 3, title: 'Výběr času' },
    { number: 4, title: 'Osobní údaje' },
    { number: 5, title: 'Potvrzení' },
  ]

  const canProceed = () => {
    switch (step) {
      case 1: return selectedService !== null
      case 2: return selectedDate !== null
      case 3: return selectedTime !== null
      case 4: return clientInfo !== null
      default: return false
    }
  }

  const handleNext = () => {
    if (canProceed()) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleClientInfoSubmit = (data) => {
    setClientInfo(data)
    setStep(5)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => (
            <div key={s.number} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step > s.number
                      ? 'bg-success text-white'
                      : step === s.number
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-text-secondary'
                  }`}
                >
                  {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                </div>
                <span className="text-xs mt-2 text-center hidden sm:block">
                  {s.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 rounded-full transition-all ${
                    step > s.number ? 'bg-success' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <Card className="mb-6">
        <h2 className="text-2xl font-display font-bold text-text-primary mb-6">
          {steps[step - 1].title}
        </h2>

        {step === 1 && (
          <ServiceSelector
            selectedService={selectedService}
            onSelect={setSelectedService}
          />
        )}

        {step === 2 && (
          <DatePicker
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
            service={selectedService}
          />
        )}

        {step === 3 && (
          <TimeSlots
            date={selectedDate}
            service={selectedService}
            selectedTime={selectedTime}
            onSelect={setSelectedTime}
          />
        )}

        {step === 4 && (
          <ClientInfoForm
            onSubmit={handleClientInfoSubmit}
            initialData={clientInfo}
          />
        )}

        {step === 5 && (
          <BookingConfirmation
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
            clientInfo={clientInfo}
          />
        )}
      </Card>

      {/* Navigation buttons */}
      {step !== 4 && (
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
            icon={<ChevronLeft className="w-5 h-5" />}
          >
            Zpět
          </Button>

          {step < 5 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed()}
              icon={<ChevronRight className="w-5 h-5" />}
            >
              Pokračovat
            </Button>
          ) : (
            <Button
              variant="primary"
              icon={<Check className="w-5 h-5" />}
            >
              Potvrdit rezervaci
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default BookingForm
