import { format, parse, isAfter, isBefore, isWithinInterval, addMinutes, isToday, isSameDay, startOfDay, endOfDay, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'
import { cs } from 'date-fns/locale'

export const formatDate = (date, formatStr = 'dd.MM.yyyy') => {
  return format(new Date(date), formatStr, { locale: cs })
}

export const formatTime = (time) => {
  return format(new Date(`2000-01-01T${time}`), 'HH:mm')
}

export const formatDateTime = (date, time) => {
  return `${formatDate(date)} ${time}`
}

export const parseTime = (timeStr) => {
  return parse(timeStr, 'HH:mm', new Date())
}

export const generateTimeSlots = (start, end, duration = 30) => {
  const slots = []
  let currentTime = parseTime(start)
  const endTime = parseTime(end)

  while (isBefore(currentTime, endTime)) {
    slots.push(format(currentTime, 'HH:mm'))
    currentTime = addMinutes(currentTime, duration)
  }

  return slots
}

export const isDateInBlockedRange = (date, blockedDates) => {
  return blockedDates.some(blocked => {
    const from = startOfDay(new Date(blocked.from))
    const to = endOfDay(new Date(blocked.to))
    return isWithinInterval(new Date(date), { start: from, end: to })
  })
}

export const getDayName = (date) => {
  return format(new Date(date), 'EEEE', { locale: cs }).toLowerCase()
}

export const isSlotAvailable = (date, time, duration, reservations, businessHours, blockedDates) => {
  // Check if date is blocked
  if (isDateInBlockedRange(date, blockedDates)) return false

  // Check business hours
  const dayName = getDayName(date)
  const hours = businessHours[dayName]
  if (hours.closed) return false

  const slotTime = parseTime(time)
  const openTime = parseTime(hours.open)
  const closeTime = parseTime(hours.close)
  const slotEndTime = addMinutes(slotTime, duration)

  if (isBefore(slotTime, openTime) || isAfter(slotEndTime, closeTime)) {
    return false
  }

  // Check existing reservations
  const hasConflict = reservations.some(reservation => {
    if (!isSameDay(new Date(reservation.date), new Date(date))) return false
    if (reservation.status === 'cancelled') return false

    const resTime = parseTime(reservation.time)
    const resEndTime = addMinutes(resTime, reservation.duration)

    return (
      (isAfter(slotTime, resTime) || isSameDay(slotTime, resTime)) &&
      isBefore(slotTime, resEndTime)
    ) || (
      isAfter(slotEndTime, resTime) &&
      isBefore(slotEndTime, resEndTime)
    )
  })

  return !hasConflict
}

export const getDateRange = (type) => {
  const now = new Date()
  
  switch (type) {
    case 'today':
      return { from: startOfDay(now), to: endOfDay(now) }
    case 'week':
      return { from: startOfWeek(now, { locale: cs }), to: endOfWeek(now, { locale: cs }) }
    case 'month':
      return { from: startOfMonth(now), to: endOfMonth(now) }
    default:
      return { from: now, to: now }
  }
}
