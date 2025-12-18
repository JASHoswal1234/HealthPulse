'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Activity, MapPin, FileText, BookOpen } from 'lucide-react'

const navItems = [
  { href: '/tools', label: 'Utility', icon: Activity },
  { href: '/map', label: 'Map', icon: MapPin },
  { href: '/diary', label: 'Diary', icon: BookOpen },
  { href: '/report', label: 'Report', icon: FileText },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] lg:w-[85%]">
  <div className="
    hidden lg:flex
    backdrop-blur-2xl
    bg-white/10
    border border-white/20
    shadow-[0_8px_40px_rgba(0,0,0,0.15)]
    rounded-2xl
    px-6 py-4
    items-center justify-between
    supports-[backdrop-filter]:bg-white/5
  ">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600
            rounded-xl flex items-center justify-center group-hover:scale-110
            transition-transform shadow-md"
          >
            <Activity className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">HealthPulse</h1>
            <p className="text-xs text-gray-500">Community Health Monitor</p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-xl
                  text-sm font-medium transition-all
                  ${isActive 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>

      </div>
    </nav>
  )
}
