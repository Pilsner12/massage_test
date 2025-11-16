export const RESERVATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const RESERVATION_STATUS_LABELS = {
  pending: 'Čeká na potvrzení',
  confirmed: 'Potvrzeno',
  completed: 'Dokončeno',
  cancelled: 'Zrušeno',
}

export const RESERVATION_STATUS_COLORS = {
  pending: 'bg-warning text-white',
  confirmed: 'bg-success text-white',
  completed: 'bg-info text-white',
  cancelled: 'bg-error text-white',
}

export const BUSINESS_HOURS = {
  monday: { open: '09:00', close: '18:00', closed: false },
  tuesday: { open: '09:00', close: '18:00', closed: false },
  wednesday: { open: '09:00', close: '18:00', closed: false },
  thursday: { open: '09:00', close: '18:00', closed: false },
  friday: { open: '09:00', close: '18:00', closed: false },
  saturday: { open: '09:00', close: '14:00', closed: false },
  sunday: { open: null, close: null, closed: true },
}

export const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

export const DAYS_LABELS = {
  monday: 'Pondělí',
  tuesday: 'Úterý',
  wednesday: 'Středa',
  thursday: 'Čtvrtek',
  friday: 'Pátek',
  saturday: 'Sobota',
  sunday: 'Neděle',
}

export const TIME_SLOT_DURATION = 30 // minutes

export const CONTACT_INFO = {
  email: 'info@masaze-praha.cz',
  phone: '+420 123 456 789',
  address: 'Příkladná 123, 110 00 Praha 1',
  instagram: 'https://instagram.com/masaze',
  facebook: 'https://facebook.com/masaze',
}
