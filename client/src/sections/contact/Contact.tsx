import { motion } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { InputField, TextareaField } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { buildSocialLinks } from '@/config/site'
import { useProfile } from '@/hooks/useProfile'
import { Icon } from '@/components/ui/Icon'
import { useContactForm } from './useContactForm'

export function Contact() {
  const { data, errors, status, statusMessage, updateField, handleSubmit } = useContactForm()
  const { data: profile } = useProfile()
  const socialLinks = buildSocialLinks(profile)

  return (
    <section id="contact" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Great."
          description="Have an idea, project, or opportunity? Let's talk."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col justify-between gap-8 rounded-3xl border border-border-strong bg-surface/70 p-7"
          >
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Get in touch</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Whether you have a full product to build or need help shipping a specific feature, I&apos;m happy to
                talk through it.
              </p>

              <div className="mt-6 flex flex-col gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  <Mail size={16} className="text-accent" />
                  {profile.email}
                </a>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <MapPin size={16} className="text-accent" />
                  {profile.location}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-text-secondary hover:text-accent hover:border-accent/50 transition-colors"
                >
                  <Icon name={social.icon} size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 flex flex-col gap-5 rounded-3xl border border-border-strong bg-surface/70 p-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                label="Name"
                id="contact-name"
                placeholder="Your name"
                value={data.name}
                onChange={(e) => updateField('name', e.target.value)}
                error={errors.name}
                autoComplete="name"
              />
              <InputField
                label="Email"
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                value={data.email}
                onChange={(e) => updateField('email', e.target.value)}
                error={errors.email}
                autoComplete="email"
              />
            </div>

            <InputField
              label="Subject"
              id="contact-subject"
              placeholder="What's this about?"
              value={data.subject}
              onChange={(e) => updateField('subject', e.target.value)}
              error={errors.subject}
            />

            <TextareaField
              label="Message"
              id="contact-message"
              placeholder="Tell me a bit about your project or opportunity..."
              rows={5}
              value={data.message}
              onChange={(e) => updateField('message', e.target.value)}
              error={errors.message}
            />

            <div className="flex items-center justify-between gap-4 pt-1">
              <Button
                type="submit"
                disabled={status === 'submitting'}
                icon={<Send size={15} />}
                className="disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>

              {status === 'success' && (
                <span className="flex items-center gap-1.5 text-sm text-accent">
                  <CheckCircle2 size={15} />
                  {statusMessage}
                </span>
              )}
              {status === 'error' && (
                <span className="flex items-center gap-1.5 text-sm text-rose">
                  <AlertCircle size={15} />
                  {statusMessage}
                </span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
