"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const isDarkMode =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  if (!isMounted) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="Learning Paths Logo"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base leading-none">Learning Paths</span>
              <span className="text-xs text-muted-foreground">By Mindflare</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-destructive transition-colors">
              Home
            </Link>
            <Link href="/paths/web-development" className="text-foreground hover:text-destructive transition-colors">
              Web Dev
            </Link>
            <Link href="/paths/data-structures" className="text-foreground hover:text-destructive transition-colors">
              DSA
            </Link>
            <Link href="/paths/python-aiml" className="text-foreground hover:text-destructive transition-colors">
              Python & AIML
            </Link>
          </div>

          {/* Right Section: Contact + Theme Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-foreground border border-border rounded-full hover:bg-secondary/60 hover:text-destructive transition-all"
            >
              Contact
            </Link>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-destructive" /> : <Moon className="w-5 h-5 text-destructive" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
