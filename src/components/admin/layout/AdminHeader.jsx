import { useState } from 'react'
import { Menu, Bell, User, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/common/Button'

const AdminHeader = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-surface border-b border-border h-16">
      <div className="flex items-center justify-between h-full px-4 lg:px-8">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-display">
              M
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-semibold text-lg">Admin</h1>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <span className="hidden sm:inline text-sm font-medium">
                {user?.name || 'Admin'}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-xl border border-border py-2">
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    // Navigate to settings
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Profil
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    logout()
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-error"
                >
                  <LogOut className="w-4 h-4" />
                  Odhlásit se
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
