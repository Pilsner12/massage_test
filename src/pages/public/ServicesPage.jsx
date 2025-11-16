import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Clock, Check, AlertCircle, ArrowRight } from 'lucide-react'
import { bookingService } from '@/services/bookingService'
import { formatPrice } from '@/utils/formatters'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const ServicesPage = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    loadServices()
  }, [])

  useEffect(() => {
    // Scroll to service if hash is present
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location.hash, services])

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" text="Načítání služeb..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-text-primary mb-6">
            Naše služby
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Vyberte si z naší široké nabídky profesionálních masáží. 
            Každá služba je pečlivě navržena pro maximální relaxaci a regeneraci.
          </p>
        </div>

        {/* Services list */}
        <div className="space-y-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.slug}
              className="scroll-mt-24"
            >
              <Card className="overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Image */}
                  <div className="lg:col-span-1">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-64 lg:h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = `https://images.unsplash.com/photo-${1540555700478 + index}?w=600&h=400&fit=crop`
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-2">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary mb-2">
                          {service.name}
                        </h2>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <span 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: service.color }}
                          ></span>
                          <span className="text-sm">{service.forWhom}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="prose prose-sm max-w-none mb-6">
                      {service.description.split('\n').map((paragraph, i) => (
                        paragraph && <p key={i} className="text-text-secondary mb-3">{paragraph}</p>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-text-primary mb-3">Benefity:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-text-secondary">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contraindications */}
                    {service.contraindications && service.contraindications.length > 0 && (
                      <div className="mb-6 p-4 bg-warning/10 rounded-lg">
                        <div className="flex items-start gap-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                          <h3 className="font-semibold text-text-primary">Kontraindikace:</h3>
                        </div>
                        <ul className="ml-7 space-y-1">
                          {service.contraindications.map((contra, i) => (
                            <li key={i} className="text-sm text-text-secondary">{contra}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pricing and CTA */}
                    <div className="flex flex-wrap items-center gap-4">
                      {service.variants.map((variant, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2 bg-primary-light rounded-lg">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{variant.duration} min</span>
                          <span className="text-sm text-text-secondary">•</span>
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(variant.price)}
                          </span>
                        </div>
                      ))}
                      <Link to="/rezervace" state={{ selectedService: service }}>
                        <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                          Rezervovat
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-primary-light to-secondary/10 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary mb-4">
              Nejste si jisti, kterou masáž vybrat?
            </h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Kontaktujte mě a společně najdeme nejlepší řešení pro vaše potřeby.
            </p>
            <Link to="/kontakt">
              <Button variant="primary" size="lg">
                Kontaktovat
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
