'use client'

import type { ChangeEvent } from 'react'
import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'
import projects from '@/data/projects.json'

type Project = (typeof projects)[number]

export function ProjectsSection() {
  const [query, setQuery] = useState('')

  const filtered = useMemo<Project[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return projects
    return projects.filter((project) => {
      const text = `${project.title} ${project.description} ${project.tech.join(' ')}`.toLowerCase()
      return text.includes(q)
    })
  }, [query])

  const tags = useMemo(() => {
    const all = projects.flatMap((project) => project.tech)
    return Array.from(new Set(all))
  }, [])

  const handleTagClick = (tag: string) => {
    setQuery((prev) => (prev.toLowerCase() === tag.toLowerCase() ? '' : tag))
  }

  return (
    <section id="projects" className="relative z-0 overflow-hidden px-6 py-28 ">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-2 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-semibold text-gradient md:text-4xl">
              Visionary Projects
            </h2>
            <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">
              Explore what Dev Club ships — from immersive experiences to AI-native infrastructure. Filter by stack or punch in a keyword.
            </p>
          </motion.div>

          <motion.div
            className="glass-panel glass-hover flex items-center gap-3 self-center rounded-full border-slate-200 bg-white px-5 py-3 dark:border-slate-700 dark:bg-slate-800 md:self-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Search className="h-4 w-4 text-accent-neon" />
            <input
              type="text"
              value={query}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
              placeholder="Search projects or stacks"
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </motion.div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project, index) => (
            <motion.article
              key={project.title}
              className="group glass-panel glass-hover flex h-full flex-col overflow-hidden rounded-3xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.div
                  className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <motion.span
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent-neon"
                      whileHover={{ x: 4 }}
                    >
                      View on GitHub
                      <motion.span
                        className="block h-px w-10 bg-gradient-to-r from-accent-neon to-accent-cyan"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
