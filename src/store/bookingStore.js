import { create } from 'zustand'

const useBookingStore = create((set) => ({
  step: 1,
  selectedService: null,
  selectedDate: null,
  selectedTime: null,
  clientInfo: null,
  
  setStep: (step) => set({ step }),
  
  setSelectedService: (service) => set({ selectedService: service, step: 2 }),
  
  setSelectedDate: (date) => set({ selectedDate: date, step: 3 }),
  
  setSelectedTime: (time) => set({ selectedTime: time, step: 4 }),
  
  setClientInfo: (info) => set({ clientInfo: info }),
  
  resetBooking: () => set({
    step: 1,
    selectedService: null,
    selectedDate: null,
    selectedTime: null,
    clientInfo: null,
  }),
  
  goToStep: (step) => set({ step }),
}))

export default useBookingStore
