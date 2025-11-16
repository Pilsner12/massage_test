import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardList, 
  Settings,
  Home 
} from 'lucide-react'
import { clsx } from 'clsx'

const AdminSidebar = () => {
  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/rezervace', label: 'Rezervace', icon: ClipboardList },
    { path: '/admin/kalendar', label: 'Kalendář', icon: Calendar },
    { path: '/admin/nastaveni', label: 'Nastavení', icon: Settings },
  ]

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-surface border-r border-border">
        <nav className="p-4 space-y-2">
          {/* Back to website */}
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-gray-100 transition-colors mb-4"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Zpět na web</span>
          </a>

          {/* Admin navigation */}
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-gray-100'
                  )
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-30">
        <div className="flex items-center justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'text-primary'
                      : 'text-text-secondary'
                  )
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default AdminSidebar
