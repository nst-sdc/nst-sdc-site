'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

const aboutCopy = {
  who: {
    title: 'Who We Are',
    description:
      'NST-SDC is a student-driven developer community at NST ADYPU Pune. We\'re developers and designers who don\'t just "write code" — we debug student life. From late-night bugs to real-life glitches, we build tech solutions that make campus life smoother, smarter, and more engaging.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Team collaboration',
  },
  what: {
    title: 'What We Do',
    description:
      'From Skillfest recruitment leaderboards to Quick Snatch treasure hunts, we ship real products that solve campus problems. We host workshops, hackathons, design jams, and coding sessions — empowering students to learn, build, and showcase their skills through hands-on projects.',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Students working on projects',
  },
}

export function WorkSection() {
  return (
    <section id="work" className="relative z-0 overflow-hidden px-6 py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-2 sm:px-6 lg:px-10">
        <motion.div
          className="max-w-3xl self-center text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-semibold text-gradient md:text-4xl">
            About NST-SDC
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Building tech solutions for students, by students. We\'re more than a club — we\'re a community of makers, learners, and problem solvers.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {[aboutCopy.who, aboutCopy.what].map((item, index) => (
            <motion.article
              key={item.title}
              className="glass-panel glass-hover relative flex w-full max-w-md flex-col gap-6 overflow-hidden rounded-3xl border-slate-200 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <motion.div
                className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-400/20"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative space-y-4">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover opacity-80"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
