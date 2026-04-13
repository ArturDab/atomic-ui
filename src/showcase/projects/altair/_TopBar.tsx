import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Crumb { label: string }

interface TopBarProps {
  crumbs: Crumb[]
  className?: string
}

export function TopBar({ crumbs, className }: TopBarProps) {
  return (
    <div className={cn('h-10 border-b flex items-center px-5 shrink-0 bg-background', className)}>
      <nav className="flex items-center gap-1.5">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />}
            <span className={cn(
              'text-sm',
              i < crumbs.length - 1
                ? 'text-muted-foreground hover:text-foreground cursor-pointer transition-colors'
                : 'text-foreground font-medium'
            )}>
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>
    </div>
  )
}
