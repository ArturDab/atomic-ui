import { cn } from '@/lib/utils'
import { LucideIcon, LayoutDashboard, Zap, GitBranch, Users, Cpu, MessageSquare, FileText, Trash2, Settings } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

const NAV: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: LayoutDashboard, label: 'Dashboard',  href: 'dashboard' },
  { icon: Zap,             label: 'Prompty',    href: 'prompts' },
  { icon: GitBranch,       label: 'Workflows',  href: 'workflows' },
  { icon: Users,           label: 'AI Teams',   href: 'ai-teams' },
  { icon: Cpu,             label: 'AI Studio',  href: 'ai-studio' },
  { icon: MessageSquare,   label: 'AI Chat',    href: 'ai-chat' },
  { icon: FileText,        label: 'Dokumenty',  href: 'documents' },
  { icon: Trash2,          label: 'Kosz',       href: 'trash' },
]

export function CP2Sidebar({ active = 'ai-chat' }: { active?: string }) {
  return (
    <aside className="w-48 border-r flex flex-col shrink-0 bg-background h-full">
      {/* Logo + app name */}
      <div className="h-14 flex items-center gap-3 px-4 border-b">
        <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-background">CP</span>
        </div>
        <span className="font-semibold text-sm">ContentPilot</span>
      </div>

      {/* Nav with labels */}
      <nav className="flex flex-col gap-0.5 p-2 flex-1">
        {NAV.map(item => {
          const isActive = active === item.href
          const Icon = item.icon
          return (
            <button
              key={item.href}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left',
                isActive
                  ? 'bg-foreground text-background font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" strokeWidth={isActive ? 2 : 1.75} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <Separator />
      <div className="p-3 flex items-center gap-3">
        <Avatar className="w-7 h-7 shrink-0">
          <AvatarFallback className="text-xs font-semibold">AK</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-none truncate">Artur K.</p>
          <p className="text-xs text-muted-foreground mt-0.5">Pro</p>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </TooltipTrigger>
          <TooltipContent>Ustawienia</TooltipContent>
        </Tooltip>
      </div>
    </aside>
  )
}
