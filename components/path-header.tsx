import { ProgressBar } from "@/components/progress-bar"
import { getDomainStats } from "@/hooks/use-learning-progress"

export default function PathHeader({ title, description, stats }) {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-gray-300 mb-8">{description}</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="Levels Completed" value={`${stats.completedLevels}/${stats.totalLevels}`} />
          <StatCard label="Topics Mastered" value={`${stats.completedTopics}/${stats.totalTopics}`} />
          <StatCard label="Progress" value={`${Math.round(stats.progressPercent)}%`} />
        </div>

        <ProgressBar progress={stats.progressPercent} label="Overall Progress" size="md" />
      </div>
    </header>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white/10 rounded-lg p-4 border border-white/10">
      <p className="text-sm text-gray-300">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
