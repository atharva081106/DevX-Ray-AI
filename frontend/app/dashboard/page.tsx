'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Code2, ArrowLeft, FileCode, AlertTriangle, BookOpen, Wrench } from 'lucide-react'
import RadarChart from '../components/RadarChart'
import MetricsGrid from '../components/MetricsGrid'
import LearningPlan from '../components/LearningPlan'
import axios from 'axios'

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const repoUrl = searchParams.get('repo')
  
  const [activeTab, setActiveTab] = useState<'architecture' | 'weaknesses' | 'learning' | 'refactor'>('architecture')
  const [loading, setLoading] = useState(true)
  const [analysis, setAnalysis] = useState<any>(null)

  useEffect(() => {
    if (repoUrl) {
      analyzeRepo()
    }
  }, [repoUrl])

  const analyzeRepo = async () => {
    setLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await axios.post(`${apiUrl}/analyze-repo`, {
        repo_url: repoUrl
      })
      setAnalysis(response.data)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'architecture', icon: FileCode, label: 'Architecture' },
    { id: 'weaknesses', icon: AlertTriangle, label: 'Weaknesses' },
    { id: 'learning', icon: BookOpen, label: 'Learning Plan' },
    { id: 'refactor', icon: Wrench, label: 'Refactoring' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-6"></div>
          <p className="text-xl font-display text-devx-cyan">Analyzing Repository...</p>
          <p className="text-sm text-slate-400 font-body mt-2">This may take a few seconds</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 grid-bg opacity-20"></div>
      
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-8 py-6 border-b border-slate-800"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:glow-indigo transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-devx-indigo to-devx-cyan flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-display font-bold gradient-text">DevX-Ray AI</span>
                <p className="text-xs text-slate-400 font-body">Dashboard</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-lg px-4 py-2">
            <p className="text-sm text-slate-300 font-body truncate max-w-md">{repoUrl}</p>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Repo Summary */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-strong rounded-2xl p-6 scan-line"
              >
                <h2 className="text-xl font-display font-bold mb-4 gradient-text">Repository Summary</h2>
                <div className="space-y-3 font-body text-sm">
                  <div>
                    <span className="text-slate-400">Project:</span>
                    <p className="text-white mt-1">{analysis?.summary?.project_name || 'Loading...'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Purpose:</span>
                    <p className="text-white mt-1">{analysis?.summary?.purpose || 'Analyzing...'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Main Language:</span>
                    <p className="text-devx-cyan mt-1">{analysis?.summary?.language || 'Python'}</p>
                  </div>
                </div>
              </motion.div>

              {/* Metrics Cards */}
              <MetricsGrid metrics={analysis?.metrics} />

              {/* Skill Radar */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-strong rounded-2xl p-6"
              >
                <h2 className="text-xl font-display font-bold mb-6 gradient-text">Skill Assessment</h2>
                <RadarChart scores={analysis?.skill_scores} />
              </motion.div>
            </div>

            {/* Right Panel */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-strong rounded-2xl overflow-hidden"
              >
                {/* Tabs */}
                <div className="border-b border-slate-700 flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 px-6 py-4 font-display font-bold transition-all relative ${
                        activeTab === tab.id
                          ? 'text-devx-cyan'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <tab.icon className="inline w-5 h-5 mr-2" />
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-devx-indigo to-devx-cyan"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-8">
                  {activeTab === 'architecture' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6 font-body"
                    >
                      <div>
                        <h3 className="text-lg font-display font-bold text-white mb-3">Architecture Overview</h3>
                        <p className="text-slate-300 leading-relaxed">
                          {analysis?.architecture?.overview || 'The codebase follows a modular architecture with clear separation of concerns...'}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-bold text-white mb-3">Folder Structure</h3>
                        <div className="glass rounded-xl p-4">
                          <pre className="text-devx-cyan text-sm overflow-x-auto">
                            {analysis?.architecture?.structure || `
📁 src/
  ├── components/
  ├── utils/
  ├── services/
  └── config/
📁 tests/
📁 docs/`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-bold text-white mb-3">Main Modules</h3>
                        <ul className="space-y-2 text-slate-300">
                          {(analysis?.architecture?.modules || ['API Handler', 'Data Processor', 'Authentication']).map((module: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-devx-cyan mt-1">▸</span>
                              <span>{module}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'weaknesses' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {(analysis?.weaknesses || [
                        { severity: 'high', issue: 'Long functions detected', details: 'Several functions exceed 50 lines', line: 'main.py:145' },
                        { severity: 'medium', issue: 'Missing error handling', details: 'Try-except blocks needed in async operations', line: 'api.py:78' },
                        { severity: 'low', issue: 'Inconsistent naming', details: 'Mix of camelCase and snake_case', line: 'utils.py:23' },
                      ]).map((weakness: any, i: number) => (
                        <div key={i} className={`glass rounded-xl p-4 border-l-4 ${
                          weakness.severity === 'high' ? 'border-devx-red' :
                          weakness.severity === 'medium' ? 'border-devx-yellow' :
                          'border-devx-cyan'
                        }`}>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-display font-bold text-white">{weakness.issue}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-body ${
                              weakness.severity === 'high' ? 'bg-devx-red/20 text-devx-red' :
                              weakness.severity === 'medium' ? 'bg-devx-yellow/20 text-devx-yellow' :
                              'bg-devx-cyan/20 text-devx-cyan'
                            }`}>
                              {weakness.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-slate-300 text-sm mb-2 font-body">{weakness.details}</p>
                          <p className="text-slate-500 text-xs font-body">{weakness.line}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'learning' && (
                    <LearningPlan plan={analysis?.learning_plan} />
                  )}

                  {activeTab === 'refactor' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6 font-body"
                    >
                      {(analysis?.refactoring || [
                        { title: 'Split Long Functions', priority: 'high', impact: 'Improves readability and testability' },
                        { title: 'Add Type Hints', priority: 'medium', impact: 'Better IDE support and fewer runtime errors' },
                        { title: 'Extract Constants', priority: 'low', impact: 'Centralized configuration management' },
                      ]).map((suggestion: any, i: number) => (
                        <div key={i} className="glass rounded-xl p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-display font-bold text-white text-lg">{suggestion.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              suggestion.priority === 'high' ? 'bg-devx-red/20 text-devx-red' :
                              suggestion.priority === 'medium' ? 'bg-devx-yellow/20 text-devx-yellow' :
                              'bg-devx-cyan/20 text-devx-cyan'
                            }`}>
                              {suggestion.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-slate-300 mb-4">{suggestion.impact}</p>
                          <button className="btn-primary px-4 py-2 bg-gradient-to-r from-devx-indigo to-devx-cyan text-white rounded-lg text-sm font-display hover:shadow-lg transition-all">
                            View Details
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
