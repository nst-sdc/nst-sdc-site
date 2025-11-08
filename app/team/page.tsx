'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Github, ExternalLink } from 'lucide-react'
import clsx from 'clsx'
import { ThemeToggleButton } from '@/components/theme-toggle-button'

interface GitHubMember {
  login: string
  id: number
  avatar_url: string
  html_url: string
  type: string
}

export default function TeamPage() {
  const [members, setMembers] = useState<GitHubMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()
    
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch('https://api.github.com/orgs/nst-sdc/members')
        if (!response.ok) {
          throw new Error('Failed to fetch team members')
        }
        const data = await response.json()
        setMembers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  return (
    <main id="team" className="relative min-h-screen py-20 px-4 md:px-8">
      <ThemeToggleButton />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={clsx(
            "text-5xl md:text-7xl font-bold mb-4",
            isDark ? "text-[#ffeb3b]" : "text-black"
          )}>
            Our Team
          </h1>
          <p className={clsx(
            "text-lg md:text-xl opacity-80",
            isDark ? "text-[#ffeb3b]" : "text-black"
          )}>
            Meet our amazing club members of NST SDC PUNE
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className={clsx(
              "animate-spin rounded-full h-16 w-16 border-4 border-t-transparent",
              isDark ? "border-[#ffeb3b]" : "border-black"
            )} />
          </div>
        )}

        {error && (
          <div className={clsx(
            "text-center py-20 border rounded-lg",
            isDark ? "border-[#ffeb3b]/30 bg-[#1a1a1a]/50" : "border-black/20 bg-[#f5f3ef]/50"
          )}>
            <p className={clsx(
              "text-xl",
              isDark ? "text-[#ffeb3b]" : "text-black"
            )}>
              Error: {error}
            </p>
          </div>
        )}

        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={clsx(
                  "group relative rounded-3xl border p-6 transition-all duration-300 hover:scale-105",
                  isDark 
                    ? "border-[#ffeb3b] bg-[#1a1a1a] hover:shadow-[0_0_30px_rgba(255,235,59,0.3)]" 
                    : "border-black bg-[#f5f3ef] hover:shadow-[0_0_30px_rgba(0,0,0,0.15)]"
                )}
              >
                <div className="flex flex-col items-center">
                  <div className={clsx(
                    "relative w-24 h-24 rounded-full overflow-hidden border-4 mb-4",
                    isDark ? "border-[#ffeb3b]" : "border-black"
                  )}>
                    <img
                      src={member.avatar_url}
                      alt={member.login}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className={clsx(
                    "text-xl font-semibold mb-2",
                    isDark ? "text-[#ffeb3b]" : "text-black"
                  )}>
                    {member.login}
                  </h3>
                  
                  <a
                    href={member.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      "flex items-center gap-2 mt-4 px-4 py-2 rounded-full border transition-all",
                      isDark 
                        ? "border-[#ffeb3b] text-[#ffeb3b] hover:bg-[#ffeb3b] hover:text-[#1a1a1a]" 
                        : "border-black text-black hover:bg-black hover:text-white"
                    )}
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-medium">Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && !error && members.length === 0 && (
          <div className="text-center py-20">
            <p className={clsx(
              "text-xl",
              isDark ? "text-[#ffeb3b]" : "text-black"
            )}>
              No team members found
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
