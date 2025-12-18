'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, MapPin, Calendar, Thermometer, 
  Wind, Droplet, Activity, AlertCircle, Send 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, GlassCard } from '@/components/ui/card'

const symptoms = [
  { id: 'fever', name: 'Fever', icon: Thermometer, color: 'red' },
  { id: 'cough', name: 'Cough', icon: Wind, color: 'blue' },
  { id: 'fatigue', name: 'Fatigue', icon: Activity, color: 'yellow' },
  { id: 'bodyache', name: 'Body Ache', icon: Droplet, color: 'purple' },
]

const wards = [
  'Jayanagar', 'Koramangala', 'Indiranagar', 'Whitefield', 
  'Malleshwaram', 'BTM Layout', 'Electronic City', 'Yelahanka'
]

export default function ReportPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [selectedWard, setSelectedWard] = useState('')
  const [severity, setSeverity] = useState('mild')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSelectedSymptoms([])
      setSelectedWard('')
      setSeverity('mild')
      setNotes('')
      setSubmitted(false)
    }, 3000)
  }

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
              <FileText className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Report Symptoms</h1>
              <p className="text-sm text-gray-600">Help track community health</p>
            </div>
          </div>
        </motion.div>

        {/* Desktop Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:block mb-8"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Report Symptoms</h2>
          <p className="text-lg text-gray-600">Your reports help us track and respond to health trends in the community</p>
        </motion.div>

        {/* Success Message */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-6"
          >
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-green-900 text-lg mb-1">Report Submitted!</h3>
                <p className="text-sm text-green-700">Thank you for helping keep our community informed and healthy.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="border-b border-gray-100">
              <CardTitle>Symptom Report Form</CardTitle>
              <p className="text-sm text-gray-600 mt-1">All information is anonymous and confidential</p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                
                {/* Location Selection */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900 mb-3">
                    <MapPin size={18} className="text-teal-600" />
                    <span>Your Location</span>
                  </label>
                  <select
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-gray-900 font-medium"
                  >
                    <option value="">Select your ward</option>
                    {wards.map(ward => (
                      <option key={ward} value={ward}>{ward}</option>
                    ))}
                  </select>
                </div>

                {/* Symptom Selection */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900 mb-3">
                    <Activity size={18} className="text-teal-600" />
                    <span>Select Symptoms</span>
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {symptoms.map((symptom) => {
                      const isSelected = selectedSymptoms.includes(symptom.id)
                      const Icon = symptom.icon
                      
                      return (
                        <motion.button
                          key={symptom.id}
                          type="button"
                          onClick={() => toggleSymptom(symptom.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`
                            p-4 rounded-xl border-2 transition-all
                            ${isSelected 
                              ? `border-${symptom.color}-500 bg-${symptom.color}-50` 
                              : 'border-gray-200 bg-white hover:border-gray-300'
                            }
                          `}
                        >
                          <Icon 
                            size={24} 
                            className={`mx-auto mb-2 ${
                              isSelected ? `text-${symptom.color}-600` : 'text-gray-400'
                            }`} 
                          />
                          <p className={`text-sm font-semibold ${
                            isSelected ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {symptom.name}
                          </p>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Severity Level */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900 mb-3">
                    <Thermometer size={18} className="text-teal-600" />
                    <span>Severity Level</span>
                  </label>
                  <div className="flex space-x-3">
                    {['mild', 'moderate', 'severe'].map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSeverity(level)}
                        className={`
                          flex-1 py-3 px-4 rounded-xl border-2 font-semibold capitalize transition-all
                          ${severity === level
                            ? level === 'mild' ? 'border-green-500 bg-green-50 text-green-700'
                            : level === 'moderate' ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                          }
                        `}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900 mb-3">
                    <FileText size={18} className="text-teal-600" />
                    <span>Additional Notes (Optional)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Any additional details you'd like to share..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={selectedSymptoms.length === 0 || !selectedWard}
                  whileHover={{ scale: selectedSymptoms.length > 0 && selectedWard ? 1.02 : 1 }}
                  whileTap={{ scale: selectedSymptoms.length > 0 && selectedWard ? 0.98 : 1 }}
                  className={`
                    w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2
                    transition-all
                    ${selectedSymptoms.length > 0 && selectedWard
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  <Send size={20} />
                  <span>Submit Report</span>
                </motion.button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <GlassCard className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Your Privacy Matters</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All reports are completely anonymous. We only collect symptom data and general location to help 
                  track community health trends. Your personal information is never stored or shared.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

      </div>
    </div>
  )
}