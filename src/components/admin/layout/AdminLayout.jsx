import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import { useIsMobile } from '@/hooks/useMediaQuery'

const AdminLayout = () => {
  const isMobile = useIsMobile()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className={`flex-1 ${isMobile ? 'p-4' : 'p-8'} ml-0 lg:ml-64 mt-16`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
