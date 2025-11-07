'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'
import team from '@/data/team.json'

type TeamMember = {
  name: string
  role: string
  github: string
  linkedin?: string
  avatar: string
}

export function TeamSection() {
  return (
    <section id="team" className="relative z-0 overflow-hidden px-6 py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-2 sm:px-6 lg:px-10">
        <motion.div
          className="max-w-3xl self-center text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-semibold text-gradient md:text-4xl">
            Meet the Team
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Meet the passionate developers and designers who make NST-SDC possible. We're the crew debugging student life, one project at a time.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(team as TeamMember[]).map((member, index) => (
            <motion.article
              key={member.name}
              className="group glass-panel glass-hover relative overflow-hidden rounded-3xl border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ rotateX: 3, rotateY: -3 }}
            >
              <motion.div
                className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-400/20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-blue-500/20 dark:border-blue-400/20">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {member.name}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{member.role}</p>
                  </div>
                </div>
                <div className="relative flex items-center gap-2">
                  <Link
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-panel glass-hover inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Link>
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-panel glass-hover inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
