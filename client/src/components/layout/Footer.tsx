import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import { navLinks, siteConfig, socialLinks } from '@/config/site'

const socialIcons = { github: GithubIcon, linkedin: LinkedinIcon, mail: Mail }

export function Footer() {
  const year = new Date().getFullYear()

  function handleNavClick(e: React.MouseEvent, href: string) {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="font-mono text-lg font-semibold text-text-primary">
              <span className="text-accent">&lt;</span>
              {siteConfig.name}
              <span className="text-accent">/&gt;</span>
            </a>
            <p className="mt-3 text-sm text-text-secondary">{siteConfig.role}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {navLinks
                .filter((l) => ['Home', 'About', 'Projects', 'Contact'].includes(l.label))
                .map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm text-text-secondary hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Connect</h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-text-secondary hover:text-accent hover:border-accent/50 transition-colors"
                  >
                    <Icon size={17} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-6">
          <p className="text-xs text-text-muted">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted font-mono">Built with React, TypeScript &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
