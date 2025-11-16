import { NavLink } from 'react-router-dom'
import { clsx } from 'clsx'

const Navigation = () => {
  const navItems = [
    { path: '/', label: 'Domů' },
    { path: '/sluzby', label: 'Služby' },
    { path: '/o-mne', label: 'O mně' },
    { path: '/kontakt', label: 'Kontakt' },
  ]

  return (
    <nav className="flex items-center gap-8">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            clsx(
              'text-base font-medium transition-colors relative py-2',
              'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300',
              'hover:after:scale-x-100',
              isActive 
                ? 'text-primary after:scale-x-100' 
                : 'text-text-secondary hover:text-primary'
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navigation
