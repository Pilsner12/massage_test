import { useState, useEffect } from 'react'
import { Calendar, DollarSign, Users, TrendingUp } from 'lucide-react'
import { bookingService } from '@/services/bookingService'
import { formatPrice } from '@/utils/formatters'
import { formatDate } from '@/utils/dateHelpers'
import Card from '@/components/common/Card'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { RESERVATION_STATUS_LABELS, RESERVATION_STATUS_COLORS } from '@/utils/constants'

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState(null)
  const [todayReservations, setTodayReservations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [statsRes, reservationsRes] = await Promise.all([
        bookingService.getStatistics(),
        bookingService.getAllReservations(),
      ])

      setStatistics(statsRes.data)
      
      const today = new Date().toISOString().split('T')[0]
      const todayRes = reservationsRes.data.filter(r => r.date === today)
      setTodayReservations(todayRes)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="xl" text="Načítání statistik..." />
      </div>
    )
  }

  const statCards = [
    {
      title: 'Rezervace dnes',
      value: statistics?.today || 0,
      icon: Calendar,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Tento týden',
      value: statistics?.thisWeek || 0,
      icon: TrendingUp,
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
    {
      title: 'Tento měsíc',
      value: statistics?.thisMonth || 0,
      icon: Users,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Příjem měsíc',
      value: formatPrice(statistics?.revenue || 0),
      icon: DollarSign,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Dashboard
        </h1>
        <p className="text-text-secondary">
          Přehled vašich rezervací a statistik
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Chart */}
      <Card>
        <h2 className="text-xl font-display font-semibold text-text-primary mb-6">
          Návštěvnost za posledních 30 dní
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={statistics?.chartData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => formatDate(date, 'dd.MM')}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(date) => formatDate(date, 'dd.MM.yyyy')}
              formatter={(value) => [value, 'Rezervace']}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#D4A574" 
              strokeWidth={2}
              dot={{ fill: '#D4A574' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Today's reservations */}
      <Card>
        <h2 className="text-xl font-display font-semibold text-text-primary mb-6">
          Dnešní rezervace ({todayReservations.length})
        </h2>

        {todayReservations.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Dnes nemáte žádné rezervace</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-primary-light/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="font-bold text-text-primary">{reservation.time}</div>
                    <div className="text-xs text-text-secondary">{reservation.duration} min</div>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{reservation.clientName}</p>
                    <p className="text-sm text-text-secondary">{reservation.serviceName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${RESERVATION_STATUS_COLORS[reservation.status]}`}>
                    {RESERVATION_STATUS_LABELS[reservation.status]}
                  </span>
                  <span className="font-bold text-primary">{formatPrice(reservation.price)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

export default AdminDashboard
