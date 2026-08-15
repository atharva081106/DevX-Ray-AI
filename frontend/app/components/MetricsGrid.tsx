'use client'

import { motion } from 'framer-motion'
import { Activity, FileCode, AlertTriangle, MessageSquare } from 'lucide-react'

interface MetricsGridProps {
  metrics?: {
    avg_complexity: number
    longest_function: number
    maintainability_index: number
    comment_density: number
  }
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  const defaultMetrics = {
    avg_complexity: 4.2,
    longest_function: 87,
    maintainability_index: 68,
    comment_density: 15,
  }

  const metricCards = [
    {
      icon: Activity,
      label: 'Avg Complexity',
      value: metrics?.avg_complexity || defaultMetrics.avg_complexity,
      suffix: '',
      color: 'from-devx-indigo to-purple-500',
    },
    {
      icon: FileCode,
      label: 'Longest Function',
      value: metrics?.longest_function || defaultMetrics.longest_function,
      suffix: ' lines',
      color: 'from-devx-cyan to-blue-500',
    },
    {
      icon: AlertTriangle,
      label: 'Maintainability',
      value: metrics?.maintainability_index || defaultMetrics.maintainability_index,
      suffix: '%',
      color: 'from-devx-yellow to-orange-500',
    },
    {
      icon: MessageSquare,
      label: 'Comment Density',
      value: metrics?.comment_density || defaultMetrics.comment_density,
      suffix: '%',
      color: 'from-devx-red to-pink-500',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-2 gap-4"
    >
      {metricCards.map((metric, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="metric-card glass rounded-xl p-4 hover-lift group"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
            <metric.icon className="w-5 h-5 text-white" />
          </div>
          <div className="text-2xl font-display font-bold text-white mb-1">
            {metric.value}{metric.suffix}
          </div>
          <div className="text-xs font-body text-slate-400">
            {metric.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
