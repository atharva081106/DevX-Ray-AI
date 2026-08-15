'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Code2, ArrowLeft, Zap, AlertCircle, CheckCircle } from 'lucide-react'
import Editor from '@monaco-editor/react'
import axios from 'axios'

export default function DebugPage() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleDebug = async () => {
    if (!code || !error) {
      alert('Please provide both code and error message')
      return
    }

    setLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await axios.post(`${apiUrl}/debug-code`, {
        code,
        error_message: error
      })
      setResult(response.data)
    } catch (err) {
      console.error('Debug failed:', err)
    } finally {
      setLoading(false)
    }
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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-devx-yellow to-devx-red flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-display font-bold gradient-text">Debug Assistant</span>
                <p className="text-xs text-slate-400 font-body">AI-Powered Code Debugging</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Panel - Input */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="glass-strong rounded-2xl p-6">
                <h2 className="text-xl font-display font-bold mb-4 gradient-text">Your Code</h2>
                <div className="rounded-xl overflow-hidden border border-slate-700">
                  <Editor
                    height="400px"
                    defaultLanguage="python"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6">
                <h2 className="text-xl font-display font-bold mb-4 text-devx-red flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Error Message
                </h2>
                <textarea
                  value={error}
                  onChange={(e) => setError(e.target.value)}
                  placeholder="Paste your error message here..."
                  className="w-full h-32 bg-slate-900/50 border border-devx-red/30 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-devx-red focus:ring-2 focus:ring-devx-red/20 font-body text-sm resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDebug}
                disabled={loading}
                className="w-full btn-primary px-8 py-4 bg-gradient-to-r from-devx-yellow to-devx-red text-slate-900 rounded-xl font-display font-bold hover:shadow-2xl transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Debug & Fix
                  </span>
                )}
              </motion.button>
            </motion.div>

            {/* Right Panel - Results */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {result ? (
                <>
                  <div className="glass-strong rounded-2xl p-6 scan-line">
                    <h2 className="text-xl font-display font-bold mb-4 text-devx-cyan flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Error Explanation
                    </h2>
                    <p className="text-slate-300 font-body leading-relaxed">
                      {result.explanation || 'The error occurs due to...'}
                    </p>
                  </div>

                  <div className="glass-strong rounded-2xl p-6">
                    <h2 className="text-xl font-display font-bold mb-4 gradient-text">Root Cause</h2>
                    <div className="glass rounded-xl p-4">
                      <p className="text-white font-body text-sm leading-relaxed">
                        {result.root_cause || 'The primary issue stems from...'}
                      </p>
                    </div>
                  </div>

                  <div className="glass-strong rounded-2xl p-6">
                    <h2 className="text-xl font-display font-bold mb-4 text-devx-yellow">Corrected Code</h2>
                    <div className="rounded-xl overflow-hidden border border-slate-700">
                      <Editor
                        height="300px"
                        defaultLanguage="python"
                        theme="vs-dark"
                        value={result.corrected_code || code}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          readOnly: true,
                          scrollBeyondLastLine: false,
                        }}
                      />
                    </div>
                  </div>

                  <div className="glass-strong rounded-2xl p-6">
                    <h2 className="text-xl font-display font-bold mb-4 gradient-text">Optimization Tips</h2>
                    <ul className="space-y-3 font-body text-sm">
                      {(result.optimizations || [
                        'Use list comprehension instead of loops',
                        'Add type hints for better clarity',
                        'Consider caching repeated calculations'
                      ]).map((tip: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300">
                          <span className="text-devx-cyan mt-1">▸</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {result.complexity && (
                    <div className="glass-strong rounded-2xl p-6">
                      <h2 className="text-xl font-display font-bold mb-4 gradient-text">Time Complexity</h2>
                      <div className="glass rounded-xl p-4">
                        <p className="text-devx-cyan font-display text-2xl font-bold mb-2">
                          {result.complexity}
                        </p>
                        <p className="text-slate-400 font-body text-sm">
                          {result.complexity_explanation || 'Efficient for most use cases'}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="glass-strong rounded-2xl p-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-devx-yellow/20 to-devx-red/20 flex items-center justify-center">
                    <Zap className="w-12 h-12 text-devx-yellow" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-3">Ready to Debug</h3>
                  <p className="text-slate-400 font-body">
                    Paste your code and error message, then click "Debug & Fix" to get instant AI-powered solutions
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
