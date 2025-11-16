import { useForm } from 'react-hook-form'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { bookingValidation } from '@/utils/validation'

const ClientInfoForm = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {}
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Jméno a příjmení"
        {...register('clientName', bookingValidation.clientName)}
        error={errors.clientName?.message}
        placeholder="Jan Novák"
        required
      />

      <Input
        label="Email"
        type="email"
        {...register('clientEmail', bookingValidation.clientEmail)}
        error={errors.clientEmail?.message}
        placeholder="jan@example.com"
        required
      />

      <Input
        label="Telefon"
        type="tel"
        {...register('clientPhone', bookingValidation.clientPhone)}
        error={errors.clientPhone?.message}
        placeholder="+420 123 456 789"
        helperText="Formát: +420123456789 nebo 123456789"
        required
      />

      <div>
        <label className="label">Poznámka (nepovinné)</label>
        <textarea
          {...register('notes')}
          className="input min-h-[100px] resize-none"
          placeholder="Máte nějaké speciální požadavky nebo zdravotní omezení?"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('gdprConsent', bookingValidation.gdprConsent)}
            className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary"
          />
          <span className="text-sm text-text-secondary">
            Souhlasím se{' '}
            <a href="#" className="text-primary hover:underline">
              zpracováním osobních údajů
            </a>{' '}
            pro účely rezervace a komunikace. *
          </span>
        </label>
        {errors.gdprConsent && (
          <p className="mt-2 text-sm text-error">{errors.gdprConsent.message}</p>
        )}
      </div>

      <Button type="submit" variant="primary" className="w-full" size="lg">
        Pokračovat k souhrnu
      </Button>
    </form>
  )
}

export default ClientInfoForm
