import { useState, useEffect } from 'react'
import { Save, Clock, DollarSign, Calendar, Bell, User } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { bookingService } from '@/services/bookingService'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Input from '@/components/common/Input'
import { BUSINESS_HOURS, DAYS_LABELS } from '@/utils/constants'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('hours')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [businessHours, setBusinessHours] = useState(BUSINESS_HOURS)
  const [blockedDates, setBlockedDates] = useState([])
  const [services, setServices] = useState([])

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const [hoursRes, blockedRes, servicesRes] = await Promise.all([
        bookingService.getBusinessHours(),
        bookingService.getBlockedDates(),
        bookingService.getAllServices(),
      ])

      setBusinessHours(hoursRes.data)
      setBlockedDates(blockedRes.data)
      setServices(servicesRes.data)
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveBusinessHours = async () => {
    setSaving(true)
    try {
      await bookingService.updateBusinessHours(businessHours)
      toast.success('Otevírací doba byla uložena')
    } catch (error) {
      toast.error('Chyba při ukládání')
    } finally {
      setSaving(false)
    }
  }

  const handleAddBlockedDate = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newBlocked = {
      from: formData.get('from'),
      to: formData.get('to'),
      reason: formData.get('reason'),
    }

    try {
      const { data } = await bookingService.addBlockedDate(newBlocked)
      setBlockedDates([...blockedDates, data])
      toast.success('Blokovací datum bylo přidáno')
      e.target.reset()
    } catch (error) {
      toast.error('Chyba při přidávání')
    }
  }

  const handleDeleteBlockedDate = async (id) => {
    try {
      await bookingService.deleteBlockedDate(id)
      setBlockedDates(blockedDates.filter(d => d.id !== id))
      toast.success('Blokovací datum bylo odstraněno')
    } catch (error) {
      toast.error('Chyba při odstraňování')
    }
  }

  const tabs = [
    { id: 'hours', label: 'Otevírací doba', icon: Clock },
    { id: 'services', label: 'Služby', icon: DollarSign },
    { id: 'blocked', label: 'Blokovací dny', icon: Calendar },
    { id: 'notifications', label: 'Notifikace', icon: Bell },
    { id: 'profile', label: 'Profil', icon: User },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="xl" text="Načítání nastavení..." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Nastavení
        </h1>
        <p className="text-text-secondary">
          Správa otevírací doby, služeb a dalších nastavení
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 border-b-2 transition-colors
                ${activeTab === tab.id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-text-secondary hover:text-primary'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      {activeTab === 'hours' && (
        <Card>
          <h2 className="text-xl font-display font-semibold text-text-primary mb-6">
            Otevírací doba
          </h2>

          <div className="space-y-4">
            {Object.entries(businessHours).map(([day, hours]) => (
              <div key={day} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="font-medium text-text-primary">
                  {DAYS_LABELS[day]}
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={hours.closed}
                    onChange={(e) => setBusinessHours({
                      ...businessHours,
                      [day]: { ...hours, closed: e.target.checked }
                    })}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">Zavřeno</span>
                </label>

                {!hours.closed && (
                  <>
                    <Input
                      type="time"
                      value={hours.open}
                      onChange={(e) => setBusinessHours({
                        ...businessHours,
                        [day]: { ...hours, open: e.target.value }
                      })}
                    />
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) => setBusinessHours({
                        ...businessHours,
                        [day]: { ...hours, close: e.target.value }
                      })}
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button
              variant="primary"
              onClick={handleSaveBusinessHours}
              loading={saving}
              icon={<Save className="w-4 h-4" />}
            >
              Uložit změny
            </Button>
          </div>
        </Card>
      )}

      {activeTab === 'services' && (
        <Card>
          <h2 className="text-xl font-display font-semibold text-text-primary mb-6">
            Správa služeb
          </h2>

          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full"
                    style={{ backgroundColor: service.color }}
                  />
                  <div>
                    <p className="font-medium text-text-primary">{service.name}</p>
                    <p className="text-sm text-text-secondary">
                      {service.variants.map(v => `${v.duration} min / ${v.price} Kč`).join(', ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={service.active}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      readOnly
                    />
                    <span className="text-sm text-text-secondary">Aktivní</span>
                  </label>
                  <Button variant="ghost" size="sm">
                    Upravit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'blocked' && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-display font-semibold text-text-primary mb-6">
              Přidat blokovací období
            </h2>

            <form onSubmit={handleAddBlockedDate} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                type="date"
                name="from"
                label="Od"
                required
              />
              <Input
                type="date"
                name="to"
                label="Do"
                required
              />
              <Input
                type="text"
                name="reason"
                label="Důvod"
                placeholder="Dovolená, svátky..."
                required
              />
              <div className="flex items-end">
                <Button type="submit" variant="primary" className="w-full">
                  Přidat
                </Button>
              </div>
            </form>
          </Card>

          <Card>
            <h2 className="text-xl font-display font-semibold text-text-primary mb-6">
              Blokovací období
            </h2>

            {blockedDates.length === 0 ? (
              <p className="text-center py-8 text-text-secondary">
                Žádná blokovací období
              </p>
            ) : (
              <div className="space-y-3">
                {blockedDates.map((blocked) => (
                  <div
                    key={blocked.id}
                    className="flex items-center justify-between p-4 bg-background rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-text-primary">
                        {blocked.from} - {blocked.to}
                      </p>
                      <p className="text-sm text-text-secondary">{blocked.reason}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteBlockedDate(blocked.id)}
                    >
                      Odstranit
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {activeTab === 'notifications' && (
        <Card>
          <h2 className="text-xl font-display font-semibold text-text-primary mb-6">
            Nastavení notifikací
          </h2>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-background rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-text-primary">Email notifikace pro admina</p>
                <p className="text-sm text-text-secondary">Dostávat email při nové rezervaci</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-background rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-text-primary">Email potvrzení pro klienta</p>
                <p className="text-sm text-text-secondary">Odesílat potvrzení rezervace klientovi</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-background rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-text-primary">SMS připomínka (mock)</p>
                <p className="text-sm text-text-secondary">Odesílat SMS 24h před termínem</p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
            </label>
          </div>

          <div className="mt-6">
            <Button variant="primary" icon={<Save className="w-4 h-4" />}>
              Uložit nastavení
            </Button>
          </div>
        </Card>
      )}

      {activeTab === 'profile' && (
        <Card>
          <h2 className="text-xl font-display font-semibold text-text-primary mb-6">
            Profil administrátora
          </h2>

          <div className="space-y-4 max-w-md">
            <Input
              label="Jméno"
              defaultValue="Admin"
            />
            <Input
              label="Email"
              type="email"
              defaultValue="admin@example.com"
            />
            <Input
              label="Nové heslo"
              type="password"
              placeholder="Ponechat prázdné pro zachování"
            />
            <Input
              label="Potvrdit heslo"
              type="password"
            />

            <Button variant="primary" icon={<Save className="w-4 h-4" />}>
              Uložit změny
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

export default AdminSettings
