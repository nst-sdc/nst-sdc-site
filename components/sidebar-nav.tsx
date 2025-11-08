'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
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
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'work', label: 'Work', icon: BriefcaseBusiness, path: '/work' },
  { id: 'projects', label: 'Projects', icon: Laptop, path: '/projects' },
  { id: 'team', label: 'Team', icon: Users, path: '/team' },
  { id: 'gallery', label: 'Gallery', icon: Images, path: '/gallery' },
] as const

export type SectionId = (typeof sections)[number]['id']

export function SidebarNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const isHomePage = pathname === '/'

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()
    
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  const NavItems = (
    <ul className="flex flex-col items-center justify-center gap-6">
      {sections.map(({ id, label, icon: Icon, path }) => {
        const isActive = pathname === path
        return (
          <li key={id}>
            <Link href={path}>
              <motion.span
                className={clsx(
                  'group relative flex h-20 w-20 items-center justify-center rounded-[2.5rem] transition-all border-2',
                  isDark 
                    ? isActive 
                      ? 'bg-[#ffeb3b] text-[#1a1a1a] border-[#ffeb3b]' 
                      : 'bg-[#1a1a1a] text-[#ffeb3b] border-[#ffeb3b] hover:bg-[#ffeb3b]/10'
                    : isActive 
                      ? 'bg-black text-white border-black' 
                      : 'bg-[#f5f3ef] text-black border-black hover:bg-black/5'
                )}
                whileHover={{ scale: 1.05 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-glow"
                    className={clsx(
                      "absolute inset-0 rounded-[2.5rem]",
                      isDark ? "bg-[#ffeb3b]/20" : "bg-black/10"
                    )}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  />
                )}
                <Icon className="relative z-10 h-8 w-8" />
                <span className="sr-only">{label}</span>
                
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className={clsx(
                    "absolute left-24 whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity border",
                    isDark 
                      ? "bg-[#1a1a1a] text-[#ffeb3b] border-[#ffeb3b]" 
                      : "bg-[#f5f3ef] text-black border-black"
                  )}
                >
                  {label}
                </motion.span>
              </motion.span>
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setIsHovered(true)}
        className="fixed left-8 top-1/2 z-50 hidden -translate-y-1/2 lg:flex"
      >
        <div className="flex flex-col gap-2">
          <div className={clsx(
            "h-3 w-3 rounded-full transition-all duration-300",
            isDark ? "bg-[#ffeb3b]" : "bg-black"
          )} />
          <div className={clsx(
            "h-3 w-3 rounded-full transition-all duration-300",
            isDark ? "bg-[#ffeb3b]" : "bg-black"
          )} />
          <div className={clsx(
            "h-3 w-3 rounded-full transition-all duration-300",
            isDark ? "bg-[#ffeb3b]" : "bg-black"
          )} />
        </div>
      </motion.div>

      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: isHovered ? 0 : -120, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ type: 'spring', stiffness: 160, damping: 24 }}
        onMouseLeave={() => setIsHovered(false)}
        className={clsx(
          'fixed left-8 top-1/3 hidden w-28 -translate-y-1/3 lg:flex z-50',
          !isHovered ? 'pointer-events-none' : 'pointer-events-auto'
        )}
      >
        <div className="flex w-full flex-col items-center justify-center">
          {NavItems}
        </div>
      </motion.nav>


      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: isHomePage ? -40 : 0, opacity: isHomePage ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className={clsx(
          'fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b px-4 py-3 backdrop-blur-xl lg:hidden',
          isDark 
            ? 'border-[#ffeb3b]/30 bg-[#1a1a1a]/90' 
            : 'border-black/20 bg-[#f5f3ef]/90',
          isHomePage ? 'pointer-events-none' : 'pointer-events-auto'
        )}
      >
        <div className="inline-flex items-center gap-2">
          <span className={clsx(
            "inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold border",
            isDark 
              ? "bg-[#ffeb3b] text-[#1a1a1a] border-[#ffeb3b]" 
              : "bg-black text-white border-black"
          )}>
            DC
          </span>
          <span className={clsx(
            "text-lg font-semibold",
            isDark ? "text-[#ffeb3b]" : "text-black"
          )}>Dev Club</span>
        </div>
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((prev) => !prev)}
          className={clsx(
            "flex items-center rounded-full border px-3 py-2 transition-all",
            isDark 
              ? "border-[#ffeb3b] bg-[#1a1a1a] text-[#ffeb3b] hover:bg-[#ffeb3b]/10" 
              : "border-black bg-[#f5f3ef] text-black hover:bg-black/5"
          )}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
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
            className={clsx(
              "fixed inset-x-4 top-20 z-40 rounded-3xl border p-5 backdrop-blur-2xl lg:hidden",
              isDark 
                ? "border-[#ffeb3b]/30 bg-[#1a1a1a]/95" 
                : "border-black/20 bg-[#f5f3ef]/95"
            )}
          >
            <div className="grid grid-cols-3 gap-4">
              {sections.map(({ id, label, icon: Icon, path }) => {
                const isActive = pathname === path
                return (
                  <Link
                    key={id}
                    href={path}
                    className="group flex flex-col items-center gap-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    <motion.span
                      className={clsx(
                        'flex h-16 w-16 items-center justify-center rounded-3xl border transition-colors',
                        isDark 
                          ? 'bg-[#1a1a1a] text-[#ffeb3b] border-[#ffeb3b]' 
                          : 'bg-[#f5f3ef] text-black border-black',
                        isActive && (isDark 
                          ? 'bg-[#ffeb3b] text-[#1a1a1a] shadow-[0_0_20px_rgba(255,235,59,0.5)]' 
                          : 'bg-black text-white shadow-[0_0_20px_rgba(0,0,0,0.2)]')
                      )}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.span>
                    <span className={clsx(
                      "text-xs",
                      isDark ? "text-[#ffeb3b]" : "text-black"
                    )}>{label}</span>
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
