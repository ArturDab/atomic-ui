import { NavLink, Outlet, useParams, useNavigate, Link } from 'react-router-dom'
import { ChevronLeft, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const PROJECT_META: Record<string, { name: string; screens: Array<{ path: string; label: string }> }> = {
  contentpilot: {
    name: 'ContentPilot',
    screens: [
      { path: 'all',       label: 'Wszystkie widoki' },
      { path: 'dashboard', label: 'Dashboard' },
      { path: 'documents', label: 'Dokumenty' },
      { path: 'editor',    label: 'Edytor' },
      { path: 'prompts',   label: 'Prompty' },
      { path: 'settings',  label: 'Ustawienia' },
    ],
  },
}

export default function ProjectLayout() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const navigate = useNavigate()
  const meta = PROJECT_META[projectSlug ?? '']
  if (!meta) return <div className="p-8 text-sm text-muted-foreground">Projekt nie istnieje.</div>

  return (
    <div className="flex flex-col h-screen">
      <div className="h-11 border-b bg-white flex items-center px-4 gap-3 shrink-0 z-10">
        <Link
          to="/projects"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Projekty
        </Link>
        <div className="w-px h-4 bg-border" />
        <span className="text-xs font-semibold">{meta.name}</span>
        <div className="w-px h-4 bg-border" />
        <nav className="flex gap-0.5 flex-1">
          {meta.screens.map(s => (
            <NavLink
              key={s.path}
              to={`/projects/${projectSlug}/${s.path}`}
              className={({ isActive }) => cn(
                'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                isActive
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {s.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
