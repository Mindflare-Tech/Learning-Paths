"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Circle, ExternalLink, BookOpen, Youtube, ChevronDown, Map, List } from "lucide-react"
import { useLearningProgress } from "@/hooks/use-learning-progress"
import type { Level } from "@/lib/learning-data"

interface RoadmapProps {
  levels: Level[]
  domain: string
}

// Type for view mode
type ViewMode = "visual" | "list"

export function Roadmap({ levels, domain }: RoadmapProps) {
  const { toggleTopic, isTopicCompleted, mounted } = useLearningProgress()
  const [viewMode, setViewMode] = useState<ViewMode>("list") // Default to list view
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null) // For visual map side panel

  if (!mounted) return null

  return (
    <div className="py-16 px-4">
      {/* View Toggle Button */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-center">
        <div className="inline-flex rounded-lg border border-border bg-card p-1">
          <button
            onClick={() => setViewMode("visual")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              viewMode === "visual"
                ? "bg-red-500 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Map className="w-4 h-4" />
            <span className="font-medium">Visual Map</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              viewMode === "list"
                ? "bg-red-500 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="w-4 h-4" />
            <span className="font-medium">List View</span>
          </button>
        </div>
      </div>

      {/* Render based on view mode */}
      <AnimatePresence mode="wait">
        {viewMode === "visual" ? (
          <VisualMapView
            key="visual"
            levels={levels}
            domain={domain}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            isTopicCompleted={isTopicCompleted}
            toggleTopic={toggleTopic}
          />
        ) : (
          <ListDropdownView
            key="list"
            levels={levels}
            domain={domain}
            isTopicCompleted={isTopicCompleted}
            toggleTopic={toggleTopic}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ============================================
   VISUAL MAP VIEW COMPONENT
   Shows nodes connected by lines with side panel
   ============================================ */
interface VisualMapViewProps {
  levels: Level[]
  domain: string
  selectedLevel: string | null
  setSelectedLevel: (id: string | null) => void
  isTopicCompleted: (domain: string, levelId: string, topicId: string) => boolean
  toggleTopic: (domain: string, levelId: string, topicId: string) => void
}

function VisualMapView({
  levels,
  domain,
  selectedLevel,
  setSelectedLevel,
  isTopicCompleted,
  toggleTopic,
}: VisualMapViewProps) {
  const getCompletionPercentage = (level: Level) => {
    const completed = level.topics.filter((t) => isTopicCompleted(domain, level.id, t.id)).length
    return (completed / level.topics.length) * 100
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative max-w-6xl mx-auto"
    >
      <div className="flex gap-6">
        {/* Main Map Area */}
        <div className="flex-1">
          <div className="relative">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              {levels.slice(0, -1).map((level, index) => {
                const fromY = 120 + index * 200
                const toY = 120 + (index + 1) * 200
                return (
                  <line
                    key={`line-${level.id}`}
                    x1="50%"
                    y1={fromY}
                    x2="50%"
                    y2={toY}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="text-red-300 dark:text-red-800"
                  />
                )
              })}
            </svg>

            {/* Level Nodes */}
            <div className="space-y-12 relative" style={{ zIndex: 1 }}>
              {levels.map((level, index) => {
                const completion = getCompletionPercentage(level)
                const isSelected = selectedLevel === level.id

                return (
                  <motion.div
                    key={level.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-center"
                  >
                    <motion.button
                      onClick={() => setSelectedLevel(isSelected ? null : level.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative w-48 h-48 rounded-full border-4 transition-all ${
                        isSelected
                          ? "border-red-500 bg-red-500/10"
                          : "border-red-200 dark:border-red-900 bg-card dark:bg-slate-900 hover:border-red-400 dark:hover:border-red-700"
                      } shadow-lg`}
                    >
                      {/* Completion Ring */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-gray-200 dark:text-slate-700"
                        />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray={`${2 * Math.PI * 86} ${2 * Math.PI * 86}`}
                          strokeDashoffset={2 * Math.PI * 86 * (1 - completion / 100)}
                          className="text-red-500 transition-all duration-500"
                        />
                      </svg>

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm mb-2">
                          {index + 1}
                        </div>
                        <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase mb-1">
                          {level.id}
                        </p>
                        <h3 className="text-sm font-bold text-foreground text-center line-clamp-2">{level.title}</h3>
                        <p className="text-xs text-muted-foreground mt-2">{Math.round(completion)}%</p>
                      </div>
                    </motion.button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Side Panel for Selected Level */}
        <AnimatePresence>
          {selectedLevel && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="w-96 flex-shrink-0"
            >
              <div className="sticky top-24 bg-card dark:bg-slate-900 rounded-xl p-6 shadow-lg border-2 border-red-200 dark:border-red-900/50">
                {(() => {
                  const level = levels.find((l) => l.id === selectedLevel)
                  if (!level) return null

                  const completedTopics = level.topics.filter((t) => isTopicCompleted(domain, level.id, t.id)).length

                  return (
                    <>
                      {/* Header */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase">{level.id}</p>
                        <h3 className="text-xl font-bold text-foreground">{level.title}</h3>
                      </div>

                      {/* Progress */}
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-muted-foreground">Progress</span>
                          <span className="text-sm font-bold text-red-600 dark:text-red-400">
                            {completedTopics}/{level.topics.length}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-red-500 to-red-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${(completedTopics / level.topics.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>

                      {/* Topics */}
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-foreground mb-3">Key Concepts</p>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {level.topics.map((topic) => {
                            const isCompleted = isTopicCompleted(domain, level.id, topic.id)
                            return (
                              <motion.button
                                key={topic.id}
                                whileHover={{ x: 2 }}
                                onClick={() => toggleTopic(domain, level.id, topic.id)}
                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                                ) : (
                                  <Circle className="w-5 h-5 text-gray-300 dark:text-slate-600 flex-shrink-0" />
                                )}
                                <span
                                  className={`text-sm ${
                                    isCompleted ? "text-muted-foreground line-through" : "text-foreground font-medium"
                                  }`}
                                >
                                  {topic.name}
                                </span>
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Resources */}
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-3">Resources</p>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {level.resources.map((resource) => (
                            <motion.a
                              key={resource.id}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ x: 2 }}
                              className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                            >
                              {resource.type === "youtube" && (
                                <Youtube className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                              )}
                              {(resource.type === "docs" || resource.type === "course") && (
                                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                              )}
                              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1 truncate">
                                {resource.name}
                              </span>
                              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-red-500 flex-shrink-0" />
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ============================================
   LIST DROPDOWN VIEW COMPONENT
   Collapsible modules with progress bars
   ============================================ */
interface ListDropdownViewProps {
  levels: Level[]
  domain: string
  isTopicCompleted: (domain: string, levelId: string, topicId: string) => boolean
  toggleTopic: (domain: string, levelId: string, topicId: string) => void
}

function ListDropdownView({ levels, domain, isTopicCompleted, toggleTopic }: ListDropdownViewProps) {
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(new Set())

  const toggleLevel = (levelId: string) => {
    const newExpanded = new Set(expandedLevels)
    if (newExpanded.has(levelId)) {
      newExpanded.delete(levelId)
    } else {
      newExpanded.add(levelId)
    }
    setExpandedLevels(newExpanded)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto space-y-4"
    >
      {levels.map((level, index) => {
        const isExpanded = expandedLevels.has(level.id)
        const completedTopics = level.topics.filter((t) => isTopicCompleted(domain, level.id, t.id)).length
        const progressPercent = (completedTopics / level.topics.length) * 100

        return (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card dark:bg-slate-900 rounded-xl border-2 border-red-200 dark:border-red-900/50 overflow-hidden shadow-lg"
          >
            {/* Header - Always Visible */}
            <button
              onClick={() => toggleLevel(level.id)}
              className="w-full p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase">{level.id}</p>
                  <h3 className="text-lg font-bold text-foreground">{level.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {completedTopics}/{level.topics.length} topics completed
                  </p>
                </div>
              </div>

              {/* Progress Circle */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <svg className="transform -rotate-90 w-16 h-16">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-200 dark:text-slate-700" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={2 * Math.PI * 28 * (1 - progressPercent / 100)}
                      className="text-red-500 transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-foreground">{Math.round(progressPercent)}%</span>
                  </div>
                </div>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-6 h-6 text-muted-foreground" />
                </motion.div>
              </div>
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border"
                >
                  <div className="p-6 space-y-6">
                    {/* Topics Checklist */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <span className="text-sm">📋 Key Concepts</span>
                      </h4>
                      <div className="space-y-2">
                        {level.topics.map((topic) => {
                          const isCompleted = isTopicCompleted(domain, level.id, topic.id)
                          return (
                            <motion.button
                              key={topic.id}
                              whileHover={{ x: 4 }}
                              onClick={() => toggleTopic(domain, level.id, topic.id)}
                              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-300 dark:text-slate-600 flex-shrink-0" />
                              )}
                              <span
                                className={`text-sm ${
                                  isCompleted ? "text-muted-foreground line-through" : "text-foreground font-medium"
                                }`}
                              >
                                {topic.name}
                              </span>
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <span className="text-sm">🔗 Learning Resources</span>
                      </h4>
                      <div className="space-y-2">
                        {level.resources.map((resource) => (
                          <motion.a
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                          >
                            {resource.type === "youtube" && (
                              <Youtube className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                            )}
                            {resource.type === "docs" && (
                              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            )}
                            {resource.type === "course" && (
                              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                            )}
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1">
                              {resource.name}
                            </span>
                            <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-red-500 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </motion.div>
  )
}