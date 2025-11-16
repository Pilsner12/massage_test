import Hero from '@/components/home/Hero'
import ServicesPreview from '@/components/home/ServicesPreview'
import About from '@/components/home/About'
import Gallery from '@/components/home/Gallery'
import Testimonials from '@/components/home/Testimonials'
import QuickBooking from '@/components/home/QuickBooking'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesPreview />
      <About />
      <Testimonials />
      <Gallery />
      <QuickBooking />
    </div>
  )
}

export default HomePage
