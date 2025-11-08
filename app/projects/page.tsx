'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Github, ExternalLink, Star, GitFork, Code2 } from 'lucide-react'
import clsx from 'clsx'
import { ThemeToggleButton } from '@/components/theme-toggle-button'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  homepage: string | null
  updated_at: string
}

export default function ProjectsPage() {
  const [isDark, setIsDark] = useState(false)
  const [projects, setProjects] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
    async function fetchProjects() {
      try {
        const response = await fetch('https://api.github.com/orgs/nst-sdc/repos?sort=updated&per_page=100')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <main id="projects" className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <ThemeToggleButton />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={clsx(
            "text-5xl md:text-7xl font-bold mb-6",
            isDark ? "text-[#ffeb3b]" : "text-black"
          )}>
            Our Projects
          </h1>
          <p className={clsx(
            "text-lg md:text-xl max-w-3xl mx-auto opacity-80",
            isDark ? "text-[#ffeb3b]" : "text-black"
          )}>
            Explore the innovative projects built by our community members. From AI tools to web applications,
            we're constantly pushing the boundaries of what's possible.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={clsx(
                "group relative rounded-3xl border p-6 transition-all duration-300 hover:scale-105 flex flex-col",
                isDark 
                  ? "border-[#ffeb3b] bg-[#1a1a1a] hover:shadow-[0_0_30px_rgba(255,235,59,0.3)]" 
                  : "border-black bg-[#f5f3ef] hover:shadow-[0_0_30px_rgba(0,0,0,0.15)]"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className={clsx(
                  "text-2xl font-bold flex-grow",
                  isDark ? "text-[#ffeb3b]" : "text-black"
                )}>
                  {project.name}
                </h3>
                {project.language && (
                  <span className={clsx(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ml-2",
                    isDark 
                      ? "border-[#ffeb3b]/50 bg-[#ffeb3b]/10 text-[#ffeb3b]" 
                      : "border-black/30 bg-black/5 text-black"
                  )}>
                    <Code2 className="w-3 h-3" />
                    {project.language}
                  </span>
                )}
              </div>
              
              <p className={clsx(
                "opacity-80 mb-4 flex-grow text-sm",
                isDark ? "text-[#ffeb3b]" : "text-black"
              )}>
                {project.description || 'No description available'}
              </p>

              {project.topics && project.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.topics.slice(0, 5).map((topic) => (
                    <span
                      key={topic}
                      className={clsx(
                        "px-3 py-1 rounded-full text-xs font-medium border",
                        isDark 
                          ? "border-[#ffeb3b]/50 bg-[#ffeb3b]/10 text-[#ffeb3b]" 
                          : "border-black/30 bg-black/5 text-black"
                      )}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-current/20">
                <div className="flex items-center gap-4">
                  <span className={clsx(
                    "flex items-center gap-1 text-sm",
                    isDark ? "text-[#ffeb3b]" : "text-black"
                  )}>
                    <Star className="w-4 h-4" />
                    {project.stargazers_count}
                  </span>
                  <span className={clsx(
                    "flex items-center gap-1 text-sm",
                    isDark ? "text-[#ffeb3b]" : "text-black"
                  )}>
                    <GitFork className="w-4 h-4" />
                    {project.forks_count}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(
                        "p-2 rounded-full border transition-all hover:scale-110",
                        isDark 
                          ? "border-[#ffeb3b] text-[#ffeb3b] hover:bg-[#ffeb3b] hover:text-[#1a1a1a]" 
                          : "border-black text-black hover:bg-black hover:text-white"
                      )}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      "p-2 rounded-full border transition-all hover:scale-110",
                      isDark 
                        ? "border-[#ffeb3b] text-[#ffeb3b] hover:bg-[#ffeb3b] hover:text-[#1a1a1a]" 
                        : "border-black text-black hover:bg-black hover:text-white"
                    )}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-20">
            <p className={clsx(
              "text-xl",
              isDark ? "text-[#ffeb3b]" : "text-black"
            )}>
              No projects found
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={clsx(
            "mt-20 p-10 rounded-3xl border text-center",
            isDark 
              ? "border-[#ffeb3b] bg-[#1a1a1a]/50" 
              : "border-black bg-[#f5f3ef]/50"
          )}
        >
          <h2 className={clsx(
            "text-3xl md:text-4xl font-bold mb-4",
            isDark ? "text-[#ffeb3b]" : "text-black"
          )}>
            Have a Project Idea?
          </h2>
          <p className={clsx(
            "text-lg mb-6 opacity-80",
            isDark ? "text-[#ffeb3b]" : "text-black"
          )}>
            Join us and bring your ideas to life with the support of our community.
          </p>
          <motion.a
            href="https://github.com/nst-sdc"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "inline-flex items-center gap-2 px-8 py-3 rounded-full border font-semibold transition-all",
              isDark 
                ? "border-[#ffeb3b] text-[#ffeb3b] hover:bg-[#ffeb3b] hover:text-[#1a1a1a]" 
                : "border-black text-black hover:bg-black hover:text-white"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            View on GitHub
          </motion.a>
        </motion.div>
      </div>
    </main>
  )
}
