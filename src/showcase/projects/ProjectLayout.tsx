import { NavLink, Outlet, useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScreenItem {
  path: string
  label: string
}

interface ScreenGroup {
  label: string
  defaultPath: string
  children: ScreenItem[]
}

type NavEntry = ScreenItem | ScreenGroup

function isGroup(e: NavEntry): e is ScreenGroup {
  return 'children' in e
}

const PROJECT_META: Record<string, { name: string; nav: NavEntry[] }> = {
  contentpilot2: {
    name: 'ContentPilot 2.0',
    nav: [
      { path: 'cp2-all',       label: 'Wszystkie widoki' },
      { path: 'cp2-ai-chat',   label: 'AI Chat' },
      { path: 'cp2-ai-teams',  label: 'AI Teams' },
      { path: 'cp2-documents', label: 'Dokumenty' },
      { path: 'cp2-ai-chat-artifact',  label: 'Chat + artefakt' },
      { path: 'cp2-ai-studio',         label: 'AI Studio' },
      { path: 'cp2-ai-studio-empty',   label: 'Edytor – pusty' },
      { path: 'cp2-ai-studio-filled',  label: 'Edytor – treść' },
    ],
  },
  contentpilot: {
    name: 'ContentPilot',
    nav: [
      { path: 'all',      label: 'Wszystkie widoki' },
      { path: 'ai-chat',  label: 'AI Chat' },
      { path: 'ai-teams',   label: 'AI Teams' },
      { path: 'documents',  label: 'Dokumenty' },
      {
        label: 'AI Studio',
        defaultPath: 'ai-studio',
        children: [
          { path: 'ai-studio',              label: 'Galeria' },
          { path: 'ai-studio-editor-empty', label: 'Edytor – pusty' },
          { path: 'ai-studio/article',      label: 'Edytor – z treścią' },
        ],
      },
    ],
  },
}

export default function ProjectLayout() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const meta = PROJECT_META[projectSlug ?? '']
  if (!meta) return <div className="p-8 text-sm text-muted-foreground">Projekt nie istnieje.</div>

  const currentPath = location.pathname.split(`/projects/${projectSlug}/`)[1] ?? ''

  // Find active group (if any)
  const activeGroup = meta.nav
    .filter(isGroup)
    .find(g => g.children.some(c => currentPath === c.path || currentPath.startsWith(c.path + '/')))

  return (
    <div className="flex flex-col h-screen">
      {/* Primary nav bar */}
      <div className="h-11 bg-foreground flex items-center px-4 gap-3 shrink-0">
        <Link
          to="/projects"
          className="flex items-center gap-1 text-xs text-background/60 hover:text-background transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Projekty
        </Link>
        <div className="w-px h-4 bg-background/20" />
        <span className="text-xs font-semibold text-background">{meta.name}</span>
        <div className="w-px h-4 bg-background/20" />
        <nav className="flex gap-0.5">
          {meta.nav.map((entry, i) => {
            if (isGroup(entry)) {
              const isGroupActive = !!activeGroup && activeGroup.label === entry.label
              return (
                <button
                  key={i}
                  onClick={() => navigate(`/projects/${projectSlug}/${entry.defaultPath}`)}
                  className={cn(
                    'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                    isGroupActive
                      ? 'bg-background text-foreground'
                      : 'text-background/60 hover:text-background hover:bg-background/10'
                  )}
                >
                  {entry.label}
                </button>
              )
            }
            return (
              <NavLink
                key={entry.path}
                to={`/projects/${projectSlug}/${entry.path}`}
                className={({ isActive }) => cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-background text-foreground'
                    : 'text-background/60 hover:text-background hover:bg-background/10'
                )}
              >
                {entry.label}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Secondary nav – shown when inside a group */}
      {activeGroup && (
        <div className="h-9 bg-neutral-800 flex items-center px-4 gap-1 shrink-0">
          {activeGroup.children.map(child => {
            const isActive = currentPath === child.path || currentPath.startsWith(child.path + '/')
            return (
              <NavLink
                key={child.path}
                to={`/projects/${projectSlug}/${child.path}`}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-white/50 hover:text-white hover:bg-white/10'
                )}
              >
                {child.label}
              </NavLink>
            )
          })}
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
