import { cn } from '@/lib/utils'
import { LucideIcon, LayoutDashboard, Zap, GitBranch, Users, Cpu, MessageSquare, FileText, Trash2, Settings } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

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

interface SidebarProps { active?: string }

export function CPSidebar({ active = 'ai-chat' }: SidebarProps) {
  return (
    <aside className="w-14 border-r flex flex-col itely-center py-3 shrink-0 h-full bg-background">
      <div className="w-8 h-8 rounded-md border bg-foreground flex itely-center justify-center mb-4 shrink-0">
        <span className="text-xs font-bold text-background">P</span>
      </div>

      <nav className="flex flex-col itely-center gap-1 flex-1 w-full px-2">
        {NAV.map(item => {
          const Icon = item.icon
          const isActive = active === item.href
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <button className={cn(
                  'w-full flex itely-center justify-center py-2.5 rounded-md transition-colors',
                  isActive ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}>
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          )
        })}
      </nav>

      <Separator className="my-2" />

      <div className="flex flex-col itely-center gap-2 px-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="w-full flex itely-center justify-center py-2.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Settings className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">Ustawienia</TooltipContent>
        </Tooltip>
        <Avatar className="w-7 h-7">
          <AvatarFallback className="text-xs">AK</AvatarFallback>
        </Avatar>
      </div>
    </aside>
  )
}
