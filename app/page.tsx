import { Suspense } from 'react'
import { SidebarNav } from '@/components/sidebar-nav'
import { HeroSection } from '@/components/hero-section'
import { WorkSection } from '@/components/work-section'
import { ProjectsSection } from '@/components/projects-section'
import { TeamSection } from '@/components/team-section'
import { Footer } from '@/components/footer'
import { BackgroundGrid } from '@/components/background-grid'

export default function HomePage() {
  return (
    <main className="relative">
      <BackgroundGrid />
      <SidebarNav />
      <Suspense fallback={null}>
        <HeroSection />
        <div className="top-0 z-[-1000] flex flex-col items-center">
          <WorkSection />
          <ProjectsSection />
          <TeamSection />
          <Footer />
        </div>
      </Suspense>
    </main>
  )
}
