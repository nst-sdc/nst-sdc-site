'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Github, Linkedin, MessageCircle } from 'lucide-react'

const socials = [
  {
    label: 'GitHub',
    icon: Github,
    href: 'https://github.com/nst-sdc',
  },
  {
    label: 'Discord',
    icon: MessageCircle,
    href: ' https://discord.gg/eKwrtZEw',
  },
  {
    label: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/nst-sdc/',
  },
]

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Projects', href: '/projects' },
  { label: 'Team', href: '/team' },
  { label: 'Gallery', href: '/gallery' },
]

export function Footer() {
  return (
    <footer className="relative w-screen overflow-hidden bg-gradient-to-br from-[#f5f3ef] via-[#ece7df] to-[#f0ece5] pb-12 pt-20 text-black dark:from-[#080808] dark:via-[#101010] dark:to-[#161616] dark:text-[#ffeb3b]">
      <motion.div
        className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 sm:px-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-5">
            <h3 className="text-3xl font-semibold tracking-tight text-black dark:text-[#ffeb3b]">
              Dev Club NST-SDC
            </h3>
            <p className="text-sm leading-relaxed text-black/70 dark:text-[#ffeb3b]/80">
              We debug student life at NST-Pune — building leaderboards, event platforms, and digital tools that keep campus moving, one project at a time.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-black/70 dark:border-[#ffeb3b]/40 dark:bg-[#ffeb3b]/10 dark:text-[#ffeb3b]">
              Build cool stuff
            </div>
          </div>
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-black/60 dark:text-[#ffeb3b]/80">Explore</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-black/70 transition-colors hover:text-black dark:text-[#ffeb3b]/80 dark:hover:text-[#ffeb3b]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-black/40 dark:bg-[#ffeb3b]/70" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-black/60 dark:text-[#ffeb3b]/80">Community</h4>
            <div className="flex flex-col gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <Link 
                  key={label} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-black/70 transition-colors hover:text-black dark:text-[#ffeb3b]/80 dark:hover:text-[#ffeb3b]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 bg-black/5 text-black/70 transition-colors group-hover:border-black group-hover:text-black dark:border-[#ffeb3b]/30 dark:bg-[#ffeb3b]/10 dark:text-[#ffeb3b] dark:group-hover:border-[#ffeb3b]">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                </Link>
              ))}
            </div>
            <div className="pt-4 space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-black/60 dark:text-[#ffeb3b]/80">Contact</h4>
              <p className="text-sm text-black/70 dark:text-[#ffeb3b]/80">support@nstsdc.org</p>
              <p className="text-sm text-black/50 dark:text-[#ffeb3b]/60">NST SDG Campus, Pune, IN</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-black/10 pt-8 text-xs text-black/60 dark:border-[#ffeb3b]/20 dark:text-[#ffeb3b]/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} NST-SDC. All rights reserved.</span>
          <span className="text-black/60 dark:text-[#ffeb3b]/70">Dream It , Dev It.</span>
        </div>
      </motion.div>
    </footer>
  )
}
