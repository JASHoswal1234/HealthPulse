'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Activity, AlertTriangle, X, ArrowLeft } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Card, CardContent, GlassCard } from '@/components/ui/card'
import { BottomNav } from '@/components/navigation/BottomNav'
import { useRouter } from 'next/navigation'
import { TopNav } from '@/components/navigation/TopNav'


// This loads your real Leaflet map
const MapComponent = dynamic(
  () => import('@/components/maps/HealthMap').then(mod => ({ default: mod.HealthMap })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 font-medium">Loading map...</p>
        </div>
      </div>
    )
  }
)


const mockLocations = [
  { id: '1', ward: 'Jayanagar', lat: 12.9250, lng: 77.5937, feverCount: 14, coughCount: 9, severity: 'moderate' },
  { id: '2', ward: 'Koramangala', lat: 12.9352, lng: 77.6245, feverCount: 8, coughCount: 6, severity: 'low' },
  { id: '3', ward: 'Indiranagar', lat: 12.9716, lng: 77.6412, feverCount: 22, coughCount: 15, severity: 'high' },
  { id: '4', ward: 'Whitefield', lat: 12.9698, lng: 77.7499, feverCount: 11, coughCount: 8, severity: 'low' },
  { id: '5', ward: 'Malleshwaram', lat: 13.0067, lng: 77.5703, feverCount: 6, coughCount: 4, severity: 'low' },
  { id: '6', ward: 'BTM Layout', lat: 12.9165, lng: 77.6101, feverCount: 18, coughCount: 12, severity: 'moderate' },
  { id: '7', ward: 'Electronic City', lat: 12.8456, lng: 77.6603, feverCount: 10, coughCount: 7, severity: 'low' },
  { id: '8', ward: 'Yelahanka', lat: 13.1007, lng: 77.5963, feverCount: 15, coughCount: 11, severity: 'moderate' },
]

const userArea = "BTM Layout";
const severity = "moderate"; // low | moderate | high
const severityText = "Moderate activity nearby";
const todaysReports = 9;


function MapGlassCard({ children, className = '' }) {
  return (
    <div className={`bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl ${className}`}>
      {children}
    </div>
  )
}


function StatsCard({ totalReports, highSeverityCount }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      
    </motion.div>
  )
}

function LegendCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <MapGlassCard className="p-5 rounded-2xl">
  <div className="flex flex-col space-y-4">

    {/* Header Row */}
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="bg-teal-100 p-2.5 rounded-xl">
          <MapPin className="text-teal-600" size={20} />
        </div>
        <div>
          <p className="text-xs text-gray-600 font-medium">Your Area</p>
          <p className="text-xl font-bold text-gray-900">
            {userArea || "BTM Layout"}
          </p>
        </div>
      </div>

      {/* Severity Chip */}
      <span className={`
        px-3 py-1 text-xs font-semibold rounded-full border
        ${
          (severity || "moderate") === "low"
            ? "bg-green-50 text-green-700 border-green-200"
            : (severity === "moderate")
            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
            : "bg-red-50 text-red-700 border-red-200"
        }
      `}>
        {severity || "Moderate"}
      </span>
    </div>

    {/* Subtext */}
    <div className="text-sm text-gray-700 font-medium">
      {severityText || "Moderate activity nearby"}
    </div>

    {/* Today Activity */}
    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
      <span className="text-sm font-semibold text-gray-800">
        {todaysReports || 9} reports today
      </span>
    </div>

  </div>
</MapGlassCard>


    </motion.div>
  )
}

function LocationDetailsCard({ location, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-8 right-8 z-50 w-96"
    >
      <MapGlassCard className="p-6 rounded-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-100 p-2.5 rounded-xl">
              <MapPin className="text-teal-600" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xl">
                {location.ward}
              </h3>
              <p className="text-xs text-gray-500 capitalize">
                {location.severity} severity
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2"
          >
            <X size={18} />
          </motion.button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="text-xs text-red-600 font-medium mb-1">Fever</p>
            <p className="text-3xl font-bold text-red-700">{location.feverCount}</p>
            <p className="text-xs text-red-600 mt-1">reports</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-xs text-blue-600 font-medium mb-1">Cough</p>
            <p className="text-3xl font-bold text-blue-700">{location.coughCount}</p>
            <p className="text-xs text-blue-600 mt-1">reports</p>
          </div>
        </div>
      </MapGlassCard>
    </motion.div>
  )
}

// function BottomNav() {
//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
//       <div className="text-center text-sm text-gray-600">Bottom Navigation</div>
//     </div>
//   )
// }

