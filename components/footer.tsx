'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Github, Linkedin, MessageCircle } from 'lucide-react'

const socials = [
  {
    label: 'GitHub',
    icon: Github,
    href: 'https://github.com/devclub',
  },
  {
    label: 'Discord',
    icon: MessageCircle,
    href: 'https://discord.gg/devclub',
  },
  {
    label: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/company/devclub',
  },
]

export function Footer() {
  return (
    <footer className="relative w-screen overflow-hidden bg-slate-50 pb-8 pt-20 dark:bg-slate-950">
      <motion.div
        className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 sm:px-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-5 md:col-span-1">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Dev Club NST-SDC
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              We debug student life at NST-Pune — building leaderboards, event platforms, and digital tools that keep campus moving, one project at a time.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-blue-600 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-400">
              Build Cool Stuff
            </div>
          </div>
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {['Home', 'Projects', 'Work', 'Team'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase()}`} 
                    className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Community</h4>
            <div className="flex flex-col gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <Link 
                  key={label} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </div>
            <div className="pt-4 space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Contact</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">support@nstsdc.org</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} NST-SDC. All rights reserved.</span>
          <span className="text-slate-600 dark:text-slate-400">Stay curious. Keep shipping.</span>
        </div>
      </motion.div>
    </footer>
  )
}
