import React, { useEffect, type ReactNode } from 'react'
import { Menu, X, Home, BarChart3, Briefcase, Settings, LogOut, Calculator } from 'lucide-react'
import { NavLink } from 'react-router-dom';



interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onToggle }) => {

  const menuItems = [
    {icon: Home, label: 'Dashboard', href: '/dashboard'},
    {icon: BarChart3, label: 'Analytics', href: '/analytics'},
    {icon: Briefcase, label: 'Portfolio', href: '/portfolio'},
    {icon: Calculator, label: 'Recession Risk', href: '/recession'},
    {icon: Settings, label: 'Settings', href: '/settings'},
  ]


  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50
          flex flex-col
          transition-all duration-300 ease-out
          ${isOpen ? 'w-64' : 'w-20'}
        `}>

          {/* Header */}
          <div className="flex items-center justify-between p-5">
            {isOpen && <h2 className="text-xl font-semibold text-gray-300">Menu</h2>}
            <button 
              onClick={onToggle}
              className="p-1 text-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
                {isOpen ? <X size={30} /> : <Menu size={24} />}
              </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4">
            {menuItems.map((item) => {
              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-7 py-4 text-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-colors 
                      ${ isActive ? "text-blue-600"
                        : "text-gray-300 hover:bg-gray-100 hover:text-blue-500"
                    }`
                  }
                >
                  <item.icon size={20} className='flex-shrink-0' />
                  {isOpen && <span className="font-medium">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <div className={`transition-all duration-300 ease-out ${isOpen ? 'w-64' : 'w-20'}`}></div>
    </>
  )
}
