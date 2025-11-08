"use client"
import { Roadmap } from "@/components/roadmap"

export default function PathRoadmap({ levels, domain, selectedLevel, onSelectLevel }) {
  return (
    <div className="flex flex-col gap-8">
      {levels.map((level) => (
        <div
          key={level.id}
          onClick={() => onSelectLevel(level)}
          className={`cursor-pointer transition-transform ${
            selectedLevel.id === level.id ? "scale-105 border-2 border-red-400" : "hover:scale-102"
          }`}
        >
          <Roadmap levels={[level]} domain={domain} />
        </div>
      ))}
    </div>
  )
}
