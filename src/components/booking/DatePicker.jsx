import { useState, useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import { cs } from 'date-fns/locale'
import { addDays, isWeekend, isSunday } from 'date-fns'
import { bookingService } from '@/services/bookingService'
import { isDateInBlockedRange, getDayName } from '@/utils/dateHelpers'
import 'react-datepicker/dist/react-datepicker.css'

const DatePicker = ({ selectedDate, onSelect, service }) => {
  const [blockedDates, setBlockedDates] = useState([])
  const [businessHours, setBusinessHours] = useState({})

  useEffect(() => {
    loadBusinessData()
  }, [])

  const loadBusinessData = async () => {
    try {
      const [blockedRes, hoursRes] = await Promise.all([
        bookingService.getBlockedDates(),
        bookingService.getBusinessHours(),
      ])
      setBlockedDates(blockedRes.data)
      setBusinessHours(hoursRes.data)
    } catch (error) {
      console.error('Error loading business data:', error)
    }
  }

  const isDateDisabled = (date) => {
    // Check if date is in blocked range
    if (isDateInBlockedRange(date, blockedDates)) return true

    // Check business hours
    const dayName = getDayName(date)
    const hours = businessHours[dayName]
    if (hours?.closed) return true

    return false
  }

  return (
    <div className="flex justify-center">
      <ReactDatePicker
        selected={selectedDate}
        onChange={onSelect}
        minDate={addDays(new Date(), 1)}
        maxDate={addDays(new Date(), 90)}
        filterDate={(date) => !isDateDisabled(date)}
        locale={cs}
        inline
        calendarClassName="custom-datepicker"
        dayClassName={(date) => {
          if (isDateDisabled(date)) return 'disabled-date'
          return undefined
        }}
      />
    </div>
  )
}

export default DatePicker
