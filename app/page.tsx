import { Suspense } from 'react'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { FeaturesSection } from '@/components/work-hero-section'

export default function HomePage() {
  return (
    <main className="relative">
      <Suspense fallback={null}>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
      </Suspense>
    </main>
  )
}
