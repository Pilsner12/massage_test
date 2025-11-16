import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { cs } from 'date-fns/locale'
import { bookingService } from '@/services/bookingService'
import { formatDate } from '@/utils/dateHelpers'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const AdminCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [reservations, setReservations] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReservations()
  }, [currentMonth])

  const loadReservations = async () => {
    setLoading(true)
    try {
      const { data } = await bookingService.getAllReservations()
      setReservations(data)
    } catch (error) {
      console.error('Error loading reservations:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }

  const getReservationsForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return reservations.filter(r => r.date === dateStr)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleToday = () => {
    setCurrentMonth(new Date())
  }

  const days = getDaysInMonth()
  const dayReservations = selectedDate ? getReservationsForDate(selectedDate) : []

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="xl" text="Načítání kalendáře..." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Kalendář
          </h1>
          <p className="text-text-secondary">
            Přehled všech rezervací
          </p>
        </div>
        <Button variant="primary" onClick={handleToday}>
          Dnes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-text-primary">
              {format(currentMonth, 'LLLL yyyy', { locale: cs })}
            </h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleNextMonth}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-text-secondary py-2">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {days.map((day, index) => {
              const dayReservations = getReservationsForDate(day)
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              const isToday = isSameDay(day, new Date())

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    relative p-2 rounded-lg border-2 transition-all min-h-[80px]
                    ${isSelected ? 'border-primary bg-primary-light' : 'border-transparent hover:border-border'}
                    ${isToday ? 'bg-primary/10' : ''}
                  `}
                >
                  <div className="text-sm font-medium text-text-primary mb-1">
                    {format(day, 'd')}
                  </div>
                  {dayReservations.length > 0 && (
                    <div className="space-y-1">
                      {dayReservations.slice(0, 2).map((res, i) => (
                        <div
                          key={i}
                          className="text-xs bg-primary text-white px-2 py-0.5 rounded truncate"
                        >
                          {res.time}
                        </div>
                      ))}
                      {dayReservations.length > 2 && (
                        <div className="text-xs text-text-secondary">
                          +{dayReservations.length - 2} další
                        </div>
                      )}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </Card>

        {/* Selected day details */}
        <Card>
          <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
            {selectedDate ? formatDate(selectedDate, 'EEEE d. MMMM') : 'Vyberte den'}
          </h3>

          {selectedDate ? (
            dayReservations.length > 0 ? (
              <div className="space-y-3">
                {dayReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="p-3 bg-primary-light rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-primary">{reservation.time}</span>
                      <span className="text-xs px-2 py-1 bg-success text-white rounded-full">
                        {reservation.status}
                      </span>
                    </div>
                    <p className="font-medium text-text-primary text-sm">
                      {reservation.clientName}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {reservation.serviceName}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {reservation.duration} min
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-text-secondary">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Žádné rezervace</p>
              </div>
            )
          ) : (
            <div className="text-center py-8 text-text-secondary">
              <p>Klikněte na den v kalendáři pro zobrazení rezervací</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default AdminCalendar
