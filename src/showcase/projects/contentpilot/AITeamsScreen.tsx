import * as React from 'react'
import { CPSidebar } from './_Sidebar'
import { TopBar } from './_TopBar'
import { ChatMessages } from './_ChatMessage'
import { ChatInput } from './_ChatInput'
import type { Message } from './_ChatMessage'
import {
  SidePanel, SidePanelHeader, SidePanelAction, SidePanelToolbar,
  SidePanelSection, SidePanelItem, SidePanelItemTitle, SidePanelItemMeta, SidePanelList,
} from '@/components/blocks/side-panel'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Plus, Star, MessageSquarePlus, SlidersHorizontal, Trash2,
  Upload, MessageSquare, Users, ChevronRight, AtSign,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const AGENT_COLOR: Record<string, string> = {
  e: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  c: 'bg-blue-100 text-blue-700 border-blue-200',
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
    text: 'Cześć @ArturD, oczywiście, że jesteśmy gotowi do pracy!', time: '2.2s' },
  { id: '3', role: 'assistant', agentName: 'SEO Specialist', agentInitial: 'S', agentColor: AGENT_COLOR.s,
    text: '@ArturD, tak, jestem gotowy. Jak tylko @Copywriter przygotuje zarys treści, od razu wejdę w to.',
    tokens: '936 tok', time: '1.8s' },
  { id: '4', role: 'assistant', agentName: 'Editor-in-Chief', agentInitial: 'E', agentColor: AGENT_COLOR.e, isSummary: true,
    text: '@ArturD, tak, zespół jest gotowy do pracy.\n\nJednak żeby ruszyć efektywnie, potrzebujemy więcej informacji.\n\n**Co konkretnie mamy przygotować i jaki masz deadline?**',
    tokens: '1179 tok', time: '6.4s' },
  { id: '5', role: 'user', userName: 'ArturD', userInitials: 'A', text: 'Wymyślmy copy do reklamy Animails.' },
  { id: '6', role: 'assistant', agentName: 'Copywriter', agentInitial: 'C', agentColor: AGENT_COLOR.c,
    text: '@ArturD, świetnie! Aby stworzyć coś naprawdę angażującego, dobrze byłoby wiedzieć trochę więcej. Kim dokładnie jest nasza grupa docelowa?' },
]

export default function AITeamsScreen() {
  const [agents, setAgents] = React.useState([
    { id: 'e', initial: 'E', name: 'Editor-in-Chief', enabled: true },
    { id: 'c', initial: 'C', name: 'Copywriter',      enabled: true },
    { id: 's', initial: 'S', name: 'SEO Specialist',  enabled: true },
  ])
  const [limit, setLimit] = React.useState([20])

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="ai-teams" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar crumbs={[{ label: 'Strona główna' }, { label: 'AI Teams' }]} />
        <div className="flex flex-1 overflow-hidden">

          <SidePanel>
            <SidePanelHeader>
              <SidePanelAction icon={Plus} label="Utwórz zespół" />
            </SidePanelHeader>
            <SidePanelToolbar>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-muted-foreground px-2">
                <span className="text-xs">⊞</span> Zaznacz
              </Button>
            </SidePanelToolbar>
            <SidePanelList>
              {TEAMS.map(team => (
                <SidePanelItem key={team.id} active={team.active}>
                  <Users className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <SidePanelItemTitle className="font-medium truncate">{team.name}</SidePanelItemTitle>
                    <SidePanelItemMeta>{team.desc}</SidePanelItemMeta>
                  </div>
                </SidePanelItem>
              ))}
              <SidePanelSection label="Historia czatów" />
              {CHAT_HISTORY.map(c => (
                <SidePanelItem key={c.id} active={c.active}>
                  <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
                  <SidePanelItemTitle>Nowy czat</SidePanelItemTitle>
                </SidePanelItem>
              ))}
            </SidePanelList>
          </SidePanel>

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
            <div className="flex-1 overflow-hidden">
              <ChatMessages messages={MESSAGES} />
            </div>
            <ChatInput placeholder="Napisz wiadomość do zespołu..."
              hint={<span className="flex items-center gap-1">Shift + Enter nowa linia · <AtSign className="w-3 h-3" /> to mention agent</span>} />
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
                      <Switch checked={agent.enabled}
                        onCheckedChange={() => setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, enabled: !a.enabled } : a))} />
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
                <p className="text-xs text-muted-foreground leading-relaxed">Zakres: 10–50 wiadomości. Mniejsza wartość oszczędza tokeny.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
