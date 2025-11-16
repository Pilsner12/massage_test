import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { bookingService } from '@/services/bookingService'
import { formatPrice } from '@/utils/formatters'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const ServicesPreview = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const { data } = await bookingService.getServices()
      setServices(data.slice(0, 4)) // Show only first 4
    } catch (error) {
      console.error('Error loading services:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container-custom">
          <LoadingSpinner size="lg" text="Načítání služeb..." />
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
            Naše služby
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Vyberte si z naší nabídky profesionálních masáží přizpůsobených vašim potřebám
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Card 
              key={service.id} 
              hover 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Service icon/color */}
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: service.color + '20' }}
              >
                <div 
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: service.color }}
                ></div>
              </div>

              {/* Service name */}
              <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                {service.description.split('\n')[0]}
              </p>

              {/* Duration & Price */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Clock className="w-4 h-4" />
                  <span>{service.variants[0].duration} min</span>
                </div>
                <div className="text-lg font-bold text-primary">
                  {formatPrice(service.variants[0].price)}
                </div>
              </div>

              {/* CTA */}
              <Link to={`/sluzby#${service.slug}`}>
                <Button variant="ghost" className="w-full justify-between">
                  Zjistit více
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center">
          <Link to="/sluzby">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Zobrazit všechny služby
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesPreview
