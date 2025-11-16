import { Calendar, Clock, User, Mail, Phone, CreditCard } from 'lucide-react'
import { formatDate, formatDateTime } from '@/utils/dateHelpers'
import { formatPrice, formatPhone } from '@/utils/formatters'
import Card from '@/components/common/Card'

const BookingConfirmation = ({ service, date, time, clientInfo }) => {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-display font-semibold text-text-primary mb-4">
          Souhrn rezervace
        </h3>

        <div className="space-y-4">
          {/* Service */}
          <div className="flex items-start gap-3 pb-4 border-b border-border">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: service.color }}
            />
            <div className="flex-1">
              <p className="font-medium text-text-primary">{service.name}</p>
              <div className="flex items-center gap-3 text-sm text-text-secondary mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {service.selectedVariant.duration} minut
                </span>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(service.selectedVariant.price)}
                </span>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-sm text-text-secondary">Datum a čas</p>
              <p className="font-medium text-text-primary">
                {formatDateTime(date, time)}
              </p>
            </div>
          </div>

          {/* Client info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-text-secondary">Jméno</p>
                <p className="font-medium text-text-primary">{clientInfo.clientName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-text-secondary">Email</p>
                <p className="font-medium text-text-primary">{clientInfo.clientEmail}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-text-secondary">Telefon</p>
                <p className="font-medium text-text-primary">
                  {formatPhone(clientInfo.clientPhone)}
                </p>
              </div>
            </div>

            {clientInfo.notes && (
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-text-secondary mb-1">Poznámka</p>
                <p className="text-sm text-text-primary">{clientInfo.notes}</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Payment info */}
      <Card className="bg-primary-light border-2 border-primary">
        <div className="flex items-start gap-3">
          <CreditCard className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Platba</h4>
            <p className="text-sm text-text-secondary">
              Platba probíhá v hotovosti nebo kartou přímo na místě po dokončení masáže.
            </p>
          </div>
        </div>
      </Card>

      {/* Important info */}
      <div className="bg-info/10 border border-info rounded-lg p-4">
        <p className="text-sm text-text-primary mb-2 font-medium">
          Důležité informace:
        </p>
        <ul className="text-sm text-text-secondary space-y-1 ml-4 list-disc">
          <li>Přijďte prosím 5 minut před začátkem rezervace</li>
          <li>V případě zpoždění nás informujte telefonicky</li>
          <li>Storno do 24 hodin před termínem je zdarma</li>
          <li>Potvrzení rezervace obdržíte emailem</li>
        </ul>
      </div>
    </div>
  )
}

export default BookingConfirmation
