'use client'

import { motion } from 'framer-motion'
import { Calendar, BookOpen, Target, CheckCircle } from 'lucide-react'

interface LearningPlanProps {
  plan?: {
    summary: string
    roadmap: Array<{
      week: number
      focus: string
      topics: string[]
      exercises: string[]
    }>
  }
}

export default function LearningPlan({ plan }: LearningPlanProps) {
  const defaultPlan = {
    summary: 'Based on your code analysis, focus on improving error handling and reducing function complexity. The 4-week plan below will help strengthen these areas.',
    roadmap: [
      {
        week: 1,
        focus: 'Error Handling Fundamentals',
        topics: ['Try-except patterns', 'Custom exceptions', 'Logging best practices'],
        exercises: ['Refactor 3 functions with proper error handling', 'Implement custom exception classes'],
      },
      {
        week: 2,
        focus: 'Function Decomposition',
        topics: ['Single Responsibility Principle', 'Function size limits', 'Code organization'],
        exercises: ['Split long functions into smaller ones', 'Extract helper functions'],
      },
      {
        week: 3,
        focus: 'Code Readability',
        topics: ['Naming conventions', 'Documentation', 'Type hints'],
        exercises: ['Add docstrings to all functions', 'Implement type annotations'],
      },
      {
        week: 4,
        focus: 'Testing & Maintainability',
        topics: ['Unit testing', 'Test coverage', 'Refactoring techniques'],
        exercises: ['Write tests for critical functions', 'Achieve 80% coverage'],
      },
    ],
  }

  const planData = plan || defaultPlan

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Summary */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-display font-bold text-white mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-devx-cyan" />
          Learning Summary
        </h3>
        <p className="text-slate-300 font-body leading-relaxed">
          {planData.summary}
        </p>
      </div>

      {/* 4-Week Roadmap */}
      <div className="space-y-4">
        {planData.roadmap.map((week, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="glass rounded-xl p-6 hover-lift"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-devx-indigo to-devx-cyan flex items-center justify-center font-display font-bold text-white">
                W{week.week}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-display font-bold text-white mb-2">
                  {week.focus}
                </h4>
                
                {/* Topics */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-devx-cyan" />
                    <span className="text-sm font-body text-slate-400">Topics to Study</span>
                  </div>
                  <ul className="space-y-1 ml-6">
                    {week.topics.map((topic, j) => (
                      <li key={j} className="text-sm text-slate-300 font-body flex items-start gap-2">
                        <span className="text-devx-cyan mt-1">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exercises */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-devx-yellow" />
                    <span className="text-sm font-body text-slate-400">Practice Exercises</span>
                  </div>
                  <ul className="space-y-1 ml-6">
                    {week.exercises.map((exercise, j) => (
                      <li key={j} className="text-sm text-slate-300 font-body flex items-start gap-2">
                        <span className="text-devx-yellow mt-1">▸</span>
                        <span>{exercise}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-body text-slate-400">Week {week.week} of 4</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-devx-indigo to-devx-cyan"
                  style={{ width: `${(week.week / 4) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-primary px-6 py-4 bg-gradient-to-r from-devx-indigo to-devx-cyan text-white rounded-xl font-display font-bold hover:shadow-2xl transition-all"
      >
        Download Full Learning Plan (PDF)
      </motion.button>
    </motion.div>
  )
}
