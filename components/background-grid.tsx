'use client'

import { motion } from 'motion/react'

export function BackgroundGrid() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-20"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-grid-dots opacity-20 dark:opacity-10"
        animate={{ backgroundPosition: ['0px 0px', '40px 40px', '0px 0px'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '40px 40px' }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_60%)]"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(96,165,250,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_bottom,rgba(96,165,250,0.08),transparent_55%)]"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
