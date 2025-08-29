
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Camera, MessageCircle, BarChart3, Award, MapPin } from 'lucide-react'

const Navbar: React.FC = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/disposal', icon: Camera, label: 'Descartar' },
    { path: '/ai-chat', icon: MessageCircle, label: 'IA Chat' },
    { path: '/history', icon: BarChart3, label: 'Histórico' },
    { path: '/achievements', icon: Award, label: 'Conquistas' },
    { path: '/map', icon: MapPin, label: 'Mapa' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                isActive 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-500 hover:text-green-600'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar
