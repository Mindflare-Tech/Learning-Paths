export interface TeamMember {
  id: string
  name: string
  role: string
  designation: "vice-president" | "tech-lead" | "member"
  image: string // Path to image in /public folder
  bio?: string // Optional short bio
  linkedin?: string // Optional LinkedIn URL
  github?: string // Optional GitHub URL
  email?: string // Optional email
}


export const teamData: TeamMember[] = [
  // Vice President
  {
    id: "vp-001",
    name: "Sehaj Preet",
    role: "President",
    designation: "vice-president",
    image: "/team/sehaj.png",
    bio: "Leading MindFlare's vision to empower learners with structured pathways.",
    linkedin: "https://www.linkedin.com/in/sehajmakkar/",
    github: "https://github.com/sehajmakkar",
    email: "sehajmakkar007@gmail.com",
  },

  // Tech Leads
  {
    id: "tl-001",
    name: "Dev Uppal",
    role: "Tech Lead - Development",
    designation: "tech-lead",
    image: "/team/dev.png",
    bio: "Passionate about building scalable web applications.",
    linkedin: "https://linkedin.com/in/devuppal46",
    github: "https://github.com/devuppal46",
  },
  {
    id: "tl-002",
    name: "Sarthak",
    role: "Tech Lead - AI/ML",
    designation: "tech-lead",
    image: "/team/sarthak.png",
    bio: "Exploring the frontiers of artificial intelligence and machine learning.",
    linkedin: "https://www.linkedin.com/in/sarthak-5272b32b2/",
    github: "https://github.com/molubhai08",
  },
 

  
]

/**
 * Helper function to get team members by designation
 */
export const getTeamByDesignation = (designation: TeamMember["designation"]) => {
  return teamData.filter((member) => member.designation === designation)
}
