"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Mail } from "lucide-react"
import type { TeamMember } from "@/lib/team-data"

interface TeamMemberCardProps {
  member: TeamMember
  index: number
}

/**
 * TeamMemberCard Component
 * Displays individual team member information with hover effects
 * Includes photo, name, role, bio, and social links
 */
export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-card dark:bg-slate-900 rounded-xl border-2 border-gray-200 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-800 transition-all duration-300 overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-red-200 dark:border-red-900/50 mb-4 shadow-lg"
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 128px, 128px"
            />
          </motion.div>

          {/* Name and Role */}
          <h3 className="text-xl font-bold text-foreground text-center mb-1">{member.name}</h3>
          <p className="text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide text-center">
            {member.role}
          </p>
        </div>

        {/* Bio */}
        {member.bio && (
          <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed min-h-[3rem]">
            {member.bio}
          </p>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-3 pt-4 border-t border-border">
          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors" />
            </motion.a>
          )}

          {member.github && (
            <motion.a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              aria-label={`${member.name}'s GitHub`}
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors" />
            </motion.a>
          )}

          {member.email && (
            <motion.a
              href={`mailto:${member.email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              aria-label={`Email ${member.name}`}
            >
              <Mail className="w-5 h-5 text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Designation Badge */}
      {member.designation === "vice-president" && (
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg">
            LEADERSHIP
          </div>
        </div>
      )}
      {member.designation === "tech-lead" && (
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
            TECH LEAD
          </div>
        </div>
      )}
    </motion.div>
  )
}
