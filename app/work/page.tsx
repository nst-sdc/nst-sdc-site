'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Code, Rocket, Users, Lightbulb, Trophy, BookOpen } from 'lucide-react'
import clsx from 'clsx'
import { ThemeToggleButton } from '@/components/theme-toggle-button'

const workAreas = [
  {
    icon: Code,
    title: 'Development Workshops',
    description: 'Hands-on coding sessions covering web development, mobile apps, AI/ML, and emerging technologies.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Rocket,
    title: 'Project Building',
    description: 'Collaborative projects where members build real-world applications and contribute to open source.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Users,
    title: 'Hackathons',
    description: 'Organize and participate in coding competitions to solve problems and showcase innovation.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Lightbulb,
    title: 'Master Classes',
    description: 'Expert sessions on latest tech trends, career guidance, and industry best practices.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Trophy,
    title: 'Code Jams',
    description: 'Regular coding challenges and contests to sharpen problem-solving skills.',
    color: 'from-yellow-500 to-amber-500'
  },
  {
    icon: BookOpen,
    title: 'Learning Resources',
    description: 'Curated tutorials, documentation, and learning paths for continuous skill development.',
    color: 'from-indigo-500 to-violet-500'
  }
]

export default function WorkPage() {
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

  return (
    <main id="work" className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16">
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
            What We Do
          </h1>
          <p className={clsx(
            "text-lg md:text-xl max-w-3xl mx-auto opacity-80",
            isDark ? "text-[#ffeb3b]" : "text-black"
          )}>
            NST SDC Dev Club is a community of passionate developers, innovators, and tech enthusiasts 
            working together to learn, build, and grow in the world of technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={clsx(
                "group relative rounded-3xl border p-8 transition-all duration-300 hover:scale-105",
                isDark 
                  ? "border-[#ffeb3b] bg-[#1a1a1a] hover:shadow-[0_0_30px_rgba(255,235,59,0.3)]" 
                  : "border-black bg-[#f5f3ef] hover:shadow-[0_0_30px_rgba(0,0,0,0.15)]"
              )}
            >
              <div className={clsx(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border-2",
                isDark ? "border-[#ffeb3b]" : "border-black"
              )}>
                <area.icon className={clsx(
                  "w-8 h-8",
                  isDark ? "text-[#ffeb3b]" : "text-black"
                )} />
              </div>
              
              <h3 className={clsx(
                "text-2xl font-bold mb-4",
                isDark ? "text-[#ffeb3b]" : "text-black"
              )}>
                {area.title}
              </h3>
              
              <p className={clsx(
                "opacity-80 leading-relaxed",
                isDark ? "text-[#ffeb3b]" : "text-black"
              )}>
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>

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
            Join Our Community
          </h2>
          <p className={clsx(
            "text-lg mb-6 opacity-80",
            isDark ? "text-[#ffeb3b]" : "text-black"
          )}>
            Whether you're a beginner or an expert, there's a place for you in our dev club.
          </p>
          <motion.a
            href="https://github.com/nst-sdc"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "inline-block px-8 py-3 rounded-full border font-semibold transition-all",
              isDark 
                ? "border-[#ffeb3b] text-[#ffeb3b] hover:bg-[#ffeb3b] hover:text-[#1a1a1a]" 
                : "border-black text-black hover:bg-black hover:text-white"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Involved
          </motion.a>
        </motion.div>
      </div>
    </main>
  )
}
