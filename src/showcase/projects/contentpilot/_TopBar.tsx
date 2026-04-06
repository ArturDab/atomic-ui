import { ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Crumb {
  label: string
  href?: string
}

interface TopBarProps {
  crumbs: Crumb[]
  className?: string
}

export function TopBar({ crumbs, className }: TopBarProps) {
  return (
    <div className={cn('h-10 border-b bg-background flex items-center justify-between px-4 shrink-0', className)}>
      <nav className="flex items-center gap-1">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />}
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
      <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-sm text-muted-foreground">
        <X className="w-3.5 h-3.5" />
        Zamknij
      </Button>
    </div>
  )
}
