'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Stethoscope, Pill, Clock, ExternalLink, Bell, Plus, Trash2, 
  Wrench, MapPin, AlertCircle 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ToolsPage() {
  const [reminders, setReminders] = useState([
    {
      id: '1',
      name: 'Vitamin D',
      time: '09:00',
      frequency: 'daily',
      enabled: true
    },
    {
      id: '2',
      name: 'Pain Reliever',
      time: '20:00',
      frequency: 'as_needed',
      enabled: false
    }
  ])
  const [notificationPermission, setNotificationPermission] = useState('default')

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
    }
  }, [])

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)

      if (permission === 'granted') {
        new Notification('HealthPulse', {
          body: 'Notifications enabled! You\'ll receive medicine reminders.',
          icon: '/icon-192x192.png'
        })
      }
    }
  }

  const findDoctor = () => {
    const query = encodeURIComponent('nearby clinics hospitals')
    window.open(`https://www.google.com/maps/search/${query}`, '_blank')
  }

  const addReminder = () => {
    const name = prompt('Medicine name:')
    if (!name) return

    const time = prompt('Time (HH:MM format):', '09:00')
    if (!time) return

    const frequency = prompt('Frequency (daily/weekly/as_needed):', 'daily')
    if (!frequency || !['daily', 'weekly', 'as_needed'].includes(frequency)) return

    const newReminder = {
      id: Date.now().toString(),
      name,
      time,
      frequency,
      enabled: true
    }

    setReminders(prev => [...prev, newReminder])

    if (notificationPermission === 'granted') {
      scheduleNotification(newReminder)
    }
  }

  const toggleReminder = (id) => {
    setReminders(prev => prev.map(reminder =>
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ))
  }

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id))
  }

  const scheduleNotification = (reminder) => {
    if (!reminder.enabled || notificationPermission !== 'granted') return

    const [hours, minutes] = reminder.time.split(':').map(Number)
    const now = new Date()
    const scheduledTime = new Date()
    scheduledTime.setHours(hours, minutes, 0, 0)

    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1)
    }

    const timeUntilNotification = scheduledTime.getTime() - now.getTime()

    if (reminder.frequency === 'daily') {
      setTimeout(() => {
        new Notification('Medicine Reminder', {
          body: `Time to take ${reminder.name}`,
          icon: '/icon-192x192.png',
          requireInteraction: true
        })

        scheduleNotification(reminder)
      }, timeUntilNotification)
    }
  }

  useEffect(() => {
    if (notificationPermission === 'granted') {
      reminders.forEach(reminder => {
        scheduleNotification(reminder)
      })
    }
  }, [reminders, notificationPermission])

  return (
    <div className="pb-20 lg:pb-8">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
        
        {/* Mobile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mb-6"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Wrench className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Health Tools</h1>
              <p className="text-sm text-gray-600">Utilities to support your health</p>
            </div>
          </div>
        </motion.div>

        {/* Desktop Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:block mb-8"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Health Tools</h2>
          <p className="text-lg text-gray-600">Utilities to support your health journey and wellbeing</p>
        </motion.div>

        {/* Find a Doctor Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={findDoctor}>
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center space-x-3">
                <Stethoscope size={24} className="text-teal-600" />
                <span>Find a Doctor</span>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Locate nearby healthcare providers in your area</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Quickly find nearby clinics, hospitals, and healthcare providers using Google Maps. 
                  Get directions, contact information, and reviews all in one place.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 rounded-xl border-2 border-teal-200 bg-white hover:bg-teal-50 text-teal-700 font-semibold flex items-center justify-center space-x-2 transition-all"
                >
                  <MapPin size={18} />
                  <span>Open in Google Maps</span>
                  <ExternalLink size={16} />
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Medicine Reminder Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center space-x-3">
                <Pill size={24} className="text-teal-600" />
                <span>Medicine Reminder</span>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Set up medication reminders and receive notifications</p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6 lg:space-y-8">
                
                {/* Notification Permission */}
                {notificationPermission !== 'granted' && (
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Bell className="text-amber-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-amber-900 text-lg mb-1">Enable Notifications</h3>
                        <p className="text-sm text-amber-700 mb-4">
                          Allow browser notifications to receive medicine reminders at scheduled times
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={requestNotificationPermission}
                          className="py-2 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-all"
                        >
                          Enable Notifications
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reminders List */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900 mb-3">
                    <Clock size={18} className="text-teal-600" />
                    <span>Your Reminders</span>
                  </label>
                  
                  <div className="space-y-3">
                    {reminders.map((reminder, index) => (
                      <motion.div
                        key={reminder.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-100"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <button
                            onClick={() => toggleReminder(reminder.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                              reminder.enabled
                                ? 'bg-teal-600 border-teal-600'
                                : 'bg-white border-gray-300'
                            }`}
                          >
                            {reminder.enabled && (
                              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 mb-1">{reminder.name}</div>
                            <div className="text-sm text-gray-600 flex items-center space-x-2">
                              <Clock size={14} />
                              <span>{reminder.time}</span>
                              <span>•</span>
                              <span className="capitalize">{reminder.frequency.replace('_', ' ')}</span>
                            </div>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteReminder(reminder.id)}
                          className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </motion.div>
                    ))}

                    {reminders.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Pill size={32} className="text-gray-400" />
                        </div>
                        <p className="text-sm font-medium">No medicine reminders set</p>
                        <p className="text-xs text-gray-400 mt-1">Add your first reminder below</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add Reminder Button */}
                <motion.button
                  onClick={addReminder}
                  disabled={notificationPermission !== 'granted'}
                  whileHover={{ scale: notificationPermission === 'granted' ? 1.02 : 1 }}
                  whileTap={{ scale: notificationPermission === 'granted' ? 0.98 : 1 }}
                  className={`
                    w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2
                    transition-all
                    ${notificationPermission === 'granted'
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  <Plus size={20} />
                  <span>Add Reminder</span>
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <div className="bg-white/60 backdrop-blur-sm border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">More Tools Coming Soon</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We're working on additional health tools including a symptom checker, health tips library, 
                  emergency contacts, and more features to support your wellness journey.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}