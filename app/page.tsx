import { Suspense } from 'react'
import { HeroSection } from '@/components/hero-section'

export default function HomePage() {
  return (
    <main className="relative">
      <Suspense fallback={null}>
        <HeroSection />
      </Suspense>
    </main>
  )
}