export default function MapPage() {
  const [locations, setLocations] = useState(mockLocations)
  const [selectedLocation, setSelectedLocation] = useState(null)

  const totalReports = locations.reduce((acc, loc) => acc + loc.feverCount + loc.coughCount, 0)
  const highSeverityCount = locations.filter(loc => loc.severity === 'high').length

  useEffect(() => {
    const interval = setInterval(() => {
      setLocations(prev => prev.map(loc => {
        const newFeverCount = Math.max(0, loc.feverCount + Math.floor(Math.random() * 3) - 1)
        const newCoughCount = Math.max(0, loc.coughCount + Math.floor(Math.random() * 3) - 1)
        const total = newFeverCount + newCoughCount
        
        let severity = 'low'
        if (total > 20) severity = 'high'
        else if (total > 10) severity = 'moderate'
        
        return {
          ...loc,
          feverCount: newFeverCount,
          coughCount: newCoughCount,
          severity
        }
      }))
    }, 8000)

    return () => clearInterval(interval)
  }, [])


const router = useRouter();

const handleBack = () => {
  router.back();     // Uses browser history
  // OR: router.push('/') if you want fixed behaviour
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/30 via-white to-blue-50/30">
      {/* Desktop Layout */}
      <div> 
        {/* Fixed Header */}
        


        {/* Main Content */}
        <div className="max-w-7xl mx-auto w-full px-8 pt-28 pb-10">

          <div className="grid grid-cols-12 gap-6">
            {/* Left Column: Stats + Legend */}
            <div className="col-span-3 space-y-6 relative z-0">
              <StatsCard totalReports={totalReports} highSeverityCount={highSeverityCount} />
              <LegendCard />
            </div>

{/* Right Column: Map */}
<div className="col-span-9">
  <div className="relative z-0">
    <div className="w-full h-[75vh] rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-white">
      <MapComponent
        locations={locations}
        selectedLocation={selectedLocation}
        onLocationSelect={setSelectedLocation}
      />
    </div>
  </div>
</div>


          </div>
        </div>

        {/* Location Details Card */}
        <AnimatePresence>
          {selectedLocation && (
            <LocationDetailsCard 
              location={selectedLocation} 
              onClose={() => setSelectedLocation(null)} 
            />
          )}
        </AnimatePresence>
      </div>

{/* Mobile Layout */}
<div className="lg:hidden relative h-screen flex flex-col">
  {/* Mobile Header */}
  <motion.header 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative z-20 flex-shrink-0"
  >
    <div className="m-4 rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/50 shadow-2xl">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
          Bengaluru Health Map
        </h1>
        <p className="text-sm text-gray-600 font-medium">
          Real-time community health insights
        </p>
      </div>
    </div>
  </motion.header>

  {/* Mobile Map Container */}
  <div className="flex-1 relative px-4 pb-20">
    <div className="h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
      <MapComponent
        locations={locations}
        selectedLocation={selectedLocation}
        onLocationSelect={setSelectedLocation}
      />
    </div>

    {/* Mobile Stats Card - Overlaid on Map */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="absolute top-4 left-4 right-4 z-10"
    >
      <MapGlassCard className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-100 p-2.5 rounded-xl">
              <Activity className="text-teal-600" size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-600 font-medium">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
            </div>
          </div>
          {highSeverityCount > 0 && (
            <div className="flex items-center space-x-2 bg-amber-50 px-3 py-2 rounded-xl border border-amber-100">
              <AlertTriangle size={16} className="text-amber-600" />
              <span className="text-sm font-semibold text-amber-700">
                {highSeverityCount}
              </span>
            </div>
          )}
        </div>
      </MapGlassCard>
    </motion.div>

    {/* Mobile Legend Card - Overlaid on Map */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="absolute bottom-4 left-4 z-10"
    >
      <MapGlassCard className="p-4">
        <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wide">Severity Levels</h3>
        <div className="space-y-2.5">
          {[
            { color: 'bg-green-500', label: 'Low', range: '0-10' },
            { color: 'bg-yellow-500', label: 'Moderate', range: '11-20' },
            { color: 'bg-red-500', label: 'High', range: '20+' },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-2.5">
              <div className={`w-4 h-4 ${item.color} rounded-full shadow-lg`} />
              <span className="text-xs font-semibold text-gray-700">{item.label}</span>
              <span className="text-xs text-gray-500">({item.range})</span>
            </div>
          ))}
        </div>
      </MapGlassCard>
    </motion.div>
    
    {/* Mobile Location Details */}
    <AnimatePresence>
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="absolute bottom-4 right-4 left-4 z-20"
        >
          <MapGlassCard className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-teal-100 p-2.5 rounded-xl">
                  <MapPin className="text-teal-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {selectedLocation.ward}
                  </h3>
                  <p className="text-xs text-gray-500 capitalize">
                    {selectedLocation.severity} severity
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedLocation(null)}
                className="text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2"
              >
                <X size={18} />
              </motion.button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 relative z-0">
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <p className="text-xs text-red-600 font-medium mb-1">Fever</p>
                <p className="text-3xl font-bold text-red-700">{selectedLocation.feverCount}</p>
                <p className="text-xs text-red-600 mt-1">reports</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs text-blue-600 font-medium mb-1">Cough</p>
                <p className="text-3xl font-bold text-blue-700">{selectedLocation.coughCount}</p>
                <p className="text-xs text-blue-600 mt-1">reports</p>
              </div>
            </div>
          </MapGlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  </div>

  <BottomNav />
</div>
    </div>
  )
}