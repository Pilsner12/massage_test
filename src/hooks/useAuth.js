import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/store/authStore'
import { authService } from '@/services/authService'

export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = async (email, password, rememberMe = false) => {
    try {
      const { user, token } = await authService.login(email, password)
      login(user, token)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
      logout()
      navigate('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const checkAuth = async () => {
    if (token) {
      const { valid } = await authService.verifyToken(token)
      if (!valid) {
        logout()
        return false
      }
      return true
    }
    return false
  }

  return {
    user,
    token,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    checkAuth,
  }
}
