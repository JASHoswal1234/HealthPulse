'use client'
import { useUser } from "@/lib/useUser";
import { useRouter } from "next/navigation";
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, Users, MapPin, Heart, 
  Droplet, Wind 
} from 'lucide-react'
import {Calendar } from 'lucide-react'
import Squares from "@/components/background/Squares";
import { Card, CardContent, CardHeader, CardTitle, GlassCard } from '@/components/ui/card'
import TrendChart from '@/components/TrendChart'

const quickStats = [
  { 
    icon: MapPin, 
    label: 'Your Area', 
    value: 'BTM Layout', 
    description: 'Moderate activity', 
    color: 'teal'
  },

  { 
    icon: Activity, 
    label: 'Today’s Symptoms', 
    value: '2 logged', 
    description: 'Track how you feel today',
    color: 'amber'
  },

  { 
    icon: Calendar, 
    label: 'Next Reminder', 
    value: '8:00 PM', 
    description: 'Medicine reminder scheduled',
    color: 'blue'
  },

  { 
    icon: Heart, 
    label: 'Your Health Score', 
    value: 'Good', 
    description: 'Your recent condition looks stable',
    color: 'rose'
  },
]



const activityNearYou = [
  { 
    icon: MapPin, 
    name: 'BTM Layout', 
    count: 23, 
    severity: 'moderate', 
    color: 'bg-yellow-500', 
    lightBg: 'bg-yellow-50' 
  },
  { 
    icon: MapPin, 
    name: 'Koramangala', 
    count: 14, 
    severity: 'low', 
    color: 'bg-green-500', 
    lightBg: 'bg-green-50' 
  },
  { 
    icon: MapPin, 
    name: 'Indiranagar', 
    count: 32, 
    severity: 'high', 
    color: 'bg-red-500', 
    lightBg: 'bg-red-50' 
  },
  { 
    icon: MapPin, 
    name: 'Whitefield', 
    count: 18, 
    severity: 'low', 
    color: 'bg-green-500', 
    lightBg: 'bg-green-50' 
  },
]


const nearbyWards = [
  { name: 'Jayanagar', cases: 14, severity: 'moderate', color: 'yellow' },
  { name: 'Koramangala', cases: 8, severity: 'low', color: 'green' },
  { name: 'Indiranagar', cases: 22, severity: 'high', color: 'red' },
  { name: 'BTM Layout', cases: 18, severity: 'moderate', color: 'yellow' },
]

export default function HomePage() {
  // TEMPORARY PROTOTYPE MODE (Remove after real login integration)
  const user = { phone: "+910000000000" };

  const [selectedPeriod, setSelectedPeriod] = useState("week");


  return (
    <div className="pb-20 lg:pb-8">

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">

        {/* Mobile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mb-6"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Activity className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HealthPulse</h1>
              <p className="text-sm text-gray-600">Bengaluru Health Monitor</p>
            </div>
          </div>
        </motion.div>

        {/* Desktop Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:block mb-8"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-lg text-gray-600">Here's what's happening in your community today</p>
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8"
        >
          {quickStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
            >
              <GlassCard className="p-4 lg:p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`text-${stat.color}-600`} size={20} />
                  </div>
                  {stat.description && (
  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
)}

                </div>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs lg:text-sm text-gray-600 font-medium">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
          
          {/* Your Week at a Glance */}
{/* Your Week at a Glance */}
<motion.div
  className="flex"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
  <Card className="h-full flex flex-col">
    <CardHeader className="border-b border-gray-100">
      <CardTitle>Your Week at a Glance</CardTitle>
      <p className="text-sm text-gray-600 mt-1">
        Your personal symptom activity for the last 7 days
      </p>
    </CardHeader>

    <CardContent className="flex-1 grid grid-cols-7 gap-4 pt-4">
      {/* dots grid (unchanged) */}
      {[
        { day: "Mon", fever: 1, cough: 0, fatigue: 1 },
        { day: "Tue", fever: 0, cough: 1, fatigue: 0 },
        { day: "Wed", fever: 2, cough: 0, fatigue: 1 },
        { day: "Thu", fever: 0, cough: 0, fatigue: 0 },
        { day: "Fri", fever: 1, cough: 1, fatigue: 0 },
        { day: "Sat", fever: 0, cough: 0, fatigue: 1 },
        { day: "Sun", fever: 0, cough: 1, fatigue: 0 },
      ].map((dayData, idx) => (
        <motion.div
          key={dayData.day}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + idx * 0.05 }}
          className="flex flex-col items-center"
        >
          <div className="text-xs text-gray-500 mb-2">{dayData.day}</div>
          <div className={`w-3 h-3 rounded-full mb-1 ${dayData.fever ? "bg-red-500" : "bg-gray-200"}`} />
          <div className={`w-3 h-3 rounded-full mb-1 ${dayData.cough ? "bg-blue-500" : "bg-gray-200"}`} />
          <div className={`w-3 h-3 rounded-full ${dayData.fatigue ? "bg-yellow-500" : "bg-gray-200"}`} />
        </motion.div>
      ))}
    </CardContent>

    <div className="px-6 pb-4 pt-2 flex justify-center space-x-6 text-sm">
      <div className="flex items-center space-x-2">
        <span className="w-3 h-3 bg-red-500 rounded-full" />
        <span className="text-gray-600">Fever</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="w-3 h-3 bg-blue-500 rounded-full" />
        <span className="text-gray-600">Cough</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="w-3 h-3 bg-yellow-500 rounded-full" />
        <span className="text-gray-600">Fatigue</span>
      </div>
    </div>
  </Card>
