import type { ComponentType } from 'react'
import {
  Mail,
  LayoutGrid,
  Smartphone,
  Server,
  Database,
  Flame,
  LayoutDashboard,
  Plug,
  Gauge,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons'

type IconComponent = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>

const iconMap: Record<string, IconComponent> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
  'layout-grid': LayoutGrid,
  smartphone: Smartphone,
  server: Server,
  database: Database,
  flame: Flame,
  'layout-dashboard': LayoutDashboard,
  plug: Plug,
  gauge: Gauge,
}

interface IconProps {
  name: string
  size?: number
  className?: string
}

export function Icon({ name, size = 20, className }: IconProps) {
  const Cmp = iconMap[name] ?? Server
  return <Cmp size={size} className={className} strokeWidth={1.75} />
}
