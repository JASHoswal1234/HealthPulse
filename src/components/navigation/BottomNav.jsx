'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Home, MapPin, FileText, BookOpen, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { icon: Activity, label: 'Utility', path: '/tools' },
  { icon: MapPin, label: 'Map', path: '/map' },
  { icon: FileText, label: 'Report', path: '/report' },
  { icon: BookOpen, label: 'Diary', path: '/diary' },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    // IMPORTANT: This wrapper hides bottom nav on desktop (lg screens and above)
    <div className="lg:hidden">
      <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
        {/* Frosted glass effect */}
        <div className="mx-4 mb-4 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-gray-900/10 overflow-hidden">
          <div className="flex items-center justify-around px-2 py-3">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              const Icon = item.icon

              return (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className="relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300 group"
                >
                  {/* Active background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-teal-100 rounded-2xl"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      y: isActive ? -2 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="relative z-10"
                  >
                    <Icon
                      size={24}
                      className={`transition-colors duration-300 ${
                        isActive
                          ? 'text-teal-600 stroke-[2.5]'
                          : 'text-gray-500 group-hover:text-gray-700'
                      }`}
                    />
                  </motion.div>

                  {/* Label */}
                  <motion.span
                    animate={{
                      opacity: isActive ? 1 : 0.6,
                      scale: isActive ? 1 : 0.9
                    }}
                    className={`relative z-10 text-[10px] font-medium mt-0.5 ${
                      isActive ? 'text-teal-600' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </motion.span>

                  {/* Hover effect */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-gray-100/0 group-hover:bg-gray-100/50 transition-colors duration-300" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}