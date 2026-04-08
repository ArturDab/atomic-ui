import { NavLink } from 'react-router-dom'
import { registry } from '../registry'
import { Layers, LayoutGrid, Blocks, FolderKanban, BookOpen, Box, Home } from 'lucide-react'
import { cn } from '../lib/utils'

const CATEGORY_ORDER = ['Atoms', 'Forms', 'Feedback', 'Navigation', 'Layout'] as const

interface SidebarProps { query: string }

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

  const topLinks = [
    { to: '/',         icon: Home,          label: 'Przegląd', end: true },
    { to: '/projects', icon: FolderKanban,  label: 'Projekty' },
    { to: '/modules',  icon: Box,           label: 'Moduły' },
    { to: '/blocks',   icon: Blocks,        label: 'Bloki' },
    { to: '/all',      icon: LayoutGrid,    label: 'Komponenty' },
  ]

  return (
    <aside className="w-56 border-r flex flex-col shrink-0 bg-white">
      <div className="h-13 border-b flex items-center px-4 gap-2.5 shrink-0">
        <Layers className="w-4 h-4 text-foreground" strokeWidth={1.75} />
        <span className="font-semibold text-sm tracking-tight">Atomic UI</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {/* Top nav */}
        <div className="mb-4 space-y-0.5">
          {topLinks.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => cn(
                'flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-foreground text-background font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </NavLink>
          ))}
        </div>

        <div className="h-px bg-border mx-2 mb-4" />

        {/* Components by category */}
        {query.trim() && filtered.length === 0 && (
          <p className="text-xs text-muted-foreground px-2 py-2">Brak wyników</p>
        )}
        {CATEGORY_ORDER.map(cat => {
          const items = grouped[cat]
          if (!items?.length) return null
          return (
            <div key={cat} className="mb-5">
              <p className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest px-2 mb-1.5">
                {cat}
              </p>
              <ul className="space-y-0.5">
                {items.map(comp => (
                  <li key={comp.slug}>
                    <NavLink
                      to={`/components/${comp.slug}`}
                      className={({ isActive }) => cn(
                        'block px-2.5 py-1.5 rounded-md text-sm transition-colors',
                        isActive
                          ? 'bg-foreground text-background font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
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

      <div className="border-t px-4 py-2.5">
        <p className="text-xs text-muted-foreground">{baseComponents.length} komponentów</p>
      </div>
    </aside>
  )
}
