"use client"

import { useState, useEffect, useRef, useCallback } from "react"

export interface TopicProgress { [topicId: string]: boolean }
export interface ResourceProgress { [resourceId: string]: boolean }
export interface LevelProgress { topics: TopicProgress; resources: ResourceProgress; completed: boolean }
export interface DomainProgress { [levelId: string]: LevelProgress }
export interface ProgressData { [domain: string]: DomainProgress }

const STORAGE_KEY = "learning-path-progress-v2"

export function useLearningProgress() {
  const [progress, setProgress] = useState<ProgressData>({})
  const [mounted, setMounted] = useState(false)
  const saveTimeoutRef = useRef<number | null>(null)

  // Initialize from localStorage (client-only)
  useEffect(() => {
    if (typeof window === "undefined") {
      setMounted(true)
      return
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setProgress(JSON.parse(raw))
    } catch (e) {
      console.error("[v0] Failed to parse progress data:", e)
    } finally {
      setMounted(true)
    }
  }, [])

  // Debounced save to localStorage
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return

    // clear existing timeout
    if (saveTimeoutRef.current) {
      window.clearTimeout(saveTimeoutRef.current)
    }

    // debounce: save after 1s of inactivity
    saveTimeoutRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
      } catch (e) {
        console.error("Failed to save progress:", e)
      }
      saveTimeoutRef.current = null
    }, 1000)

    // cleanup on unmount
    return () => {
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current)
        saveTimeoutRef.current = null
      }
    }
  }, [progress, mounted])

  // Helpers (memoized)
  const toggleTopic = useCallback((domain: string, levelId: string, topicId: string) => {
    setProgress(prev => {
      const domainProgress = prev[domain] || {}
      const levelProgress = domainProgress[levelId] || { topics: {}, resources: {}, completed: false }
      const topicStatus = levelProgress.topics[topicId] ?? false

      return {
        ...prev,
        [domain]: {
          ...domainProgress,
          [levelId]: {
            ...levelProgress,
            topics: { ...levelProgress.topics, [topicId]: !topicStatus },
          },
        },
      }
    })
  }, [])

  const toggleResource = useCallback((domain: string, levelId: string, resourceId: string) => {
    setProgress(prev => {
      const domainProgress = prev[domain] || {}
      const levelProgress = domainProgress[levelId] || { topics: {}, resources: {}, completed: false }
      const resourceStatus = levelProgress.resources[resourceId] ?? false

      return {
        ...prev,
        [domain]: {
          ...domainProgress,
          [levelId]: {
            ...levelProgress,
            resources: { ...levelProgress.resources, [resourceId]: !resourceStatus },
          },
        },
      }
    })
  }, [])

  const completeLevel = useCallback((domain: string, levelId: string) => {
    setProgress(prev => {
      const domainProgress = prev[domain] || {}
      const levelProgress = domainProgress[levelId] || { topics: {}, resources: {}, completed: false }

      return {
        ...prev,
        [domain]: {
          ...domainProgress,
          [levelId]: { ...levelProgress, completed: !levelProgress.completed },
        },
      }
    })
  }, [])

  const getLevelProgress = useCallback((domain: string, levelId: string) => {
    return progress[domain]?.[levelId] ?? { topics: {}, resources: {}, completed: false }
  }, [progress])

  const getDomainStats = useCallback((domain: string, allLevels: Array<{ id: string; topics: Array<{ id: string }> }>) => {
    const domainProgress = progress[domain] || {}

    const totalTopics = allLevels.reduce((sum, level) => sum + (level.topics?.length ?? 0), 0)

    const completedTopics = allLevels.reduce((sum, level) => {
      const levelTopics = domainProgress[level.id]?.topics || {}
      return sum + Object.values(levelTopics).filter(Boolean).length
    }, 0)

    const completedLevels = allLevels.filter(level => domainProgress[level.id]?.completed === true).length

    return {
      completedLevels,
      totalLevels: allLevels.length,
      totalTopics,
      completedTopics,
      progressPercent: totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0,
    }
  }, [progress])

  const getGlobalProgress = useCallback((
    allDomains: Array<{ id: string; allLevels: Array<{ id: string; topics: Array<{ id: string }> }> }>
  ) => {
    let totalCompleted = 0
    let totalCount = 0

    allDomains.forEach(domain => {
      const stats = getDomainStats(domain.id, domain.allLevels)
      totalCompleted += stats.completedTopics
      totalCount += stats.totalTopics
    })

    return totalCount > 0 ? (totalCompleted / totalCount) * 100 : 0
  }, [getDomainStats])

  const isTopicCompleted = useCallback((domain: string, levelId: string, topicId: string) => {
    return progress[domain]?.[levelId]?.topics?.[topicId] ?? false
  }, [progress])

  return {
    progress,
    toggleTopic,
    toggleResource,
    completeLevel,
    getLevelProgress,
    getDomainStats,
    getGlobalProgress,
    isTopicCompleted,
    mounted,
  }
}

