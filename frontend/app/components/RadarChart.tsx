'use client'

import { motion } from 'framer-motion'
import { RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

interface RadarChartProps {
  scores?: {
    architecture: number
    algorithm: number
    modularity: number
    error_handling: number
    readability: number
    maintainability: number
  }
}

export default function RadarChart({ scores }: RadarChartProps) {
  const defaultScores = {
    architecture: 7.5,
    algorithm: 8.0,
    modularity: 6.5,
    error_handling: 5.0,
    readability: 9.0,
    maintainability: 7.0,
  }

  const data = [
    { subject: 'Architecture', value: (scores?.architecture || defaultScores.architecture) * 10, fullMark: 100 },
    { subject: 'Algorithm', value: (scores?.algorithm || defaultScores.algorithm) * 10, fullMark: 100 },
    { subject: 'Modularity', value: (scores?.modularity || defaultScores.modularity) * 10, fullMark: 100 },
    { subject: 'Error Handling', value: (scores?.error_handling || defaultScores.error_handling) * 10, fullMark: 100 },
    { subject: 'Readability', value: (scores?.readability || defaultScores.readability) * 10, fullMark: 100 },
    { subject: 'Maintainability', value: (scores?.maintainability || defaultScores.maintainability) * 10, fullMark: 100 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="radar-container"
    >
      <ResponsiveContainer width="100%" height={300}>
        <RechartsRadar data={data}>
          <PolarGrid stroke="#334155" strokeWidth={1} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 10 }}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.6}
            strokeWidth={2}
          />
        </RechartsRadar>
      </ResponsiveContainer>

      {/* Score Bars */}
      <div className="mt-6 space-y-3">
        {Object.entries(scores || defaultScores).map(([key, value], i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-body text-slate-400 capitalize">
                {key.replace('_', ' ')}
              </span>
              <span className="text-sm font-display font-bold text-devx-cyan">
                {value.toFixed(1)}/10
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value * 10}%` }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-devx-indigo to-devx-cyan"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
