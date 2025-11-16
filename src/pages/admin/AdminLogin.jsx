import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LogIn, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import { loginValidation } from '@/utils/validation'

const AdminLogin = () => {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    
    try {
      const result = await login(data.email, data.password, data.rememberMe)
      
      if (result.success) {
        toast.success('Přihlášení úspěšné!')
        navigate('/admin/dashboard')
      } else {
        toast.error(result.error || 'Přihlášení se nezdařilo')
      }
    } catch (error) {
      toast.error('Došlo k chybě při přihlašování')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <span className="text-white font-display text-2xl font-bold">M</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-text-primary mb-2">
            Admin Přihlášení
          </h1>
          <p className="text-text-secondary">
            Přihlaste se do administrace
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email"
            type="email"
            {...register('email', loginValidation.email)}
            error={errors.email?.message}
            placeholder="admin@example.com"
            autoComplete="email"
          />

          <Input
            label="Heslo"
            type="password"
            {...register('password', loginValidation.password)}
            error={errors.password?.message}
            placeholder="••••••••"
            autoComplete="current-password"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              {...register('rememberMe')}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-text-secondary">
              Zapamatovat si mě
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={loading}
            icon={!loading && <LogIn className="w-5 h-5" />}
          >
            {loading ? 'Přihlašování...' : 'Přihlásit se'}
          </Button>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-info/10 rounded-lg">
          <p className="text-sm font-medium text-text-primary mb-2">Demo přihlašovací údaje:</p>
          <p className="text-sm text-text-secondary">Email: admin@example.com</p>
          <p className="text-sm text-text-secondary">Heslo: Admin123!</p>
        </div>

        {/* Back to website */}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-primary hover:underline">
            ← Zpět na web
          </a>
        </div>
      </Card>
    </div>
  )
}

export default AdminLogin
