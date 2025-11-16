import api from './api'
import { mockServices, mockReservations, mockBlockedDates, mockTestimonials } from './mockData'
import { BUSINESS_HOURS } from '@/utils/constants'

let reservationsData = [...mockReservations]
let servicesData = [...mockServices]
let blockedDatesData = [...mockBlockedDates]

export const bookingService = {
  // Public API
  getServices: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: servicesData.filter(s => s.active) })
      }, 300)
    })
  },

  getServiceById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const service = servicesData.find(s => s.id === parseInt(id))
        if (service) {
          resolve({ data: service })
        } else {
          reject(new Error('Služba nenalezena'))
        }
      }, 200)
    })
  },

  getAvailability: async (date, serviceId, duration) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return mock availability based on reservations
        resolve({ 
          data: {
            date,
            slots: [], // Will be calculated in component
            businessHours: BUSINESS_HOURS,
            blockedDates: blockedDatesData
          }
        })
      }, 300)
    })
  },

  createReservation: async (reservationData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReservation = {
          ...reservationData,
          id: reservationsData.length + 1,
          status: 'pending',
          createdAt: new Date().toISOString(),
          confirmedAt: null,
          cancelledAt: null,
          cancelReason: null
        }
        reservationsData.push(newReservation)
        resolve({ data: newReservation })
      }, 500)
    })
  },

  getBusinessHours: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: BUSINESS_HOURS })
      }, 200)
    })
  },

  getTestimonials: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockTestimonials })
      }, 200)
    })
  },

  // Admin API
  getAllReservations: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: reservationsData })
      }, 300)
    })
  },

  getReservationById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const reservation = reservationsData.find(r => r.id === parseInt(id))
        if (reservation) {
          resolve({ data: reservation })
        } else {
          reject(new Error('Rezervace nenalezena'))
        }
      }, 200)
    })
  },

  updateReservation: async (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = reservationsData.findIndex(r => r.id === parseInt(id))
        if (index !== -1) {
          reservationsData[index] = { ...reservationsData[index], ...updates }
          resolve({ data: reservationsData[index] })
        } else {
          reject(new Error('Rezervace nenalezena'))
        }
      }, 300)
    })
  },

  deleteReservation: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        reservationsData = reservationsData.filter(r => r.id !== parseInt(id))
        resolve({ data: { success: true } })
      }, 300)
    })
  },

  getStatistics: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const today = new Date().toISOString().split('T')[0]
        const thisMonth = new Date().getMonth()
        
        const todayReservations = reservationsData.filter(r => r.date === today)
        const thisMonthReservations = reservationsData.filter(r => {
          const resMonth = new Date(r.date).getMonth()
          return resMonth === thisMonth
        })
        
        const stats = {
          today: todayReservations.length,
          thisWeek: 12, // Mock
          thisMonth: thisMonthReservations.length,
          revenue: thisMonthReservations.reduce((sum, r) => sum + r.price, 0),
          chartData: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            count: Math.floor(Math.random() * 8) + 1
          }))
        }
        
        resolve({ data: stats })
      }, 300)
    })
  },

  getAllServices: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: servicesData })
      }, 200)
    })
  },

  updateService: async (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = servicesData.findIndex(s => s.id === parseInt(id))
        if (index !== -1) {
          servicesData[index] = { ...servicesData[index], ...updates }
          resolve({ data: servicesData[index] })
        } else {
          reject(new Error('Služba nenalezena'))
        }
      }, 300)
    })
  },

  getBlockedDates: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: blockedDatesData })
      }, 200)
    })
  },

  addBlockedDate: async (dateData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBlockedDate = {
          ...dateData,
          id: blockedDatesData.length + 1
        }
        blockedDatesData.push(newBlockedDate)
        resolve({ data: newBlockedDate })
      }, 300)
    })
  },

  deleteBlockedDate: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        blockedDatesData = blockedDatesData.filter(d => d.id !== parseInt(id))
        resolve({ data: { success: true } })
      }, 200)
    })
  },

  updateBusinessHours: async (hours) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: hours })
      }, 300)
    })
  }
}
