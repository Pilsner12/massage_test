import { useState, useEffect } from 'react'
import { bookingService } from '@/services/bookingService'
import useBookingStore from '@/store/bookingStore'
import { isSlotAvailable, generateTimeSlots, getDayName } from '@/utils/dateHelpers'

export const useBooking = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const [reservations, setReservations] = useState([])
  const [businessHours, setBusinessHours] = useState({})
  const [blockedDates, setBlockedDates] = useState([])

  const {
    step,
    selectedService,
    selectedDate,
    selectedTime,
    clientInfo,
    setStep,
    setSelectedService,
    setSelectedDate,
    setSelectedTime,
    setClientInfo,
    resetBooking,
  } = useBookingStore()

  useEffect(() => {
    loadBusinessData()
  }, [])

  const loadBusinessData = async () => {
    try {
      const [hoursRes, reservationsRes, blockedRes] = await Promise.all([
        bookingService.getBusinessHours(),
        bookingService.getAllReservations(),
        bookingService.getBlockedDates(),
      ])
      
      setBusinessHours(hoursRes.data)
      setReservations(reservationsRes.data)
      setBlockedDates(blockedRes.data)
    } catch (err) {
      console.error('Error loading business data:', err)
    }
  }

  const loadAvailableSlots = async (date, service) => {
    if (!date || !service) return

    setLoading(true)
    try {
      const dayName = getDayName(date)
      const hours = businessHours[dayName]

      if (!hours || hours.closed) {
        setAvailableSlots([])
        return
      }

      const allSlots = generateTimeSlots(hours.open, hours.close, 30)
      const duration = service.variants[0].duration

      const available = allSlots.filter(slot =>
        isSlotAvailable(date, slot, duration, reservations, businessHours, blockedDates)
      )

      setAvailableSlots(available)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createReservation = async (data) => {
    setLoading(true)
    setError(null)
    
    try {
      const reservationData = {
        ...data,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        date: selectedDate,
        time: selectedTime,
        duration: selectedService.variants[0].duration,
        price: selectedService.variants[0].price,
      }

      const response = await bookingService.createReservation(reservationData)
      resetBooking()
      return { success: true, data: response.data }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    step,
    selectedService,
    selectedDate,
    selectedTime,
    clientInfo,
    availableSlots,
    loading,
    error,
    setStep,
    setSelectedService,
    setSelectedDate,
    setSelectedTime,
    setClientInfo,
    loadAvailableSlots,
    createReservation,
    resetBooking,
  }
}
