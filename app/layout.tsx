import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Dev Club — Innovate. Collaborate. Create.',
  description:
    'Dev Club is the community where builders experiment with future-forward projects, collaborate, and craft immersive experiences.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`relative min-h-screen bg-background text-white scrollbar-thin ${poppins.variable} ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
