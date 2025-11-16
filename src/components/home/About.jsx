import { Link } from 'react-router-dom'
import { Award, Heart, Users, Star } from 'lucide-react'
import Button from '@/components/common/Button'

const About = () => {
  const certifications = [
    { icon: Award, text: 'Certifikovaná maséřka' },
    { icon: Star, text: '5+ let praxe' },
    { icon: Heart, text: 'Holistický přístup' },
    { icon: Users, text: '500+ spokojených klientů' },
  ]

  return (
    <section className="py-20 bg-surface">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/about-profile.jpg"
                alt="Profesionální maséřka"
                className="w-full h-[500px] object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=1000&fit=crop'
                }}
              />
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full blur-2xl opacity-50"></div>
            </div>
          </div>

          {/* Content */}
          <div className="animate-fade-in animation-delay-200">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">
              O mně
            </h2>
            
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              Jsem certifikovaná maséřka s více než 5 lety praxe. Specializuji se na klasické 
              i alternativní masážní techniky s důrazem na individuální přístup ke každému klientovi.
            </p>

            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Věřím, že masáž není jen o uvolnění svalů, ale o celkové harmonizaci těla a mysli. 
              Každou masáž přizpůsobuji vašim aktuálním potřebám a cílům.
            </p>

            {/* Certifications */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {certifications.map((cert, index) => {
                const Icon = cert.icon
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 bg-primary-light rounded-lg"
                  >
                    <Icon className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-text-primary">
                      {cert.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <Link to="/o-mne">
              <Button variant="primary" size="lg">
                Více o mně
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
