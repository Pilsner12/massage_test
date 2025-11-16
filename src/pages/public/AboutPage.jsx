import { Award, BookOpen, Heart, Users, Star, CheckCircle } from 'lucide-react'
import Card from '@/components/common/Card'

const AboutPage = () => {
  const timeline = [
    { year: '2018', event: 'Získání certifikace v klasické masáži', icon: Award },
    { year: '2019', event: 'Specializace na sportovní masáže', icon: Star },
    { year: '2020', event: 'Kurz lymfatické drenáže', icon: BookOpen },
    { year: '2021', event: 'Certifikace v aromaterapii', icon: Heart },
    { year: '2022', event: 'Rozšíření praxe o těhotenské masáže', icon: Users },
    { year: '2023', event: '500+ spokojených klientů', icon: CheckCircle },
  ]

  const certifications = [
    'Certifikace v klasické masáži',
    'Sportovní masáže a regenerace',
    'Lymfatická drenáž',
    'Aromaterapie',
    'Těhotenské masáže',
    'Reflexní terapie',
    'Práce s lávovými kameny',
    'První pomoc',
  ]

  const philosophy = [
    {
      title: 'Individuální přístup',
      description: 'Každý klient je jedinečný a zaslouží si individuální péči přizpůsobenou jeho potřebám.',
    },
    {
      title: 'Holistický pohled',
      description: 'Věřím v propojení těla a mysli. Masáž není jen fyzická, ale i duchovní zkušenost.',
    },
    {
      title: 'Kvalita nad kvantitou',
      description: 'Raději věnuji čas méně klientům, ale s maximální péčí a pozorností.',
    },
    {
      title: 'Neustálé vzdělávání',
      description: 'Pravidelně se účastním kurzů a školení, abych mohla nabídnout ty nejlepší služby.',
    },
  ]

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        {/* Hero section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-text-primary mb-6">
              O mně
            </h1>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              Jmenuji se [Vaše jméno] a masážím je moje vášeň. S více než 5 lety zkušeností 
              v oboru pomáhám lidem dosáhnout fyzické i mentální pohody.
            </p>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              Moje cesta začala v roce 2018, kdy jsem získala první certifikaci. Od té doby 
              jsem se neustále vzdělávala a rozšiřovala své dovednosti v různých masážních 
              technikách.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Věřím, že masáž není jen o uvolnění svalů, ale o celkové harmonizaci těla a mysli. 
              Každá masáž je pro mě jedinečným setkáním, kde můžu pomoct lidem cítit se lépe.
            </p>
          </div>

          <div className="relative animate-fade-in animation-delay-200">
            <img
              src="/images/about-detailed.jpg"
              alt="Profesionální maséřka"
              className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=1200&fit=crop'
              }}
            />
          </div>
        </div>

        {/* Philosophy */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary text-center mb-12">
            Moje filosofie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {philosophy.map((item, index) => (
              <Card key={index} hover className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className="text-xl font-display font-semibold text-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary text-center mb-12">
            Má cesta
          </h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => {
              const Icon = item.icon
              return (
                <div 
                  key={index} 
                  className="flex gap-6 mb-8 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-primary/30 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="font-bold text-primary mb-1">{item.year}</div>
                    <div className="text-text-primary font-medium">{item.event}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary text-center mb-12">
            Certifikace a školení
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-surface rounded-lg shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-sm font-medium text-text-primary">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-primary-light to-secondary/10 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary mb-4">
            Těším se na setkání s vámi
          </h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Pokud máte jakékoliv dotazy nebo si chcete domluvit termín, neváhejte mě kontaktovat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/rezervace">
              <button className="btn btn-primary">
                Rezervovat termín
              </button>
            </a>
            <a href="/kontakt">
              <button className="btn btn-secondary">
                Kontaktovat
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
