import * as React from 'react'
import { CPSidebar } from './_Sidebar'
import { TopBar } from './_TopBar'
import { ChatMessages } from './_ChatMessage'
import { ChatInput } from './_ChatInput'
import type { Message } from './_ChatMessage'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Plus, Star, MessageSquarePlus, SlidersHorizontal,
  Trash2, Upload, MessageSquare, Users, ChevronRight, AtSign,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const AGENT_COLOR: Record<string, string> = {
  e: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  c: 'bg-blue-100   text-blue-700   border-blue-200',
  s: 'bg-orange-100 text-orange-700 border-orange-200',
}

const TEAMS = [
  { id: '1', name: 'Tworzenie treści', desc: 'Redaktor, copywriter i specjalista SEO do profesjonalnych treści' },
  { id: '2', name: 'Tworzenie treści', desc: 'Redaktor, copywriter i specjalista SEO do profesjonalnych treści', active: true },
  { id: '3', name: 'test', desc: 'test' },
  { id: '4', name: 'Prompt Panel Dev Team', desc: 'Zespół do pracy nad aplikacją Prompt Panel' },
  { id: '5', name: 'test', desc: 'test' },
]

const CHAT_HISTORY = Array.from({ length: 9 }, (_, i) => ({ id: String(i), active: i === 4 }))

const MESSAGES: Message[] = [
  { id: '1', role: 'user', userName: 'ArturD', userInitials: 'A', text: 'Czy jesteście gotowi do pracy?' },
  { id: '2', role: 'assistant', agentName: 'Copywriter', agentInitial: 'C', agentColor: AGENT_COLOR.c,
    text: 'Cześć @ArturD, oczywiście, że jesteśmy gotowi do pracy! Daj mi znać, co konkretnie chcesz, żebym przygotował, i zajmę się tym od razu. Jeśli masz jakieś dodatkowe informacje, które mogą się przydać, śmij je śmiało.',
    time: '2.2s' },
  { id: '3', role: 'assistant', agentName: 'SEO Specialist', agentInitial: 'S', agentColor: AGENT_COLOR.s,
    text: '@ArturD, tak, jestem gotowy. Jak tylko @Copywriter przygotuje zarys treści, od razu wejdę w to, żeby zadbać o dobór słów kluczowych, zoptymalizować nagłówki i przygotować skuteczne meta opisy.',
    tokens: '936 tok', time: '1.8s' },
  { id: '4', role: 'assistant', agentName: 'Editor-in-Chief', agentInitial: 'E', agentColor: AGENT_COLOR.e, isSummary: true,
    text: '@ArturD, tak, zespół jest gotowy do pracy. @Copywriter czeka na szczegóły projektu, żeby od razu przygotować treści, a @SEO Specialist jest gotowy do optymalizacji jak tylko będzie miał zarys materiałów.\n\nJednak żeby ruszyć efektywnie, potrzebujemy więcej informacji. Nie wiemy, czy to artykuł, strona produktowa, kampania mailingowa czy coś zupełnie innego.\n\n**Co konkretnie mamy przygotować i jaki masz deadline?**',
    tokens: '1179 tok', time: '6.4s' },
  { id: '5', role: 'user', userName: 'ArturD', userInitials: 'A', text: 'Wymyślmy copy do reklamy Animails.' },
  { id: '6', role: 'assistant', agentName: 'Copywriter', agentInitial: 'C', agentColor: AGENT_COLOR.c,
    text: '@ArturD, świetnie, że startujemy z tworzeniem copy do reklamy Animails! Aby stworzyć coś naprawdę angażującego, dobrze byłoby wiedzieć trochę więcej. Kim dokładnie jest nasza grupa docelowa? Czy chcemy skupić się na konkretnym aspekcie produktu, czy mamy pełną swobodę twórczą?' },
]

