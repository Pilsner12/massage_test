import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { bookingService } from '@/services/bookingService'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTestimonials()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000) // Auto-play every 5 seconds

    return () => clearInterval(interval)
  }, [currentIndex, testimonials.length])

  const loadTestimonials = async () => {
    try {
      const { data } = await bookingService.getTestimonials()
      setTestimonials(data)
    } catch (error) {
      console.error('Error loading testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    )
  }

  if (loading) {
    return (
      <section className="py-20 bg-surface">
        <div className="container-custom">
          <LoadingSpinner size="lg" text="Načítání recenzí..." />
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) return null

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-primary-light to-secondary/10">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
            Co říkají klienti
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Přečtěte si zkušenosti našich spokojených klientů
          </p>
        </div>

        {/* Testimonial slider */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-surface rounded-2xl shadow-2xl p-8 md:p-12 relative">
            {/* Quote icon */}
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary opacity-20" />

            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < currentTestimonial.rating
                      ? 'fill-primary text-primary'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Text */}
            <p className="text-xl md:text-2xl text-text-primary text-center mb-8 leading-relaxed font-medium">
              "{currentTestimonial.text}"
            </p>

            {/* Author */}
            <div className="text-center">
              <p className="font-display text-lg font-semibold text-text-primary mb-1">
                {currentTestimonial.name}
              </p>
              <p className="text-sm text-text-secondary">
                {currentTestimonial.service}
              </p>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-gray-300 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
