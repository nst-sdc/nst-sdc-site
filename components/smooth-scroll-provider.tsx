'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Only enable smooth scrolling on desktop
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5, // Slightly faster on touch devices
      })

      let rafId: number
      
      const raf = (time: number) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      
      // Use a single RAF for both Lenis and our animation
      rafId = requestAnimationFrame(raf)

      // Handle window resize
      const handleResize = () => {
        lenis.resize()
      }
      
      window.addEventListener('resize', handleResize, { passive: true })

      return () => {
        cancelAnimationFrame(rafId)
        lenis.destroy()
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return <>{children}</>
}
