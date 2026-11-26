import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BackgroundFX } from '@/components/layout/BackgroundFX'
import { BackToTop, CursorGlow, ScrollProgress } from '@/components/layout/ScrollChrome'
import { useLenis } from '@/hooks/useLenis'
import { useSpotlight } from '@/hooks/useSpotlight'
import { Hero } from '@/sections/hero/Hero'
import { TechMarquee } from '@/sections/hero/TechMarquee'
import { About } from '@/sections/about/About'
import { Skills } from '@/sections/skills/Skills'
import { Projects } from '@/sections/projects/Projects'
import { Architecture } from '@/sections/architecture/Architecture'
import { Experience } from '@/sections/experience/Experience'
import { Services } from '@/sections/services/Services'
import { GithubActivity } from '@/sections/github/GithubActivity'
import { Contact } from '@/sections/contact/Contact'

export function Home() {
  useLenis()
  useSpotlight()

  return (
    <>
      <ScrollProgress />
      <BackgroundFX />
      <CursorGlow />
      <Navbar />
      <main className="relative z-[1]">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Architecture />
        <Experience />
        <Services />
        <GithubActivity />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
