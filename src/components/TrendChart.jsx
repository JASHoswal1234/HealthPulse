'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const generateMockData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days.map(day => ({
    day,
    fever: Math.floor(Math.random() * 30) + 10,
    cough: Math.floor(Math.random() * 25) + 5,
    fatigue: Math.floor(Math.random() * 20) + 5,
  }))
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl p-4 shadow-xl">
        <p className="font-bold text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between space-x-4 text-sm">
            <span className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-700 font-medium capitalize">{entry.name}</span>
            </span>
            <span className="font-bold text-gray-900">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function TrendChart() {
  const [data, setData] = useState(generateMockData())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setData(generateMockData())
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-64 lg:h-96 flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-600 font-medium">Loading chart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 px-2 py-4 lg:p-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="feverGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="coughGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="fatigueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eab308" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
            vertical={false}
          />
          
          <XAxis 
            dataKey="day" 
            stroke="#9ca3af"
            style={{ fontSize: '12px', fontWeight: '500' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          
          <YAxis 
            stroke="#9ca3af"
            style={{ fontSize: '12px', fontWeight: '500' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Legend 
            wrapperStyle={{ 
              fontSize: '13px', 
              fontWeight: '600',
              paddingTop: '20px'
            }}
            iconType="circle"
          />
          
          <Line 
            type="monotone" 
            dataKey="fever" 
            stroke="#ef4444" 
            strokeWidth={3}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            fill="url(#feverGradient)"
          />
          
          <Line 
            type="monotone" 
            dataKey="cough" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            fill="url(#coughGradient)"
          />
          
          <Line 
            type="monotone" 
            dataKey="fatigue" 
            stroke="#eab308" 
            strokeWidth={3}
            dot={{ fill: '#eab308', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            fill="url(#fatigueGradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}