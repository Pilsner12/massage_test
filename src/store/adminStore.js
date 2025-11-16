import { create } from 'zustand'

const useAdminStore = create((set) => ({
  reservations: [],
  services: [],
  businessHours: {},
  blockedDates: [],
  statistics: null,
  filters: {
    dateFrom: null,
    dateTo: null,
    services: [],
    statuses: [],
    search: '',
  },
  
  setReservations: (reservations) => set({ reservations }),
  
  addReservation: (reservation) => set((state) => ({
    reservations: [...state.reservations, reservation]
  })),
  
  updateReservation: (id, updates) => set((state) => ({
    reservations: state.reservations.map(r => 
      r.id === id ? { ...r, ...updates } : r
    )
  })),
  
  deleteReservation: (id) => set((state) => ({
    reservations: state.reservations.filter(r => r.id !== id)
  })),
  
  setServices: (services) => set({ services }),
  
  updateService: (id, updates) => set((state) => ({
    services: state.services.map(s => 
      s.id === id ? { ...s, ...updates } : s
    )
  })),
  
  setBusinessHours: (hours) => set({ businessHours: hours }),
  
  setBlockedDates: (dates) => set({ blockedDates: dates }),
  
  addBlockedDate: (date) => set((state) => ({
    blockedDates: [...state.blockedDates, date]
  })),
  
  removeBlockedDate: (id) => set((state) => ({
    blockedDates: state.blockedDates.filter(d => d.id !== id)
  })),
  
  setStatistics: (stats) => set({ statistics: stats }),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  
  resetFilters: () => set({
    filters: {
      dateFrom: null,
      dateTo: null,
      services: [],
      statuses: [],
      search: '',
    }
  }),
}))

export default useAdminStore
