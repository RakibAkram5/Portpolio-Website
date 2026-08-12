import type { ComponentType } from 'react'
import {
  Atom,
  FileCode2,
  Braces,
  Wind,
  Code2,
  Server,
  Route,
  Webhook,
  ShieldCheck,
  Flame,
  Database,
  HardDrive,
  FlaskConical,
  Smartphone,
  Gem,
  Container,
  Send,
  AppWindow,
  Layers,
} from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'

type IconComponent = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>

const iconMap: Record<string, IconComponent> = {
  react: Atom,
  typescript: FileCode2,
  javascript: Braces,
  tailwind: Wind,
  html5: Code2,
  nodejs: Server,
  express: Route,
  api: Webhook,
  shield: ShieldCheck,
  firebase: Flame,
  postgresql: Database,
  prisma: Layers,
  sqlite: HardDrive,
  firestore: FlaskConical,
  flutter: Smartphone,
  dart: Gem,
  github: GithubIcon,
  docker: Container,
  postman: Send,
  vscode: AppWindow,
  androidstudio: Smartphone,
}

interface TechIconProps {
  name: string
  size?: number
  className?: string
}

export function TechIcon({ name, size = 22, className }: TechIconProps) {
  const Icon = iconMap[name] ?? Code2
  return <Icon size={size} className={className} strokeWidth={1.75} />
}
