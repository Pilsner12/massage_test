export const bookingValidation = {
  clientName: {
    required: 'Jméno je povinné',
    minLength: { value: 2, message: 'Minimálně 2 znaky' },
    maxLength: { value: 50, message: 'Maximálně 50 znaků' },
  },
  clientEmail: {
    required: 'Email je povinný',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Neplatný email',
    },
  },
  clientPhone: {
    required: 'Telefon je povinný',
    pattern: {
      value: /^(\+420)?[0-9]{9}$/,
      message: 'Neplatné telefonní číslo (formát: +420123456789)',
    },
  },
  gdprConsent: {
    required: 'Musíte souhlasit se zpracováním údajů',
  },
}

export const loginValidation = {
  email: {
    required: 'Email je povinný',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Neplatný email',
    },
  },
  password: {
    required: 'Heslo je povinné',
    minLength: { value: 6, message: 'Minimálně 6 znaků' },
  },
}

export const serviceValidation = {
  name: {
    required: 'Název služby je povinný',
    minLength: { value: 3, message: 'Minimálně 3 znaky' },
  },
  description: {
    required: 'Popis je povinný',
    minLength: { value: 20, message: 'Minimálně 20 znaků' },
  },
  price: {
    required: 'Cena je povinná',
    min: { value: 0, message: 'Cena musí být kladné číslo' },
  },
  duration: {
    required: 'Délka je povinná',
    min: { value: 15, message: 'Minimálně 15 minut' },
  },
}
