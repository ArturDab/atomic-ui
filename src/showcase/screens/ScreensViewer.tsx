import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const SCREENS = [
  { path: 'dashboard',  label: 'Dashboard' },
  { path: 'documents',  label: 'Dokumenty' },
  { path: 'editor',     label: 'Edytor' },
  { path: 'prompts',    label: 'Prompty' },
  { path: 'settings',   label: 'Ustawienia' },
]

export default function ScreensViewer() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="h-11 border-b bg-white flex items-center px-4 gap-3 shrink-0 z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Atomic UI
        </button>
        <div className="w-px h-4 bg-border" />
        <span className="text-xs text-muted-foreground font-medium">Altair – widoki</span>
        <div className="w-px h-4 bg-border" />
        <nav className="flex gap-0.5">
          {SCREENS.map(s => (
            <NavLink
              key={s.path}
              to={`/screens/${s.path}`}
              className={({ isActive }) => cn(
                'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                isActive ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
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
