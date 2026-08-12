import { NavLink, Outlet } from 'react-router-dom'
import { FolderKanban, Sparkles, Wrench, GitBranch, UserCircle, LogOut, ExternalLink } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/utils/cn'

const navItems = [
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/skills', label: 'Skills', icon: Sparkles },
  { to: '/admin/services', label: 'Services', icon: Wrench },
  { to: '/admin/timeline', label: 'Timeline', icon: GitBranch },
  { to: '/admin/profile', label: 'Profile', icon: UserCircle },
]

export function AdminLayout() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface/60 px-4 py-6 sm:flex">
          <div className="px-2 font-mono text-lg font-semibold">
            <span className="text-accent">&lt;</span>Admin<span className="text-accent">/&gt;</span>
          </div>

          <nav className="mt-8 flex flex-1 flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary border border-transparent',
                  )
                }
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-col gap-1 border-t border-border pt-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-2 hover:text-text-primary"
            >
              <ExternalLink size={16} />
              View site
            </a>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-2 hover:text-rose cursor-pointer"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
