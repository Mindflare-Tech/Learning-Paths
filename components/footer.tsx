"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card dark:bg-slate-900 border-t-2 border-red-200 dark:border-red-900/50">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          <div className="space-y-5">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="MindFlare Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none text-foreground">Learning Paths</span>
                <span className="text-sm text-red-600 dark:text-red-400 font-medium">By MindFlare</span>
              </div>
            </Link>

            {/* About MindFlare - Shortened description */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">About MindFlare</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Structured roadmaps to master modern technology. Learn, build, and grow with expert guidance.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Connect With Us</h3>
              <div className="flex gap-3">
                {/* GitHub */}
                <a
                  href="https://github.com/Mindflare-Tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-muted-foreground group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/mindflare2/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                </a>

                {/* Email */}
                <a
                  href="mailto:contact@mindflare.com"
                  className="group p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-muted-foreground group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wide">Learning Paths</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/paths/web-development"
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 group-hover:scale-150 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Web Development</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/paths/python-aiml"
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 group-hover:scale-150 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Python & AI/ML</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/paths/data-structures"
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 group-hover:scale-150 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Data Structures & Algorithms</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-3 mb-8">
              <li>
                <Link
                  href="/about"
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>

            {/* CTA Section - Reduced padding for more compact design */}
            <div className="p-3 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-lg border border-red-200 dark:border-red-900/50">
              <p className="text-sm font-medium text-foreground mb-1.5">Start Your Journey</p>
              <p className="text-xs text-muted-foreground mb-2.5">
                Choose a path and begin mastering new skills today.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Explore Paths
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright & Legal - Reduced padding */}
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} <span className="font-semibold text-red-600 dark:text-red-400">MindFlare</span>. 
              All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}