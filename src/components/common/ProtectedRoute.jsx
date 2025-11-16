import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '@/store/authStore'

const ProtectedRoute = ({ redirectPath = '/admin/login' }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
