import { NavLink } from 'react-router-dom'
import { registry } from '../registry'
import { FolderKanban, Box, Blocks, LayoutGrid, Home } from 'lucide-react'
import { cn } from '../lib/utils'

const CATEGORY_ORDER = ['Atoms', 'Forms', 'Feedback', 'Navigation', 'Layout'] as const

interface SidebarProps { query: string }

const TOP_LINKS = [
  { to: '/',         icon: Home,         label: 'Przegląd',  end: true },
  { to: '/projects', icon: FolderKanban, label: 'Projekty' },
  { to: '/modules',  icon: Box,          label: 'Moduły' },
  { to: '/blocks',   icon: Blocks,       label: 'Bloki' },
  { to: '/all',      icon: LayoutGrid,   label: 'Komponenty' },
]

export default function Sidebar({ query }: SidebarProps) {
  const baseComponents = registry.filter(c => c.category !== 'Blocks')

  const filtered = query.trim()
    ? baseComponents.filter(c => c.title.toLowerCase().includes(query.toLowerCase()))
    : baseComponents

  const grouped = filtered.reduce((acc, comp) => {
    if (!acc[comp.category]) acc[comp.category] = []
    acc[comp.category].push(comp)
    return acc
  }, {} as Record<string, typeof registry>)

  return (
    <aside className="w-56 border-r flex flex-col shrink-0 bg-white">
      {/* Logo */}
      <div className="h-14 border-b flex items-center px-5 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-foreground rounded-md flex items-center justify-center shrink-0">
            <div className="w-2.5 h-2.5 border-2 border-background rounded-sm" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Atomic UI</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {/* Główna nawigacja */}
        <div className="space-y-0.5 mb-5">
          {TOP_LINKS.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-foreground text-background font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
              )}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </div>

        <div className="h-px bg-border mx-1 mb-5" />

        {query.trim() && filtered.length === 0 && (
          <p className="text-xs text-muted-foreground px-3 py-2">Brak wyników</p>
        )}

        {/* Komponenty wg kategorii */}
        {CATEGORY_ORDER.map(cat => {
          const items = grouped[cat]
          if (!items?.length) return null
          return (
            <div key={cat} className="mb-5">
              <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-[0.08em] px-3 mb-1.5">
                {cat}
              </p>
              <ul className="space-y-0.5">
                {items.map(comp => (
                  <li key={comp.slug}>
                    <NavLink
                      to={`/components/${comp.slug}`}
                      className={({ isActive }) => cn(
                        'block px-3 py-1.5 rounded-lg text-sm transition-colors',
                        isActive
                          ? 'bg-foreground text-background font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                      )}
                    >
                      {comp.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t px-5 py-3">
        <p className="text-xs text-muted-foreground/60">{baseComponents.length} komponentów</p>
      </div>
    </aside>
  )
}