</motion.div>

{/* Wellness Tips */}
<motion.div
  className="flex"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
>
  <Card className="h-full flex flex-col">
    <CardHeader>
      <CardTitle>Wellness Tips</CardTitle>
      <p className="text-sm text-gray-600 mt-1">Based on today’s symptoms</p>
    </CardHeader>

    <CardContent className="flex-1 space-y-3">
      {[
        "Stay hydrated — drink at least 2–3 cups of water this morning.",
        "Mild fatigue detected — take a 5-minute walk or stretch.",
        "Air quality is moderate in your area — avoid outdoor workouts.",
      ].map((tip, i) => (
        <div key={i} className="flex items-start space-x-3">
          <div className="w-2.5 h-2.5 bg-teal-500 rounded-full mt-2" />
          <p className="text-gray-700 text-sm">{tip}</p>
        </div>
      ))}
    </CardContent>
  </Card>
</motion.div>
{/* Activity Near You */}
{/* Activity Near You */}
<motion.div
  className="flex flex-col h-full"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
>
  <Card className="flex flex-col h-full">
    <CardHeader className="border-b border-gray-100">
      <CardTitle>Activity Near You</CardTitle>
      <p className="text-sm text-gray-600 mt-1">Last 24 hours</p>
    </CardHeader>

    {/* FIX: flex-1 + flex-col + justify-between ensures equal height */}
    <CardContent className="flex-1 flex flex-col space-y-4 justify-start">
      {activityNearYou.map((loc, idx) => {
        const Icon = loc.icon
        return (
          <motion.div
            key={loc.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 ${loc.lightBg} rounded-xl flex items-center justify-center 
                group-hover:scale-110 transition-transform`}
              >
                <Icon className={`${loc.color.replace('bg-', 'text-')}`} size={18} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">{loc.name}</p>
                <p className="text-xs text-gray-500 capitalize">{loc.severity} activity</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{loc.count}</p>
            </div>
          </motion.div>
        )
      })}
    </CardContent>
  </Card>
</motion.div>

        </div>

        {/* Nearby Wards Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="border-b border-gray-100">
              <CardTitle>Nearby Wards</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Current activity in your area</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {nearbyWards.map((ward, idx) => (
                  <motion.div
                    key={ward.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer"
                  >
                    <div className={`p-4 rounded-xl border-2 ${
                      ward.color === 'red' ? 'border-red-200 bg-red-50' :
                      ward.color === 'yellow' ? 'border-yellow-200 bg-yellow-50' :
                      'border-green-200 bg-green-50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <MapPin size={16} className={`${
                          ward.color === 'red' ? 'text-red-600' :
                          ward.color === 'yellow' ? 'text-yellow-600' :
                          'text-green-600'
                        }`} />
                        <span className={`text-xs font-bold uppercase tracking-wide ${
                          ward.color === 'red' ? 'text-red-700' :
                          ward.color === 'yellow' ? 'text-yellow-700' :
                          'text-green-700'
                        }`}>
                          {ward.severity}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">{ward.name}</h4>
                      <p className="text-2xl font-bold text-gray-900">{ward.cases} <span className="text-sm font-normal text-gray-600">cases</span></p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  )
}