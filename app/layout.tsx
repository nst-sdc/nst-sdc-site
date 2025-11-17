import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter, Poppins } from 'next/font/google'
import { SidebarNav } from '@/components/sidebar-nav'
import { Footer } from '@/components/footer'
import SmoothScrollProvider from '@/components/smooth-scroll-provider'
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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SmoothScrollProvider>
          <div className="relative flex min-h-screen flex-col">
            <SidebarNav />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
