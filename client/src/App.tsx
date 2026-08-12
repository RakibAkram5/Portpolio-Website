import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BackgroundFX } from '@/components/layout/BackgroundFX'
import { useLenis } from '@/hooks/useLenis'
import { Hero } from '@/sections/hero/Hero'
import { About } from '@/sections/about/About'
import { Skills } from '@/sections/skills/Skills'
import { Projects } from '@/sections/projects/Projects'
import { Architecture } from '@/sections/architecture/Architecture'
import { Experience } from '@/sections/experience/Experience'
import { Services } from '@/sections/services/Services'
import { GithubActivity } from '@/sections/github/GithubActivity'
import { Contact } from '@/sections/contact/Contact'

function App() {
  useLenis()

  return (
    <>
      <BackgroundFX />
      <Navbar />
      <main>
        <Hero />
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
    </>
  )
}

export default App
