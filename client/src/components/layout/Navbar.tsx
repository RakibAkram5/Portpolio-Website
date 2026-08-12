import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileDown, Menu, X } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import { navLinks, siteConfig } from '@/config/site'
import { useScrolled } from '@/hooks/useScrolled'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/utils/cn'

export function Navbar() {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useActiveSection(navLinks.map((l) => l.href.replace('#', '')))

  function handleNavClick(href: string) {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-3' : 'py-5',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex items-center justify-between rounded-2xl px-4 sm:px-5 py-2.5 transition-all duration-300',
            scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent border border-transparent',
          )}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#home')
            }}
            className="font-mono text-lg font-semibold tracking-tight text-text-primary"
          >
            <span className="text-accent">&lt;</span>
            {siteConfig.name}
            <span className="text-accent">/&gt;</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.replace('#', '')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className={cn(
                    'relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors duration-200',
                    isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary',
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-accent/10 border border-accent/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="text-text-secondary hover:text-accent transition-colors"
            >
              <GithubIcon size={19} />
            </a>
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="text-text-secondary hover:text-accent transition-colors"
            >
              <LinkedinIcon size={19} />
            </a>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-2 px-4 py-2 text-sm font-medium text-text-primary hover:border-accent/50 hover:text-accent transition-colors"
            >
              <FileDown size={15} />
              Resume
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-text-primary"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={19} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={19} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-text-secondary hover:bg-surface-2 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="flex items-center gap-4 border-t border-border mt-2 pt-3 px-4">
                  <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="text-text-secondary hover:text-accent">
                    <GithubIcon size={19} />
                  </a>
                  <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="text-text-secondary hover:text-accent">
                    <LinkedinIcon size={19} />
                  </a>
                  <a
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-2 px-4 py-2 text-sm font-medium text-text-primary"
                  >
                    <FileDown size={15} />
                    Resume
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
