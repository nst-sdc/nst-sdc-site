'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import clsx from 'clsx'

export function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={clsx(
        "fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-2.5 rounded-full border font-medium text-sm transition-all hover:scale-105",
        isDark 
          ? "bg-[#1a1a1a] text-[#ffeb3b] border-[#ffeb3b] hover:bg-[#ffeb3b]/10" 
          : "bg-[#f5f3ef] text-black border-black hover:bg-black/5"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isDark ? 'Bright my future' : 'Load into the DARKNESS'}
    </motion.button>
  )
}
