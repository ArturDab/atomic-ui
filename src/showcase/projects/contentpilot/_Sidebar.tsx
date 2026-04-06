import * as React from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon, LayoutDashboard, Zap, GitBranch, Users, Cpu, MessageSquare, FileText, Trash2, Settings } from 'lucide-react'

interface NavItem {
  icon: LucideIcon
  label: string
  href: string
}

const NAV: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard',  href: 'dashboard' },
  { icon: Zap,             label: 'Prompty',    href: 'prompts' },
  { icon: GitBranch,       label: 'Workflows',  href: 'workflows' },
  { icon: Users,           label: 'AI Teams',   href: 'ai-teams' },
  { icon: Cpu,             label: 'AI Studio',  href: 'ai-studio' },
  { icon: MessageSquare,   label: 'AI Chat',    href: 'ai-chat' },
  { icon: FileText,        label: 'Dokumenty',  href: 'documents' },
  { icon: Trash2,          label: 'Kosz',       href: 'trash' },
]

const SHORTCUTS = ['SS', 'TBR', 'VA', 'CONF', 'ZZP']

interface SidebarProps {
  active?: string
}

export function CPSidebar({ active = 'ai-chat' }: SidebarProps) {
  return (
    <aside className="w-14 bg-[#0f1117] flex flex-col items-center py-3 shrink-0 h-full">
      {/* Logo */}
      <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center shrink-0 overflow-hidden">
        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
          <rect width="32" height="32" rx="8" fill="#00C896"/>
          <text x="16" y="22" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="DM Sans, sans-serif">P</text>
        </svg>
      </div>

      {/* Nav */}
      <nav className="flex flex-col items-center gap-0.5 flex-1 w-full px-2">
        {NAV.map(item => {
          const isActive = active === item.href
          const Icon = item.icon
          return (
            <button
              key={item.href}
              title={item.label}
              className={cn(
                'w-full flex flex-col items-center gap-0.5 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              )}
            >
              <Icon className="w-4 h-4" strokeWidth={isActive ? 2 : 1.75} />
              <span className="text-[9px] font-medium leading-none">{item.label.split(' ')[0]}</span>
            </button>
          )
        })}
      </nav>

      {/* Shortcuts */}
      <div className="flex flex-col items-center gap-1 mb-3">
        {SHORTCUTS.map(s => (
          <div key={s} className="text-[8px] font-mono text-white/25 bg-white/5 rounded px-1 py-0.5 leading-none">
            {s}
          </div>
        ))}
      </div>

      {/* Settings + Avatar */}
      <div className="flex flex-col items-center gap-2">
        <button title="Ustawienia" className="text-white/40 hover:text-white/70 transition-colors">
          <Settings className="w-4 h-4" strokeWidth={1.75} />
        </button>
        <div className="w-7 h-7 rounded-full bg-[#00C896] flex items-center justify-center text-xs font-bold text-white shrink-0">
          A
        </div>
      </div>
    </aside>
  )
}
