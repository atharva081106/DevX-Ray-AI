'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Code2, Zap, Brain, Target, TrendingUp, Bug } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [repoUrl, setRepoUrl] = useState('')

  const features = [
    { icon: Code2, title: 'Architecture Analysis', desc: 'Deep dive into code structure' },
    { icon: Brain, title: 'AI Intelligence', desc: 'Smart pattern detection' },
    { icon: Target, title: 'Skill Scoring', desc: 'Visual skill assessment' },
    { icon: TrendingUp, title: 'Learning Plans', desc: 'Personalized roadmaps' },
    { icon: Bug, title: 'Debug Assistant', desc: 'Instant error solutions' },
    { icon: Zap, title: 'Refactoring', desc: 'Code optimization tips' },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 grid-bg opacity-30"></div>
      
      {/* Floating orbs */}
      <motion.div
        className="fixed top-20 left-20 w-96 h-96 rounded-full bg-devx-indigo opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-20 right-20 w-96 h-96 rounded-full bg-devx-cyan opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-8 py-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-devx-indigo to-devx-cyan flex items-center justify-center glow-indigo">
              <Code2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-display font-bold gradient-text">DevX-Ray AI</span>
          </div>
          <nav className="flex gap-8 font-body text-sm">
            <button className="text-slate-300 hover:text-devx-cyan transition-colors">Features</button>
            <button className="text-slate-300 hover:text-devx-cyan transition-colors">Docs</button>
            <button className="text-slate-300 hover:text-devx-cyan transition-colors">API</button>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="relative z-10 px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-block mb-6 px-6 py-2 rounded-full glass border border-devx-indigo/30"
            >
              <span className="text-devx-cyan text-sm font-body">Powered by Advanced AI</span>
            </motion.div>

            <h1 className="text-7xl md:text-8xl font-display font-black mb-8 leading-tight">
              <span className="block gradient-text">X-Ray Your Code</span>
              <span className="block text-white mt-4">Upgrade Your Skill</span>
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 font-body leading-relaxed">
              Intelligent developer skill analysis platform that analyzes GitHub repositories,
              detects weaknesses, and generates personalized learning roadmaps.
            </p>

            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="max-w-3xl mx-auto mb-8"
            >
              <div className="glass-strong rounded-2xl p-8 scan-line">
                <div className="flex gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Enter GitHub repository URL..."
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="flex-1 bg-slate-900/50 border border-devx-indigo/30 rounded-xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-devx-cyan focus:ring-2 focus:ring-devx-cyan/20 font-body transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(`/dashboard?repo=${encodeURIComponent(repoUrl)}`)}
                    className="btn-primary px-8 py-4 bg-gradient-to-r from-devx-indigo to-devx-cyan text-white rounded-xl font-display font-bold glow-indigo hover:shadow-2xl transition-all"
                  >
                    Analyze Repo
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/debug')}
                  className="w-full btn-primary px-8 py-4 bg-gradient-to-r from-devx-yellow to-devx-red text-slate-900 rounded-xl font-display font-bold hover:shadow-2xl transition-all"
                >
                  <Bug className="inline w-5 h-5 mr-2" />
                  Debug Code Assistant
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center gap-12 text-center"
            >
              {[
                { value: '10K+', label: 'Repos Analyzed' },
                { value: '95%', label: 'Accuracy' },
                { value: '<5s', label: 'Analysis Time' },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-xl p-4 px-8">
                  <div className="text-3xl font-display font-bold text-devx-cyan">{stat.value}</div>
                  <div className="text-sm text-slate-400 font-body">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="grid md:grid-cols-3 gap-6 mt-24"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1 }}
                className="glass rounded-2xl p-8 hover-lift group"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-devx-indigo to-devx-cyan flex items-center justify-center mb-6 group-hover:glow-indigo transition-all">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 font-body">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center mt-24 glass-strong rounded-3xl p-16"
          >
            <h2 className="text-4xl font-display font-bold gradient-text mb-6">
              This is not just AI explaining code
            </h2>
            <p className="text-2xl text-white font-display">
              It's AI <span className="text-devx-cyan">upgrading developers</span>
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="relative z-10 border-t border-slate-800 px-8 py-8"
      >
        <div className="max-w-7xl mx-auto text-center text-slate-500 font-body text-sm">
          © 2026 DevX-Ray AI. Powered by Advanced AI Technology.
        </div>
      </motion.footer>
    </div>
  )
}
