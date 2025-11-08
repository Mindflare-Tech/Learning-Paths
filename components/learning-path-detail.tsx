"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useLearningProgress } from "@/hooks/use-learning-progress"
import { ProgressBar } from "@/components/progress-bar"
import { Roadmap } from "@/components/roadmap"
import type { PathData } from "@/lib/learning-data"

interface LearningPathDetailProps {
  path: PathData
  domain: string
}

/**
 * UPDATED: LearningPathDetail component now integrates with the new dual-view Roadmap
 * 
 * Key changes:
 * 1. No structural changes to this component - it remains the same wrapper
 * 2. The Roadmap component now handles view switching internally
 * 3. All existing progress tracking, stats, and UI remain unchanged
 * 4. The component still provides domain context and level data to Roadmap
 */
export function LearningPathDetail({ path, domain }: LearningPathDetailProps) {
  const { getDomainStats, mounted } = useLearningProgress()

  if (!mounted) return null

  const stats = getDomainStats(domain, path.levels)

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section - Unchanged */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center text-red-500 hover:text-red-400 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Paths
          </Link>
          <h1 className="text-5xl font-bold mb-4">{path.title}</h1>
          <p className="text-xl text-gray-300 mb-8">{path.description}</p>

          {/* Stats Grid - Unchanged */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 dark:bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-300">Levels Completed</p>
              <p className="text-2xl font-bold">
                {stats.completedLevels}/{stats.totalLevels}
              </p>
            </div>
            <div className="bg-white/10 dark:bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-300">Topics Mastered</p>
              <p className="text-2xl font-bold">
                {stats.completedTopics}/{stats.totalTopics}
              </p>
            </div>
            <div className="bg-white/10 dark:bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-300">Overall Progress</p>
              <p className="text-2xl font-bold">{Math.round(stats.progressPercent)}%</p>
            </div>
          </div>

          {/* Progress Bar - Unchanged */}
          <ProgressBar
            progress={stats.progressPercent}
            label={`Progress: ${stats.completedTopics}/${stats.totalTopics} topics completed`}
            size="md"
          />
        </div>
      </div>

      {/* Roadmap Section - Now with dual-view capability */}
      {/* 
        The Roadmap component now internally handles:
        - View mode switching (Visual Map / List View)
        - Visual map with connected nodes and side panel
        - Collapsible list view with progress bars
        - All progress tracking via useLearningProgress hook
      */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <Roadmap levels={path.levels} domain={domain} />

        {/* CTA Section - Unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
            Work through each level systematically, check off topics as you master them, and follow the curated
            resources to solidify your knowledge.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-white text-red-600 font-semibold rounded-full hover:bg-red-50 transition-colors"
          >
            Explore Other Paths
          </Link>
        </motion.div>
      </div>
    </div>
  )
}