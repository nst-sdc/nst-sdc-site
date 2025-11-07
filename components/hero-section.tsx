'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { BackgroundAnimation } from './background-animation'

export function HeroSection() {
  const [isDark, setIsDark] = useState(false)
  const titleRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    // Check for saved theme preference
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

  useEffect(() => {
    const title = titleRef.current
    if (!title) return

    const handleMouseMove = (e: MouseEvent) => {
      const letters = title.querySelectorAll('.char')
      
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect()
        const letterCenterX = rect.left + rect.width / 2
        const letterCenterY = rect.top + rect.height / 2
        
        const deltaX = e.clientX - letterCenterX
        const deltaY = e.clientY - letterCenterY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        
        const maxDistance = 200
        const strength = Math.max(0, 1 - distance / maxDistance)
        
        if (strength > 0) {
          const moveX = (deltaX / distance) * strength * 30
          const moveY = (deltaY / distance) * strength * 30
          const scale = 1 + strength * 0.3
          const skew = strength * 10
          
          ;(letter as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale}) skew(${skew}deg, ${skew}deg)`
        } else {
          ;(letter as HTMLElement).style.transform = 'translate(0, 0) scale(1) skew(0deg, 0deg)'
        }
      })
    }

    const handleMouseLeave = () => {
      const letters = title.querySelectorAll('.char')
      letters.forEach((letter) => {
        ;(letter as HTMLElement).style.transform = 'translate(0, 0) scale(1) skew(0deg, 0deg)'
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section className={`hero-creative ${isDark ? 'dark-mood' : 'light-mood'}`}>
      <BackgroundAnimation />
      <motion.header 
        className="hero-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="logo">DEV CLUB</div>
        <button className="mood-toggle" onClick={toggleTheme}>
          Load into the DARKNESS
        </button>
      </motion.header>

      <div className="hero-main">
        <motion.div 
          className="metric metric-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          INNOVATE
        </motion.div>

        <motion.h1 
          ref={titleRef}
          className="main-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          {/* <span className="title-line">{splitText('NST')}</span> */}
          <span className="title-line title-highlight">{splitText("NST SDC DEV CLUB")}</span>
          {/* <span className="title-line">{splitText('Pune')}</span> */}
        </motion.h1>
        <motion.div 
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
         - Dream It - Dev It
        </motion.div>
      </div>
    </section>
  )
}
