'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Home,
  Laptop,
  BriefcaseBusiness,
  Users,
  Images,
  Menu,
  X,
} from 'lucide-react'
import clsx from 'clsx'

const sections = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'work', label: 'Work', icon: BriefcaseBusiness },
  { id: 'projects', label: 'Projects', icon: Laptop },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'gallery', label: 'Gallery', icon: Images },
] as const

export type SectionId = (typeof sections)[number]['id']

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [heroInView, setHeroInView] = useState(true)

  useEffect(() => {
    const hero = document.getElementById('home')
    if (hero) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setHeroInView(entry.isIntersecting)
          })
        },
        {
          threshold: 0.4,
        }
      )

      heroObserver.observe(hero)

      return () => heroObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') as SectionId | null
            if (id) {
              setActiveSection(id)
            }
          } else {
            const body = document.body
            const needsBlur = window.scrollY > 40
            if (needsBlur) {
              body.classList.add('nav-blur')
            } else {
              body.classList.remove('nav-blur')
            }
          }
        })
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0.2,
      }
    )

    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const body = document.body
      const needsBlur = window.scrollY > 40
      if (needsBlur) {
        body.classList.add('nav-blur')
      } else {
        body.classList.remove('nav-blur')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const NavItems = (
    <ul className="flex flex-col items-center justify-center gap-6">
      {sections.map(({ id, label, icon: Icon }) => {
        const isActive = activeSection === id
        return (
          <li key={id}>
            <Link href={`#${id}`} scroll>
              <motion.span
                className={clsx(
                  'group relative flex h-20 w-20 items-center justify-center rounded-[2.5rem] transition-all',
                  'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100'
                )}
                whileHover={{ scale: 1.05 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-glow"
                    className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-blue-700 shadow-glow"
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  />
                )}
                <Icon className="relative z-10 h-8 w-8" />
                <span className="sr-only">{label}</span>
              </motion.span>
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: heroInView ? -120 : 0, opacity: heroInView ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 24 }}
        className={clsx(
          'fixed left-8 top-1/3 hidden w-28 -translate-y-1/3 lg:flex',
          heroInView ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
        )}
      >
        <div className="flex w-full flex-col items-center justify-center">
          {NavItems}
        </div>
      </motion.nav>


      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: heroInView ? -40 : 0, opacity: heroInView ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className={clsx(
          'fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90 lg:hidden',
          heroInView ? 'pointer-events-none' : 'pointer-events-auto'
        )}
      >
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-semibold text-white">
            DC
          </span>
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">Dev Club</span>
        </div>
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="glass-panel glass-hover flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          {mobileOpen ? (
            <X className="h-5 w-5 text-accent-neon" />
          ) : (
            <Menu className="h-5 w-5 text-accent-neon" />
          )}
        </button>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-slate-200 bg-white/95 p-5 backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/95 lg:hidden"
          >
            <div className="grid grid-cols-3 gap-4">
              {sections.map(({ id, label, icon: Icon }) => {
                const isActive = activeSection === id
                return (
                  <Link
                    key={id}
                    href={`#${id}`}
                    scroll
                    className="group flex flex-col items-center gap-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    <motion.span
                      className={clsx(
                        'flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-600 transition-colors dark:bg-slate-800 dark:text-slate-300',
                        isActive && 'bg-gradient-to-br from-blue-500 to-blue-700 text-white'
                      )}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">{label}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
