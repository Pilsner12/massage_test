import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Send } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import { CONTACT_INFO, BUSINESS_HOURS, DAYS_LABELS } from '@/utils/constants'

const ContactPage = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Contact form data:', data)
      toast.success('Zpráva byla odeslána! Brzy vás budeme kontaktovat.')
      reset()
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-text-primary mb-6">
            Kontakt
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Máte dotazy nebo si chcete domluvit termín? Neváhejte mě kontaktovat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact form */}
          <Card className="animate-fade-in">
            <h2 className="text-2xl font-display font-bold text-text-primary mb-6">
              Napište mi
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Jméno a příjmení"
                {...register('name', { 
                  required: 'Jméno je povinné',
                  minLength: { value: 2, message: 'Minimálně 2 znaky' }
                })}
                error={errors.name?.message}
                placeholder="Jan Novák"
              />

              <Input
                label="Email"
                type="email"
                {...register('email', { 
                  required: 'Email je povinný',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Neplatný email'
                  }
                })}
                error={errors.email?.message}
                placeholder="jan@example.com"
              />

              <Input
                label="Telefon"
                type="tel"
                {...register('phone', { 
                  pattern: {
                    value: /^(\+420)?[0-9]{9}$/,
                    message: 'Neplatné telefonní číslo'
                  }
                })}
                error={errors.phone?.message}
                placeholder="+420 123 456 789"
              />

              <div>
                <label className="label">Zpráva</label>
                <textarea
                  {...register('message', { 
                    required: 'Zpráva je povinná',
                    minLength: { value: 10, message: 'Minimálně 10 znaků' }
                  })}
                  className="input min-h-[150px] resize-none"
                  placeholder="Váš dotaz nebo zpráva..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-error">{errors.message.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full"
                loading={loading}
                icon={<Send className="w-4 h-4" />}
              >
                Odeslat zprávu
              </Button>
            </form>
          </Card>

          {/* Contact info */}
          <div className="space-y-6 animate-fade-in animation-delay-200">
            {/* Address */}
            <Card>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Adresa</h3>
                  <p className="text-text-secondary">{CONTACT_INFO.address}</p>
                  <p className="text-sm text-text-secondary mt-2">
                    Parkování: Platené parkoviště v okolí
                  </p>
                </div>
              </div>
            </Card>

            {/* Phone */}
            <Card>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Telefon</h3>
                  <a 
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="text-primary hover:underline"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                  <p className="text-sm text-text-secondary mt-2">
                    Po-Pá: 9:00-18:00, So: 9:00-14:00
                  </p>
                </div>
              </div>
            </Card>

            {/* Email */}
            <Card>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Email</h3>
                  <a 
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-primary hover:underline"
                  >
                    {CONTACT_INFO.email}
                  </a>
                  <p className="text-sm text-text-secondary mt-2">
                    Odpovídám do 24 hodin
                  </p>
                </div>
              </div>
            </Card>

            {/* Opening hours */}
            <Card>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-3">Otevírací doba</h3>
                  <div className="space-y-1">
                    {Object.entries(BUSINESS_HOURS).map(([day, hours]) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="text-text-secondary">{DAYS_LABELS[day]}:</span>
                        <span className="font-medium text-text-primary">
                          {hours.closed ? 'Zavřeno' : `${hours.open} - ${hours.close}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Social media */}
            <Card>
              <h3 className="font-semibold text-text-primary mb-4">Sledujte mě</h3>
              <div className="flex items-center gap-4">
                <a 
                  href={CONTACT_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary-light hover:bg-primary hover:text-white rounded-lg transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="font-medium">Instagram</span>
                </a>
                <a 
                  href={CONTACT_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary-light hover:bg-primary hover:text-white rounded-lg transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="font-medium">Facebook</span>
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Map */}
        <Card className="overflow-hidden">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-6">
            Kde nás najdete
          </h2>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.7474847768764!2d14.4209!3d50.0875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDA1JzE1LjAiTiAxNMKwMjUnMTUuMiJF!5e0!3m2!1scs!2scz!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa - Masáže Praha"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ContactPage
