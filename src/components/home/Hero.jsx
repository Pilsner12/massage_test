import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '@/components/common/Button'

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-light via-background to-secondary/20">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-text-primary">
              5 let zkušeností v oboru
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary mb-6 leading-tight">
            Profesionální masáže
            <span className="block text-primary mt-2">s láskou k detailu</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            S 5 lety zkušeností a holistickým přístupem vám pomohu uvolnit tělo i mysl. 
            Každá masáž je jedinečný zážitek přizpůsobený vašim potřebám.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/rezervace">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Rezervovat termín
              </Button>
            </Link>
            <Link to="/sluzby">
              <Button variant="secondary" size="lg">
                Prohlédnout služby
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-primary/20">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2">
                5+
              </div>
              <div className="text-sm text-text-secondary">
                Let zkušeností
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2">
                500+
              </div>
              <div className="text-sm text-text-secondary">
                Spokojených klientů
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2">
                7
              </div>
              <div className="text-sm text-text-secondary">
                Typů masáží
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
