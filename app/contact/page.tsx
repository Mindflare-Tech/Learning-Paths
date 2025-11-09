import { teamData, getTeamByDesignation } from "@/lib/team-data"
import { TeamMemberCard } from "@/components/team-member-card"
import { Mail, Users, Heart } from "lucide-react"

/**
 * Contact Page
 * Displays the MindFlare team with organized sections
 * Includes Vice President, Tech Leads, and Team Members
 */
export default function ContactPage() {
  const vicePresident = getTeamByDesignation("vice-president")
  const techLeads = getTeamByDesignation("tech-lead")
  const members = getTeamByDesignation("member")

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/30 mb-6">
            <Users className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet the <span className="text-red-600 dark:text-red-400">MindFlare</span> Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're a passionate group of educators, developers, and designers dedicated to creating structured learning
            pathways that help you master modern technology. Get to know the people behind MindFlare.
          </p>
        </div>

        {/* Vice President Section */}
        {vicePresident.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Leadership</h2>
              <p className="text-muted-foreground">Guiding MindFlare's vision and mission</p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                {vicePresident.map((member, index) => (
                  <TeamMemberCard key={member.id} member={member} index={index} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tech Leads Section */}
        {techLeads.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Tech Leads</h2>
              <p className="text-muted-foreground">Expert mentors crafting your learning journey</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techLeads.map((member, index) => (
                <TeamMemberCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Team Members Section */}
        {members.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Core Team</h2>
              <p className="text-muted-foreground">Making learning accessible and engaging</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member, index) => (
                <TeamMemberCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Contact CTA Section */}
        <div className="mt-20 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-2xl border-2 border-red-200 dark:border-red-900/50 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Want to Join Us?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join our mission of making quality education accessible
            to everyone.
          </p>
          <a
            href="mailto:contact@mindflare.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}