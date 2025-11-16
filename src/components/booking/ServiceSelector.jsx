import { useState, useEffect } from 'react'
import { Clock, Check } from 'lucide-react'
import { bookingService } from '@/services/bookingService'
import { formatPrice } from '@/utils/formatters'
import Card from '@/components/common/Card'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const ServiceSelector = ({ selectedService, onSelect }) => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState({})

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const { data } = await bookingService.getServices()
      setServices(data)
    } catch (error) {
      console.error('Error loading services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (service, variantIndex = 0) => {
    const serviceWithVariant = {
      ...service,
      selectedVariant: service.variants[variantIndex]
    }
    setSelectedVariant({ [service.id]: variantIndex })
    onSelect(serviceWithVariant)
  }

  if (loading) {
    return <LoadingSpinner size="lg" text="Načítání služeb..." />
  }

  return (
    <div className="space-y-4">
      {services.map((service) => {
        const isSelected = selectedService?.id === service.id
        const currentVariant = selectedVariant[service.id] || 0

        return (
          <Card 
            key={service.id}
            className={`cursor-pointer transition-all ${
              isSelected ? 'ring-2 ring-primary bg-primary-light/30' : ''
            }`}
            onClick={() => handleSelect(service, currentVariant)}
          >
            <div className="flex items-start gap-4">
              {/* Color indicator */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: service.color + '20' }}
              >
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: service.color }}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-display font-semibold text-text-primary">
                    {service.name}
                  </h3>
                  {isSelected && (
                    <Check className="w-6 h-6 text-primary flex-shrink-0" />
                  )}
                </div>

                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {service.description.split('\n')[0]}
                </p>

                {/* Variants */}
                {service.variants.length > 1 ? (
                  <div className="flex flex-wrap gap-2">
                    {service.variants.map((variant, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelect(service, index)
                        }}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          isSelected && currentVariant === index
                            ? 'border-primary bg-primary text-white'
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">{variant.duration} min</span>
                          <span className="text-sm">•</span>
                          <span className="text-sm font-bold">{formatPrice(variant.price)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Clock className="w-4 h-4" />
                      <span>{service.variants[0].duration} min</span>
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {formatPrice(service.variants[0].price)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default ServiceSelector
