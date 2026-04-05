import * as React from 'react'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Zap, FileText, BookOpen, Settings, ChevronRight } from 'lucide-react'

interface NavItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  count?: number
  active?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard',  href: '/dashboard' },
  { icon: Zap,             label: 'Prompty',    href: '/prompts' },
  { icon: FileText,        label: 'Edytor',     href: '/editor' },
  { icon: BookOpen,        label: 'Dokumenty',  href: '/documents', count: 47 },
]

interface AppSidebarProps {
  activeHref?: string
  user?: { name: string; email: string; initials: string }
  appName?: string
}

export function AppSidebar({ activeHref = '/documents', user, appName = 'ContentPilot' }: AppSidebarProps) {
  return (
    <aside className='w-56 border-r bg-white flex flex-col h-full'>
      <div className='h-14 border-b flex items-center px-4 gap-2.5 shrink-0'>
        <div className='w-6 h-6 rounded bg-foreground flex items-center justify-center'>
          <Zap className='w-3.5 h-3.5 text-background' />
        </div>
        <span className='font-semibold text-sm tracking-tight'>{appName}</span>
      </div>

      <nav className='flex-1 overflow-y-auto py-3 px-2 space-y-0.5'>
        {NAV_ITEMS.map(item => {
          const isActive = activeHref === item.href
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-foreground text-background font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <item.icon className='w-4 h-4 shrink-0' />
              <span className='flex-1'>{item.label}</span>
              {item.count !== undefined && (
                <span className={cn('text-xs font-medium tabular-nums', isActive ? 'text-background/70' : 'text-muted-foreground')}>
                  {item.count}
                </span>
              )}
            </a>
          )
        })}
      </nav>

      <div className='border-t px-2 py-2'>
        <a href='/settings' className={cn(
          'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors',
          activeHref === '/settings'
            ? 'bg-foreground text-background font-medium'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        )}>
          <Settings className='w-4 h-4' />
          Ustawienia
        </a>
      </div>

      {user && (
        <div className='border-t px-4 py-3 flex items-center gap-2.5'>
          <div className='w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold shrink-0'>
            {user.initials}
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-xs font-medium truncate'>{user.name}</p>
            <p className='text-xs text-muted-foreground truncate'>{user.email}</p>
          </div>
          <ChevronRight className='w-3.5 h-3.5 text-muted-foreground shrink-0' />
        </div>
      )}
    </aside>
  )
}