export default function AITeamsScreen() {
  const [agents, setAgents] = React.useState([
    { id: 'e', initial: 'E', name: 'Editor-in-Chief', desc: 'Lead editor. Review and improve content...', enabled: true },
    { id: 'c', initial: 'C', name: 'Copywriter',      desc: 'Creative copywriter. Write compelling...', enabled: true },
    { id: 's', initial: 'S', name: 'SEO Specialist',  desc: 'SEO expert. Optimize content for search...', enabled: true },
  ])
  const [limit, setLimit] = React.useState([20])

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar crumbs={[{ label: 'Strona główna' }, { label: 'AI Teams' }]} />
      <div className="flex flex-1 overflow-hidden">

        {/* Team list */}
        <div className="w-72 border-r flex flex-col shrink-0">
          <div className="p-4 border-b">
            <Button className="w-full gap-2"><Plus className="w-4 h-4" /> Utwórz zespół</Button>
          </div>
          <div className="px-4 py-2">
            <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-muted-foreground px-2">
              <span className="text-xs">⊞</span> Zaznacz
            </Button>
          </div>
          <ScrollArea className="flex-1">
            {TEAMS.map(team => (
              <button key={team.id} className={cn('w-full text-left px-4 py-3 border-b flex items-start gap-3 hover:bg-muted/50 transition-colors', team.active && 'bg-muted')}>
                <Users className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{team.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{team.desc}</p>
                </div>
              </button>
            ))}
            <p className="px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Historia czatów</p>
            {CHAT_HISTORY.map(c => (
              <button key={c.id} className={cn('w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-muted/50 transition-colors', c.active && 'bg-muted')}>
                <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-sm">Nowy czat</span>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="h-14 border-b flex items-center px-6 gap-3 shrink-0">
            <h1 className="text-base font-semibold">Tworzenie treści</h1>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Star className="w-4 h-4" /></Button>
            <Badge variant="outline" className="gap-1.5 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> 3 Aktywni agenci
            </Badge>
            <div className="flex items-center gap-1 ml-auto">
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm">
                <MessageSquarePlus className="w-4 h-4" /> Nowy czat
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><SlidersHorizontal className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <ChatMessages messages={MESSAGES} />
          </ScrollArea>

          <ChatInput
            placeholder="Napisz wiadomość do zespołu..."
            hint={<span className="flex items-center gap-1">Shift + Enter nowa linia · <AtSign className="w-3 h-3" /> to mention agent</span>}
          />
        </div>

        {/* Right panel */}
        <div className="w-72 border-l flex flex-col shrink-0 overflow-y-auto">
          <div className="h-14 border-b flex items-center justify-between px-4 shrink-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Przegląd zespołu</span>
            <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight className="w-4 h-4" /></Button>
          </div>
          <div className="p-4 space-y-6">
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">Tworzenie treści</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">Redaktor, copywriter i specjalista SEO do profesjonalnych treści</p>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Aktywni agenci</p>
                <Button variant="ghost" size="icon" className="h-6 w-6"><Plus className="w-3.5 h-3.5" /></Button>
              </div>
              <div className="space-y-2">
                {agents.map(agent => (
                  <div key={agent.id} className="flex items-center gap-3 p-2.5 border rounded-lg">
                    <div className={cn('w-7 h-7 rounded-full border flex items-center justify-center text-xs font-semibold shrink-0', AGENT_COLOR[agent.id])}>
                      {agent.initial}
                    </div>
                    <p className="text-sm font-medium flex-1">{agent.name}</p>
                    <Switch
                      checked={agent.enabled}
                      onCheckedChange={() => setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, enabled: !a.enabled } : a))}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Pliki kontekstowe</p>
                <Button variant="ghost" size="icon" className="h-6 w-6"><Upload className="w-3.5 h-3.5" /></Button>
              </div>
              <div className="border rounded-lg border-dashed flex flex-col items-center justify-center py-6 gap-2 text-muted-foreground">
                <Upload className="w-5 h-5" />
                <p className="text-xs">Brak plików</p>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Limit historii wiadomości</p>
                <span className="text-sm font-semibold tabular-nums">{limit[0]}</span>
              </div>
              <Slider value={limit} onValueChange={setLimit} min={10} max={50} step={5} className="mb-2" />
              <p className="text-xs text-muted-foreground leading-relaxed">Zakres: 10–50 wiadomości. Mniejsza wartość oszczędza tokeny (szybciej + taniej).</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
