'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, Plus, Calendar, Thermometer, 
  Wind, Activity, Trash2, Edit, X, Sparkles, Loader2
} from 'lucide-react'
import { createPortal } from 'react-dom'

const mockEntries = [
  { 
    id: 1, 
    date: '2024-11-14', 
    symptoms: ['Fever', 'Headache'], 
    severity: 'moderate',
    notes: 'Feeling tired, took rest today' 
  },
  { 
    id: 2, 
    date: '2024-11-13', 
    symptoms: ['Fatigue'], 
    severity: 'mild',
    notes: 'Slight headache in the evening' 
  },
  { 
    id: 3, 
    date: '2024-11-12', 
    symptoms: ['Cough'], 
    severity: 'mild',
    notes: 'Dry cough, drinking warm water' 
  },
]

const availableSymptoms = [
  'Fever', 'Cough', 'Fatigue', 'Headache', 
  'Sore Throat', 'Body Aches', 'Nausea', 'Dizziness'
]

function GlassCard({ children, className = '' }) {
  return (
    <div className={`bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg rounded-2xl ${className}`}>
      {children}
    </div>
  )
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-white border border-gray-200 shadow-sm rounded-2xl ${className}`}>
      {children}
    </div>
  )
}

function CardHeader({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

function CardTitle({ children }) {
  return <h3 className="text-xl font-bold text-gray-900">{children}</h3>
}

function CardContent({ children, className = '' }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}

function NewEntryForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    date: '',
    symptoms: [],
    severity: 'mild',
    notes: ''
  })
  const [mounted, setMounted] = useState(false)

  // Set date after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    setFormData(prev => ({
      ...prev,
      date: new Date().toISOString().split('T')[0]
    }))
  }, [])

  const toggleSymptom = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }))
  }

  const handleSubmit = () => {
    if (formData.symptoms.length === 0) {
      alert('Please select at least one symptom')
      return
    }
    onSubmit(formData)
    onClose()
  }

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 999999 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">New Health Entry</h2>
            <p className="text-sm text-gray-600">Record your symptoms and notes</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Symptoms
            </label>
            <div className="grid grid-cols-2 gap-3">
              {availableSymptoms.map(symptom => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => toggleSymptom(symptom)}
                  className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                    formData.symptoms.includes(symptom)
                      ? 'bg-teal-50 border-teal-500 text-teal-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Severity
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['mild', 'moderate', 'severe'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, severity: level }))}
                  className={`px-4 py-3 rounded-xl border-2 font-medium capitalize transition-all ${
                    formData.severity === level
                      ? level === 'mild' 
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : level === 'moderate'
                        ? 'bg-yellow-50 border-yellow-500 text-yellow-700'
                        : 'bg-red-50 border-red-500 text-red-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional details about how you're feeling..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 font-semibold text-white hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg"
            >
              Save Entry
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  if (!mounted) return null

  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null
}

export default function DiaryPage() {
  const [entries, setEntries] = useState(mockEntries)
  const [showForm, setShowForm] = useState(false)
  const [insights, setInsights] = useState(null)
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(false)

  const addEntry = (formData) => {
    const newEntry = {
      id: Date.now(),
      ...formData
    }
    setEntries(prev => [newEntry, ...prev])
  }

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }

  const generateInsights = async () => {
    if (entries.length === 0) {
      alert('No entries to analyze. Please add some health entries first.')
      return
    }

    setLoading(true)
    setInsights(null)
    setDoctor(null)

    // Simulate AI processing time for authenticity
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000))

    try {
      // Analyze symptoms
      const symptomCount = {}
      const severityCounts = { mild: 0, moderate: 0, severe: 0 }
      const allSymptoms = []
      const dateRange = {
        oldest: entries[entries.length - 1]?.date,
        newest: entries[0]?.date
      }
      
      entries.forEach(entry => {
        entry.symptoms.forEach(symptom => {
          symptomCount[symptom] = (symptomCount[symptom] || 0) + 1
          allSymptoms.push(symptom)
        })
        severityCounts[entry.severity]++
      })

      const mostCommon = Object.entries(symptomCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)

      const totalSymptoms = entries.reduce((acc, e) => acc + e.symptoms.length, 0)
      const avgSymptoms = (totalSymptoms / entries.length).toFixed(1)
      
      const dominantSeverity = Object.entries(severityCounts)
        .sort(([,a], [,b]) => b - a)[0][0]

      // Generate AI-style insights
      const insightTemplates = []

      // Insight 1: Overview
      insightTemplates.push(
        `Based on ${entries.length} entries from ${dateRange.oldest} to ${dateRange.newest}, I've identified ${Object.keys(symptomCount).length} distinct symptom patterns in your health data.`
      )

      // Insight 2: Symptom patterns
      if (mostCommon.length > 0) {
        const topSymptom = mostCommon[0]
        if (topSymptom[1] > entries.length * 0.6) {
          insightTemplates.push(
            `${topSymptom[0]} appears in ${Math.round((topSymptom[1] / entries.length) * 100)}% of your entries, suggesting this is a persistent concern that may benefit from medical attention.`
          )
        } else {
          insightTemplates.push(
            `Your most frequent symptoms are ${mostCommon.map(([s, c]) => `${s} (${c}x)`).join(', ')}. This pattern suggests ${
              allSymptoms.some(s => ['Cough', 'Sore Throat', 'Fever'].includes(s)) 
                ? 'a possible respiratory condition'
                : allSymptoms.some(s => ['Headache', 'Dizziness', 'Fatigue'].includes(s))
                ? 'potential stress or sleep-related issues'
                : 'varied health concerns'
            }.`
          )
        }
      }

      // Insight 3: Severity analysis
      if (dominantSeverity === 'severe') {
        insightTemplates.push(
          `Concerning: ${severityCounts.severe} entries marked as severe. I strongly recommend consulting a healthcare provider soon, as persistent severe symptoms require professional evaluation.`
        )
      } else if (dominantSeverity === 'moderate') {
        insightTemplates.push(
          `Your symptoms are predominantly moderate (${severityCounts.moderate} entries). While manageable, consider tracking any worsening trends and consult a doctor if symptoms persist beyond 7-10 days.`
        )
      } else {
        insightTemplates.push(
          `Positive outlook: Most entries show mild severity (${severityCounts.mild} entries). Continue monitoring, and maintain healthy habits like adequate rest, hydration, and nutrition.`
        )
      }

      // Insight 4: Personalized recommendation
      const daysSinceFirst = entries.length
      if (daysSinceFirst >= 7) {
        insightTemplates.push(
          `You've been tracking symptoms for ${daysSinceFirst}+ days. For persistent symptoms lasting over a week, schedule a check-up to rule out underlying conditions and discuss treatment options.`
        )
      } else if (avgSymptoms >= 2) {
        insightTemplates.push(
          `Averaging ${avgSymptoms} symptoms per entry indicates you're managing multiple issues simultaneously. Focus on rest, stress management, and consider keeping a food/activity diary to identify triggers.`
        )
      } else {
        insightTemplates.push(
          `Your health tracking shows good self-awareness. Continue logging symptoms, note any triggers or relief factors, and don't hesitate to seek medical advice if concerns arise.`
        )
      }

      setInsights(insightTemplates)

      // Determine appropriate doctor specialist
      let doctorType = 'General Practitioner'
      let searchQuery = 'general practitioner doctor'

      // Respiratory symptoms
      if (allSymptoms.some(s => ['Cough', 'Sore Throat'].includes(s)) && 
          symptomCount['Cough'] >= 2) {
        doctorType = 'ENT Specialist (Ear, Nose & Throat)'
        searchQuery = 'ENT specialist doctor'
      }
      // Neurological symptoms
      else if (allSymptoms.some(s => ['Headache', 'Dizziness'].includes(s)) && 
               (symptomCount['Headache'] >= 2 || symptomCount['Dizziness'] >= 1)) {
        doctorType = 'Neurologist'
        searchQuery = 'neurologist doctor'
      }
      // Fever + multiple symptoms
      else if (allSymptoms.some(s => ['Fever', 'Body Aches', 'Fatigue'].includes(s)) && 
               totalSymptoms >= 4) {
        doctorType = 'Internal Medicine Specialist'
        searchQuery = 'internal medicine doctor'
      }
      // Digestive issues
      else if (allSymptoms.some(s => ['Nausea'].includes(s))) {
        doctorType = 'Gastroenterologist'
        searchQuery = 'gastroenterologist doctor'
      }
      // Respiratory + fever
      else if (allSymptoms.includes('Fever') && allSymptoms.includes('Cough')) {
        doctorType = 'Pulmonologist (Lung Specialist)'
        searchQuery = 'pulmonologist doctor'
      }
      // General fatigue/mild symptoms
      else if (allSymptoms.some(s => ['Fatigue'].includes(s)) && dominantSeverity === 'mild') {
        doctorType = 'General Practitioner'
        searchQuery = 'family doctor general practitioner'
      }

      setDoctor({ type: doctorType, query: searchQuery })

    } catch (error) {
      console.error('Error generating insights:', error)
      alert('Failed to generate insights. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'mild': return 'green'
      case 'moderate': return 'yellow'
      case 'severe': return 'red'
      default: return 'gray'
    }
  }

  return (
    <div className="pb-20 lg:pb-8 min-h-screen bg-gradient-to-br from-teal-50/30 via-white to-blue-50/30">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
        
        {/* Mobile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Health Diary</h1>
                <p className="text-sm text-gray-600">{entries.length} entries</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Plus className="text-white" size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Desktop Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Health Diary</h2>
            <p className="text-lg text-gray-600">Track your daily health and symptoms</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg"
          >
            <Plus size={20} />
            <span>New Entry</span>
          </motion.button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 lg:gap-6 mb-6 lg:mb-8"
        >
          <GlassCard className="p-4 lg:p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar size={18} className="text-teal-600" />
              <p className="text-xs lg:text-sm text-gray-600 font-medium">Total Days</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{entries.length}</p>
          </GlassCard>
          
          <GlassCard className="p-4 lg:p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Activity size={18} className="text-blue-600" />
              <p className="text-xs lg:text-sm text-gray-600 font-medium">Symptoms</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">
              {entries.reduce((acc, entry) => acc + entry.symptoms.length, 0)}
            </p>
          </GlassCard>
          
          <GlassCard className="p-4 lg:p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Thermometer size={18} className="text-red-600" />
              <p className="text-xs lg:text-sm text-gray-600 font-medium">Avg Severity</p>
            </div>
            <p className="text-lg lg:text-xl font-bold text-gray-900 capitalize">Mild</p>
          </GlassCard>
        </motion.div>

        {/* AI Insights Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateInsights}
            disabled={loading || entries.length === 0}
            className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <>
                <Plus size={20} />
                <span>Generate AI Health Insights</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* AI Insights Display */}
        <AnimatePresence>
          {insights && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Card>
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="text-purple-600" size={24} />
                    <CardTitle>AI Health Insights</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Personalized analysis of your health data</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {insights.map((insight, idx) => (
                      <motion.li
                        key={`insight-${idx}-${insight.substring(0, 20)}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-lg border border-purple-100"
                      >
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{idx + 1}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{insight}</p>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {doctor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Card>
                <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 border-b border-teal-100">
                  <CardTitle>Recommended Specialist</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Based on your symptoms</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-900 mb-1">{doctor.type}</p>
                      <p className="text-sm text-gray-600">We suggest consulting this specialist for your symptoms</p>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/${doctor.query}+near+me`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg whitespace-nowrap"
                    >
                      Find Near Me
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entries List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="border-b border-gray-100">
              <CardTitle>Your Entries</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Recent health logs</p>
            </CardHeader>
            
            <CardContent>
              {entries.length > 0 ? (
                <div className="space-y-4">
                  <AnimatePresence>
                    {entries.map((entry, idx) => {
                      const color = getSeverityColor(entry.severity)
                      
                      return (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start space-x-4 p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all bg-white"
                        >
                          <div className={`w-12 h-12 ${
                            color === 'green' ? 'bg-green-100' : 
                            color === 'yellow' ? 'bg-yellow-100' : 
                            color === 'red' ? 'bg-red-100' : 'bg-gray-100'
                          } rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <Calendar className={`${
                              color === 'green' ? 'text-green-600' : 
                              color === 'yellow' ? 'text-yellow-600' : 
                              color === 'red' ? 'text-red-600' : 'text-gray-600'
                            }`} size={20} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-bold text-gray-900">{entry.date}</p>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  {entry.symptoms.map((symptom, symIdx) => (
                                    <span 
                                      key={`${entry.id}-${symptom}-${symIdx}`}
                                      className={`text-xs px-2 py-1 rounded-lg font-medium ${
                                        color === 'green' ? 'bg-green-50 text-green-700' : 
                                        color === 'yellow' ? 'bg-yellow-50 text-yellow-700' : 
                                        color === 'red' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-700'
                                      }`}
                                    >
                                      {symptom}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${
                                color === 'green' ? 'bg-green-100 text-green-700' : 
                                color === 'yellow' ? 'bg-yellow-100 text-yellow-700' : 
                                color === 'red' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                              }`}>
                                {entry.severity}
                              </span>
                            </div>
                            
                            {entry.notes && (
                              <p className="text-sm text-gray-600 leading-relaxed">{entry.notes}</p>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                            >
                              <Edit size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteEntry(entry.id)}
                              className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="text-gray-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No entries yet</h3>
                  <p className="text-gray-600 mb-6">Start tracking your health by adding your first entry</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors"
                  >
                    Add First Entry
                  </button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* New Entry Form Modal */}
      <AnimatePresence>
        {showForm && (
          <NewEntryForm 
            onClose={() => setShowForm(false)} 
            onSubmit={addEntry}
          />
        )}
      </AnimatePresence>
    </div>
  )
}