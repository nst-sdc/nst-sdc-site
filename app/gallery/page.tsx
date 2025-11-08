'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import clsx from 'clsx'
import { ThemeToggleButton } from '@/components/theme-toggle-button'

export default function GalleryPage() {
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
    <main id="gallery" className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16">
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
            Gallery
          </h1>
          <p className={clsx(
            "text-lg md:text-xl max-w-3xl mx-auto opacity-80",
            isDark ? "text-[#ffeb3b]" : "text-black"
          )}>
            Coming Soon.
          </p>
        </motion.div>
      </div>
    </main>
  )
}
