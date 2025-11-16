import { useState, useEffect } from 'react'
import { Search, Filter, Plus, Download } from 'lucide-react'
import { bookingService } from '@/services/bookingService'
import { formatDate } from '@/utils/dateHelpers'
import { formatPrice } from '@/utils/formatters'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Input from '@/components/common/Input'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { RESERVATION_STATUS_LABELS, RESERVATION_STATUS_COLORS } from '@/utils/constants'

const AdminReservations = () => {
  const [reservations, setReservations] = useState([])
  const [filteredReservations, setFilteredReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    loadReservations()
  }, [])

  useEffect(() => {
    filterReservations()
  }, [searchTerm, statusFilter, reservations])

  const loadReservations = async () => {
    try {
      const { data } = await bookingService.getAllReservations()
      setReservations(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
    } catch (error) {
      console.error('Error loading reservations:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterReservations = () => {
    let filtered = reservations

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.clientPhone.includes(searchTerm)
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter)
    }

    setFilteredReservations(filtered)
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await bookingService.updateReservation(id, { status: newStatus })
      setReservations(reservations.map(r =>
        r.id === id ? { ...r, status: newStatus } : r
      ))
    } catch (error) {
      console.error('Error updating reservation:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="xl" text="Načítání rezervací..." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Rezervace
          </h1>
          <p className="text-text-secondary">
            Celkem {filteredReservations.length} rezervací
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
            Export
          </Button>
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
            Nová rezervace
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <Input
              placeholder="Hledat podle jména, emailu nebo telefonu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input"
          >
            <option value="all">Všechny statusy</option>
            <option value="pending">Čeká na potvrzení</option>
            <option value="confirmed">Potvrzeno</option>
            <option value="completed">Dokončeno</option>
            <option value="cancelled">Zrušeno</option>
          </select>
        </div>
      </Card>

      {/* Reservations table */}
      <Card className="overflow-x-auto">
        {filteredReservations.length === 0 ? (
          <div className="text-center py-12 text-text-secondary">
            <p>Žádné rezervace nebyly nalezeny</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-text-primary">Datum</th>
                <th className="text-left py-3 px-4 font-semibold text-text-primary">Čas</th>
                <th className="text-left py-3 px-4 font-semibold text-text-primary">Klient</th>
                <th className="text-left py-3 px-4 font-semibold text-text-primary">Služba</th>
                <th className="text-left py-3 px-4 font-semibold text-text-primary">Cena</th>
                <th className="text-left py-3 px-4 font-semibold text-text-primary">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-text-primary">Akce</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="border-b border-border hover:bg-gray-50">
                  <td className="py-3 px-4">{formatDate(reservation.date)}</td>
                  <td className="py-3 px-4 font-medium">{reservation.time}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{reservation.clientName}</p>
                      <p className="text-sm text-text-secondary">{reservation.clientEmail}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm">{reservation.serviceName}</p>
                    <p className="text-xs text-text-secondary">{reservation.duration} min</p>
                  </td>
                  <td className="py-3 px-4 font-bold text-primary">
                    {formatPrice(reservation.price)}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={reservation.status}
                      onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${RESERVATION_STATUS_COLORS[reservation.status]}`}
                    >
                      <option value="pending">Čeká</option>
                      <option value="confirmed">Potvrzeno</option>
                      <option value="completed">Dokončeno</option>
                      <option value="cancelled">Zrušeno</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}

export default AdminReservations
